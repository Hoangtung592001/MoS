import { BaseResponse } from "~/commons/response";
import { fetchAsync, FETCH_TYPES } from "~/commons/sendRequest";
import { Order } from "~/constants/interfaces";
import { SERVICE_URL } from "~/constants/server";
import { get } from "../reducers/orderReducer";

export const getOrders = (accessToken: string) => async (dispatch: any) => {
    const response = await fetchAsync<BaseResponse<Order>>
                            (
                                SERVICE_URL.ORDERS.GET,
                                FETCH_TYPES.GET
                            );

    if (response.data.success) {
        const data = response.data;

        dispatch(get(data.data));
    }
}