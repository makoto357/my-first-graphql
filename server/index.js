var express = require('express');
require('dotenv').config();
const port = process.env.PORT || 5000;

var app = express();

app.listen(port, console.log('Running a GraphQL API server at http://localhost:4000/graphql'));
