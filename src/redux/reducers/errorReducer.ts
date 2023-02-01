import GLOBAL_TYPES from "../../constants/actions";
import { ActionType, Exception } from "~/commons/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialStateInterface {
  errors: Array<Exception>
}

const initialState : InitialStateInterface = {
  errors: []
}

export const errorSlice = createSlice({
  name: 'error',
  initialState: initialState,
  reducers: {
    raiseError: (state, action: PayloadAction<Exception>) => {
      const errors = state.errors;
      const data = action.payload;
      const isErrorExisted = errors.find(exception => exception.id === data.id);

      if (!isErrorExisted) {
        errors.push(data);
      }

      return {
        ...state,
        errors: errors
      };
    },
    removeError: (state, action: PayloadAction<string>) => {
      const exceptionId = action.payload;
      const errors = state.errors.filter(exception => exception.id !== exceptionId);

      return {
        ...state,
        errors: errors
      };
    }
  }
})

export const { raiseError, removeError } = errorSlice.actions;

export default errorSlice.reducer;