import { combineReducers } from "redux";
import userReducer from "./userReducer";
import errorReducer from "./errorReducer";
import frequentlyViewedItemsReducer from "./frequentlyViewedItemsReducer";
export default combineReducers({
    user: userReducer,
    error: errorReducer,
    frequentlyViewedItemsReducer: frequentlyViewedItemsReducer
});
