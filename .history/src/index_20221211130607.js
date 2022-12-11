require('dotenv').config();

const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const db = require('./db');

const port = process.env.PORT || 4000;

/**
 * Construct a schema, using GraphQL schema language
 */
const typeDefs = `#graphql
 type Note {
  id: ID!
  content: String!
  author: String!
 }

 type Query {
   hello: String!
   notes: [Note!]!
   note(id: ID!): Note!
 }

 type Mutation {
  newNote(content: String!): Note!
 }
`;

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
    notes: () => notes,
    note: (parent, args) => {
      return notes.find(note => note.id === args.id);
    }
  },
  Mutation: {
    newNote: (parent, args) => {
      let noteValue = {
        id: String(notes.length + 1),
        content: args.content,
        author: `Adam Scott`
      };

      notes.push(noteValue);
      return noteValue;
    }
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

const { url } = await startStandaloneServer(server);

console.log(`Server ready at ${url}`);
