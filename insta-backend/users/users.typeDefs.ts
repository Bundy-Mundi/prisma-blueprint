import {gql} from "apollo-server-express";

export const typeDefs = gql`
  type User {
    id        : String!
    firstName : String!
    lastName  : String
    username  : String!
    email     : String!
    password  : String
    bio       : String
    avatar    : String
    createdAt : String!
    updatedAt : String!
  }
  type Query {
    user(username:String): User
  }
`;