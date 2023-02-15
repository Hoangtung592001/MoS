import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductItem } from "~/constants/interfaces";
import { Basket } from "../action-creators/basketActionCreator";
import { BookDetails } from "../action-creators/bookDetailsActionCreator";

interface InitialStateInterface {
    bookDetails: BookDetails | null;
}

const initialState : InitialStateInterface = {
    bookDetails: null
}

export const bookDetailsSlice = createSlice({
  name: 'bookDetails',
  initialState: initialState,
  reducers: {
    get: (state, action: PayloadAction<BookDetails>) => {
        state.bookDetails = action.payload;
    }
  }
})

export const { get } = bookDetailsSlice.actions;

export default bookDetailsSlice.reducer;