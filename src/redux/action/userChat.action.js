import { chatConstants } from "./constants";

export const chatWithUser = (data) => {
    return async (dispatch) => {
        dispatch({
            type: chatConstants.CHAT_OFF
        });
        dispatch({
            type: chatConstants.CHAT_ON,
            payload: {
                user: data,
            }
        })
    }
}

