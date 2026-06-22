import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const onhandleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
      setSearchTerm('');
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={onhandleSubmit}
      sx={{
        borderRadius: 20,
        border: '1px solid #1e1e1e',
        pl: 2,
        boxShadow: 'none',
        display: 'flex',
        alignItems: 'center',
        background: '#1e1e1e', 
        width: { xs: '140px', sm: '250px', md: '380px', lg: '450px' }, // Responsive width to prevent wrapping
        height: '36px',
        mx: 1
      }}
    >
      <InputBase
        className="search-bar"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ 
          color: '#fff', 
          flex: 1,
          fontSize: '14px',
          '& input::placeholder': {
            color: '#aaa',
            opacity: 1
          }
        }}
      />
      <IconButton 
        type="submit" 
        sx={{ 
          p: '6px', 
          color: '#FC1507',
          '&:hover': {
            background: 'rgba(252, 21, 7, 0.1)'
          }
        }} 
        aria-label="search"
      >
        <SearchIcon sx={{ fontSize: '20px' }} />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
