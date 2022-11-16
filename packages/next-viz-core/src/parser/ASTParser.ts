import { TracingNode } from "./TracingNode";
import { ParserOptions } from "../types";
import fs from "fs";
import path from "path";
import swc from "@swc/core";
import { fileURLToPath } from "url";
import { Visitor } from "../Visitor";
import ParsedFile from "./ParsedFile";
import { JSXElement } from "./JSXElement";
import { JSXAttribute } from "./JSXAttribute";
const glob = require("fast-glob");

export class ASTParser {
  private tracingNodes: Map<string, TracingNode> = new Map();
  private options: ParserOptions;
  private static log = false;

  constructor(options: ParserOptions) {
    this.options = options;
    ASTParser.log = options.log;
    console.log(`[NextViz] Parsing ${options.rootFolderPath}...`);
  }

  getTracingNodes(): Map<string, TracingNode> {
    return this.tracingNodes;
  }

  parse(): Promise<void> {
    return new Promise((resolve, reject) => {
      console.log(`[NextViz] Parsing ${this.options.rootFolderPath}...`);

      this.getFilesAndDirectories()
        .then((files) => {
          this.traverseFiles(files);
          // this.generateTracingNodes();
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
      //   const parser = new Parser({
      //     rootFolderPath,
      //     rootComponents,
      //     pathToSaveDir,
      //     log: ASTParser.log,
      //     onParse: (tracingNode: TracingNode) => {
      //       this.tracingNodes.set(tracingNode.getId(), tracingNode);
      //     },
      //   });
      //   parser.parse().then(() => {
      //     console.log("[NextViz] Parsing done.");
      //     resolve();
      //   });
    });
  }

  private getFilesAndDirectories(): Promise<string[]> {
    return glob(["**/*.{js,jsx,ts,tsx}"], {
      ignore: ["**/node_modules/**"],
      cwd: this.options.rootFolderPath,
    });
  }

  private traverseFiles(files: string[]) {
    console.info(`[NextViz] Found ${files.length} files...`);
    console.info(`[NextViz] Traversing files: [${files.join(", ")}]...`);
    files.forEach((file, i) => {
      // const tracingNode = new TracingNode(file);
      // this.tracingNodes.set(tracingNode.getId(), tracingNode);
      if (fs.existsSync(file) && fs.lstatSync(file).isFile()) {
        this.parseFile(file);
      }
    });
  }

  private parseFile(path: string) {
    const fileContent = fs.readFileSync(path, "utf-8");
    console.info(`[NextViz] Parsing file ${path}...`);

    swc
      .parse(fileContent, {
        syntax: "typescript",
        target: "es2015",
        tsx: true,
        decorators: true,
      })
      .then(async (ast) => {
        const visitor = new Visitor(path, fileContent);
        visitor.visitModule(ast);
        console.log(visitor.getImports());
        // const graph = new Graph();
        // logger.log(visitor.getJSXElements());
        // logger.success(
        //   JSON.stringify(visitor.elements.map((a) => a.getNode()))
        // );
        // logger.success(
        //   JSON.stringify(visitor.attributes.map((a) => a.getNode()))
        // );
        // console.log(visitor.getHooks());
        // console.log(visitor.getExports());
        // console.log(visitor.getComponents());
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
