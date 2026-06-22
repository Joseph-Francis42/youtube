import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Card, CardContent, CardMedia, Avatar, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { 
  demoThumbnailUrl, 
  demoVideoUrl, 
  demoVideoTitle, 
  demoChannelUrl, 
  demoChannelTitle 
} from '../utils/constants';
import { mockChannelDetail } from '../utils/mockData';

const VideoCard = ({ video }) => {
  const { id, snippet } = video;
  const videoId = typeof id === 'object' ? id?.videoId : id;
  const channelId = snippet?.channelId;
  const channelTitle = snippet?.channelTitle || demoChannelTitle;
  
  // Resolve channel avatar from mock data, or generate a initials avatar
  const resolvedAvatar = mockChannelDetail[channelId]?.snippet?.thumbnails?.high?.url || 
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(channelTitle)}&backgroundType=gradientLinear`;

  // Generate realistic view count and publish date for presentation
  const randomViews = Math.floor(Math.random() * 850) + 12;
  const randomDays = Math.floor(Math.random() * 11) + 1;
  const mockViewsText = `${randomViews}K views • ${randomDays} days ago`;

  const thumbnailUrl = videoId 
    ? `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg` 
    : (snippet?.thumbnails?.high?.url || demoThumbnailUrl);

  return (
    <Card sx={{ 
      width: '100%', 
      boxShadow: 'none', 
      borderRadius: '0px', 
      backgroundColor: 'transparent',
      mb: 1
    }}>
      {/* Thumbnail with native img component, 16:9 ratio and onError safety */}
      <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
        <Box sx={{ position: 'relative', width: '100%', borderRadius: '12px', overflow: 'hidden' }}>
          <CardMedia 
            component="img"
            image={thumbnailUrl} 
            alt={snippet?.title} 
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500';
            }}
            sx={{ 
              width: '100%', 
              aspectRatio: '16/9', // Widescreen 16:9 format
              height: 'auto',
              objectFit: 'cover',
              transition: 'transform 0.4s ease',
              '&:hover': {
                transform: 'scale(1.02)'
              }
            }} 
          />
          {/* Duration badge */}
          <Box sx={{
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            background: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            px: '6px',
            py: '2px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 'bold',
            fontFamily: "'Inter', sans-serif"
          }}>
            10:24
          </Box>
        </Box>
      </Link>

      <CardContent sx={{ display: 'flex', px: '4px', pt: '12px', pb: '0px', backgroundColor: 'transparent' }}>
        {/* Channel Avatar with onError fallback */}
        <Link to={channelId ? `/channel/${channelId}` : demoChannelUrl}>
          <Avatar 
            src={resolvedAvatar} 
            alt={channelTitle} 
            imgProps={{
              onError: (e) => {
                e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(channelTitle)}`;
              }
            }}
            sx={{ width: 36, height: 36, mr: 1.5, border: '1px solid #1f1f1f' }} 
          />
        </Link>

        {/* Video metadata */}
        <Box sx={{ flex: 1 }}>
          <Link to={videoId ? `/video/${videoId}` : demoVideoUrl} style={{ textDecoration: 'none' }}>
            <Typography 
              variant="subtitle1" 
              fontWeight="bold" 
              color="#FFF"
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                lineHeight: '1.3em',
                height: '2.6em',
                fontFamily: "'Inter', sans-serif",
                fontSize: '15px'
              }}
            >
              {snippet?.title?.replace(/&#39;/g, "'")?.replace(/&quot;/g, '"')?.replace(/&amp;/g, '&') || demoVideoTitle}
            </Typography>
          </Link>

          {/* Channel Name */}
          <Link to={channelId ? `/channel/${channelId}` : demoChannelUrl} style={{ textDecoration: 'none' }}>
            <Typography 
              variant="subtitle2" 
              color="#aaa"
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '4px', 
                mt: '4px',
                fontFamily: "'Inter', sans-serif",
                fontSize: '13px',
                '&:hover': {
                  color: '#FFF'
                }
              }}
            >
              {channelTitle}
              <CheckCircleIcon sx={{ fontSize: '13px', color: '#aaa' }} />
            </Typography>
          </Link>

          {/* Views & Date */}
          <Typography variant="caption" color="gray" sx={{ fontSize: '12px', fontFamily: "'Inter', sans-serif" }}>
            {mockViewsText}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
