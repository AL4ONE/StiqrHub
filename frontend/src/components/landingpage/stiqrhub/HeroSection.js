import React from 'react';
import { Box, Container, Typography, Button, Stack, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const HeroBox = styled(Box)(({ theme }) => ({
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    textAlign: 'center',
    backgroundColor: '#FFFFFF',
  }));

  const CTButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#22C55E',
    color: '#FFFFFF',
    borderRadius: '8px',
    padding: '12px 32px',
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '16px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    '&:hover': {
      backgroundColor: '#16A34A',
      boxShadow: '0 6px 8px rgba(0,0,0,0.15)',
    },
  }));

  const StatBox = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    padding: theme.spacing(2),
  }));

  const StatNumber = styled(Typography)(({ theme }) => ({
    fontSize: '36px',
    fontWeight: 700,
    color: '#333333',
    marginBottom: theme.spacing(0.5),
  }));

  const StatLabel = styled(Typography)(({ theme }) => ({
    fontSize: '16px',
    color: '#666666',
  }));

  return (
    <HeroBox>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontSize: { xs: '32px', md: '48px', lg: '56px' },
            fontWeight: 700,
            color: '#333333',
            marginBottom: 3,
            lineHeight: 1.2,
          }}
        >
          Kelola Event Lokal Lebih Praktis. Temukan Tenant dan Booth dalam Satu Platform.
        </Typography>

        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: '16px', md: '18px' },
            color: '#666666',
            marginBottom: 4,
            maxWidth: '800px',
            margin: '0 auto 32px',
            lineHeight: 1.6,
          }}
        >
          StiqrHub menghubungkan EO dengan Tenant, proses daftar cepat, pembayaran QRIS otomatis, proteksi asuransi untuk tenant
        </Typography>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="center"
          sx={{ marginBottom: 6 }}
        >
          <CTButton component={Link} to="/auth/register?role=EO">
            Daftar Sebagai EO
          </CTButton>
          <CTButton component={Link} to="/auth/register?role=TENANT">
            Temukan Event & Bazar
          </CTButton>
        </Stack>

        <Grid container spacing={4} justifyContent="center" sx={{ marginTop: 4 }}>
          <Grid item xs={6} md={4}>
            <StatBox>
              <StatNumber>1.200+</StatNumber>
              <StatLabel>Event</StatLabel>
            </StatBox>
          </Grid>
          <Grid item xs={6} md={4}>
            <StatBox>
              <StatNumber>9.500+</StatNumber>
              <StatLabel>Tenant</StatLabel>
            </StatBox>
          </Grid>
          <Grid item xs={6} md={4}>
            <StatBox>
              <StatNumber>10+</StatNumber>
              <StatLabel>Kota Aktif</StatLabel>
            </StatBox>
          </Grid>
        </Grid>
      </Container>
    </HeroBox>
  );
};

export default HeroSection;


