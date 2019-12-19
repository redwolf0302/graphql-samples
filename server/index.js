const http = require("http");
const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const app = express();
const typeDefs = require("./schemas/hospital_schema");
const resolvers = require("./schemas/hospital_resolvers");
const scalars = require("./scalars");
const schemaDirectives = require("./directives");
/**
 * server
 * @param {*} port
 */
function server(port = 8080) {
  // =======================
  // 注册 Rest API
  // =======================
  app.use("/api", require("./api_router"));

  // =======================
  // 注册 GraphQL Schema
  // =======================
  const server = new ApolloServer({
    typeDefs,
    resolvers: Object.assign(
      {
        Gender: {
          UNKNOWN: 0,
          MALE: 1,
          FEMALE: 2,
        },
      },
      scalars,
      resolvers
    ),
    schemaDirectives,
    // https://www.apollographql.com/docs/apollo-server/data/subscriptions/#lifecycle-events
    subscriptions: {
      onConnect(connectionParams, webSocket, context) {
        return Promise.resolve();
      },
      onDisconnect(webSocket, context) {},
    },
    tracing: true,
    /*
    formatError: error => {
      console.log(error);
      return error;
    },
    formatResponse: response => {
      console.log(response);
      return response;
    }
    */
  });
  server.applyMiddleware({ app });

  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer);

  // =======================
  // 启动服务器
  // =======================
  httpServer.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
    console.log(`🚀 Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`);
  });
}

module.exports = server;
