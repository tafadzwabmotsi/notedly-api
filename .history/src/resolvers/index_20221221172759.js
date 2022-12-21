import graphqlISODate from 'graphql-iso-date';
import { Query } from './query.js';
import { Mutation } from './mutation.js';
import { Note } from './note.js';
import { User } from './user.js';

const { GraphQLDateTime } = graphqlISODate;

export const resolvers = {
  Query,
  Mutation,
  DateTime: GraphQLDateTime
};
