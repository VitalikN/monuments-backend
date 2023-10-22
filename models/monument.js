const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { HandleMongooseError } = require('../helpers');

const typeList = ['single', 'double', 'accessories', 'icons'];
const subtitleList = ['open', 'closed'];
const monumentSchema = new Schema(
  {
    // аксесуари ікони одинарні подвійні
    category: {
      type: String,
      enum: typeList,
      required: true,
    },
    // відкритий або закритий
    subtitle: {
      type: String,
      enum: subtitleList,
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

    url: {
      type: String,
      required: [true, 'Url is required'],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const addSchema = Joi.object({
  title: Joi.string().required(),
  subtitle: Joi.string()
    .valid(...subtitleList)
    .required(),
  category: Joi.string()
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

monumentSchema.post('save', HandleMongooseError);

const Monument = model('monument', monumentSchema);

module.exports = { Monument, schemas };
