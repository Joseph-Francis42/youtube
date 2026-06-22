import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Typography, Box, Stack, Button, Avatar, IconButton, Divider, TextField } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ShareIcon from '@mui/icons-material/Share';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import Videos from './Videos';
import Loader from './Loader';
import { fetchFromAPI } from '../utils/fetchFromAPI';
import { mockChannelDetail } from '../utils/mockData';

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [channelStats, setChannelStats] = useState(null);
  const [videos, setVideos] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCountOffset, setLikesCountOffset] = useState(0);
  const [newComment, setNewComment] = useState('');
  
  const [commentsList, setCommentsList] = useState([
    {
      author: 'John Doe',
      username: '@johndoe_dev',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=John%20Doe',
      time: '2 hours ago',
      text: 'This explanation of React and Material UI is top-notch! Loving the clean code structure.',
      likes: 42
    },
    {
      author: 'Sarah Connor',
      username: '@sarah_c',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Sarah%20Connor',
      time: '1 day ago',
      text: 'Does this template support live data when deployed? Looks great so far.',
      likes: 18
    },
    {
      author: 'Alex River',
      username: '@alex_river',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Alex%20River',
      time: '3 days ago',
      text: 'Incredible speed! Vite is indeed the next-generation frontend tool.',
      likes: 7
    }
  ]);
  
  const { id } = useParams();

  useEffect(() => {
    // Reset state on ID change
    setVideoDetail(null);
    setChannelStats(null);
    setVideos([]);
    setIsSubscribed(false);
    setIsLiked(false);
    setLikesCountOffset(0);

    // Fetch video detail
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => {
        const detail = data.items[0];
        setVideoDetail(detail);

        // Fetch channel details for avatar & subscriber counts
        if (detail?.snippet?.channelId) {
          fetchFromAPI(`channels?part=snippet,statistics&id=${detail.snippet.channelId}`)
            .then((chData) => setChannelStats(chData?.items[0]))
            .catch((err) => console.error('Error fetching channel statistics:', err));
        }
      })
      .catch((error) => console.error('Error fetching video detail:', error));

    // Fetch related videos
    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => setVideos(data.items))
      .catch((error) => console.error('Error fetching related videos:', error));
  }, [id]);

  const handleSubscribeToggle = () => {
    setIsSubscribed(prev => !prev);
  };

  const handleLikeToggle = () => {
    if (isLiked) {
      setLikesCountOffset(0);
      setIsLiked(false);
    } else {
      setLikesCountOffset(1);
      setIsLiked(true);
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const added = {
      author: 'You',
      username: '@current_user',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=You',
      time: 'Just now',
      text: newComment,
      likes: 0
    };

    setCommentsList([added, ...commentsList]);
    setNewComment('');
  };

  if (!videoDetail?.snippet) return <Loader />;

  const { snippet: { title, channelId, channelTitle, description }, statistics: { viewCount, likeCount } } = videoDetail;

  // Resolve channel avatar from statistics or mock database
  const resolvedChannelAvatar = channelStats?.snippet?.thumbnails?.high?.url || 
    mockChannelDetail[channelId]?.snippet?.thumbnails?.high?.url ||
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(channelTitle)}&backgroundType=gradientLinear`;

  const resolvedSubscribers = channelStats?.statistics?.subscriberCount ? 
    `${(parseInt(channelStats.statistics.subscriberCount) / 1000000).toFixed(2)}M subscribers` : 
    '1.24M subscribers';

  const totalLikes = parseInt(likeCount || '5000') + likesCountOffset;

  return (
    <Box minHeight="95vh" sx={{ background: '#0f0f0f', p: { xs: 1, sm: 2, md: 3 } }}>
      <Stack direction={{ xs: 'column', lg: 'row' }} spacing={4}>
        
        {/* Left Section: Video Player & Metadata */}
        <Box sx={{ flex: 1, width: '100%' }}>
          {/* Widescreen player wrapper */}
          <Box 
            sx={{ 
              width: '100%', 
              borderRadius: '16px', 
              overflow: 'hidden', 
              background: '#000', 
              aspectRatio: '16/9',
              boxShadow: '0 4px 20px rgba(0,0,0,0.8)'
            }}
          >
            {/* Direct YouTube Iframe Embed renders the official player with quality, speed, and settings gear controls */}
            <iframe
              key={id}
              title={title}
              src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1`}
              width="100%"
              height="100%"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
          </Box>

          {/* Video Title */}
          <Typography color="#fff" variant="h5" fontWeight="bold" sx={{ mt: 2.5, px: 1, fontFamily: "'Outfit', sans-serif" }}>
            {title}
          </Typography>

          {/* Details Row: Channel Info & Action Buttons */}
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            justifyContent="space-between" 
            alignItems={{ xs: 'start', sm: 'center' }}
            gap={2.5}
            sx={{ color: '#fff', py: 2, px: 1 }}
          >
            {/* Channel Details & Subscribe */}
            <Stack direction="row" alignItems="center" gap={2}>
              <Link to={`/channel/${channelId}`}>
                <Avatar 
                  src={resolvedChannelAvatar} 
                  alt={channelTitle} 
                  sx={{ width: 44, height: 44, border: '1px solid #1f1f1f' }} 
                />
              </Link>
              <Box>
                <Link to={`/channel/${channelId}`} style={{ textDecoration: 'none' }}>
                  <Typography variant="h6" color="#FFF" sx={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '16px', fontFamily: "'Inter', sans-serif" }}>
                    {channelTitle}
                    <CheckCircleIcon sx={{ fontSize: '14px', color: '#aaa' }} />
                  </Typography>
                </Link>
                <Typography variant="caption" color="gray" sx={{ fontSize: '12px', fontFamily: "'Inter', sans-serif" }}>
                  {resolvedSubscribers}
                </Typography>
              </Box>

              {/* YouTube Subscribe Pill */}
              <Button
                variant="contained"
                onClick={handleSubscribeToggle}
                sx={{
                  ml: 2,
                  backgroundColor: isSubscribed ? '#272727' : '#ffffff',
                  color: isSubscribed ? '#ffffff' : '#000000',
                  fontWeight: 'bold',
                  borderRadius: '20px',
                  px: 2.5,
                  '&:hover': {
                    backgroundColor: isSubscribed ? '#3f3f3f' : '#e0e0e0',
                  }
                }}
              >
                {isSubscribed ? 'Subscribed' : 'Subscribe'}
              </Button>
            </Stack>

            {/* Like, Share, Download Controls */}
            <Stack direction="row" gap={1} flexWrap="wrap">
              {/* Like / Dislike Pill */}
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  backgroundColor: '#272727', 
                  borderRadius: '20px',
                  overflow: 'hidden'
                }}
              >
                <Button 
                  onClick={handleLikeToggle}
                  startIcon={isLiked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
                  sx={{ 
                    color: '#fff', 
                    py: 1, 
                    pl: 2.5, 
                    pr: 1.5,
                    borderRight: '1px solid #3f3f3f',
                    borderRadius: 0,
                    fontWeight: 'bold',
                    '&:hover': { background: '#3f3f3f' }
                  }}
                >
                  {totalLikes.toLocaleString()}
                </Button>
                <IconButton sx={{ color: '#fff', py: 1, px: 2, borderRadius: 0, '&:hover': { background: '#3f3f3f' } }}>
                  <ThumbDownOutlinedIcon sx={{ fontSize: '20px' }} />
                </IconButton>
              </Box>

              {/* Share Pill */}
              <Button 
                startIcon={<ShareIcon />} 
                sx={{ 
                  backgroundColor: '#272727', 
                  color: '#fff', 
                  borderRadius: '20px', 
                  fontWeight: 'bold', 
                  px: 2.5,
                  py: 1,
                  '&:hover': { background: '#3f3f3f' } 
                }}
              >
                Share
              </Button>

              {/* Download Pill */}
              <Button 
                startIcon={<FileDownloadIcon />} 
                sx={{ 
                  backgroundColor: '#272727', 
                  color: '#fff', 
                  borderRadius: '20px', 
                  fontWeight: 'bold', 
                  px: 2.5,
                  py: 1,
                  '&:hover': { background: '#3f3f3f' },
                  display: { xs: 'none', sm: 'inline-flex' }
                }}
              >
                Download
              </Button>
            </Stack>
          </Stack>

          {/* Description Card */}
          <Box 
            sx={{ 
              background: '#272727', 
              borderRadius: '12px', 
              p: 2, 
              mb: 4,
              '&:hover': { background: '#323232' }
            }}
          >
            <Typography variant="body2" color="#FFF" fontWeight="bold" sx={{ mb: 1, fontFamily: "'Inter', sans-serif" }}>
              {parseInt(viewCount || '10000').toLocaleString()} views • {videoDetail?.snippet?.publishedAt ? new Date(videoDetail.snippet.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'May 15, 2026'}
            </Typography>
            <Typography 
              variant="body2" 
              color="#FFF" 
              sx={{ 
                whiteSpace: 'pre-wrap', 
                lineHeight: '1.6', 
                opacity: 0.9, 
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px' 
              }}
            >
              {description}
            </Typography>
          </Box>

          <Divider sx={{ borderColor: '#272727', mb: 3 }} />

          {/* Real-feel YouTube Comments Section */}
          <Box px={1}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 3, fontSize: '20px', fontFamily: "'Outfit', sans-serif" }}>
              {commentsList.length} Comments
            </Typography>

            {/* Add Comment Input */}
            <Stack direction="row" gap={2} alignItems="start" component="form" onSubmit={handleAddComment} sx={{ mb: 4 }}>
              <Avatar src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80" alt="Current User" sx={{ width: 40, height: 40 }} />
              <Box sx={{ flex: 1 }}>
                <TextField 
                  fullWidth 
                  variant="standard" 
                  placeholder="Add a comment..." 
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  sx={{
                    '& .MuiInput-underline:before': { borderBottomColor: '#3f3f3f' },
                    '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottomColor: '#aaa' },
                    '& .MuiInput-underline:after': { borderBottomColor: '#FC1507' }
                  }}
                />
                
                {newComment.trim() && (
                  <Stack direction="row" gap={1} justifyContent="end" sx={{ mt: 1.5 }}>
                    <Button onClick={() => setNewComment('')} sx={{ color: '#fff', '&:hover': { background: '#272727' } }}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="contained" sx={{ backgroundColor: '#FC1507', color: '#fff', borderRadius: '20px', '&:hover': { backgroundColor: '#c00f05' } }}>
                      Comment
                    </Button>
                  </Stack>
                )}
              </Box>
            </Stack>

            {/* Comments List */}
            <Stack spacing={3}>
              {commentsList.map((comment, index) => (
                <Stack direction="row" gap={2} key={index}>
                  <Avatar src={comment.avatar} alt={comment.author} sx={{ width: 40, height: 40 }} />
                  <Box>
                    <Stack direction="row" alignItems="center" gap={1}>
                      <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#fff', fontSize: '13px', fontFamily: "'Inter', sans-serif" }}>
                        {comment.username}
                      </Typography>
                      <Typography variant="caption" color="gray" sx={{ fontSize: '12px' }}>
                        {comment.time}
                      </Typography>
                    </Stack>
                    <Typography variant="body2" sx={{ mt: 0.5, color: '#fff', fontSize: '14px', fontFamily: "'Inter', sans-serif" }}>
                      {comment.text}
                    </Typography>
                    
                    {/* Comment Actions */}
                    <Stack direction="row" alignItems="center" gap={1.5} sx={{ mt: 1, color: '#aaa' }}>
                      <IconButton size="small" sx={{ color: '#aaa', p: 0.5, '&:hover': { color: '#fff' } }}>
                        <ThumbUpOutlinedIcon sx={{ fontSize: '16px' }} />
                      </IconButton>
                      <Typography variant="caption" sx={{ fontSize: '12px' }}>
                        {comment.likes}
                      </Typography>
                      <IconButton size="small" sx={{ color: '#aaa', p: 0.5, '&:hover': { color: '#fff' } }}>
                        <ThumbDownOutlinedIcon sx={{ fontSize: '16px' }} />
                      </IconButton>
                      <Button size="small" sx={{ color: '#fff', textTransform: 'none', fontSize: '12px', fontWeight: 'bold' }}>
                        Reply
                      </Button>
                    </Stack>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Box>

        </Box>

        {/* Right Section: Related Videos Side Bar */}
        <Box 
          px={{ xs: 1, lg: 2 }} 
          py={1} 
          sx={{ 
            width: { xs: '100%', lg: '360px', xl: '400px' },
            flexShrink: 0
          }}
        >
          <Typography variant="h6" fontWeight="bold" color="#fff" mb={2} sx={{ fontSize: '18px', fontFamily: "'Outfit', sans-serif" }}>
            Up Next
          </Typography>
          <Videos videos={videos} direction="column" />
        </Box>

      </Stack>
    </Box>
  );
};

export default VideoDetail;
