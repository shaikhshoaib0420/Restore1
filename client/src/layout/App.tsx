import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Product } from '../model/Product';
import Catalog from '../feature/catalog/Catalog';
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from '@mui/icons-material/Menu';
import { NavLink, Outlet } from 'react-router-dom';
import { ShoppingCart } from '@mui/icons-material';

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

  const midLinks = [
    {'name': 'catalog', 'path': '/catalog'},
    {'name': 'about', 'path': '/about'},
    {'name': 'contact', 'path': '/contact'},];

  const rightLinks = [
    {'name': 'login', 'path': '/login'},
    {'name': 'register', 'path': '/register'},];  

  const navStyles = {color: 'inherit', 
  typography: 'h6',
  '&:hover': {
    color: 'gray.500'
  },
  '&.active': {
    color: 'secondary.main'
  }
};
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
          <IconButton sx={{mr: 4}} color='inherit'>
            <Badge badgeContent={4} color="primary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <Typography variant="h6" component={NavLink} to='/' sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }} >
            ReStore
          </Typography>
          <List sx={{display: 'flex'}}>
            {midLinks.map(m => (
              <ListItem 
              key={m.path}
              component={NavLink} 
              to={m.path}
              sx={navStyles}
              >{m.name}</ListItem>
            ))}
          </List>
          <List sx={{display: 'flex'}}>
            {rightLinks.map(m => (
              <ListItem 
              key={m.path}
              component={NavLink} 
              to={m.path}
              sx={navStyles}
              >{m.name}</ListItem>
            ))}
          </List>
          <Switch {...label} checked={darkMode} onChange={changeTheme}/>
        </Toolbar>
      </AppBar>
    </Box>
     {/* Destructuring property */}
     {/* <Catalog /> */}
     <Outlet />
    </ThemeProvider>
  );
}

export default App;
