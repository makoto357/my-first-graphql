const express = require('express');
const colors = require('colors');
const cors = require('cors');
// Loads environment variables from a .env file into process.env
require('dotenv').config();
const {createHandler} = require('graphql-http/lib/use/express');
const schema = require('./schema/schema');
const {ruruHTML} = require('ruru/server');
const connectDB = require('./config/db');
const mediaRoutes = require('./routes/media');

const port = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors()); // Enable all CORS requests, should be added before defining routes
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({extended: true})); // Parse URL-encoded bodies

connectDB()
  .then(() => {
    startServer();
  })
  .catch(err => {
    console.error(`MongoDB connection error: ${err.message}`.red);
    process.exit(1); // Exit the process if unable to connect to the database
  });

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return 'Hello world!';
  },
};

// handling GraphQL requests over HTTP in Express
app.all(
  '/graphql',
  createHandler({
    schema,
    rootValue: root,
  }),
);

// Serve the GraphiQL IDE in HTML format.
app.get('/', (_req, res) => {
  res.type('html');
  res.end(ruruHTML({endpoint: '/graphql'}));
});

// Mounting the media routes under the '/api' prefix
app.use('/api', mediaRoutes);

app.get('/h', (req, res) => {
  res.send('Successful response.');
});

function startServer() {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`.cyan);
  });
}
