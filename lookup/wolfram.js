
// Reference: https://products.wolframalpha.com/api/documentation/#getting-started

const WolframAlphaAPI = require('wolfram-alpha-api');

// TODO: store WolframAlpha APPID as secret for APP NAME: midterm_jarvis
const WOLFRAMALPHA_APPID = 'K7VTJY-E3G7LG2P2K';
const waApi = WolframAlphaAPI(WOLFRAMALPHA_APPID);

const categoryKeys = [
  // 1: 'Film or series to watch',
  ["Film", "Movie", "TV", "Short Film", "Television", "Television Series", "Documentary", "Documentary Series"],
  // 2: 'Books to read',
  ["Book", "Magazine", "Periodical", "Newspaper", "Blog", "Comics", "Book", "Story book", "Novel", "Autobiography", "Paperback", "Hardcover"],
  // 3: 'Restaurants where you can eat',
  ["Restaurant", "Cafe", "Eatery", "Canteen", "Bakery", "Food Stall", "ExpandedFood"],
  // 4: 'Products to buy'
  ["Product", "Shopping item", "Vegetable", "Grocery item", "Produce", "Eatable", "Gadget", "Apperal", "Clothes", "Consumable", "Device"]
];

const datatypes = 'datatypes';
const plaintext = 'plaintext';

/**
 * determineCategory: Determine the category of the
 * given string from:
 * {
 *    Other:                  0,
 *    Film_series_to watch:   1,
 *    Books_to_read:          2,
 *    Restaurants_to_eat_at:  3,
 *    Products_to_buy:        4
 * }
 * @param {String} searchString : String to determine the category of
 * @param {function(error, Number)} resultCallback : callback function to handle the result
 *
 * @return {Number} categoryId : Category Id number of the given search string
 */
const determineCategory = function(searchString, resultCallback) {
  waApi.getFull({
    input: searchString,
    scanner: datatypes,
    format: plaintext,
  })
    .then((result) => {
      console.log({result});
      const resultTypes = result[datatypes];
      console.log({ resultTypes });
      if (!resultTypes) {
        resultCallback("Category Not Found!");
        return;
      }
      let categoryId = 0;
      for (keyArr of categoryKeys) {
        categoryId++;
        for (key of keyArr) {
          if (resultTypes.indexOf(key) > -1) {
            // TODO: Future enhancement: Add support for multiple categories for an item search string
            console.log({categoryId});
            return resultCallback(null, categoryId);
          }
        }
      }
      // Category not found
      resultCallback("Category Not Found!");
      return;
    })
    .catch((error) => { console.log(error) });

};

module.exports = { determineCategory: determineCategory };
