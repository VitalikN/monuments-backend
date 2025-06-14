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
      // required: true,
    },
    // опис
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      // required: true,
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
   subtitle: Joi.when('category', {
    is: Joi.valid('single', 'double'),
    then: Joi.string().valid(...subtitleList).required().messages({
      'any.required': 'Поле "Тип" обовʼязкове для одиночних і подвійних памʼятників.',
    }),
    otherwise: Joi.forbidden(), 
  }),
  category: Joi.string()
    .valid(...typeList)
    .required(),
   
   price: Joi.when('category', {
    is: Joi.valid('icons'),
    then: Joi.forbidden(),  
    otherwise: Joi.number().required(),  
  }),

  favorite: Joi.boolean(),
});


const updateSchema = Joi.object({
  title: Joi.string(),
  subtitle: Joi.string().valid(...subtitleList),
  category: Joi.string().valid(...typeList),
  price: Joi.number(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchemas = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchemas,
  updateSchema,
};

monumentSchema.post('save', HandleMongooseError);

const Monument = model('monument', monumentSchema);

module.exports = { Monument, schemas };
