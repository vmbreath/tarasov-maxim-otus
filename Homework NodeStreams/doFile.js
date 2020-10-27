const fs = require('fs');
let stringLineNumbers = '';

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

const data = fs.createWriteStream(`numbersByLines.txt`)
let numbersInLine = 0;
for (let i = 0; i < 9650000 / 4; i++) {
    stringLineNumbers += getRandomInt(10000000000) + ' ';
    numbersInLine++;
    if (numbersInLine === 20) {
        data.write(stringLineNumbers + '\r\n');
        stringLineNumbers = '';
        numbersInLine = 0;
    }
}
data.end();







