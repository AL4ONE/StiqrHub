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
  Alert
} from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiGet, apiPut, apiDelete } from 'src/utils/api';
import { useParams, useNavigate } from 'react-router-dom';

const statusColor = (status) => {
  if (status === 'ACTIVATED') return 'success';
  if (status === 'PUBLISHED') return 'primary';
  if (status === 'DRAFT') return 'default';
  return 'default';
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
      // Set default published_start_date to now
      const now = new Date();
      const publishedStart = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16);
      
      setPublishForm({
        published_start_date: publishedStart,
        published_end_date: ''
      });
      setPublishDialogOpen(true);
      setPublishError('');
    } else {
      // If already has published dates, just update status
      setStatus('PUBLISHED');
    }
  };

  const handlePublishSubmit = async () => {
    setPublishError('');
    
    // Validate
    if (!publishForm.published_start_date || !publishForm.published_end_date) {
      setPublishError('Both published start date and end date are required');
      return;
    }

    const startDate = new Date(publishForm.published_start_date);
    const endDate = new Date(publishForm.published_end_date);
    const eventEndDate = new Date(event.end_date);

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
      // Format datetime for backend (YYYY-MM-DD HH:mm:ss)
      const formatDateTime = (dateTimeString) => {
        if (!dateTimeString) return null;
        const date = new Date(dateTimeString);
        return date.toISOString().slice(0, 19).replace('T', ' ');
      };

      const res = await apiPut(BACKEND_URL + `/api/eo/events/${id}`, {
        status: 'PUBLISHED',
        published_start_date: formatDateTime(publishForm.published_start_date),
        published_end_date: formatDateTime(publishForm.published_end_date)
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

  // Check if event can be deleted (DRAFT or ACTIVATED, not PUBLISHED)
  const canDelete = event && (event.status === 'DRAFT' || event.status === 'ACTIVATED');

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
                    <strong>Published Period:</strong> {new Date(event.published_start_date).toLocaleString()} - {new Date(event.published_end_date).toLocaleString()}
                  </Typography>
                </Box>
              )}
              <Typography variant="body1" color="textSecondary" mb={2}>{event.location}</Typography>
              <Typography variant="body2" mb={1}>
                <strong>Start:</strong> {new Date(event.start_date).toLocaleString()}
              </Typography>
              <Typography variant="body2" mb={1}>
                <strong>End:</strong> {new Date(event.end_date).toLocaleString()}
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
                >
                  Edit Event
                </Button>
                <Button 
                  variant="outlined" 
                  color="error"
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
              <Typography variant="h4" color="primary">{event.registrations_count || 0}</Typography>
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
              <strong>Event Period:</strong> {new Date(event.start_date).toLocaleDateString()} - {new Date(event.end_date).toLocaleDateString()}
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
            label="Published Start Date"
            type="datetime-local"
            value={publishForm.published_start_date}
            onChange={(e) => setPublishForm({ ...publishForm, published_start_date: e.target.value })}
            InputLabelProps={{ shrink: true }}
            margin="normal"
            required
            helperText="When event becomes visible to tenants (default: now)"
          />

          <TextField
            fullWidth
            label="Published End Date"
            type="datetime-local"
            value={publishForm.published_end_date}
            onChange={(e) => setPublishForm({ ...publishForm, published_end_date: e.target.value })}
            InputLabelProps={{ shrink: true }}
            margin="normal"
            required
            inputProps={{
              max: new Date(event.end_date).toISOString().slice(0, 16)
            }}
            helperText={`Last date tenants can register (max: ${new Date(event.end_date).toLocaleDateString()})`}
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
    </PageContainer>
  );
}
