import React from 'react';
import './App.css';
import {ApolloClient, InMemoryCache} from '@apollo/client';
import {ApolloProvider} from '@apollo/client';
import {gql} from '@apollo/client';
import ExchangeProducts from "./Query";

const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache()
});

client
    .query({
        query: gql`
 query Products {
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
    `
    })
    .then(result => console.log(result));

function App() {
    return (
        <ApolloProvider client={client}>
            <div>
                <h2>My first Apollo app 🚀</h2>
                <h3>Query</h3>
                <ExchangeProducts/>
            </div>
        </ApolloProvider>
    );
}

export default App;
