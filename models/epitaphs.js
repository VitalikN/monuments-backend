const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { HandleMongooseError } = require('../helpers');

const epitaphSchema = new Schema(
  {
    epitaphNumber: {
      type: Number,
      required: true,
    },
    epitaph: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);
const addSchemaEpitaphs = Joi.object({
  epitaph: Joi.string().required(),
  epitaphNumber: Joi.number().required(),
});
const updateSchemaEpitaphs = Joi.object({
  epitaph: Joi.string(),
  epitaphNumber: Joi.number(),
});
const schemas = {
  addSchemaEpitaphs,
  updateSchemaEpitaphs,
};

epitaphSchema.post('save', HandleMongooseError);

const Epitaph = model('epitaph', epitaphSchema);

module.exports = { Epitaph, schemas };
