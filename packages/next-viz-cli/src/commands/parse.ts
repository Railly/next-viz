import { ASTParser, ParserOptions } from "@next-viz/core";
import { logger } from "../utils/loggers";

export const parseNextJSProject = async ({
  rootFolderPath = process.cwd(),
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
  } catch (err) {
    logger.error("Something went wrong while parsing NextJS project", {
      err,
    });
  }
};
