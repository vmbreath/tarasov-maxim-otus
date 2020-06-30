const historyOfShopping=[["a", "b"], ["a", "c"], ["d", "e"]]; //исходный массив


//Функция findItemList принимает массив с покупками пользователей и возвращает все типы покупок,попадающиеся в массиве
    function findItemList(arr) {
    let temp=[arr[0][0]];
    arr.forEach((person)=>{
        person.forEach((item)=>{
            if(temp.indexOf(item)<0){
                temp.push(item);
            }
        });
    });
    return temp.sort();
}
//Функция allItemAssociation принмает массив типов покупок и массив с покупками пользователей.
//Перебирает все типы покупок и формирует к каждому типу покупок группы рекомендаций
function allItemAssociation(arrList,historyOfShoppingArray) {
    let result=arrList.map((item)=>{
        let itemAssociation=[];
        historyOfShoppingArray.forEach((person)=>{
            if (person.indexOf(item)>=0){
                for (let i=0;i<person.length;i++){
                    if (itemAssociation.indexOf(person[i])<0){
                        itemAssociation.push(person[i])
                    }
                }
            }
        });
        return itemAssociation;
    });
    return result;
}
//Функция maxItemAssociation принимает массив массив с покупками пользователей и возвращает максимальную группу рекомендаций
function maxItemAssociation(arr){
    let finalArr=arr[0];
    allItemAssociation(findItemList(arr),arr).forEach((elem)=>{
        if (finalArr.length<elem.length){
            finalArr=elem;
        }
    });
    return finalArr;
}

console.log(findItemList(historyOfShopping));//все типы покупок,попадающиеся в массиве
console.log(allItemAssociation(findItemList(historyOfShopping),historyOfShopping));//все группы рекомендаций
console.log(maxItemAssociation(historyOfShopping));//максимальная группа рекомендаций
