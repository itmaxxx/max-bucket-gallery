import {
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCESS,
} from '../types/user';
import { request } from '../../utils/request';
import { UserDispatch } from '../types';

const BACKEND_URL = process.env.NX_BACKEND_URL;

export function userLogin(email: string, password: string) {
  return async (dispatch: UserDispatch) => {
    try {
      const result = await request(BACKEND_URL + '/api/auth/sign-in', 'POST', {
        email,
        password,
      });

      if (result.error || !result.jwt) {
        throw new Error(result.error || result.message);

        return;
      }

      const resultUserInfo = await request(
        BACKEND_URL + '/api/users/me',
        'GET',
        null,
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${result.jwt}`,
        }
      );

      if (resultUserInfo.error) {
        throw new Error(result.error || result.message);

        return;
      }

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: {
          user: {
            _id: resultUserInfo._id,
            email: resultUserInfo.email,
            fullName: resultUserInfo.fullName,
          },
        },
      });

      localStorage.setItem('token', result.jwt);
    } catch (error) {
      console.log(error);

      alert(error.message);

      dispatch({
        type: USER_LOGIN_FAIL,
      });
    }
  };
}

export function userLoginWithJwt(jwt: string) {
  return async (dispatch: UserDispatch) => {
    try {
      const resultUserInfo = await request(
        BACKEND_URL + '/api/users/me',
        'GET',
        null,
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        }
      );

      if (resultUserInfo.error) {
        localStorage.removeItem('token');

        dispatch({
          type: USER_LOGOUT,
        });

        return;
      }

      if (resultUserInfo) {
        localStorage.setItem('token', jwt);

        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: {
            user: { ...resultUserInfo },
          },
        });

        return;
      }

      throw new Error('Failed to restore session');
    } catch (error) {
      console.log(error);

      alert(error.message);
    }
  };
}

export function userRegister(
  fullName: string,
  email: string,
  password: string
) {
  return async (dispatch: UserDispatch) => {
    try {
      const result = await request(BACKEND_URL + '/api/auth/sign-up', 'POST', {
        fullName,
        email,
        password,
      });

      if (result.error || !result.jwt) {
        throw new Error(result.error || result.message);
      }

      const resultUserInfo = await request(
        BACKEND_URL + '/api/users/me',
        'GET',
        null,
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${result.jwt}`,
        }
      );

      if (resultUserInfo.error) {
        dispatch({
          type: USER_REGISTER_FAIL,
        });

        return;
      }

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: {
          user: { ...resultUserInfo },
        },
      });

      localStorage.setItem('token', result.jwt);
    } catch (error) {
      console.log(error);

      alert(error.message);

      dispatch({
        type: USER_REGISTER_FAIL,
      });
    }
  };
}

export function userLogout() {
  return async (dispatch: any) => {
    localStorage.removeItem('token');

    dispatch({
      type: USER_LOGOUT,
    });
  };
}

// export function updateUser(
//   userId: string,
//   userData: ProfileSettingsFormValues,
// ) {
//   return async (dispatch) => {
//     const jwt = await AsyncStorage.getItem('@token');
//
//     console.log('jwt', { jwt });
//
//     const result = await request(
//       BACKEND_URL + '/api/users/' + userId,
//       'PATCH',
//       userData,
//       {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${jwt}`,
//       },
//     );
//
//     if (result.error) {
//       dispatch({
//         type: USER_UPDATE_FAIL,
//         payload: {
//           alert: { isError: true, message: result.error },
//         },
//       });
//
//       return;
//     }
//
//     console.log('updateUser result', { result });
//
//     dispatch({
//       type: USER_UPDATE_SUCCESS,
//       payload: {
//         alert: { isError: false, message: 'User data updated' },
//         user: result,
//       },
//     });
//   };
// }
