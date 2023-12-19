// const express = require("express");
// let cors = require("cors");
// const app = express();

// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.json({ msg: `Endpoint Is Working!!` });
// });

// const invoiceRouter = require("./api/invoice/invoice.router");
// app.use("/api/invoice", invoiceRouter);

// app.listen(4000, () => {
//   console.log("SERVER IS UP & RUNNING AT PORT 4000");
// });

const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { todoTypeDefs, todoResolvers } = require("./api/todo/todo.controller");
const { userTypeDefs, userResolvers } = require("./api/user/user.controller");

async function startServer() {
  const typeDefs = mergeTypeDefs([todoTypeDefs, userTypeDefs]);
  const resolvers = mergeResolvers([todoResolvers, userResolvers]);

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  const app = express();

  server.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("Server is running on port 4000");
  });
}

startServer();
