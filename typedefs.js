import { gql } from "apollo-server";

const typeDefs = gql`
  type User {
    id: Int!
    email: String!
    tweets: [Tweet]!
  }

  type Tweet {
    id: Int!
    body: String!
    created_at: String!
    updated_at: String!
    user: User!
  }

  type Query {
    users: [User]!
    user(email: String!): User
    tweets: [Tweet]!
    tweet(id: Int!): Tweet
  }

  type Mutation {
    createUser(email: String!): User!
    createTweet(body: String!): Tweet!
  }
`;

export default typeDefs;