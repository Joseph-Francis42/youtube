import React, { useState, useEffect } from 'react';
import { Box, Stack } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import { fetchFromAPI } from '../utils/fetchFromAPI';
import Sidebar from './Sidebar';
import CategoryTags from './CategoryTags';
import Videos from './Videos';

const Feed = ({ sidebarExpanded }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get active category from URL search parameters, fallback to 'New'
  const selectedCategory = searchParams.get('category') || 'New';

  const setSelectedCategory = (categoryName) => {
    setSearchParams({ category: categoryName });
  };

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    setVideos([]); // Reset videos list to trigger Loader during transitions
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
      .then((data) => setVideos(data.items))
      .catch((error) => console.error('Error fetching category videos:', error));
  }, [selectedCategory]);

  return (
    <Stack sx={{ flexDirection: 'row', background: '#0f0f0f', minHeight: 'calc(100vh - 70px)' }}>
      {/* Sidebar - responsive collapsed/expanded states */}
      <Sidebar 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
        expanded={sidebarExpanded} 
      />

      {/* Main Feed Content */}
      <Box 
        p={2.5} 
        sx={{ 
          overflowY: 'auto', 
          height: 'calc(100vh - 70px)', 
          flex: 1, 
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': { width: '8px' },
          backgroundColor: '#0f0f0f',
          pb: { xs: '80px', md: '20px' } // Add bottom padding on mobile so content isn't covered by bottom nav
        }}
      >
        {/* Horizontal scrollable tags bar */}
        <CategoryTags 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory} 
        />

        {/* Video Grid */}
        <Videos videos={videos} />
      </Box>
    </Stack>
  );
};

export default Feed;
