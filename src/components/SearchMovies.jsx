import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button } from '@mui/material';
import MovieCard from './MovieCard';
import PropTypes from 'prop-types';
import OmdbService from '../services/OmdbService.js';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function SearchMovies(props) {
    const [movies, setMovies] = useState([]);
    const [visibleMovies, setVisibleMovies] = useState([]);
    const movieContainerRef = useRef(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await OmdbService.searchMovies(props.search); // Initial fetch
                setMovies(response.movies);
                setVisibleMovies(response.movies.slice(0, 6));
            } catch (error) {
                console.error(error);
                // Handle error (display error message, etc.)
            }
        };

        fetchMovies();
    }, [props.search]);

    const handleScroll = (direction) => {
        if (movieContainerRef.current) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            movieContainerRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth',
            });

            const newStartIndex = Math.max(0, Math.floor((movieContainerRef.current.scrollLeft + scrollAmount) / 200)); // Adjust the movie card width
            setVisibleMovies(movies.slice(newStartIndex, newStartIndex + 6));
        }
    };

    return (
        <>
            <Typography variant="h4" component="h4" gutterBottom sx={{
                fontSize: 24,
                paddingTop: 2,
                
            }}>
                {props.search} Movies
            </Typography>
            <hr style={{
                color: '#000000',
                backgroundColor: '#000000',
                height: 1,
                borderColor: '#000000',
                width: '100%',
                marginBottom: 20,
            }}/>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button onClick={() => handleScroll('left')}>
                    <ArrowBackIosIcon />
                </Button>
                <Box
                    ref={movieContainerRef}
                    sx={{
                        display: 'flex',
                        overflowX: 'auto',
                        scrollSnapType: 'x mandatory',
                        scrollBehavior: 'smooth', // Enable smooth scrolling
                        '& > *': { scrollSnapAlign: 'start' },
                        padding: 2,
                        flex: 1,
                        position: 'relative',
                        '&::-webkit-scrollbar': { display: 'none' }, // Hide scrollbar
                        msOverflowStyle: 'none',  // Hide scrollbar for IE and Edge
                        scrollbarWidth: 'none',  // Hide scrollbar for Firefox
                        transition: 'all 0.3s ease-in-out' // Smooth transition for scroll
                    }}
                >
                    {visibleMovies.map((movie) => (
                        <MovieCard key={movie.imdbID} movie={movie} />
                    ))}
                </Box>
                <Button onClick={() => handleScroll('right')}>
                    <ArrowForwardIosIcon />
                </Button>
            </Box>
        </>
    );
}

SearchMovies.propTypes = {
    search: PropTypes.string.isRequired,
};

export default SearchMovies;
