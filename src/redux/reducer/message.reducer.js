import { messageConstants } from '../action/constants'

const initialState = {
    messages: {},
    loading: true,
    error: null,
    message: ''
};
const fetchMessagesReducers = (state = initialState, action) => {
    switch (action.type) {
        case messageConstants.FETCH_MESSAGES_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case messageConstants.FETCH_MESSAGES_SUCCESS:
            state = {
                messages: {
                    messages: action.payload.userMessages,
                    receiver: action.payload.receiver,
                    conversationId: action.payload.conversationId,
                },
                message: action.payload.message,
                loading: false
            }
            break;
        case messageConstants.FETCH_MESSAGES_FAILURE:
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

export default fetchMessagesReducers;
