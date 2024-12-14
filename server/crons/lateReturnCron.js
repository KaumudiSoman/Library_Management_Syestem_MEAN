const cron = require('node-cron');
const emailController = require('./../controllers/emailController');
const BorrowedBooks = require('./../models/borrowHistoryModel');
const User = require('./../models/userModel');
const Book = require('./../models/bookModel');

const lateReturn = () => {
    cron.schedule('0 0 * * *', async () => {
        try {
            console.log('checking')
            const today = new Date();
            const lateBooks = await BorrowedBooks.find({
                dueDate: { $lt: today},
                status: 'BORROWED'
            }).populate('userId').populate('bookId');

            lateBooks.forEach(async (book) => {
                const user = book.userId;
                const theBook = book.bookId;
                emailController.sendEmail(user.email, 'Overdue Book Notice', 
                    `Dear ${user.username},\n\nThe book "${theBook.title}" is overdue. You are charged with late fee Rs. 100/-\n\nThank you!`)
            })
        }
        catch (err) {
            throw new Error(err);
        }
    })
}

module.exports = lateReturn;