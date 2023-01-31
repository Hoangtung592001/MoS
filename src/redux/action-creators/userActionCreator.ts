import { Dispatch } from "redux"
import GLOBAL_TYPES from "~/constants/actions";
import { Action } from "../actions/userAction";
import { SignInRequest, SignUpRequest, SignInData } from "../actions/userAction";
import { BaseResponse, ExceptionResponse } from "~/commons/response";
import { SERVICE_URL } from "~/constants/server";
import { FETCH_TYPES } from "~/commons/sendRequest";
import { fetchAsync } from "~/commons/sendRequest";
import { Exception } from "~/commons/interfaces";
import { GetExceptionUrl } from "~/commons/URLs";

export const signIn = (props: SignInRequest) => {
    return async (dispatch: Dispatch<Action>) => {
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
            const exception = exceptionResponse.data as BaseResponse<Exception>;
    
            dispatch({
                type: GLOBAL_TYPES.RAISE_ERROR,
                payload: exception.data
            });
        }
    } 
}

export const signUp = (props: SignUpRequest) => async (dispatch: Dispatch<Action>) => {
    const response = await fetchAsync(SERVICE_URL.USER.SIGN_UP, FETCH_TYPES.POST, "", props);

    if (response.status !== 200) {
        const data: ExceptionResponse = response.data;
        const exceptionResponse = await fetchAsync(GetExceptionUrl(data.exceptionId), FETCH_TYPES.GET);
        const exception = exceptionResponse.data as BaseResponse<Exception>;
    
        dispatch({
            type: GLOBAL_TYPES.RAISE_ERROR,
            payload: exception.data
        });
    }
}