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
import {
  getFeed,
  getPostComments,
  getPost,
  publishPost,
  editPost,
  addComment,
  deleteComment,
  editComment,
  deletePost,
} from "./feed/views.js";
import { populateDB } from "./db/data/all.js";

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(
  express.json({
    limit: "16MB",
  })
);
app.use(
  express.urlencoded({
    extended: false,
    limit: "16MB",
  })
);
app.use(jwtAuthenticationMiddleware);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "build")));
}

// Account Views
app.post("/accounts/login", accountViews.login);
app.post("/accounts/signup", accountViews.signup);
app.get(
  "/accounts/updated-user",
  isAuthenticatedMiddleware,
  accountViews.getUpdatedProfile
);
app.post("/accounts/password-recovery", accountViews.resetPassword);
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

app.get("/accounts/users", isAdminMiddleware,  accountViews.getUsers);

// Post Views
app.get("/feed/get-feed", getFeed);
app.get("/feed/get-post", getPost);
app.post("/feed/publish-post", isAuthenticatedMiddleware, publishPost);
app.put("/feed/edit-post", isAuthenticatedMiddleware, editPost);
app.delete("/feed/delete-post", isAuthenticatedMiddleware, deletePost);

// Comment Views
app.get("/feed/comments", getPostComments);
app.put("/feed/edit-comment", isAuthenticatedMiddleware, editComment);
app.post("/feed/add-comment", isAuthenticatedMiddleware, addComment);
app.delete("/feed/delete-comment", isAuthenticatedMiddleware, deleteComment);

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

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
