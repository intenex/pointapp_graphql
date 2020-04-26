import { gql } from "apollo-boost";

export const LIST_TWEETS = gql`
  query getAllTweets {
    tweets {
      id
      body
      user { email }
    }
  }
`;

export const USER_TWEETS = gql`
  query getUserTweets($email: String!) {
    user(email: $email) {
      tweets { 
        id
        body
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($email: String!) {
    createUser(email: $email) { email }
  }
`;

export const CREATE_TWEET = gql`
  mutation createTweet($body: String!) {
    createTweet(
      body: $body
    ) {
      id
      body
      user {
        email
      }
    }
  }
`;