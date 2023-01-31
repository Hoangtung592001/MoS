import { removeError } from './action-creators/errorActionCreator';
import { signIn, signUp } from './action-creators/userActionCreator';

const actionCreators = {
    removeError: removeError,
    signIn: signIn,
    signUp: signUp
};

export default actionCreators;