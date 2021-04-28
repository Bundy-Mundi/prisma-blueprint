require('dotenv').config();
import { IResolvers } from "apollo-server";
import client from "../../client";
import bycrypt from "bcrypt";

type AllowUndefined = string | undefined | null;

type EditProfileProp = {
    firstName: AllowUndefined
    lastName: AllowUndefined
    username: AllowUndefined
    email: AllowUndefined
    password : AllowUndefined
}

const EditProfileMutation: IResolvers = {
    Mutation: {
        editProfile: async(_, {
            firstName,
            lastName,
            username,
            email,
            password 
        }: EditProfileProp):Promise<BasicReturnType> => {
            try {
                if(!username && !email){
                    throw new Error("Wrong approach. Username and email cannot be 'null'.");
                }
                else if(!password){
                    throw new Error("Wrong approach. You can't have an empty password.");
                }
                // Check if there is the same username or email
                // firstName & lastName can be undefined
                // password has to be more than 8 characters
                if(username && email && password){
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
                    client.user.update({where:{username, email}, data:{username, email, password, firstName, lastName}});
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