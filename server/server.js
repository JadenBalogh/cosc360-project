import dotenv from "dotenv";
dotenv.config();

import path from "path";
const __dirname = path.resolve();

import express from "express";
import cors from "cors";
import {
  jwtAuthenticationMiddleware,
  isAuthenticatedMiddleware,
  isAdminMiddleware,
} from "./accounts/middlewares.js";
import * as accountViews from "./accounts/views.js";
import {getFeed, getComments, getPost, publishPost, editPost, addComment, deleteComment} from "./feed/views.js";
import { populateDB } from "./db/data/all.js";

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(jwtAuthenticationMiddleware);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

// Account Views
app.post("/accounts/login", accountViews.login);
app.post("/accounts/signup", accountViews.signup);
app.get(
  "/accounts/profile",
  isAuthenticatedMiddleware,
  accountViews.getProfile
);
app.put(
  "/accounts/profile",
  isAuthenticatedMiddleware,
  accountViews.putProfile
);
app.post("/accounts/activate", isAdminMiddleware, accountViews.activateUser);
app.post(
  "/accounts/deactivate",
  isAdminMiddleware,
  accountViews.deactivateUser
);

app.get("/feed/get-feed", getFeed);
app.get("/feed/comments", getComments);
app.get("/feed/get-post", getPost);
app.put("/feed/add-comment", addComment);
app.put("/feed/publish-post", publishPost);
app.put("/feed/edit-post", editPost);
app.delete("/feed/delete-comment", deleteComment);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api-test", isAdminMiddleware, (req, res) => {
  res.send({ userId: req.userId });
});

app.get("/populate-db", async (req, res) => {
  populateDB()
    .then((x) => {
      res.send("success");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
