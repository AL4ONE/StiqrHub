import React from 'react';
import { Box, Container, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const MiddleCTA = () => {
  const CTABox = styled(Box)(({ theme }) => ({
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
  }));

  const CTAButton = styled(Button)(({ theme }) => ({
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

  return (
    <CTABox>
      <Container maxWidth="lg">
        <CTAButton component={Link} to="/start">
          Mulai Sekarang - Gratis untuk EO & Tenant
        </CTAButton>
      </Container>
    </CTABox>
  );
};

export default MiddleCTA;


