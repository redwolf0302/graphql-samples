const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const app = express();
const typeDefs = require("./schemas/hospital_schema");
const resolvers = require("./schemas/hospital_resolvers");
const directives = require("./directives");
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

  // =======================
  // 注册 GraphQL Schema
  // =======================

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    schemaDirectives: directives
  });
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
