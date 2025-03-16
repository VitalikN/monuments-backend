const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { HandleMongooseError } = require('../helpers');

const sendMessageSchema = new Schema(
  {
    tel: {
      type: String,
      required: true,
      match: /^\+?\d{10,15}$/,
    },
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
  },
  { versionKey: false, timestamps: true }
);

// Обробка помилок
sendMessageSchema.post('save', HandleMongooseError);

// Модель
const SendMessage = model('SendMessage', sendMessageSchema);

// Joi схема для валідації вхідних даних
const sendMessageJoiSchema = Joi.object({
  tel: Joi.string()
    .pattern(/^\+?\d{10,15}$/)
    .required()
    .messages({
      'string.pattern.base': 'Телефон має бути у форматі +1234567890',
      'string.empty': 'Поле "Телефон" обовʼязкове',
    }),
  name: Joi.string().min(2).max(50).required().messages({
    'string.empty': 'Поле "Імʼя" обовʼязкове',
    'string.min': 'Імʼя повинно містити мінімум 2 символи',
    'string.max': 'Імʼя повинно містити максимум 50 символів',
  }),
});

module.exports = {
  SendMessage,
  sendMessageJoiSchema,
};
