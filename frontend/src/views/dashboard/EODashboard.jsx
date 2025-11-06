import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Box, Button } from '@mui/material';
import { IconCalendar, IconUsers, IconCurrencyDollar, IconPlus } from '@tabler/icons-react';
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

  return (
    <PageContainer title="EO Dashboard">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
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
          <Card>
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
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4">
                    {loading ? '...' : `Rp ${stats.total_revenue?.toLocaleString() || 0}`}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">Total Revenue</Typography>
                </Box>
                <IconCurrencyDollar size={40} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
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
                <Button variant="contained" component={Link} to="/eo/events/create" startIcon={<IconPlus size={20} />}>
                  Create Event
                </Button>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Button variant="outlined" fullWidth component={Link} to="/eo/events">
                    View All Events
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button variant="outlined" fullWidth component={Link} to="/eo/payouts">
                    View Payouts
                  </Button>
                </Grid>
              </Grid>
              {error && <Typography color="error" mt={2}>{error}</Typography>}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
}

