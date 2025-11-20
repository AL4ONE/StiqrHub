import React, { useEffect, useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Grid, 
  Box, 
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from '@mui/icons-material';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiGet } from 'src/utils/api';
import { formatDateIndonesia } from 'src/utils/dateFormat';

const statusColor = (status) => {
  if (status === 'COMPLETED' || status === 'SETTLED') return 'success';
  if (status === 'PENDING') return 'warning';
  return 'default';
};

const paymentStatusColor = (status) => {
  if (status === 'SUCCESS') return 'success';
  if (status === 'PENDING') return 'warning';
  if (status === 'FAILED') return 'error';
  return 'default';
};

const formatPrice = (price) => {
  if (price == null) return 'Rp 0';
  const num = Math.floor(Number(price));
  const formatted = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `Rp ${formatted}`;
};

export default function Payouts() {
  const [payouts, setPayouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [paymentDetailsDialog, setPaymentDetailsDialog] = useState(null);

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

  const toggleExpand = (eventId) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId);
  };

  return (
    <PageContainer title="Payouts & Settlement">
      <Card>
        <CardContent>
          <Typography variant="h6" mb={3}>Payouts & Settlement</Typography>
          {loading && <Typography>Loading...</Typography>}
          {error && <Typography color="error">{error}</Typography>}
          
          {!loading && payouts.length === 0 && (
            <Box textAlign="center" py={4}>
              <Typography variant="body1" color="textSecondary">
                No payouts available yet. Payouts will appear here once tenants make successful payments.
              </Typography>
            </Box>
          )}

          <Grid container spacing={2}>
            {payouts.map((p) => (
              <Grid item xs={12} key={p.event_id}>
                <Card variant="outlined">
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                      <Box>
                        <Typography variant="h6" mb={1}>{p.event_name}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          Event Date: {p.event_date ? formatDateIndonesia(p.event_date) : 'N/A'}
                        </Typography>
                      </Box>
                      <Chip label={p.status} color={statusColor(p.status)} size="small" />
                    </Box>
                    
                    <Grid container spacing={2} mb={2}>
                      <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="body2" color="textSecondary">Total Registrations</Typography>
                        <Typography variant="h6">{p.total_registrations || 0}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="body2" color="textSecondary">Success Payments</Typography>
                        <Typography variant="h6" color="success.main">{p.success_payments_count || 0}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="body2" color="textSecondary">Total Amount</Typography>
                        <Typography variant="h6">{formatPrice(p.total_amount)}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="body2" color="textSecondary">Net Amount</Typography>
                        <Typography variant="h6" color="primary.main">{formatPrice(p.net_amount)}</Typography>
                      </Grid>
                    </Grid>

                    <Box mb={2}>
                      <Typography variant="body2" color="textSecondary" mb={0.5}>
                        Platform Fee: {formatPrice(p.platform_fee)} ({p.success_payments_count || 0} × Rp 5.000)
                      </Typography>
                      {p.payout_date && (
                        <Typography variant="body2" color="textSecondary">
                          Payout Date: {formatDateIndonesia(p.payout_date)}
                        </Typography>
                      )}
                    </Box>

                    {p.payment_details && p.payment_details.length > 0 && (
                      <>
                        <Divider sx={{ my: 2 }} />
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                          <Typography variant="subtitle2">
                            Payment Details ({p.payment_details.length} {p.payment_details.length === 1 ? 'payment' : 'payments'})
                          </Typography>
                          <Button
                            size="small"
                            endIcon={expandedEvent === p.event_id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            onClick={() => toggleExpand(p.event_id)}
                          >
                            {expandedEvent === p.event_id ? 'Hide Details' : 'View Details'}
                          </Button>
                        </Box>

                        {expandedEvent === p.event_id && (
                          <TableContainer component={Paper} sx={{ mt: 2 }}>
                            <Table size="small">
                              <TableHead>
                                <TableRow>
                                  <TableCell><strong>No</strong></TableCell>
                                  <TableCell><strong>Tenant Name</strong></TableCell>
                                  <TableCell><strong>Email</strong></TableCell>
                                  <TableCell><strong>Amount</strong></TableCell>
                                  <TableCell><strong>Status</strong></TableCell>
                                  <TableCell><strong>Payment Date</strong></TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {p.payment_details.map((payment, index) => (
                                  <TableRow key={payment.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{payment.tenant_name}</TableCell>
                                    <TableCell>{payment.tenant_email}</TableCell>
                                    <TableCell>{formatPrice(payment.amount)}</TableCell>
                                    <TableCell>
                                      <Chip 
                                        label={payment.status} 
                                        size="small"
                                        color={paymentStatusColor(payment.status)}
                                      />
                                    </TableCell>
                                    <TableCell>
                                      {payment.payment_date ? formatDateIndonesia(payment.payment_date) : 'N/A'}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        )}
                      </>
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

