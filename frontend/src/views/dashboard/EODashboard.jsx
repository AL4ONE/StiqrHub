import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import { Grid, Card, CardContent, Typography, Box, Button } from '@mui/material';
import { IconCalendar, IconUsers, IconCurrencyDollar, IconPlus } from '@tabler/icons-react';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiGet } from 'src/utils/api';
import { Link } from 'react-router-dom';
=======
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Stack,
  Divider
} from '@mui/material';
import { IconCalendar, IconUsers, IconCurrencyDollar, IconShield } from '@tabler/icons-react';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiGet } from 'src/utils/api';
import { Link, useNavigate } from 'react-router-dom';
import { formatDateIndonesia } from 'src/utils/dateFormat';

// Component untuk list events
function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const resp = await apiGet(BACKEND_URL + '/api/eo/events');
        const data = Array.isArray(resp?.data) ? resp.data : (Array.isArray(resp) ? resp : []);
        // Ambil maksimal 5 event terbaru
        setEvents(data.slice(0, 5));
      } catch (e) {
        console.error('Failed to load events:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <Typography color="text.secondary">Memuat event...</Typography>;
  }

  if (events.length === 0) {
    return (
      <Box textAlign="center" py={2}>
        <Typography variant="body2" color="text.secondary">
          Belum ada event
        </Typography>
        <Button
          variant="outlined"
          size="small"
          sx={{ mt: 1 }}
          component={Link}
          to="/app/eo/events/create"
        >
          Buat Event Baru
        </Button>
      </Box>
    );
  }

  const getStatusColor = (status) => {
    if (status === 'PUBLISHED' || status === 'ACTIVATED') return 'success';
    if (status === 'DRAFT') return 'default';
    return 'warning';
  };

  return (
    <Stack
      spacing={1.5}
      sx={{
        maxHeight: 450,
        overflowY: 'auto',
        pr: 1,
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'grey.100',
          borderRadius: '3px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'grey.400',
          borderRadius: '3px',
          '&:hover': {
            backgroundColor: 'grey.500',
          },
        },
      }}
    >
      {events.map((event) => (
        <Card
          key={event.id}
          variant="outlined"
          sx={{
            cursor: 'pointer',
            '&:hover': { boxShadow: 2, borderColor: 'primary.main' },
            transition: 'all 0.2s',
            overflow: 'hidden',
            flexShrink: 0,
            minHeight: 120
          }}
          onClick={() => navigate(`/app/eo/events/${event.id}`)}
        >
          <Box display="flex">
            {/* Gambar Event */}
            {(event.banner_url || event.banner) && (
              <Box
                sx={{
                  width: 120,
                  minWidth: 120,
                  height: 120,
                  backgroundColor: 'grey.200',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Box
                  component="img"
                  src={
                    event.banner_url
                      ? (event.banner_url.startsWith('http') ? event.banner_url : `${BACKEND_URL}${event.banner_url}`)
                      : `${BACKEND_URL}/storage/${event.banner}`
                  }
                  alt={event.name}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </Box>
            )}
            <CardContent sx={{ py: 1.5, flex: 1, '&:last-child': { pb: 1.5 } }}>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box flex={1}>
                  <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                    {event.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block">
                    {formatDateIndonesia(event.start_date)} - {formatDateIndonesia(event.end_date)}
                  </Typography>
                </Box>
                <Chip
                  label={event.status}
                  color={getStatusColor(event.status)}
                  size="small"
                />
              </Box>
            </CardContent>
          </Box>
        </Card>
      ))}
    </Stack>
  );
}

// Component untuk list claims
function ClaimsList() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const resp = await apiGet(BACKEND_URL + '/api/eo/claims');
        const data = Array.isArray(resp?.data) ? resp.data : (Array.isArray(resp) ? resp : []);
        // Ambil maksimal 5 claim terbaru
        setClaims(data.slice(0, 5));
      } catch (e) {
        console.error('Failed to load claims:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <Typography color="text.secondary" variant="body2">Memuat klaim...</Typography>;
  }

  if (claims.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary" textAlign="center" py={1}>
        Belum ada klaim asuransi
      </Typography>
    );
  }

  const getStatusColor = (status) => {
    if (status === 'APPROVED') return 'success';
    if (status === 'REJECTED') return 'error';
    return 'warning';
  };

  return (
    <Stack
      spacing={1.5}
      sx={{
        maxHeight: 450,
        overflowY: 'auto',
        pr: 1,
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'grey.100',
          borderRadius: '3px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'grey.400',
          borderRadius: '3px',
          '&:hover': {
            backgroundColor: 'grey.500',
          },
        },
      }}
    >
      {claims.map((claim) => (
        <Card
          key={claim.id}
          variant="outlined"
          sx={{
            '&:hover': { boxShadow: 1 },
            transition: 'all 0.2s',
            overflow: 'hidden',
            flexShrink: 0,
            minHeight: 120
          }}
        >
          <Box display="flex">
            {/* Gambar Event */}
            {(claim.event_banner_url || claim.event_banner) && (
              <Box
                sx={{
                  width: 120,
                  minWidth: 120,
                  height: 120,
                  backgroundColor: 'grey.200',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Box
                  component="img"
                  src={
                    claim.event_banner_url
                      ? (claim.event_banner_url.startsWith('http') ? claim.event_banner_url : `${BACKEND_URL}${claim.event_banner_url}`)
                      : `${BACKEND_URL}/storage/${claim.event_banner}`
                  }
                  alt={claim.event_name}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </Box>
            )}
            <CardContent sx={{ py: 1.5, flex: 1, '&:last-child': { pb: 1.5 } }}>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={0.5}>
                <Typography variant="subtitle2" fontWeight={600}>
                  {claim.event_name || 'N/A'}
                </Typography>
                <Chip
                  label={claim.status || 'PENDING'}
                  color={getStatusColor(claim.status)}
                  size="small"
                />
              </Box>
              <Typography variant="caption" color="text.secondary" display="block">
                Tenant: {claim.tenant_name || 'N/A'}
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block">
                Jumlah: Rp {claim.claim_amount?.toLocaleString('id-ID') || '0'}
              </Typography>
            </CardContent>
          </Box>
        </Card>
      ))}
    </Stack>
  );
}

// Component untuk list payouts
function PayoutsList() {
  const [payouts, setPayouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const resp = await apiGet(BACKEND_URL + '/api/eo/payouts');
        const data = Array.isArray(resp?.data) ? resp.data : (Array.isArray(resp) ? resp : []);
        // Ambil maksimal 5 payout terbaru
        setPayouts(data.slice(0, 5));
      } catch (e) {
        console.error('Failed to load payouts:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <Typography color="text.secondary" variant="body2">Memuat payout...</Typography>;
  }

  if (payouts.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary" textAlign="center" py={1}>
        Belum ada payout
      </Typography>
    );
  }

  return (
    <Stack spacing={1.5}>
      {payouts.map((payout, index) => (
        <Card
          key={payout.event_id || index}
          variant="outlined"
          sx={{
            '&:hover': { boxShadow: 1 },
            transition: 'all 0.2s'
          }}
        >
          <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
            <Typography variant="subtitle2" fontWeight={600} mb={0.5}>
              {payout.event_name || 'N/A'}
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block">
              Total: Rp {payout.total_amount?.toLocaleString('id-ID') || '0'}
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block">
              Status: {payout.payout_status || 'PENDING'}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382

export default function EODashboard() {
  const [stats, setStats] = useState({
    total_events: 0,
    total_tenants: 0,
    total_revenue: 0,
    active_events: 0,
    recent_events: 0,
    pending_payments: 0,
    recent_registrations: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
<<<<<<< HEAD
=======
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({ title: '', content: '' });
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError('');
      try {
        const data = await apiGet(BACKEND_URL + '/api/eo/dashboard/stats');
        setStats(data?.data || stats);
      } catch (e) {
        setError('Failed to load dashboard statistics');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

<<<<<<< HEAD
=======
  const handleCardClick = (type) => {
    let title = '';
    let content = '';

    switch(type) {
      case 'total_events':
        title = 'Total Events';
        content = `Anda memiliki total ${stats.total_events} event yang telah dibuat. Event ini mencakup semua event yang pernah Anda buat, baik yang aktif maupun yang sudah selesai.`;
        break;
      case 'total_tenants':
        title = 'Tenants Registered';
        content = `Total ${stats.total_tenants} tenant yang telah terdaftar di semua event Anda. Tenant adalah penyewa booth yang telah mendaftar untuk berpartisipasi dalam event-event Anda.`;
        break;
      case 'total_revenue':
        title = 'Total Revenue';
        content = `Total pendapatan Anda adalah Rp ${(stats.total_revenue || 0).toLocaleString('id-ID')}. Pendapatan ini berasal dari pembayaran yang berhasil dari tenant yang terdaftar di event-event Anda.`;
        break;
      case 'active_events':
        title = 'Active Events';
        content = `Anda memiliki ${stats.active_events} event yang sedang aktif (dipublikasikan). Event aktif adalah event yang sedang berlangsung dan dapat menerima pendaftaran tenant.`;
        break;
      default:
        return;
    }

    setDialogContent({ title, content });
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
  return (
    <PageContainer title="EO Dashboard">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
<<<<<<< HEAD
          <Card>
=======
          <Card sx={{ cursor: 'pointer', '&:hover': { boxShadow: 4 } }} onClick={() => handleCardClick('total_events')}>
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4">{loading ? '...' : stats.total_events}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">Total Events</Typography>
                </Box>
                <IconCalendar size={40} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
<<<<<<< HEAD
          <Card>
=======
          <Card sx={{ cursor: 'pointer', '&:hover': { boxShadow: 4 } }} onClick={() => handleCardClick('total_tenants')}>
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4">{loading ? '...' : stats.total_tenants}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">Tenants Registered</Typography>
                </Box>
                <IconUsers size={40} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
<<<<<<< HEAD
          <Card>
=======
          <Card sx={{ cursor: 'pointer', '&:hover': { boxShadow: 4 } }} onClick={() => handleCardClick('total_revenue')}>
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4">
<<<<<<< HEAD
                    {loading ? '...' : `Rp ${stats.total_revenue?.toLocaleString() || 0}`}
=======
                    {loading ? '...' : `Rp ${(stats.total_revenue || 0).toLocaleString('id-ID')}`}
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">Total Revenue</Typography>
                </Box>
                <IconCurrencyDollar size={40} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
<<<<<<< HEAD
          <Card>
=======
          <Card sx={{ cursor: 'pointer', '&:hover': { boxShadow: 4 } }} onClick={() => handleCardClick('active_events')}>
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4">{loading ? '...' : stats.active_events}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">Active Events</Typography>
                </Box>
                <IconCalendar size={40} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
<<<<<<< HEAD
                <Typography variant="h6">Quick Actions</Typography>
                <Button variant="contained" component={Link} to="/app/eo/events/create" startIcon={<IconPlus size={20} />}>
                  Create Event
                </Button>
=======
                <Typography variant="h6">⚡ Quick Actions</Typography>
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Button variant="outlined" fullWidth component={Link} to="/app/eo/events">
<<<<<<< HEAD
                    View All Events
=======
                    Lihat Semua Event
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button variant="outlined" fullWidth component={Link} to="/app/eo/events/create">
                    Buat Event Baru
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button variant="outlined" fullWidth component={Link} to="/app/eo/payouts">
<<<<<<< HEAD
                    View Payouts
=======
                    Lihat Payouts
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button variant="outlined" fullWidth component={Link} to="/app/eo/claims">
                    Lihat Klaim
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
                  </Button>
                </Grid>
              </Grid>
              {error && <Typography color="error" mt={2}>{error}</Typography>}
            </CardContent>
          </Card>
        </Grid>
<<<<<<< HEAD
      </Grid>
=======

        {/* List Events */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">📅 Event Saya</Typography>
                <Button variant="outlined" size="small" component={Link} to="/app/eo/events">
                  Lihat Semua
                </Button>
              </Box>
              <EventList />
            </CardContent>
          </Card>
        </Grid>

        {/* List Claims */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">🛡️ Klaim Asuransi</Typography>
                <Button variant="outlined" size="small" component={Link} to="/app/eo/claims">
                  Lihat Semua
                </Button>
              </Box>
              <ClaimsList />
            </CardContent>
          </Card>
        </Grid>

        {/* List Payouts */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">💰 Payouts & Settlement</Typography>
                <Button variant="outlined" size="small" component={Link} to="/app/eo/payouts">
                  Lihat Semua
                </Button>
              </Box>
              <PayoutsList />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{dialogContent.title}</DialogTitle>
        <DialogContent>
          <Typography>{dialogContent.content}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Tutup</Button>
        </DialogActions>
      </Dialog>
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
    </PageContainer>
  );
}

