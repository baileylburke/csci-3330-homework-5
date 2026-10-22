# Guess the Number

CSCI-3330 Homework 5

## Run

Use Node.js 24 LTS. From this project folder, run:

```text
npm ci
npm start
```

Guess a whole number from 1 through 10 in three attempts. Invalid entries count as attempts, as shown in the assignment sample. The game gives high/low hints, prints validation errors in red, wins in green, and losses in red. Press Ctrl+C to cancel.

Each game appends its messages, prompts, and submitted guesses to `game-output.txt` beside `index.js`. The log contains plain text without terminal color codes. It is generated when the game runs and is ignored by Git.

The project uses ES modules, `prompts`, `chalk`, `node:crypto`, and `node:fs`. `setup-evidence.txt` records terminal setup and dependency checks.
