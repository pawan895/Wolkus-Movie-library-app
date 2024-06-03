import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import heroImage from '../assets/bg/bgHero.jpeg'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function Hero() {


    const heroStyles = {
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        position: 'relative',
        mb: 2,
    };

    const overlayStyles = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // 60% opacity black overlay
    };

    return (
        <Box sx={heroStyles}>
            <Box sx={overlayStyles}>
                {/* Your hero content here (title, buttons, etc.) */}

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh', // This makes the box take up the full viewport height
                    }}
                >
                    <Typography variant="h2" component="h1" color="common.white" sx={{ textAlign: 'center' }}>
                        Discover Your Next Favorite Movie
                    </Typography>

                    <Button variant="contained" color="primary" endIcon={<ArrowForwardIcon />} sx={{ mt: 2 }}>
                        Explore Now
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default Hero;
