import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import logoNew from 'src/assets/images/logos/logoNew.png';

export default function RoleChooser() {
  return (
    <PageContainer title="StiqrHub" description="Choose role">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        textAlign="center"
        sx={{
          backgroundColor: 'background.default',
          p: 2,
        }}
      >
        <Box mb={4}>
          <img
            src={logoNew}
            alt="StiqrHub Logo"
            style={{ width: '320px', height: 'auto' }}
          />
        </Box>

        <Typography variant="h3" fontWeight="bold" mb={2}>
          Welcome to StiqrHub
        </Typography>

        <Typography variant="subtitle1" color="textSecondary" mb={3}>
          Register as
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={4} justifyContent="center">
          <Button variant="contained" size="large" href="/auth/register?role=EO">
            Register as EO
          </Button>
          <Button variant="outlined" size="large" href="/auth/register?role=TENANT">
            Register as Tenant
          </Button>
        </Stack>

        <Typography variant="subtitle1" color="textSecondary" mb={2}>
          Or login
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
          <Button variant="text" size="large" href="/auth/login">
            Login
          </Button>
        </Stack>
      </Box>
    </PageContainer>
  );
}
