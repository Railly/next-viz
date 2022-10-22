import { Command } from "commander";
import clear from "clear";
import chalk from "chalk";
import figlet from "figlet";
import path from "path";
import fs from "fs";
import { getVersion } from "./utils";
import gradient from "gradient-string";

const logger = console;

const program = new Command();

program
  .version(getVersion())
  .command("init")
  .description("Initialize Next Viz into your project")
  .action(() => {
    clear();
    logger.log(
      chalk.bold(gradient.cristal("Next Viz, a visualizer for Next.js"))
    );

    logger.log("Current working directory:", process.cwd());
    const nextConfigPath = path.join(process.cwd(), "next.config.js");
    fs.access(nextConfigPath, fs.constants.F_OK, (err) => {
      const chalkWrapper = err ? chalk.red : chalk.green;
      logger.log(
        chalkWrapper(
          "next.config.js ▲",
          err ? "does not exist ⚠️" : "exists ✅"
        )
      );
    });
    const alephConfigPath = path.join(process.cwd(), "viz.config.js");
    fs.writeFile(alephConfigPath, "export default {}", (err) => {
      !err && logger.log(chalk.green("viz.config.js created successfully ✅"));
    });
  });

program
  .command("viz")
  .description("Start Next Viz")
  .action(() => {
    clear();
    logger.log(chalk.bold.green("Running Next Viz on port 3000"));
  });

program.parse(process.argv);

// program
//   .name("react-aleph")
//   .description("Visualize your Next.js app")
//   .version(version, "-v, --version", "output the current version")
//   .allowUnknownOption()
//   .arguments("[args]")
//   .action((args) => {
//     if (args) {
//       console.log(chalk.red("Unknown command: " + args));
//     }
//     program.help();
//   });

// program
//   .option("--init")
//   .alias("-i")
//   .description("Initialize a react-aleph in your Next.js project")
//   .action(() => {
//   })
