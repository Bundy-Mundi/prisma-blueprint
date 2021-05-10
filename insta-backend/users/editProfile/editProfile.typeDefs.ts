import {gql} from "apollo-server-express";

export const typeDefs = gql`
  type EditProfileResult {
    ok: Boolean!
    error: String
  }
  type Mutation{
    editProfile(
        firstName: String
        lastName:  String
        username:  String
        email:     String
        password:  String
        bio:       String
        avatar:    Upload
      ):EditProfileResult!
  }
`;
