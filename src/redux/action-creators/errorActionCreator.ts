import GLOBAL_TYPES from "~/constants/actions";
import { Action } from '../actions/errorAction';
import { Dispatch } from "redux"
import { removeError } from "../reducers/errorReducer";

export const removeErrorAction = (exceptionId: string) => async (dispatch: any) => {
  dispatch(removeError(exceptionId));
};

// export const 