import path from "path";
import {
  getPackageJson,
  verifyFileExists,
  writeFile,
  writeNewFile,
} from "../utils/fs-extra";
import { logger } from "../utils/loggers";
import shelljs from "shelljs";

export const initiateNextViz = async () => {
  try {
    logger.viz("Next Viz, a visualizer for Next.js");
    logger.info("Initializing Next Viz");
    generateNextVizConfigInCWD();
    addScriptToPackageJson("next-viz start");
    logger.success("Next Viz initialized successfully");
  } catch (err) {
    logger.error("Something went wrong while initializing Next Viz", {
      err,
    });
    process.exit(0);
  }
};

export const generateNextVizConfigInCWD = () => {
  const target = process.cwd();
  return generateNextVizConfig({ target });
};

export const generateNextVizConfig = async ({ target }: { target: string }) => {
  try {
    logger.info(
      `Generating Next Viz config at ${path.basename(target)} folder`
    );
    verifyFileExists("next.config.js");
    await writeNewFile("viz.config.js", "module.exports = {}");
    logger.success("Next Viz config generated successfully");
  } catch (err) {
    logger.error("Something went wrong while generating config", {
      err,
    });
    process.exit(0);
  }
};

const addScriptToPackageJson = async (scriptName: string) => {
  try {
    logger.info("Adding script to package.json");
    const packageJson = getPackageJson();

    const hasVizScript = Object.keys(packageJson.scripts).includes("viz");

    if (hasVizScript) {
      logger.warn("viz script already exists in package.json");
      return;
    }

    packageJson.scripts.viz = scriptName;
    const location = path.join(process.cwd(), "package.json");

    // TODO: use npm pkg set scripts.viz next-viz start
    writeFile(location, `${JSON.stringify(packageJson, null, 2)}\n`).then(
      () => {
        logger.success("Script added to package.json");
      },
      () => {
        logger.warn("Something went wrong while adding script to package.json");
      }
    );
  } catch (err) {
    logger.error("Something went wrong while adding script to package.json", {
      err,
    });
  }
};
