import {
  AppBar,
  Avatar,
  Box,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, UserState } from '../../store/types';
import { useState, MouseEvent } from 'react';
import { userLogout } from '../../store/actions/user';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const user: UserState = useSelector((state: RootState) => {
    return state.user;
  });

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(userLogout());
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Max Bucket Gallery
          </Typography>
          {user?.loggedIn ? (
            <>
              <Button
                variant="contained"
                disableElevation
                onClick={handleClick}
              >
                <span style={{ marginRight: '8px', marginTop: '2px' }}>
                  {user?.user?.fullName}
                </span>
                <Avatar
                  alt={user?.user?.fullName || 'User'}
                  src={user?.user?.profilePicture}
                />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Link
                to={'/auth/login'}
                style={{ textDecoration: 'none', color: '#fff' }}
              >
                <Button color="inherit" sx={{ marginRight: '8px' }}>
                  Login
                </Button>
              </Link>
              <Link
                to={'/auth/sign-up'}
                style={{ textDecoration: 'none', color: '#fff' }}
              >
                <Button color="inherit">Sign Up</Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
