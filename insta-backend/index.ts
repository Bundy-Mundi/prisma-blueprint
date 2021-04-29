require('dotenv').config();
import { ApolloServer } from 'apollo-server';
import schema from "./schema";
import { getUser, isLoggedIn } from './users/users.utils';
// The GraphQL schema
const PORT = process.env.PORT || 4000;
const server = new ApolloServer({ 
  schema, 
  context: async({req}) => {
    return {
      currentUser: await getUser(<string>req.headers.token),
      isLoggedIn 
    }
  }
});

server.listen(PORT).then((pt:{ url:string }) => {
  console.log(`🚀 Server ready at ${pt.url}`);
});