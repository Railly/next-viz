#!/usr/bin/env node
import { Command } from "commander";
import { initiateNextViz } from "./commands/init";
import { parseNextJSProject } from "./commands/parse";
import { startNextViz } from "./commands/start";
import { getPackageJson } from "./utils/fs-extra";

const options = {
  rootFolderPath: process.cwd(),
  rootComponents: ["pages", "components"],
  pathToSaveDir: ".next-viz",
  log: true,
};

const program = new Command();

program
  .version(getPackageJson().version)
  .command("init")
  .description("Initialize Next Viz into your project")
  .action(initiateNextViz);

program
  .command("start")
  .description("Start Next Viz server")
  .action(async () => {
    await startNextViz(options);
  });

program
  .command("parse")
  .description("Parse Next.js root directory")
  .action(async () => {
    await parseNextJSProject(options);
  });

program.parse(process.argv);
