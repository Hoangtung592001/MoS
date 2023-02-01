import { SERVICE_URL } from "~/constants/server"

export const GetExceptionUrl = (exceptionId: string) => {
    const url = SERVICE_URL.EXCEPTION.GET;
    
    return url.replace("{ExceptionId}", exceptionId);
}