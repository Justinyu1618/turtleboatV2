import axios from "axios";
import React, { Component } from "react";
//@ts-ignore
import { LinkedIn } from "react-linkedin-login-oauth2";
import linkedin from "react-linkedin-login-oauth2/assets/linkedin.png";

class LinkedInPage extends Component {
  state = {
    code: "",
    errorMessage: "",
  };

  //@ts-ignore
  handleSuccess = (data) => {
    console.log("success!", data);
    this.setState({
      code: data.code,
      errorMessage: "",
    });
    axios.post("/handleLinkedinLogin", { authCode: data.code });
  };
  //@ts-ignore
  handleFailure = (error) => {
    console.log("fail", error);
    this.setState({
      code: "",
      errorMessage: error.errorMessage,
    });
  };

  render() {
    const { code, errorMessage } = this.state;
    return (
      <div>
        <LinkedIn
          clientId="77tlh41g5t4fsu"
          scope={"r_liteprofile r_emailaddress"}
          onFailure={this.handleFailure}
          onSuccess={this.handleSuccess}
          redirectUri="http://localhost:3000/linkedin"
        >
          <img
            src={linkedin}
            alt="Log in with Linked In"
            style={{ maxWidth: "180px" }}
          />
        </LinkedIn>
        {!code && <div>No code</div>}
        {code && <div>Code: {code}</div>}
        {errorMessage && <div>{errorMessage}</div>}
      </div>
    );
  }
}

export default LinkedInPage;
