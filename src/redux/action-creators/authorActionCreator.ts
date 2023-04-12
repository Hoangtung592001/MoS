import { createAsyncThunk } from "@reduxjs/toolkit";
import { BaseResponse } from "~/commons/response";
import { fetchAsyncWithAuthentitaion, FETCH_TYPES } from "~/commons/sendRequest";
import { SERVICE_URL } from "~/constants/server";
import { getAll, makeOriginal } from "../reducers/authorReducer";

export type CreateAuthorReq = {
    accessToken: string;
    name: string;
}

export type Author = {
    id: string;
    name: string;
}

export const createAuthorAction = createAsyncThunk('Author/Create', async (props: CreateAuthorReq, thunkApi) => {
    const { accessToken, ...authorInfo } = props;
    
    try {
        await fetchAsyncWithAuthentitaion(
            SERVICE_URL.AUTHOR.CREATE,
            FETCH_TYPES.POST,
            accessToken,
            authorInfo
        );

        thunkApi.fulfillWithValue(true)
    } catch (e) {
        return thunkApi.rejectWithValue(false);
    }
});

export const getAuthors = (accessToken: string) => async (dispatch: any) => {
    try {
        const response = await fetchAsyncWithAuthentitaion<BaseResponse<Array<Author>>>(
            SERVICE_URL.AUTHOR.GET,
            FETCH_TYPES.GET,
            accessToken
        );

        if (response.data.success) {
            dispatch(getAll(response.data.data));
        }
    } catch (e) {

    }
};

export const resetAuthor = () => (dispatch: any) => {
    dispatch(makeOriginal());
};

