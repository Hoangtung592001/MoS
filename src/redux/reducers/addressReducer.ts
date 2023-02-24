import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus } from '~/constants';
import { Address } from '~/constants/interfaces';

interface InitialStateInterface {
    savedAddresses: Array<Address>;
    status: number;
    newAddressId: string;
}

const initialState: InitialStateInterface = {
    savedAddresses: [],
    status: RequestStatus.Nothing,
    newAddressId: '',
};

export const addressSlice = createSlice({
    name: 'address',
    initialState: initialState,
    reducers: {
        get: (state, action: PayloadAction<Array<Address>>) => {
            state.savedAddresses = action.payload;
        },
    },
});

export const { get } = addressSlice.actions;

export default addressSlice.reducer;
