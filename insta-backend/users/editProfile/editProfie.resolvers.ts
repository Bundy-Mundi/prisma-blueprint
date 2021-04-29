require('dotenv').config();
import { IResolvers } from "apollo-server";
import { BasicReturnType, JWType } from "../users.types";
import client from "../../client";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";

type PreventNull = string | null;

type EditProfileProp = {
    firstName: PreventNull
    lastName: PreventNull
    username: PreventNull
    email: PreventNull
    password : PreventNull
    token: PreventNull
}

const SECRET = process.env.SECRET || 'secret';

const EditProfileMutation: IResolvers = {
    Mutation: {
        editProfile: async(_, {
            firstName,
            lastName,
            username,
            email,
            password,
            token
        }: EditProfileProp):Promise<BasicReturnType> => {
            try { // Make sure to catch 'null' only
                if(!token)
                    throw new Error("No token provided.");
                
                const verifiedToken = <JWType>await jwt.verify(token, SECRET);

                if(username===null || email===null){
                    throw new Error("Wrong approach. Username and email cannot be 'null'.");
                }
                else if(password===null){
                    throw new Error("Wrong approach. You can't have an empty password.");
                }
                // Check if there is the same username or email
                // firstName & lastName can be undefined
                // password has to be more than 8 characters
                if(username!=null && email!=null && password!=null){
                    const salt = process.env.SALT || 10;
                    username = username.trim().replace(/\s/g, ''); // Remove whitespace
                    password = password.trim().replace(/\s/g, ''); // Remove whitespace
                    password = await bycrypt.hash(password, salt); // Hash Password

                    // If firstName & lastName  are null | undefined alsways give them a empty string
                    if(firstName && lastName){
                        firstName = firstName.trim();
                        lastName = lastName.trim();
                    } else {
                        firstName = "";
                        lastName = "";
                    }

                    // Check recurrings
                    const doesUserExist = await client.user.findUnique({where:{username}});
                    const doesEmailExist = await client.user.findUnique({where:{email}});
                    if(doesUserExist){
                        throw new Error("The same username exists. Try others.")
                    } else if(doesEmailExist){
                        throw new Error("The same email exists. Try others.")
                    }
                    if(typeof verifiedToken === 'object')
                        client.user.update({where:{id: verifiedToken.id}, data:{username, email, password, firstName, lastName}});
                }
                return {
                    ok: true
                }
            } catch (error) {
                return {
                    ok: false,
                    error
                };
            }
        }
    }
}
export default EditProfileMutation;
