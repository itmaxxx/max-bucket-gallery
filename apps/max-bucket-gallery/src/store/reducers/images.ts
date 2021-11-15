import { ImagesAction, ImagesState } from '../types';
import {
  IMAGES_DELETE,
  IMAGES_DELETE_FAIL,
  IMAGES_DELETE_SUCCESS,
  IMAGES_FETCH,
  IMAGES_FETCH_FAIL,
  IMAGES_FETCH_SUCCESS,
} from '../types/images';

const initialState: ImagesState = {
  images: [],
  loading: false,
};

export const imagesReducer = (
  state: ImagesState = initialState,
  action: ImagesAction
): ImagesState => {
  switch (action.type) {
    case IMAGES_FETCH:
      return {
        ...state,
        loading: true,
        images: [],
      };
      break;
    case IMAGES_FETCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        images: action.payload?.images || [],
      };
      break;
    }
    case IMAGES_FETCH_FAIL:
      return {
        ...state,
        loading: false,
        images: [],
      };
      break;
    case IMAGES_DELETE:
    case IMAGES_DELETE_FAIL:
      return state;
      break;
    case IMAGES_DELETE_SUCCESS:
      return {
        ...state,
        images: state.images.filter(
          (image) => image._id !== action.payload?.image
        ),
      };
      break;
    default:
      return state;
  }
};
