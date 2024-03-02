import { authConstants, chatConstants } from '../action/constants'

const initialState = {
    user: {
    },
    loading: true,
};
const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case chatConstants.CHAT_OFF:
            state = {
                ...state,
                loading: true,
            }
            break;
        case chatConstants.CHAT_ON:
            state = {
                ...state,
                user: action.payload.user,
                loading: false,
            }
            break;
        default: state = {
            ...state,
        }
    }
    return state
}

export default chatReducer;
