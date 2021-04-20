import {gql} from "apollo-server";

export const typeDefs = gql`
  type Movie {
    id: Int!
    title: String!
    year: Int!
    genre: String
    createdAt: String!
    udpatedAt: String!
  }
  type Query {
    movie(id: Int!): Movie
    movies: [Movie]
  }
  type Mutation {
    createMovie(title:String!, year: Int!, genre: String): Movie!
  }
`;