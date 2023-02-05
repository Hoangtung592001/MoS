import { ActionType, Exception } from "~/commons/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductItem } from "~/constants/interfaces";

interface InitialStateInterface {
    items: Array<ProductItem>
}

const initialState : InitialStateInterface = {
    items: []
}

export const frequentlyViewedItemsSlice = createSlice({
  name: 'error',
  initialState: initialState,
  reducers: {
    get: (state, action: PayloadAction<Array<ProductItem>>) => {
        state.items = action.payload;
    }
  }
})

export const { get } = frequentlyViewedItemsSlice.actions;

export default frequentlyViewedItemsSlice.reducer;