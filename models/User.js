const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photo: { type: String },
    name: { type: String },
    bio: { type: String },
    phone: { type: String },
    profileVisibility: { type: String, enum: ['public', 'private'], default: 'public' },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    oauth: { type: String, enum: ['google', 'facebook', 'twitter', 'github'], default: null }
});

// Password hashing middleware
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
