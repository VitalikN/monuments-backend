const express = require('express');

const ctrl = require('../../controllers/epitaphs');

const {
  validateBody,
  isValidId,
  authenticate,
  upload,
} = require('../../middlewares');

const { schemas } = require('../../models/epitaphs');

const router = express.Router();

router.get('/', ctrl.getAllEpitaphs);

router.post(
  '/',
  authenticate,

  validateBody(schemas.addSchemaEpitaphs),
  ctrl.addEpitaphs
);

router.patch(
  '/:monumentId',
  authenticate,
  isValidId,
  validateBody(schemas.updateSchemaEpitaphs),
  ctrl.updateEpitaphById
);

router.delete('/:monumentId', authenticate, isValidId, ctrl.deleteById);

module.exports = router;
