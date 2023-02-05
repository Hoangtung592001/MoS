import { signIn, signUp, signOut } from './action-creators/userActionCreator';
import { removeErrorAction } from './action-creators/errorActionCreator';
const actionCreators = {
    removeErrorAction: removeErrorAction,
    signIn: signIn,
    signUp: signUp,
    signOut: signOut
};

export default actionCreators;