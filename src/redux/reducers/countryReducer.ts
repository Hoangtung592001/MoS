import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductItem } from '~/constants/interfaces';
import { Basket } from '../action-creators/basketActionCreator';
import { BookDetails } from '../action-creators/bookDetailsActionCreator';

export type Country = {
    id: number;
    phoneCode: number;
    countryCode: string;
    countryName: string;
};

interface InitialStateInterface {
    countries: Array<Country>;
}

const initialState: InitialStateInterface = {
    countries: [],
};

export const countrySlice = createSlice({
    name: 'country',
    initialState: initialState,
    reducers: {
        get: (state, action: PayloadAction<Array<Country>>) => {
            state.countries = action.payload;
        },
    },
});

export const { get } = countrySlice.actions;

export default countrySlice.reducer;
