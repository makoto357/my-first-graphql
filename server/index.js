const express = require('express');
const colors = require('colors');
const cors = require('cors');
require('dotenv').config();
var {createHandler} = require('graphql-http/lib/use/express');
const schema = require('./schema/schema');
var {ruruHTML} = require('ruru/server');
const connectDB = require('./config/db');

const port = process.env.PORT || 5000;

var app = express();

connectDB();

// Enable All CORS Requests
app.use(cors());

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
};

// Create and use the GraphQL handler.
app.all(
  '/graphql',
  createHandler({
    schema,
    rootValue: root,
  }),
);

// Serve the GraphiQL IDE.
app.get('/', (_req, res) => {
  res.type('html');
  res.end(ruruHTML({endpoint: '/graphql'}));
});

app.listen(port, console.log('Running a GraphQL API server at http://localhost:4000/graphql'));
