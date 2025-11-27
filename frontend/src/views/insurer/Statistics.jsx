import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiGet } from 'src/utils/api';

export default function Statistics() {
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
        setStats(resp?.data || stats);
      } catch (e) {
        setError('Failed to load statistics');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const Item = ({ title, value, color = 'primary' }) => (
    <Card>
      <CardContent>
        <Typography variant="h4" color={color}>{value}</Typography>
        <Typography variant="subtitle2" color="textSecondary">{title}</Typography>
      </CardContent>
    </Card>
  );

  return (
    <PageContainer title="Claims Statistics">
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Item title="Total Claims" value={stats.total_claims} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Item title="Pending Claims" value={stats.pending_claims} color="warning" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Item title="Approved Claims" value={stats.approved_claims} color="success" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Item title="Rejected Claims" value={stats.rejected_claims} color="error" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Item title="Total Approved Amount" value={`Rp ${Number(stats.total_approved_amount || 0).toLocaleString()}`} color="info" />
        </Grid>
      </Grid>
    </PageContainer>
  );
}
