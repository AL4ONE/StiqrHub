import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Box, Chip } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiGet } from 'src/utils/api';
import { formatDateIndonesia } from 'src/utils/dateFormat';

const statusColor = (status) => {
  if (status === 'COMPLETED') return 'success';
  if (status === 'FAILED') return 'error';
  if (status === 'PENDING') return 'warning';
  return 'default';
};

export default function Payouts() {
  const [payouts, setPayouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError('');
      try {
        const data = await apiGet(BACKEND_URL + '/api/eo/payouts');
        setPayouts(data?.data || []);
      } catch (e) {
        setError('Failed to load payouts');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <PageContainer title="Payouts & Settlement">
      <Card>
        <CardContent>
          <Typography variant="h6" mb={3}>Payouts & Settlement</Typography>
          {loading && <Typography>Loading...</Typography>}
          {error && <Typography color="error">{error}</Typography>}
          <Grid container spacing={2}>
            {payouts.map((payout) => (
              <Grid item xs={12} md={6} key={payout.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                      <Typography variant="h6">Payout #{payout.id}</Typography>
                      <Chip label={payout.status || 'PENDING'} color={statusColor(payout.status)} size="small" />
                    </Box>
                    <Typography variant="body2" color="textSecondary" mb={1}>
                      Event: {payout.event_name || '-'}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" mb={1}>
                      Total Amount: Rp {(payout.total_amount || 0).toLocaleString('id-ID')}
                    </Typography>
                    {payout.created_at && (
                      <Typography variant="body2" color="textSecondary">
                        Date: {formatDateIndonesia(payout.created_at)}
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

