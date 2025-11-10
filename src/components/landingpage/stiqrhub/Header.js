import React from 'react';
import { AppBar, Toolbar, Container, Box, Button, Stack, useMediaQuery, IconButton, Drawer } from '@mui/material';
import { styled } from '@mui/material/styles';
import { IconMenu2 } from '@tabler/icons';
import { Link } from 'react-router-dom';
import logoNew from 'src/assets/images/logos/logoNew.png';

const StiqrHubHeader = () => {
  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    [theme.breakpoints.up('lg')]: {
      minHeight: '80px',
    },
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    paddingLeft: '0 !important',
    paddingRight: '0 !important',
    color: '#333333',
  }));

  const SignUpButton = styled(Button)(({ theme }) => ({
    border: '2px solid #00C68E',
    color: '#00C68E',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    padding: '8px 24px',
    textTransform: 'none',
    fontWeight: 600,
    '&:hover': {
      border: '2px solid #00AE7D',
      backgroundColor: '#F0FDF4',
    },
  }));

  const LoginButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#00C68E',
    color: '#FFFFFF',
    borderRadius: '8px',
    padding: '8px 24px',
    textTransform: 'none',
    fontWeight: 600,
    '&:hover': {
      backgroundColor: '#00AE7D',
    },
  }));

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBarStyled position="sticky" elevation={0}>
      <Container maxWidth="lg">
        <ToolbarStyled>
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <Box
              component="img"
              src={logoNew}
              alt="StiqrHub Logo"
              sx={{
                height: '40px',
                width: 'auto',
                objectFit: 'contain',
              }}
            />
          </Box>
          <Box flexGrow={1} />
          {lgUp ? (
            <Stack direction="row" spacing={2} alignItems="center">
              <SignUpButton component={Link} to="/start">
                Sign Up
              </SignUpButton>
              <LoginButton component={Link} to="/auth/login">
                Login
              </LoginButton>
            </Stack>
          ) : (
            <IconButton color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
              <IconMenu2 size="20" />
            </IconButton>
          )}
        </ToolbarStyled>
      </Container>
      <Drawer
        anchor="right"
        open={open}
        variant="temporary"
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 270,
            border: '0 !important',
            boxShadow: (theme) => theme.shadows[8],
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Stack direction="column" spacing={2}>
            <SignUpButton component={Link} to="/start" fullWidth onClick={toggleDrawer(false)}>
              Sign Up
            </SignUpButton>
            <LoginButton component={Link} to="/auth/login" fullWidth onClick={toggleDrawer(false)}>
              Login
            </LoginButton>
          </Stack>
        </Box>
      </Drawer>
    </AppBarStyled>
  );
};

export default StiqrHubHeader;

