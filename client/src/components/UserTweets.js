import React from "react";
import { Query } from "react-apollo";
import { USER_TWEETS } from "../utils/queries";
import "../App.css";

class UserTweets extends React.Component {
  render() {
    const email = JSON.parse(localStorage.getItem("email"));
    return (
      <Query query={USER_TWEETS} variables={{email}}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error...</p>;

          return (
            <div className="col-sm-12">
              {data.user.tweets.length > 0 ? (data.user.tweets.map((tweet) => (
                <div className="col-sm-4" key={tweet.id}>
                  <div className="pa3 bg-black-05 ma3">
                    <div>
                      Tweet #{tweet.id}: {tweet.body}
                    </div>
                  </div>
                </div>
              ))) : (
                <div>
                  You have no tweets yet...go make one!
                </div>
              )}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default UserTweets;
