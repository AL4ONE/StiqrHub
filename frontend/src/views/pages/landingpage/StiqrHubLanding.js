import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiGet } from 'src/utils/api';
import { formatDateIndonesia } from 'src/utils/dateFormat';

// StiqrHub Landing Page Components
import StiqrHubHeader from 'src/components/landingpage/stiqrhub/Header';
import HeroSection from 'src/components/landingpage/stiqrhub/HeroSection';
import PlatformBenefits from 'src/components/landingpage/stiqrhub/PlatformBenefits';
import MiddleCTA from 'src/components/landingpage/stiqrhub/MiddleCTA';
import UserRoleFeatures from 'src/components/landingpage/stiqrhub/UserRoleFeatures';
import ProcessFlow from 'src/components/landingpage/stiqrhub/ProcessFlow';
import Testimonials from 'src/components/landingpage/stiqrhub/Testimonials';
import Partners from 'src/components/landingpage/stiqrhub/Partners';
import BottomStats from 'src/components/landingpage/stiqrhub/BottomStats';
import BonusSection from 'src/components/landingpage/stiqrhub/BonusSection';
import FAQ from 'src/components/landingpage/stiqrhub/FAQ';
import FooterCTA from 'src/components/landingpage/stiqrhub/FooterCTA';

const StiqrHubLanding = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const resp = await apiGet(`${BACKEND_URL}/api/public/events`);
        const list = Array.isArray(resp?.data) ? resp.data : Array.isArray(resp) ? resp : [];
        setEvents(list.slice(0, 6)); // show up to 6 banners
      } catch (e) {
        setError('');
      }
    })();
  }, []);

  return (
    <PageContainer title="StiqrHub - Kelola Event Lokal Lebih Praktis" description="StiqrHub menghubungkan EO dengan Tenant, proses daftar cepat, pembayaran QRIS otomatis, proteksi asuransi untuk tenant">
      <Box sx={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
        <StiqrHubHeader />
        <HeroSection />

        {/* Featured Published Events */}
        <Box sx={{ px: { xs: 2, md: 6 }, mt: 6, mb: 2 }}>
          <Typography variant="h5" gutterBottom>Published Events</Typography>
          <Grid container spacing={2}>
            {events.map((ev) => (
              <Grid item xs={12} sm={6} md={4} key={ev.id}>
                <Card>
                  <CardContent>
                    <Box
                      mb={2}
                      sx={{ width: '100%', height: 160, overflow: 'hidden', borderRadius: 1, backgroundColor: '#f5f5f5' }}
                    >
                      <img
                        src={ev.banner_url || `${BACKEND_URL}/storage/${ev.banner}`}
                        alt={ev.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    </Box>
                    <Typography variant="subtitle1">{ev.name}</Typography>
                    <Typography variant="body2" color="textSecondary">{ev.location}</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      {formatDateIndonesia(ev.start_date)} → {formatDateIndonesia(ev.end_date)}
                    </Typography>
                    <Button variant="contained" color="primary" href={`/auth/register?eventId=${ev.id}`} fullWidth>
                      Register
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <PlatformBenefits />
        <MiddleCTA />
        <UserRoleFeatures />
        <ProcessFlow />
        <Testimonials />
        <Partners />
        <BottomStats />
        <BonusSection />
        <FAQ />
        <FooterCTA />
      </Box>
    </PageContainer>
  );
};

export default StiqrHubLanding;


