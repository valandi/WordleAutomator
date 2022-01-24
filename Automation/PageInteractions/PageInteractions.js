const tryWord = async (page, charSequence) => {
  for (let index = 0; index < charSequence.length; index++) {
    await page.evaluateHandle(`
            document.querySelector("body > game-app")
                    .shadowRoot
                    .querySelector("#game > game-keyboard")
                    .shadowRoot
                    .querySelector('button[data-key="${charSequence[index]}"]')
                    .click();
    `);
  }
};

const pressEnter = async (page) => {
  await page.evaluateHandle(`
      document.querySelector("body > game-app")
              .shadowRoot
              .querySelector("#game > game-keyboard")
              .shadowRoot
              .querySelector("#keyboard > div:nth-child(3) > button:nth-child(1)")
              .click();
  `);
};

const closePopUp = async (page) => {
  await page.evaluateHandle(`
      document.querySelector("body > game-app")
              .shadowRoot
              .querySelector("#game > game-modal")
              .shadowRoot
              .querySelector("div > div > div > game-icon")
              .click();
  `);
};

const closeEndPopUp = async (page) => {
  await page.evaluateHandle(`
        document.querySelector("body > game-app")
                .shadowRoot
                .querySelector("#game > game-modal")
                .shadowRoot
                .querySelector("div > div > div > game-icon")
                .click();
  `);
};

const getLetterAndEvaluation = async (page, rowNumber, letterPosition) => {
  let letter = await page.evaluate(`
    document
      .querySelector("body > game-app")
      .shadowRoot
      .querySelector("#board > game-row:nth-child(${rowNumber})")
      .shadowRoot.querySelector("div > game-tile:nth-child(${letterPosition})")
      .getAttribute('letter');
  `);

  let evaluation = await page.evaluate(`
    document
      .querySelector("body > game-app")
      .shadowRoot.querySelector("#board > game-row:nth-child(${rowNumber})")
      .shadowRoot.querySelector("div > game-tile:nth-child(${letterPosition})")
      .getAttribute('evaluation');
  `);
  
  return [letter, evaluation];
};

const gameIsDone = async (page) => {
  try {
    await page.evaluate(`
      document
        .querySelector("body > game-app")
        .shadowRoot
        .querySelector("#game > game-modal > game-stats")
        .shadowRoot.querySelector("div")`);
  } catch (e) {
    return false;
  }

  return true;
};

export {
  tryWord,
  pressEnter,
  closePopUp,
  closeEndPopUp,
  getLetterAndEvaluation,
  gameIsDone,
};
