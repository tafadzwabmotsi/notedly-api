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

app.listen({ port }, () => {
  console.log(
    `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
  );
});
