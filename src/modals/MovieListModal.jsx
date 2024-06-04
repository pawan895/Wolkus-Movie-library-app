import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import { ref, get } from 'firebase/database';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

export default function MovieListModal({ open, onClose }) {
  const [lists, setLists] = useState([]); // Store lists as an array of objects

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const dbRefPublic = ref(db, `public/`);
        const snapshot = await get(dbRefPublic);

        if (snapshot.exists()) {
          const rawLists = snapshot.val();
          const formattedLists = Object.keys(rawLists).map((key) => ({
            id: key,
            ...rawLists[key],
            title: decodeURIComponent(rawLists[key].title), // Decode title
          }));
          console.log(formattedLists);
          setLists(formattedLists);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (open) {
        fetchLists();
      }
  }, [open]);

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',  // Center horizontally and vertically
    width: '80vh', // Use a percentage for responsive width
   
    bgcolor: 'background.paper',
    border: '2px solid #434343',  // Nice border (adjust color/width as needed)
    boxShadow: 24,
    borderRadius: 8,
    p: 4,
    outline: 'none', // Remove outline
    overflowY: 'auto', // Allow scrolling if content is too long
    maxHeight: '80vh', // Maximum height to fit within the viewport
  };

  const cardStyle = {
    height: '100%',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit', // Inherit color to ensure link text color matches the theme
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box sx={modalStyle}>
          <Typography variant="h5" gutterBottom>
            Public Movie Lists
          </Typography>
          <Grid container spacing={2}>
            {lists.map((list) => (
              <Grid item xs={12} sm={6} md={4} key={list.id}>
                <Link to={`/lists/${list.id}`} style={linkStyle}>
                  <Card sx={cardStyle}>
                    <CardContent>
                      <Typography variant="h6" component="div">
                        {list.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {list.movies.length} Movies
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Modal>
      <ToastContainer position="bottom-right" />
    </>
  );
}
