import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
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
  Button,
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

const formatPrice = (price) => {
  if (price == null) return 'Rp 0';
  const num = Math.floor(Number(price));
  const formatted = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `Rp ${formatted}`;
};

const paymentStatusColor = (status) => {
  if (status === 'SUCCESS') return 'success';
  if (status === 'PENDING') return 'warning';
  if (status === 'FAILED') return 'error';
  return 'default';
};

export default function EventHistory() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [tenantDialog, setTenantDialog] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError('');
      try {
        const data = await apiGet(BACKEND_URL + '/api/eo/events/history');
        setEvents(data?.data || []);
      } catch (e) {
        setError('Failed to load event history');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const toggleExpand = (eventId) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId);
  };

  const openTenantDialog = (event) => {
    setTenantDialog(event);
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <PageContainer title="Event History">
      <Card>
        <CardContent>
          <Typography variant="h6" mb={3}>Event History</Typography>
          
          {events.length === 0 ? (
            <Box textAlign="center" py={4}>
              <Typography variant="body1" color="textSecondary">
                No completed events yet.
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={2}>
              {events.map((event) => (
                <Grid item xs={12} key={event.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                        <Box>
                          <Typography variant="h6" mb={1}>{event.name}</Typography>
                          <Typography variant="body2" color="textSecondary">
                            {formatDateIndonesia(event.start_date)} - {formatDateIndonesia(event.end_date)}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {event.location} • {event.category}
                          </Typography>
                        </Box>
                      </Box>

                      <Grid container spacing={2} mb={2}>
                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="body2" color="textSecondary">Total Registrations</Typography>
                          <Typography variant="h6">{event.total_registrations || 0}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="body2" color="textSecondary">Total Revenue</Typography>
                          <Typography variant="h6" color="success.main">{formatPrice(event.total_revenue)}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="body2" color="textSecondary">Platform Fee</Typography>
                          <Typography variant="h6">{formatPrice(event.platform_fee)}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="body2" color="textSecondary">Net Revenue</Typography>
                          <Typography variant="h6" color="primary.main">{formatPrice(event.net_revenue)}</Typography>
                        </Grid>
                      </Grid>

                      {event.tenant_details && event.tenant_details.length > 0 && (
                        <>
                          <Divider sx={{ my: 2 }} />
                          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                            <Typography variant="subtitle2">
                              Tenant Details ({event.tenant_details.length} {event.tenant_details.length === 1 ? 'tenant' : 'tenants'})
                            </Typography>
                            <Button
                              size="small"
                              endIcon={expandedEvent === event.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                              onClick={() => toggleExpand(event.id)}
                            >
                              {expandedEvent === event.id ? 'Hide Details' : 'View Details'}
                            </Button>
                          </Box>

                          {expandedEvent === event.id && (
                            <TableContainer component={Paper} sx={{ mt: 2 }}>
                              <Table size="small">
                                <TableHead>
                                  <TableRow>
                                    <TableCell><strong>No</strong></TableCell>
                                    <TableCell><strong>Tenant Name</strong></TableCell>
                                    <TableCell><strong>Email</strong></TableCell>
                                    <TableCell><strong>Registration Status</strong></TableCell>
                                    <TableCell><strong>Payment Status</strong></TableCell>
                                    <TableCell><strong>Payment Amount</strong></TableCell>
                                    <TableCell><strong>Payment Date</strong></TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {event.tenant_details.map((tenant, index) => (
                                    <TableRow key={tenant.tenant_id || index}>
                                      <TableCell>{index + 1}</TableCell>
                                      <TableCell>{tenant.tenant_name}</TableCell>
                                      <TableCell>{tenant.tenant_email}</TableCell>
                                      <TableCell>
                                        <Chip 
                                          label={tenant.registration_status || 'REGISTERED'} 
                                          size="small"
                                          color={tenant.registration_status === 'PAID' || tenant.registration_status === 'ACTIVE' ? 'success' : 'default'}
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <Chip 
                                          label={tenant.payment_status} 
                                          size="small"
                                          color={paymentStatusColor(tenant.payment_status)}
                                        />
                                      </TableCell>
                                      <TableCell>{formatPrice(tenant.payment_amount)}</TableCell>
                                      <TableCell>
                                        {tenant.payment_date ? formatDateIndonesia(tenant.payment_date) : 'N/A'}
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
          )}
        </CardContent>
      </Card>
    </PageContainer>
  );
}

