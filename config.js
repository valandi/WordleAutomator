const config = {
    /**
     * Possible Algorithms:
     * 1. guessMinimizer
     * 2. winMaximizer
     * 3. random
     * 4. cheater
     */
    algorithm: "guessMinimizer",
    
    // Set to true to run in headless mode. 
    // Set to false to open browser in headful mode.
    headless: false,
    
    // Word to start with. 
    startingWord: "salet"
};

export {config as default};