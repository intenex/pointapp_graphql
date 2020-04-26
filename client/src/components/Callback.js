import React  from "react";
import { withRouter } from "react-router-dom";
import { Mutation } from "react-apollo";
import auth from "../Auth";
import { CREATE_USER } from "../utils/queries";

class Callback extends React.Component {

  async handleCreateUser(createUser) {
    const { idTokenPayload } = await auth.handleAuthentication();
    await createUser({ variables: { email: idTokenPayload.email } });
  }

  render() {
    return (
      <Mutation
        mutation={CREATE_USER}
        onCompleted={() => (window.location.href = "/user")}
      >
        {(createUser) => {
          this.handleCreateUser(createUser);
          return(<div>Loading...</div>)
        }}
      </Mutation>
    );
  }
}

export default withRouter(Callback);
