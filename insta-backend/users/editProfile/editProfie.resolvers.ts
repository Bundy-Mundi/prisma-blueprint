require('dotenv').config();
import { IResolvers } from "apollo-server"
import client from "../../client";
import bycrypt from "bcrypt";

type AllowUndefined = string | undefined;

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
        }: EditProfileProp) => {
            try {

                // Check if there is the same username or email
                if(username !== undefined && email !== undefined){
                const doesUserExist = await client.user.findUnique({where:{username}});
                const doesEmailExist = await client.user.findUnique({where:{email}});
                    if(doesUserExist){
                        throw new Error("The same username exists. Try others.")
                    } else if(doesEmailExist){
                        throw new Error("The same email exists. Try others.")
                    }
                }

                // Hash Password
                if(password !== undefined){
                    const salt = process.env.SALT || 10;
                    password = await bycrypt.hash(password, salt);
                }
                client.user.update({where:{username, email}, data:{username, email}});
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