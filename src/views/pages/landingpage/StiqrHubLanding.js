import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography, IconButton, Button } from '@mui/material';
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
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -400,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 400,
        behavior: 'smooth',
      });
    }
  };

  const renderBannerCarousel = () => {
    if (!events.length) {
      return (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 200,
            backgroundColor: '#f4f4f4',
            borderRadius: 2,
            p: 4,
          }}
        >
          <Typography color="text.secondary">Belum ada event yang ditampilkan.</Typography>
        </Box>
      );
    }

    return (
      <Box
        sx={{
          position: 'relative',
          width: '100%',
        }}
      >
        <Box
          ref={scrollContainerRef}
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            pb: 2,
          }}
        >
          {events.map((event) => (
            <Box
              key={event.id}
              component={Link}
              to={`/auth/register?eventId=${event.id}`}
              sx={{
                flexShrink: 0,
                width: { xs: '280px', sm: '320px', md: '380px' },
                height: { xs: '160px', sm: '180px', md: '200px' },
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: 2,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
            >
              <Box
                component="img"
                src={event.banner_url || `${BACKEND_URL}/storage/${event.banner}`}
                alt={event.name}
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/400x200?text=Event+Banner';
                }}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </Box>
          ))}
        </Box>

        {events.length > 0 && (
          <>
            <IconButton
              aria-label="scroll left"
              onClick={scrollLeft}
              sx={{
                position: 'absolute',
                left: { xs: 8, md: -20 },
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255,255,255,0.9)',
                color: 'primary.main',
                boxShadow: 2,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,1)',
                },
                zIndex: 2,
              }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>

            <IconButton
              aria-label="scroll right"
              onClick={scrollRight}
              sx={{
                position: 'absolute',
                right: { xs: 8, md: -20 },
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255,255,255,0.9)',
                color: 'primary.main',
                boxShadow: 2,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,1)',
                },
                zIndex: 2,
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </>
        )}
      </Box>
    );
  };

  useEffect(() => {
    (async () => {
      try {
        const resp = await apiGet(`${BACKEND_URL}/api/public/events`);
        const list = Array.isArray(resp?.data) ? resp.data : Array.isArray(resp) ? resp : [];
        const slices = list.slice(0, 6);
        setEvents(slices); // show up to 6 events
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
        <Box sx={{ px: { xs: 2, md: 6 }, mt: 6, mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              Published Events
            </Typography>
            <Button
              component={Link}
              to="/events"
              variant="outlined"
              sx={{
                textTransform: 'none',
                borderRadius: 2,
              }}
            >
              Show More
            </Button>
          </Box>
          {renderBannerCarousel()}
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


