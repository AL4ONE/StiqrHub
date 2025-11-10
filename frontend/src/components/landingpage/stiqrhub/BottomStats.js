import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const BottomStats = () => {
  const SectionBox = styled(Box)(({ theme }) => ({
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    backgroundColor: '#FFFFFF',
  }));

  const StatBox = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    padding: theme.spacing(2),
  }));

  const StatNumber = styled(Typography)(({ theme }) => ({
    fontSize: '32px',
    fontWeight: 700,
    color: '#333333',
    marginBottom: theme.spacing(0.5),
  }));

  const StatLabel = styled(Typography)(({ theme }) => ({
    fontSize: '14px',
    color: '#666666',
  }));

  const stats = [
    { number: '1.200+', label: 'Event Lokal' },
    { number: 'Rp 1 Miliar+', label: 'Proteksi Tenant' },
    { number: '25.000+', label: 'Transaksi QRIS' },
    { number: '10+', label: 'Kota Aktif' },
  ];

  return (
    <SectionBox>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <StatBox>
                <StatNumber>{stat.number}</StatNumber>
                <StatLabel>{stat.label}</StatLabel>
              </StatBox>
            </Grid>
          ))}
        </Grid>
      </Container>
    </SectionBox>
  );
};

export default BottomStats;


