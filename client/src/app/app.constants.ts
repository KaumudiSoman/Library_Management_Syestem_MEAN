export const APIResources = {
    baseUrl: 'http://3.109.2.11:3000/api',
    users: '/users',
    
    login: '/login',
    signup: '/signup',
    logout: '/logout',
    verification: '/verification',
    forgotPassword: '/forgot-password',
    resetPassword: '/reset-password',

    books: '/books',
    search: '/search',
    // getAndCreateBooks: '/',

    mybooks: '/mybooks',
    borrow: '/borrow',
    return: '/return',

    wishlist: '/wishlist',

    avgRating: 'avg-rating',
    rate: '/rate',

    reviews: '/reviews',

    payment: '/payment',
    membership: '/membership',
    lateFee: '/late-fee',
    order: '/order',
    status: 'status',

    q: '?q=',
    projection: '&projection=lite',
    maxResults: '&maxResults=40'
}