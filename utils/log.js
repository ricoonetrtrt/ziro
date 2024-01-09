const chalk = require('chalk');
const colors = ['green', 'yellow', 'cyan', 'bgMagenta', 'bgBlue'];

module.exports = (data, option) => {
  switch (option) {
    case "warn":
      console.log(chalk.yellow('⚠️  Warning: ') + chalk.yellow(data));
      break;
    case "error":
      console.log(chalk.red('❌  Error: ') + chalk.red(data));
      break;
    default:
      console.log(chalk[colors[Math.floor(Math.random() * colors.length)]](`🚀  ${option}: `) + chalk[colors[Math.floor(Math.random() * colors.length)]](data));
      break;
  }
}

module.exports.loader = (data, option) => {
  switch (option) {
    case "warn":
      console.log(chalk.yellow('⚠️  Warning: [ AYUMI GLOBL ] ') + chalk.yellow(data));
      break;
    case "error":
      console.log(chalk.red('❌  Error: [ ERORR ] ') + chalk.red(data));
      break;
    default:
      console.log(chalk.green('✅  Success: [ AYUMI SYSTM ] ') + chalk.green(data));
      break;
  }
}
