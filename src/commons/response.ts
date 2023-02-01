export interface BaseResponse<T> {
    success: boolean;
    data: T;
}

export interface ExceptionResponse {
    success: boolean;
    exceptionId: string;
}