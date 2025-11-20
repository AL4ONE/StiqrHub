import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiGet } from 'src/utils/api';
import { formatDateIndonesia } from 'src/utils/dateFormat';
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [error, setError] = useState('');

  const renderCarousel = (variant = 'default') => {
    const isPill = variant === 'pill';
    const containerPadding = isPill ? { xs: 1.5, md: 2 } : 0;
    const containerStyles = {
      position: 'relative',
      width: '100%',
      overflow: 'hidden',
      borderRadius: isPill ? 999 : 0,
      backgroundColor: isPill ? '#F5F9FF' : 'transparent',
      border: isPill ? '1px solid rgba(15, 23, 42, 0.08)' : 'none',
      px: containerPadding,
      py: containerPadding,
      boxShadow: isPill ? '0 20px 60px rgba(15, 23, 42, 0.08)' : 'none',
    };
    const imageHeight = isPill
      ? { xs: 140, sm: 180, md: 220 }
      : { xs: 220, sm: 320, md: 420 };

    if (!events.length) {
      return (
        <Box
          sx={{
            ...containerStyles,
            height: imageHeight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f4f4f4',
          }}
        >
          <Typography color="text.secondary">Belum ada event yang ditampilkan.</Typography>
        </Box>
      );
    }

    const navButtonStyles = {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      backgroundColor: isPill ? 'rgba(15, 23, 42, 0.35)' : 'rgba(0,0,0,0.4)',
      color: '#fff',
      '&:hover': {
        backgroundColor: isPill ? 'rgba(15, 23, 42, 0.55)' : 'rgba(0,0,0,0.6)',
      },
      zIndex: 2,
    };

    return (
      <Box sx={containerStyles}>
        <Box
          component={Link}
          to={`/auth/register?eventId=${events[currentSlide]?.id}`}
          sx={{
            display: 'block',
            width: '100%',
            height: imageHeight,
            position: 'relative',
            borderRadius: isPill ? 999 : 0,
            overflow: 'hidden',
          }}
        >
          <img
            src={events[currentSlide]?.banner_url || `${BACKEND_URL}/storage/${events[currentSlide]?.banner}`}
            alt={events[currentSlide]?.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/1200x500?text=Banner+Unavailable';
            }}
          />
        </Box>

        {events.length > 1 && (
          <>
            <IconButton
              aria-label="previous banner"
              onClick={(e) => {
                e.preventDefault();
                setCurrentSlide((prev) => (prev - 1 + events.length) % events.length);
              }}
              sx={{
                ...navButtonStyles,
                left: { xs: isPill ? 12 : 8, md: isPill ? 24 : 24 },
              }}
            >
              <ArrowBackIosNewIcon fontSize="small" />
            </IconButton>

            <IconButton
              aria-label="next banner"
              onClick={(e) => {
                e.preventDefault();
                setCurrentSlide((prev) => (prev + 1) % events.length);
              }}
              sx={{
                ...navButtonStyles,
                right: { xs: isPill ? 12 : 8, md: isPill ? 24 : 24 },
              }}
            >
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
          </>
        )}

        {events.length > 1 && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 1,
              position: 'absolute',
              bottom: isPill ? 12 : 16,
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            {events.map((_, idx) => (
              <Box
                key={idx}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentSlide(idx);
                }}
                sx={{
                  width: idx === currentSlide ? 18 : 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: idx === currentSlide ? '#00C68E' : 'rgba(255,255,255,0.7)',
                  cursor: 'pointer',
                  transition: 'width 0.2s ease',
                }}
              />
            ))}
          </Box>
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
        setEvents(slices); // show up to 6 banners
        setCurrentSlide(0);
      } catch (e) {
        setError('');
      }
    })();
  }, []);

  useEffect(() => {
    if (!events.length) return undefined;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % events.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [events]);

  return (
    <PageContainer title="StiqrHub - Kelola Event Lokal Lebih Praktis" description="StiqrHub menghubungkan EO dengan Tenant, proses daftar cepat, pembayaran QRIS otomatis, proteksi asuransi untuk tenant">
      <Box sx={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
        <StiqrHubHeader />
        <HeroSection />

        {/* Featured Published Events */}
        <Box sx={{ px: { xs: 0, md: 0 }, mt: 6, mb: 2 }}>
          <Typography variant="h5" sx={{ px: { xs: 2, md: 6 }, mb: 2 }}>Published Events</Typography>
          {renderCarousel('default')}
          <Box sx={{ px: { xs: 2, md: 6 }, mt: 3 }}>
            {renderCarousel('pill')}
          </Box>
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


