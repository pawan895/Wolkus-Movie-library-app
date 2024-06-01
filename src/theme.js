import { createTheme } from '@mui/material/styles';
import { red, blue, green } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: green[500],
    },
    error: {
      main: red[500],
    },
  },
  typography: {
    fontFamily: 'roboto, sans-serif',
  },
});

export default theme;