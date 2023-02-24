import { createAsyncThunk } from '@reduxjs/toolkit';
import { BaseResponse } from '~/commons/response';
import { fetchAsync, fetchAsyncWithAuthentitaion, FETCH_TYPES } from '~/commons/sendRequest';
import { Order, PaymentOption } from '~/constants/interfaces';
import { SERVICE_URL } from '~/constants/server';
import { get, makeOriginal } from '../reducers/paymenOptionsReducer';

export interface SetPaymentOptionReq {
    cardNumber: string;
    expirationDate: Date;
    nameOnCreditCard: string;
    paymentOptionTypeDescriptionId: number;
    accessToken: string;
}

export const getPaymentOptions = (accessToken: string) => async (dispatch: any) => {
    const response = await fetchAsyncWithAuthentitaion<BaseResponse<Array<PaymentOption>>>(
        SERVICE_URL.PAYMENT_OPTION.GET,
        FETCH_TYPES.GET,
        accessToken,
    );

    if (response.data.success) {
        const data = response.data;

        dispatch(get(data.data));
    }
};

export const resetPaymentOption = () => (dispatch: any) => {
    dispatch(makeOriginal());
};

export const setPaymentOption = createAsyncThunk('PaymentOptions/Set', async (props: SetPaymentOptionReq, thunkApi) => {
    const { accessToken, ...paymentInfo } = props;
    const response = await fetchAsyncWithAuthentitaion<BaseResponse<string>>(
        SERVICE_URL.PAYMENT_OPTION.GET,
        FETCH_TYPES.POST,
        accessToken,
        paymentInfo,
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
});
