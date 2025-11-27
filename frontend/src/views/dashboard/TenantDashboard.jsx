import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Box, Button } from '@mui/material';
import { IconCalendar, IconShoppingCart, IconShield } from '@tabler/icons-react';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiGet } from 'src/utils/api';
import { Link } from 'react-router-dom';

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

  return (
    <PageContainer title="Tenant Dashboard">
      <Grid container spacing={3}>
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
        <Grid item xs={12} sm={6} md={3}>
          <Card>
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
          <Card>
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
          <Card>
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
                  <Button variant="outlined" fullWidth component={Link} to="/tenant/claims">
                    My Claims
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

