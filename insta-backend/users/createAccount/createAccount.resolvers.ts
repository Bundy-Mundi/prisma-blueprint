require('dotenv').config();
import { IResolvers } from "apollo-server";
import { BasicReturnType } from "../users.types";
import client from "../../client";
import bcrypt from "bcrypt";

let salt: number = 10;
if(process.env.SALT !== undefined)
    salt = parseInt(process.env.SALT);

const createAccountResolvers: IResolvers = {
    Mutation: {
        createAccount: async(_,
                { firstName, lastName, username, email, password, bio, avatar }
            ): Promise<BasicReturnType> => {
                try {
                    const existingUser = await client.user.findFirst({
                        where:{
                            OR: [
                                    { username },
                                    { email }
                                ]
                            }
                        })

                    // 1. Check if username exists
                    // 2. hash password
                    // 3. save and return the user
                    if(existingUser)
                        throw new Error("The username/email is already taken");
                    
                    password = password.trim().replace(/\s/g, '');
                    if(!password)
                        throw new Error("An empty string is aborted for the password")
                    else if(password.length < 8)
                        throw new Error("The password has to be at least 8 letters");

                    password = await bcrypt.hash(password, salt);
                    await client.user.create({data:{firstName, lastName, username, email, password, bio, avatar}});
                    return {
                        ok: true
                    }
                } catch (error) {
                    return {
                        ok: false,
                        error
                    };
            }
        },
    }
}
export default createAccountResolvers;
