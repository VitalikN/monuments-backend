const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const typeList = ['single', 'double', 'accessories', 'icons'];

const monumentSchema = new Schema(
  {
    // аксесуари ікони одинарні подвійні
    type: {
      type: String,
      enum: typeList,
      required: true,
    },
    // опис
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

monumentSchema.post('save', handleMongooseError);

const addSchema = Joi.object({
  title: Joi.string().required(),
  type: Joi.string()
    .valid(...typeList)
    .required(),
  price: Joi.number().required(),
  favorite: Joi.boolean(),
});
const updateFavoriteSchemas = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchemas,
};

const Monument = model('monument', monumentSchema);

module.exports = { Monument, schemas };
