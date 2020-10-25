import * as ActionTypes from './ActionTypes';
import {isTokenExpired} from './actionCreators'

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export const Auth = (state = {
  isLoading: false,
  isAuthenticated: localStorage.getItem('token') && localStorage.getItem('refreshToken') && !isTokenExpired('refreshToken') ? true : false,
  token: localStorage.getItem('token'),
  refreshToken: localStorage.getItem('refreshToken'),
  creds: localStorage.getItem('creds') ? JSON.parse(localStorage.getItem('creds')) : null,
  errMess: null
}, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
        creds: action.creds
      };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        errMess: '',
        token: action.token,
        refreshToken: action.refreshToken
      };
    case ActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        errMess: action.message
      };
    case ActionTypes.LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: true
      };
    case ActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        token: '',
        refreshToken: '',
        creds: null
      };
    
    case ActionTypes.LOGOUT_SUCCESS_REMEMBER:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        token: '',
        refreshToken: ''
      };
    default:
      return state;
  }
}