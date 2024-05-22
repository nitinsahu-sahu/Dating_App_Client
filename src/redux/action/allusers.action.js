import axios from "../helper/axios";
import { authConstants, followUnfollowConstants } from "./constants";
const userInfo = JSON.parse(localStorage.getItem("u_info"))

export const userFollow = (id) => {
  return async (dispatch) => {
    dispatch({
      type: followUnfollowConstants.FOLLOW_REQUEST
    });
    await axios.post(`/follow/${id}`).then(function (response) {
      const user = response.data.data;
      localStorage.setItem('u_info', JSON.stringify(user));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          user,
        }
      })
      dispatch({
        type: followUnfollowConstants.FOLLOW_SUCCESS,
        payload: {
          message: response.data.message,
        }
      })
    }).catch(function (error) {
      dispatch({
        type: followUnfollowConstants.FOLLOW_FAILURE,
        payload: {
          error: error.data.errors,
        }
      })
    });
  }
}

export const getAllUsers = () => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.GET_USERS_REQUEST
    });
    await axios.get(`/users/${userInfo._id}/${userInfo.showme}`).then(function (response) {
      dispatch({
        type: authConstants.GET_USERS_SUCCESS,
        payload: {
          allusers: response.data,
          message: "Get user successfully..."
        }
      })
    }).catch(function (error) {
      dispatch({
        type: authConstants.GET_USERS_FAILURE,
        payload: {
          error: error.data.errors,
        }
      })
    });
  }
}