export interface BaseResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export interface ExceptionResponse {
    success: boolean;
    exceptionId: string;
}