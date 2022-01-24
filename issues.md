## Issue: Replace explicit waits with implicit waits
Don't use explicit sleeps for waits, wait for the element to be visible intelligently. 

## Issue: Implement all algorithms
### Win Maximizer
Eliminate as many letters as possible to get the corpus as small as possible and only guess on the 6th try (or when the corpus). 
Start trying to win when corpus is at size zero (I think??). 
This will be the hardest algorithm, might have to research the mathematically optimal strategy or come up with one


### Guess Minimizer (DONE)
Always guess given the letters that we've already guess correctly (including positions)

### Random (DONE)
Just guess randomly everytime.

### Cheater
Just read the array in the Wordle client code and get the right answer


## Issue: Use camelcase or snakecase
Pick one

## Issue: Fix multiple letter issue
Eliminate used words from available_words as a failsafe

## Issue: Play with timeouts
Do we even need the timeouts, or can they be replaced with something more intellignet?

## Issue: Utilize config file
Utilize:
1. Start word
1. Browser head mode