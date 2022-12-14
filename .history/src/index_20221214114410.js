import {} from 'dotenv/config';

import express from 'express';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { db } from './db.js';
import { models } from './models/index.js';
import { typeDefs } from './schema.js';

/**
 * Run the server on a port specified in our .env file or port 4000
 */
const port = process.env.PORT || 4000;

/**
 * Stor the DB value as a variable
 */
const DB_HOST = process.env.DB_HOST;

const notes = [
  { id: `1`, content: `This is a note`, author: `Adam Scott` },
  { id: `2`, content: `This is another note`, author: `Harlow Everly` },
  { id: `3`, content: `Oh hey look, another note`, author: `Riley Harrison` }
];

/**
 * Provide resolver functions for our schema fields
 */
const resolvers = {
  Query: {
    hello: () => 'Hello World!',
    notes: async () => await models.Note.find(),
    note: async (parent, args) => await models.Note.findById(args.id)
  },
  Mutation: {
    newNote: async (parent, args) => {
      return await models.Note.create({
        content: args.content,
        author: `Adam Scott`
      });
    }
  }
};

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
