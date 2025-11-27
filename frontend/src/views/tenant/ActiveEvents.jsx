import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Box, Button, Chip } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiGet } from 'src/utils/api';
import { formatDateIndonesia } from 'src/utils/dateFormat';

export default function ActiveEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError('');
      try {
        const resp = await apiGet(BACKEND_URL + '/api/tenant/events/active');
        setEvents(Array.isArray(resp?.data) ? resp.data : resp);
      } catch (e) {
        setError('Failed to load active events');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const paymentChipColor = (status = '') => {
    switch (status.toUpperCase()) {
      case 'SUCCESS':
        return 'success';
      case 'FAILED':
      case 'REJECTED':
        return 'error';
      case 'PENDING':
      default:
        return 'warning';
    }
  };

  const normalizeStatusLabel = (status = '') =>
    status ? status.replace(/_/g, ' ').toUpperCase() : '';

  return (
    <PageContainer title="My Active Events">
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={2}>
        {events.map((ev) => (
          <Grid item xs={12} md={6} key={ev.id}>
            <Card>
              <CardContent>
                {(ev.banner_url || ev.banner) && (
                  <Box
                    mb={2}
                    sx={{ width: '100%', height: 180, overflow: 'hidden', borderRadius: 1, backgroundColor: '#f5f5f5' }}
                  >
                    <img
                      src={ev.banner_url || `${BACKEND_URL}/storage/${ev.banner}`}
                      alt={ev.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  </Box>
                )}
                <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                  <Typography variant="h6">{ev.name}</Typography>
                  {ev.payment_status && (
                    <Chip
                      size="small"
                      color={paymentChipColor(ev.payment_status)}
                      label={`Payment: ${normalizeStatusLabel(ev.payment_status)}`}
                    />
                  )}
                </Box>
                <Typography variant="body2" color="textSecondary">{ev.location}</Typography>
                <Typography variant="body2">{formatDateIndonesia(ev.start_date)} → {formatDateIndonesia(ev.end_date)}</Typography>
                {ev.payment_status && (
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
                    Status Pembayaran: <strong>{normalizeStatusLabel(ev.payment_status)}</strong>
                  </Typography>
                )}
                {ev.payment_summary && (
                  <Box mt={1}>
                    <Typography variant="body2">
                      Booth: Rp. {(ev.payment_summary.booth_price || 0).toLocaleString('id-ID')}
                    </Typography>
                    <Typography variant="body2">
                      Platform Fee: Rp. {(ev.payment_summary.platform_fee || 0).toLocaleString('id-ID')}
                    </Typography>
                    <Typography variant="body2">
                      Insurance: Rp. {(ev.payment_summary.insurance_fee || 0).toLocaleString('id-ID')}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ mt: 0.5 }}>
                      Total: Rp. {(ev.payment_summary.total || 0).toLocaleString('id-ID')}
                    </Typography>
                  </Box>
                )}
                <Box mt={2}>
                  <Button variant="contained" component="a" href={`/app/tenant/events/${ev.id}`}>
                    View Details
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  );
}


