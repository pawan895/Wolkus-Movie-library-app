import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import GoogleButton from 'react-google-button'; // For Google SSO (optional)
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserAuth } from '../context/AuthContext';

export default function SignInModal({ open, onClose }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { googleSignIn, user, signInwithMail } = UserAuth();
  

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      await signInwithMail(email, password);
      onClose();
    //   toast.success('Successfully signed in 👍');
    } catch (error) {
      console.log(error);
    //   toast.error('Failed to sign in 😢');
    }
   

   
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
         
      
      onClose();
      toast.success('Successfully signed in 👍');
    } catch (error) {
         console.log(error);
        toast.error('Failed to sign in 😢');
    }
  };

  

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',  // Center horizontally and vertically
    width: 400, // Adjust width as needed
    bgcolor: 'background.paper',
    border: '2px solid #434343',  // Nice border (adjust color/width as needed)
    boxShadow: 24,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    p: 4,
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h5">Sign In</Typography>
        <form onSubmit={handleSubmit}
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
          <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField label="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          
          <Button type="submit" variant='contained' sx={{m:2}}>Sign In</Button>
          
          
        </form>
        <hr style={{
                color: '#000000',
                backgroundColor: '#000000',
                height: 1,
                borderColor: '#000000',
                width: '100%',
                marginBottom: 20,
            }}/>

        <GoogleButton onClick={handleGoogleSignIn} style={{
            borderRadius: 8,
        }}/>
      </Box>
    </Modal>
  );
}
