const Reviews = require('./../models/reviewModel');
const User = require('./../models/userModel');
const Rating = require('./../models/rateModel');

exports.getReviews = async(req, res) => {
    try {
        const reviews = await Reviews.find({bookId: req.params.id});

        const finalReviews = []

        for(const review of reviews) {
            const user = await User.findById(review.userId);
            const rating = await Rating.findOne({userId: review.userId, bookId: review.bookId});

            finalReviews.push({
                ...review._doc,
                username: user?.username || 'Unknown User',
                rating: rating?.rating || null,
            })            
        }

        return res.status(200).json({
            status: 'success',
            reviews: finalReviews
        });
    }
    catch (err) {
        return res.status(500).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.createReview = async(req, res) => {
    try {
        const newReview = await Reviews.findOneAndUpdate(
            {userId: req.user.id, bookId: req.params.id},
            {review: req.body.review},
            {upsert: true, new: true}
        );

        return res.status(201).json({
            status:'success',
            newReview
        });
    }
    catch (err) {
        return res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
}