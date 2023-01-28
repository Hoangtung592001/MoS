import axios from "axios";

export const FETCH_TYPES = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
}

export async function fetchAsync(url: string, method: string, token = "", data = {}) {
    const response = await axios({
        url: url,
        method: method,
        headers: {
            Authorization: `Bearer ${token ? token : ""}`,
        },
        data: data
    })

    return response;
}