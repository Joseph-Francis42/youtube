import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, ThemeProvider, createTheme } from '@mui/material';

import { Navbar, Feed, VideoDetail, ChannelDetail, SearchFeed, MobileNavigation } from './components';

// Premium Dark YouTube Theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FC1507', // YouTube Red
    },
    background: {
      default: '#0f0f0f', // YouTube actual dark background
      paper: '#0f0f0f',
    },
    text: {
      primary: '#ffffff',
      secondary: '#aaaaaa',
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h4: {
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 700,
    },
    h5: {
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 700,
    },
    h6: {
      fontFamily: "'Outfit', sans-serif",
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          textTransform: 'none',
        },
      },
    },
  },
});

const App = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <Box sx={{ backgroundColor: '#0f0f0f', minHeight: '100vh', color: '#fff' }}>
          <Navbar sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded} />
          <Routes>
            <Route path="/" exact element={<Feed sidebarExpanded={sidebarExpanded} />} />
            <Route path="/video/:id" element={<VideoDetail />} />
            <Route path="/channel/:id" element={<ChannelDetail />} />
            <Route path="/search/:searchTerm" element={<SearchFeed />} />
          </Routes>
          {/* Mobile Bottom Navigation Bar */}
          <MobileNavigation />
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
