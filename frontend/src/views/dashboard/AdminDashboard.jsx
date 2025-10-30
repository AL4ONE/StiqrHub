import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Box, Button } from '@mui/material';
import { IconCurrencyDollar, IconUserCheck, IconAlertCircle, IconChartBar } from '@tabler/icons-react';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiGet } from 'src/utils/api';
import { Link } from 'react-router';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    pending_payments: 0,
    eos_to_verify: 0,
    active_events: 0,
    qris_volume: 0,
    active_claims: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError('');
      try {
        const data = await apiGet(BACKEND_URL + '/api/admin/dashboard/stats');
        setStats(data?.data || stats);
      } catch (e) {
        setError('Failed to load admin stats');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <PageContainer title="Admin Dashboard">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4">{loading ? '...' : stats.pending_payments}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">Pending Payments</Typography>
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
                  <Typography variant="h4">{loading ? '...' : stats.eos_to_verify}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">EOs to Verify</Typography>
                </Box>
                <IconUserCheck size={40} />
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
                <IconAlertCircle size={40} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4">{loading ? '...' : `Rp ${Number(stats.qris_volume || 0).toLocaleString()}`}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">QRIS Volume</Typography>
                </Box>
                <IconChartBar size={40} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">Quick Actions</Typography>
                <Button variant="contained" component={Link} to="/admin/payments">Go to Payments</Button>
              </Box>
              {error && <Typography color="error">{error}</Typography>}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
}

