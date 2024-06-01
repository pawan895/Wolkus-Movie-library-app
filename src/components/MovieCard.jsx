import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Button } from '@mui/material';
import PropTypes from 'prop-types';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

function MovieCard({ movie }) {
  const { Poster, Title, Year, Type } = movie;

  const handlePlayClick = () => {
    // Scroll to the 'Play' section
    const playSection = document.getElementById('Play');
    if (playSection) {
      playSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMoreInfoClick = () => {
    // Scroll to the 'More Info' section
    const moreInfoSection = document.getElementById('MoreInfo');
    if (moreInfoSection) {
      moreInfoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Card 
      sx={{ 
        width: 200, 
        height: 300,
        m: 2,
        display: 'flex', 
        flexDirection: 'column', 
        borderRadius: '8px', 
        overflow: 'hidden', 
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', 
        transition: 'transform 0.3s', 
        '&:hover': {
          transform: 'scale(1.05)', 
        },
      }}
    >
      <CardMedia
        component="img"
        height="220" 
        image={Poster !== 'N/A' ? Poster : '/path/to/default/image.jpg'} 
        alt={Title}
        sx={{ objectFit: 'cover' }} 
      />
      <CardContent sx={{ flexGrow: 1 }}> 
        <Typography variant="h6" component="div">
          {Title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {Year} • {Type}
        </Typography>
      </CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-around', padding: '8px' }}>
        <Button variant="contained" startIcon={<PlayArrowIcon />} onClick={handlePlayClick}>
          Play
        </Button>
        <Button variant="outlined" startIcon={<InfoOutlinedIcon />} onClick={handleMoreInfoClick}>
          More Info
        </Button>
      </Box>
    </Card>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Poster: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired,
    Type: PropTypes.string.isRequired,
  }).isRequired,
};

export default MovieCard;
