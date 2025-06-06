const mongoose = require('mongoose');

const borrowHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Reference of the borrower is required']
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: [true, 'Reference of the book borrowed is required']
    },
    issuedTimestamp: {
        type: Date
    },
    dueDate: {
        type: Date
    },
    returnTimestamp: {
        type: Date
    },
    status: {
        type: String,
        enum: ['BORROWED', 'RETURNED'],
        default: 'BORROWED'
    },
    overdueDuration: {
        type: Number,
        default: 0
    },
    isLate: {
        type: Boolean,
        default: false
    }
});

borrowHistorySchema.pre('save', async function(next) {
    const issuedTimestamp = this.issuedTimestamp || Date.now();
    this.dueDate = new Date(issuedTimestamp);
    this.dueDate.setDate(this.dueDate.getDate() + 7);
    // this.dueDate.setMinutes(this.dueDate.getMinutes() + 5);

    next();
});

const BorrowHistory = mongoose.model('BorrowHistory', borrowHistorySchema);

module.exports = BorrowHistory;