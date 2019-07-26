# lettersToWords

### About
- This is a program built to find word permutations for a given input of letters based on a user selected length of resulting words. For example, the word permutations for the input “rea” with the output length set to 3 are “ear, era, are”.

### How it Works

- The program works by first finding the powerset for the given input. For example, the powerset for the input “rea” is {{},{r}, {e}, {a}, {r,e}, {r,a}, {e,a}, {r,e,a}}. This powerset is then limited to the user selected output size. Continuing the example above, if the selected output size is 3 the powerset is reduced to {{r,e,a}}. This reduced powerset is then passed to a permutation function.

- The permutation function will find all permutations for each element of the reduced powerset passed to it. For example, if it is passed the reduced powerset from above {{r,e,a}} the resulting permutations are [[rea], [rae], [era], [ear], [are], [aer]]. This permutation array is then passed to a lookup function.

- The lookup function will check each element of the permutations array against a lookup table populated with real words. The words in the lookup table are a collection of words from the Official Scrabble Players Dictionary and Wiktionary&apos;s word frequency list. (Credit to GitHub user dolph for making these sources open to use)  The words that are matched with an entry in this lookup table are then returned as an array. Continuing the example above the array returned would be [[era], [ear], [are]].

### Technology Used
- This program was built using a Javascript Node backend running Express.js for the server. It is exposing an API endpoint that is being consumed by a frontend built using Bootstrap3 for the responsive styling and Handlebars.js for the templating. The application was deployed and hosted on Heroku.

### Instructions

- Type in the letters that you want to find word permutations for in the Letters text box. You can put in a maximum of 8 letters during each calculation. Then select the minimum and maximum result word length using the dropdown menus below. These can be used to limit your results to certain word lengths. For example, with the input of “cba” and the min and max set to 3, the results will be “cab”. If you want the most results for your input, set the minimum to 2 and the maximum to the number of letters you used in the input.

### Live Demo
[Letters-To-Words](https://bnray53.github.io/briansBrain "Letters-To-Words")