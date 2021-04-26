import { IResolvers } from "apollo-server";
import client from "../client";
import bcrypt from "bcrypt";

const SALT = 10;
const mutation: IResolvers = {
    Mutation: {
        createAccount: async(_, 
                { firstName, lastName, username, email, password }
            ) => {
                try {
                    const existingUser = await client.user.findFirst({
                        where:{
                            OR: [{ // if there is same username
                                    username
                                },
                                { // or same email
                                    email
                                }]
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
        }
    }
}

export default mutation;