import clear from "clear";
import chalk from "chalk";
import { logger } from "./utils/loggers";
import shelljs from "shelljs";
import { createViteServer } from "@next-viz/ui";

const PORT = 3001;

export const startNextViz = async () => {
  try {
    clear();
    await createViteServer(PORT);
    logger.viz(`Next Viz is running on: http://localhost:${PORT}`);
  } catch (err) {
    logger.error("Something went wrong while starting Next Viz", {
      err,
    });
    process.exit(0);
  }
};
