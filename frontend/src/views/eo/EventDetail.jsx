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
<<<<<<< HEAD
  Alert
=======
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
} from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiGet, apiPut, apiDelete } from 'src/utils/api';
import { useParams, useNavigate } from 'react-router-dom';
import { formatDateIndonesia, toIndonesiaDateTimeLocal, fromIndonesiaDateTimeToUTC } from 'src/utils/dateFormat';

<<<<<<< HEAD
=======
const WHATSAPP_NUMBER = '+62 821-1838-3415';
const WHATSAPP_LINK = 'https://wa.me/6282118383415?text=Halo%20Stiqr%20Hub%2C%20saya%20ingin%20bergabung%20ke%20komunitas%20WA.';

>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
const statusColor = (status) => {
  if (status === 'ACTIVATED') return 'success';
  if (status === 'PUBLISHED') return 'primary';
  if (status === 'DRAFT') return 'default';
  return 'default';
};

<<<<<<< HEAD
=======
const formatPrice = (price) => {
  if (price == null) return 'Free';
  const num = Math.floor(Number(price));
  const formatted = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `Rp ${formatted}`;
};

>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
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
<<<<<<< HEAD
=======
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');
  const [registrationsDialogOpen, setRegistrationsDialogOpen] = useState(false);
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382

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
<<<<<<< HEAD
=======
    setDeleteConfirmationText('');
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
<<<<<<< HEAD
=======
    if (deleteConfirmationText !== 'Delete') {
      return;
    }
    
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
    setDeleting(true);
    try {
      const res = await apiDelete(BACKEND_URL + `/api/eo/events/${id}`);
      if (res?.status === 'success') {
        navigate('/app/eo/events');
      } else {
        alert(res?.message || 'Failed to delete event');
        setDeleting(false);
        setDeleteDialogOpen(false);
<<<<<<< HEAD
=======
        setDeleteConfirmationText('');
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
      }
    } catch (e) {
      alert('Failed to delete event');
      setDeleting(false);
      setDeleteDialogOpen(false);
<<<<<<< HEAD
    }
  };

  // Check if event can be deleted (DRAFT or ACTIVATED, not PUBLISHED)
  const canDelete = event && (event.status === 'DRAFT' || event.status === 'ACTIVATED');
