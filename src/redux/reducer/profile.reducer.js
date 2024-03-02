import { authConstants } from '../action/constants'

const initialState = {
    profile: {},
    allusers: [],
    loading: true,
    error: null,
    message: ''
};
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case authConstants.GET_PROFILE_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case authConstants.GET_PROFILE_SUCCESS:
            state = {
                profile: action.payload.profile,
                message: action.payload.message,
                loading: false
            }
            break;
        case authConstants.GET_PROFILE_FAILURE:
            state = {
                ...state,
                errors: action.payload.error,
                loading: true
            }
            break;
        default: state = {
            ...state,
        }
    }
    return state
}

export default authReducer;
