const fs = require('fs');
const arrayNumbers = [];

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

for (let i = 0; i < 9650000 / 4; i++) {
    arrayNumbers.push(getRandomInt(10000000000));
}

fs.writeFile('numbers1.txt', arrayNumbers.join(' '), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
});

