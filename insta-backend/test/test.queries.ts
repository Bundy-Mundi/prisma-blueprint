import client from "../client";
import { IResolvers } from "apollo-server";

// A map of functions which return data for the schema.
const query: IResolvers = {
  Query: {
    movies: () => client.movie.findMany(),
    movie: (_, { id }) => client.movie.findUnique({where:{id}}),
  }
};

export default query;