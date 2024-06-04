import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import MovieCard from '../components/MovieCard';
import { ref, get, child } from 'firebase/database';
import { db } from '../firebase';

function Lists() {
  const { listId } = useParams();
  const [list, setList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const listRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchList = async () => {
      try {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, `public/${encodeURIComponent(listId)}`));

        if (snapshot.exists()) {
          const listData = snapshot.val();
          setList(listData);
        } else {
          // List not found, navigate back to home or another page
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching list:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchList();
  }, [listId, navigate]);

  useEffect(() => {
    if (listRef.current && !isLoading) {
      listRef.current.focus();
    }
  }, [isLoading]);

  return (
    <Box
      ref={listRef}
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        mx: 'auto',
        overflowY: 'auto', // Add vertical scroll if content overflows
      }}
      tabIndex={-1}
    >
      {isLoading ? (
        <CircularProgress sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            
        }}/> 
      ) : (
        list ? (
          <>
            <Typography variant="h4" sx={{ p: 2 }}>{list.title}</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, p: 2, justifyContent: 'center' }}>
              {list.movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </Box>
          </>
        ) : <Box>
            <Typography variant="h4" sx={{ p: 2 }}>List not found</Typography>
            <Typography variant="body1" sx={{ p: 2 }}>The list you are looking for does not exist.</Typography>
        </Box> // Don't render anything if the list is not found
      )}
    </Box>
  );
}

export default Lists;
