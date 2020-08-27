const fs = require('fs'); //подключаем модуль file system
const pathFromConsole = process.argv;
let pathToDirectory = '';

//Из пути в команде npm run tree 'C:/Program Files (x86)/' создаем необходимый путь для функции doJSONTree
if (pathFromConsole.length === 3) {
    pathToDirectory = pathFromConsole[2];
} else {
    for (let i = 2; i < pathFromConsole.length; i++) {
        pathToDirectory = pathToDirectory + ' ' + pathFromConsole[i];
    }
}

//Функция doJSONTree формирует массив файлов и папок в объект resultJSON
let resultJSON = {'files': [], 'dirs': []};
const doJSONTree = (path) => {
    fs.readdir(path, {withFileTypes: true}, (err, files) => {
        try {
            files.forEach((elem) => {
                if (elem.isDirectory()) {
                    resultJSON.dirs.push(path + elem.name + '/')
                    doJSONTree(path + elem.name + '/');
                } else {
                    resultJSON.files.push(path + elem.name)
                }
            });
        } catch (someErr) {
            console.log('ERROR! ' + err); //Проверяем на наличие ошиок при чтении файлов
        }
    });
};

//Функция makeSureThatArrayReadyAndReturnIt создает задержку, чтобы объект resultJSON сформировался, выводит его в консолсь и возвращает
const makeSureThatArrayReadyAndReturnIt = (pathToDirectory) => {
    doJSONTree(pathToDirectory);
    setTimeout(() => {
        console.log(resultJSON);
        return resultJSON
    }, 1000);
};

makeSureThatArrayReadyAndReturnIt(pathToDirectory);





