import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';

const SearchBar = ({ movies, addMovieToList }) => {
  const [addedMovies, setAddedMovies] = useState([]);

  const handleAddMovie = (movie) => {
    addMovieToList(movie);
    setAddedMovies([...addedMovies, movie]);
    console.log('Movie added:', movie);
  };

  return (
    <Box sx={{ maxHeight: '400px', overflowY: 'auto', width: '100%' }}>
      {movies.map((movie) => (
        <Card key={movie.imdbID} sx={{ display: 'flex', mb: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 1 }}>
            <img src={movie.Poster} alt="" style={{ width: 50, height: 75, objectFit: 'cover' }} />
          </Box>
          <CardContent sx={{ flex: 1 }}>
            <Typography variant="h6">{movie.Title}</Typography>
            <Typography variant="body2">{movie.Year}</Typography>
          </CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
            <Button disabled={addedMovies.includes(movie.imdbID)} onClick={() => handleAddMovie(movie)}>
              {addedMovies.includes(movie) ? 'Added' : 'Add'}
            </Button>
          </Box>
        </Card>
      ))}
    </Box>
  );
};

export default SearchBar;
