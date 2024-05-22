import {receiverProfileConstants } from '../action/constants'

const initialState = {
    chatUserData: {},
    loading: true,
    error: null,
    message: ''
};
const receiverReducer = (state = initialState, action) => {
    switch (action.type) {
        case receiverProfileConstants.GET_RECEIVER_INFO_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case receiverProfileConstants.GET_RECEIVER_INFO_SUCCESS:
            state = {
                chatUserData: action.payload.receiverInfo,
                message: action.payload.message,
                loading: false
            }
            break;
        case receiverProfileConstants.GET_RECEIVER_INFO_FAILURE:
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

export default receiverReducer;
