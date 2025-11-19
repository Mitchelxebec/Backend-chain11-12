const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    status: {
        type: String,
        enum: ['approved', 'pending', 'suspended'],
        default: 'pending'
    }
});

module.exports = mongoose.model('Category', categorySchema);