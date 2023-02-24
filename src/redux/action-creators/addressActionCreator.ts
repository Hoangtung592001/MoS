import { BaseResponse } from '~/commons/response';
import { fetchAsync, fetchAsyncWithAuthentitaion, FETCH_TYPES } from '~/commons/sendRequest';
import { Address, Order, PaymentOption } from '~/constants/interfaces';
import { SERVICE_URL } from '~/constants/server';
import { get } from '../reducers/addressReducer';

export const getSavedAddress = (accessToken: string) => async (dispatch: any) => {
    const response = await fetchAsyncWithAuthentitaion<BaseResponse<Array<Address>>>(
        SERVICE_URL.ADDRESS.GET,
        FETCH_TYPES.GET,
        accessToken,
    );

    if (response.data.success) {
        const data = response.data;

        dispatch(get(data.data));
    }
};
