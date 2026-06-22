import React from 'react';
import { Box, Button } from '@mui/material';

import { categories } from '../utils/constants';

const CategoryTags = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        overflowX: 'auto',
        pb: 2,
        pt: 1,
        mb: 2,
        gap: 1.5,
        scrollbarWidth: 'none', // Hide Firefox scrollbar
        '&::-webkit-scrollbar': {
          display: 'none' // Hide Webkit scrollbar
        },
        position: 'sticky',
        top: 0,
        backgroundColor: '#0f0f0f',
        zIndex: 5
      }}
    >
      {categories.map((category) => (
        <Button
          key={category.name}
          onClick={() => setSelectedCategory(category.name)}
          sx={{
            backgroundColor: selectedCategory === category.name ? '#ffffff' : '#272727',
            color: selectedCategory === category.name ? '#000000' : '#ffffff',
            borderRadius: '8px',
            px: 2,
            py: 0.6,
            fontSize: '14px',
            fontWeight: '600',
            fontFamily: "'Inter', sans-serif",
            whiteSpace: 'nowrap',
            minWidth: 'auto',
            border: 'none',
            '&:hover': {
              backgroundColor: selectedCategory === category.name ? '#ffffff' : '#3f3f3f',
            }
          }}
        >
          {category.name === 'New' ? 'All' : category.name}
        </Button>
      ))}
    </Box>
  );
};

export default CategoryTags;
