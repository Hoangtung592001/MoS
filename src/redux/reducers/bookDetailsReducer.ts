import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RequestStatus } from "~/constants";
import { ProductItem } from "~/constants/interfaces";
import { Basket } from "../action-creators/basketActionCreator";
import { BookDetails, removeBook } from "../action-creators/bookDetailsActionCreator";

interface InitialStateInterface {
    bookDetails: BookDetails | null;
    books: Array<BookDetails>;
    removeBookStatus: number;

}

const initialState : InitialStateInterface = {
    bookDetails: null,
    books: [],
    removeBookStatus: RequestStatus.Nothing
}

export const bookDetailsSlice = createSlice({
  name: 'bookDetails',
  initialState: initialState,
  reducers: {
    get: (state, action: PayloadAction<BookDetails>) => {
        state.bookDetails = action.payload;
    },
    getAll: (state, action: PayloadAction<Array<BookDetails>>) => {
      state.books = action.payload;
    },
    makeOriginal: (state) => {
      state.removeBookStatus = RequestStatus.Nothing;
  },
  },
  extraReducers(builder) {
    builder.addCase(removeBook.pending, (state) => {
      state.removeBookStatus = RequestStatus.Pending
    });

    builder.addCase(removeBook.fulfilled, (state) => {
      state.removeBookStatus = RequestStatus.Fulfilled
    });

    builder.addCase(removeBook.rejected, (state) => {
      state.removeBookStatus = RequestStatus.Rejected
    });
},
})

export const { get, getAll, makeOriginal } = bookDetailsSlice.actions;

export default bookDetailsSlice.reducer;