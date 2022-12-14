import {} from 'dotenv/config';

import express from 'express';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { db } from './db.js';
import { models } from './models/index.js';
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers/index.js';

/**
 * Run the server on a port specified in our .env file or port 4000
 */
const port = process.env.PORT || 4000;

/**
 * Stor the DB value as a variable
 */
const DB_HOST = process.env.DB_HOST;

const app = express();

/**
 * Connect to the database
 */
db.connect(DB_HOST);

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

const { url } = await startStandaloneServer(server);

console.log(`Server ready at ${url}`);
