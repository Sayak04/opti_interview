import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function Header() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ 
        backgroundColor: "#757de8"
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: 3 }}>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ fontWeight: 600 , fontFamily: 'sans-serif' }}>
          Navigation Data
        </Typography>
        <div>
        </div>
      </Toolbar>
    </AppBar>
  );
}
