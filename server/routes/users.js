const express = require("express");
const router = express.Router();
const UserService = require("../services/user.service");

router.get("/", async (req, res) => {
  const userId = req.session.userId;

  if (userId) {
    const user = await UserService.findById(userId);

    return user ? res.status(200).json(user) : res.status(401).end();
  } else {
    res.status(401).end();
  }
});

router.post("/register", async (req, res) => {
  const { userId, fullName, password } = req.body;
  const user = UserService.create({ userId, fullName, password });

  if (user) {
    req.session.userId = user._id;

    res.status(200).json(user);
  } else {
    res.status(500).end();
  }
});

router.post("/login", async (req, res) => {
  const { userId, password } = req.body;
  const user = await UserService.findByIdAndPassword(userId, password);

  if (user) {
    req.session.userId = user._id.toString();

    res.status(200).json(user);
  } else {
    res.status(401).end();
  }
});

router.get("/logout", async (req, res) => {
  if ("userId" in req.session) {
    req.session.userId = undefined;
  }

  res.sendStatus(204);
});

module.exports = router;
