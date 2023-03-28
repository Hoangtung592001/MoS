import { createAsyncThunk } from "@reduxjs/toolkit";
import { StringLiteral } from "typescript";
import { BaseResponse } from "~/commons/response";
import { fetchAsync, fetchAsyncWithAuthentitaion, FETCH_TYPES } from "~/commons/sendRequest";
import { GetBookDetailsUrl, removeBookUrl } from "~/commons/URLs";
import { Author, BookCondition, BookImage, Publisher } from "~/constants/interfaces";
import { SERVICE_URL } from "~/constants/server";
import { get, getAll, makeOriginal } from "../reducers/bookDetailsReducer";

export interface BookDetails {
    id: string;
    title: string;
    authorId: string;
    publisherId: string;
    startedToSellAt: Date;
    publishedAt: Date;
    createdAt: Date;
    bookConditionId: number;
    quantity: number;
    price: number;
    sellOfRate: number;
    edition: number;
    author: Author;
    publisher: Publisher;
    bookImages: Array<BookImage>;
    bookCondition: BookCondition;
    description: string;
    bookDetails: string;
}

export type RemoveBookReq = {
    accessToken: string;
    bookId: string;
}

export const getBookDetails = (accessToken: string, bookId: string) => async (dispatch: any) => {
    const response = await fetchAsync<BaseResponse<BookDetails>>
                            (
                                GetBookDetailsUrl(bookId),
                                FETCH_TYPES.GET
                            );

    if (response.data.success) {
        const data = response.data;

        dispatch(get(data.data));
    }
}

export const GetAll = () => async (dispatch: any) => {
    const response = await fetchAsync<BaseResponse<Array<BookDetails>>>
                            (
                                SERVICE_URL.BOOKS.GET_ALL,
                                FETCH_TYPES.GET
                            );

    if (response.data.success) {
        const data = response.data;

        dispatch(getAll(data.data));
    }
}

export const removeBook = createAsyncThunk('Book/Remove', async (props: RemoveBookReq, thunkApi) => {
    const { accessToken, bookId } = props;
    
    try {
        await fetchAsyncWithAuthentitaion(
            removeBookUrl(bookId),
            FETCH_TYPES.DELETE,
            accessToken,
        );

        thunkApi.fulfillWithValue(true)
    } catch (e) {
        return thunkApi.rejectWithValue(false);
    }
});

export const resetBookDetails = () => (dispatch: any) => {
    dispatch(makeOriginal());
};

