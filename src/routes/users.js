const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const translator = require("../utils/translator");
const { User, joiSchema } = require("../models/user");
const body = require("../outputs/body");

const router = express.Router();

router.post("/check_email", async (req, res) => {
  if (!req.body.email)
    return res
      .status(400)
      .send({ ...body, message: translator["Email required"] });

  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res
      .status(400)
      .send({ ...body, message: translator["User already registered"] });

  return res.status(200).send({ ...body, status: true });
});

router.post("/", async (req, res) => {
  const { error } = joiSchema.validate(req.body);
  if (error)
    return res.status(400).send({ ...body, message: error.details[0].message });

  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res
      .status(400)
      .send({ ...body, message: translator["User already registered"] });

  user = new User(req.body);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  user.access_token = token;

  res.header("Authorization", `Bearer ${token}`).send({
    ...body,
    data: _.pick(user, ["_id", "name", "email", "access_token"]),
  });
});

module.exports = router;
