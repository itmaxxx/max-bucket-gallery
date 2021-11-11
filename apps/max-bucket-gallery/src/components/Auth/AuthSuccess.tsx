import { useQuery } from '../../hooks/useQuery';
import { request } from '../../utils/request';
import { Button } from '@mui/material';

export const AuthSuccess = () => {
  const query = useQuery();

  const handleQuery = async () => {
    const result = await request(
      process.env.NX_BACKEND_URL + '/api/private',
      'GET',
      null,
      {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${query.get('token')}`,
      }
    );

    console.log({ result });

    alert(result.message);
  };

  return (
    <div>
      {query.get('token') ? (
        <div>
          Authorized
          <Button variant="contained" onClick={handleQuery}>
            test
          </Button>
        </div>
      ) : (
        'Not authorized'
      )}
    </div>
  );
};
