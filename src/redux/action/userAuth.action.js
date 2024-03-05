import axios from "../helper/axios";
import { authConstants } from "./constants";



// ----------------Create User-------------------
export const register = (formData) => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.CREATE_ACCOUNT_REQUEST
    });
    await axios.post('/register', formData).then(function (response) {
      console.log(response);
      dispatch({
        type: authConstants.CREATE_ACCOUNT_SUCCESS,
        payload: {
          message: response.data.message
        }
      })
    }).catch(function (error) {
      dispatch({
        type: authConstants.CREATE_ACCOUNT_FAILURE,
        payload: {
          error: error.response.data.errors,
        }
      })
    });
  }
}

// --------------User login------------------------
export const userLogin = (data) => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.LOGIN_REQUEST
    });
    await axios.post(`/signin`, data).then(function (response) {
      const token = response.data.token;
      const user = response.data.data;
      localStorage.setItem('u_token', token);
      localStorage.setItem('u_info', JSON.stringify(user));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
          message: response.data.message
        }
      })
    }).catch(function (error) {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: {
          error: error.response.data.errors,
        }
      })
    });
  }
}

// ----------User Login or not
export const isUserLoggedIn = () => {
  return async dispatch => {
    const token = localStorage.getItem('u_token');
    if (token) {
      const user = JSON.parse(localStorage.getItem('u_info'));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user
        }
      });
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: {
          message: 'Failed to login!!!'
        }
      })
    }
  }
}


export const logout = () => {
  return async dispatch => {
    dispatch({
      type: authConstants.LOGOUT_REQUEST
    });
    await axios.post(`/signout`).then((response) => {
      alert("Message: Signout successfully.")
      localStorage.clear()
      dispatch({
        type: authConstants.LOGOUT_SUCCESS,
        payload: {
          message: response.data.message
        }
      })
      dispatch(isUserLoggedIn())
    }).catch((error) => {
      dispatch({
        type: authConstants.LOGOUT_FAILURE,
        payload: {
          error: "There was technical issue"
        }
      });
    })
  }
}





// export const googleSigin = () => {
//   return async (dispatch) => {
//     dispatch({
//       type: authConstants.LOGIN_WITH_GOOGLE_REQUEST
//     });
//     await signInWithPopup(auth, provider).then(function (response) {
//       const token = response._tokenResponse.oauthIdToken;
//       const { displayName, email, phoneNumber, uid } = response.user.providerData[0];
//       const user = {
//         _id: uid,
//         fullname: displayName,
//         email: email,
//         avtar: '',
//         role: 'guest',
//         contact_number: phoneNumber
//       }
//       localStorage.setItem('user_token', token);
//       localStorage.setItem('user_info', JSON.stringify(user));
//       dispatch({
//         type: authConstants.LOGIN_WITH_GOOGLE_SUCCESS,
//         payload: {
//           token,
//           user,
//           message: "Google signing successfully"
//         }
//       })
//     }).catch((error) => {
//       dispatch({
//         type: authConstants.LOGIN_WITH_GOOGLE_FAILURE,
//         payload: {
//           error: error.message,
//         }
//       })
//     })
//   }
// }