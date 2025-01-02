const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, 
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    role: {
        type: String, 
        enum: ['admin', 'doctor', 'patient', 'receptionist'], 
        required: true
    },
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    phone: {
        type: String, 
        required: true
    },
    address: {
        type: String, 
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'deleted'],
        default: 'active',
    },
    profilePicture: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updateAt: {
        type: Date,
        default: Date.now,
    },

})
// compound index
UserSchema.index({ username: 1, email: 1, role: 1 });

module.exports = mongoose.model("User", UserSchema);
