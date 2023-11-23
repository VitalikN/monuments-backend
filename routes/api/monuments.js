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

//  upload.fields([{name: "poster" ,  maxCount: 1}, {name: "second-poster", maxCount:2}]), якщо в кількох полях очікуєтмо картинку
//  upload.array("poster", 9) максимальна кількисть в цьому полі
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
