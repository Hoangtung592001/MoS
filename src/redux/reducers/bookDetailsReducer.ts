import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RequestStatus } from "~/constants";
import { BookCondition, BookDetails, createBook, editBook, RecentlyViewItem, removeBook } from "../action-creators/bookDetailsActionCreator";

interface InitialStateInterface {
    bookDetails: BookDetails | null;
    books: Array<BookDetails>;
    removeBookStatus: number;
    bookConditions: Array<BookCondition>;
    createBookStatus: number;
    editBookStatus: number;
    recentlyViewedItems: Array<RecentlyViewItem>,
    trendingItems: Array<RecentlyViewItem>
}

const initialState : InitialStateInterface = {
    bookDetails: null,
    books: [],
    removeBookStatus: RequestStatus.Nothing,
    bookConditions: [],
    createBookStatus: RequestStatus.Nothing,
    editBookStatus: RequestStatus.Nothing,
    recentlyViewedItems: [],
    trendingItems: []
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
      state.createBookStatus = RequestStatus.Nothing;
      state.editBookStatus = RequestStatus.Nothing;
      state.recentlyViewedItems = [];
      state.books = [];
    },
    getAllBookConditions: (state, action: PayloadAction<Array<BookCondition>>) => {
      state.bookConditions = action.payload
    },
    getRecentlyViewedItems: (state, action: PayloadAction<Array<RecentlyViewItem>>) => {
      state.recentlyViewedItems = action.payload
    },
    getTrendingItems: (state, action: PayloadAction<Array<RecentlyViewItem>>) => {
      state.trendingItems = action.payload
    }
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

    builder.addCase(createBook.pending, (state) => {
      state.createBookStatus = RequestStatus.Pending
    });

    builder.addCase(createBook.fulfilled, (state) => {
      state.createBookStatus = RequestStatus.Fulfilled
    });

    builder.addCase(createBook.rejected, (state) => {
      state.createBookStatus = RequestStatus.Rejected
    });

    builder.addCase(editBook.pending, (state) => {
      state.editBookStatus = RequestStatus.Pending
    });

    builder.addCase(editBook.fulfilled, (state) => {
      state.editBookStatus = RequestStatus.Fulfilled
    });

    builder.addCase(editBook.rejected, (state) => {
      state.editBookStatus = RequestStatus.Rejected
    });
},
})

export const { get, getAll, makeOriginal, getAllBookConditions, getRecentlyViewedItems, getTrendingItems } = bookDetailsSlice.actions;

export default bookDetailsSlice.reducer;