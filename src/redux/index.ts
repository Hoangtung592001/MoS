import { signIn, signUp, signOut } from './action-creators/userActionCreator';
import { removeErrorAction } from './action-creators/errorActionCreator';
import { getFrequentlyViewedItems } from './action-creators/frequentlyViewedItemsActionCreator';
import { addToBasket, getBasket, getBasketTotalItems } from './action-creators/basketActionCreator';
import { getBookDetails } from './action-creators/bookDetailsActionCreator';
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
};

export default actionCreators;