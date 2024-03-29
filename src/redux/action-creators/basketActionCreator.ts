import { createAsyncThunk } from "@reduxjs/toolkit";
import { BaseResponse, ExceptionResponse } from "~/commons/response";
import { fetchAsync, fetchAsyncWithAuthentitaion, FETCH_TYPES } from "~/commons/sendRequest";
import { GetExceptionUrl, getDeleteBasketItemUrl } from '~/commons/URLs';
import { Book, Exception } from '~/constants/interfaces';
import { SERVICE_URL } from '~/constants/server';
import { get, getBasketTotal, makeOriginal } from '../reducers/basketReducer';

interface BasketItem {
    id: string;
    bookId: string;
    userId: string;
    book: Book;
    isQuantityValid?: boolean;
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

export type RemoveItem = {
    basketItemId: string;
    accessToken: string;
};

export type ChangeItemQuantity = {
    itemId: string;
    quantity: number;
    accessToken: string;
};

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
        const response = await fetchAsyncWithAuthentitaion<BaseResponse<any> | ExceptionResponse>(
            SERVICE_URL.BASKET.GET,
            FETCH_TYPES.POST,
            props.accessToken,
            {
                bookId: props.bookId,
                quantity: props.quantity,
            },
        );

        if (response.data.success) {
            return thunkApi.fulfillWithValue(1);
        }
        else {
            // const data = response.data as ExceptionResponse;

            // const exceptionResponse = await fetchAsync<BaseResponse<Exception>>(
            //     GetExceptionUrl(data.exceptionId),
            //     FETCH_TYPES.GET,
            // );

            // return thunkApi.rejectWithValue(exceptionResponse.data.data);
        }
    } catch (e) {
        return thunkApi.rejectWithValue(1);
    }
});

export const resetBasket = () => (dispatch: any) => {
    dispatch(makeOriginal());
};

export const removeItemFromBasket = createAsyncThunk('Basket/RemoveItem', async (props: RemoveItem, thunkApi) => {
    try {
        const { accessToken, basketItemId } = props;
        const response = await fetchAsyncWithAuthentitaion<any>(
            getDeleteBasketItemUrl(basketItemId),
            FETCH_TYPES.DELETE,
            accessToken,
        );

        if (response.status == 200) {
            return thunkApi.fulfillWithValue(1);
        }
    } catch (e) {
        return thunkApi.rejectWithValue(1);
    }
});

export const changeItemQuantityAction = createAsyncThunk(
    'Basket/ChangeQuantity',
    async (props: ChangeItemQuantity, thunkApi) => {
        try {
            const { accessToken, ...changeItemQuantityProps } = props;
            const response = await fetchAsyncWithAuthentitaion<any>(
                SERVICE_URL.BASKET.GET,
                FETCH_TYPES.PUT,
                accessToken,
                changeItemQuantityProps,
            );

            if (response.data.success) {
                return thunkApi.fulfillWithValue(1);
            } else {
                const data = response.data as ExceptionResponse;

                const exceptionResponse = await fetchAsync<BaseResponse<Exception>>(
                    GetExceptionUrl(data.exceptionId),
                    FETCH_TYPES.GET,
                );

                return thunkApi.rejectWithValue(exceptionResponse.data.data);
            }
        } catch (e) { }
    },
);