#!/usr/bin/env node
import { Command } from "commander";
import { initiateNextViz } from "./commands/init";
import { parseNextJSProject } from "./commands/parse";
import { startNextViz } from "./commands/start";
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

program
  .command("parse")
  .description("Parse Next.js root directory")
  .action(parseNextJSProject);

program.parse(process.argv);
