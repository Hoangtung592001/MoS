import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RequestStatus } from '~/constants';
import { Exception, ProductItem } from '~/constants/interfaces';
import { addToBasket, Basket } from '../action-creators/basketActionCreator';

interface InitialStateInterface {
    basket: Basket;
    basketTotal: number;
    status: number;
}

const initialState: InitialStateInterface = {
    status: RequestStatus.Nothing,
    basket: {
        basketItems: [],
        orderTotal: 0,
    },
    basketTotal: 0,
};

export const basketSlice = createSlice({
    name: 'basket',
    initialState: initialState,
    reducers: {
        get: (state, action: PayloadAction<Basket>) => {
            state.basket = action.payload;
        },
        getBasketTotal: (state, action: PayloadAction<number>) => {
            state.basketTotal = action.payload;
        },
        makeOriginal: (state) => {
            state.status = RequestStatus.Nothing;
        },
    },
    extraReducers(builder) {
        builder.addCase(addToBasket.pending, (state) => {
            state.status = RequestStatus.Pending;
        });

        builder.addCase(addToBasket.fulfilled, (state) => {
            state.status = RequestStatus.Fulfilled;
        });

        builder.addCase(addToBasket.rejected, (state) => {
            state.status = RequestStatus.Rejected;
        });
    },
});

export const { get, getBasketTotal, makeOriginal } = basketSlice.actions;

export default basketSlice.reducer;