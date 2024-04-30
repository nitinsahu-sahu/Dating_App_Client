import axios from "../helper/axios";
import { messageConstants } from "./constants";



export const fetchMessagesbyConvId = (conversationId, receiver, _id) => {
    return async (dispatch) => {
        dispatch({
            type: messageConstants.FETCH_MESSAGES_REQUEST
        });
        await axios.get(`/message/${conversationId}?senderId=${_id}&&receiverId=${receiver?.receiverId}`).then(function (response) {
            dispatch({
                type: messageConstants.FETCH_MESSAGES_SUCCESS,
                payload: {
                    userMessages: response.data,
                    receiver: receiver,
                    conversationId,
                    message: "Get user successfully..."
                }
            })
        }).catch(function (error) {
            dispatch({
                type: messageConstants.FETCH_MESSAGES_FAILURE,
                payload: {
                    error: error.data.errors,
                }
            })
        });
    }
}

export const deleteMsgEveryOne = (_id, isConvId) => {
    return async (dispatch) => {
        dispatch({
            type: messageConstants.DELETE_MESSAGES_REQUEST
        });
        await axios.delete(`/message/delete/${_id}`).then(function (response) {
            dispatch(fetchMessagesbyConvId(isConvId.convId, isConvId.userData, isConvId._id))
            dispatch({
                type: messageConstants.DELETE_MESSAGES_SUCCESS,
                payload: {
                    message: response.data.message
                }
            })
        }).catch(function (error) {
            dispatch({
                type: messageConstants.DELETE_MESSAGES_FAILURE,
                payload: {
                    error: error.data.errors,
                }
            })
        });
    }
}

export const deleteMsgFromMe = (_id, isConvId) => {
    return async (dispatch) => {
        dispatch({
            type: messageConstants.DELETE_MESSAGES_FOR_ME_REQUEST
        });
        
        await axios.patch(`/message/delete/me/`).then(function (response) {
            dispatch(fetchMessagesbyConvId(isConvId.convId, isConvId.userData, isConvId._id))
            dispatch({
                type: messageConstants.DELETE_MESSAGES_FOR_ME_SUCCESS,
                payload: {
                    message: response.data.message
                }
            })
        }).catch(function (error) {
            dispatch({
                type: messageConstants.DELETE_MESSAGES_FOR_ME_FAILURE,
                payload: {
                    error: error.data.errors,
                }
            })
        });
    }
}