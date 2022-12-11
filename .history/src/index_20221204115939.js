const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const app = express();
const port = process.env.PORT || 4000;

/**
 * Construct a schema, using GraphQL schema language
 */
const typeDefs = gql`
  type Query {
    hello: string
  }
`;

/**
 * Provide resolver functions for our schema fields
 */
const resolvers = {
  Query: {
    hello: () => 'Hello World!'
  }
};

/**
 * Apollo Server setup
 */
const server = new ApolloServer({ typeDefs, resolvers });

/**
 * Apply the Apollo GraphQL middleware and set the path to /api
 */
server.applyMiddleware({ app, path: '/api' });

app.get('/', (req, res) => res.send('Hello Web Server!!!'));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
