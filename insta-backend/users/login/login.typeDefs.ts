import {gql} from "apollo-server";

export default gql`
    type LoginResult {
        ok: Boolean!
        token: String # Optional
        error: String
    }
    type Query {
        seeProfile(username:String): User
    }
    type Mutation {
        login(username:String!, password: String!):LoginResult!
    }
`;