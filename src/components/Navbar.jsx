import React from 'react';
import { Stack, Typography, IconButton, Avatar, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import NotificationsIcon from '@mui/icons-material/Notifications';

import SearchBar from './SearchBar';

// High-fidelity SVG representing the YouTube red play button logo
const PlayLogoSvg = () => (
  <svg 
    viewBox="0 0 24 24" 
    width="28" 
    height="28" 
    fill="#FC1507" 
    style={{ display: 'block' }}
  >
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.52 3.5 12 3.5 12 3.5s-7.52 0-9.388.555A3.002 3.002 0 0 0 .502 6.163C0 8.07 0 12 0 12s0 3.93.502 5.837a3.002 3.002 0 0 0 2.11 2.108C4.48 20.5 12 20.5 12 20.5s7.52 0 9.388-.555a3.002 3.002 0 0 0 2.11-2.108C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const Navbar = ({ sidebarExpanded, setSidebarExpanded }) => {
  const toggleSidebar = () => {
    setSidebarExpanded((prev) => !prev);
  };

  return (
    <Stack 
      direction="row" 
      alignItems="center" 
      p={2} 
      sx={{ 
        position: 'sticky', 
        background: '#0f0f0f', 
        top: 0, 
        justifyContent: 'space-between',
        zIndex: 10,
        borderBottom: '1px solid #1f1f1f',
        height: '70px',
        flexWrap: 'nowrap', // Prevent vertical wrapping of navbar items
        overflow: 'hidden'
      }}
    >
      {/* Left section: Hamburger & Logo */}
      <Stack direction="row" alignItems="center" gap={1} flexShrink={0}>
        <IconButton 
          onClick={toggleSidebar} 
          sx={{ 
            color: '#fff', 
            mr: 0.5,
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.1)'
            }
          }}
        >
          <MenuIcon />
        </IconButton>
        
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <PlayLogoSvg />
          <Typography 
            variant="h5" 
            fontWeight="bold" 
            sx={{ 
              color: '#fff', 
              display: { xs: 'none', sm: 'block' },
              fontFamily: "'Outfit', sans-serif",
              letterSpacing: '-1px'
            }}
          >
            You<span style={{ color: '#FC1507' }}>Tube</span>
          </Typography>
        </Link>
      </Stack>

      {/* Middle section: SearchBar */}
      <SearchBar />

      {/* Right section: Icons & Profile Avatar, all as direct flex children with identical button heights */}
      <Stack direction="row" alignItems="center" gap={{ xs: 1, sm: 2 }} flexShrink={0}>
        <Tooltip title="Create">
          <IconButton sx={{ color: '#fff', display: { xs: 'none', md: 'inline-flex' } }}>
            <VideoCallIcon />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Notifications">
          <IconButton sx={{ color: '#fff', display: { xs: 'none', md: 'inline-flex' } }}>
            <NotificationsIcon />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Profile">
          <IconButton 
            sx={{ 
              p: 0.5, // Standard padding to match typical button centering alignments
              color: '#fff'
            }}
          >
            <Avatar 
              alt="User Profile" 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80" 
              sx={{ 
                width: 32, 
                height: 32, 
                border: '1px solid #222'
              }}
            />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
};

export default Navbar;
