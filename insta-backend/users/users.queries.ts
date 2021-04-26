import client from "../client";
import { IResolvers } from "apollo-server";

// A map of functions which return data for the schema.
const query: IResolvers = {
    Query: {
        seeProfile: (_, {username}) => client.user.findUnique({ // Find unique username
            where: {
                username
            }
        })
    }
};

export default query;