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

router.get('/:id', authenticate, isValidId, ctrl.getById);

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
  '/:id',
  authenticate,
  isValidId,
  validateBody(schemas.updateSchema),
  ctrl.updateById
);

router.patch(
  '/:id/favorite',
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchemas),
  ctrl.updateFavorite
);

router.delete('/:id', authenticate, isValidId, ctrl.deleteById);

module.exports = router;
