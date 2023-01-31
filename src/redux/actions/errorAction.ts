import GLOBAL_TYPES from "../../constants/actions";
import { Exception } from "~/commons/interfaces";

interface RaiseErrorAction {
  type: GLOBAL_TYPES.RAISE_ERROR,
  payload: Exception
}

interface RemoveErrorAction {
  type: GLOBAL_TYPES.REMOVE_ERROR,
  payload: string
}

export type Action = RaiseErrorAction | RemoveErrorAction;
