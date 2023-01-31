import GLOBAL_TYPES from "~/constants/actions";
import { Action } from '../actions/errorAction';
import { Dispatch } from "redux"

export const removeError = (exceptionId: string) => async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: GLOBAL_TYPES.REMOVE_ERROR,
      payload: exceptionId
    });
  };