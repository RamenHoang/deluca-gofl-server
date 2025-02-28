const Option = require('../models/option.model');

exports.getAllOptions = async (req, res) => {
    try {
        const options = await Option.find();
        res.status(200).json(options);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getOptionById = async (req, res) => {
    try {
        const option = await Option.findById(req.params.id);
        if (!option) return res.status(404).json({ message: 'Option not found' });
        res.status(200).json(option);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createOption = async (req, res) => {
    try {
        const newOption = new Option(req.body);
        await newOption.save();
        res.status(201).json(newOption);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateOption = async (req, res) => {
    try {
        const updatedOption = await Option.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOption) return res.status(404).json({ message: 'Option not found' });
        res.status(200).json(updatedOption);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteOption = async (req, res) => {
    try {
        const deletedOption = await Option.findByIdAndDelete(req.params.id);
        if (!deletedOption) return res.status(404).json({ message: 'Option not found' });
        res.status(200).json({ message: 'Option deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
