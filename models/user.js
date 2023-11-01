const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { HandleMongooseError } = require('../helpers');

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,4}$/i;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegex,
      unique: true,
      required: [true, 'Email is Required'],
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
    token: {
      type: String,
      default: '',
    },
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.post('save', HandleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
});
const updateSchema = Joi.object({
  email: Joi.string().pattern(emailRegex),
  password: Joi.string().min(6),
});

const schemas = {
  registerSchema,
  loginSchema,
  updateSchema,
};

const User = model('user', userSchema);

module.exports = {
  User,
  schemas,
};
