import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus } from '~/constants';
import { PaymentOption, PaymentOptionTypeDescription } from '~/constants/interfaces';
import { setPaymentOption } from '../action-creators/paymenOptionsActionCreator';

interface InitialStateInterface {
    paymentOptions: Array<PaymentOption>;
    status: number;
    newPaymentOptionId: string;
}

const initialState: InitialStateInterface = {
    paymentOptions: [],
    status: RequestStatus.Nothing,
    newPaymentOptionId: '',
};

export const paymentOptionsSlice = createSlice({
    name: 'paymentOptions',
    initialState: initialState,
    reducers: {
        get: (state, action: PayloadAction<Array<PaymentOption>>) => {
            state.paymentOptions = action.payload;
        },
        makeOriginal: (state) => {
            state.status = RequestStatus.Nothing;
        },
    },
    extraReducers(builder) {
        builder.addCase(setPaymentOption.pending, (state) => {
            state.status = RequestStatus.Pending;
        });

        builder.addCase(setPaymentOption.fulfilled, (state, action: PayloadAction<string>) => {
            state.status = RequestStatus.Fulfilled;
            state.newPaymentOptionId = action.payload;
        });

        builder.addCase(setPaymentOption.rejected, (state, action: PayloadAction<any>) => {
            state.status = RequestStatus.Rejected;
        });
    },
});

export const { get, makeOriginal } = paymentOptionsSlice.actions;

export default paymentOptionsSlice.reducer;
