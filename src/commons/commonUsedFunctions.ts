import { Exception } from "./interfaces";

export function pushError(errors: Array<Exception>, error: Exception) {
    const isErrorExisted = errors.find(exception => exception.id === error.id);

    if (isErrorExisted) {
        return errors;
    }

    errors.push(error);

    return errors;
}