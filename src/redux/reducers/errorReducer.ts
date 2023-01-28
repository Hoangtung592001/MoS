import GLOBAL_TYPES from "../../constants/actions";
import { ActionType, Exception } from "~/commons/interfaces";

const initialState: Array<Exception>  = [];

export default function errorReducer(state = initialState, action: ActionType) {
  switch (action.type) {
    case GLOBAL_TYPES.RAISE_ERROR:
      const data = action.payload as Exception;
      const isErrorExisted = initialState.find(exception => exception.id === data.id);

      if (isErrorExisted) {
        return initialState;
      }

      initialState.push(data);
      return initialState;
    case GLOBAL_TYPES.REMOVE_ERROR:
      const exceptionId = action.payload as string;
      return initialState.filter(exception => exception.id !== exceptionId);
    default:
      return state;
  }
}
