const express = require('express');

const ctrl = require('../../controllers/monuments');

const {
  validateBody,
  isValidId,
  authenticate,
  upload,
} = require('../../middlewares');

const { schemas } = require('../../models/monument');

const router = express.Router();

router.get('/', ctrl.getAll);

router.get('/:monumentId', authenticate, isValidId, ctrl.getById);

router.post(
  '/',
  authenticate,

  upload.fields([{ name: 'url', maxCount: 1 }]),
  validateBody(schemas.addSchema),
  ctrl.add
);

router.patch(
  '/:monumentId',
  authenticate,
  isValidId,
  upload.fields([{ name: 'url', maxCount: 1 }]),
  validateBody(schemas.updateSchema),
  ctrl.updateById
);

router.patch(
  '/:monumentId/favorite',
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchemas),
  ctrl.updateFavorite
);

router.delete('/:monumentId', authenticate, isValidId, ctrl.deleteById);

module.exports = router;
