import {gql} from "apollo-server";

export const typeDefs = gql`
  type User {
    id        : String!
    firstName : String!
    lastName  : String
    username  : String!
    email     : String!
    password  : String
    createdAt : String!
    updatedAt : String!
  }
  type Query {
    seeProfile(username:String): User
  }
  type Mutation {
    createAccount(
      firstName : String!
      lastName  : String
      username  : String!
      email     : String!
      password  : String!
    ): User
  }
`;