const fs = require('fs');
const readline = require('readline');
const crypto = require('crypto');

function textGenerator(length) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]|:;"<>,.?/~`-=';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, alphabet.length);
    result += alphabet[randomIndex];
  }
  return result;
}

function emailGenerator(length = 10) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, alphabet.length);
    result += alphabet[randomIndex];
  }
  return `${result}@testemail.com`;
}

async function* readDataFromCsv(filePath) {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let isFirstLine = true;
  for await (const line of rl) {
    if (isFirstLine) {
      isFirstLine = false;
      continue;
    }
    const row = line.split(',');
    yield row;
  }
}

module.exports = {
  textGenerator,
  readDataFromCsv,
  emailGenerator
};
