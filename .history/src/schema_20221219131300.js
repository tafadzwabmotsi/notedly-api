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
  favorites: [Note!]!
 }

 type Note {
  id: ID!
  content: String!
  author: User!
  createdAt: DateTime!
  updatedAt: DateTime!
  favoriteCount: Int!
  favoritedBy: [User!]
 }

 type Query {
   notes: [Note!]!
   note(id: ID!): Note!
   user(username: String!): User
   users: [User!]!
   me: User!
 }

 type Mutation {
  newNote(content: String!): Note!
  updateNote(id: ID!, content: String!): Note!
  deleteNote(id: ID!): Boolean!
  signUp(username: String!, email: String!, password: String!): String!
  signIn(username: String!, email: String!, password: String!): String!
  toggleFavorite(id: ID!): Note!
 }
`;

export default typeDefs;
