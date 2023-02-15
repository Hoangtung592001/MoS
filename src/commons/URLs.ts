import { SERVICE_URL } from "~/constants/server"

export const GetExceptionUrl = (exceptionId: string) => {
    const url = SERVICE_URL.EXCEPTION.GET;
    
    return url.replace("{ExceptionId}", exceptionId);
}

export const GetBookDetailsUrl = (bookId: string) => {
    const url = SERVICE_URL.BOOKS.GET_BOOK_DETAILS;

    return url.replace("{BookId}", bookId);
}