import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RequestStatus } from "~/constants";
import { Author, createAuthorAction } from "../action-creators/authorActionCreator";

interface InitialStateInterface {
    authors: Array<Author>,
    createAuthorStatus: number;
}

const initialState: InitialStateInterface = {
    authors: [],
    createAuthorStatus: RequestStatus.Nothing
};

export const authorSlice = createSlice({
    name: 'author',
    initialState: initialState,
    reducers: {
        getAll: (state, action: PayloadAction<Array<Author>>) => {
            state.authors = action.payload;
        },
        makeOriginal: (state) => {
            state.createAuthorStatus = RequestStatus.Nothing;
        },
    },
    extraReducers(builder) {
        builder.addCase(createAuthorAction.pending, (state) => {
            state.createAuthorStatus = RequestStatus.Pending;
        });

        builder.addCase(createAuthorAction.fulfilled, (state) => {
            state.createAuthorStatus = RequestStatus.Fulfilled;
        });

        builder.addCase(createAuthorAction.rejected, (state) => {
            state.createAuthorStatus = RequestStatus.Rejected;
        });
    },
});

export const { getAll, makeOriginal } = authorSlice.actions;

export default authorSlice.reducer;
