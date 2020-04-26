import Sequelize from "sequelize";
// import faker from "faker";
// import _ from "lodash";

const db = new Sequelize('pointapp', null, null, {
  dialect: 'sqlite',
  storage: './pointapp.sqlite',
});

const UserModel = db.define('user', {
  email: { type: Sequelize.STRING },
});

const TweetModel = db.define('tweet', {
  body: { type: Sequelize.STRING },
});

UserModel.hasMany(TweetModel);
TweetModel.belongsTo(UserModel);

// test fake data
// faker.seed(1000);
// db.sync({ force: true }).then(() => {
  // _.times(2, () => {
  //   return UserModel.create({
  //     email: faker.internet.email(),
  //   }).then((user) => {
  //     _.times(2, () => {
  //       user.createTweet({
  //         body: faker.lorem.sentence(),
  //       });
  //     });
  //   });
  // });
// });

export const User = db.models.user;
export const Tweet = db.models.tweet;