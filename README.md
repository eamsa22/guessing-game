
# Word Guessing Game

## Overview

This is a word guessing game where the player tries to guess a 5-letter word within 6 attempts. The game has a maximum time limit of 10 minutes, and each attempt is validated against an API to check if the word exists. If the word exists, the game checks for correct letters and places them in green, while misplaced letters (but present in the word) are colored red. The word to be guessed is also logged in the console.

There is a statistics page that shows details about previous games, and Cypress UI tests are written to ensure the functionality works correctly.

## Project Commands

### Project Setup

To install dependencies, run:
```
npm install
```

### Compiles and Hot-Reloads for Development

To start the development server, run:
```
npm run serve
```

### Compiles and Minifies for Production

To build the project for production, run:
```
npm run build
```

### Run Tests

To run the tests, use:
```
npm run test
```

### Customize Configuration

For more details, refer to the [Configuration Reference](https://cli.vuejs.org/config/).

## User Guide

### Here are some useful tips:

- You can modify the content of a box simply by clicking it, and then clicking on the letter you want to insert from the on-screen keyboard.

- A waiting period of 2 seconds is added before redirecting to the result page to visualize the stop time.

- The solution (the word to guess) is displayed in the console after each game.

## Organization

#### Components

- `Case.vue` – Represents a single letter box where users can input letters.
- `Chrono.vue` – Handles the countdown timer for the game.
- `Game.vue` – The main game interface, including the word input area, keyboard, and status updates.
- `Home.vue` – The landing page before starting the game.
- `Key.vue` – Represents a single key on the on-screen keyboard.
- `KeyBoard.vue` – Displays the full on-screen keyboard for users to select letters.
- `Result.vue` – Displays the result page after the game ends, showing if the player won or lost.
- `Stats.vue` – A statistics page that shows previous game results.