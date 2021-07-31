import React, { Component } from "react";
import auth from "../../services/authService";

// import Logout from "./logout";

class Logout extends Component {
  componentDidMount() {
    auth.logout();
    window.location = "/"; // to get a full app reload and set location as root of app
  }
  render() {
    return null;
  }
}

export default Logout;
