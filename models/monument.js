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
    // subtitle: {
    //   type: String,
    //   enum: subtitleList,
    //   // required: true,
    // },

     subtitle: {
      type: String,
      enum: subtitleList,
      validate: {
        validator: function (value) {
          if (this.category === 'single' || this.category === 'double') {
            return !!value; // обов'язковий
          }
          return true; 
        },
        message: 'Subtitle is required for single and double categories',
      },
    },
    // опис
    title: {
      type: String,
      required: true,
    },
    // price: {
    //   type: Number,
    //   // required: true,
    // },
      price: {
      type: Number,
      validate: {
        validator: function (value) {
          if (this.category === 'single' || this.category === 'double') {
            return value !== undefined && value !== null;
          }
          return true;
        },
        message: 'Price is required for single and double categories',
      },
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
  subtitle: Joi.when('category', {
    is: Joi.valid('single', 'double'),
    then: Joi.string().valid(...subtitleList),
    otherwise: Joi.forbidden(),
  }),
  category: Joi.string().valid(...typeList),
  price: Joi.when('category', {
    is: Joi.valid('icons', 'accessories'),
    then: Joi.forbidden(),
    otherwise: Joi.number(),
  }),
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
