import { signIn, signUp, signOut, resetUserAction, checkAdminAction } from './action-creators/userActionCreator';
import { removeErrorAction } from './action-creators/errorActionCreator';
import { getFrequentlyViewedItems } from './action-creators/frequentlyViewedItemsActionCreator';
import {
    addToBasket,
    changeItemQuantityAction,
    getBasket,
    getBasketTotalItems,
    removeItemFromBasket,
    resetBasket,
} from './action-creators/basketActionCreator';
import { GetAll, createBook, editBook, getAllBookConditionsAction, getBookDetails, getRecentlyViewedItemsAction, getTrendingItemsAction, removeBook, resetBookDetails } from './action-creators/bookDetailsActionCreator';
import { getPaymentOptionTypeDescriptions } from './action-creators/paymentOptionTypeDescriptionActionCreator';
import {
    getPaymentOptions,
    resetPaymentOption,
    setPaymentOption,
    getPaymentOptionById,
} from './action-creators/paymenOptionsActionCreator';
import { getAddressById, getSavedAddress, resetAddress, setAddress } from './action-creators/addressActionCreator';
import { getCountries } from './action-creators/countryActionCreator';
import { getShippingFee } from './action-creators/shippingActionCreator';
import { getOrders, resetOrder, setOrder } from './action-creators/orderActionCreator';
import { searchBook, searchWholeBook } from './action-creators/searchBookActionCreator';
import { createAuthorAction, getAuthors, resetAuthor } from './action-creators/authorActionCreator';
import { createPublisherAction, getPublishers, resetPublisher } from './action-creators/publisherActionCreator';

const actionCreators = {
    removeErrorAction: removeErrorAction,
    signIn: signIn,
    signUp: signUp,
    signOut: signOut,
    getFrequentlyViewedItems: getFrequentlyViewedItems,
    getBasket: getBasket,
    getBookDetails: getBookDetails,
    addToBasket: addToBasket,
    getBasketTotalItems: getBasketTotalItems,
    getPaymentOptionTypeDescriptions: getPaymentOptionTypeDescriptions,
    getSavedAddress: getSavedAddress,
    getPaymentOptions: getPaymentOptions,
    setPaymentOption: setPaymentOption,
    resetPaymentOption: resetPaymentOption,
    getAddressById: getAddressById,
    getPaymentOptionById: getPaymentOptionById,
    getCountries: getCountries,
    setAddress: setAddress,
    resetAddress: resetAddress,
    getShippingFee: getShippingFee,
    setOrder: setOrder,
    resetOrder: resetOrder,
    getOrders: getOrders,
    resetBasket: resetBasket,
    searchBook: searchBook,
    removeItemFromBasket: removeItemFromBasket,
    changeItemQuantityAction: changeItemQuantityAction,
    searchWholeBook: searchWholeBook,
    resetUserAction: resetUserAction,
    GetAllBooks: GetAll,
    removeBook: removeBook,
    resetBookDetails: resetBookDetails,
    checkAdminAction: checkAdminAction,
    createAuthorAction: createAuthorAction,
    getAuthors: getAuthors,
    createPublisherAction: createPublisherAction,
    getPublishers: getPublishers,
    resetAuthor: resetAuthor,
    resetPublisher: resetPublisher,
    createBook: createBook,
    getAllBookConditionsAction: getAllBookConditionsAction,
    editBook: editBook,
    getRecentlyViewedItems: getRecentlyViewedItemsAction,
    getTrendingItems: getTrendingItemsAction
};

export default actionCreators;
