import { authConstants } from '../action/constants'

const initialState = {
    allusers: [],
    loading: true,
    error: null,
    message: ''
};
const fetchUsersReducers = (state = initialState, action) => {
    switch (action.type) {
        case authConstants.GET_USERS_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case authConstants.GET_USERS_SUCCESS:
            state = {
                allusers: action.payload.allusers,
                message: action.payload.message,
                loading: false
            }
            break;
        case authConstants.GET_USERS_FAILURE:
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

export default fetchUsersReducers;
