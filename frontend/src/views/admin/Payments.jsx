import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Box, Button, Chip, TextField, MenuItem, Stack, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiGet, apiPost } from 'src/utils/api';

const statusColor = (s) => (s === 'SUCCESS' ? 'success' : s === 'FAILED' ? 'error' : 'warning');

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [proofDialogOpen, setProofDialogOpen] = useState(false);
  const [selectedProof, setSelectedProof] = useState(null);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const url = status ? `${BACKEND_URL}/api/admin/payments?status=${status}` : `${BACKEND_URL}/api/admin/payments`;
      const resp = await apiGet(url);
      setPayments(resp?.data || []);
    } catch (e) {
      setError('Failed to load payments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { (async () => { await load(); })(); }, [status]);

  const markPaid = async (id) => {
    await apiPost(`${BACKEND_URL}/api/admin/payments/${id}/mark-paid`);
    await load();
  };
  const markFailed = async (id) => {
    await apiPost(`${BACKEND_URL}/api/admin/payments/${id}/mark-failed`);
    await load();
  };

  const openProofDialog = (payment) => {
    if (payment.payment_proof_url) {
      setSelectedProof(payment.payment_proof_url);
      setProofDialogOpen(true);
    }
  };

  const closeProofDialog = () => {
    setProofDialogOpen(false);
    setSelectedProof(null);
  };

  return (
    <PageContainer title="Payments Management">
      <Card>
        <CardContent>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={2} alignItems="center">
            <Typography variant="h6" flex={1}>Payments</Typography>
            <TextField label="Filter Status" select value={status} onChange={(e) => setStatus(e.target.value)} size="small" sx={{ minWidth: 180 }}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="PENDING">PENDING</MenuItem>
              <MenuItem value="SUCCESS">SUCCESS</MenuItem>
              <MenuItem value="FAILED">FAILED</MenuItem>
            </TextField>
            <Button variant="outlined" onClick={load}>Refresh</Button>
          </Stack>
          {loading && <Typography>Loading...</Typography>}
          {error && <Typography color="error">{error}</Typography>}
          <Grid container spacing={2}>
            {payments.map((p) => (
              <Grid item xs={12} md={6} key={p.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                      <Typography variant="h6">Payment #{p.id}</Typography>
                      <Chip label={p.status} color={statusColor(p.status)} size="small" />
                    </Box>
                    <Typography variant="body2" color="textSecondary" mb={1}>Amount: Rp {(p.amount || 0).toLocaleString()}</Typography>
                    <Typography variant="body2" color="textSecondary" mb={1}>Event: {p?.registration?.event?.name || '-'}</Typography>
                    <Typography variant="body2" color="textSecondary" mb={1}>Tenant: {p?.registration?.tenant?.name || '-'}</Typography>
                    {p.payment_proof_url && (
                      <Box mb={2}>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => openProofDialog(p)}
                          sx={{ mb: 1 }}
                        >
                          Lihat Bukti Pembayaran
                        </Button>
                      </Box>
                    )}
                    <Stack direction="row" spacing={1}>
                      <Button size="small" variant="contained" disabled={p.status !== 'PENDING'} onClick={() => markPaid(p.id)}>Mark Paid</Button>
                      <Button size="small" variant="outlined" color="error" disabled={p.status !== 'PENDING'} onClick={() => markFailed(p.id)}>Mark Failed</Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      <Dialog
        open={proofDialogOpen}
        onClose={closeProofDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Bukti Pembayaran</DialogTitle>
        <DialogContent>
          {selectedProof && (
            <Box>
              {selectedProof.toLowerCase().endsWith('.pdf') ? (
                <iframe
                  src={selectedProof.startsWith('http') ? selectedProof : `${BACKEND_URL}${selectedProof}`}
                  width="100%"
                  height="600px"
                  style={{ border: 'none' }}
                  title="Bukti Pembayaran PDF"
                />
              ) : (
                <Box
                  component="img"
                  src={selectedProof.startsWith('http') ? selectedProof : `${BACKEND_URL}${selectedProof}`}
                  alt="Bukti Pembayaran"
                  sx={{
                    width: '100%',
                    maxHeight: '70vh',
                    objectFit: 'contain',
                  }}
                />
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeProofDialog}>Tutup</Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
}
