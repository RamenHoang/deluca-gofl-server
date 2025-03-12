const SizeSchema = require('../models/size.model');

const getAll = async (req, res) => {
  try {
    const sizes = await SizeSchema.find().exec();
    res.status(200).json(sizes);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving sizes', ...error });
  }
}

const getById = async (req, res) => {
  try {
    const size = await SizeSchema.findById(req.params.id);
    if (!size) {
      return res.status(404).json({ message: 'size not found' });
    }
    res.status(200).json(size);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving size', ...error });
  }
}

const create = async (req, res) => {
  try {
    const size = new SizeSchema(req.body);
    await size.save();
    res.status(201).json({ message: 'SUCCESS', ...size._doc });
  } catch (error) {
    res.status(500).json({ message: 'Error creating size', ...error });
  }
}

const deleteById = async (req, res) => {
  try {
    const size = await SizeSchema.findByIdAndDelete(req.params.id);
    if (!size) {
      return res.status(404).json({ message: 'size not found' });
    }
    res.status(200).json({ message: 'SUCCESS', ...size });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting size', ...error });
  }
}

const updateById = async (req, res) => {
  try {
    const size = await SizeSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!size) {
      return res.status(404).json({ message: 'size not found' });
    }
    res.status(200).json({ message: 'SUCCESS', ...size._doc });
  } catch (error) {
    res.status(500).json({ message: 'Error updating size', ...error });
  }
}

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  updateById
};
