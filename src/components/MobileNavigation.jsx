import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

const MobileNavigation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Get active category from URL search parameters, fallback to 'New'
  const activeCategory = searchParams.get('category') || 'New';

  // Map indexes to category names
  const categoryMap = ['New', 'Live', 'Podcast', 'Music'];

  // Resolve current active index for BottomNavigation
  const currentIndex = categoryMap.indexOf(activeCategory);
  const value = currentIndex === -1 ? 0 : currentIndex;

  const handleChange = (event, newValue) => {
    const targetCategory = categoryMap[newValue];
    navigate(`/?category=${targetCategory}`);
  };

  return (
    <Paper 
      sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        zIndex: 100, 
        display: { xs: 'block', md: 'none' },
        borderTop: '1px solid #1f1f1f',
        backgroundColor: '#0f0f0f'
      }} 
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleChange}
        sx={{
          backgroundColor: '#0f0f0f',
          '& .MuiBottomNavigationAction-root': {
            color: '#aaa',
            fontFamily: "'Inter', sans-serif",
            minWidth: 'auto',
            py: 1
          },
          '& .Mui-selected': {
            color: '#FC1507 !important',
            fontWeight: '600'
          }
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Shorts" icon={<LocalFireDepartmentIcon />} />
        <BottomNavigationAction label="Subscriptions" icon={<SubscriptionsIcon />} />
        <BottomNavigationAction label="Library" icon={<VideoLibraryIcon />} />
      </BottomNavigation>
    </Paper>
  );
};

export default MobileNavigation;
