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
};

export const getBookDetailsRoute = (bookId: string) => {
    const route = routes.bookDetails;

    return route.replace(":bookId", bookId);
}

export default routes;
