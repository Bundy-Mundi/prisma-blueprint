import { IResolvers } from "apollo-server-express";
import client from "../../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secret = process.env.SECRET || 'SECRET'; // NEVER use 'SECRET' for production mode
const resolvers: IResolvers = {
    Mutation: {
        login: async(_, { username, password }) => {
            // find user with args.useranem
            // check password with args.password
            try {
                const user = await client.user.findFirst({
                    where: { OR: [
                        { username },
                        { email: username }
                    ]}}
                );
                // Step 1
                if(!user) {
                    throw new Error("User not found");
                }
                const passwordOK = await bcrypt.compare(password, user.password);
                // Step 2
                if(!passwordOK) {
                    throw new Error("Password does not match");
                }
                // Step 3 generate web token and save it
                const token = await jwt.sign({id: user.id}, secret);
                return {
                    ok: true,
                    token,
                }
            } catch (error) {
                return {
                    ok: false,
                    error
                }
            }
        },
    }
}

export default resolvers;