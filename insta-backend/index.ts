
import { ApolloServer } from 'apollo-server';
import schema from "./schema";
// The GraphQL schema


const server = new ApolloServer({schema});

server.listen().then((pt:{ url:string }) => {
  console.log(`🚀 Server ready at ${pt.url}`);
});