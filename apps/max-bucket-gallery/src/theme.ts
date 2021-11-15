import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#6a1b9a',
    },
    secondary: {
      main: '#651fff',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
