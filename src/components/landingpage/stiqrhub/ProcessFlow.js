import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const ProcessFlow = () => {
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
    marginBottom: theme.spacing(2),
  }));

  const StepCircle = styled(Box)(({ theme }) => ({
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    backgroundColor: '#00C68E',
    color: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    fontWeight: 700,
    margin: '0 auto',
    marginBottom: theme.spacing(2),
  }));

  const StepDescription = styled(Typography)(({ theme }) => ({
    fontSize: '16px',
    color: '#666666',
    textAlign: 'center',
    maxWidth: '200px',
    margin: '0 auto',
  }));

  const steps = [
    'EO buat & publikasikan event',
    'StiqrHub promosikan ke ribuan tenant',
    'Tenant daftar & bayar via QRIS',
    'EO & Tenant terima laporan & payout otomatis',
  ];

  return (
    <SectionBox>
      <Container maxWidth="lg">
        <SectionTitle>
          Registrasi sampai Transaksi, Semua Tersinkron Otomatis
        </SectionTitle>
        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            color: '#666666',
            marginBottom: 6,
          }}
        >
          Langkah - langkah
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'center',
            gap: { xs: 4, md: 2 },
            position: 'relative',
          }}
        >
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                  flex: { md: '1 1 0' },
                  maxWidth: { md: '200px' },
                }}
              >
                <StepCircle>{index + 1}</StepCircle>
                <StepDescription sx={{ maxWidth: '100%' }}>{step}</StepDescription>
              </Box>
              {index < steps.length - 1 && (
                <Box
                  sx={{
                    width: { xs: '2px', md: '60px' },
                    height: { xs: '40px', md: '2px' },
                    borderLeft: { xs: '2px dashed #00C68E', md: 'none' },
                    borderTop: { xs: 'none', md: '2px dashed #00C68E' },
                    marginTop: { xs: 0, md: 4 },
                    marginBottom: { xs: 0, md: 0 },
                    display: { xs: 'block', md: 'block' },
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </Box>
      </Container>
    </SectionBox>
  );
};

export default ProcessFlow;

