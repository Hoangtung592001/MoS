import axios from "axios";

export const FETCH_TYPES = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

export async function fetchAsync<T>(url: string, method: string, data = {}) {
    const response = await axios<T>({
        url: url,
        method: method,
        data: data,
    });

    return response;
}

export async function FetchAsync<T>(url: string, method: string, data = {}) {
    const response = await axios<T>({
        url: url,
        method: method,
        data: data,
    });

    return response;
}

export async function fetchAsyncWithAuthentitaion<T>(url: string, method: string, accessToken: string, data = {}) {
    const response = await axios<T>({
        url: url,
        method: method,
        data: data,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return response;
}