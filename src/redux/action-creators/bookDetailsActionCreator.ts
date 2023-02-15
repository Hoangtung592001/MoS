import { StringLiteral } from "typescript";
import { BaseResponse } from "~/commons/response";
import { fetchAsync, FETCH_TYPES } from "~/commons/sendRequest";
import { GetBookDetailsUrl } from "~/commons/URLs";
import { Author, BookCondition, BookImage, Publisher } from "~/constants/interfaces";
import { get } from "../reducers/bookDetailsReducer";

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