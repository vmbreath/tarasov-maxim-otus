const fs = require('fs');
const readline = require('readline');

//Создаю потоки для чтения файлов и поток для записи
const writeStream = fs.createWriteStream('./result.txt');
const readInterface = readline.createInterface({
    input: fs.createReadStream('numbers1.txt'),
    output: process.stdout,
    console: false
})
const readInterface2 = readline.createInterface({
    input: fs.createReadStream('numbers2.txt'),
    output: process.stdout,
    console: false
})
const readInterface3 = readline.createInterface({
    input: fs.createReadStream('numbers3.txt'),
    output: process.stdout,
    console: false
})
const readInterface4 = readline.createInterface({
    input: fs.createReadStream('numbers4.txt'),
    output: process.stdout,
    console: false
})
let minimumNumber = 9999999999;
readInterface.on('line', function (line) {
    readInterface.pause();
    const arrBuffer = line.split(' ');
    for (let i = 0; i < arrBuffer.length - 1; i++) {
        if (+arrBuffer[i] < minimumNumber) {
            minimumNumber = +arrBuffer[i]
        }
    }
    console.log("Minimum", minimumNumber);
    writeStream.write(String(minimumNumber) + ',');
    readInterface.resume();
});
readInterface2.on('line', function (line) {
    readInterface2.pause();
    const arrBuffer = line.split(' ');
    for (let i = 0; i < arrBuffer.length - 1; i++) {
        if (+arrBuffer[i] < minimumNumber) {
            minimumNumber = +arrBuffer[i]
        }
    }
    console.log("Minimum", minimumNumber);
    writeStream.write(String(minimumNumber) + ',');
    readInterface2.resume();
});
readInterface3.on('line', function (line) {
    readInterface3.pause();
    const arrBuffer = line.split(' ');
    for (let i = 0; i < arrBuffer.length - 1; i++) {
        if (+arrBuffer[i] < minimumNumber) {
            minimumNumber = +arrBuffer[i]
        }
    }
    console.log("Minimum", minimumNumber);
    writeStream.write(String(minimumNumber) + ',');
    readInterface3.resume();
});
readInterface4.on('line', function (line) {
    readInterface4.pause();
    const arrBuffer = line.split(' ');
    for (let i = 0; i < arrBuffer.length - 1; i++) {
        if (+arrBuffer[i] < minimumNumber) {
            minimumNumber = +arrBuffer[i]
        }
    }
    console.log("Minimum", minimumNumber);
    writeStream.write(String(minimumNumber) + ',');
    readInterface4.resume();
});

