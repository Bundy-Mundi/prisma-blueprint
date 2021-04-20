import { IResolvers } from "apollo-server";
import client from "../client";

const mutation: IResolvers = {
    Mutation: {
        createMovie: (_, { title, year, genre }) => {
            return client.movie.create({data:{title,year,genre}});
        }
    }
}

export default mutation;