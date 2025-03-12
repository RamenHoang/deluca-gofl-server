const ColorSchema = require('../models/color.model');

const getAll = async (req, res) => {
  try {
    const colors = await ColorSchema.find().exec();
    res.status(200).json(colors);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving colors', ...error });
  }
}

const getById = async (req, res) => {
  try {
    const color = await ColorSchema.findById(req.params.id);
    if (!color) {
      return res.status(404).json({ message: 'Color not found' });
    }
    res.status(200).json(color);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving color', ...error });
  }
}

const create = async (req, res) => {
  try {
    const color = new ColorSchema(req.body);
    await color.save();
    res.status(201).json({ message: 'SUCCESS', ...color._doc });
  } catch (error) {
    res.status(500).json({ message: 'Error creating color', ...error });
  }
}

const deleteById = async (req, res) => {
  try {
    const color = await ColorSchema.findByIdAndDelete(req.params.id);
    if (!color) {
      return res.status(404).json({ message: 'Color not found' });
    }
    res.status(200).json({ message: 'SUCCESS', ...color });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting color', ...error });
  }
}

const updateById = async (req, res) => {
  try {
    const color = await ColorSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!color) {
      return res.status(404).json({ message: 'Color not found' });
    }
    res.status(200).json({ message: 'SUCCESS', ...color._doc });
  } catch (error) {
    res.status(500).json({ message: 'Error updating color', ...error });
  }
}

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  updateById
};
