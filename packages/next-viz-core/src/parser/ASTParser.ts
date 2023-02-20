import { TracingNode } from "./TracingNode";
import { ParserOptions } from "../types";
import fs from "fs";
import path from "path";
import swc from "@swc/core";
import { SimpleVisitor } from "../SimpleVisitor";
import { Graph } from "../builder/Graph";
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
        reject({
          message: "[ASTParser]: Error in parse method",
          err,
        });
      }
    });
  }

  writeFile(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const graph = new Graph(this.tracingNodes, this.options.rootFolderPath);
        console.log("[ASTParser] Graph parsed...");
        const pages = await this.getFilesAndDirectories(
          "**/*.jsx",
          "pages/{_app,_document}.jsx"
        );
        graph.build(pages);
        console.log("[Graph Builder] Graph built...");

        const fileName = "tracing-nodes.json";
        const filePath = path.join(this.options.pathToSaveDir, fileName);

        if (!fs.existsSync(this.options.pathToSaveDir)) {
          fs.mkdirSync(this.options.pathToSaveDir);
        }
        fs.writeFileSync(filePath, graph.toString());
        console.log(`[NextViz] Wrote file ${filePath}`);
        resolve();
      } catch (err) {
        reject({
          message: "[ASTParser]: Error in writeFile method",
          err,
        });
      }
    });
  }

  private getFilesAndDirectories(
    globePattern?: string,
    ignorePattern?: string
  ): Promise<string[]> {
    const pattern = globePattern || "**/*.jsx";
    const ignore = ignorePattern || "node_modules/**";
    return glob([pattern], {
      ignore: [ignore],
      cwd: this.options.rootFolderPath,
    });
  }

  private traverseFiles(files: string[]) {
    console.info(`[NextViz] Found ${files.length} files...`);
    console.info(`[NextViz] Traversing files: [${files.join(", ")}]...`);
    const promises = files.map((file) => {
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
          syntax: "ecmascript",
          jsx: true,
          decorators: true,
        },
      },
      plugin: (program) => {
        const simpleVisitor = new SimpleVisitor(path, fileContent);
        const output = simpleVisitor.visitProgram(program);
        this.tracingNodes.set(path, simpleVisitor.getTracingNode());
        return output;
      },
    });
  }
}
