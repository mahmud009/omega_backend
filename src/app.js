import { ApolloServer } from "apollo-server";
import { typeDefs } from "./graphql/typeDefs";
import mongoose from "mongoose";
import "dotenv/config";
import { resolvers } from "./resolvers";

// Apollo graphql server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Connecting mongodb and listening to the port on success
mongoose
  .connect(process.env.MONGODB_CONNECT_URL)
  .then(() => {
    console.log("MongoDB connected.");
    server.listen({ port: 5303 }).then((res) => {
      console.log(`Server running at ${res.url}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
