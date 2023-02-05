import { BaseResponse, ExceptionResponse } from "~/commons/response";
import { fetchAsync, FETCH_TYPES } from "~/commons/sendRequest";
import { ProductItem } from "~/constants/interfaces";
import { SERVICE_URL } from "~/constants/server";
import { get } from "../reducers/frequentlyViewedItemsReducer";
export const getFrequentlyViewedItems = () => async (dispatch: any) => {
    const response = await fetchAsync<BaseResponse<Array<ProductItem>>>
                            (
                                SERVICE_URL.BOOKS.FREQUENTLY_VIEW_ITEMS,
                                FETCH_TYPES.POST,
                                {
                                    limit: 5
                                }
                            );

    if (response.data.success) {
        const data = response.data;

        dispatch(get(data.data));
    }
}