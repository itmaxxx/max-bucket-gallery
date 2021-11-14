import { ImagesAction, ImagesState } from '../types';
import { IMAGES_FETCH, IMAGES_FETCH_FAIL, IMAGES_FETCH_SUCCESS } from '../types/images';

const initialState: ImagesState = {
  images: [],
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
        images: []
      }
      break;
    case IMAGES_FETCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        images: action.payload?.images || []
      }
      break;
    }
    case IMAGES_FETCH_FAIL:
      return {
        ...state,
        loading: false,
        images: []
      }
      break;
    default:
      return state;
  }
}
