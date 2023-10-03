const express = require('express');

const ctrl = require('../../controllers/monuments/monuments');

const { validateBody } = require('../../middlewares');

const { schemas } = require('../../models/monument');

const router = express.Router();

router.get('/', ctrl.getAll);

router.get('/:id', ctrl.getById);

router.post('/', validateBody(schemas.addSchema), ctrl.add);
// router.put('/:id', validateBody(schemas.addSchema), ctrl.updateById);

// router.delete('/:id', ctrl.deleteById);

module.exports = router;
