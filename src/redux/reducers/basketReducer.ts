import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Exception, ProductItem } from "~/constants/interfaces";
import { addToBasket, Basket } from "../action-creators/basketActionCreator";

interface InitialStateInterface {
    basket: Basket;
    isLoading: boolean;
    basketTotal: number;
    haveError: boolean;
}

const initialState : InitialStateInterface = {
  isLoading: false,
  basket: {
    basketItems: [],
    orderTotal: 0
  },
  basketTotal: 0,
  haveError: false
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState: initialState,
  reducers: {
    get: (state, action: PayloadAction<Basket>) => {
        state.basket = action.payload;
    },
    getBasketTotal: (state, action: PayloadAction<number>) => {
      state.basketTotal = action.payload;
    }
  },
  extraReducers(builder) {
    builder.addCase(addToBasket.pending, (state) => {
      state.isLoading = true;
      state.haveError = false;
    });
    
    builder.addCase(addToBasket.fulfilled, (state) => {
      state.isLoading = false;
      state.haveError = false;
    })

    builder.addCase(addToBasket.rejected, (state) => {
      state.haveError = true;
      state.isLoading = false;
    })
  }
})

export const { get, getBasketTotal } = basketSlice.actions;

export default basketSlice.reducer;