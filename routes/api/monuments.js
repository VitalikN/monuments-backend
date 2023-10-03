const express = require('express');

const ctrl = require('../../controllers/monuments');

const { validateBody, isValidId } = require('../../middlewares');

const { schemas } = require('../../models/monument');

const router = express.Router();

router.get('/', ctrl.getAll);

router.get('/:id', isValidId, ctrl.getById);

router.post('/', validateBody(schemas.addSchema), ctrl.add);
router.put('/:id', isValidId, validateBody(schemas.addSchema), ctrl.updateById);

router.patch(
  '/:id/favorite',
  isValidId,
  validateBody(schemas.updateFavoriteSchemas),
  ctrl.updateFavorite
);

router.delete('/:id', isValidId, ctrl.deleteById);

module.exports = router;
