require('dotenv').config();
import express from "express";
import logger from "morgan";
import path from "path";
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from "./schema";
import { getUser, isLoggedIn } from './users/users.utils';
import { User } from "@prisma/client";

// The GraphQL schema
const PORT = process.env.PORT || 4000;
const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  context: async({req}) => {
    const user:User|null = await getUser(<string>req.headers.authorization);
    return {
      currentUser: user,
      isLoggedIn 
    }
  }
});
const app = express();
app.use(logger('tiny'));
app.use("/static", express.static(path.join(__dirname, 'uploads')));
server.applyMiddleware({ app });

app.listen({ port: PORT }, () => {
  console.log(`🚀 GraphQL Server ready at http://localhost:${PORT}/graphql`);
});