import React from 'react';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1, mb: 5 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{mr: 2}}
          >
            <MenuIcon/>
          </IconButton>
          <Typography color="inherit" to="/" variant="h6" component={NavLink} sx={{flexGrow: 1, textDecoration: "none"}}>
            Quotes Central
          </Typography>
          <Typography>
            <Typography color="inherit" to="/quotes" variant="h7" component={NavLink} sx={{flexGrow: 1, textDecoration: "none", m: 3}}>
              Quotes
            </Typography>
            <Typography color="inherit" to="/new-quote" variant="h7" component={NavLink} sx={{flexGrow: 1, textDecoration: "none"}}>
              Submit new quote
            </Typography>
          </Typography>
          <IconButton size="large" aria-label="search" color="inherit">
            <SearchIcon/>
          </IconButton>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;