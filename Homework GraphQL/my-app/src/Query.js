import {useQuery, useMutation, gql} from '@apollo/client';
import React from 'react';

const ADD_PRODUCT = gql`
mutation CreateProduct($name: String!, $productType: String!, $price: Int!) {
  addProduct(name: $name, productType: $productType, price: $price) {
    name
    id
  }
}
`;

const DELETE_PRODUCT = gql`
mutation RemoveProduct($name: String!) {
  removeProduct(name: $name) {
    name
    id
  }
}
`;
const EXCHANGE_RATES = gql`
query GetExchangeRates {
  products {
    name
    productType
    price
  }
  buyers {
    name
    wallet
    basket {
      id
      product {
        name
      }
    }
  }
}

`;

//Функция добавляет продукт в список
function AddProduct(addProduct) {
    let inputName;
    let inputProductType;
    let inputPrice;
    return (
        <div className={"addProductDiv"}>
            <form className={"addProduct"}
                  onSubmit={e => {
                      e.preventDefault();
                      addProduct({
                          variables: {
                              name: inputName.value,
                              productType: inputProductType.value,
                              price: Number(inputPrice.value)
                          }
                      });
                      inputName.value = '';
                      inputProductType.value = '';
                      inputPrice.value = '';
                  }}
            >
                Name:
                <input
                    ref={node => {
                        inputName = node;
                    }}
                />
                ProductType:
                <input
                    ref={node => {
                        inputProductType = node;
                    }}
                />
                Price:
                <input
                    ref={node => {
                        inputPrice = node;
                    }}
                />
                <button type="submit">Add product</button>
            </form>
        </div>
    );
}

//Функция удаляет продукт из списка
function DeleteProduct(deleteProduct) {
    let inputName;

    return (
        <div className={"addProductDiv"}>
            <form className={"deleteProduct"}
                  onSubmit={e => {
                      e.preventDefault();
                      deleteProduct({variables: {name: inputName.value}});
                      inputName.value = '';
                  }}
            >
                Name:
                <input
                    ref={node => {
                        inputName = node;
                    }}
                />

                <button type="submit">Delete product</button>
            </form>
        </div>
    );
}

//Функция выводит продукты и покупателей, а также формы удаления и добавления продуктов
function ExchangeProducts() {
    const {loading, error, data} = useQuery(EXCHANGE_RATES);
    const [addProduct, {data1}] = useMutation(ADD_PRODUCT);
    const [deleteProduct, {data2}] = useMutation(DELETE_PRODUCT);
    if (loading) return (<p>Loading...</p>);
    if (error) return (<p>Error :</p>);

    return (<div>{AddProduct(addProduct)}{DeleteProduct(deleteProduct)}
        <div className={"buyersDiv"}>
            <ul className={"products"}>
                <ins>Products</ins>
                {data.products.map(({name, productType, price}, index) => (
                        <li key={index}>
                            <p>
                                Name:{name}<br/> productType:{productType}<br/> Price:{price}$
                            </p>
                        </li>
                    )
                )}</ul>
        </div>
        <div className={"buyersDiv"}>
            <ul className={"buyers"}>
                <ins>Buyers</ins>
                {data.buyers.map(({name, wallet, basket}) => (
                    <li key={name}>
                        <p>
                            Name:{name}<br/> wallet:{wallet}<br/> basketId:{basket.id}

                        </p>
                    </li>
                ))}</ul>
        </div>
    </div>);
}


export default ExchangeProducts;
