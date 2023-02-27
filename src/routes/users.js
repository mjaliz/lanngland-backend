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

module.exports = router;
