import IElement from "./IElement";
//Функция возвращает путь в консоли браузера getPath($0)

const getPath = (selector: IElement): string | null => {

    let pathArr: Array<string> = [];
    if (selector.tagName === 'BODY') {
        return `BODY`;
    }
    let parent: IElement = selector.parentElement;
    let child: IElement = selector;

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
};

//Находит порядковый номер вложенного элемента childElement в его parentElement
const findNumberOfChild = (child: IElement): number => {
    let i: number = 1;
    let child1: IElement = child;
    while ((child1 = child1.previousElementSibling) != null) {
        i++;
    }
    return i;
};

//Проверяет есть ли среди childElements у одного parentElements совпадающие тэги
//Возвращает true, если есть и false, если нет
const searchMultiplyElementsInChildren = (parent: IElement, child: IElement): boolean => {
    const childrenArray: Array<IElement> = parent.children;
    const childTag: string = child.tagName;
    let counter: number = 0;
    for (let i = 0; i < childrenArray.length; i++) {
        if (childrenArray[i].tagName === childTag) {
            counter++;
        }
    }
    return counter > 1;
};

//Функция возвращает путь от childElement до его parentElement в формате: ${child.tagName}:nth-child(${findNumberOfChild(child)})
const doPathToOneOfTheSameChildren = (child: IElement): string => {
    return `${child.tagName.toLowerCase()}:nth-child(${findNumberOfChild(child)})`
};

//Функция возвращает либо обычный путь до элемента через тэг, либо если среди childElements есть повторяющиеся, то вызывает функцию doPathToOneOfTheSameChildren(parent,child)
const returnPathNthOrNormal = (parent: IElement, child: IElement, pathArr: Array<string>): void => {
    if (searchMultiplyElementsInChildren(parent, child)) {
        pathArr.push(doPathToOneOfTheSameChildren(child));
    } else {
        pathArr.push(child.tagName.toLowerCase());
    }
};
export default getPath;



