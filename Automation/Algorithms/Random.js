import puppeteer from "puppeteer";

import {possibleWords} from "../Constants/Constants.js";
import {
  tryWord,
  closePopUp,
  pressEnter,
  gameIsDone,
} from "../PageInteractions/PageInteractions.js";

const variables = {
  availableWords: possibleWords,
};

const updateVariables = (page, rowNumber, guessedWord) => {
  variables.availableWords.filter((word) => word !== guessedWord);
};

const getNextWord = () => {
  return variables.availableWords[
    Math.floor(Math.random() * variables.availableWords.length)
  ];
};

const solve = async (isHeadless) => {
  const browser = await puppeteer.launch({ headless: isHeadless });
  const page = await browser.newPage();
  await page.goto("https://www.powerlanguage.co.uk/wordle/");

  await closePopUp(page);

  do {
    let wordToGuess = getNextWord();
    await tryWord(page, wordToGuess);
    await page.waitForTimeout(2000);
    await pressEnter(page);
    await page.waitForTimeout(2000);
    updateVariables();
    await page.waitForTimeout(5000);
    var gameDone = await gameIsDone(page);
  } while (!gameDone);

  await page.screenshot({ path: "wordle.png" });
  await browser.close();
};

export { solve };
