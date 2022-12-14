import graphqlISODate, { GraphQLDateTime } from 'graphql-iso-date';
import { Query } from './query.js';
import { Mutation } from './mutation.js';

// const { GraphQLDateTime } = graphqlISODate;

export const resolvers = {
  Query,
  Mutation,
  DateTime: GraphQLDateTime
};
