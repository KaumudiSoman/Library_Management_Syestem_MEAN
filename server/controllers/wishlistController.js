const Wishlist = require('./../models/wishlistModel');

exports.getWishlist = async(req, res) => {
    try {
        const wishlist = await Wishlist.find({ userId: req.user.id });

        if(!wishlist || wishlist.length === 0) {
            return res.status(404).json({
                status: 'fail',
                message: 'User has not wishlisted any books'
            });
        }

        return res.status(200).json({
            status: 'success',
            wishlist
        });
    }
    catch (err) {
        return res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
}

exports.createWishlistRecord = async (req, res) => {
    try {
        const newBook = await Wishlist.create({
            bookId: req.body.bookId,
            userId: req.user.id
        });

        return res.status(201).json({
            status: 'success',
            newBook
        });
    }
    catch (err) {
        return res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
}

exports.deleteWishlistRecord = async (req, res) => {
    try {
        const book = await Wishlist.findByIdAndDelete(req.params.id);

        if(!book) {
            return res.status(404).json({
                status: 'fail',
                message: 'Book not found'
            });
        }

        return res.status(200).json({
            status: 'success',
            message: 'Wishlist record deleted successfully'
        });
    }
    catch (err) {
        return res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
}