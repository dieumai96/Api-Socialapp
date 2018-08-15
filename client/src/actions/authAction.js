// REGISTER 
import { GET_ERRORS , SET_CURRENT_USER } from "./types";
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import  jwt_decode from 'jwt-decode';
export const registerUser = (userData, history) => dispatch => {
  axios.post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    });
}
export const loginUser = userData => dispatch => {
  axios.post('/api/users/login', userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem('jwtToken',token)
      // set token to auth header 
      setAuthToken(token);
      // decode token to get user data 
      const decoded = jwt_decode(token);
      // set current user 
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    })
}
// set logged in user 
export const setCurrentUser = (decode) =>{
  return {
    type : SET_CURRENT_USER,
    payload : decode,
  }
}