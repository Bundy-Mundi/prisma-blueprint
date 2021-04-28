require('dotenv').config();
import { IResolvers } from "apollo-server";
import client from "../../client";
import bcrypt from "bcrypt";

const salt = process.env.SALT || 10;
const createAccountResolvers: IResolvers = {
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
                    password = await bcrypt.hash(password, salt);
                    return client.user.create({data:{firstName, lastName, username, email, password}});
                } catch (error) {
                    return error;
            }
        },
    }
}
export default createAccountResolvers;