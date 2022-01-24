import config from '../config.js';
import {solve as solveGuessMinimizer} from './Algorithms/GuessMinimizer.js';
import {solve as solveRandom} from './Algorithms/Random.js';
import {solve as solveCheater} from './Algorithms/Cheater.js';

switch(config.algorithm) {
    case 'guessMinimizer':
        console.log("Using guess minimizer algorithm");
        solveGuessMinimizer(config.headless, config.startingWord);
        break;
    case 'winMaximizer':
    case 'random':
        console.log("Using random algorithm");
        solveRandom(config.headless);
        break;
    case 'cheater':
        console.log("Let's cheat.");
        solveCheater(config.headless);
        break;
    default:
        console.log(`
            Choose a valid algorithm:
            1. guess_minimizer
            2. win_maximizer
            3. random
            4. cheater 
        `)
}
