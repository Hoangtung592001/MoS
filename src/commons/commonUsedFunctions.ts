import jwtDecode from 'jwt-decode';
import Cookies from 'universal-cookie';
import { accessTokenKey, months } from '~/constants';
import { FETCH_TYPES, fetchAsyncWithAuthentitaion } from './sendRequest';
import { SERVICE_URL } from '~/constants/server';
import { BaseResponse } from './response';
import { NavigateFunction } from 'react-router-dom';
import routes from '~/config/routes';

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

export const validatePhoneNumber = (phoneNumber: string) => {
    var phoneNumberPattern = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
    return phoneNumberPattern.test(phoneNumber);
}

export const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};

export const getLengthErrorMessage = (length: number) => {
    return `Length must be more than ${length}`
}

export const getRequiredErrorMessage = (label: string) => {
    return `${label} is required`
}

export const checkAdminPermissionForPage = async () => {
    const accessToken = getAccessTokenFromCookies();

    const response = await fetchAsyncWithAuthentitaion<BaseResponse<boolean>>(
        SERVICE_URL.USER.CHECK_ADMIN,
        FETCH_TYPES.GET,
        accessToken
    );
    
    return response.data.data;
};

export const checkTokenPermissionPage = () => {
    const accessToken = getAccessTokenFromCookies();

    const isTokenExpired = checkTokenExpiry(accessToken);

    return isTokenExpired;
}
