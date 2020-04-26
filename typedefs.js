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
    updateUser(email: String!): User!
    deleteUser(email: String!): Boolean!
    createTweet(body: String!): Tweet!
    updateTweet(id: Int!, body: String!): Tweet!
    deleteTweet(id: Int!): Boolean!
  }
`;

export default typeDefs;