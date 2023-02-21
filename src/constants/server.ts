export const SERVICE_URL = {
    USER: {
        SIGN_UP: 'https://localhost:5001/User/SignUp',
        SIGN_IN: 'https://localhost:5001/User/SignIn',
    },
    EXCEPTION: {
        GET: 'https://localhost:5001/Exception/{ExceptionId}',
    },
    BOOKS: {
        FREQUENTLY_VIEW_ITEMS: 'https://localhost:5001/Book/FrequentlyViewedItems',
        RECOMMENDED_ITEMS: 'https://localhost:5001/Book/RecommendedItems',
        RECENTLY_VIEWED_ITEMS: 'https://localhost:5001/Book/RecentlyViewedItem',
        GET_BOOK_DETAILS: 'https://localhost:5001/Book/GetBookDetails/{BookId}',
    },
    ORDERS: {
        GET: 'https://localhost:5001/Order',
    },
    BASKET: {
        GET: 'https://localhost:5001/Basket',
        GET_TOTAL: 'https://localhost:5001/Basket/BasketTotal',
    },
    ADDRESS: {
        GET: 'https://localhost:5001/Address',
    },
};