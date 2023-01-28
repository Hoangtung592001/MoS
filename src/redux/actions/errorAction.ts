import GLOBAL_TYPES from "../../constants/actions";
import { Exception } from "~/commons/interfaces";

export const removeError = (exception: Exception) => async (dispatch: any) => {
  dispatch({
    type: GLOBAL_TYPES.REMOVE_ERROR,
    payload: exception
  });
};