=======
      setDeleteConfirmationText('');
    }
  };

  const handleDeleteDialogClose = () => {
    if (!deleting) {
      setDeleteDialogOpen(false);
      setDeleteConfirmationText('');
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
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!event) return <Typography>Event not found</Typography>;

  return (
<<<<<<< HEAD
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
=======
    <PageContainer title="Detail Event">
      <Grid container spacing={3}>
        {/* Header Section */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              {/* Event Header */}
              <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
                <Box flex={1}>
                  <Typography variant="h4" fontWeight={700} mb={1}>
                    {event.name}
                  </Typography>
                  <Box display="flex" gap={1} alignItems="center" mb={2}>
                    <Chip label={event.status} color={statusColor(event.status)} size="small" />
                    {event.insurance_active && (
                      <Chip label="Insurance Aktif" color="info" size="small" />
                    )}
                    <Chip 
                      label={event.payment_method === 'per_day' ? 'Harian' : 'Per Event'} 
                      variant="outlined" 
                      size="small" 
                    />
                  </Box>
                </Box>
              </Box>

              {/* Banner */}
              {(event.banner_url || event.banner) && (
                <Box 
                  mb={3}
                  sx={{
                    width: '100%',
                    height: { xs: 200, md: 400 },
                    overflow: 'hidden',
                    borderRadius: 2,
                    backgroundColor: '#f5f5f5',
                  }}
                >
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
                  <img
                    src={
                      event.banner_url
                        ? (event.banner_url.startsWith('http') ? event.banner_url : `${BACKEND_URL}${event.banner_url}`)
                        : `${BACKEND_URL}/storage/${event.banner}`
                    }
<<<<<<< HEAD
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
=======
                    alt="Banner Event"
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                </Box>
              )}

              {/* Action Buttons */}
              <Box display="flex" gap={1} flexWrap="wrap" mb={3}>
                {event.status === 'ACTIVATED' || event.status === 'PUBLISHED' ? (
                  <Button variant="contained" color="success" size="small" disabled>
                    Event Diaktifkan
                  </Button>
                ) : (
                  <Button variant="outlined" size="small" disabled>
                    Aktifkan (Admin Only)
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
                  </Button>
                )}
                <Button 
                  variant="contained" 
                  size="small" 
                  disabled={saving || event.status !== 'ACTIVATED'}
                  onClick={handlePublishClick}
                >
<<<<<<< HEAD
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
                <strong>Booth Price:</strong> Rp {event.booth_price?.toLocaleString() || 'Free'}
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
=======
                  {event.status !== 'ACTIVATED' ? 'Publish (Setelah Diaktifkan)' : 'Atur Publish'}
                </Button>
                <Button 
                  variant="outlined" 
                  size="small"
                  onClick={() => navigate(`/app/eo/events/${id}/rules`)}
                >
                  Kelola Aturan
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => navigate(`/app/eo/events/${id}/edit`)}
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
                >
                  Edit Event
                </Button>
                <Button 
                  variant="outlined" 
                  color="error"
<<<<<<< HEAD
                  onClick={handleDeleteClick}
                  disabled={!canDelete || deleting}
                  sx={{
                    ...(!canDelete && {
                      backgroundColor: 'rgba(0, 0, 0, 0.12)',
                      color: 'rgba(0, 0, 0, 0.26)',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.12)',
                      }
                    })
                  }}
                >
                  Delete Event
                </Button>
                <Button variant="outlined" onClick={() => navigate('/app/eo/events')}>
                  Back to Events
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" mb={2}>Registrations</Typography>
              <Typography variant="h4" color="primary">{event.registrations_count ?? (event.registrations ? event.registrations.length : 0)}</Typography>
              <Typography variant="body2" color="textSecondary">
                Total registrations for this event
              </Typography>
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
=======
                  size="small"
                  onClick={handleDeleteClick}
                  disabled={deleting}
                >
                  Hapus Event
                </Button>
              </Box>

              {/* Status Info */}
              {event.status === 'DRAFT' && (
                <Alert 
                  severity="info" 
                  sx={{ 
                    mb: 3,
                    '& .MuiAlert-message': { color: 'text.primary' },
                    '& .MuiTypography-root': { color: 'text.primary' }
                  }}
                >
                  <Typography variant="body2" sx={{ color: 'text.primary' }}>
                    <strong>Status Draft:</strong> Event harus diaktifkan oleh admin sebelum bisa dipublish. 
                    Estimasi waktu approval: 3-5 x 24 jam.
                  </Typography>
                </Alert>
              )}
              {event.published_start_date && event.published_end_date && (
                <Alert 
                  severity="success" 
                  sx={{ 
                    mb: 3,
                    '& .MuiAlert-message': { color: 'text.primary' },
                    '& .MuiTypography-root': { color: 'text.primary' }
                  }}
                >
                  <Typography variant="body2" sx={{ color: 'text.primary' }}>
                    <strong>Periode Publish:</strong> {formatDateIndonesia(event.published_start_date)} 
                    {' '}sampai {formatDateIndonesia(event.published_end_date)}
                  </Typography>
                </Alert>
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
              )}
            </CardContent>
          </Card>
        </Grid>
