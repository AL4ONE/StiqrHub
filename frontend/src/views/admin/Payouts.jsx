import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Chip, Box, Stack, Button } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiGet } from 'src/utils/api';
import { formatDateIndonesia } from 'src/utils/dateFormat';

const getStatusColor = (status) => {
  switch (status) {
    case 'COMPLETED':
      return 'success';
    case 'READY':
      return 'info';
    case 'PENDING':
      return 'warning';
    default:
      return 'default';
  }
};

const getStatusLabel = (status) => {
  switch (status) {
    case 'COMPLETED':
      return 'Selesai';
    case 'READY':
      return 'Siap Disetujui';
    case 'PENDING':
      return 'Menunggu';
    default:
      return status || 'PENDING';
  }
};

export default function Payouts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const resp = await apiGet(`${BACKEND_URL}/api/admin/payouts/settlement-tracking`);
      setItems(resp?.data || []);
    } catch (e) {
      setError('Failed to load payout tracking');
      console.error('Error loading payout tracking:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <PageContainer title="Payout Tracking (H+1 Settlement)">
        <Typography>Loading...</Typography>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer title="Payout Tracking (H+1 Settlement)">
        <Typography color="error">{error}</Typography>
        <Button onClick={loadData} sx={{ mt: 2 }}>Retry</Button>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="Payout Tracking (H+1 Settlement)">
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="body2" color="text.secondary">
          Menampilkan tracking settlement H+1 untuk semua event dengan pembayaran berhasil
        </Typography>
        <Button variant="outlined" onClick={loadData}>
          Refresh
        </Button>
      </Stack>

      {items.length === 0 ? (
        <Card>
          <CardContent>
            <Typography color="text.secondary" textAlign="center" py={4}>
              Belum ada data payout tracking
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {items.map((item) => (
            <Grid item xs={12} md={6} lg={4} key={`${item.event_id}-${item.settlement_date || ''}`}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Typography variant="h6" sx={{ flex: 1, mr: 1 }}>
                      {item.event_name || 'Unknown Event'}
                    </Typography>
                    <Chip 
                      label={getStatusLabel(item.status)} 
                      color={getStatusColor(item.status)} 
                      size="small" 
                    />
                  </Box>

                  <Stack spacing={1.5}>
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block">
                        Tanggal Settlement (H+1)
                      </Typography>
                      <Typography variant="body2" fontWeight={500}>
                        {item.settlement_date ? formatDateIndonesia(item.settlement_date) : '-'}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block">
                        Tanggal Pembayaran Terakhir
                      </Typography>
                      <Typography variant="body2">
                        {item.latest_payment_date ? formatDateIndonesia(item.latest_payment_date) : '-'}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block">
                        Jumlah Pembayaran Berhasil
                      </Typography>
                      <Typography variant="body2" fontWeight={500}>
                        {item.payments_count || item.success_count || 0} transaksi
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block">
                        Total Amount
                      </Typography>
                      <Typography variant="h6" color="primary" fontWeight={600}>
                        Rp {(item.total_amount || 0).toLocaleString('id-ID')}
                      </Typography>
                    </Box>

                    {item.payout_id && (
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Payout ID: {item.payout_id}
                        </Typography>
                      </Box>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </PageContainer>
  );
}
