import React from "react";
import { Query } from "react-apollo";
import { LIST_TWEETS } from "../utils/queries";
import "../App.css";

class AllTweets extends React.Component {
  render() {
    return(
      <Query query={LIST_TWEETS}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error...</p>;

          return (
            <div className="col-sm-12">
              {data.tweets.length > 0 ? (data.tweets.map((tweet) => (
                <div key={tweet.id}>
                  <div className="pa3 bg-black-05 ma3">
                    <div>
                      Tweet #{tweet.id} by {tweet.user.email}: <br/><br/>
                      {tweet.body}
                    </div>
                  </div>
                </div>
              ))) : (
                <div>
                  Man, no tweets from anyone yet. Growth hacking is hard.
                </div>
              )}
            </div>
          );
        }}
      </Query>
    )
  }
}

export default AllTweets;