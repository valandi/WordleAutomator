import puppeteer from "puppeteer";

import { possibleWords } from "../Constants/Constants.js";
import {
  tryWord,
  closePopUp,
  pressEnter,
  getLetterAndEvaluation,
  gameIsDone,
} from "../PageInteractions/PageInteractions.js";

const variables = {
  lettersInWord: [],
  eliminatedLetters: [],
  lettersInPlace: ["", "", "", "", ""],
  currentRow: 1,
  availableWords: possibleWords,
};

const updateVariables = async (page, rowNumber, guessedWord) => {
  for (let letterIndex = 0; letterIndex < 5; letterIndex++) {
    let guessResult = await getLetterAndEvaluation(
      page,
      rowNumber,
      (letterIndex + 1).toString()
    );
    let letter = guessResult[0];
    let evaluation = guessResult[1];
    if (evaluation === "absent") {
      variables.eliminatedLetters.push(letter);
    } else if (evaluation === "present") {
      variables.lettersInWord.push(letter);
    } else if (evaluation === "correct") {
      variables.lettersInWord.push(letter);
      variables.lettersInPlace[letterIndex] = letter;
    }
  }

  // Remove letters from eliminated letters IFF that letters_in_wrod contains letter
  // Consider the case:
  // Available words: [crimp, primp], Answer: crimp, Guess: primp
  // We guess primp, and 'p' is marked as absent (this is in the logic of the game), so p is added to eliminated_letters even though there is a p in the word
  // This will also filter crimp from available words. If we mark a letter as absent, we eliminate the correct answer.
  // We can remove valid letters from eliminated letters after variables are updated AND just remove the last guess from available_words.

  // Remove eliminated letter if exists in letters_in_word
  variables.eliminatedLetters = variables.eliminatedLetters.filter(
    (letter) => !variables.lettersInWord.includes(letter)
  );

  // Remove guessed_word from available_words
  variables.availableWords.filter((word) => word !== guessedWord);

  variables.currentRow++;

  // Update available words
  // 1. Contain letters in right place
  for (let letterIndex = 0; letterIndex < 5; letterIndex++) {
    if (variables.lettersInPlace[letterIndex] !== "") {
      variables.availableWords = variables.availableWords.filter(
        (word) => word[letterIndex] === variables.lettersInPlace[letterIndex]
      );
    }
  }

  // 2. Do not contain letters in eliminated_letters
  for (
    let elimLetterIndex = 0;
    elimLetterIndex < variables.eliminatedLetters.length;
    elimLetterIndex++
  ) {
    variables.availableWords = variables.availableWords.filter(
      (word) => !word.includes(variables.eliminatedLetters[elimLetterIndex])
    );
  }

  // 3. Must contain letters in letters_in_word
  for (
    let letterIndex = 0;
    letterIndex < variables.lettersInWord.length;
    letterIndex++
  ) {
    variables.availableWords = variables.availableWords.filter((word) =>
      word.includes(variables.lettersInWord[letterIndex])
    );
  }
};

const getNextWord = () => {
  const totalAvailableWords = variables.availableWords.length;
  if (totalAvailableWords === 1) {
    return variables.availableWords[0];
  }

  return variables.availableWords[
    Math.floor(Math.random() * totalAvailableWords)
  ];
};

const solve = async (isHeadless, firstWord) => {
  const browser = await puppeteer.launch({ headless: isHeadless });
  const page = await browser.newPage();
  await page.goto("https://www.powerlanguage.co.uk/wordle/");

  await closePopUp(page);

  let wordToGuess = firstWord;
  let gameDone = false;
  while (!gameDone) {
    await tryWord(page, wordToGuess);
    await page.waitForTimeout(2000);
    await pressEnter(page);
    await page.waitForTimeout(2000);
    await updateVariables(page, variables.currentRow, wordToGuess);
    await page.waitForTimeout(2000);
    console.log("Variables: ", variables);
    wordToGuess = getNextWord();
    await page.waitForTimeout(5000);
    gameDone = await gameIsDone(page);
  }

  await page.screenshot({ path: "wordle.png" });
  await browser.close();
};

export {solve};