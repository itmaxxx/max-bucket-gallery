import { combineReducers } from "@reduxjs/toolkit";
import { imagesReducer } from "./images";
import { userReducer } from './user';

export const rootReducer = combineReducers({
  user: userReducer,
  images: imagesReducer
});
