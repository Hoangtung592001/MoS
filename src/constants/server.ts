export const SERVICE_URL = {
    USER: {
        SIGN_UP: 'https://localhost:5001/User/SignUp',
        SIGN_IN: 'https://localhost:5001/User/SignIn',
        CHECK_ADMIN: 'https://localhost:5001/User/CheckAdmin',
    },
    EXCEPTION: {
        GET: 'https://localhost:5001/Exception/{ExceptionId}',
    },
    BOOKS: {
        FREQUENTLY_VIEW_ITEMS: 'https://localhost:5001/Book/FrequentlyViewedItems',
        RECOMMENDED_ITEMS: 'https://localhost:5001/Book/RecommendedItems',
        RECENTLY_VIEWED_ITEMS: 'https://localhost:5001/Book/RecentlyViewedItemsPost',
        GET_BOOK_DETAILS: 'https://localhost:5001/Book/GetBookDetails/{BookId}',
        GET_ALL: 'https://localhost:5001/Book/GetAll',
        REMOVE: 'https://localhost:5001/Book/DeleteBook/{BookId}',
        CREATE: 'https://localhost:5001/Book/CreateBook',
        GET_BOOK_CONDITIONS: 'https://localhost:5001/Book/GetAllBookCondition',
        EDIT: 'https://localhost:5001/Book/EditBook',
        POST_RECENTLY_VIEWED_ITEMS: 'https://localhost:5001/Book/RecentlyViewedItem',
        TRENDING_ITEMS: 'https://localhost:5001/Book/TrendingItems?limit=5',
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
    UPLOAD: {
        UPLOAD_IMAGE: 'https://localhost:5001/Upload/UploadFile',
        GET_IMAGE_AFTER_UPLOADED: 'https://localhost:5001/Upload/'
    },
    AUTHOR: {
        CREATE: 'https://localhost:5001/Author/CreateNewAuthor',
        GET: 'https://localhost:5001/Author/GetAll',
    },
    PUBLISHER: {
        CREATE: 'https://localhost:5001/Publisher',
        GET: 'https://localhost:5001/Publisher/GetAll',
    },
};