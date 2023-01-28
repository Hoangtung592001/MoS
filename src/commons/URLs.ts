import { SERVICE_URL } from "~/constants/server"

export const GetExceptionUrl = (exceptionId: string) => {
    const url = SERVICE_URL.EXCEPTION.GET;
    url.replace("{ExceptionId}", exceptionId);

    return url;
}