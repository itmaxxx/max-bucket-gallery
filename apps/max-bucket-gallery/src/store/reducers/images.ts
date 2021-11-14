import { ImagesAction, ImagesState } from '../types';
import { IMAGES_FETCH, IMAGES_FETCH_FAIL, IMAGES_FETCH_SUCCESS } from '../types/images';

const initialState: ImagesState = {
  images: null,
  loading: false
}

export const imagesReducer = (
  state: ImagesState = initialState,
  action: ImagesAction
): ImagesState => {
  switch (action.type) {
    case IMAGES_FETCH:
      return {
        ...state,
        loading: true,
        images: null
      }
      break;
    case IMAGES_FETCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        images: action.payload?.images || null
      }
      break;
    }
    case IMAGES_FETCH_FAIL:
      return {
        ...state,
        loading: false,
        images: null
      }
      break;
    default:
      return state;
  }
}
