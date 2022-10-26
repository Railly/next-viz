#!/usr/bin/env node
import { Command } from "commander";
import { initiateNextViz } from "./generate";
import { startNextViz } from "./start";
import { getPackageJson } from "./utils/fs-extra";

const program = new Command();

program
  .version(getPackageJson().version)
  .command("init")
  .description("Initialize Next Viz into your project")
  .action(initiateNextViz);

program
  .command("start")
  .description("Start Next Viz server")
  .action(startNextViz);

program.parse(process.argv);
