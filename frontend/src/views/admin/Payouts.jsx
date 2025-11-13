import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Chip, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiGet } from 'src/utils/api';
import { formatDate } from 'src/utils/dateFormat';

const statusColor = (s) => (s === 'SETTLED' ? 'success' : 'warning');

export default function Payouts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError('');
      try {
        const resp = await apiGet(`${BACKEND_URL}/api/admin/payouts/settlement-tracking`);
        setItems(resp?.data || []);
      } catch (e) {
        setError('Failed to load payout tracking');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <PageContainer title="Payout Tracking (H+1)">
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={2}>
        {items.map((p) => (
          <Grid item xs={12} md={6} key={`${p.event_id}-${p.date || ''}`}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                  <Typography variant="h6">{p.event_name}</Typography>
                  <Chip label={p.status || 'PENDING'} color={statusColor(p.status || '')} size="small" />
                </Box>
                <Typography variant="body2" color="textSecondary" mb={1}>Date: {p.date ? formatDate(p.date) : '-'}</Typography>
                <Typography variant="body2" mb={1}>Total Success Payments: {p.success_count || 0}</Typography>
                <Typography variant="body2" mb={1}>Amount: Rp {(p.total_amount || 0).toLocaleString()}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  );
}
