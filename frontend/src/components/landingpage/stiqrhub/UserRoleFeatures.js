import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const UserRoleFeatures = () => {
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

  const RoleCard = styled(Card)(({ theme }) => ({
    height: '100%',
    borderRadius: '12px',
    backgroundColor: '#D1FAE5',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    padding: theme.spacing(4),
  }));

  const IconBox = styled(Box)(({ theme }) => ({
    width: '80px',
    height: '80px',
    borderRadius: '12px',
    backgroundColor: '#22C55E',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
  }));

  const eoFeatures = [
    'Buat & kelola event dalam hitungan menit',
    'Approve tenant otomatis',
    'Payout same-day dengan laporan transparan',
  ];

  const tenantFeatures = [
    'Cari event terpercaya',
    'Bayar booth via QRIS',
    'Order online via StiqrLink - pengunjung bisa pesan dan bayar sebelum datang!',
  ];

  return (
    <SectionBox>
      <Container maxWidth="lg">
        <SectionTitle>
          Fitur yang Bikin Event & Bazar Lancar Tanpa Ribet
        </SectionTitle>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <RoleCard>
              <IconBox>
                <Typography
                  sx={{
                    color: '#FFFFFF',
                    fontSize: '40px',
                    fontWeight: 700,
                  }}
                >
                  EO
                </Typography>
              </IconBox>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: '#333333',
                  marginBottom: 3,
                }}
              >
                Event Organizer
              </Typography>
              <List>
                {eoFeatures.map((feature, index) => (
                  <ListItem key={index} sx={{ px: 0, py: 1 }}>
                    <ListItemIcon sx={{ minWidth: '40px' }}>
                      <CheckCircleIcon sx={{ fontSize: 24, color: '#22C55E' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={feature}
                      primaryTypographyProps={{
                        color: '#333333',
                        fontSize: '16px',
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </RoleCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <RoleCard>
              <IconBox>
                <Typography
                  sx={{
                    color: '#FFFFFF',
                    fontSize: '40px',
                    fontWeight: 700,
                  }}
                >
                  T
                </Typography>
              </IconBox>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: '#333333',
                  marginBottom: 3,
                }}
              >
                Tenant
              </Typography>
              <List>
                {tenantFeatures.map((feature, index) => (
                  <ListItem key={index} sx={{ px: 0, py: 1 }}>
                    <ListItemIcon sx={{ minWidth: '40px' }}>
                      <CheckCircleIcon sx={{ fontSize: 24, color: '#22C55E' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={feature}
                      primaryTypographyProps={{
                        color: '#333333',
                        fontSize: '16px',
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </RoleCard>
          </Grid>
        </Grid>
      </Container>
    </SectionBox>
  );
};

export default UserRoleFeatures;

