import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { IconCalendar, IconUsers, IconCurrencyDollar } from '@tabler/icons-react';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiGet } from 'src/utils/api';
import { Link } from 'react-router-dom';

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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({ title: '', content: '' });

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

  return (
    <PageContainer title="EO Dashboard">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ cursor: 'pointer', '&:hover': { boxShadow: 4 } }} onClick={() => handleCardClick('total_events')}>
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
          <Card sx={{ cursor: 'pointer', '&:hover': { boxShadow: 4 } }} onClick={() => handleCardClick('total_tenants')}>
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
          <Card sx={{ cursor: 'pointer', '&:hover': { boxShadow: 4 } }} onClick={() => handleCardClick('total_revenue')}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4">
                    {loading ? '...' : `Rp ${(stats.total_revenue || 0).toLocaleString('id-ID')}`}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">Total Revenue</Typography>
                </Box>
                <IconCurrencyDollar size={40} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
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
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">Quick Actions</Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Button variant="outlined" fullWidth component={Link} to="/app/eo/events">
                    View All Events
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button variant="outlined" fullWidth component={Link} to="/app/eo/payouts">
                    View Payouts
                  </Button>
                </Grid>
              </Grid>
              {error && <Typography color="error" mt={2}>{error}</Typography>}
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
    </PageContainer>
  );
}

