const OptionValue = require('../models/option_value.model');

exports.getAllOptionValues = async (req, res) => {
    try {
        const optionValues = await OptionValue.find({}).populate('option').exec();
        res.status(200).json(optionValues);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getOptionValueById = async (req, res) => {
    try {
        const optionValue = await OptionValue.findById(req.params.id);
        if (!optionValue) return res.status(404).json({ message: 'OptionValue not found' });
        res.status(200).json(optionValue);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createOptionValue = async (req, res) => {
    try {
        const newOptionValue = new OptionValue(req.body);
        await newOptionValue.save();
        res.status(201).json(newOptionValue);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateOptionValue = async (req, res) => {
    try {
        const updatedOptionValue = await OptionValue.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOptionValue) return res.status(404).json({ message: 'OptionValue not found' });
        res.status(200).json(updatedOptionValue);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteOptionValue = async (req, res) => {
    try {
        const deletedOptionValue = await OptionValue.findByIdAndDelete(req.params.id);
        if (!deletedOptionValue) return res.status(404).json({ message: 'OptionValue not found' });
        res.status(200).json({ message: 'OptionValue deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
