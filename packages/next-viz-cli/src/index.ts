#!/usr/bin/env node
import { Command } from "commander";
import clear from "clear";
import chalk from "chalk";
import { logger } from "./utils/loggers";
import { generateNextVizConfigInCWD } from "./generate";
import { getPackageJson } from "./utils/fs-extra";

const program = new Command();

program
  .version(getPackageJson().version)
  .command("init")
  .description("Initialize Next Viz into your project")
  .action(generateNextVizConfigInCWD);

program
  .command("start")
  .description("Start Next Viz")
  .action(() => {
    clear();
    logger.log(chalk.bold.green("Running Next Viz on port 3000"));
    process.stdin.resume();
  });

program.parse(process.argv);
