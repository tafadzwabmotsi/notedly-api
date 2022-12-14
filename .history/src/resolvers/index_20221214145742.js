import pkg from 'graphql-iso-date';
import { Query } from './query.js';
import { Mutation } from './mutation.js';

const { GraphQLDateTime } = pkg;

export const resolvers = {
  Query,
  Mutation,
  DateTime: GraphQLDateTime
};
