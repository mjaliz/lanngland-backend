const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const constants = require("./constants");

const userSchema = new mongoose.Schema({
  speakLanguage: {
    type: String,
    required: true,
    minlength: constants.stringMinLength,
    maxlength: constants.stringMaxLength,
  },
  targetLanguage: {
    type: String,
    required: true,
    minlength: constants.stringMinLength,
    maxlength: constants.stringMaxLength,
  },
  motivation: {
    type: String,
    required: true,
    minlength: constants.stringMinLength,
    maxlength: constants.stringMaxLength,
  },
  pastExperience: {
    type: String,
    required: true,
    minlength: constants.stringMinLength,
    maxlength: constants.stringMaxLength,
  },
  timeGoal: {
    type: Number,
    required: true,
  },
  age: {
    type: String,
    required: true,
    minlength: constants.stringMinLength,
    maxlength: constants.stringMaxLength,
  },
  name: {
    type: String,
    required: true,
    minlength: constants.stringMinLength,
    maxlength: constants.stringMaxLength,
  },
  email: {
    type: String,
    required: true,
    minlength: constants.emailMinLength,
    maxlength: constants.emailMaxLength,
  },
  password: {
    type: String,
    required: true,
    minlength: constants.passwordMinLength,
    maxlength: constants.passwordMaxLength,
  },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      isAdmin: this.isAdmin,
    },
    process.env.JWT_KEY
  );
  return token;
};

const User = mongoose.model("User", userSchema);

const schema = Joi.object({
  speakLanguage: Joi.string()
    .min(constants.stringMinLength)
    .max(constants.stringMaxLength)
    .required(),
  targetLanguage: Joi.string()
    .min(constants.stringMinLength)
    .max(constants.stringMaxLength)
    .required(),
  motivation: Joi.string()
    .min(constants.stringMinLength)
    .max(constants.stringMaxLength)
    .required(),
  pastExperience: Joi.string()
    .min(constants.stringMinLength)
    .max(constants.stringMaxLength)
    .required(),
  timeGoal: Joi.string()
    .min(constants.stringMinLength)
    .max(constants.stringMaxLength)
    .required(),
  age: Joi.string()
    .min(constants.stringMinLength)
    .max(constants.stringMaxLength)
    .required(),
  name: Joi.string()
    .min(constants.stringMinLength)
    .max(constants.stringMaxLength)
    .required(),
  email: Joi.string()
    .min(constants.emailMinLength)
    .max(constants.emailMaxLength)
    .required(),
  password: Joi.string()
    .min(constants.passwordMinLength)
    .max(constants.passwordMaxLength)
    .required(),
});

exports.User = User;
exports.joiSchema = schema;
