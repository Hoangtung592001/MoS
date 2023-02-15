import { combineReducers } from "redux";
import userReducer from "./userReducer";
import errorReducer from "./errorReducer";
import frequentlyViewedItemsReducer from "./frequentlyViewedItemsReducer";
import basketReducer from "./basketReducer";
import bookDetailsReducer from "./bookDetailsReducer";
export default combineReducers({
    user: userReducer,
    error: errorReducer,
    frequentlyViewedItemsReducer: frequentlyViewedItemsReducer,
    basketReducer: basketReducer,
    bookDetailsReducer: bookDetailsReducer,
});
