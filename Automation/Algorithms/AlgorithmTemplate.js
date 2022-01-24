import puppeteer from "puppeteer";

import possible_words from "../Constants/Constants.js";
import { closePopUp } from "../PageInteractions/PageInteractions.js";

const variables = {
  available_words: possible_words,
};

const updateVariables = (page, row_number, guessed_word) => {
    throw new Exception("Not implemented");
};

const getNextWord = () => {
    throw new Exception("Not implemented");
};

const solve = async (is_headless) => {
  const browser = await puppeteer.launch({ headless: is_headless });
  const page = await browser.newPage();
  await page.goto("https://www.powerlanguage.co.uk/wordle/");

  await closePopUp(page);

  await page.screenshot({ path: "wordle.png" });
  await browser.close();
};

export { solve };
