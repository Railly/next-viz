import chalk from "chalk";
import figlet from "figlet";
import clear from "clear";
import { program } from "commander";
clear();
console.log(chalk.red(figlet.textSync("react-aleph-cli", {
    horizontalLayout: "full",
})));
program
    .version("0.0.1")
    .description("A CLI for visualization tool for React Project")
    .option("-s --source <path>", "Source path of the project")
    .option("-d --destination <path>", "Destination path of the project")
    .option("-h --help", "Show help")
    .parse(process.argv);
