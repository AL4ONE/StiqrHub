import React from 'react';
import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const FooterCTA = () => {
  const SectionBox = styled(Box)(({ theme }) => ({
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
  }));

  const SectionTitle = styled(Typography)(({ theme }) => ({
    fontSize: '32px',
    fontWeight: 700,
    color: '#333333',
    marginBottom: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(1),
  }));

  const Subtitle = styled(Typography)(({ theme }) => ({
    fontSize: '18px',
    color: '#666666',
    marginBottom: theme.spacing(4),
  }));

  const CTButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#00C68E',
    color: '#FFFFFF',
    borderRadius: '8px',
    padding: '12px 32px',
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '16px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    '&:hover': {
      backgroundColor: '#00AE7D',
      boxShadow: '0 6px 8px rgba(0,0,0,0.15)',
    },
  }));

  return (
    <SectionBox>
      <Container maxWidth="lg">
        <SectionTitle component="div">
          Naik Kelas Bareng{' '}
          <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
            StiqrHub <RocketLaunchIcon sx={{ fontSize: 24 }} />
          </Box>
        </SectionTitle>
        <Subtitle>
          Event lancar, tenant aman, jualan makin cuan
        </Subtitle>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="center"
        >
          <CTButton component={Link} to="/auth/register?role=EO">
            Daftar Sebagai EO
          </CTButton>
          <CTButton component={Link} to="/events">
            Temukan Event & Bazar
          </CTButton>
        </Stack>
      </Container>
    </SectionBox>
  );
};

export default FooterCTA;

