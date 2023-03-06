import jwtDecode from 'jwt-decode';
import Cookies from 'universal-cookie';
import { accessTokenKey, months } from '~/constants';

export const getAccessTokenFromCookies = () => {
    const cookies = new Cookies();
    const accessToken = cookies.get(accessTokenKey);

    return accessToken;
};

export const getDateTime = (date: Date) => {
    if (date) {
        date = new Date(date);
        return `${months[date.getMonth()]} ${date.getDay()}, ${date.getFullYear()}`;
    }

    return null;
};

export const hideCardNumber = (cardNumber: string) => {
    const exposedNumber = cardNumber.substring(12);
    return '************' + exposedNumber;
};

export const getRandomKey = () => {
    return Math.floor(Math.random() * 1000000);
};

export const checkTokenExpiry = (token: string) => {
    const { exp } = jwtDecode<any>(token);
    
    if (Date.now() / 1000 >= exp) {
        return true;
    }

    return false;
};
