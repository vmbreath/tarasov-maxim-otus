//Функция возвращает путь в консоли браузера getPath($0)
const getPath = (selector) => {
    let pathArr = [];
    if (selector.tagName === 'BODY') {
        return `BODY`;
    }
    let parent = selector.parentElement;
    let child = selector;

    if (child.id !== "") {
        return `#${child.id}`;
    } else {
        returnPathNthOrNormal(parent, child, pathArr);
    }

    while (true) {
        if (parent.id !== "") {
            return `#${parent.id}>${pathArr.reverse().join('>')}`;
        } else {
            if (parent.tagName === 'BODY') {
                pathArr.push(parent.tagName);
                return `${pathArr.reverse().join('>')}`;
            }

            child = parent;
            parent = parent.parentElement;
            returnPathNthOrNormal(parent, child, pathArr);
        }
    }
    return null;
};

//Находит порядковый номер вложенного элемента childElement в его parentElement
const findNumberOfChild = (child) => {
    let i = 1;
    let child1 = child;
    while ((child1 = child1.previousElementSibling) != null) {
        i++;
    }
    return i;
};

//Проверяет есть ли среди chldElements у одного parentElements совпадающие тэги
//Возвращает true, если есть и false, если нет
const searchMultiplyElementsInChildren = (parent, child) => {
    const childrenArray = parent.children;
    const childTag = child.tagName;
    let counter = 0;
    for (let i = 0; i < childrenArray.length; i++) {
        if (childrenArray[i].tagName === childTag) {
            counter++;
        }
    }
    return counter > 1;
};

//Функция возвращает путь от childElement до его parentElement в формате: ${child.tagName}:nth-child(${findNumberOfChild(child)})
const doPathToOneOfTheSameChildren = (child) => {
    return `${child.tagName}:nth-child(${findNumberOfChild(child)})`
};

//Функция возвращает либо обычный путь до элемента через тэг, либо если среди childElements есть повторяющиеся, то вызывает функцию doPathToOneOfTheSameChildren(parent,child)
const returnPathNthOrNormal = (parent, child, pathArr) => {
    if (searchMultiplyElementsInChildren(parent, child)) {
        pathArr.push(doPathToOneOfTheSameChildren(child));
    } else {
        pathArr.push(child.tagName);
    }
};

module.exports = getPath;


