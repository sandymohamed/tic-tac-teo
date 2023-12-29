const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  rating: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
},
}, { timestamps: true });

const ReviewModel = mongoose.model('Review', ReviewSchema);

module.exports = ReviewModel;
