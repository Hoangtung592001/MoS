import GLOBAL_TYPES from "../../constants/actions";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { BaseResponse, ExceptionResponse } from "~/commons/response";
import { SignInData, SignInRequest } from "../actions/userAction";
import { SERVICE_URL } from "~/constants/server";
import { fetchAsync, FETCH_TYPES } from "~/commons/sendRequest";
import { GetExceptionUrl } from "~/commons/URLs";
import { signIn, signUp } from '../action-creators/userActionCreator';
import { Exception } from '~/constants/interfaces';
import { RequestStatus } from '~/constants';

interface initialStateInterface {
    isLoading: boolean;
    token: {
        accessToken: string | null;
    };
    errors: Exception | null;
    signUpError: Exception | null;
    signUpStatus: number;
    isAdmin: boolean;
    signInRequestStatus: number;
}

const initialState: initialStateInterface = {
    isLoading: false,
    token: {
        accessToken: null,
    },
    errors: null,
    signUpError: null,
    signUpStatus: RequestStatus.Nothing,
    isAdmin: false,
    signInRequestStatus: RequestStatus.Nothing
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signOut(state) {
            state.isLoading = false;
            state.token.accessToken = null;
            state.errors = null;
        },
        makeOriginal(state) {
            state.signUpError = null;
            state.signUpStatus = RequestStatus.Nothing;
            state.signInRequestStatus = RequestStatus.Nothing;
            state.errors = null;
        },
        checkAdmin(state, action: PayloadAction<boolean>) {
            state.isAdmin = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(signIn.pending, (state) => {
            state.isLoading = true;
            state.signInRequestStatus = RequestStatus.Pending;
        });

        builder.addCase(signIn.fulfilled, (state, action: PayloadAction<any>) => {
            state.isLoading = false;

            state.errors = null;

            state.token.accessToken = action.payload;

            state.signInRequestStatus = RequestStatus.Fulfilled;
        });

        builder.addCase(signIn.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false;

            state.token.accessToken = null;

            state.errors = action.payload;

            state.signInRequestStatus = RequestStatus.Rejected;
        });

        builder.addCase(signUp.pending, (state) => {
            state.signUpStatus = RequestStatus.Pending;
        });

        builder.addCase(signUp.fulfilled, (state, action: PayloadAction<any>) => {
            state.signUpStatus = RequestStatus.Fulfilled;
            state.signUpError = null;
        });

        builder.addCase(signUp.rejected, (state, action: PayloadAction<any>) => {
            state.signUpStatus = RequestStatus.Rejected;
            state.signUpError = action.payload;
        });
    },
});

export const { signOut, makeOriginal, checkAdmin } = userSlice.actions;

export default userSlice.reducer;
