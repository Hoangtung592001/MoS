import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order, ProductItem } from "~/constants/interfaces";

interface InitialStateInterface {
    items: Order
}

const initialState : InitialStateInterface = {
    items: []
}

export const ordersSlice = createSlice({
  name: 'order',
  initialState: initialState,
  reducers: {
    get: (state, action: PayloadAction<Order>) => {
        state.items = action.payload;
    }
  }
})

export const { get } = ordersSlice.actions;

export default ordersSlice.reducer;