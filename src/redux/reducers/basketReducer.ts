import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RequestStatus } from '~/constants';
import { Exception, ProductItem } from '~/constants/interfaces';
import {
    addToBasket,
    Basket,
    changeItemQuantityAction,
    removeItemFromBasket,
} from '../action-creators/basketActionCreator';

interface InitialStateInterface {
    basket: Basket;
    basketTotal: number;
    status: number;
    removeItemStatus: number;
    changeItemQuantityStatus: number;
    changeItemQuantityError: Exception | null;
    addToBasketError: Exception | null;
}

const initialState: InitialStateInterface = {
    status: RequestStatus.Nothing,
    removeItemStatus: RequestStatus.Nothing,
    changeItemQuantityStatus: RequestStatus.Nothing,
    basket: {
        basketItems: [],
        orderTotal: 0,
    },
    basketTotal: 0,
    changeItemQuantityError: null,
    addToBasketError: null,
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
            state.removeItemStatus = RequestStatus.Nothing;
            state.changeItemQuantityStatus = RequestStatus.Nothing;
            state.changeItemQuantityError = null;
            state.addToBasketError = null;
        },
    },
    extraReducers(builder) {
        builder.addCase(addToBasket.pending, (state) => {
            state.status = RequestStatus.Pending;
        });

        builder.addCase(addToBasket.fulfilled, (state) => {
            state.status = RequestStatus.Fulfilled;
            state.addToBasketError = null;
        });

        builder.addCase(addToBasket.rejected, (state, action: PayloadAction<any>) => {
            state.status = RequestStatus.Rejected;
            state.addToBasketError = action.payload;
        });

        builder.addCase(removeItemFromBasket.pending, (state) => {
            state.removeItemStatus = RequestStatus.Pending;
        });

        builder.addCase(removeItemFromBasket.fulfilled, (state) => {
            state.removeItemStatus = RequestStatus.Fulfilled;
        });

        builder.addCase(removeItemFromBasket.rejected, (state) => {
            state.removeItemStatus = RequestStatus.Rejected;
        });

        builder.addCase(changeItemQuantityAction.pending, (state) => {
            state.changeItemQuantityStatus = RequestStatus.Pending;
        });

        builder.addCase(changeItemQuantityAction.fulfilled, (state) => {
            state.changeItemQuantityStatus = RequestStatus.Fulfilled;
        });

        builder.addCase(changeItemQuantityAction.rejected, (state, action: PayloadAction<any>) => {
            state.changeItemQuantityStatus = RequestStatus.Rejected
            state.changeItemQuantityError = action.payload;
        });
    },
});

export const { get, getBasketTotal, makeOriginal } = basketSlice.actions;

export default basketSlice.reducer;