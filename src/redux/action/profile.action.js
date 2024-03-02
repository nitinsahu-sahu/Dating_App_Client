import axios from "../helper/axios";
import { authConstants } from "./constants";

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

