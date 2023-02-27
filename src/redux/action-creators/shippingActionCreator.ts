import { BaseResponse } from '~/commons/response';
import { fetchAsyncWithAuthentitaion, FETCH_TYPES } from '~/commons/sendRequest';
import { getShippingFeeByIdUrl } from '~/commons/URLs';
import { get } from '../reducers/shippingReducer';

export const getShippingFee = (accessToken: string, addressId: string) => async (dispatch: any) => {
    const response = await fetchAsyncWithAuthentitaion<BaseResponse<number>>(
        getShippingFeeByIdUrl(addressId),
        FETCH_TYPES.POST,
        accessToken,
    );

    if (response.data.success) {
        const data = response.data;

        dispatch(get(data.data));
    }
};
