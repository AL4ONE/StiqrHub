import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Grid, Box, Chip } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiGet } from 'src/utils/api';

const statusColor = (status) => {
  if (status === 'COMPLETED') return 'success';
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
            {payouts.map((p) => (
              <Grid item xs={12} md={6} key={p.id || p.event_id}>
                <Card variant="outlined">
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                      <Typography variant="h6">{p.event_name}</Typography>
                      <Chip label={p.status} color={statusColor(p.status)} size="small" />
                    </Box>
                    <Typography variant="body2" color="textSecondary" mb={1}>
                      Registrations: {p.total_registrations}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" mb={1}>
                      Gross: Rp {(p.gross_amount || 0).toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" mb={1}>
                      Platform Fee: Rp {(p.platform_fee || 0).toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" mb={1}>
                      Net Payout: Rp {(p.amount || 0).toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" mb={1}>
                      Date: {p.payout_date}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" mb={1}>
                      Reference: {p.reference}
                    </Typography>
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