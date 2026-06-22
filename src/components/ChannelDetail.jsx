import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Tabs, Tab, Avatar, Typography, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import Videos from './Videos';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import { mockChannelDetail } from '../utils/mockData';

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  const { id } = useParams();

  useEffect(() => {
    // Reset state on ID change
    setChannelDetail(null);
    setVideos([]);
    setActiveTab(0);
    setIsSubscribed(false);

    // Fetch Channel statistics/info
    fetchFromAPI(`channels?part=snippet,statistics&id=${id}`)
      .then((data) => setChannelDetail(data?.items[0]))
      .catch((error) => console.error('Error fetching channel details:', error));

    // Fetch Channel videos
    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
      .then((data) => setVideos(data?.items))
      .catch((error) => console.error('Error fetching channel videos:', error));
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const channelTitle = channelDetail?.snippet?.title || 'Marvel Studios';
  
  // Resolve channel avatar from mock statistics or fallback initials
  const resolvedAvatar = channelDetail?.snippet?.thumbnails?.high?.url || 
    mockChannelDetail[id]?.snippet?.thumbnails?.high?.url ||
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(channelTitle)}&backgroundType=gradientLinear`;

  const resolvedSubscribers = channelDetail?.statistics?.subscriberCount ? 
    `${(parseInt(channelDetail.statistics.subscriberCount) / 1000000).toFixed(2)}M subscribers` : 
    '20.4M subscribers';

  const resolvedVideosCount = channelDetail?.statistics?.videoCount ? 
    channelDetail.statistics.videoCount : 
    '2.4K';

  return (
    <Box minHeight="95vh" sx={{ background: '#0f0f0f' }}>
      <Box>
        {/* Banner with a gorgeous, high-fidelity dark-red developer gradient */}
        <div style={{
          background: 'linear-gradient(90deg, #FC1507 0%, #800A03 50%, #1e1e1e 100%)',
          zIndex: 10,
          height: '200px'
        }} />
        
        {/* Channel Info Header Layout (Horizontal align like actual YouTube) */}
        <Box 
          sx={{ 
            px: { xs: 3, md: '72px' }, 
            pt: 3, 
            pb: 2, 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            alignItems: { xs: 'start', md: 'center' }, 
            gap: 4 
          }}
        >
          {/* Avatar Profile */}
          <Avatar 
            src={resolvedAvatar} 
            alt={channelTitle} 
            imgProps={{
              onError: (e) => {
                e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(channelTitle)}&backgroundType=gradientLinear`;
              }
            }}
            sx={{ 
              width: { xs: 100, md: 128 }, 
              height: { xs: 100, md: 128 }, 
              border: '2px solid #1f1f1f',
              boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
            }} 
          />
          
          {/* Description details */}
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant="h4" 
              fontWeight="bold" 
              sx={{ 
                fontFamily: "'Outfit', sans-serif", 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1, 
                color: '#fff',
                fontSize: { xs: '28px', md: '36px' }
              }}
            >
              {channelTitle}
              <CheckCircleIcon sx={{ fontSize: '22px', color: '#aaa', ml: 0.5 }} />
            </Typography>
            
            <Typography variant="subtitle1" color="gray" sx={{ mt: 0.5, fontSize: '14px', fontFamily: "'Inter', sans-serif" }}>
              @{channelTitle.toLowerCase().replace(/\s+/g, '')} • {resolvedSubscribers} • {resolvedVideosCount} videos
            </Typography>
            
            <Typography 
              variant="body2" 
              color="#aaa" 
              sx={{ 
                mt: 1, 
                maxWidth: '650px', 
                fontSize: '13px', 
                fontFamily: "'Inter', sans-serif", 
                lineHeight: 1.6 
              }}
            >
              {channelDetail?.snippet?.description || 'Learn and enjoy high-quality entertainment clips, official movie trailers, and behind-the-scenes content.'}
            </Typography>
            
            {/* Subscribe pill button */}
            <Button
              variant="contained"
              onClick={() => setIsSubscribed(!isSubscribed)}
              sx={{
                mt: 2,
                backgroundColor: isSubscribed ? '#272727' : '#ffffff',
                color: isSubscribed ? '#ffffff' : '#000000',
                fontWeight: 'bold',
                borderRadius: '20px',
                px: 3.5,
                py: 0.8,
                '&:hover': {
                  backgroundColor: isSubscribed ? '#3f3f3f' : '#e0e0e0',
                }
              }}
            >
              {isSubscribed ? 'Subscribed' : 'Subscribe'}
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Navigation Tabs (Videos, Playlists, About) */}
      <Box sx={{ borderBottom: '1px solid #1f1f1f', mb: 3, px: { xs: 2, md: '72px' } }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange} 
          textColor="primary"
          indicatorColor="primary"
          sx={{
            '& .MuiTab-root': {
              color: '#aaa',
              fontWeight: 'bold',
              fontFamily: "'Inter', sans-serif",
              fontSize: '15px',
              textTransform: 'none',
              minWidth: '100px'
            },
            '& .Mui-selected': {
              color: '#fff !important'
            }
          }}
        >
          <Tab label="Videos" />
          <Tab label="Playlists" />
          <Tab label="About" />
        </Tabs>
      </Box>
      
      {/* Videos List Grid */}
      <Box display="flex" p={2} sx={{ px: { xs: 2, md: '72px' } }}>
        {activeTab === 0 && <Videos videos={videos} />}
        {activeTab === 1 && (
          <Box sx={{ color: '#aaa', p: 4, textAlign: 'center', width: '100%', fontFamily: "'Inter', sans-serif" }}>
            No playlists found for this channel.
          </Box>
        )}
        {activeTab === 2 && (
          <Box sx={{ color: '#fff', py: 2, width: '100%', maxWidth: '800px', fontFamily: "'Inter', sans-serif", lineHeight: 1.8 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ fontSize: '18px' }}>
              Description
            </Typography>
            <Typography variant="body2" color="gray" paragraph sx={{ fontSize: '14px' }}>
              {channelDetail?.snippet?.description || 'Learn and enjoy high-quality entertainment clips, official movie trailers, and behind-the-scenes content.'}
            </Typography>
            <Typography variant="h6" fontWeight="bold" sx={{ mt: 3, fontSize: '18px' }} gutterBottom>
              Stats
            </Typography>
            <Typography variant="body2" color="gray" sx={{ fontSize: '14px' }}>
              Joined: Oct 1, 2019
              <br />
              Total Views: {parseInt(channelDetail?.statistics?.viewCount || '285091240').toLocaleString()} views
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ChannelDetail;
