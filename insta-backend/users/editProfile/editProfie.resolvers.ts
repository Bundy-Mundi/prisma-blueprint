import { IResolvers } from "apollo-server"
import client from "../../client";

const EditProfileMutation: IResolvers = {
    Mutation: {
        editProfile: async(_, {
            firstName,
            lastName,
            username,
            email,
            password 
        }) => {
            try {
                const doesUserExist = await client.user.findUnique({where:{username}});
                const doesEmailExist = await client.user.findUnique({where:{email}});
                if(doesUserExist){
                    throw new Error("The same username exists. Try others.")
                } else if(doesEmailExist){
                    throw new Error("The same email exists. Try others.")
                } else {
                   console.log("No problem.")
                   return "No problem."
                }
            } catch (error) {
                return error;
            }
        }
    }
}
export default EditProfileMutation;