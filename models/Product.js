const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: 'Category'
    },
    title: {
        type: String,
    },
    price: {
        type: String
    },
    reviews: [{type: String}],
    images: [{type: String}]
});

module.exports = mongoose.model("Product", productSchema);