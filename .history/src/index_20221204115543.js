const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const app = express();
const port = process.env.PORT || 4000;

/**
 * Construct a schema, using GraphQL schema language
 */
const typeDefs = gql`
  type Query {
    hello: string
  }
`;

app.get('/', (req, res) => res.send('Hello Web Server!!!'));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
