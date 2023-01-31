import GLOBAL_TYPES from "../../constants/actions";

const initialState = {
    token: {
        accessToken: "",
        refreshToken: "",
    }
};

export default function userReducer(state = initialState, action: any) {
    return state;
}
