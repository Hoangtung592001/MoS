import { createAsyncThunk } from "@reduxjs/toolkit";
import { BaseResponse } from "~/commons/response";
import { fetchAsync, fetchAsyncWithAuthentitaion, FETCH_TYPES } from "~/commons/sendRequest";
import { Book, Exception } from "~/constants/interfaces";
import { SERVICE_URL } from "~/constants/server";
import { get, getBasketTotal, makeOriginal } from '../reducers/basketReducer';

interface BasketItem {
    id: string;
    bookId: string;
    userId: string;
    book: Book;
}

export interface Basket {
    basketItems: Array<BasketItem>;
    orderTotal: number;
}

export interface AddToBasket {
    bookId: string;
    quantity: number;
    accessToken: string;
}

export const getBasket = (accessToken: string) => async (dispatch: any) => {
    const response = await fetchAsyncWithAuthentitaion<BaseResponse<Basket>>(
        SERVICE_URL.BASKET.GET,
        FETCH_TYPES.GET,
        accessToken,
    );

    if (response.data.success) {
        const data = response.data;

        dispatch(get(data.data));
    }
};

export const getBasketTotalItems = (accessToken: string) => async (dispatch: any) => {
    const response = await fetchAsyncWithAuthentitaion<BaseResponse<number>>(
        SERVICE_URL.BASKET.GET_TOTAL,
        FETCH_TYPES.GET,
        accessToken,
    );

    if (response.data.success) {
        const data = response.data;

        dispatch(getBasketTotal(data.data));
    }
};

export const addToBasket = createAsyncThunk('Basket/AddToBasket', async (props: AddToBasket, thunkApi) => {
    try {
        const response = await fetchAsyncWithAuthentitaion<any>(
            SERVICE_URL.BASKET.GET,
            FETCH_TYPES.POST,
            props.accessToken,
            {
                bookId: props.bookId,
                quantity: props.quantity,
            },
        );

        if (response.status == 200) {
            return thunkApi.fulfillWithValue(1);
        }
    } catch (e) {
        return thunkApi.rejectWithValue(1);
    }
});

export const resetBasket = () => (dispatch: any) => {
    dispatch(makeOriginal());
};