import { chatConstants, conversationConstants } from '../action/constants'

const initialState = {
    currentUser: {},
    loading: true,
    error: ''
};
const conversationReducer = (state = initialState, action) => {
    switch (action.type) {
        case conversationConstants.GET_CONVERSATION_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case conversationConstants.GET_CONVERSATION_SUCCESS:
            state = {
                ...state,
                currentUser: action.payload.chat,
                loading: false,
            }
            break;
        case conversationConstants.GET_CONVERSATION_FAILURE:
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
