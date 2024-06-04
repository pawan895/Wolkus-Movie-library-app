import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import MovieIcon from '@mui/icons-material/Movie';
import { UserAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import CreateListModal from '../modals/CreateListModal';


const MovieList = () => {
    const { user } = UserAuth();
    const [isCreateListOpen, setIsCreateListOpen] = React.useState(false);

    const handleCreateListClick = () => {
        if(!user) toast.error('Please sign in to create a list');
        console.log('Create List Clicked');
        setIsCreateListOpen(true);
    }
    return (
        <div>
            <Typography variant="h5" component="h4" sx={{
                p:1,
                fontSize: 24,
            }} >Movie Lists</Typography>


             <hr style={{
                color: '#000000',
                backgroundColor: '#000000',
                height: 1,
                borderColor: '#000000',
                width: '100%',
                marginBottom: 20,
            }}/>
        
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                gap: 10,
            }}>
                <Card sx={{
                    width: 200,
                    height: 150,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'scale(1.1)',
                        cursor: 'pointer',
                    }
                }}
                onClick={handleCreateListClick}
                >
                    <CardContent sx={{ textAlign: 'center' }}>
                        <PlaylistAddIcon sx={{ fontSize: 40, mb: 1 }} />
                        <Typography variant="h5" component="div">
                            Create List
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{
                    width: 200,
                    height: 150,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'scale(1.1)',
                        cursor: 'pointer',
                    }
                }}>
                    <CardContent sx={{ textAlign: 'center' }}>
                        <MovieIcon sx={{ fontSize: 40, mb: 1 }} />
                        <Typography variant="h5" component="div">
                            Explore Movie Lists
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
            <CreateListModal  open={isCreateListOpen} onClose={() => setIsCreateListOpen(false)} />
        </div>
    );
};

export default MovieList;
