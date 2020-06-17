import React from "react";
import { UserContext } from "../App";

export default Component =>
  class UserContextHOC extends React.Component {
    render() {
      return (
        <UserContext.Consumer>
          {context => <Component {...this.props} {...context} />}
        </UserContext.Consumer>
      );
    }
  };
