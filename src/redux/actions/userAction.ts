import GLOBAL_TYPES from "../../constants/actions";
import { SERVICE_URL } from "../../constants/server";
import { fetchAsync, FETCH_TYPES } from "~/commons/sendRequest";
import { BaseResponse, ExceptionResponse } from "~/commons/response";
import { GetExceptionUrl } from "~/commons/URLs";
import { Exception } from "~/commons/interfaces";

export interface SignInRequest {
    username: string;
    password: string;
}

export interface SignUpRequest {
    username: string;
    password: string;
}

export interface SignInData {
    token: string;
}

export const signIn = (props: SignInRequest) => async (dispatch: any) => {
    const response = await fetchAsync(SERVICE_URL.USER.SIGN_IN, FETCH_TYPES.POST, "", props);

    if (response.status == 200) {
        const data: BaseResponse<SignInData> = response.data;

        dispatch({
            type: GLOBAL_TYPES.SIGN_IN,
            payload: data.data.token
        });
    }
    else {
        const data: ExceptionResponse = response.data;
        const exceptionResponse = await fetchAsync(GetExceptionUrl(data.exceptionId), FETCH_TYPES.GET);
        const exception = exceptionResponse.data as Exception;

        dispatch({
            type: GLOBAL_TYPES.RAISE_ERROR,
            payload: exception
        });
    }
}

export const signUp = (props: SignUpRequest) => async (dispatch: any) => {
    const response = await fetchAsync(SERVICE_URL.USER.SIGN_IN, FETCH_TYPES.POST, "", props);

    if (response.status == 200) {
        const data: BaseResponse<SignInData> = response.data;

        dispatch({
            type: GLOBAL_TYPES.SIGN_IN,
            payload: data.data.token
        });
    }
    else {
        const data: ExceptionResponse = response.data;
        const exceptionResponse = await fetchAsync(GetExceptionUrl(data.exceptionId), FETCH_TYPES.GET);
        const exception = exceptionResponse.data as Exception;

        dispatch({
            type: GLOBAL_TYPES.RAISE_ERROR,
            payload: exception
        });
    }
}