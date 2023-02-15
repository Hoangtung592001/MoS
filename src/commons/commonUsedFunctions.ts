import Cookies from 'universal-cookie';
import { accessTokenKey, months } from '~/constants';

export const getAccessTokenFromCookies = () => {
    const cookies = new Cookies();
    const accessToken = cookies.get(accessTokenKey);

    return accessToken;
}

export const getDateTime = (date: Date) => {
    if (date) {
        date = new Date(date);
        return `${months[date.getMonth()]} ${date.getDay()}, ${date.getFullYear()}`
    }

    return null;
}