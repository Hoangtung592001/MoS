import { SERVICE_URL } from "~/constants/server"

export const GetExceptionUrl = (exceptionId: string) => {
    const url = SERVICE_URL.EXCEPTION.GET;
    
    return url.replace("{ExceptionId}", exceptionId);
}

export const GetBookDetailsUrl = (bookId: string) => {
    const url = SERVICE_URL.BOOKS.GET_BOOK_DETAILS;

    return url.replace("{BookId}", bookId);
}

export const GetAddressByIdUrl = (addressId: string) => {
    const url = SERVICE_URL.ADDRESS.GET_BY_ID;

    return url.replace('{addressId}', addressId);
};

export const GetPaymentOptionByIdUrl = (paymentOptionId: string) => {
    const url = SERVICE_URL.PAYMENT_OPTION.GET_BY_ID;

    return url.replace('{paymentOptionId}', paymentOptionId);
};

export const getShippingFeeByIdUrl = (addressId: string) => {
    const url = SERVICE_URL.SHIPPING.GET;

    return url.replace('{addressId}', addressId);
};

export const redirectToBookDetailByBookId = (bookId: string) => {
    return `/BookDetails/${bookId}`;
};