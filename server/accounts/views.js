import { findUser, createUser, updateUser } from "./dao.js";
import { encodeToken } from "./authentication.js";

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await findUser(email, password);

  if (!user) {
    res.status(401);
    return res.json({ error: "Invalid email or password" });
  }

  const accessToken = encodeToken({ userId: user.id });
  return res.json({ accessToken });
}

export async function signup(req, res) {
  const { email, password } = req.body;
  const user = await findUser(email, null);

  if (user) {
    res.status(400);
    return res.json({
      error: "An account associated to this email already exists",
    });
  }

  createUser(email, password)
    .then((user) => {
      res.status(200);
      res.json(user);
    })
    .catch(res.send);
}

export async function getProfile(req, res) {
  findUser(req.userId)
    .then((user) => {
      res.status(200);
      res.json(user);
    })
    .catch(res.send);
}

export async function putProfile(req, res) {
  const { email, password, name, image } = req.body;
  const id = req.userId;
  updateUser(id, {
    email: email,
    password: password,
    name: name,
    image: image,
  })
    .then((user) => {
      res.status(200);
      res.json(user);
    })
    .catch(res.send);
}

export async function deactivateUser(req, res) {
  const { id } = req.body;
  updateUser(id, {
    isActive: false,
  })
    .then((user) => {
      res.status(200);
      res.json(user);
    })
    .catch(res.send);
}

export async function activateUser(req, res) {
  const { id } = req.body;
  updateUser(id, {
    isActive: true,
  })
    .then((user) => {
      res.status(200);
      res.json(user);
    })
    .catch(res.send);
}
