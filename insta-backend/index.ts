const { PrismaClient } = require("@prisma/client");
const { ApolloServer, gql } = require('apollo-server');

const client = new PrismaClient();
// The GraphQL schema
const typeDefs = gql`
  type Movie {
    id: Int
    title: String
    year: Int
    genre: String
    createdAt: String
    udpatedAt: String
  }
  type Query {
    movie: Movie
    movies: [Movie]
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    movies: () => client.movie.findMany(),
    movie: () => ({ title: "Hello", year: 2021 }),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});