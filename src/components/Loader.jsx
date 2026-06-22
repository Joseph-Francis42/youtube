import React from 'react';
import { Box, CircularProgress, Stack } from '@mui/material';

const Loader = () => (
  <Box minHeight="95vh" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Stack direction="row" justifyContent="center" alignItems="center" height="80vh">
      <CircularProgress sx={{ color: '#FC1507' }} size={60} />
    </Stack>
  </Box>
);

export default Loader;
