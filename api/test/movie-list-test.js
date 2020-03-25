const assert = require('chai').expect;

const page = require('../page/movie-list-page.js');

const testCase = {
   "positive" : {
      "getList" : "As a User, I want to be able to get OMDB Movie list",
   },
   "negative" : {
      "noSearch" : "As a User, I should got error message when I send request without key of search",
      "invalidApiKey" : "As a User, I should got error 401 when I send request with invalid API Key",
      "notfoundSearch" : "As a User, I should got error error message when I send request with not found key of search",
      "specialCharSearch" : "As a User, I should got error error message when I send request with special character key of search"
   }
}

describe('OMDB Movie List', () => {
   const apiKey = 'e38c9026';
   const invalidApiKey = 'slhyz';
   const notfoundSearch = 'ASKISFJOEJWOJWOSOEFIJSDOI';
   const keySearch = 'furious';
   const specialCharSearch = '!@';

   it('@get ${testCase.positive.getList}', async() => {
      const response = await page.getMovieList(apiKey, keySearch);
      assert(response.status).to.equal(200);
   //   console.log(testCase.positive.getList);
   }),

   it('@get ${testCase.negative.noSearch}', async() => {
      const response = await page.getMovieList(apiKey, '');
      assert(response.status).to.equal(200, response.body.Error);
      assert(response.body.Response).to.equal('False');
   }),

   it('@get ${testCase.negative.invalidApiKey}', async() => {
      const response = await page.getMovieList(invalidApiKey, keySearch);
      assert(response.status).to.equal(401, response.body.Error);
      assert(response.body.Response).to.equal('False');
      assert(response.body.Error).to.equal('Invalid API key!');
   }),

   it('@get ${testCase.negative.notfoundSearch}', async() => {
      const response = await page.getMovieList(apiKey, notfoundSearch);
      assert(response.status).to.equal(200, response.body.Error);
      assert(response.body.Response).to.equal('False');
      assert(response.body.Error).to.equal('Movie not found!');
   }),

   it('@get ${testCase.negative.specialCharSearch}', async() => {
      const response = await page.getMovieList(apiKey, specialCharSearch);
      assert(response.status).to.equal(200, response.body.Error);
      assert(response.body.Response).to.equal('False');
      assert(response.body.Error).to.equal('Too many results.');
   })
}) 