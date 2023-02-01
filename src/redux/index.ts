import { signIn, signUp } from './action-creators/userActionCreator';
import { removeErrorAction } from './action-creators/errorActionCreator';
const actionCreators = {
    removeErrorAction: removeErrorAction,
    signIn: signIn,
    signUp: signUp
};

export default actionCreators;