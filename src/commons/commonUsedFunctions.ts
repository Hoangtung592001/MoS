import { Exception } from "./interfaces";

const pushError = (errors: Array<Exception>, error: Exception) => {
    const isErrorExisted = errors.find(exception => exception.id === error.id);

    if (!isErrorExisted) {
        return errors;
    }
    errors.push(error);

    return errors;
}

export { pushError };