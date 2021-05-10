require('dotenv').config();
import { ApolloServer } from 'apollo-server';
import { typeDefs, resolvers } from "./schema";
import { getUser, isLoggedIn } from './users/users.utils';
// The GraphQL schema
const PORT = process.env.PORT || 4000;
const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  context: async({req}) => {
    const user = await getUser(<string>req.headers.authorization)
    return {
      currentUser: user,
      isLoggedIn 
    }
  }
});

server.listen(PORT).then((pt:{ url:string }) => {
  console.log(`🚀 Server ready at ${pt.url}`);
});