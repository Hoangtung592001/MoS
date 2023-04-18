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

export const getDateTimeFromServer = (date: Date) => {
    if (date) {
        date = new Date(date);
        const formatDate = date.getDate() < 10 ? `0${date.getDate()}`:date.getDate();
        const formatMonth = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}`: date.getMonth();
        const formattedDate = [date.getFullYear(), formatMonth, formatDate].join('-');
        return formattedDate;
    }
    return '';
}

export const hideCardNumber = (cardNumber: string) => {
    const exposedNumber = cardNumber.substring(12);
    return '************' + exposedNumber;
};

export const getRandomKey = () => {
    return Math.floor(Math.random() * 100000000);
};

export const checkTokenExpiry = (token: string) => {
    if (!token) {
        return true;
    }
    const { exp } = jwtDecode<any>(token);

    if (Date.now() / 1000 >= exp) {
        return true;
    }

    return false;
};

export const convertConcurrency = (cost: number) => {
    return Math.round(cost * 100) / 100;
};