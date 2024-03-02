import { chatConstants, conversationConstants } from '../action/constants'

const initialState = {
    chat: {},
    loading: true,
    error: ''
};
const conversationReducer = (state = initialState, action) => {
    switch (action.type) {
        case conversationConstants.GET_USERS_MESSAGE_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case conversationConstants.GET_USERS_MESSAGE_SUCCESS:
            state = {
                ...state,
                chat: action.payload.chat,
                loading: false,
            }
            break;
        case conversationConstants.GET_USERS_MESSAGE_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: true
            }
            break;
        default: state = {
            ...state,
        }
    }
    return state
}

export default conversationReducer;
