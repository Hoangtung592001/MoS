import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RequestStatus } from '~/constants';
import { Order, setOrder } from '../action-creators/orderActionCreator';

interface InitialStateInterface {
    items: Array<Order>;
    status: number;
    newOrderId: string;
}

const initialState: InitialStateInterface = {
    items: [],
    status: RequestStatus.Nothing,
    newOrderId: '',
};

export const ordersSlice = createSlice({
    name: 'order',
    initialState: initialState,
    reducers: {
        get: (state, action: PayloadAction<Array<Order>>) => {
            state.items = action.payload;
        },
        makeOriginal: (state) => {
            state.status = RequestStatus.Nothing;
        },
    },
    extraReducers(builder) {
        builder.addCase(setOrder.pending, (state) => {
            state.status = RequestStatus.Pending;
        });

        builder.addCase(setOrder.fulfilled, (state, action: PayloadAction<string>) => {
            state.status = RequestStatus.Fulfilled;
            state.newOrderId = action.payload;
        });

        builder.addCase(setOrder.rejected, (state, action: PayloadAction<any>) => {
            state.status = RequestStatus.Rejected;
        });
    },
});

export const { get, makeOriginal } = ordersSlice.actions;

export default ordersSlice.reducer;