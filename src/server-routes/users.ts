import express from "express";
const router = express.Router();
const admin = require("../firebase.js");
const auth = admin.auth();

router.get("/", (req, res, next) => {});

router.get("/", (req, res, next) => {});

router.post("/create", (req, res, next) => {});

router.get("/logout", (req, res, next) => {
  auth.signOut().then(() => {
    console.log("signout successful");
  });
});
