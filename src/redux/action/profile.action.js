import axios from "../helper/axios";
import { authConstants, receiverProfileConstants } from "./constants";

export const getProfile = () => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.GET_PROFILE_REQUEST
    });
    await axios.get(`/getProfile`).then(function (response) {
      dispatch({
        type: authConstants.GET_PROFILE_SUCCESS,
        payload: {
          profile: response.data.data,
          message: response.data.message
        }
      })
    }).catch(function (error) {
      dispatch({
        type: authConstants.GET_PROFILE_FAILURE,
        payload: {
          error: error.data.errors,
        }
      })
    });
  }
}

export const getReceiverProfile = (_id) => {
  return async (dispatch) => {
    dispatch({
      type: receiverProfileConstants.GET_RECEIVER_INFO_REQUEST
    });
    await axios.get(`/receiver-data/${_id}`).then(function (response) {
      dispatch({
        type: receiverProfileConstants.GET_RECEIVER_INFO_SUCCESS,
        payload: {
          receiverInfo: response.data.details,
          message: response.data.message
        }
      })
    }).catch(function (error) {
      dispatch({
        type: receiverProfileConstants.GET_RECEIVER_INFO_FAILURE,
        payload: {
          error: error.data.errors,
        }
      })
    });
  }
}
