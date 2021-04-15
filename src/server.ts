import express from "express";
import bodyParser from "body-parser";
import path from "path";

import axios from "axios";
import qs from "qs";
import { admin, fbClient } from "./firebase";
// const firebase = require("firebase");
const app = express();
const auth = admin.auth();

// const firebaseConfig = require("../firebase-config.json");
const firebaseConfig = {
  apiKey: "AIzaSyCvddPCcW9sGZW4tqThujO8o8qWu6QStCs",
};
// firebase.initializeApp({
//   serviceAccount: serviceAccount,
// });

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "build")));

app.get("/ping", function (req, res) {
  return res.send("pong");
});

// https://firebase.googleblog.com/2016/10/authenticate-your-firebase-users-with.html
app.post("/handleLinkedinLogin", (req, res) => {
  const authCode = req.body.authCode;
  // console.log(authCode);
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  };
  axios({
    method: "post",
    url: "https://www.linkedin.com/oauth/v2/accessToken",
    data: qs.stringify({
      grant_type: "authorization_code",
      code: authCode,
      redirect_uri: "http://localhost:3000/linkedin",
      client_id: "77tlh41g5t4fsu",
      client_secret: "yotYF67inOxr3iRz",
    }),
    headers: headers,
  })
    .then((result) => {
      const accessToken = result.data.access_token;
      const expires = result.data.expires_in;

      getLinkedInId(accessToken)
        .then((response) => {
          console.log("success getting linkedin id");
          console.log(response.data);
          const id = response.data.id;
          const name = response.data.name;
          auth.createCustomToken(id).then((firebaseToken) => {
            // console.log(firebaseToken);
            // const tempApp = firebase.initializeApp(firebaseConfig, "_temp_");
            fbClient
              .auth()
              .signInWithCustomToken(firebaseToken)
              .then((userCredential) => {
                console.log("logged in!");
                console.log(userCredential?.user?.uid);
              })
              .catch((error) => {
                console.log("error logging in with firebase!");
              });
          });
        })
        .catch((error) => {
          console.log("trouble getting linkedinid!");
          console.log(error);
          // console.log(accessToken);
        });
      res.status(200).send("Success!");
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("FAIL");
    });
});

app.listen(process.env.PORT || 8080);

function getLinkedInId(accessToken: string) {
  const headers = { Authorization: `Bearer ${accessToken}` };
  return axios.get("https://api.linkedin.com/v2/me", { headers: headers });
}

export {};
