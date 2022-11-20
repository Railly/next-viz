import clear from "clear";
import { logger } from "../utils/loggers";
import { createViteServer } from "@next-viz/ui";
import { ParserOptions } from "@next-viz/core";

export const startNextViz = async (options: ParserOptions) => {
  try {
    clear();
    await createViteServer(options);
    logger.viz("Next Viz is running on: http://localhost:3001");
  } catch (err) {
    logger.error("Something went wrong while starting Next Viz", {
      err,
    });
    process.exit(0);
  }
};
