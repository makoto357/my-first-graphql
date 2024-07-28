import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Layout from './components/Layout';
import ErrorPage from './error-page';
import Article from './pages/Article';
import CreateArticle from './pages/CreateArticle';

// to solve console error when updating cache
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
        media: {
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

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/articles/:articleId',
        element: <Article />,
      },
      {
        path: '/create',
        element: <CreateArticle />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
