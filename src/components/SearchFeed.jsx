import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';

import { fetchFromAPI } from '../utils/fetchFromAPI';
import Videos from './Videos';

const SearchFeed = () => {
  const [videos, setVideos] = useState([]);
  const { searchTerm } = useParams();

  useEffect(() => {
    setVideos([]); // Reset videos to show Loader
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`)
      .then((data) => setVideos(data.items))
      .catch((error) => console.error('Error fetching search results:', error));
  }, [searchTerm]);

  return (
    <Box p={3} sx={{ overflowY: 'auto', height: '90vh', flex: 2, background: '#000' }}>
      <Typography variant="h4" fontWeight="bold" mb={3} sx={{ color: 'white', fontFamily: "'Outfit', sans-serif" }}>
        Search Results for <span style={{ color: '#FC1507' }}>{searchTerm}</span> videos
      </Typography>

      <Box display="flex">
        <Box sx={{ mr: { sm: '100px' } }}/>
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default SearchFeed;
