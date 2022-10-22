import fs from "fs";
import path from "path";
import { logger } from "./loggers";

export const access = (path: string, mode: number) => {
  return new Promise((resolve, reject) => {
    fs.access(path, mode, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};

export const writeFile = (path: string, data: string) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};

export const verifyFileExists = async (fileName: string) => {
  logger.info(`Verifying ${fileName} exists`);
  const location = path.join(process.cwd(), fileName);
  await access(location, fs.constants.F_OK).then(
    () => {
      logger.success(`${fileName} found in current directory`);
    },
    () => {
      logger.error(`${fileName} not found in current directory`);
      process.exit(1);
    }
  );
};

export const writeNewFile = async (fileName: string, data: string) => {
  return new Promise(async (resolve, reject) => {
    const location = path.join(process.cwd(), fileName);
    const exists = await access(location, fs.constants.F_OK).then(
      () => true,
      () => false
    );

    if (exists) {
      logger.warn(`${fileName} already exists in current directory`);
      resolve(true);
    }

    // TODO: Prompt user to overwrite file

    writeFile(location, data).then(
      () => {
        resolve(true);
      },
      (err) => {
        logger.error(`Something went wrong while creating ${fileName}`);
        reject(err);
      }
    );
  });
};

export const getPackageJson = () => {
  const location = path.join(process.cwd(), "package.json");
  const packageJson = fs.readFileSync(location, "utf8");
  return JSON.parse(packageJson) as {
    name?: string;
    version: string;
    scripts: { [key: string]: string };
    dependencies: { [key: string]: string };
    devDependencies?: { [key: string]: string };
    peerDependencies?: { [key: string]: string };
  };
};
