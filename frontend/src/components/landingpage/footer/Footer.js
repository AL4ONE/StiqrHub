import React from 'react';
import Grid from '@mui/material/Grid2';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import logoStiqr from 'src/assets/images/logos/logo-stiqr.jpg';

const Footer = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3} justifyContent="center" mt={4}>
        <Grid size={{ xs: 12, sm: 5, lg: 4 }} textAlign="center">
          <img src={logoStiqr} alt="StiqrHub" style={{ maxWidth: 120, height: 'auto' }} />
          <Typography fontSize="16" color="textSecondary" mt={1} mb={4}>
            All rights reserved by Modernize. Designed & Developed by
            <Link target="_blank" href="https://adminmart.com/">
              <Typography color="textSecondary" component="span" display="inline">
                {' '}
                AdminMart
              </Typography>{' '}
            </Link>
            .
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Footer;
