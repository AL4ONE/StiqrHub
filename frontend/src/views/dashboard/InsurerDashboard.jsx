import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Box, Button } from '@mui/material';
import { IconShield, IconAlertCircle, IconCheck, IconX } from '@tabler/icons-react';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiGet } from 'src/utils/api';
import { Link } from 'react-router';

export default function InsurerDashboard() {
  const [stats, setStats] = useState({
    total_claims: 0,
    pending_claims: 0,
    approved_claims: 0,
    rejected_claims: 0,
    total_approved_amount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError('');
      try {
        const resp = await apiGet(`${BACKEND_URL}/api/insurer/claims/stats`);
        const base = resp?.data || stats;
        // Fallback ensure pending count matches list
        const list = await apiGet(`${BACKEND_URL}/api/insurer/claims?status=REQUEST_CLAIM`);
        const pendingFromList = Array.isArray(list?.data) ? list.data.length : (Array.isArray(list) ? list.length : 0);
        setStats({ ...base, pending_claims: pendingFromList });
      } catch (e) {
        setError('Failed to load insurer stats');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <PageContainer title="Insurer Dashboard">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4">{loading ? '...' : stats.total_claims}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">Total Claims</Typography>
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
                  <Typography variant="h4">{loading ? '...' : stats.pending_claims}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">Pending Claims</Typography>
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
                  <Typography variant="h4">{loading ? '...' : stats.approved_claims}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">Approved</Typography>
                </Box>
                <IconCheck size={40} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4">{loading ? '...' : stats.rejected_claims}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">Rejected</Typography>
                </Box>
                <IconX size={40} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">Claims Management</Typography>
                <Button variant="contained" component={Link} to="/insurer/claims">Go to Claims Inbox</Button>
              </Box>
              <Typography>Review and process insurance claims from tenants.</Typography>
              {error && <Typography color="error" mt={2}>{error}</Typography>}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
}

