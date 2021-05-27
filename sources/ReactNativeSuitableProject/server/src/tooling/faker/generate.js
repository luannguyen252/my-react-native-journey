/* This script generates mock data for local development.
   This way you don't have to point to an actual API,
   but you can enjoy realistic, but randomized data,
   and rapid page loads due to local, static data.
 */

const jsf = require('json-schema-faker');
const schema = require('./schema');
const fs = require('fs');

jsf.extend('faker', () => require('faker'));
jsf.option({
    resolveJsonPath: true,
});

const json = JSON.stringify(jsf.generate(schema), null, 4);

fs.writeFile("./src/api/db.json", json, function (err) {
  if (err) {
    return console.log(err);
  } else {
    console.log("[API] Mock data generated.");
  }
});