const { HttpError, ctrlWrapper } = require('../../helpers');
const monuments = require('../../models/monuments');

const getAll = async (req, res) => {
  const result = await monuments.getAll();
  res.json(result);
};

const getById = async (req, res) => {
  console.log(req.params);

  const { id } = req.params;
  const result = await monuments.getById(id);
  if (!result) {
    throw HttpError(404, 'Monument not found');
  }
  res.json(result);
};

const add = async (req, res) => {
  const result = await monuments.add(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await monuments.updateById(id, req.body);
  if (!result) {
    throw HttpError(404, 'Monument not found');
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await monuments.deleteById(id);
  if (!result) {
    throw HttpError(404, 'monument not found');
  }
  res.json({
    message: 'Delete success',
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
