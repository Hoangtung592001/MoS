import { signIn, signUp, signOut } from './action-creators/userActionCreator';
import { removeErrorAction } from './action-creators/errorActionCreator';
import { getFrequentlyViewedItems } from './action-creators/frequentlyViewedItemsActionCreator';
import { addToBasket, getBasket, getBasketTotalItems } from './action-creators/basketActionCreator';
import { getBookDetails } from './action-creators/bookDetailsActionCreator';
const actionCreators = {
    removeErrorAction: removeErrorAction,
    signIn: signIn,
    signUp: signUp,
    signOut: signOut,
    getFrequentlyViewedItems: getFrequentlyViewedItems,
    getBasket: getBasket,
    getBookDetails: getBookDetails,
    addToBasket: addToBasket,
    getBasketTotalItems: getBasketTotalItems
};

export default actionCreators;