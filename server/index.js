const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");
const app = express();
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }
  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;
// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books
  }
};
const books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling"
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton"
  }
];

/**
 * server
 * @param {*} port
 */
function server(port = 8080) {
  // =======================
  // 注册 Rest API
  // =======================
  app.use("/patient", require("./patient/router"));
  app.use("/hospital", require("./hospital/router"));
  app.use("/doctor", require("./doctor/router"));
  app.use("/department", require("./department/router"));
  app.use("/patient", require("./patient/router"));

  // =======================
  // 注册 GraphQL Schema
  // =======================
  const server = new ApolloServer({ typeDefs, resolvers });
  server.applyMiddleware({ app });

  // =======================
  // 启动服务器
  // =======================
  app.listen(port, () => {
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    );
  });
}

module.exports = server;
