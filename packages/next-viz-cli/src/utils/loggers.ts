import chalk from "chalk";
import gradient from "gradient-string";

export const logger = {
  success: (msg: string) =>
    console.log(chalk.bold.green(" SUCCESS "), msg, "✨"),
  info: (...args: any[]) => console.log(chalk.bold.blue(" INFO "), ...args),
  error: (...args: any[]) =>
    console.log(chalk.bold.red(" ERROR "), ...args, "❌"),
  warn: (msg: string) => console.log(chalk.bold.yellow(" WARN "), msg),
  log: (...args: any[]) =>
    console.log(chalk.bold.white(" LOG "), ...args, "📝"),
  viz: (...args: any[]) =>
    console.log(chalk.bold(gradient.cristal(...args)), "📊"),
};
