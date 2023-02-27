import { createAsyncThunk } from '@reduxjs/toolkit';
import { BaseResponse } from '~/commons/response';
import { fetchAsyncWithAuthentitaion, FETCH_TYPES } from '~/commons/sendRequest';
import { GetAddressByIdUrl } from '~/commons/URLs';
import { Address } from '~/constants/interfaces';
import { SERVICE_URL } from '~/constants/server';
import { get, getById, makeOriginal } from '../reducers/addressReducer';

export type SetAddressReq = {
    fullName: string;
    addressLine: string;
    telephone: string;
    longitude: number;
    latitude: number;
    distance: number;
    countryId: number;
    accessToken: string;
};
export const getSavedAddress = (accessToken: string) => async (dispatch: any) => {
    const response = await fetchAsyncWithAuthentitaion<BaseResponse<Array<Address>>>(
        SERVICE_URL.ADDRESS.GET,
        FETCH_TYPES.GET,
        accessToken,
    );

    if (response.data.success) {
        const data = response.data;

        dispatch(get(data.data));
    }
};

export const getAddressById = (accessToken: string, addressId: string) => async (dispatch: any) => {
    const response = await fetchAsyncWithAuthentitaion<BaseResponse<Address>>(
        GetAddressByIdUrl(addressId),
        FETCH_TYPES.GET,
        accessToken,
    );

    if (response.data.success) {
        const data = response.data;

        dispatch(getById(data.data));
    }
};

export const setAddress = createAsyncThunk('Address/Set', async (props: SetAddressReq, thunkApi) => {
    const { accessToken, ...address } = props;
    const response = await fetchAsyncWithAuthentitaion<BaseResponse<string>>(
        SERVICE_URL.ADDRESS.GET,
        FETCH_TYPES.POST,
        accessToken,
        address,
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

export const resetAddress = () => (dispatch: any) => {
    dispatch(makeOriginal());
};
