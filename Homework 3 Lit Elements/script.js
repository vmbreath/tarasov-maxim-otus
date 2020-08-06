import {html, LitElement} from 'https://unpkg.com/@polymer/lit-element@latest/lit-element.js?module';
//Массив элементов структуры Html
const structureHtml = [{
    "id": 1,
    "items": [{
        "id": 2,
        "items": [{"id": 3}]
    },
        {
            "id": 7,
            "items": [{"id": 8}]
        }]
},
    {
        "id": 4,
        "items": [{
            "id": 5,
            "items": [{"id": 6},
                {"id": 10},
                {"id": 11}]
        }]
    }];
// Создаю Shadow element
customElements.define('shadow-element', class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        })
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
 <my-tree></my-tree>
`
    }
});

//Создаю элемент My tree и передаю в него структуру structureHtml
class MyTree extends LitElement {
    constructor() {
        super();
        this.structureHtml = structureHtml;
    }

    static get properties() {
        return {
            structureHtml: {type: Array}
        };
    }

    render() {
        return html`
<style>
div{background-color: silver;
font-weight: bold;
}
</style>
      <div>
            <h2>MyTree!</h2>      
            <my-leaf .structureArray=${this.structureHtml}>
      </div>
    `;
    }
}

customElements.define('my-tree', MyTree);

//Создаю элемент My leaf, который отображает дерево элементов.
//Желтым подсвечиваются элементы, не содержащие больше вложенных элементов, осталные элементы с рандомными цветами
class MyLeaf extends LitElement {
    constructor() {
        super();
        this.count = 0;
    }

    static get properties() {
        return {
            structureArray: {type: Array},
            count: {type: Number}
        };
    }

    render() {
        //Возвращает случайный цвет
        const doRandomColor = () => {
            return "#" + ((1 << 24) * Math.random() | 0).toString(16);
        };
        //Функция занимается отрисовкой компонентов из массива this.structureArray
        const renderElements = (array) => {
            return array.map(elem => {
                    if (elem.items !== undefined) {
                        return html`<ol id="${elem.id}" style="background-color: ${doRandomColor()}"> My Leaf with id = ${elem.id}
                        ${renderElements(elem.items)}</ol>`
                    } else {
                        return html`<ol id="${elem.id}" style="background-color: yellow"> My Leaf with id = ${elem.id}</ol>`
                    }
                }
            )
        };
        return html`
      <div>
        ${renderElements(this.structureArray)}
        <button @click=${() => {
            this.count += 1
        }}>Reload colors </button>
        <p>Colors were reloaded ${this.count} times</p>
      </div>

    `;
    }
}

customElements.define('my-leaf', MyLeaf);


/*
        let stringPath = '';
        let flag=false;
        let count=1;

        const doNumbers = (counter,count) => {
            if (counter===2){
                stringPath=stringPath.slice(0,-4);
                flag=true
            }else if ((counter===1)&&(flag=true)){
              flag=false;
            }else if(counter>2){
                stringPath=stringPath.slice(0,-2);
            }
            stringPath = stringPath + `${counter}.`;
            return stringPath;
        };

let newArray = [];
const renderElements1 = (array) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i].items !== undefined) {
            count++;
            newArray.push(i + 1);
            console.log(i + 1,doNumbers(i+1), 'undef');
            renderElements1(array[i].items);
        } else {
            newArray.push(i + 1);
            console.log(i + 1, doNumbers(i+1))
        }
    }
    return newArray;
};
console.log(renderElements1(this.structureArray));

*/