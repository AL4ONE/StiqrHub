import React, { useEffect, useMemo, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
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
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const resp = await apiGet(`${BACKEND_URL}/api/public/events`);
        const list = Array.isArray(resp?.data) ? resp.data : Array.isArray(resp) ? resp : [];
        const slices = list.slice(0, 6);
        setEvents(slices); // show up to 6 banners
      } catch (e) {
        setError('');
      }
    })();
  }, []);

  const sliderSettings = useMemo(() => ({
    infinite: events.length > 1,
    autoplay: events.length > 1,
    autoplaySpeed: 5000,
    arrows: events.length > 1,
    dots: events.length > 1,
    pauseOnHover: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    nextArrow: <ArrowButton direction="next" />,
    prevArrow: <ArrowButton direction="prev" />,
    appendDots: (dots) => (
      <Box component="ul" sx={{ margin: 0, padding: 0, bottom: 24 }}>
        {dots}
      </Box>
    ),
    customPaging: (i) => (
      <Box
        sx={{
          width: 30,
          height: 6,
          borderRadius: 999,
          backgroundColor: 'rgba(255,255,255,0.6)',
          border: 0,
          mx: 0.5,
        }}
      />
    ),
  }), [events.length]);

  function ArrowButton({ direction, onClick }) {
    if (!events.length || events.length === 1) return null;
    return (
      <button
        type="button"
        onClick={onClick}
        style={{
          position: 'absolute',
          top: '50%',
          [direction === 'next' ? 'right' : 'left']: 24,
          transform: 'translateY(-50%)',
          width: 44,
          height: 44,
          borderRadius: '50%',
          border: 'none',
          backgroundColor: 'rgba(0,0,0,0.45)',
          color: '#fff',
          cursor: 'pointer',
          zIndex: 2,
        }}
      >
        {direction === 'next' ? '›' : '‹'}
      </button>
    );
  }

  return (
    <PageContainer title="StiqrHub - Kelola Event Lokal Lebih Praktis" description="StiqrHub menghubungkan EO dengan Tenant, proses daftar cepat, pembayaran QRIS otomatis, proteksi asuransi untuk tenant">
      <Box sx={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
        <StiqrHubHeader />
        <HeroSection />

        {/* Featured Published Events */}
        <Box sx={{ px: { xs: 0, md: 0 }, mt: 6, mb: 2 }}>
          <Typography variant="h5" sx={{ px: { xs: 2, md: 6 }, mb: 2 }}>Published Events</Typography>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              overflow: 'hidden',
            }}
          >
            {events.length > 0 ? (
              <Slider {...sliderSettings}>
                {events.map((ev) => (
                  <Box
                    key={ev.id}
                    component={Link}
                    to={`/auth/register?eventId=${ev.id}`}
                    sx={{
                      display: 'block',
                      width: '100%',
                      height: { xs: 220, sm: 320, md: 420 },
                      position: 'relative',
                      borderRadius: { xs: 0, md: 2 },
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={ev.banner_url || `${BACKEND_URL}/storage/${ev.banner}`}
                      alt={ev.name}
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
                ))}
              </Slider>
            ) : (
              <Box
                sx={{
                  width: '100%',
                  height: { xs: 220, sm: 320, md: 420 },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f4f4f4',
                }}
              >
                <Typography color="text.secondary">Belum ada event yang ditampilkan.</Typography>
              </Box>
            )}
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


