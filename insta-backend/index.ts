require('dotenv').config();
import { ApolloServer } from 'apollo-server';
import schema from "./schema";
// The GraphQL schema
const PORT = process.env.PORT || 4000;
const server = new ApolloServer({schema});

server.listen(PORT).then((pt:{ url:string }) => {
  console.log(`🚀 Server ready at ${pt.url}`);
});