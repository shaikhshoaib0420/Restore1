import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Product } from '../model/Product';
import Catalog from '../feature/catalog/Catalog';
import { AppBar, Box, IconButton, Switch, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const palletType = darkMode == true ? 'dark' : 'light';
  const theme = createTheme({palette: {
    mode: palletType
  }});
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const changeTheme = () => {
    setDarkMode(!darkMode);
  }

  return (
    <ThemeProvider theme={theme}>
     <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{mb: 4}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ReStore
          </Typography>
          <Switch {...label} checked={darkMode} onChange={changeTheme}/>
        </Toolbar>
      </AppBar>
    </Box>
     {/* Destructuring property */}
     <Catalog />
    </ThemeProvider>
  );
}

export default App;
