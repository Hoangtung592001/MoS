import { useEffect, useState } from 'react';
import axios from 'axios';
import { BaseResponse } from '~/commons/response';
import { Book } from '~/redux/action-creators/searchBookActionCreator';
import { FETCH_TYPES } from '~/commons/sendRequest';
import { SERVICE_URL } from '~/constants/server';

export default function useChangeBasketItemQuantity(itemId: string, quantity: number) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError(false);
        let cancel: any;
        axios<BaseResponse<Array<Book>>>({
            method: FETCH_TYPES.PUT,
            url: SERVICE_URL.BASKET.GET,
            data: {
                itemId: itemId,
                quantity: quantity,
            },
            cancelToken: new axios.CancelToken((c) => (cancel = c)),
        })
            .then((res) => {
                setLoading(false);
            })
            .catch((e) => {
                if (axios.isCancel(e)) return;
                setError(true);
            });
        return () => cancel();
    }, [quantity]);

    return { loading, error };
}
