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
import { SimpleVisitor } from "../SimpleVisitor";
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
    return new Promise(async (resolve, reject) => {
      try {
        console.log(`[NextViz] Parsing ${this.options.rootFolderPath}...`);
        const files = await this.getFilesAndDirectories();
        await this.traverseFiles(files);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  writeFile(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const stringifiedNodes = Array.from(this.tracingNodes.values()).map(
          (tracingNode) => {
            return tracingNode.extractData();
          }
        );

        const fileName = "tracing-nodes.json";
        const filePath = path.join(this.options.pathToSaveDir, fileName);

        if (!fs.existsSync(this.options.pathToSaveDir)) {
          fs.mkdirSync(this.options.pathToSaveDir);
          fs.writeFileSync(filePath, JSON.stringify(stringifiedNodes, null, 2));
        }
        console.log(`[NextViz] Wrote file ${filePath}`);
        resolve();
      } catch (err) {
        reject(err);
      }
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
    const promises = files.map((file, i) => {
      // const tracingNode = new TracingNode(file);
      // this.tracingNodes.set(tracingNode.getId(), tracingNode);
      if (fs.existsSync(file) && fs.lstatSync(file).isFile()) {
        return this.parseFile(file);
      }
      return Promise.resolve();
    });

    return Promise.all(promises);
  }

  private parseFile(path: string): Promise<any> {
    const fileContent = fs.readFileSync(path, "utf-8");
    console.info(`[NextViz] Parsing file ${path}...`);

    return swc.transform(fileContent, {
      jsc: {
        target: "es2015",
        parser: {
          syntax: "typescript",
          tsx: true,
          decorators: true,
        },
      },
      plugin: (program) => {
        const simpleVisitor = new SimpleVisitor(path, fileContent);
        const output = simpleVisitor.visitProgram(program);
        this.tracingNodes.set(path, simpleVisitor.getTracingNode());
        Array.from(this.tracingNodes.values()).forEach((tracingNode) => {
          console.log(tracingNode.getJSXElements());
        });
        return output;
      },
    });
  }
}
