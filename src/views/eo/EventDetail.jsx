import React, { useEffect, useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Grid, 
  Box, 
  Chip, 
  Stack, 
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiGet, apiPut, apiDelete } from 'src/utils/api';
import { useParams, useNavigate } from 'react-router-dom';
import { formatDateIndonesia, toIndonesiaDateTimeLocal, fromIndonesiaDateTimeToUTC } from 'src/utils/dateFormat';

const WHATSAPP_NUMBER = '+62 821-1838-3415';
const WHATSAPP_LINK = 'https://wa.me/6282118383415?text=Halo%20Stiqr%20Hub%2C%20saya%20ingin%20bergabung%20ke%20komunitas%20WA.';

const statusColor = (status) => {
  if (status === 'ACTIVATED') return 'success';
  if (status === 'PUBLISHED') return 'primary';
  if (status === 'DRAFT') return 'default';
  return 'default';
};

const formatPrice = (price) => {
  if (price == null) return 'Free';
  const num = Math.floor(Number(price));
  const formatted = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `Rp ${formatted}`;
};

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const [publishForm, setPublishForm] = useState({
    published_start_date: '',
    published_end_date: ''
  });
  const [publishError, setPublishError] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [registrationsDialogOpen, setRegistrationsDialogOpen] = useState(false);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await apiGet(BACKEND_URL + `/api/eo/events/${id}`);
      setEvent(data?.data || null);
    } catch (e) {
      setError('Failed to load event details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => { await load(); })();
  }, [id]);

  const handlePublishClick = () => {
    // Check if published dates are null
    if (!event.published_start_date || !event.published_end_date) {
      // Set default published_start_date to now in Indonesia timezone
      const now = new Date();
      const publishedStart = toIndonesiaDateTimeLocal(now);
      
      setPublishForm({
        published_start_date: publishedStart,
        published_end_date: ''
      });
      setPublishDialogOpen(true);
      setPublishError('');
    } else {
      // If already has published dates, load them in Indonesia timezone for editing
      setPublishForm({
        published_start_date: toIndonesiaDateTimeLocal(event.published_start_date),
        published_end_date: toIndonesiaDateTimeLocal(event.published_end_date)
      });
      setPublishDialogOpen(true);
      setPublishError('');
    }
  };

  const handlePublishSubmit = async () => {
    setPublishError('');
    
    // Validate
    if (!publishForm.published_start_date || !publishForm.published_end_date) {
      setPublishError('Both published start date and end date are required');
      return;
    }

    // Convert publish dates from Indonesia timezone to UTC for comparison
    const startDateUTC = fromIndonesiaDateTimeToUTC(publishForm.published_start_date);
    const endDateUTC = fromIndonesiaDateTimeToUTC(publishForm.published_end_date);
    
    if (!startDateUTC || !endDateUTC) {
      setPublishError('Invalid date format');
      return;
    }

    const startDate = new Date(startDateUTC);
    const endDate = new Date(endDateUTC);
    const eventEndDate = new Date(event.end_date); // event.end_date is UTC from backend

    if (endDate > eventEndDate) {
      setPublishError('Published end date cannot be later than event end date');
      return;
    }

    if (endDate < startDate) {
      setPublishError('Published end date must be after start date');
      return;
    }

    setSaving(true);
    try {
      // Convert from Indonesia timezone to UTC for backend
      const res = await apiPut(BACKEND_URL + `/api/eo/events/${id}`, {
        status: 'PUBLISHED',
        published_start_date: fromIndonesiaDateTimeToUTC(publishForm.published_start_date),
        published_end_date: fromIndonesiaDateTimeToUTC(publishForm.published_end_date)
      });
      
      if (res?.status === 'success') {
        setPublishDialogOpen(false);
        await load();
      } else {
        setPublishError(res?.message || 'Failed to publish event');
      }
    } catch (e) {
      setPublishError('Failed to publish event');
    } finally {
      setSaving(false);
    }
  };

  const setStatus = async (status) => {
    setSaving(true);
    try {
      const res = await apiPut(BACKEND_URL + `/api/eo/events/${id}`, { status });
      if (res?.status === 'success') {
        await load();
      } else {
        alert(res?.message || 'Failed to update status');
      }
    } catch (e) {
      alert('Failed to update status');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setDeleting(true);
    try {
      const res = await apiDelete(BACKEND_URL + `/api/eo/events/${id}`);
      if (res?.status === 'success') {
        navigate('/app/eo/events');
      } else {
        alert(res?.message || 'Failed to delete event');
        setDeleting(false);
        setDeleteDialogOpen(false);
      }
    } catch (e) {
      alert('Failed to delete event');
      setDeleting(false);
      setDeleteDialogOpen(false);
    }
  };

  // Delete button is always enabled

  // Calculate remaining tenant capacity (total tenant slots vs registered tenants)
  const boothCapacity = Number(event?.booth_capacity) || 0;
  const tenantPerBooth = Number(event?.tenant_capacity) || 0;
  let totalTenantCapacity = 0;
  if (boothCapacity > 0 && tenantPerBooth > 0) {
    totalTenantCapacity = boothCapacity * tenantPerBooth;
  } else if (boothCapacity > 0) {
    totalTenantCapacity = boothCapacity;
  } else if (tenantPerBooth > 0) {
    totalTenantCapacity = tenantPerBooth;
  }
  const registeredTenants = event?.registrations_count ?? (event?.registrations?.length ?? 0);
  const remainingTenantCapacity = Math.max(totalTenantCapacity - registeredTenants, 0);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return formatDateIndonesia(dateString);
  };

  const getPaymentStatusColor = (status) => {
    if (status === 'SUCCESS') return 'success';
    if (status === 'PENDING') return 'warning';
    if (status === 'FAILED') return 'error';
    return 'default';
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!event) return <Typography>Event not found</Typography>;

  return (
    <PageContainer title="Event Details">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                <Typography variant="h4">{event.name}</Typography>
                <Chip label={event.status} color={statusColor(event.status)} />
              </Box>
              {(event.banner_url || event.banner) && (
                <Box mb={2}>
                  <img
                    src={
                      event.banner_url
                        ? (event.banner_url.startsWith('http') ? event.banner_url : `${BACKEND_URL}${event.banner_url}`)
                        : `${BACKEND_URL}/storage/${event.banner}`
                    }
                    alt="event banner"
                    style={{ width: '100%', maxHeight: 320, objectFit: 'cover', borderRadius: 8 }}
                  />
                </Box>
              )}
              <Box display="flex" gap={1} mb={1}>
                {event.status === 'ACTIVATED' || event.status === 'PUBLISHED' ? (
                  <Button variant="contained" color="success" size="small" disabled>
                    Activated
                  </Button>
                ) : (
                  <Button variant="outlined" size="small" disabled>
                    Activate (admin only)
                  </Button>
                )}
                <Button 
                  variant="contained" 
                  size="small" 
                  disabled={saving || event.status !== 'ACTIVATED'}
                  onClick={handlePublishClick}
                >
                  {event.status !== 'ACTIVATED' ? 'Publish (after activated)' : 'Publish'}
                </Button>
              </Box>
              {event.status === 'DRAFT' && (
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                  Event harus di-activate oleh admin sebelum bisa dipublish (estimasi approval 3-5 x 24 jam).
                </Typography>
              )}
              {event.published_start_date && event.published_end_date && (
                <Box mb={2}>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Published Period:</strong> {formatDateIndonesia(event.published_start_date)} sampai {formatDateIndonesia(event.published_end_date)}
                  </Typography>
                </Box>
              )}
              <Typography variant="body1" color="textSecondary" mb={2}>{event.location}</Typography>
              <Typography variant="body2" mb={1}>
                <strong>Start:</strong> {formatDateIndonesia(event.start_date)}
              </Typography>
              <Typography variant="body2" mb={1}>
                <strong>End:</strong> {formatDateIndonesia(event.end_date)}
              </Typography>
              <Typography variant="body2" mb={1}>
                <strong>Category:</strong> {event.category}
              </Typography>
              <Typography variant="body2" mb={1}>
                <strong>Booth Capacity:</strong> {event.booth_capacity}
              </Typography>
              <Typography variant="body2" mb={1}>
                <strong>Booth Size:</strong> {event.booth_size}
              </Typography>
              <Typography variant="body2" mb={1}>
                <strong>Booth Price:</strong> {formatPrice(event.booth_price)}
              </Typography>
              <Typography variant="body2" mb={1}>
                <strong>Payment Method:</strong> {event.payment_method}
              </Typography>
              <Typography variant="body2" mb={1}>
                <strong>Insurance:</strong> {event.insurance_active ? 'Active' : 'Inactive'}
              </Typography>
              <Typography variant="body2" mb={2}>
                <strong>Estimated Visitors:</strong> {event.estimated_visitors}
              </Typography>
              
              {/* Bank Accounts */}
              {event.bank_accounts && event.bank_accounts.length > 0 && (
                <Box mt={2} mb={2}>
                  <Typography variant="subtitle1" mb={1}>
                    <strong>Nomor Rekening</strong>
                  </Typography>
                  <Stack spacing={1}>
                    {event.bank_accounts.map((account, idx) => (
                      <Box 
                        key={idx} 
                        sx={{ 
                          p: 1.5, 
                          border: '1px solid', 
                          borderColor: account.is_default ? 'primary.main' : 'divider',
                          borderRadius: 1,
                          backgroundColor: account.is_default ? 'primary.50' : 'transparent'
                        }}
                      >
                        <Typography variant="body2" fontWeight={account.is_default ? 'bold' : 'normal'}>
                          {account.is_default && <Chip label="Default" size="small" color="primary" sx={{ mr: 1, mb: 0.5 }} />}
                          <strong>{account.bank_name}</strong>
                        </Typography>
                        <Typography variant="body2">
                          {account.account_number}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          a.n. {account.account_name}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              )}
              
              <Stack direction="row" spacing={2}>
                <Button variant="outlined" onClick={() => navigate(`/app/eo/events/${id}/rules`)}>
                  Manage Rules
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate(`/app/eo/events/${id}/edit`)}
                  disabled={event.status !== 'DRAFT'}
                  sx={{
                    ...((event.status !== 'DRAFT') && {
                      backgroundColor: 'rgba(0, 0, 0, 0.12)',
                      color: 'rgba(0, 0, 0, 0.26)',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.12)',
                      }
                    })
                  }}
                >
                  Edit Event
                </Button>
                <Button 
                  variant="outlined" 
                  color="error"
                  onClick={handleDeleteClick}
                  disabled={deleting}
                >
                  Delete Event
                </Button>
                <Button variant="outlined" onClick={() => navigate('/app/eo/events')}>
                  Back to Events
                </Button>
              </Stack>

              <Divider sx={{ my: 4 }} />
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  border: '1px dashed',
                  borderColor: 'primary.light',
                  backgroundColor: 'primary.50',
                }}
              >
                <Typography variant="h6" mb={0.5}>
                  Gabung WhatsApp Stiqr
                </Typography>
                <Typography variant="body2" color="textSecondary" mb={2}>
                  EO perlu bantuan publikasi atau ingin koordinasi langsung? Join grup WA
                  resmi kami lewat tombol ini.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button
                    component="a"
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="contained"
                    color="success"
                  >
                    Buka WhatsApp
                  </Button>
                  <Box>
                    <Typography variant="caption" color="textSecondary">
                      Nomor admin Stiqr
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {WHATSAPP_NUMBER}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" mb={2}>Registrations</Typography>
              <Typography variant="h4" color="primary">{event.registrations_count ?? (event.registrations ? event.registrations.length : 0)}</Typography>
              <Typography variant="body2" color="textSecondary" mb={2}>
                Total registrations for this event
              </Typography>
              {totalTenantCapacity > 0 ? (
                <Box mb={2}>
                  <Typography variant="body2">
                    <strong>Tenant Slots:</strong> {registeredTenants} / {totalTenantCapacity}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color={remainingTenantCapacity > 0 ? 'success.main' : 'error.main'}
                  >
                    <strong>Remaining Tenant Slots:</strong> {remainingTenantCapacity}
                  </Typography>
                </Box>
              ) : (
                <Typography variant="body2" color="textSecondary" mb={2}>
                  Set tenant capacity to track remaining slots.
                </Typography>
              )}
              <Button 
                variant="outlined" 
                size="small" 
                fullWidth
                onClick={() => setRegistrationsDialogOpen(true)}
              >
                View Registrants
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" mb={2}>Rules</Typography>
              {event.rules && event.rules.length > 0 ? (
                <Stack spacing={1}>
                  {event.rules.map((rule, index) => (
                    <Typography key={index} variant="body2">
                      • {rule.rule_name}
                    </Typography>
                  ))}
                </Stack>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No rules set for this event
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => !deleting && setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Event</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this event? This action cannot be undone.
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            Event: <strong>{event?.name}</strong>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} disabled={deleting}>
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained" disabled={deleting}>
            {deleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Publish Dialog */}
      <Dialog open={publishDialogOpen} onClose={() => !saving && setPublishDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Set Publish Dates</DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2">
              <strong>Event Period:</strong> {formatDateIndonesia(event.start_date)} - {formatDateIndonesia(event.end_date)}
            </Typography>
            <Typography variant="body2" sx={{ mt: 0.5 }}>
              Published end date cannot exceed event end date.
            </Typography>
          </Alert>

          {publishError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {publishError}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Published Start Date (WIB)"
            type="datetime-local"
            value={publishForm.published_start_date}
            onChange={(e) => setPublishForm({ ...publishForm, published_start_date: e.target.value })}
            InputLabelProps={{ shrink: true }}
            margin="normal"
            required
            helperText="Waktu Indonesia Barat (WIB) - When event becomes visible to tenants"
          />

          <TextField
            fullWidth
            label="Published End Date (WIB)"
            type="datetime-local"
            value={publishForm.published_end_date}
            onChange={(e) => setPublishForm({ ...publishForm, published_end_date: e.target.value })}
            InputLabelProps={{ shrink: true }}
            margin="normal"
            required
            inputProps={{
              max: toIndonesiaDateTimeLocal(event.end_date)
            }}
            helperText={`Waktu Indonesia Barat (WIB) - Last date tenants can register (max: ${formatDateIndonesia(event.end_date)})`}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPublishDialogOpen(false)} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handlePublishSubmit} variant="contained" disabled={saving}>
            {saving ? 'Publishing...' : 'Publish Event'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Registrations Dialog */}
      <Dialog 
        open={registrationsDialogOpen} 
        onClose={() => setRegistrationsDialogOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>Event Registrations</DialogTitle>
        <DialogContent>
          {totalTenantCapacity > 0 && (
            <Alert 
              severity={remainingTenantCapacity > 0 ? 'info' : 'warning'} 
              sx={{ 
                mb: 2,
                color: '#fff',
                bgcolor: remainingTenantCapacity > 0 ? 'primary.main' : 'warning.dark',
                '& .MuiAlert-icon': { color: '#fff' },
                '& .MuiAlert-message': { color: '#fff' },
              }}
            >
              <Typography variant="body2" sx={{ color: '#fff' }}>
                <strong>Tenant Slots:</strong> {registeredTenants} / {totalTenantCapacity}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ color: '#fff' }}
              >
                <strong>Remaining Tenant Slots:</strong> {remainingTenantCapacity}
              </Typography>
            </Alert>
          )}
          {event?.registrations && event.registrations.length > 0 ? (
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>No</strong></TableCell>
                    <TableCell><strong>Tenant Name</strong></TableCell>
                    <TableCell><strong>Email</strong></TableCell>
                    <TableCell><strong>Registration Status</strong></TableCell>
                    <TableCell><strong>Payment Status</strong></TableCell>
                    <TableCell><strong>Payment Date</strong></TableCell>
                    <TableCell><strong>Payment Amount</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {event.registrations.map((registration, index) => (
                    <TableRow key={registration.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{registration.tenant?.name || 'N/A'}</TableCell>
                      <TableCell>{registration.tenant?.email || 'N/A'}</TableCell>
                      <TableCell>
                        <Chip 
                          label={registration.status || 'REGISTERED'} 
                          size="small"
                          color={registration.status === 'PAID' || registration.status === 'ACTIVE' ? 'success' : 'default'}
                        />
                      </TableCell>
                      <TableCell>
                        {registration.payment ? (
                          <Chip 
                            label={registration.payment.status} 
                            size="small"
                            color={getPaymentStatusColor(registration.payment.status)}
                          />
                        ) : (
                          <Typography variant="body2" color="textSecondary">No payment</Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        {registration.payment?.created_at ? formatDate(registration.payment.created_at) : 'N/A'}
                      </TableCell>
                      <TableCell>
                        {registration.payment?.amount ? formatPrice(registration.payment.amount) : 'N/A'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
              No registrations yet for this event.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRegistrationsDialogOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
}
