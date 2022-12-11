import express from 'express';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const port = process.env.PORT || 4000;

/**
 * Construct a schema, using GraphQL schema language
 */
const typeDefs = `#graphql
 type Query {
   hello: String
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

const app = express();

/**
 * Apollo Server setup
 */
const server = new ApolloServer({
  typeDefs,
  resolvers
});

/**
 * Apply the Apollo GraphQL middleware and set the path to /api
 */

const getUrl = async () => {
  const { url } = await startStandaloneServer(server);

  return url;
};

console.log(`Server ready at ${getUrl()}`);
