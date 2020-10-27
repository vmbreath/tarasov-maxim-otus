const fs = require('fs');
const readline = require('readline');

function getFileSizeInMegabytes(filename) {
    const stats = fs.statSync(filename);
    const fileSizeInBytes = stats["size"];
    const fileSizeInMegabytes = fileSizeInBytes / 1000000.0;
    return fileSizeInMegabytes
}

const readInterface = readline.createInterface({
    input: fs.createReadStream('numbersByLines.txt'),
    output: process.stdout,
    console: false
})

const writeStream = fs.createWriteStream('numbers1.txt');
const writeStream2 = fs.createWriteStream('numbers2.txt');
const writeStream3 = fs.createWriteStream('numbers3.txt');
const writeStream4 = fs.createWriteStream('numbers4.txt');
let numberOfFile = 1;
readInterface.on('line', function (line) {
    readInterface.pause();

    // if (getFileSizeInMegabytes(`numbers${numberOfFile}.txt`)>25*numberOfFile){
    //     numberOfFile++;
    //
    // }
    switch (numberOfFile) {
        case 1:
            writeStream.write(line + '\r\n');
            console.log(line);
            numberOfFile++;
            break;
        case 2:
            writeStream2.write(line + '\r\n');
            numberOfFile++;
            break;
        case 3:
            writeStream3.write(line + '\r\n');
            numberOfFile++;
            break;
        case 4:
            writeStream4.write(line + '\r\n');
            numberOfFile = 1;
            break;
    }


    readInterface.resume();
});
readInterface.on("close", () => {
    writeStream.end();
    writeStream2.end();
    writeStream3.end();
    writeStream4.end();
    console.log(getFileSizeInMegabytes('numbers1.txt'))
})
