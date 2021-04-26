import {gql} from "apollo-server";

export const typeDefs = gql`
  type BlueprintResult {
    ok: Boolean!
    error: String
  }
  type Blueprint {

  }
  type Query {
    blueprint(): Blueprint
  }
  type Mutation {
    blueprint(): BlueprintResult!
  }
`;