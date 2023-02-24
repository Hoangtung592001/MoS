import { signIn, signUp, signOut } from './action-creators/userActionCreator';
import { removeErrorAction } from './action-creators/errorActionCreator';
import { getFrequentlyViewedItems } from './action-creators/frequentlyViewedItemsActionCreator';
import { addToBasket, getBasket, getBasketTotalItems } from './action-creators/basketActionCreator';
import { getBookDetails } from './action-creators/bookDetailsActionCreator';
import { getPaymentOptionTypeDescriptions } from './action-creators/paymentOptionTypeDescriptionActionCreator';
import { getPaymentOptions, resetPaymentOption, setPaymentOption } from './action-creators/paymenOptionsActionCreator';
import { getSavedAddress } from './action-creators/addressActionCreator';
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
};

export default actionCreators;