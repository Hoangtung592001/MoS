import { useEffect, useState } from 'react';
import axios from 'axios';
import { BaseResponse } from '~/commons/response';
import { Book } from '~/redux/action-creators/searchBookActionCreator';
import { FETCH_TYPES } from '~/commons/sendRequest';
import { SERVICE_URL } from '~/constants/server';

export default function useBookSearch(query: string) {
    const [books, setBooks] = useState<Array<Book>>([]);

    useEffect(() => {
        setBooks([]);
    }, [query]);

    useEffect(() => {
        if (query) {
            let cancel: any;
            axios<BaseResponse<Array<Book>>>({
                method: FETCH_TYPES.POST,
                url: SERVICE_URL.SEARCH_BOOK.GET,
                data: {
                    title: query,
                },
                cancelToken: new axios.CancelToken((c) => (cancel = c)),
            })
                .then((res) => {
                    setBooks(res.data.data);
                })
                .catch((e) => {
                    if (axios.isCancel(e)) return;
                });
            return () => cancel();
        }
    }, [query]);

    return { books };
}
