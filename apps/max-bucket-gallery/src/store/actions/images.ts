import { ImagesDispatch } from '../types';
import { request } from '../../utils/request';
import {
  IMAGES_FETCH,
  IMAGES_FETCH_FAIL,
  IMAGES_FETCH_SUCCESS,
} from '../types/images';
import { Types } from 'mongoose';

const BACKEND_URL = process.env.NX_BACKEND_URL;

export const getUserImages = (userId: Types.ObjectId) => {
  return async (dispatch: ImagesDispatch) => {
    try {
      dispatch({
        type: IMAGES_FETCH,
      });

      const jwt = localStorage.getItem('token');

      const result = await request(
        BACKEND_URL + '/api/images/' + userId,
        'GET',
        null,
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        }
      );

      if (result) {
        return dispatch({
          type: IMAGES_FETCH_SUCCESS,
          payload: {
            images: result.data,
          },
        });
      }

      return dispatch({
        type: IMAGES_FETCH_FAIL,
      });
    } catch (error) {
      return dispatch({
        type: IMAGES_FETCH_FAIL,
      });
    }
  };
};
