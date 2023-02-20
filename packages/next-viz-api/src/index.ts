import express from "express";
import fs from "fs";
import path from "path";
import { ASTParser } from "@next-viz/core";
import type { ParserOptions } from "@next-viz/core";
import shiki, { IShikiTheme, getHighlighter } from "shiki";
import * as oneHunterThemeDark from "./one-hunter-theme-dark.json";
import eslint from "eslint";
import dotenv from "dotenv";
dotenv.config();

export const getApiRouter = (options: ParserOptions) => {
  const router = express.Router();
  router.use(express.json());

  router.get("/ping", (_req, res) => {
    const cwd = process.cwd();
    res.status(200).json({
      message: "pong",
      cwd,
    });
  });

  router.get("/tracing-nodes", (_req, res) => {
    const content = fs.readFileSync(
      path.join(options.pathToSaveDir, "tracing-nodes.json"),
      "utf8"
    );
    res.status(200).json(JSON.parse(content));
  });

  router.get("/recompile", async (_req, res) => {
    try {
      const parser = new ASTParser(options);
      await parser.parse();
      await parser.writeFile();
      res.status(200).json({
        message: "Recompiled",
      });
    } catch (err) {
      res.status(500).json({
        message: "Something went wrong 1",
        err,
      });
    }
  });

  router.post("/shiki", async (req, res) => {
    try {
      const { code, lang } = req.body;
      const hightlighter = await getHighlighter({
        theme: JSON.parse(JSON.stringify(oneHunterThemeDark)) as IShikiTheme,
        langs: ["javascript", "typescript", "tsx", "jsx"],
      });

      const tokens = hightlighter.codeToThemedTokens(code, lang);
      const html = shiki.renderToHtml(tokens);
      res.status(200).send(html);
    } catch (err) {
      res.status(500).json({
        message: "Something went wrong",
        err,
        req: JSON.stringify(req.body) || "empty",
      });
    }
  });

  router.post("/eslint", async (req, res) => {
    try {
      const { code } = req.body;
      const linter = new eslint.ESLint({
        baseConfig: {
          extends: [
            "eslint:recommended",
            "plugin:sonarjs/recommended",
            "plugin:react/recommended",
          ],
          plugins: ["sonarjs", "react"],
          parserOptions: {
            ecmaVersion: 2020,
            sourceType: "module",
            ecmaFeatures: {
              jsx: true,
            },
          },
          rules: {
            "react/prop-types": "off",
            "react/react-in-jsx-scope": "off",
          },
        },
        useEslintrc: false,
      });
      // i want to return the errors
      const results = await linter.lintText(code);
      if (results.length > 0) {
        const grouped = results[0].messages.reduce((acc, curr) => {
          const { ruleId, message } = curr;
          if (!ruleId) return acc;
          if (acc[ruleId]) {
            acc[ruleId].push(message);
          } else {
            acc[ruleId] = [...((acc[ruleId] as string[]) || []), message];
          }
          return acc;
        }, {} as Record<string, string[]>);

        const withoutDuplicates = Object.keys(grouped).reduce((acc, curr) => {
          acc[curr] = [...new Set(grouped[curr])];
          return acc;
        }, {} as Record<string, string[]>);

        res.status(200).json({
          message: "Errors",
          errors: withoutDuplicates,
        });
        return;
      }
      res.status(200).json({
        message: "No errors",
      });
    } catch (err) {
      res.status(500).json({
        message: "Something went wrong",
        err,
        req: JSON.stringify(req.body) || "empty",
      });
    }
  });

  return router;
};
