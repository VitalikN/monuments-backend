const { HttpError, ctrlWrapper } = require('../helpers');
const { Monument } = require('../models/monument');

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
  const total = await Monument.countDocuments(query);
  const result = await Monument.find(query, '-createdAt -updatedAt', {
    skip,
    limit,
  })
    .populate('owner', 'name email')
    .sort({ price: 1 });

  res.json({ total, data: result });
};

const getById = async (req, res) => {
  const { monumentId } = req.params;
  const result = await Monument.findById(monumentId);
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
  const { monumentId } = req.params;

  const monument = await Monument.findById(monumentId);
  if (!monument) {
    throw HttpError(404, 'Monument not found');
  }
  let newUrl;
  if (req.files['url']) {
    newUrl = req.files['url'][0].path;
  }
  const updatedProduct = await Monument.findByIdAndUpdate(
    monumentId,
    {
      ...req.body,
      url: newUrl || monument.url,
    },
    {
      new: true,
    }
  );
  res.status(200).json(updatedProduct);
};

const updateFavorite = async (req, res) => {
  const { monumentId } = req.params;
  const result = await Monument.findByIdAndUpdate(monumentId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, 'Monument not found');
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { monumentId } = req.params;
  const result = await Monument.findByIdAndRemove(monumentId);
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
