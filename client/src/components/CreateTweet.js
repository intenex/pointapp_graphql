import React from "react";
import { Mutation } from "react-apollo";
import { CREATE_TWEET } from "../utils/queries";


class CreateTweet extends React.Component {
  constructor(props) {
    super(props);
    this.state = { body: "" };

    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleBodyChange(event) {
    this.setState({body: event.target.value});
  }

  async handleSubmit(event, createTweet) {
    const {body} = this.state;
    event.preventDefault();

    await createTweet({
      variables: {
        body
      }
    });

    this.setState({body: ""});
  }

  render() {
    return (
      <Mutation
        mutation={CREATE_TWEET}
        onCompleted={() => (window.location.href = "/user")}
      >
        {(createTweet, { data, loading, error }) => (
          <div>
            <div className="w-100 pa4 flex justify-center">
              <form onSubmit={(event) => this.handleSubmit(event, createTweet)}>
                <div style={{ maxWidth: 400 }} className="">
                  <label> Tweet: </label>
                  <input
                    className="w-100 pa3 mv2"
                    type="text"
                    required
                    onChange={this.handleBodyChange}
                  />
                </div>

                {loading && <p>Loading...</p>}
                {error && <p>Sorry, there was an error. Try reloading.</p>}

                <button type="submit">Post Tweet</button>
              </form>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default CreateTweet;
