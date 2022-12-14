/**
 * Construct a schema, using GraphQL schema language
 */
export const typeDefs = `#graphql
 scalar DateTime
 
 type Note {
  id: ID!
  content: String!
  author: String!
 }

 type Query {
   notes: [Note!]!
   note(id: ID!): Note!
 }

 type Mutation {
  newNote(content: String!): Note!
  updateNote(id: ID!, content: String!): Note!
  deleteNote(id: ID!): Boolean!
 }
`;

export default typeDefs;
