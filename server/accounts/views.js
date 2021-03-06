import * as dao from "./dao.js";
import { encodeToken } from "./authentication.js";
import nodemailer from "nodemailer";

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await dao.findUser(email, password);

  if (!user) {
    res.status(401);
    return res.json({ error: "Invalid email or password" });
  }

  const accessToken = encodeToken({ userId: user.id });
  return res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image?.toString(),
    accessToken: accessToken,
    isAdmin: user.isAdmin,
  });
}

export async function signup(req, res) {
  const { email, password, name, image } = req.body;
  const user = await dao.findUser(email, null);

  if (user) {
    res.status(400);
    return res.json({
      error: "An account associated to this email already exists",
    });
  }

  dao
    .createUser(email, password, name, image)
    .then((user) => {
      res.status(200);
      res.json(user);
    })
    .catch((err) => res.send(err));
}

export async function getUpdatedProfile(req, res) {
  dao
    .findUser(req.userId)
    .then((user) => {
      const accessToken = encodeToken({ userId: user.id });
      res.status(200);
      return res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image?.toString(),
        accessToken: accessToken,
        isAdmin: user.isAdmin,
      });
    })
    .catch((err) => {
      res.send(err);
      console.log(err);
    });
}

export async function getProfile(req, res) {
  dao
    .findUser(req.userId)
    .then((user) => {
      if (!req.user.isAdmin && user.id !== req.user.id) {
        res.status(403);
        res.json({
          error: "Permission Denied",
        });
      }
      user.image = user.image.toString();
      res.status(200);
      res.json(user);
    })
    .catch((err) => {
      res.send(err);
      console.log(err);
    });
}

export async function putProfile(req, res) {
  const { email, password, name, image } = req.body;
  const id = req.userId;
  dao
    .updateUser(id, {
      email: email,
      password: password,
      name: name,
      image: image,
    })
    .then((user) => {
      res.status(200);
      res.json(user);
    })
    .catch((err) => res.send(err));
}

export async function deactivateUser(req, res) {
  const { id } = req.body.data;
  dao
    .updateUser(id, {
      isActive: false,
    })
    .then((user) => {
      res.status(200);
      res.json(user);
    })
    .catch((err) => res.send(err));
}

export async function activateUser(req, res) {
  const { id } = req.body.data;
  dao
    .updateUser(id, {
      isActive: true,
    })
    .then((user) => {
      res.status(200);
      res.json(user);
    })
    .catch((err) => res.send(err));
}

export async function resetPassword(req, res) {
  const { userEmail } = req.body;
  const user = await dao.findUser(userEmail, null);
  if (user) {
    const email = process.env.EMAIL;
    const emailPassword = process.env.PASSWORD;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: email,
        pass: emailPassword,
      },
    });

    const mailOptions = {
      from: email,
      to: userEmail,
      subject: "Password Recovery",
      text: "Here is the password for your account: " + user.password,
    };

    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.json("The email was not sent successfully");
      } else {
        console.log("Email sent: " + info.response);
        res.status(200);
        return res.json(mailOptions);
      }
    });
  }
}

export async function getUsers(req, res) {
  const [type, ...parameters] = req.query.searchText.includes(":") ?
    req.query.searchText.split(":") : ["", req.query.searchText];

  dao
    .retrieveUsers({
      searchType: type || "",
      searchText: parameters.join(" ") || ""
    })
    .then((result) => {
      if (type === "post") {
        result = result.map(res => {
          return res.User;
        });
        let userIds = result.map(user => user.id)
        result = result.filter(({id}, index) => !userIds.includes(id, index+1))
      }
      for (let i = 0; i < result.length; i++){
        result[i].image ? result[i].image = result[i].image?.toString() : 1;
      }
      res.status(200);
      res.json(result);
    })
    .catch((err) => res.send(err));
}
