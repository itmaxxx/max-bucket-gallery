import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from '../types/user';
import { UserAction, UserState } from '../types';

const token = localStorage.getItem('token');

const initialState: UserState = {
  user: null,
  isLogined: token ? true : false,
};

export const userReducer = (
  state: UserState = initialState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLogined: true,
        user: action.payload.user || null,
      };
    case USER_LOGIN_FAIL:
      return {
        ...state,
        isLogined: false,
        user: null,
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        isLogined: false,
      };
    case USER_REGISTER_FAIL:
      return {
        ...state,
        isLogined: false,
      };
    case USER_LOGOUT:
      return {
        ...state,
        isLogined: false,
        user: null,
      };
    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        user: action.payload.user || null,
      };
    case USER_UPDATE_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
};
