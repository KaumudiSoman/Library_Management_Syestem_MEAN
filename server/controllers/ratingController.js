const mongoose = require('mongoose');
const Rating = require('./../models/rateModel');
const Book = require('./../models/bookModel');

exports.createRating = async(req, res) => {
    try {
        const newRating = await Rating.create({
            bookId: req.body.bookId,
            rating: req.body.rating,
            userId: req.user.id
        });

        const book = await Book.findById(req.body.bookId);
        
        
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