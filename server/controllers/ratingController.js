const mongoose = require('mongoose');
const Rating = require('./../models/rateModel');
const Book = require('./../models/bookModel');

exports.createRating = async(req, res) => {
    try {
        const newRating = await Rating.findOneAndUpdate(
            {userId: req.user.id, bookId: req.params.id},
            {rating: req.body.rating},
            {upsert: true, new: true}
        );

        const book = await Book.findById(req.params.id);
        
        book.ratings = Math.round(((book.ratings * book.totalRatings + newRating.rating) / (book.totalRatings + 1)) * 10) / 10;
        book.totalRatings += 1;

        await book.save();
        
        return res.status(201).json({
            status: 'success',
            message: 'Your rating is valued'
        })
    }
    catch (err) { 
        return res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
}