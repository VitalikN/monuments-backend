const express = require('express');

const ctrl = require('../../controllers/sendMessage');

const { validateBody } = require('../../middlewares');

const { sendMessageJoiSchema } = require('../../models/sendMessage');

const router = express.Router();

router.post(
  '/',

  validateBody(sendMessageJoiSchema),
  ctrl.sendMessage
);
module.exports = router;
