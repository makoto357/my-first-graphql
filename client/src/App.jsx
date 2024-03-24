import React from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import Authors from './components/Authors';
import Articles from './components/Articles';

// solve console error when updating cache
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        articles: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        authors: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  // connect to graphql server
  uri: 'http://localhost:4000/graphql',
  cache,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Authors />
      <Articles />
    </ApolloProvider>
  );
}

export default App;
