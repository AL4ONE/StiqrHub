import React, { useEffect, useState } from 'react';
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
import { IconCalendar, IconShoppingCart, IconShield } from '@tabler/icons-react';
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
        const resp = await apiGet(BACKEND_URL + '/api/tenant/events/active');
        const data = Array.isArray(resp?.data) ? resp.data : resp;
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
      <Box textAlign="center" py={3}>
        <Typography variant="body2" color="text.secondary">
          Belum ada event aktif
        </Typography>
        <Button 
          variant="outlined" 
          size="small" 
          sx={{ mt: 2 }}
          component={Link}
          to="/app/tenant/events"
        >
          Jelajahi Event
        </Button>
      </Box>
    );
  }

  return (
    <Stack spacing={2}>
      {events.map((event) => (
        <Card 
          key={event.id} 
          variant="outlined"
          sx={{ 
            cursor: 'pointer',
            '&:hover': { boxShadow: 2, borderColor: 'primary.main' },
            transition: 'all 0.2s'
          }}
          onClick={() => navigate(`/app/tenant/events/${event.id}`)}
        >
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start">
              <Box flex={1}>
                <Typography variant="h6" fontWeight={600} mb={0.5}>
                  {event.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  📍 {event.location || 'Lokasi belum ditentukan'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  📅 {formatDateIndonesia(event.start_date)} - {formatDateIndonesia(event.end_date)}
                </Typography>
              </Box>
              <Chip 
                label={event.registration?.payment?.status === 'SUCCESS' ? 'Lunas' : 'Menunggu Pembayaran'} 
                color={event.registration?.payment?.status === 'SUCCESS' ? 'success' : 'warning'}
                size="small"
              />
            </Box>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382

export default function TenantDashboard() {
  const [stats, setStats] = useState({
    available_events: 0,
    active_events: 0,
    total_registrations: 0,
    pending_claims: 0,
    pending_payments: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState(null);
  const [dialogData, setDialogData] = useState([]);
  const [dialogLoading, setDialogLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError('');
      try {
        const data = await apiGet(BACKEND_URL + '/api/tenant/dashboard/stats');
        setStats(data?.data || stats);
      } catch (e) {
        setError('Failed to load tenant stats');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleCardClick = async (type) => {
    setDialogType(type);
    setDialogOpen(true);
    setDialogLoading(true);
    setDialogData([]);

    try {
      let endpoint = '';
      switch (type) {
        case 'active_events':
          endpoint = '/api/tenant/dashboard/active-events';
          break;
        case 'pending_claims':
          endpoint = '/api/tenant/dashboard/pending-claims';
          break;
        case 'total_registrations':
          endpoint = '/api/tenant/dashboard/total-registrations';
          break;
        case 'pending_payments':
          endpoint = '/api/tenant/dashboard/pending-payments';
          break;
        default:
          return;
      }
      const data = await apiGet(BACKEND_URL + endpoint);
      setDialogData(data?.data || []);
    } catch (e) {
      setError('Failed to load details');
    } finally {
      setDialogLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setDialogType(null);
    setDialogData([]);
  };

  const getDialogTitle = () => {
    switch (dialogType) {
      case 'active_events':
        return 'Active Events (Sudah Regist & Dibayar)';
      case 'pending_claims':
        return 'Pending Claims';
      case 'total_registrations':
        return 'Total Registrations';
      case 'pending_payments':
        return 'Pending Payments';
      default:
        return 'Details';
    }
  };

>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
  return (
    <PageContainer title="Tenant Dashboard">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ cursor: 'pointer', '&:hover': { boxShadow: 4 } }} onClick={() => handleCardClick('active_events')}>
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
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ cursor: 'pointer', '&:hover': { boxShadow: 4 } }} onClick={() => handleCardClick('pending_claims')}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4">{loading ? '...' : stats.pending_claims}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">Pending Claims</Typography>
                </Box>
                <IconShield size={40} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ cursor: 'pointer', '&:hover': { boxShadow: 4 } }} onClick={() => handleCardClick('total_registrations')}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4">{loading ? '...' : stats.total_registrations}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">Total Registrations</Typography>
                </Box>
                <IconShoppingCart size={40} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ cursor: 'pointer', '&:hover': { boxShadow: 4 } }} onClick={() => handleCardClick('pending_payments')}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4">{loading ? '...' : stats.pending_payments}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">Pending Payments</Typography>
                </Box>
                <IconShoppingCart size={40} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" mb={2}>Quick Actions</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Button variant="contained" fullWidth component={Link} to="/app/tenant/events">
                    Browse Events ({stats.available_events})
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button variant="outlined" fullWidth component={Link} to="/app/tenant/events/active">
                    My Active Events
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button variant="outlined" fullWidth component={Link} to="/app/tenant/claims">
                    My Claims
                  </Button>
                </Grid>
              </Grid>
              {error && <Typography color="error" mt={2}>{error}</Typography>}
            </CardContent>
          </Card>
        </Grid>

        {/* List Events */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">📅 Event Saya</Typography>
                <Button variant="outlined" size="small" component={Link} to="/app/tenant/events/active">
                  Lihat Semua
                </Button>
              </Box>
              <EventList />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{getDialogTitle()}</DialogTitle>
        <DialogContent>
          {dialogLoading ? (
            <Typography>Loading...</Typography>
          ) : dialogData.length === 0 ? (
            <Typography color="textSecondary">Tidak ada data</Typography>
          ) : (
            <Stack spacing={2} sx={{ mt: 1 }}>
              {dialogType === 'active_events' && dialogData.map((event) => (
                <Card key={event.id} variant="outlined">
                  <CardContent>
                    <Typography variant="h6">{event.name}</Typography>
                    <Typography variant="body2" color="textSecondary">{event.location}</Typography>
                    <Typography variant="body2">
                      {formatDateIndonesia(event.start_date)} - {formatDateIndonesia(event.end_date)}
                    </Typography>
                    {event.payment_status && (
                      <Chip label={`Payment: ${event.payment_status}`} color="success" size="small" sx={{ mt: 1 }} />
                    )}
                  </CardContent>
                </Card>
              ))}
              {dialogType === 'pending_claims' && dialogData.map((claim) => (
                <Card key={claim.id} variant="outlined">
                  <CardContent>
                    <Typography variant="h6">{claim.insurance_policy?.event?.name || 'Event'}</Typography>
                    <Typography variant="body2" color="textSecondary">{claim.description}</Typography>
                    <Typography variant="body2">Tanggal Kejadian: {formatDateIndonesia(claim.incident_date)}</Typography>
                    <Chip label={claim.status} color="warning" size="small" sx={{ mt: 1 }} />
                  </CardContent>
                </Card>
              ))}
              {dialogType === 'total_registrations' && dialogData.map((reg) => (
                <Card key={reg.id} variant="outlined">
                  <CardContent>
                    <Typography variant="h6">{reg.event?.name || 'Event'}</Typography>
                    <Typography variant="body2" color="textSecondary">{reg.event?.location || '-'}</Typography>
                    <Typography variant="body2">
                      {formatDateIndonesia(reg.event?.start_date)} - {formatDateIndonesia(reg.event?.end_date)}
                    </Typography>
                    <Chip label={reg.status} size="small" sx={{ mt: 1 }} />
                  </CardContent>
                </Card>
              ))}
              {dialogType === 'pending_payments' && dialogData.map((payment) => (
                <Card key={payment.id} variant="outlined">
                  <CardContent>
                    <Typography variant="h6">{payment.registration?.event?.name || 'Event'}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Amount: Rp {payment.amount?.toLocaleString('id-ID') || '0'}
                    </Typography>
                    <Typography variant="body2">
                      {formatDateIndonesia(payment.registration?.event?.start_date)} - {formatDateIndonesia(payment.registration?.event?.end_date)}
                    </Typography>
                    <Chip label={payment.status} color="warning" size="small" sx={{ mt: 1 }} />
                  </CardContent>
                </Card>
              ))}
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Tutup</Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
}

