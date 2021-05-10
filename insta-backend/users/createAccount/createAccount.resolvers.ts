require('dotenv').config();
import { IResolvers } from "apollo-server-express";
import { BasicReturnType } from "../users.types";
import { saveAvatarDemo, removeWhitespaces } from "../users.utils";
import client from "../../client";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";

let salt: number = 10;
if(process.env.SALT !== undefined)
    salt = parseInt(process.env.SALT);

const createAccountResolvers: IResolvers = {
    Mutation: {
        createAccount: async(_,
                { firstName, lastName, username, email, password, bio, avatar }
            ): Promise<BasicReturnType> => {
                try {
                    let avatar_url:string = "";
                    const existingUser:User|null = await client.user.findFirst({
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
                    username = removeWhitespaces(username);
                    password = removeWhitespaces(password);
                    email = removeWhitespaces(email);
                    firstName = removeWhitespaces(firstName);
                    lastName = removeWhitespaces(lastName);

                    if(existingUser)
                        throw new Error("The username/email is already taken");
                    
                    if(!password)
                        throw new Error("An empty string is aborted for the password")
                    else if(password.length < 8)
                        throw new Error("The password has to be at least 8 letters");

                    password = await bcrypt.hash(password, salt);
                    const { id } = await client.user.create({data:{firstName, lastName, username, email, password, bio, avatar: avatar_url}});
                    if(avatar)
                        avatar_url = await saveAvatarDemo(avatar, id);
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
