import React from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import Header from './components/Header';
import Authors from './components/Authors';
import Articles from './components/Articles';

const client = new ApolloClient({
  // connect to graphql server
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Header />
      <Authors />
      <Articles />
    </ApolloProvider>
  );
}

export default App;
