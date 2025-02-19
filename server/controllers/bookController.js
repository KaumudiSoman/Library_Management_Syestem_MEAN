const Book = require('./../models/bookModel');

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({
            status: 'success',
            results: books.length,
            data: {
                books
            }
        });
    }
    catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.createBook = async (req, res) => {
    try {
        const newBook = await Book.create({
            title: req.body.title,
            description: req.body.description,
            author: req.body.author,
            quantity: req.body.quantity,
        });
        return res.status(200).json({
            status: 'success',
            data: {
                newBook
            }
        });
    }
    catch (err) {
        return res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.getBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if(!book) {
            res.status(404).json({
                status: 'fail',
                message: `Book with id ${req.params.id} not found`
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                book
            }
        });
    }
    catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

        if(!book) {
            res.status(404).json({
                status: 'fail',
                message: `Book with id ${req.params.id} not found`
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                book
            }
        });
    }
    catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);

        if(!book) {
            res.status(404).json({
                status: 'fail',
                message: `Book with id ${req.params.id} not found`
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Book record deleted successfully'
        });
    }
    catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.searchBooks = async (req, res) => {
    try {
        const { criteria, query } = req.body;
        
        let filter;
        if(criteria == 'author' || criteria == 'title' || criteria == 'genres') {
            filter = { [criteria]: { $regex: query, $options: 'i' } };
        }
        else if(criteria == 'ratings') {
            const rating = Number(query);
            console.log(rating);
            filter = { ratings: { $gte: rating } };
        }

        const books = await Book.find(filter);
        if(!books) {
            return res.send(404).json({
                status: 'fail',
                message: "Query doesn't match any results"
            });
        }

        return res.status(200).json({
            status: 'succsess',
            books
        });
    }
    catch (err) {
        return res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
}