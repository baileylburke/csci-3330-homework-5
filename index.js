import chalk from 'chalk';
import prompts from 'prompts';
import { randomInt } from 'node:crypto';

const MAX_ATTEMPTS = 3;
const secretNumber = randomInt(1, 11);

console.log(chalk.magenta.bold('GUESS THE NUMBER!'));
console.log(chalk.cyan('Guess a whole number between 1 and 10.'));
console.log(chalk.yellow(`You have ${MAX_ATTEMPTS} attempts!`));
console.log(chalk.cyan('Invalid entries also count as attempts.'));

const response = await prompts({
  type: 'text',
  name: 'guess',
  message: `Attempt 1/${MAX_ATTEMPTS}: Enter your guess`
});

if (response.guess === undefined) {
  console.log(chalk.yellow('Game cancelled.'));
} else {
  console.log(chalk.cyan(`You entered: ${response.guess}`));
}
