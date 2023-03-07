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
        DELETE: 'https://localhost:5001/Basket/{basketItemId}',
    },
    ADDRESS: {
        GET: 'https://localhost:5001/Address',
        GET_BY_ID: 'https://localhost:5001/Address/{addressId}',
    },
    PAYMENT_OPTION_TYPE_DESCRIPTION: {
        GET: 'https://localhost:5001/Payment/PaymentOptionTypeDescription',
    },
    PAYMENT_OPTION: {
        GET: 'https://localhost:5001/Payment/PaymentOption',
        GET_BY_ID: 'https://localhost:5001/Payment/PaymentOption/{paymentOptionId}',
    },
    COUNTRY: {
        GET: 'https://localhost:5001/Country',
    },
    SHIPPING: {
        GET: 'https://localhost:5001/Shipping/{addressId}',
    },
    SEARCH_BOOK: {
        GET: 'https://localhost:5001/Search?limit=5',
        GET_WHOLE: 'https://localhost:5001/Search/Whole?limit=100',
    },
};