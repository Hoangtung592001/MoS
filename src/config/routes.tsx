const routes = {
    home: '/',
    signin: '/signin',
    signup: '/signup',
    basket: '/basket',
    bookDetails: '/BookDetails/:bookId',
    myAccount: '/MyAccount',
    security: '/Security',
    changeEmail: '/Security/ChangeEmail',
    changeName: '/Security/ChangeName',
    changePassword: '/Security/ChangePassword',
    shippingAddress: '/ShippingAddress',
    googleMap: '/GoogleMap',
    paymentOptions: '/PaymentOptions',
    reviewOrder: '/ReviewOrder',
    myPurchases: '/MyPurchases',
    congratulations: '/Congratulations',
    search: '/search/:title',
    books: '/books',
    addNewBook: '/addNewBook',
    addNewPublisher: '/addNewPublisher',
    addNewAuthor: '/addNewAuthor',
    bookList: '/bookList',
    editBook: '/editBook/:bookId',
    all: '*'
};

export const getBookDetailsRoute = (bookId: string) => {
    const route = routes.bookDetails;

    return route.replace(":bookId", bookId);
}

export const getEditBookRoute = (bookId: string) => {
    const route = routes.editBook;

    return route.replace(":bookId", bookId);
}

export default routes;
