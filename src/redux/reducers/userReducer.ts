import GLOBAL_TYPES from "../../constants/actions";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { signIn } from "../action-creators/userActionCreator";
import { Exception } from "~/commons/interfaces";
import { pushError } from "~/commons/commonUsedFunctions";

interface initialStateInterface {
    isLoading: boolean,
    token: {
        accessToken: string | null
    },
    errors: Array<Exception>
}

const initialState : initialStateInterface = {
    isLoading: false,
    token: {
        accessToken: null
    },
    errors: []
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers(builder) {
      builder
        .addCase(signIn.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(signIn.fulfilled, (state, action: PayloadAction<string>) => {
          state.isLoading = false;

          state.errors = [];
          
          state.token.accessToken = action.payload;
        })
        .addCase(signIn.rejected, (state, action: PayloadAction<any>) => {
            const payload = action.payload as Exception;
            state.errors = pushError(state.errors, payload);
        });
    },
});

export default userSlice.reducer;
