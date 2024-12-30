const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const initializeCrons = require('./crons/initializerCron');

const bookRouter = require('./routes/bookRoutes');
const userRouter = require('./routes/userRoutes');
const borrowHistoryRouter = require('./routes/borrowHistoryRoutes');
const wishlistRouter = require('./routes/wishlistRoutes');
const ratingRouter = require('./routes/ratingRoutes');
const reviewRouter = require('./routes/reviewRoutes');

const app = express();

// app.set('view engine', 'ejs');
// app.set('views', path.resolve('./views'));

app.use(cors({origin: 'http://localhost:4200', credentials: true}));
app.options('*', cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static('public'));

app.use(cookieParser());

// app.get('/', authController.protect, (req, res) => {
//     res.render('home', {
//         loggedInUser: req.user
//     });
// });

initializeCrons();

app.use('/api/books', bookRouter);
app.use('/api/users', userRouter);
app.use('/api/mybooks', borrowHistoryRouter);
app.use('/api/wishlist', wishlistRouter);
app.use('/api/rate', ratingRouter);
app.use('/api/reviews', reviewRouter);
// app.post('/api/send_email', emailController.sendEmail);

app.all('*', (req, res) => {
    res.status(404).json({
        status: 'fail',
        message: 'path not found'
    });
    // return res.render('pageNotFound');
});

module.exports = app;