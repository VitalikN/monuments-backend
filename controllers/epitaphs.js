const { HttpError, ctrlWrapper } = require('../helpers');
const { Epitaph } = require('../models/epitaphs');

const addEpitaphs = async (req, res) => {
  const result = await Epitaph.create({
    ...req.body,
  });
  res.status(201).json(result);
};

const getAllEpitaphs = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const total = await Epitaph.countDocuments();
  const result = await Epitaph.find({}, '-createdAt -updatedAt', {
    skip,
    limit,
  }).sort({ epitaphNumber: 1 });

  res.json({ total, data: result });
};

const updateEpitaphById = async (req, res) => {
  const { monumentId } = req.params;

  const epitaph = await Epitaph.findById(monumentId);
  if (!epitaph) {
    throw HttpError(404, 'Epitaph not found');
  }

  const updatedEpitaph = await Epitaph.findByIdAndUpdate(
    monumentId,
    { ...req.body },
    {
      new: true,
    }
  );
  res.status(200).json(updatedEpitaph);
};

const deleteById = async (req, res) => {
  const { monumentId } = req.params;
  const result = await Epitaph.findByIdAndRemove(monumentId);
  if (!result) {
    throw HttpError(404, 'epitaph not found');
  }
  res.json({
    message: 'Delete success',
  });
};

module.exports = {
  addEpitaphs: ctrlWrapper(addEpitaphs),
  getAllEpitaphs: ctrlWrapper(getAllEpitaphs),
  deleteById: ctrlWrapper(deleteById),
  updateEpitaphById: ctrlWrapper(updateEpitaphById),
};
