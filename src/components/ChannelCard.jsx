import React from 'react';
import { Box, CardContent, CardMedia, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from 'react-router-dom';
import { demoProfilePicture } from '../utils/constants';

const ChannelCard = ({ channelDetail, marginTop }) => {
  const channelTitle = channelDetail?.snippet?.title || 'Channel';
  
  return (
    <Box
      sx={{
        boxShadow: 'none',
        borderRadius: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: { xs: '100%', md: '320px' },
        height: '326px',
        margin: 'auto',
        marginTop,
      }}
    >
      <Link to={`/channel/${channelDetail?.id?.channelId || channelDetail?.id}`} style={{ textDecoration: 'none' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', color: '#fff' }}>
          <CardMedia
            component="img"
            image={channelDetail?.snippet?.thumbnails?.high?.url || demoProfilePicture}
            alt={channelTitle}
            onError={(e) => {
              e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(channelTitle)}&backgroundType=gradientLinear`;
            }}
            sx={{ 
              borderRadius: '50%', 
              height: '180px', 
              width: '180px', 
              mb: 2, 
              objectFit: 'cover',
              border: '2px solid #e3e3e3',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          />
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', fontFamily: "'Inter', sans-serif" }}>
            {channelTitle}{' '}
            <CheckCircleIcon sx={{ fontSize: '15px', color: 'gray', ml: '2px' }} />
          </Typography>
          {channelDetail?.statistics?.subscriberCount && (
            <Typography sx={{ fontSize: '15px', fontWeight: 500, color: 'gray', mt: 1, fontFamily: "'Inter', sans-serif" }}>
              {parseInt(channelDetail?.statistics?.subscriberCount).toLocaleString('en-US')} Subscribers
            </Typography>
          )}
        </CardContent>
      </Link>
    </Box>
  );
};

export default ChannelCard;
