import { useQuery } from '../../hooks/useQuery';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { userLoginWithJwt } from '../../store/actions/user';
import { Navigate } from 'react-router-dom';

export const AuthSuccess = () => {
  const dispatch = useDispatch();
  const query = useQuery();

  useEffect(() => {
    const token: string = query.get('token') || '';

    if (token && token.length) {

      console.log(token);

      dispatch(userLoginWithJwt(token));
    }
  }, [query]);

  return (
    <div>
      {query.get('token') ? (
        <div>
          Logged in successfully
          <Navigate to="/dashboard" />
        </div>
      ) : (
        'Something went wrong'
      )}
    </div>
  );
};
