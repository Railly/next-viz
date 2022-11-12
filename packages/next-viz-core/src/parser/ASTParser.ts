import { TracingNode } from "./TracingNode";

export interface ParserOptions {
  log: boolean;
  rootFolderPath: string;
  rootComponents: string[];
  pathToSaveDir: string;
}

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
      const rootFolderPath = this.options.rootFolderPath;
      const rootComponents = this.options.rootComponents;
      const pathToSaveDir = this.options.pathToSaveDir;
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
}
