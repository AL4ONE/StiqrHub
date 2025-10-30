import React from 'react';
import { IconButton, Box, AppBar, useMediaQuery, Toolbar, styled, Stack } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar, toggleMobileSidebar, setDarkMode } from 'src/store/customizer/CustomizerSlice';
import { IconMenu2, IconMoon, IconSun } from '@tabler/icons';
import Profile from './Profile';

const Header = () => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const customizer = useSelector((state) => state.customizer);
  const dispatch = useDispatch();

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: customizer.TopbarHeight,
    },
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled position="sticky" color="default" elevation={8}>
      <ToolbarStyled>
        {/* Sidebar toggle */}
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={lgUp ? () => dispatch(toggleSidebar()) : () => dispatch(toggleMobileSidebar())}
        >
          <IconMenu2 size="20" />
        </IconButton>

        <Box flexGrow={1} />

        {/* Dark mode toggle + profile */}
        <Stack spacing={1} direction="row" alignItems="center">
          {customizer.activeMode === 'light' ? (
            <IconButton size="large" color="inherit" onClick={() => dispatch(setDarkMode('dark'))}>
              <IconMoon size="21" stroke="1.5" />
            </IconButton>
          ) : (
            <IconButton size="large" color="inherit" onClick={() => dispatch(setDarkMode('light'))}>
              <IconSun size="21" stroke="1.5" />
            </IconButton>
          )}
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

export default Header;
