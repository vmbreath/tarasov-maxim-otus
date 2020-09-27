const {ApolloServer, gql, PubSub} = require("apollo-server");

const pubSub = new PubSub();

const typeDefs = gql`
  type Product {
    id: Int
    name: String
    productType: String
    price: Int!
  }

  type Buyer {
    id: Int
    name: String
    surname: String
    basket: Basket
    wallet: Int
    basket_id: Int
  }
  
  type Basket {
  id: Int
  name: String
  product_names:[String]
  product:[Product]
  }

  type Query {
    products: [Product]
    buyers: [Buyer]
    baskets: [Basket]
  }
  type Mutation {
    addProduct(id: Int, name: String, productType: String, price: Int):Product
    removeProduct(name: String):Product
  }
  
  type Subscription {
  productAdded: Product
  }
`;

const products = [
    {
        id: 1,
        name: "Cucumber",
        productType: "Vegetable",
        price: "100",
    },
    {
        id: 2,
        name: "Apple",
        productType: "Fruit",
        price: "150",
    },
    {
        id: 3,
        name: "Walnut",
        productType: "Nut",
        price: "200",
    },
];

const buyers = [
    {
        id: 1,
        name: "Lev",
        surname: "Bok",
        wallet: "120",
        basket_id: 1
    },
    {
        id: 2,
        name: "Serj",
        surname: "Tankjan",
        wallet: 1000,
        basket_id: 2
    },
];
const baskets = [
    {
        id: 1,
        name: "basket1",
        product_names: ["Cucumber", "Apple"],
    },
    {
        id: 2,
        name: "basket2",
        product_names: ["Apple"],
    },
];
const findBasketById = (id) => {
    return baskets.find(basket => basket.id === id)
}
const findProductByName = (name) => {
    return products.find(product => product.name === name)
}

const resolvers = {
    Subscription: {
        productAdded: {
            subscribe: () => {
                return pubSub.asyncIterator(["productAdded"])
            }
        }
    },
    Mutation: {
        addProduct(root, args) {
            const id = products[products.length - 1].id + 1;
            products.push({
                id,
                ...args
            });
            console.log(args);
            pubSub.publish("productAdded", {
                productAdded: {
                    id: id,
                    name: args.name,
                    productType: args.productType,
                    price: args.price,
                }
            })
            return products[id - 1]
        },
        removeProduct(root, name) {
            products.splice(products.findIndex((elem => elem.name === name.name)), 1);
            return products
        }
    },
    Buyer: {
        basket: (buyer) => {
            return findBasketById(buyer.basket_id)
        }
    },
    Basket: {
        product: (basket) => {
            let productsInBasket = [];
            for (let i = 0; i < basket.product_names.length; i++) {
                productsInBasket.push(findProductByName(basket.product_names[i]));
            }
            return productsInBasket;
        }
    },
    Query: {
        products: () => products,
        buyers: () => buyers,
        baskets: () => baskets,
    },

};

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
});