import { IResolvers } from "apollo-server";
import client from "../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SALT = 10;
const secret = process.env.SECRET || 'SECRET'; // NEVER use 'SECRET' for production mode
const mutation: IResolvers = {
    Mutation: {
        createAccount: async(_, 
                { firstName, lastName, username, email, password }
            ) => {
                try {
                    const existingUser = await client.user.findFirst({
                        where:{
                            OR: [
                                    { username },
                                    { email }
                                ]
                            }
                        })
                    // Check if username exists
                    // hash password
                    // save and return the user
                    if(existingUser){
                        throw new Error("The username/email is already taken");
                    }
                    password = await bcrypt.hash(password, SALT);
                    return client.user.create({data:{firstName, lastName, username, email, password}});
                } catch (error) {
                    return error;
            }
        },
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
                    return {
                        ok: false,
                        error: "User not found"
                    }
                }
                const passwordOK = await bcrypt.compare(password, user.password);
                // Step 2
                if(!passwordOK) {
                    return {
                        ok: false,
                        error: "Password does not match"
                    }
                }
                // Step 3 generate web token and save it

                const token = await jwt.sign({id: user.id}, secret);
                return {
                    ok: passwordOK,
                    token,
                }
            } catch (error) {
                console.log(error);
            }

        },
    }
}

export default mutation;