require('dotenv').config();
import fs from "fs";
import { IResolvers } from "apollo-server";
import { BasicReturnType } from "../users.types";
import { checkUndefined, checkType, checkNull, removeWhitespaces } from "../users.utils";
import client from "../../client";
import bycrypt from "bcrypt";
import { FileUpload } from "@apollographql/graphql-upload-8-fork";

type Undefinable = string | undefined;

type EditProfileProp = {
    firstName: Undefinable
    lastName: Undefinable
    username: Undefinable
    email: Undefinable
    password : Undefinable
    token: Undefinable
    bio: Undefinable
    avatar: FileUpload
}

const EditProfileMutation: IResolvers = {
    Mutation: {
        editProfile: async(_, {
            firstName,
            lastName,
            username,
            email,
            password,
            bio,
            avatar
        }: EditProfileProp, 
        { currentUser, isLoggedIn } // context
        ): Promise<BasicReturnType> => {
            try {
                const { filename, createReadStream } = await avatar;
                const readStream = createReadStream();
                const writeStream = fs.createWriteStream(process.cwd() + '\\uploads\\' + filename);
                readStream.pipe(writeStream);
                
                const argArray = [ firstName, lastName, username, email, password ];
                const salt = process.env.SALT || 10;
                const isNull = checkNull(argArray);
                const isType = checkType(argArray, 'string');

                isLoggedIn(currentUser);
                if(isNull)
                    throw new Error("Wrong approach. Arguments cannot be 'null'.");
                if(isType)
                    throw new Error("Wrong input. Arguments must be 'string'.");
                if(username && await client.user.findUnique({where:{username}}))
                    throw new Error("The same username exists. Try others.");
                if(email && await client.user.findUnique({where:{email}}))
                    throw new Error("The same email exists. Try others.");

                // Remove White Spaces for inputs
                username = removeWhitespaces(username);
                password = removeWhitespaces(password);
                email = removeWhitespaces(email);
                firstName = removeWhitespaces(firstName);
                lastName = removeWhitespaces(lastName);

                // Hash Password
                if(checkUndefined([ password ]))
                    password = await bycrypt.hash(password, salt); 

                // update user
                await client.user.update({where:{id: currentUser.id}, data:{username, email, password, firstName, lastName, bio}});
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
