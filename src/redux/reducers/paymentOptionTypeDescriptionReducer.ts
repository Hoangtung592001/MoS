import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaymentOptionTypeDescription } from '~/constants/interfaces';

interface InitialStateInterface {
    paymentOptionTypeDescriptions: Array<PaymentOptionTypeDescription>;
}

const initialState: InitialStateInterface = {
    paymentOptionTypeDescriptions: [],
};

export const paymentOptionTypeDescriptionSlice = createSlice({
    name: 'paymentOptionTypeDescription',
    initialState: initialState,
    reducers: {
        get: (state, action: PayloadAction<Array<PaymentOptionTypeDescription>>) => {
            state.paymentOptionTypeDescriptions = action.payload;
        },
    },
});

export const { get } = paymentOptionTypeDescriptionSlice.actions;

export default paymentOptionTypeDescriptionSlice.reducer;
