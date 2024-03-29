import { SignInRequest, SignUpRequest, SignInData } from "../actions/userAction";
import { BaseResponse, ExceptionResponse } from "~/commons/response";
import { SERVICE_URL } from "~/constants/server";
import { fetchAsyncWithAuthentitaion, FetchAsyncWithAuthentitaion, FETCH_TYPES } from "~/commons/sendRequest";
import { fetchAsync } from "~/commons/sendRequest";
import { GetExceptionUrl } from "~/commons/URLs";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkAdmin, makeOriginal, signOut as signOutAction } from '../reducers/userReducer';
import { Exception } from '~/constants/interfaces';
import { accessTokenKey } from '~/constants';
import Cookies from 'universal-cookie';

export type SignUpProps = {
    username: string;
    password: string;
};

export type SignUpResponse = {};

export const signIn = createAsyncThunk('User/SignIn', async (props: SignInRequest, thunkApi) => {
    try {
        const response = await fetchAsync<BaseResponse<SignInData> | ExceptionResponse>(
            SERVICE_URL.USER.SIGN_IN,
            FETCH_TYPES.POST,
            props,
        );
        if (response.data.success) {
            const data = response.data as BaseResponse<SignInData>;
            const cookies = new Cookies();
            cookies.set(accessTokenKey, data.data.token);
    
            return thunkApi.fulfillWithValue(data.data.token);
        } else {
            const data = response.data as ExceptionResponse;
    
            const exceptionResponse = await fetchAsync<BaseResponse<Exception>>(
                GetExceptionUrl(data.exceptionId),
                FETCH_TYPES.GET,
            );
    
            return thunkApi.rejectWithValue(exceptionResponse.data.data);
        }
    }
    catch(e : any) {
        const exception : Exception = {
            description: e.message
        }
        return thunkApi.rejectWithValue(exception);
    }
});

export const signOut = () => (dispatch: any) => {
    const cookies = new Cookies();
    cookies.remove(accessTokenKey);

    dispatch(signOutAction());
};

export const signUp = createAsyncThunk('User/SignUp', async (props: SignUpProps, thunkApi) => {
    try {
        const response = await fetchAsync<BaseResponse<SignUpResponse> | ExceptionResponse>(
            SERVICE_URL.USER.SIGN_UP,
            FETCH_TYPES.POST,
            props,
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
    } 
    catch(e : any) {
        const exception : Exception = {
            description: e.message
        }
        return thunkApi.rejectWithValue(exception);
    }
});

export const resetUserAction = () => (dispatch: any) => {
    dispatch(makeOriginal());
};

export const checkAdminAction = (accessToken: string) => async (dispatch: any) => {
    const response = await fetchAsyncWithAuthentitaion<BaseResponse<boolean>>(
        SERVICE_URL.USER.CHECK_ADMIN,
        FETCH_TYPES.GET,
        accessToken
    );

    if (response.data.success) {
        dispatch(checkAdmin(response.data.data));
    }
}