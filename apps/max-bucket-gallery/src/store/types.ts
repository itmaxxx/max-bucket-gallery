import { User } from '@max-bucket-gallery/api-interfaces';

export interface RootState {
  user: UserState;
}

// Auth

export interface UserState {
  user: User | null;
  isLogined: boolean;
}

export interface UserAction {
  type: string;
  payload: { user?: User; isLogined?: boolean; };
}
