import * as React from 'react';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Copyright from './Copyright';
import AppBar from './components/AppBar';
import { useState } from 'react';
import getLPTheme from './getLPTheme';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Divider from '@mui/material/Divider';
import Hero from './sections/Hero';
import SearchMovies from './components/SearchMovies';
import { AuthContextProvider } from './context/AuthContext';
import Footer from './sections/Footer';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import MovieList from './components/MovieList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lists from './sections/Lists';

function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100dvw',
        position: 'fixed',
        bottom: 24,
      }}
    >
      <ToggleButtonGroup
        value={showCustomTheme}
        exclusive
        onChange={toggleCustomTheme}
        aria-label="custom theme toggle"
      >
        <ToggleButton value="light" aria-label="light mode">
          Light
        </ToggleButton>
        <ToggleButton value="dark" aria-label="dark mode">
          Dark
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

ToggleCustomTheme.propTypes = {
  showCustomTheme: PropTypes.bool.isRequired,
  toggleCustomTheme: PropTypes.func.isRequired,
};

export default function App() {
  const [mode, setMode] = React.useState('dark');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  return (
    <AuthContextProvider>
       <ToastContainer 
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
       
       />
      <ThemeProvider theme={LPtheme}>
        <CssBaseline />

        <AppBar mode={mode} toggleColorMode={toggleColorMode} />

        <Box sx={{ width: '100%' }}>
          <Routes>
            <Route path="/lists/:listId" element={<Lists />} />
            <Route path="/" element={
              <>
                <Hero sx={{ width: '100%' }} />
                <Container sx={{ width: '90%', mx: 'auto' }}>
                  <MovieList />
                  <SearchMovies search="Trending" />
                  <SearchMovies search="Romantic" />
                  <SearchMovies search="Horror" />
                  <SearchMovies search="Comedy" />
                </Container>
                {/* <ToggleCustomTheme showCustomTheme={showCustomTheme} toggleCustomTheme={toggleCustomTheme} /> */}
              </>
            } />
          </Routes>
        </Box>

        <Footer />
      </ThemeProvider>
     
    </AuthContextProvider>
  );
}
