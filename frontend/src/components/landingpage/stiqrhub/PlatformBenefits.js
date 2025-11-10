import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';
import ShieldIcon from '@mui/icons-material/Shield';
import CampaignIcon from '@mui/icons-material/Campaign';

const PlatformBenefits = () => {
  const SectionBox = styled(Box)(({ theme }) => ({
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
    backgroundColor: '#FFFFFF',
  }));

  const SectionTitle = styled(Typography)(({ theme }) => ({
    fontSize: '32px',
    fontWeight: 700,
    color: '#333333',
    textAlign: 'center',
    marginBottom: theme.spacing(1),
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-8px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '60px',
      height: '4px',
      backgroundColor: '#00C68E',
      borderRadius: '2px',
    },
  }));

  const FeatureCard = styled(Card)(({ theme }) => ({
    height: '100%',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
    },
  }));

  const IconBox = styled(Box)(({ theme }) => ({
    width: '64px',
    height: '64px',
    borderRadius: '12px',
    backgroundColor: '#D1FAE5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
  }));

  const features = [
    {
      icon: <SettingsIcon sx={{ fontSize: 32, color: '#00C68E' }} />,
      title: 'Otomatis & Efisien',
      description: 'Semua proses pendaftaran, laporan, dan pembayaran berjalan otomatis.',
    },
    {
      icon: <ShieldIcon sx={{ fontSize: 32, color: '#00C68E' }} />,
      title: 'Aman & Terlindungi',
      description: 'Tenant kamu diproteksi oleh asuransi kebakaran, gempa bumi, dan bencana alam lainnya.',
    },
    {
      icon: <CampaignIcon sx={{ fontSize: 32, color: '#00C68E' }} />,
      title: 'Event Kamu Viral',
      description: 'Event otomatis dipromosikan ke apps partner Stiqr - jangkau ribuan pengguna potensial.',
    },
  ];

  return (
    <SectionBox>
      <Container maxWidth="lg">
        <SectionTitle sx={{ marginBottom: 8 }}>
          Lebih dari Sekadar Platform Event
        </SectionTitle>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <FeatureCard>
                <CardContent sx={{ p: 4 }}>
                  <IconBox>{feature.icon}</IconBox>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: '#333333',
                      marginBottom: 2,
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#666666',
                      lineHeight: 1.6,
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </SectionBox>
  );
};

export default PlatformBenefits;

