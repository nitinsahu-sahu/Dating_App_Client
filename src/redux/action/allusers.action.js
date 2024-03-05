import axios from "../helper/axios";
import { authConstants } from "./constants";
const userInfo = JSON.parse(localStorage.getItem("u_info"))
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