import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function LinearIndeterminate() {
  return (
    <div className="Loader">

<Box sx={{ width: '100%' }}>
      <LinearProgress sx={{height:'2vh',} } color='warning' />
    </Box>
    </div>
  
  );
}
