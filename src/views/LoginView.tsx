import React from "react";
import { Link } from "react-router-dom";
import LinkedInPage from "../components/LinkedLoginButton";
import "./LoginView.scss";
import { getCurrentUser } from "../firebase";

function LoginView() {
  //@ts-ignore
  console.log(getCurrentUser());
  return (
    <div id="LoginView">
      <div id="signin">
        <form>
          <div>
            <input placeholder="Username" />
          </div>

          <div style={{ marginTop: "15px" }}>
            <input placeholder="Password" />
          </div>

          <div style={{ marginTop: "15px" }}>
            <button style={{ width: "100%" }}>LOGIN</button>
          </div>
          <div style={{ marginTop: "15px" }}>
            <LinkedInPage />
          </div>
          <div style={{ marginTop: "15px" }}>
            <Link to={"/newaccount"} />
          </div>
          <div style={{ marginTop: "15px" }}>
            <Link to={"/forgotpass"} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginView;
