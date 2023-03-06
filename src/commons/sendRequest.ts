import axios from "axios";
import { useNavigate } from 'react-router';
import routes from '~/config/routes';
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

export async function FetchAsyncWithAuthentitaion<T>(url: string, method: string, accessToken: string, data = {}) {
    const navigate = useNavigate();

    const response = await axios<T>({
        url: url,
        method: method,
        data: data,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (response.status >= 400) {
        navigate(routes.signin);
    }

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