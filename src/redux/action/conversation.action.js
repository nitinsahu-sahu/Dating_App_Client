import axios from "../helper/axios";
import { conversationConstants } from "./constants";

export const UserConversation = (ids) => {
  return async (dispatch) => {
    dispatch({
      type: conversationConstants.CONVERSATION_REQUEST
    });
    await axios.post(`/conversation-add`, { ids }).then(function (response) {
      console.log('res', response);
      //   dispatch({
      //     type: conversationConstants.CONVERSATION_SUCCESS,
      //     payload: {
      //       profile: response.data.data,
      //       message: response.data.message
      //     }
      //   })
    }).catch(function (error) {
      console.log('e', error);

      //   dispatch({
      //     type: conversationConstants.CONVERSATION_FAILURE,
      //     payload: {
      //       error: error.data.errors,
      //     }
      //   })
    });
  }
}

export const getUserConversation = (ids) => {
  return async (dispatch) => {
    dispatch({
      type: conversationConstants.GET_CONVERSATION_REQUEST
    });
    await axios.post(`/get-conversation`, { ids }).then(function (response) {
      dispatch({
        type: conversationConstants.GET_CONVERSATION_SUCCESS,
        payload: {
          chat: response.data.conversation,
        }
      })
    }).catch(function (error) {
      dispatch({
        type: conversationConstants.GET_CONVERSATION_FAILURE,
        payload: {
          error: error.data.error,
        }
      })
    });
  }
}


export const newMsgAndUpdateConversaion = (message) => {
  return async (dispatch) => {
    dispatch({
      type: conversationConstants.SEND_MESSAGE_REQUEST
    });
    await axios.post(`/add-message`, { message }).then(function (response) {
      console.log('c',response);
      
      // dispatch({
      //   type: conversationConstants.GET_CONVERSATION_SUCCESS,
      //   payload: {
      //     chat: response.data.conversation,
      //   }
      // })
    }).catch(function (error) {
      console.log('c',error);

      // dispatch({
      //   type: conversationConstants.GET_CONVERSATION_FAILURE,
      //   payload: {
      //     error: error.data.error,
      //   }
      // })
    });
  }
}

export const getMessageByConversationId = (id) => {
  return async (dispatch) => {
    dispatch({
      type: conversationConstants.SEND_MESSAGE_REQUEST
    });
    await axios.get(`/get-message/${id}`).then(function (response) {
      dispatch({
        type: conversationConstants.GET_CONVERSATION_SUCCESS,
        payload: {
          bothmsg: response.data,
        }
      })
    }).catch(function (error) {
      dispatch({
        type: conversationConstants.GET_CONVERSATION_FAILURE,
        payload: {
          error: error.data.error,
        }
      })
    });
  }
}
// ----------------gETS MESSAGES-------------
export const getUsersMessage = () => {
  return async (dispatch) => {
    dispatch({
      type: conversationConstants.GET_USERS_MESSAGE_REQUEST
    });
    await axios.get(`/get-messages`).then(function (response) {
      dispatch({
        type: conversationConstants.GET_USERS_MESSAGE_SUCCESS,
        payload: {
          chat: response.data,
        }
      })
    }).catch(function (error) {
      dispatch({
        type: conversationConstants.GET_USERS_MESSAGE_FAILURE,
        payload: {
          error: error.data.error,
        }
      })
    });
  }
}