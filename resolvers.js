import { AuthenticationError } from "apollo-server";
import { User, Tweet } from "./database";

const resolvers = {
  Query: {
    users: () => User.findAll(),
    user: (_, args) => User.findOne({ where: args }),
    tweets: () => Tweet.findAll(),
    tweet: (_, args) => Tweet.findOne({ where: args }),
  },

  User: {
    tweets: (user) => user.getTweets(),
  },

  Tweet: {
    user: (tweet) => tweet.getUser(),
  },

  Mutation: {
    createUser: async (_, { email }) => {
      let user = await User.findOne({ where: { email } });
      if (user) {
        return user;
      } else {
        return await User.create({ email });
      }
    },
    createTweet: async (_, { body }, context) => {
      if (context.noAuth) {
        throw new AuthenticationError(
          "Authentication did not succeed. Please try again."
        );
      }
      try {
        const userInfo = await context.authPayload;
        const user = await User.findOne({ where: { email: userInfo.email } });
        const tweet = await Tweet.create({ userId: user.dataValues.id, body });
        return tweet;
      } catch (e) {
        throw new AuthenticationError(
          "Authentication did not succeed. Please try again."
        );
      }
    },
  },
};

export default resolvers;