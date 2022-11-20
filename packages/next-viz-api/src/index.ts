import express from "express";
import fs from "fs";
import path from "path";
import { ASTParser } from "@next-viz/core";
import type { ParserOptions } from "@next-viz/core";

export const getApiRouter = (options: ParserOptions) => {
  const router = express.Router();

  router.get("/ping", (_req, res) => {
    const cwd = process.cwd();
    res.status(200).json({
      message: "pong",
      cwd,
    });
  });

  router.get("/tracing-nodes", (_req, res) => {
    res
      .status(200)
      .json(
        fs.readFileSync(path.join(options.pathToSaveDir, "tracing-nodes.json"))
      );
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
        message: "Something went wrong",
        err,
      });
    }
  });

  return router;
};
