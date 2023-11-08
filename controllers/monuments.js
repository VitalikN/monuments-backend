const { HttpError, ctrlWrapper } = require('../helpers');
const { Monument } = require('../models/monument');

/** */

const getAll = async (req, res) => {
  const { page = 1, limit = 10, category, subtitle } = req.query;
  const skip = (page - 1) * limit;

  const query = {};
  if (category) {
    query.category = category;
  }

  if (subtitle && (subtitle === 'open' || subtitle === 'closed')) {
    query.subtitle = subtitle;
  }

  const result = await Monument.find(query, '-createdAt -updatedAt', {
    skip,
    limit,
  })
    .populate('owner', 'name email')
    .sort({ price: 1 });

  res.json(result);
};

const getById = async (req, res) => {
  console.log(req.params);

  const { id } = req.params;
  const result = await Monument.findById(id);
  if (!result) {
    throw HttpError(404, 'Monument not found');
  }
  res.json(result);
};

const add = async (req, res) => {
  const url = req.files['url'][0].path;

  const { _id: owner } = req.user;
  const result = await Monument.create({
    ...req.body,
    url: url,
    owner,
  });

  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Monument.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, 'Monument not found');
  }
  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const result = await Monument.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, 'Monument not found');
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Monument.findByIdAndRemove(id);
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
  updateFavorite: ctrlWrapper(updateFavorite),
};
