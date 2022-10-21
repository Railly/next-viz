import { Command } from "commander";
import clear from "clear";
import chalk from "chalk";
import figlet from "figlet";

const program = new Command();

clear();
// with version
const version = "0.0.0";
console.log(chalk.magenta.bold("React Aleph CLI v" + version));

program
  .name("react-aleph")
  .description("CLI to some JavaScript string utilities")
  .version(version, "-v, --version", "output the current version");

program
  .command("hello")
  .description("Say hello!")
  .action(() => {
    console.log("Hello World!");
  });

// get file system path
program
  .command("path")
  .description("Get file system path")
  .action(() => {
    console.log("Get file system path");
    console.log(__dirname);
    console.log(__filename);
  });

program.parse();
