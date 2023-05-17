import chalk from "chalk";
export const hl = chalk.hex('#FFFFA7'); // highlight
export const exclamationMark = chalk.redBright.bold('!');
export const checkMark = chalk.green('✔');
export const crossMark = chalk.red('✖');
export const formatTitle = (title) => {
    const lineBreak = '--------------------------------------------';
    return `${chalk.gray(lineBreak)}\n${chalk.blue.bold(title)}\n`;
};
