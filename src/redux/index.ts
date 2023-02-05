import { signIn, signUp, signOut } from './action-creators/userActionCreator';
import { removeErrorAction } from './action-creators/errorActionCreator';
import { getFrequentlyViewedItems } from './action-creators/frequentlyViewedItemsActionCreator';
const actionCreators = {
    removeErrorAction: removeErrorAction,
    signIn: signIn,
    signUp: signUp,
    signOut: signOut,
    getFrequentlyViewedItems: getFrequentlyViewedItems
};

export default actionCreators;