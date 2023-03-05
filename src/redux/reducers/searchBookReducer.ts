import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../action-creators/searchBookActionCreator';

interface InitialStateInterface {
    books: Array<Book>;
}

const initialState: InitialStateInterface = {
    books: [],
};

export const searchBookSlice = createSlice({
    name: 'searchBook',
    initialState: initialState,
    reducers: {
        get: (state, action: PayloadAction<Array<Book>>) => {
            state.books = action.payload;
        },
    },
});

export const { get } = searchBookSlice.actions;

export default searchBookSlice.reducer;
