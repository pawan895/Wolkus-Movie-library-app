import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, InputBase, Paper, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import OmdbService from '../services/OmdbService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchBar from '../components/SearchBar';
import { ref, set, push } from 'firebase/database';
import { db } from '../firebase';
import { UserAuth } from '../context/AuthContext';

export default function CreateListModal({ open, onClose }) {
  const [listName, setListName] = useState('');
  const [visibility, setVisibility] = useState('public');
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [listUrl, setListUrl] = useState('');

  const { user, logOut } = UserAuth();

  useEffect(() => {
    if (listName && visibility === 'public') {
      const url = `https://wolkus-movie-library-app.vercel.app/lists/${encodeURIComponent(listName)}`;
      setListUrl(url);
    } else {
      setListUrl('');
    }
  }, [listName, visibility]);

  const handleSearchChange = async (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value) {
      try {
        const { movies } = await OmdbService.searchMovies(e.target.value);
        setMovies(movies);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addMovieToList = (movie) => {
    setSelectedMovies([...selectedMovies, movie]);
    toast.success(`${movie.Title} added to the list!`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle list creation logic
    console.log(listName, visibility, selectedMovies);
    const userData = {
      title: listName,
      visibility: visibility,
      movies: selectedMovies,
    };
    const dbRefUser = push(ref(db, `users/${user.uid}`));
    const dbRefPublic = ref(db, `public/${encodeURIComponent(listName)}`);

    // onClose();
    try{
      await set(dbRefUser, userData);
      if(visibility === 'public'){
      await set(dbRefPublic, userData);
      }
    toast.success('List created successfully 👍');

    }catch (error) {
      console.log(error);
      toast.error('Failed to create list 😢');
    }

  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80vw',
    bgcolor: 'background.paper',
    border: '2px solid #434343',
    boxShadow: 24,
    borderRadius: 8,
    p: 4,
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box sx={modalStyle}>
          <Typography variant="h5" sx={{ mb: 2 }}>Create your movie list</Typography>
          <Box sx={{ display: 'flex', gap: 4 }}>
            <form onSubmit={handleSubmit} style={{ flex: 1 }}>
              <TextField
                label="List Name"
                value={listName}
                variant="outlined"
                onChange={(e) => setListName(e.target.value)}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <RadioGroup value={visibility} onChange={(e) => setVisibility(e.target.value)} row sx={{ mb: 2 }}>
                <FormControlLabel value="public" control={<Radio />} label="Public" />
                <FormControlLabel value="private" control={<Radio />} label="Private" />
              </RadioGroup>
              <Button type="submit" variant='contained' fullWidth>Create List</Button>
            </form>
            <Box sx={{ flex: 2 }}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SearchIcon sx={{ color: '#text.primary', mr: 1 }} />
                  <InputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchQuery}
                    onChange={handleSearchChange}
                    sx={{
                      color: 'text.primary',
                      flex: 1,
                      border: '1px solid',
                      borderColor: (theme) => theme.palette.divider,
                      borderRadius: '16px',
                      padding: '4px 12px',
                    }}
                  />
                </Box>
                <SearchBar movies={movies} addMovieToList={addMovieToList} />
              </Paper>
            </Box>
          </Box>
          {visibility === 'public' && listUrl && (
            <Typography variant="body2" sx={{ position: 'absolute', bottom: 8, left: 8 }}>
              Share this URL: <a href={listUrl} target="_blank" rel="noopener noreferrer">{listUrl}</a>
            </Typography>
          )}
        </Box>
      </Modal>
      
    </>
  );
}
