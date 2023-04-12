import { createAsyncThunk } from "@reduxjs/toolkit";
import { StringLiteral } from "typescript";
import { BaseResponse } from "~/commons/response";
import { fetchAsync, fetchAsyncWithAuthentitaion, FETCH_TYPES } from "~/commons/sendRequest";
import { GetBookDetailsUrl, removeBookUrl } from "~/commons/URLs";
import { Author, BookCondition as IBookCondition, BookImage, Publisher } from "~/constants/interfaces";
import { SERVICE_URL } from "~/constants/server";
import { get, getAll, getAllBookConditions, getRecentlyViewedItems, getTrendingItems, makeOriginal } from "../reducers/bookDetailsReducer";

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
    bookCondition: IBookCondition;
    description: string;
    bookDetails: string;
}

export type RemoveBookReq = {
    accessToken: string;
    bookId: string;
}

export type Image = {
    url: string;
    bookImageTypeId: number;
}

export type CreateBookReq = {
    accessToken: string;
    authorId: string;
    pulisherId: string;
    publishedAt: string;
    title: string;
    images: Array<Image>;
    quantity: number;
    price: number;
    edition: number;
    bookConditionId: number;
    description: string;
    bookDetails: string;
}

export type EditBookImage = {
    id: string;
    url: string;
    bookImageTypeId: number;
}

export type EditBookReq = {
    accessToken: string;
    authorId: string;
    id: string;
    pulisherId: string;
    publishedAt: string;
    title: string;
    image: EditBookImage;
    quantity: number;
    price: number;
    edition: number;
    bookConditionId: number;
    description: string;
    bookDetails: string;
};

export type BookCondition = {
    id: number;
    name: string;
}

export type RecentlyViewItem = {
    id: string;
    title: string;
    author: Author;
    bookImage: BookImage;
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

export const getAllBookConditionsAction = () => async (dispatch: any) => {
    const response = await fetchAsync<BaseResponse<Array<BookCondition>>>
                            (
                                SERVICE_URL.BOOKS.GET_BOOK_CONDITIONS,
                                FETCH_TYPES.GET
                            );

    if (response.data.success) {
        const data = response.data;

        dispatch(getAllBookConditions(data.data));
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

export const createBook = createAsyncThunk('Book/Create', async (props: CreateBookReq, thunkApi) => {
    const { accessToken, ...bookInfo } = props;
    
    try {
        await fetchAsyncWithAuthentitaion(
            SERVICE_URL.BOOKS.CREATE,
            FETCH_TYPES.POST,
            accessToken,
            bookInfo
        );

        thunkApi.fulfillWithValue(true)
    } catch (e) {
        return thunkApi.rejectWithValue(false);
    }
});

export const editBook = createAsyncThunk('Book/Edit', async (props: EditBookReq, thunkApi) => {
    const { accessToken, ...bookInfo } = props;
    
    try {
        await fetchAsyncWithAuthentitaion(
            SERVICE_URL.BOOKS.EDIT,
            FETCH_TYPES.PUT,
            accessToken,
            bookInfo
        );

        thunkApi.fulfillWithValue(true)
    } catch (e) {
        return thunkApi.rejectWithValue(false);
    }
});

export const getRecentlyViewedItemsAction = (accessToken: string) => async (dispatch: any) => {
    const response = await fetchAsyncWithAuthentitaion<BaseResponse<Array<RecentlyViewItem>>>
                            (
                                SERVICE_URL.BOOKS.RECENTLY_VIEWED_ITEMS,
                                FETCH_TYPES.POST,
                                accessToken,
                                {
                                    limit: 5
                                }
                            );

    if (response.data.success) {
        const data = response.data;

        dispatch(getRecentlyViewedItems(data.data));
    }
}

export const getTrendingItemsAction = () => async (dispatch: any) => {
    const response = await fetchAsync<BaseResponse<Array<RecentlyViewItem>>>
                            (
                                SERVICE_URL.BOOKS.TRENDING_ITEMS,
                                FETCH_TYPES.GET,
                            );

    if (response.data.success) {
        const data = response.data;

        dispatch(getTrendingItems(data.data));
    }
}
