import axios from "axios";

export const FETCH_TYPES = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
}

export async function fetchAsync<T>(url: string, method: string, data = {}) {
    const response = await axios<T>({
        url: url,
        method: method,
        data: data
    })

    return response;
}