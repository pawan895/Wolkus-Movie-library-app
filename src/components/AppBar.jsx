import * as React from 'react';
import PropTypes from 'prop-types';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleColorMode from './ToggleColorMode';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  useMediaQuery,
  useTheme,
  InputBase,
  Container,
  Box,
} from '@mui/material';
import { NoEncryption, Search as SearchIcon } from '@mui/icons-material';
import SignInModal from '../modals/SignInModal';
import SignUpModal from '../modals/SignUpModal';
import { UserAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';


const logoStyle = {
  width: '140px',
  height: 'auto',
  cursor: 'pointer',
};

function AppAppBar({ mode, toggleColorMode }) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [signInOpen, setSignInOpen] = React.useState(false);
  const [signUpOpen, setSignUpOpen] = React.useState(false);
  const { user, logOut } = UserAuth();

 


  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setOpen(false);
    }
  };


  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    toast.warning('Use Create List to search for movies!');
    // You can trigger your search logic here
  };

  const handleModal = (modalType) => {
    if (modalType === 'signin') {
      setSignInOpen(true);
    } else if (modalType === 'signup') {
      setSignUpOpen(true);
    }

  };

  const handleSignOut = async (logOut) => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.4)'
                  : 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow:
                theme.palette.mode === 'light'
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                ml: '-18px',
                px: 0,
              }}
            >
              <Typography variant="body1" color="text.primary"
                sx={{ p: 2, fontWeight: "bold", fontSize: '1.2rem' }}> Wolkus</Typography>
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <MenuItem
                  onClick={() => scrollToSection('Home')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    Home
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => scrollToSection('Movies')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    Movies
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => scrollToSection('Shows')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    Shows
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => scrollToSection('FAQ')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    FAQ
                  </Typography>
                </MenuItem>
                <MenuItem sx={{ py: '6px', px: '12px' }}>
                  <a href='https://pawandevelops.me/' target='_blank' style={{ textDecoration: 'none', }}>
                    <Typography variant="body2" color="text.primary">
                      Hire Me !
                    </Typography>
                  </a>
                </MenuItem>
              </Box>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', mr: 2 }}>
              <SearchIcon sx={{ color: '#text.primary', mr: 1 }} />
              <InputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={searchQuery}
                onChange={handleSearchChange}
                sx={{
                  color: 'text.primary',
                  width: 200, // Adjust width as needed
                  border: '1px solid',  // Add a slim border
                  borderColor: (theme) => theme.palette.divider, // Use the divider color from your theme
                  borderRadius: '16px', // Optional: Add rounded corners
                  padding: '4px 12px', // Optional: Add some padding
                }}
              />
            </Box>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 0.5,
                alignItems: 'center',
              }}
            >
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />

              {!user ? (
                <Box>
                  <Button
                    color="primary"
                    variant="text"
                    size="small"
                    component="a"
                    onClick={() => handleModal('signin')}
                  >
                    Sign in
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    component="a"
                    onClick={() => handleModal('signup')}

                  >
                    Sign up
                  </Button>

                </Box>) :

                (
                <Box sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 2,
                  alignItems: 'center',
                }}>
                <Typography variant="body2" color="text.primary">{user.displayName}
                </Typography>
                 <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  component="a"
                  onClick={() => handleSignOut(logOut)}

                >
                  Log out
                </Button>
                </Box>
               )}

          </Box>



          <SignInModal open={signInOpen} onClose={() => setSignInOpen(false)} />
          <SignUpModal open={signUpOpen} onClose={() => setSignUpOpen(false)} />
          <Box sx={{ display: { sm: '', md: 'none' } }}>
            <Button
              variant="text"
              color="primary"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ minWidth: '30px', p: '4px' }}
            >
              <MenuIcon />
            </Button>



            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
              <Box
                sx={{
                  minWidth: '60dvw',
                  p: 2,
                  backgroundColor: 'background.paper',
                  flexGrow: 1,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'end',
                    flexGrow: 1,
                  }}
                >
                  <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                </Box>
                <MenuItem onClick={() => scrollToSection('Home')}>
                  Home
                </MenuItem>
                <MenuItem onClick={() => scrollToSection('Movies')}>
                  Movies
                </MenuItem>
                <MenuItem onClick={() => scrollToSection('Shows')}>
                  Shows
                </MenuItem>
                <MenuItem onClick={() => scrollToSection('Hire Me')}>
                  Hire Me
                </MenuItem>

                <Divider />
                <MenuItem>
                  <Button
                    color="primary"
                    variant="contained"
                    component="a"
                    href="/material-ui/getting-started/templates/sign-up/"
                    target="_blank"
                    sx={{ width: '100%' }}
                  >
                    Sign up
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button
                    color="primary"
                    variant="outlined"
                    component="a"
                    href="/material-ui/getting-started/templates/sign-in/"
                    target="_blank"
                    sx={{ width: '100%' }}
                  >
                    Sign in
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </div >
  );
}

AppAppBar.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default AppAppBar;