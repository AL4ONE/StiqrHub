import React from 'react';
import { Box, Container, Typography, Button, Stack, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import BookIcon from '@mui/icons-material/Book';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

const BonusSection = () => {
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
    marginBottom: theme.spacing(6),
  }));

  const BonusButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#00C68E',
    color: '#FFFFFF',
    borderRadius: '8px',
    padding: '14px 48px',
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '18px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    '&:hover': {
      backgroundColor: '#00AE7D',
      boxShadow: '0 6px 8px rgba(0,0,0,0.15)',
    },
  }));

  const benefits = [
    {
      icon: <BookIcon sx={{ fontSize: 24, color: '#3B82F6' }} />,
      text: "E-book 'Bikin Event & Bazar Anti Rugi'",
    },
    {
      icon: <WhatsAppIcon sx={{ fontSize: 24, color: '#00C68E' }} />,
      text: 'Akses Grup WhatsApp Komunitas StiqrHub',
    },
    {
      icon: <PlayCircleIcon sx={{ fontSize: 24, color: '#3B82F6' }} />,
      text: 'Undangan Live Class bareng mentor bisnis lokal',
    },
  ];

  return (
    <SectionBox>
      <Container maxWidth="lg">
        <SectionTitle>
          Gabung Sekarang dan Dapatkan Keuntungan Tambahan!
        </SectionTitle>

        <Box sx={{ maxWidth: '600px', margin: '0 auto', marginBottom: 4 }}>
          <List>
            {benefits.map((benefit, index) => (
              <ListItem key={index} sx={{ py: 2 }}>
                <ListItemIcon sx={{ minWidth: '48px' }}>
                  {benefit.icon}
                </ListItemIcon>
                <ListItemText
                  primary={benefit.text}
                  primaryTypographyProps={{
                    color: '#333333',
                    fontSize: '16px',
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box sx={{ textAlign: 'center' }}>
          <BonusButton component={Link} to="/start">
            Daftar & Ambil Bonus Sekarang
          </BonusButton>
        </Box>
      </Container>
    </SectionBox>
  );
};

export default BonusSection;

