import { SignInRequest, SignUpRequest, SignInData } from "../actions/userAction";
import { BaseResponse, ExceptionResponse } from "~/commons/response";
import { SERVICE_URL } from "~/constants/server";
import { FETCH_TYPES } from "~/commons/sendRequest";
import { fetchAsync } from "~/commons/sendRequest";
import { GetExceptionUrl } from "~/commons/URLs";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { signOut as signOutAction } from "../reducers/userReducer";
import { Exception } from "~/constants/interfaces";
import { accessTokenKey } from "~/constants";
import Cookies from 'universal-cookie';

export const signIn = createAsyncThunk(
    "User/SignIn",
    async (props: SignInRequest, thunkApi) => {
        const response = await fetchAsync<BaseResponse<SignInData> | ExceptionResponse>(SERVICE_URL.USER.SIGN_IN, FETCH_TYPES.POST, props);
        if (response.data.success) {
            const data = response.data as BaseResponse<SignInData>;
            const cookies = new Cookies();
            cookies.set(accessTokenKey, data.data.token);

            return thunkApi.fulfillWithValue(data.data.token);
        }
        else {
            const data = response.data as ExceptionResponse;

            const exceptionResponse = await fetchAsync<BaseResponse<Exception>>(GetExceptionUrl(data.exceptionId), FETCH_TYPES.GET);
            
            return thunkApi.rejectWithValue(exceptionResponse.data.data);
        }
    }
);

export const signOut = () => (dispatch: any) => {
    const cookies = new Cookies();
    cookies.remove(accessTokenKey);

    dispatch(signOutAction());
}

export const signUp = (props: SignUpRequest) => async (dispatch: any) => {
    const response = await fetchAsync(SERVICE_URL.USER.SIGN_UP, FETCH_TYPES.POST, props);

    // if (response.status !== 200) {
    //     const data: ExceptionResponse = response.data;
    //     const exceptionResponse = await fetchAsync(GetExceptionUrl(data.exceptionId), FETCH_TYPES.GET);
    //     const exception = exceptionResponse.data as BaseResponse<Exception>;
    
    //     dispatch({
    //         type: GLOBAL_TYPES.RAISE_ERROR,
    //         payload: exception.data
    //     });
    // }
}