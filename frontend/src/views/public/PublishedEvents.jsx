import React, { useEffect, useState, useMemo } from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Stack, 
  Box, 
  Container,
  AppBar,
  Toolbar,
  useMediaQuery,
  IconButton,
  Drawer,
  Chip,
  TextField,
  MenuItem
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { IconMenu2 } from '@tabler/icons';
import { Link } from 'react-router-dom';
import { BACKEND_URL } from 'src/config/constants';
import { apiGet } from 'src/utils/api';
import { formatDateIndonesia } from 'src/utils/dateFormat';
import logoNew from 'src/assets/images/logos/logoNew.png';

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  justifyContent: 'center',
  backgroundColor: '#FFFFFF',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  [theme.breakpoints.up('lg')]: {
    minHeight: '80px',
  },
}));

const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  width: '100%',
  paddingLeft: '0 !important',
  paddingRight: '0 !important',
  color: '#333333',
}));

const SignUpButton = styled(Button)(({ theme }) => ({
  border: '2px solid #00C68E',
  color: '#00C68E',
  backgroundColor: '#FFFFFF',
  borderRadius: '8px',
  padding: '8px 24px',
  textTransform: 'none',
  fontWeight: 600,
  '&:hover': {
    border: '2px solid #00AE7D',
    backgroundColor: '#F0FDF4',
  },
}));

const LoginButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#00C68E',
  color: '#FFFFFF',
  borderRadius: '8px',
  padding: '8px 24px',
  textTransform: 'none',
  fontWeight: 600,
  '&:hover': {
    backgroundColor: '#00AE7D',
  },
}));

const EventCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

export default function PublishedEventsPublic() {
  const [events, setEvents] = useState([]);
  const [query, setQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('ALL'); // ALL | FREE | PAID
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError('');
      try {
        const resp = await apiGet(`${BACKEND_URL}/api/public/events`);
        setEvents(Array.isArray(resp?.data) ? resp.data : Array.isArray(resp) ? resp : []);
      } catch (e) {
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <Box sx={{ backgroundColor: '#F5F5F5', minHeight: '100vh' }}>
      {/* Navbar */}
      <AppBarStyled position="sticky" elevation={0}>
        <Container maxWidth="lg">
          <ToolbarStyled>
            <Box
              component={Link}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <Box
                component="img"
                src={logoNew}
                alt="StiqrHub Logo"
                sx={{
                  height: '40px',
                  width: 'auto',
                  objectFit: 'contain',
                }}
              />
            </Box>
            <Box flexGrow={1} />
            {lgUp ? (
              <Stack direction="row" spacing={2} alignItems="center">
                <SignUpButton component={Link} to="/auth/register?role=TENANT">
                  Daftar
                </SignUpButton>
                <LoginButton component={Link} to="/auth/login">
                  Login
                </LoginButton>
              </Stack>
            ) : (
              <IconButton color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
                <IconMenu2 size="20" />
              </IconButton>
            )}
          </ToolbarStyled>
        </Container>
        <Drawer
          anchor="right"
          open={open}
          variant="temporary"
          onClose={toggleDrawer(false)}
          PaperProps={{
            sx: {
              width: 270,
              border: '0 !important',
              boxShadow: (theme) => theme.shadows[8],
            },
          }}
        >
          <Box sx={{ p: 3 }}>
            <Stack direction="column" spacing={2}>
              <SignUpButton component={Link} to="/auth/register?role=TENANT" fullWidth onClick={toggleDrawer(false)}>
                Daftar
              </SignUpButton>
              <LoginButton component={Link} to="/auth/login" fullWidth onClick={toggleDrawer(false)}>
                Login
              </LoginButton>
            </Stack>
          </Box>
        </Drawer>
      </AppBarStyled>

      {/* Content */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontSize: { xs: '28px', md: '36px' },
              fontWeight: 700,
              color: '#333333',
              mb: 1,
            }}
          >
            Temukan Event & Bazar
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ fontSize: '18px' }}>
            Jelajahi berbagai event menarik dan daftarkan booth Anda sekarang
          </Typography>
        </Box>

        {/* Filters */}
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                size="small"
                label="Cari nama atau lokasi event"
                placeholder="Contoh: jakarta, taman, bazar"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                select
                fullWidth
                size="small"
                label="Harga Booth"
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
              >
                <MenuItem value="ALL">Semua</MenuItem>
                <MenuItem value="FREE">Gratis</MenuItem>
                <MenuItem value="PAID">Berbayar</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Box>

        {loading && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography>Memuat event...</Typography>
          </Box>
        )}
        
        {error && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography color="error">{error}</Typography>
          </Box>
        )}

        {!loading && !error && events.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="textSecondary">
              Belum ada event yang tersedia saat ini
            </Typography>
          </Box>
        )}

        <Grid container spacing={3}>
          {useMemo(() => {
            const q = query.trim().toLowerCase();
            const list = events.filter((ev) => {
              const matchesQuery =
                !q ||
                (ev.name && ev.name.toLowerCase().includes(q)) ||
                (ev.location && ev.location.toLowerCase().includes(q));
              // Check if event is free: booth_price is null, undefined, 0, or empty string
              const boothPrice = ev.booth_price;
              const isFree = !boothPrice || Number(boothPrice) === 0 || boothPrice === '';
              const matchesPrice =
                priceFilter === 'ALL' ||
                (priceFilter === 'FREE' && isFree) ||
                (priceFilter === 'PAID' && !isFree);
              return matchesQuery && matchesPrice;
            });
            return list;
          }, [events, query, priceFilter]).map((ev) => {
            // Calculate if event is free
            const boothPrice = ev.booth_price;
            const isFree = !boothPrice || Number(boothPrice) === 0 || boothPrice === '';
            return (
            <Grid item xs={12} sm={6} md={4} key={ev.id}>
              <EventCard>
                {(ev.banner_url || ev.banner) && (
                  <Box
                    sx={{
                      width: '100%',
                      height: 200,
                      overflow: 'hidden',
                      backgroundColor: '#f5f5f5',
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
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </Box>
                )}
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ mb: 1 }}>
                    <Chip
                      label={ev.category || 'Event'}
                      size="small"
                      sx={{
                        backgroundColor: '#E8F5E9',
                        color: '#2E7D32',
                        fontWeight: 600,
                      }}
                    />
                  </Box>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                    {ev.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                    📍 {ev.location}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
                    📅 {formatDateIndonesia(ev.start_date)} → {formatDateIndonesia(ev.end_date)}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2, fontWeight: 600, color: isFree ? '#2E7D32' : '#00C68E' }}>
                    💰 {isFree ? 'Gratis' : `Rp ${Number(boothPrice).toLocaleString('id-ID')}`}
                  </Typography>
                  <Box sx={{ mt: 'auto', pt: 2 }}>
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        component={Link}
                        to="/auth/login"
                        sx={{
                          borderColor: '#00C68E',
                          color: '#00C68E',
                          '&:hover': {
                            borderColor: '#00AE7D',
                            backgroundColor: '#F0FDF4',
                          },
                        }}
                      >
                        Login
                      </Button>
                      <Button
                        variant="contained"
                        fullWidth
                        component={Link}
                        to={`/auth/register?eventId=${ev.id}`}
                        sx={{
                          backgroundColor: '#00C68E',
                          '&:hover': {
                            backgroundColor: '#00AE7D',
                          },
                        }}
                      >
                        Daftar
                      </Button>
                    </Stack>
                  </Box>
                </CardContent>
              </EventCard>
            </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}


