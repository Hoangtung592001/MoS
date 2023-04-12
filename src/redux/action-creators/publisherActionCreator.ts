import { createAsyncThunk } from "@reduxjs/toolkit";
import { BaseResponse } from "~/commons/response";
import { fetchAsyncWithAuthentitaion, FETCH_TYPES } from "~/commons/sendRequest";
import { SERVICE_URL } from "~/constants/server";
import { getAll, makeOriginal } from "../reducers/publisherReducer";

export type CreatePublisherReq = {
    accessToken: string;
    name: string;
}

export type Publisher = {
    id: string;
    name: string;
}


export const createPublisherAction = createAsyncThunk('Publisher/Create', async (props: CreatePublisherReq, thunkApi) => {
    const { accessToken, ...publisherInfo } = props;
    
    try {
        await fetchAsyncWithAuthentitaion(
            SERVICE_URL.PUBLISHER.CREATE,
            FETCH_TYPES.POST,
            accessToken,
            publisherInfo
        );

        thunkApi.fulfillWithValue(true)
    } catch (e) {
        return thunkApi.rejectWithValue(false);
    }
});

export const getPublishers = (accessToken: string) => async (dispatch: any) => {
    try {
        const response = await fetchAsyncWithAuthentitaion<BaseResponse<Array<Publisher>>>(
            SERVICE_URL.PUBLISHER.GET,
            FETCH_TYPES.GET,
            accessToken
        );

        if (response.data.success) {
            dispatch(getAll(response.data.data));
        }
    } catch (e) {
    }
};

export const resetPublisher = () => (dispatch: any) => {
    dispatch(makeOriginal());
};
