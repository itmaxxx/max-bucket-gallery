import { Button } from "@mui/material";
import { useDispatch } from 'react-redux';
import { userLogout } from '../../store/actions/user';

const LogoutBtn = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(userLogout());
  }

  return (
    <Button variant="outlined" color="error" onClick={handleLogout}>Logout</Button>
  )
};

export default LogoutBtn;
