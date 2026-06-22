import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import HistoryIcon from '@mui/icons-material/History';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SchoolIcon from '@mui/icons-material/School';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import FeedbackIcon from '@mui/icons-material/Feedback';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

const Sidebar = ({ selectedCategory, setSelectedCategory, expanded }) => {

  const handleCategoryClick = (categoryName) => {
    if (setSelectedCategory) {
      setSelectedCategory(categoryName);
    }
  };

  // 1. COLLAPSED LAYOUT (Narrow Strip)
  if (!expanded) {
    const collapsedItems = [
      { name: 'New', icon: <HomeIcon />, label: 'Home' },
      { name: 'Live', icon: <LocalFireDepartmentIcon />, label: 'Shorts' },
      { name: 'Podcast', icon: <SubscriptionsIcon />, label: 'Subs' },
      { name: 'Music', icon: <VideoLibraryIcon />, label: 'Library' }
    ];

    return (
      <Box 
        sx={{ 
          width: '72px', 
          backgroundColor: '#0f0f0f', 
          height: 'calc(100vh - 70px)', 
          position: 'sticky', 
          top: '70px',
          display: { xs: 'none', md: 'flex' }, 
          flexDirection: 'column', 
          alignItems: 'center', 
          pt: 1,
          borderRight: '1px solid #1f1f1f'
        }}
      >
        {collapsedItems.map((item) => (
          <Box
            key={item.name}
            onClick={() => handleCategoryClick(item.name)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '64px',
              height: '74px',
              borderRadius: '10px',
              cursor: 'pointer',
              color: selectedCategory === item.name ? '#FFF' : '#aaa',
              backgroundColor: selectedCategory === item.name ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: '#FFF'
              },
              mb: 0.5
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {item.icon}
            </Box>
            <Typography sx={{ fontSize: '10px', mt: 0.5, fontFamily: "'Inter', sans-serif" }}>
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  }

  // 2. EXPANDED LAYOUT (Full Drawer)
  const sections = [
    {
      title: '',
      items: [
        { name: 'New', label: 'Home', icon: <HomeIcon /> },
        { name: 'Live', label: 'Shorts', icon: <LocalFireDepartmentIcon /> },
        { name: 'Podcast', label: 'Subscriptions', icon: <SubscriptionsIcon /> },
      ]
    },
    {
      title: 'You',
      items: [
        { name: 'Education', label: 'Library', icon: <VideoLibraryIcon /> },
        { name: 'Coding', label: 'History', icon: <HistoryIcon /> },
        { name: 'ReactJS', label: 'Watch Later', icon: <WatchLaterIcon /> },
        { name: 'NextJS', label: 'Liked Videos', icon: <ThumbUpOutlinedIcon /> },
      ]
    },
    {
      title: 'Explore',
      items: [
        { name: 'Music', label: 'Music', icon: <MusicNoteIcon /> },
        { name: 'Gaming', label: 'Gaming', icon: <SportsEsportsIcon /> },
        { name: 'Live', label: 'Live', icon: <LiveTvIcon /> },
        { name: 'Fashion', label: 'Fashion & Beauty', icon: <CheckroomIcon /> },
        { name: 'Comedy', label: 'Comedy', icon: <SchoolIcon /> }
      ]
    },
    {
      title: 'Settings',
      items: [
        { name: 'Gym', label: 'Settings', icon: <SettingsIcon /> },
        { name: 'Crypto', label: 'Help', icon: <HelpIcon /> },
        { name: 'Beauty', label: 'Send Feedback', icon: <FeedbackIcon /> }
      ]
    }
  ];

  return (
    <Box 
      sx={{ 
        width: '240px', 
        backgroundColor: '#0f0f0f', 
        height: 'calc(100vh - 70px)', 
        position: 'sticky', 
        top: '70px',
        overflowY: 'auto',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
        borderRight: '1px solid #1f1f1f',
        display: { xs: 'none', md: 'block' },
        flexShrink: 0
      }}
    >
      {sections.map((section, sIdx) => (
        <React.Fragment key={sIdx}>
          <List sx={{ px: 1.5, py: 1 }}>
            {section.title && (
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  px: 2, 
                  py: 1, 
                  color: '#fff', 
                  fontWeight: 'bold',
                  fontFamily: "'Outfit', sans-serif"
                }}
              >
                {section.title}
              </Typography>
            )}
            
            {section.items.map((item) => (
              <ListItem disablePadding key={item.name} sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => handleCategoryClick(item.name)}
                  sx={{
                    borderRadius: '10px',
                    backgroundColor: selectedCategory === item.name ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                    color: selectedCategory === item.name ? '#fff' : '#aaa',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      color: '#fff',
                    },
                    py: 1.2,
                    px: 2
                  }}
                >
                  <ListItemIcon 
                    sx={{ 
                      minWidth: '40px', 
                      color: selectedCategory === item.name ? '#FC1507' : '#fff'
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <Typography 
                    sx={{ 
                      fontSize: '14px', 
                      fontWeight: selectedCategory === item.name ? '600' : '400',
                      fontFamily: "'Inter', sans-serif"
                    }}
                  >
                    {item.label}
                  </Typography>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          {sIdx < sections.length - 1 && <Divider sx={{ borderColor: '#1f1f1f', my: 0.5 }} />}
        </React.Fragment>
      ))}
      
      <Box p={3} mt={1}>
        <Typography variant="body2" sx={{ color: '#555', fontSize: '12px', fontFamily: "'Inter', sans-serif" }}>
          About Press Copyright<br />
          Contact us Creators<br />
          Advertise Developers<br />
          <br />
          Terms Privacy Policy & Safety<br />
          How YouTube works<br />
          Test new features
        </Typography>
        <Typography variant="body2" sx={{ color: '#444', fontSize: '11px', mt: 2, fontFamily: "'Inter', sans-serif" }}>
          © 2026 YouTube LLC
        </Typography>
      </Box>
    </Box>
  );
};

export default Sidebar;
