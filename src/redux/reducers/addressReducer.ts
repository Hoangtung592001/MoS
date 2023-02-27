import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus } from '~/constants';
import { Address } from '~/constants/interfaces';
import { setAddress } from '../action-creators/addressActionCreator';
interface InitialStateInterface {
    savedAddresses: Array<Address>;
    status: number;
    newAddressId: string;
    currentAddress: Address | null;
}

const initialState: InitialStateInterface = {
    savedAddresses: [],
    status: RequestStatus.Nothing,
    newAddressId: '',
    currentAddress: null,
};

export const addressSlice = createSlice({
    name: 'address',
    initialState: initialState,
    reducers: {
        get: (state, action: PayloadAction<Array<Address>>) => {
            state.savedAddresses = action.payload;
        },
        getById: (state, action: PayloadAction<Address>) => {
            state.currentAddress = action.payload;
        },
        makeOriginal: (state) => {
            state.status = RequestStatus.Nothing;
        },
    },
    extraReducers(builder) {
        builder.addCase(setAddress.pending, (state) => {
            state.status = RequestStatus.Pending;
        });

        builder.addCase(setAddress.fulfilled, (state, action: PayloadAction<string>) => {
            state.status = RequestStatus.Fulfilled;
            state.newAddressId = action.payload;
        });

        builder.addCase(setAddress.rejected, (state) => {
            state.status = RequestStatus.Rejected;
        });
    },
});

export const { get, getById, makeOriginal } = addressSlice.actions;

export default addressSlice.reducer;
