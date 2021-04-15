import firebase from "firebase";
// import "firebase/auth";
import admin from "firebase-admin";
// import serviceAccount from "./serviceAccount";

const firebaseConfig = {
  apiKey: "AIzaSyCvddPCcW9sGZW4tqThujO8o8qWu6QStCs",
};
firebase.initializeApp(firebaseConfig);
// const auth = firebase.auth();

admin.initializeApp({
  credential: admin.credential.cert(
    "/home/justinyu/Documents/projects/youth_cities/turtleboatV2/src/serviceAccount.json"
  ),
});

const getCurrentUser = () => {
  return firebase.auth().currentUser;
};

export const fbClient = firebase;
export { admin, getCurrentUser };
