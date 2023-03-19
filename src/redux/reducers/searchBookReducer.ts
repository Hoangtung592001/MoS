import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book, WholeBook } from '../action-creators/searchBookActionCreator';

interface InitialStateInterface {
    books: Array<Book>;
    wholeBooks: Array<WholeBook>;
}

const initialState: InitialStateInterface = {
    books: [],
    wholeBooks: [],
};

export const searchBookSlice = createSlice({
    name: 'searchBook',
    initialState: initialState,
    reducers: {
        get: (state, action: PayloadAction<Array<Book>>) => {
            state.books = action.payload;
        },
        getWhole: (state, action: PayloadAction<Array<WholeBook>>) => {
            state.wholeBooks = action.payload;
        },
    },
});

export const { get, getWhole } = searchBookSlice.actions;

export default searchBookSlice.reducer;
