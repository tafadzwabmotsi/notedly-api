/**
 * Construct a schema, using GraphQL schema language
 */
export const typeDefs = `#graphql
 scalar DateTime

 type User{
  id: ID!
  username: String!
  email: String!
  avatar: String!
  notes: [Note!]!
 }

 type Note {
  id: ID!
  content: String!
  author: User!
  createdAt: DateTime!
  updatedAt: DateTime!
 }

 type Query {
   notes: [Note!]!
   note(id: ID!): Note!
 }

 type Mutation {
  newNote(content: String!): Note!
  updateNote(id: ID!, content: String!): Note!
  deleteNote(id: ID!): Boolean!
  signUp(username: String!, email: String!, password: String!): String!
  signIn(username: String!, email: String!, password: String!): String!
 }
`;

export default typeDefs;
