import chalk from 'chalk';
import prompts from 'prompts';
import { randomInt } from 'node:crypto';
import { appendFileSync } from 'node:fs';

const MAX_ATTEMPTS = 3;
const MIN_NUMBER = 1;
const MAX_NUMBER = 10;
const secretNumber = randomInt(MIN_NUMBER, MAX_NUMBER + 1);
const logFile = new URL('./game-output.txt', import.meta.url);
const messages = [];

function display(message, color = chalk.white) {
  console.log(color(message));
  messages.push(message);
}

function validateGuess(input) {
  const text = input.trim();
  if (text === '') {
    throw new Error('A guess is required.');
  }

  const guess = Number(text);
  if (!Number.isInteger(guess)) {
    throw new Error('Enter a whole number. Decimals and non-numeric input are not allowed.');
  }
  if (guess < MIN_NUMBER) {
    throw new Error(`Guess must be at least ${MIN_NUMBER}.`);
  }
  if (guess > MAX_NUMBER) {
    throw new Error(`Guess cannot exceed ${MAX_NUMBER}.`);
  }
  return guess;
}

let won = false;
let cancelled = false;

try {
  display('GUESS THE NUMBER!', chalk.magenta.bold);
  display(`Guess a whole number between ${MIN_NUMBER} and ${MAX_NUMBER}.`, chalk.cyan);
  display(`You have ${MAX_ATTEMPTS} attempts!`, chalk.yellow);
  display('Invalid entries also count as attempts. Press Ctrl+C to quit.', chalk.cyan);
  display('Each game is appended to game-output.txt.', chalk.cyan);

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const question = `Attempt ${attempt}/${MAX_ATTEMPTS}: Enter your guess`;
    const response = await prompts({
      type: 'text',
      name: 'guess',
      message: question
    });

    if (response.guess === undefined) {
      messages.push(`${question} - [cancelled]`);
      display('Game cancelled.', chalk.yellow);
      cancelled = true;
      break;
    }

    messages.push(`${question} - ${response.guess}`);
    try {
      const guess = validateGuess(response.guess);
      if (guess === secretNumber) {
        display(`YOU WIN! The secret number was ${secretNumber}.`, chalk.green.bold);
        won = true;
        break;
      }
      display(guess < secretNumber ? 'Too low!' : 'Too high!', chalk.yellow);
    } catch (error) {
      display(error.message, chalk.red);
    }
  }

  if (!won && !cancelled) {
    display('GAME OVER!', chalk.red.bold);
    display(`The secret number was ${secretNumber}.`);
  }
  display('Thanks for playing!', chalk.magenta);
} catch (error) {
  display(`Unable to continue the game: ${error.message}`, chalk.red);
  process.exitCode = 1;
} finally {
  try {
    const heading = `Game played: ${new Date().toISOString()}`;
    appendFileSync(logFile, `${heading}\n${messages.join('\n')}\n\n`, 'utf8');
  } catch (error) {
    console.error(chalk.red(`Could not save game-output.txt: ${error.message}`));
    process.exitCode = 1;
  }
}
