import { BaseResponse } from '~/commons/response';
import { fetchAsync, FETCH_TYPES } from '~/commons/sendRequest';
import { SERVICE_URL } from '~/constants/server';
import { Country, get } from '../reducers/countryReducer';

export const getCountries = () => async (dispatch: any) => {
    const response = await fetchAsync<BaseResponse<Array<Country>>>(SERVICE_URL.COUNTRY.GET, FETCH_TYPES.GET);

    if (response.data.success) {
        const data = response.data;

        dispatch(get(data.data));
    }
};
