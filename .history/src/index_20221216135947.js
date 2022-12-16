import {} from 'dotenv/config';

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { db } from './db.js';
import { models } from './models/index.js';
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers/index.js';
import jwt from 'jsonwebtoken';

/**
 * Run the server on a port specified in our .env file or port 4000
 */
const port = process.env.PORT || 4000;

/**
 * Stor the DB value as a variable
 */
const DB_HOST = process.env.DB_HOST;

/**
 * Connect to the database
 */
db.connect(DB_HOST);

/**
 * Get the user info from a JWT
 */
const getUser = token => {
  if (token) {
    try {
      /**
       * Return the user information from the token
       */
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      /**
       * If there's a problem with the token, throw an error
       */
      throw new Error('Session invalid');
    }
  }
};

/**
 * Apollo Server setup
 */
const server = new ApolloServer({
  introspection: true,
  typeDefs,
  resolvers
});

/**
 * Apply the Apollo GraphQL middleware and set the path to /api
 */

const { url } = await startStandaloneServer(server, {
  context: async ({
    req: {
      headers: { authorization: token, host }
    }
  }) => {
    /**
     * Try to retrieve the a user with the token
     */
    const user = getUser(token);

    if (host === 'localhost:4000') console.log(user);

    return { models, user };
  }
});

console.log(`Server ready at ${url}`);
