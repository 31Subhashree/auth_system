const User = require('../models/User');

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const updates = { ...req.body };
        if (req.file) updates.photo = req.file.path;
        const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.listPublicProfiles = async (req, res) => {
    try {
        const users = await User.find({ profileVisibility: 'public' });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.listAllProfiles = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
