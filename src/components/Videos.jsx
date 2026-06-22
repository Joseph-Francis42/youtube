import React from 'react';
import { Box } from '@mui/material';

import VideoCard from './VideoCard';
import ChannelCard from './ChannelCard';
import Loader from './Loader';

const Videos = ({ videos, direction }) => {
  if (!videos?.length) return <Loader />;
  
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: direction === 'column' 
          ? '1fr' 
          : {
              xs: '1fr', // 1 column on mobile
              sm: '1fr 1fr', // 2 columns on tablet
              md: '1fr 1fr 1fr', // 3 columns on small desktops
              lg: '1fr 1fr 1fr 1fr' // 4 columns on large desktops
            },
        gap: '24px 16px', // Generous YouTube card margins
        width: '100%',
        justifyContent: 'start',
        alignItems: 'start'
      }}
    >
      {videos.map((item, idx) => {
        const isVideo = typeof item.id === 'string' || item.id?.videoId;
        const isChannel = item.id?.channelId;
        
        return (
          <Box key={idx} sx={{ width: '100%' }}>
            {isVideo && <VideoCard video={item} />}
            {isChannel && <ChannelCard channelDetail={item} />}
          </Box>
        );
      })}
    </Box>
  );
};

export default Videos;