<<<<<<< HEAD
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
=======

        {/* Main Information Section */}
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            {/* Deskripsi Event */}
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={600} mb={2} color="primary">
                  📝 Deskripsi Event
                </Typography>
                {event.short_description ? (
                  <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, color: 'text.primary' }}>
                    {event.short_description}
                  </Typography>
                ) : null}
                {event.detail ? (
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      lineHeight: 1.8, 
                      color: 'text.secondary',
                      whiteSpace: 'pre-line',
                      wordBreak: 'break-word'
                    }}
                  >
                    {event.detail}
                  </Typography>
                ) : (
                  <Typography variant="body2" color="text.secondary" fontStyle="italic">
                    Belum ada deskripsi detail untuk event ini.
                  </Typography>
                )}
              </CardContent>
            </Card>

            {/* Informasi Dasar Event */}
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={600} mb={3} color="primary">
                  📅 Informasi Dasar Event
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Box mb={2}>
                      <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                        Tanggal Mulai
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {formatDateIndonesia(event.start_date)}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box mb={2}>
                      <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                        Tanggal Selesai
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {formatDateIndonesia(event.end_date)}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box mb={2}>
                      <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                        Lokasi Event
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {event.location || 'Lokasi belum ditentukan'}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box mb={2}>
                      <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                        Kategori
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {event.category || 'Tidak ada kategori'}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box mb={2}>
                      <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                        Estimasi Pengunjung
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {event.estimated_visitors ? `${event.estimated_visitors.toLocaleString('id-ID')} orang` : 'Belum ditentukan'}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Informasi Booth & Harga */}
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={600} mb={3} color="primary">
                  💰 Informasi Booth & Harga
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Box mb={2}>
                      <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                        Kapasitas Booth
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {event.booth_capacity ? `${event.booth_capacity} booth` : 'Tidak ditentukan'}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box mb={2}>
                      <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                        Ukuran Booth
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {event.booth_size || 'Tidak ditentukan'}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box mb={2}>
                      <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                        Harga Booth
                      </Typography>
                      <Typography variant="body1" fontWeight={500} color="primary">
                        {event.contact_for_price 
                          ? 'Hubungi EO untuk harga' 
                          : formatPrice(event.booth_price)
                        }
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box mb={2}>
                      <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                        Metode Pembayaran
                      </Typography>
                      <Typography variant="body1" fontWeight={500}>
                        {event.payment_method === 'per_day' ? 'Per Hari' : 'Per Event'}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box mb={2}>
                      <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                        Status Asuransi
                      </Typography>
                      <Chip 
                        label={event.insurance_active ? 'Aktif' : 'Tidak Aktif'} 
                        color={event.insurance_active ? 'success' : 'default'}
                        size="small"
                      />
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            {/* Bank Accounts */}
            {event.bank_accounts && event.bank_accounts.length > 0 && (
              <Card>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} mb={3} color="primary">
                    🏦 Informasi Rekening Bank
                  </Typography>
                  <Stack spacing={2}>
                    {event.bank_accounts.map((account, idx) => (
                      <Box 
                        key={idx} 
                        sx={{ 
                          p: 2, 
                          border: '2px solid', 
                          borderColor: account.is_default ? 'primary.main' : 'divider',
                          borderRadius: 2,
                          backgroundColor: account.is_default ? 'primary.50' : 'grey.50',
                          transition: 'all 0.2s',
                          '&:hover': {
                            boxShadow: 2,
                          }
                        }}
                      >
                        <Box display="flex" alignItems="center" gap={1} mb={1}>
                          {account.is_default && (
                            <Chip 
                              label="Rekening Utama" 
                              size="small" 
                              color="primary" 
                            />
                          )}
                          <Typography variant="subtitle1" fontWeight={600}>
                            {account.bank_name}
                          </Typography>
                        </Box>
                        <Typography variant="body1" fontWeight={500} mb={0.5}>
                          {account.account_number}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Atas nama: {account.account_name}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            )}

            {/* WhatsApp Support */}
            <Card>
              <CardContent>
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    border: '2px dashed',
                    borderColor: 'success.light',
                    backgroundColor: 'success.50',
                  }}
                >
                  <Typography variant="h6" fontWeight={600} mb={1} color="success.dark">
                    💬 Butuh Bantuan?
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    EO perlu bantuan publikasi atau ingin koordinasi langsung? 
                    Bergabunglah dengan grup WhatsApp resmi StiqrHub.
                  </Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
                    <Button
                      component="a"
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="contained"
                      color="success"
                      size="large"
                    >
                      Buka WhatsApp
                    </Button>
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block">
                        Nomor Admin StiqrHub
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {WHATSAPP_NUMBER}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            {/* Registrations Summary */}
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={600} mb={2} color="primary">
                  👥 Pendaftaran
                </Typography>
                <Box textAlign="center" mb={2}>
                  <Typography variant="h3" color="primary" fontWeight={700}>
                    {event.registrations_count ?? (event.registrations ? event.registrations.length : 0)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Pendaftar
                  </Typography>
                </Box>
                {totalTenantCapacity > 0 ? (
                  <Box 
                    sx={{ 
                      p: 2, 
                      borderRadius: 2, 
                      backgroundColor: remainingTenantCapacity > 0 ? 'success.50' : 'error.50',
                      border: `1px solid ${remainingTenantCapacity > 0 ? 'success.main' : 'error.main'}`
                    }}
                  >
                    <Typography variant="body2" mb={1}>
                      <strong>Slot Tenant:</strong> {registeredTenants} / {totalTenantCapacity}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      fontWeight={600}
                      color={remainingTenantCapacity > 0 ? 'success.dark' : 'error.dark'}
                    >
                      Sisa Slot: {remainingTenantCapacity}
                    </Typography>
                  </Box>
                ) : (
                  <Alert 
                    severity="info" 
                    sx={{ 
                      mt: 2,
                      '& .MuiAlert-message': { color: 'text.primary' },
                      '& .MuiTypography-root': { color: 'text.primary' }
                    }}
                  >
                    <Typography variant="body2" sx={{ color: 'text.primary' }}>
                      Setel kapasitas tenant untuk melacak slot yang tersedia.
                    </Typography>
                  </Alert>
                )}
                <Button 
                  variant="contained" 
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() => setRegistrationsDialogOpen(true)}
                >
                  Lihat Detail Pendaftar
                </Button>
              </CardContent>
            </Card>

            {/* Rules Summary */}
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={600} mb={2} color="primary">
                  📋 Aturan Event
                </Typography>
                {event.rules && event.rules.length > 0 ? (
                  <Stack spacing={1.5}>
                    {event.rules.map((rule, index) => (
                      <Box 
                        key={index}
                        sx={{
                          p: 1.5,
                          borderRadius: 1,
                          backgroundColor: 'grey.50',
                          borderLeft: '3px solid',
                          borderColor: 'primary.main'
                        }}
                      >
                        <Typography variant="body2" fontWeight={500}>
                          {rule.rule_name}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                ) : (
                  <Alert 
                    severity="warning"
                    sx={{
                      '& .MuiAlert-message': { color: 'text.primary' },
                      '& .MuiTypography-root': { color: 'text.primary' }
                    }}
                  >
                    <Typography variant="body2" sx={{ color: 'text.primary' }}>
                      Belum ada aturan yang ditetapkan untuk event ini.
                    </Typography>
                  </Alert>
                )}
                <Button 
                  variant="outlined" 
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() => navigate(`/app/eo/events/${id}/rules`)}
                >
                  Kelola Aturan
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={600} mb={2} color="primary">
                  ⚡ Tindakan Cepat
                </Typography>
                <Stack spacing={1.5}>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => navigate(`/app/eo/events/${id}/edit`)}
                  >
                    ✏️ Edit Event
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="error"
                    fullWidth
                    onClick={handleDeleteClick}
                    disabled={deleting}
                  >
                    🗑️ Hapus Event
                  </Button>
                  <Button 
                    variant="outlined" 
                    fullWidth
                    onClick={() => navigate('/app/eo/events')}
                  >
                    ← Kembali ke Daftar Event
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog 
        open={deleteDialogOpen} 
        onClose={handleDeleteDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" fontWeight={600} color="error">
            ⚠️ Hapus Event
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Alert 
            severity="error" 
            sx={{ 
              mb: 3,
              '& .MuiAlert-message': { color: '#fff' },
              '& .MuiTypography-root': { color: '#fff' }
            }}
          >
            <Typography variant="body1" fontWeight={600} mb={1} sx={{ color: '#fff' }}>
              Peringatan: Tindakan ini tidak dapat dibatalkan!
            </Typography>
            <Typography variant="body2" sx={{ color: '#fff' }}>
              Event yang dihapus tidak dapat dikembalikan. Semua data terkait event ini akan hilang permanen.
            </Typography>
          </Alert>

          <Box mb={3}>
            <Typography variant="body1" mb={1}>
              <strong>Event yang akan dihapus:</strong>
            </Typography>
            <Box 
              sx={{ 
                p: 2, 
                borderRadius: 2, 
                backgroundColor: 'grey.100',
                border: '1px solid',
                borderColor: 'error.main'
              }}
            >
              <Typography variant="h6" fontWeight={600}>
                {event?.name}
              </Typography>
              {event?.location && (
                <Typography variant="body2" color="text.secondary" mt={0.5}>
                  📍 {event.location}
                </Typography>
              )}
              {event?.start_date && (
                <Typography variant="body2" color="text.secondary">
                  📅 {formatDateIndonesia(event.start_date)} - {formatDateIndonesia(event.end_date)}
                </Typography>
              )}
            </Box>
          </Box>

          <Box mb={2}>
            <Typography variant="body1" fontWeight={600} mb={1}>
              Konfirmasi Penghapusan
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Untuk mengonfirmasi penghapusan, ketik <strong>"Delete"</strong> di bawah ini:
            </Typography>
            <TextField
              fullWidth
              placeholder="Ketik 'Delete' untuk konfirmasi"
              value={deleteConfirmationText}
              onChange={(e) => setDeleteConfirmationText(e.target.value)}
              error={deleteConfirmationText !== '' && deleteConfirmationText !== 'Delete'}
              helperText={
                deleteConfirmationText !== '' && deleteConfirmationText !== 'Delete'
                  ? 'Teks yang diketik harus persis "Delete"'
                  : ''
              }
              disabled={deleting}
              autoFocus
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 1 }}>
          <Button 
            onClick={handleDeleteDialogClose} 
            disabled={deleting}
            variant="outlined"
          >
            Batal
          </Button>
          <Button 
            onClick={handleDeleteConfirm} 
            color="error" 
            variant="contained" 
            disabled={deleting || deleteConfirmationText !== 'Delete'}
            sx={{ minWidth: 120 }}
          >
            {deleting ? 'Menghapus...' : 'Hapus Event'}
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
          </Button>
        </DialogActions>
      </Dialog>

      {/* Publish Dialog */}
      <Dialog open={publishDialogOpen} onClose={() => !saving && setPublishDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Set Publish Dates</DialogTitle>
        <DialogContent>
<<<<<<< HEAD
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2">
              <strong>Event Period:</strong> {formatDateIndonesia(event.start_date)} - {formatDateIndonesia(event.end_date)}
            </Typography>
            <Typography variant="body2" sx={{ mt: 0.5 }}>
=======
          <Alert 
            severity="info" 
            sx={{ 
              mb: 2,
              '& .MuiAlert-message': { color: 'text.primary' },
              '& .MuiTypography-root': { color: 'text.primary' }
            }}
          >
            <Typography variant="body2" sx={{ color: 'text.primary' }}>
              <strong>Event Period:</strong> {formatDateIndonesia(event.start_date)} - {formatDateIndonesia(event.end_date)}
            </Typography>
            <Typography variant="body2" sx={{ mt: 0.5, color: 'text.primary' }}>
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
              Published end date cannot exceed event end date.
            </Typography>
          </Alert>

          {publishError && (
<<<<<<< HEAD
            <Alert severity="error" sx={{ mb: 2 }}>
              {publishError}
=======
            <Alert 
              severity="error" 
              sx={{ 
                mb: 2,
                '& .MuiAlert-message': { color: '#fff' },
                '& .MuiTypography-root': { color: '#fff' }
              }}
            >
              <Typography variant="body2" sx={{ color: '#fff' }}>
                {publishError}
              </Typography>
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
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
<<<<<<< HEAD
=======

      {/* Registrations Dialog */}
      <Dialog 
        open={registrationsDialogOpen} 
        onClose={() => setRegistrationsDialogOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" fontWeight={600}>
            📋 Daftar Pendaftar Event
          </Typography>
        </DialogTitle>
        <DialogContent>
          {totalTenantCapacity > 0 && (
            <Alert 
              severity={remainingTenantCapacity > 0 ? 'info' : 'warning'} 
              sx={{ 
                mb: 3,
                color: '#fff',
                bgcolor: remainingTenantCapacity > 0 ? 'primary.main' : 'warning.dark',
                '& .MuiAlert-icon': { color: '#fff' },
                '& .MuiAlert-message': { color: '#fff' },
              }}
            >
              <Typography variant="body2" sx={{ color: '#fff', fontWeight: 600 }}>
                Slot Tenant: {registeredTenants} / {totalTenantCapacity}
              </Typography>
              <Typography variant="body2" sx={{ color: '#fff', fontWeight: 600 }}>
                Sisa Slot: {remainingTenantCapacity}
              </Typography>
            </Alert>
          )}
          {event?.registrations && event.registrations.length > 0 ? (
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'primary.main' }}>
                    <TableCell sx={{ color: '#fff', fontWeight: 600 }}>No</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Nama Tenant</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Email</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Status Pendaftaran</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Status Pembayaran</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Tanggal Pembayaran</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Jumlah Pembayaran</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {event.registrations.map((registration, index) => (
                    <TableRow 
                      key={registration.id}
                      sx={{ 
                        '&:nth-of-type(odd)': { backgroundColor: 'grey.50' },
                        '&:hover': { backgroundColor: 'primary.50' }
                      }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={500}>
                          {registration.tenant?.name || 'N/A'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {registration.tenant?.email || 'N/A'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={registration.status === 'PAID' ? 'Lunas' : registration.status === 'REGISTERED' ? 'Terdaftar' : registration.status || 'Terdaftar'} 
                          size="small"
                          color={registration.status === 'PAID' || registration.status === 'ACTIVE' ? 'success' : 'default'}
                        />
                      </TableCell>
                      <TableCell>
                        {registration.payment ? (
                          <Chip 
                            label={
                              registration.payment.status === 'SUCCESS' ? 'Berhasil' :
                              registration.payment.status === 'PENDING' ? 'Menunggu' :
                              registration.payment.status === 'FAILED' ? 'Gagal' :
                              registration.payment.status
                            } 
                            size="small"
                            color={getPaymentStatusColor(registration.payment.status)}
                          />
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            Belum ada pembayaran
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {registration.payment?.created_at ? formatDate(registration.payment.created_at) : '-'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={500}>
                          {registration.payment?.amount ? formatPrice(registration.payment.amount) : '-'}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Box textAlign="center" py={4}>
              <Typography variant="h6" color="text.secondary" mb={1}>
                Belum Ada Pendaftar
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Belum ada tenant yang mendaftar ke event ini.
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRegistrationsDialogOpen(false)} variant="contained">
            Tutup
          </Button>
        </DialogActions>
      </Dialog>
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
    </PageContainer>
  );
}
