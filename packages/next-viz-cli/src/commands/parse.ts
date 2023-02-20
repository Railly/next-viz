import path from "path";
import { ASTParser, ParserOptions } from "@next-viz/core";
import { logger } from "../utils/loggers";

export const parseNextJSProject = async ({
  rootFolderPath,
  rootComponents,
  pathToSaveDir,
  log,
}: ParserOptions) => {
  try {
    const parser = new ASTParser({
      rootFolderPath,
      rootComponents,
      pathToSaveDir,
      log,
    });
    await parser.parse();
    await parser.writeFile();
  } catch (err) {
    logger.error("Something went wrong while parsing NextJS project", {
      err,
    });
  }
};
