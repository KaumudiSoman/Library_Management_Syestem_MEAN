const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: [true, 'Book is required']
    },
    review: {
        type: String,
        required: [true, 'Review is required']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

reviewSchema.index({ userId: 1, bookId: 1 }, { unique: true });

const Reviews = mongoose.model('Reviews', reviewSchema);

module.exports = Reviews;