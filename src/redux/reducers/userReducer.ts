import GLOBAL_TYPES from "../../constants/actions";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Exception } from "~/commons/interfaces";
import { pushError } from "~/commons/commonUsedFunctions";
import { BaseResponse, ExceptionResponse } from "~/commons/response";
import { SignInData, SignInRequest } from "../actions/userAction";
import { SERVICE_URL } from "~/constants/server";
import { fetchAsync, FETCH_TYPES } from "~/commons/sendRequest";
import { GetExceptionUrl } from "~/commons/URLs";
import { signIn } from "../action-creators/userActionCreator";

interface initialStateInterface {
    isLoading: boolean,
    token: {
        accessToken: string | null
    },
    errors: Exception | null
}

const initialState : initialStateInterface = {
    isLoading: false,
    token: {
        accessToken: null
    },
    errors: null
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signOut(state) {
            state.isLoading = false;
            state.token.accessToken = null;
            state.errors = null;
        }
    },
    extraReducers(builder) {
        builder.addCase(signIn.pending, (state) => {
          state.isLoading = true;
        });
        
        builder.addCase(signIn.fulfilled, (state, action: PayloadAction<string>) => {
            state.isLoading = false;

            state.errors = null;
            
            state.token.accessToken = action.payload;
        });

        builder.addCase(signIn.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false;

            state.token.accessToken = null;

            state.errors = action.payload;
        })
    },
});

export const { signOut } = userSlice.actions;

export default userSlice.reducer;
