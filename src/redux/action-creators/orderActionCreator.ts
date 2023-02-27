import { createAsyncThunk } from '@reduxjs/toolkit';
import { BaseResponse } from '~/commons/response';
import { fetchAsyncWithAuthentitaion, FETCH_TYPES } from '~/commons/sendRequest';
import { SERVICE_URL } from '~/constants/server';
import { get, makeOriginal } from '../reducers/orderReducer';

export type SetOrderReq = {
    basketItemIDs: Array<string>;
    addressId: string;
    paymentOptionId: string;
    accessToken: string;
};

export type OrderStatus = {
    id: number;
    name: string;
};

export type Publisher = {
    id: string;
    name: string;
};

export type Author = {
    id: string;
    name: string;
};

export type BookImage = {
    id: string;
    url: string;
};

export type BookCondition = {
    id: string;
    name: string;
};

export type Book = {
    id: string;
    title: string;
    authorId: string;
    author: Author;
    publisherId: string;
    publisher: Publisher;
    bookConditionId: number;
    bookCondition: BookCondition;
    price: number;
    edition: number;
    bookImage: BookImage;
};

export type BasketItem = {
    id: string;
    bookId: string;
    userId: string;
    quantity: number;
    book: Book;
};

export type OrderDetail = {
    id: string;
    orderId: string;
    basketItemId: string;
    originalPrice: number;
    finalPrice: number;
    basketItem: BasketItem;
};

export type Order = {
    id: string;
    userId: string;
    orderStatusId: number;
    addressId: string;
    shippingFee: number;
    orderStatus: OrderStatus;
    createdAt: Date;
    orderDetails: Array<OrderDetail>;
};

export const getOrders = (accessToken: string) => async (dispatch: any) => {
    const response = await fetchAsyncWithAuthentitaion<BaseResponse<Array<Order>>>(
        SERVICE_URL.ORDERS.GET,
        FETCH_TYPES.GET,
        accessToken,
    );

    if (response.data.success) {
        const data = response.data;

        dispatch(get(data.data));
    }
};

export const setOrder = createAsyncThunk('Order/Set', async (props: SetOrderReq, thunkApi) => {
    const { accessToken, ...orderInfo } = props;
    try {
        const response = await fetchAsyncWithAuthentitaion<BaseResponse<string>>(
            SERVICE_URL.ORDERS.GET,
            FETCH_TYPES.POST,
            accessToken,
            orderInfo,
        );

        if (response.data.success) {
            const data = response.data;
            if (data.data) {
                return thunkApi.fulfillWithValue(data.data);
            } else {
                return thunkApi.rejectWithValue(false);
            }
        } else {
            return thunkApi.rejectWithValue(false);
        }
    } catch (e) {
        return thunkApi.rejectWithValue(false);
    }
});

export const resetOrder = () => (dispatch: any) => {
    dispatch(makeOriginal());
};
