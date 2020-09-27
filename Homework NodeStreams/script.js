const fs = require('fs');
const options = {
    encoding: 'utf8',
    highWaterMark: 1024 * 20
};
//Создаю потоки для чтения файлов и поток для записи
const writeStream = fs.createWriteStream('./result.txt');
const stream1 = fs.createReadStream('./numbers1.txt', options);
const stream2 = fs.createReadStream('./numbers2.txt', options);
const stream3 = fs.createReadStream('./numbers3.txt', options);
const stream4 = fs.createReadStream('./numbers4.txt', options);

let corruptedNumber = 0;//При чтении node разбивает числа в начале и в конце буфера, так что пришлось их "склеивать"
let minimumNumber = 9999999999;
//Запускаю чтение из 1 файла
stream1.on('data', (chunk) => {
    stream1.pause();
    const arrBuffer = chunk.split(' ');
    if (+(arrBuffer[0] + corruptedNumber) < minimumNumber) {
        minimumNumber = +arrBuffer[0] + corruptedNumber
    }
    for (let i = 1; i < arrBuffer.length - 2; i++) {
        if (+arrBuffer[i] < minimumNumber) {
            minimumNumber = +arrBuffer[i]
        }
    }
    console.log("Minimum", minimumNumber);
    corruptedNumber = arrBuffer[arrBuffer.length - 1];
    writeStream.write(String(minimumNumber) + ',');
    stream1.resume();
});

stream1.on('close', () => {
    console.log('file numbers1.txt closed');
    corruptedNumber = 0;
    //Запускаю чтение из 2 файла
    stream2.on('data', (chunk) => {
        stream2.pause();
        const arrBuffer = chunk.split(' ');
        if (+(arrBuffer[0] + corruptedNumber) < minimumNumber) {
            minimumNumber = +arrBuffer[0] + corruptedNumber
        }
        for (let i = 1; i < arrBuffer.length - 2; i++) {
            if (+arrBuffer[i] < minimumNumber) {
                minimumNumber = +arrBuffer[i]
            }
        }
        console.log("Minimum2", minimumNumber);
        corruptedNumber = arrBuffer[arrBuffer.length - 1];
        writeStream.write(String(minimumNumber) + ',');
        stream2.resume();
    });
    stream2.on('close', () => {
        console.log('file numbers2.txt closed');
        corruptedNumber = 0;
        //Запускаю чтение из 3 файла
        stream3.on('data', (chunk) => {
            stream3.pause();
            const arrBuffer = chunk.split(' ');
            if (+(arrBuffer[0] + corruptedNumber) < minimumNumber) {
                minimumNumber = +arrBuffer[0] + corruptedNumber
            }
            for (let i = 1; i < arrBuffer.length - 2; i++) {
                if (+arrBuffer[i] < minimumNumber) {
                    minimumNumber = +arrBuffer[i]
                }
            }
            console.log("Minimum3", minimumNumber);
            corruptedNumber = arrBuffer[arrBuffer.length - 1];
            writeStream.write(String(minimumNumber) + ',');
            stream3.resume();
        });
        stream3.on('close', () => {
            console.log('file numbers3.txt closed');
            corruptedNumber = 0;
            //Запускаю чтение из 4 файла
            stream4.on('data', (chunk) => {
                stream4.pause();
                const arrBuffer = chunk.split(' ');
                if (+(arrBuffer[0] + corruptedNumber) < minimumNumber) {
                    minimumNumber = +arrBuffer[0] + corruptedNumber
                }
                for (let i = 1; i < arrBuffer.length - 2; i++) {
                    if (+arrBuffer[i] < minimumNumber) {
                        minimumNumber = +arrBuffer[i]
                    }
                }
                console.log("Minimum4", minimumNumber);
                corruptedNumber = arrBuffer[arrBuffer.length - 1];
                writeStream.write(String(minimumNumber) + ',');
                stream4.resume();
            });
            stream4.on('close', () => {
                console.log('file numbers4.txt closed');
            });
        });
    });
});


