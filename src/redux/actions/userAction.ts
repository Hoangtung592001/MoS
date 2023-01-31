import GLOBAL_TYPES from "../../constants/actions";
import { Action as ErrorAction } from './errorAction';
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

interface SignInAction {
    type: GLOBAL_TYPES.SIGN_IN,
    payload: string;
}

export type Action = SignInAction | ErrorAction;