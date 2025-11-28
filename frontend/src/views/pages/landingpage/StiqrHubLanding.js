import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiGet } from 'src/utils/api';
import { Link } from 'react-router-dom';

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
        const slices = list.slice(0, 6);
        setEvents(slices);
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
        {events.length > 0 && (
          <Box sx={{ py: 8, px: 2 }}>
            {/* Featured events content can be added here if needed */}
          </Box>
        )}

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


