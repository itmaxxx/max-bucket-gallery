import { User } from '@max-bucket-gallery/api-interfaces';

export interface RootState {
  user: UserState;
}

// User state

export interface UserState {
  user: User | null;
  loggedIn: boolean;
}

export interface UserAction {
  type: string;
  payload?: { user?: User; loggedIn?: boolean };
}

export type UserDispatch = (dispatch: UserAction) => UserAction;
