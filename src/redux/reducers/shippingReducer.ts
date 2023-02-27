import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus } from '~/constants';
import { setOrder } from '../action-creators/orderActionCreator';

interface InitialStateInterface {
    shippingFee: number;
}

const initialState: InitialStateInterface = {
    shippingFee: 0,
};

export const shippingSlice = createSlice({
    name: 'shipping',
    initialState: initialState,
    reducers: {
        get: (state, action: PayloadAction<number>) => {
            state.shippingFee = action.payload;
        },
    },
});

export const { get } = shippingSlice.actions;

export default shippingSlice.reducer;
