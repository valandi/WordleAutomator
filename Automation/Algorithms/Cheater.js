import puppeteer from "puppeteer";

import {solutions} from "../Constants/Constants.js";
import {
  tryWord,
  closePopUp,
  pressEnter,
} from "../PageInteractions/PageInteractions.js";

const variables = {
  availableWords: solutions
};

const updateVariables = (page, rowNumber, guessedWord) => {
  throw new Exception("Why are you updating variables, you're cheating.");
};

const getNextWord = () => {
    /**
     *  The magic number "18797" is the number of days from Epoch
     *  that the first solution of Wordle was written. 
     *  In the client code, each day's answer is stored in order.
     *  We can think of this as a mapping like:
     *  Word 0 -> 18797 days since EPOCH
     *  Word 10 -> 18807 days since EPOCH
     *  We calculate the number of days from today to Epoch, subtract 19016
     *  and get the index of today's answer. 
     * */ 
    const STARTING_EPOCH_DAYS = 18797;

    const daysSinceEpoch = getDaysSinceEpoch();

    return variables.availableWords[daysSinceEpoch - STARTING_EPOCH_DAYS];
};

const getDaysSinceEpoch = () => {
    const now = new Date();
    const msInDay = 8.64e7;
    return Math.floor(now/msInDay);
}

const solve = async (isHeadless) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.powerlanguage.co.uk/wordle/");

  await closePopUp(page);

  let wordToGuess = getNextWord();
  await tryWord(page, wordToGuess);
  await page.waitForTimeout(2000);
  await pressEnter(page);
  await page.waitForTimeout(2000);

  await page.screenshot({ path: "wordle.png" });
  await browser.close();
};

export { solve };
