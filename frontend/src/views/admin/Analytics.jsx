import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiGet } from 'src/utils/api';

export default function Analytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError('');
      try {
        const resp = await apiGet(`${BACKEND_URL}/api/admin/analytics/summary`);
        setData(resp?.data || null);
      } catch (e) {
        setError('Failed to load analytics');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const Item = ({ title, value }) => (
    <Card>
      <CardContent>
        <Typography variant="h4">{value}</Typography>
        <Typography variant="subtitle2" color="textSecondary">{title}</Typography>
      </CardContent>
    </Card>
  );

  return (
    <PageContainer title="Analytics">
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      {data && (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}><Item title="Total Events" value={data.total_events} /></Grid>
          <Grid item xs={12} sm={6} md={4}><Item title="Active Events" value={data.active_events} /></Grid>
          <Grid item xs={12} sm={6} md={4}><Item title="Total Transactions" value={data.total_transactions} /></Grid>
          <Grid item xs={12} sm={6} md={4}><Item title="QRIS Volume (Success)" value={`Rp ${Number(data.qris_volume || 0).toLocaleString()}`} /></Grid>
          <Grid item xs={12} sm={6} md={4}><Item title="Active Claims" value={data.active_claims} /></Grid>
          <Grid item xs={12} sm={6} md={4}><Item title="Approved Claims" value={data.approved_claims} /></Grid>
          <Grid item xs={12} sm={6} md={4}><Item title="Rejected Claims" value={data.rejected_claims} /></Grid>
        </Grid>
      )}
    </PageContainer>
  );
}
