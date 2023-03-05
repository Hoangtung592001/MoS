import { BaseResponse } from '~/commons/response';
import { fetchAsync, FETCH_TYPES } from '~/commons/sendRequest';
import { SERVICE_URL } from '~/constants/server';
import { get } from '../reducers/searchBookReducer';

export type Book = {
    id: string;
    title: string;
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
