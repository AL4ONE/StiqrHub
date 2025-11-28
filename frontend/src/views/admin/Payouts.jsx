import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Box, Chip, Stack, Button } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiGet } from 'src/utils/api';
import { formatDateIndonesia } from 'src/utils/dateFormat';

const statusColor = (s) => (s === 'COMPLETED' ? 'success' : s === 'FAILED' ? 'error' : 'warning');

export default function Payouts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError('');
      try {
        const resp = await apiGet(`${BACKEND_URL}/api/admin/payouts`);
        setItems(resp?.data || []);
      } catch (e) {
        setError('Failed to load payouts');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <PageContainer title="Payouts Management">
      <Card>
        <CardContent>
          <Typography variant="h6" mb={3}>Payouts & Settlement</Typography>
          {loading && <Typography>Loading...</Typography>}
          {error && <Typography color="error">{error}</Typography>}
          <Grid container spacing={2}>
            {items.map((item) => (
              <Grid item xs={12} md={6} key={item.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                      <Typography variant="h6">Payout #{item.id}</Typography>
                      <Chip label={item.status || 'PENDING'} color={statusColor(item.status)} size="small" />
                    </Box>
                    <Typography variant="body2" color="textSecondary" mb={1}>
                      Event: {item?.event_name || '-'}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" mb={1}>
                      Total Amount: Rp {(item.total_amount || 0).toLocaleString('id-ID')}
                    </Typography>
                    {item.created_at && (
                      <Typography variant="body2" color="textSecondary">
                        Date: {formatDateIndonesia(item.created_at)}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
