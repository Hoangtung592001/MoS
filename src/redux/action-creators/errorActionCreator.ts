import { removeError } from "../reducers/errorReducer";

export const removeErrorAction = (exceptionId: string) => async (dispatch: any) => {
  dispatch(removeError(exceptionId));
};