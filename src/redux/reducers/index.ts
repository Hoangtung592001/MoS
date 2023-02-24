import { combineReducers } from "redux";
import userReducer from "./userReducer";
import errorReducer from "./errorReducer";
import frequentlyViewedItemsReducer from "./frequentlyViewedItemsReducer";
import basketReducer from "./basketReducer";
import bookDetailsReducer from "./bookDetailsReducer";
import paymentOptionTypeDescriptionReducer from './paymentOptionTypeDescriptionReducer';
import paymenOptionsReducer from './paymenOptionsReducer';
import addressReducer from './addressReducer';
export default combineReducers({
    user: userReducer,
    error: errorReducer,
    frequentlyViewedItemsReducer: frequentlyViewedItemsReducer,
    basketReducer: basketReducer,
    bookDetailsReducer: bookDetailsReducer,
    paymentOptionTypeDescriptionReducer: paymentOptionTypeDescriptionReducer,
    paymenOptionsReducer: paymenOptionsReducer,
    addressReducer: addressReducer,
});
