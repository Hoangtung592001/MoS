import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RequestStatus } from "~/constants";
import { createPublisherAction, Publisher } from "../action-creators/publisherActionCreator";

interface InitialStateInterface {
    publishers: Array<Publisher>,
    createPublisherStatus: number;
}

const initialState: InitialStateInterface = {
    publishers: [],
    createPublisherStatus: RequestStatus.Nothing
};

export const publisherSlice = createSlice({
    name: 'publisher',
    initialState: initialState,
    reducers: {
        getAll: (state, action: PayloadAction<Array<Publisher>>) => {
            state.publishers = action.payload;
        },
        makeOriginal: (state) => {
            state.createPublisherStatus = RequestStatus.Nothing;
        },
    },
    extraReducers(builder) {
        builder.addCase(createPublisherAction.pending, (state) => {
            state.createPublisherStatus = RequestStatus.Pending;
        });

        builder.addCase(createPublisherAction.fulfilled, (state) => {
            state.createPublisherStatus = RequestStatus.Fulfilled;
        });

        builder.addCase(createPublisherAction.rejected, (state) => {
            state.createPublisherStatus = RequestStatus.Rejected;
        });
    },
});

export const { getAll, makeOriginal } = publisherSlice.actions;

export default publisherSlice.reducer;
