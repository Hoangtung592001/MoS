import { BaseResponse } from '~/commons/response';
import { fetchAsync, FETCH_TYPES } from '~/commons/sendRequest';
import { SERVICE_URL } from '~/constants/server';
import { get, getWhole } from '../reducers/searchBookReducer';

export type Book = {
    id: string;
    title: string;
};

export type WholeBook = {
    url: string;
    title: string;
    author: string;
    id: string;
};

export const searchBook = (title: string) => async (dispatch: any) => {
    const response = await fetchAsync<BaseResponse<Array<Book>>>(SERVICE_URL.SEARCH_BOOK.GET, FETCH_TYPES.POST, {
        title: title,
    });

    if (response.data.success) {
        const data = response.data;

        dispatch(get(data.data));
    }
};

export const searchWholeBook = (title: string) => async (dispatch: any) => {
    const response = await fetchAsync<BaseResponse<Array<WholeBook>>>(
        SERVICE_URL.SEARCH_BOOK.GET_WHOLE,
        FETCH_TYPES.POST,
        {
            title: title,
        },
    );

    if (response.data.success) {
        const data = response.data;

        dispatch(getWhole(data.data));
    }
};