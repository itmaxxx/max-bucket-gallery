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

const BACKEND_URL = process.env.NX_BACKEND_URL;

export function userLogin(email: string, password: string) {
  return async (dispatch: any) => {
    const result = await request(BACKEND_URL + '/api/auth/signIn', 'POST', {
      email,
      password,
    });

    if (result.error) {
      dispatch({
        type: USER_LOGIN_FAIL,
      });

      return;
    }

    const resultUserInfo = await request(
      BACKEND_URL + '/api/users/me',
      'GET',
      null,
      {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${result.jwt}`,
      },
    );

    if (resultUserInfo.error) {
      console.log(`USER USERS/ME EX   `, resultUserInfo);
      dispatch({
        type: USER_LOGIN_FAIL,
      });

      return;
    }

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: {
        user: {
          jwt: result.jwt,
          _id: resultUserInfo._id,
          email,
          name: resultUserInfo.name,
          phone: resultUserInfo.phone,
          description: resultUserInfo.description,
        },
      },
    });

    localStorage.setItem("token", result.jwt);
  };
}

export function userLoginWithJwt(jwt: string) {
  return async (dispatch: any) => {
    const resultUserInfo = await request(
      BACKEND_URL + '/api/users/me',
      'GET',
      null,
      {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    );

    if (resultUserInfo) {
      localStorage.setItem('token', jwt);

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: {
          user: { ...resultUserInfo },
        },
      });
    }
  };
}

export function userRegister(
  name: string,
  email: string,
  phone: string,
  password: string,
) {
  return async (dispatch: any) => {
    const result = await request(BACKEND_URL + '/api/auth/signUp', 'POST', {
      name,
      email,
      phone,
      password,
    });

    if (result.error) {
      dispatch({
        type: USER_REGISTER_FAIL,
      });

      return;
    }

    const resultUserInfo = await request(
      BACKEND_URL + '/api/users/me',
      'GET',
      null,
      {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${result.jwt}`,
      },
    );

    if (resultUserInfo.error) {
      console.log(`USER USERS/ME EX   `, resultUserInfo);
      dispatch({
        type: USER_REGISTER_FAIL,
      });

      return;
    }

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: {
        user: {
          jwt: result.jwt,
          email: resultUserInfo.email,
          name: resultUserInfo.name,
          phone: resultUserInfo.phone,
          description: resultUserInfo.description,
        },
      },
    });

    localStorage.setItem("token", JSON.stringify(result.jwt));
  };
}

export function userLogout() {
  return async (dispatch: any) => {
    localStorage.removeItem("token");

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
