import { Image, User } from '@max-bucket-gallery/api-interfaces';

export interface RootState {
  user: UserState;
  images: ImagesState;
}

// User state

export interface UserState {
  user: User | null;
  loggedIn: boolean;
}

export interface UserAction {
  type: string;
  payload?: Partial<UserState>;
}

export type UserDispatch = (dispatch: UserAction) => UserAction;

// Images state

export interface ImagesState {
  images: Image[];
  loading: boolean;
}

export interface ImagesAction {
  type: string;
  payload?: Partial<ImagesState>;
}

export type ImagesDispatch = (dispatch: ImagesAction) => ImagesAction;
