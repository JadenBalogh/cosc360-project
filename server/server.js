import dotenv from "dotenv";
dotenv.config();

import path from "path";
const __dirname = path.resolve();

import express from "express";
import cors from "cors";
import {
  jwtAuthenticationMiddleware,
  isAuthenticatedMiddleware,
} from "./accounts/middlewares.js";
import { login, signup } from "./accounts/views.js";
import { getFeed } from "./feed/views.js";
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

app.post("/accounts/login", login);
app.post("/accounts/signup", signup);
app.get("/feed/get-feed", getFeed);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api-test", isAuthenticatedMiddleware, (req, res) => {
  res.send({ userId: req.userId });
});

app.get("/populate-db", async (req, res) => {
  populateDB()
    .then((x) => {
      res.send("success");
    })
    .catch(res.send);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
