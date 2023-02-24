import { BaseResponse } from '~/commons/response';
import { fetchAsync, FETCH_TYPES } from '~/commons/sendRequest';
import { Order, PaymentOptionTypeDescription } from '~/constants/interfaces';
import { SERVICE_URL } from '~/constants/server';
import { get } from '../reducers/paymentOptionTypeDescriptionReducer';

export const getPaymentOptionTypeDescriptions = () => async (dispatch: any) => {
    const response = await fetchAsync<BaseResponse<Array<PaymentOptionTypeDescription>>>(
        SERVICE_URL.PAYMENT_OPTION_TYPE_DESCRIPTION.GET,
        FETCH_TYPES.GET,
    );

    if (response.data.success) {
        const data = response.data;

        dispatch(get(data.data));
    }
};
