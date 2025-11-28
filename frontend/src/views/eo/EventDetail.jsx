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

} from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiGet, apiPut, apiDelete } from 'src/utils/api';
import { useParams, useNavigate } from 'react-router-dom';
import { formatDateIndonesia, toIndonesiaDateTimeLocal, fromIndonesiaDateTimeToUTC } from 'src/utils/dateFormat';


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


  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!event) return <Typography>Event not found</Typography>;

  return (

                  <img
                    src={
                      event.banner_url
                        ? (event.banner_url.startsWith('http') ? event.banner_url : `${BACKEND_URL}${event.banner_url}`)
                        : `${BACKEND_URL}/storage/${event.banner}`
                    }

                  </Button>
                )}
                <Button 
                  variant="contained" 
                  size="small" 
                  disabled={saving || event.status !== 'ACTIVATED'}
                  onClick={handlePublishClick}
                >

                >
                  Edit Event
                </Button>
                <Button 
                  variant="outlined" 
                  color="error"

              )}
            </CardContent>
          </Card>
        </Grid>

          </Button>
        </DialogActions>
      </Dialog>

      {/* Publish Dialog */}
      <Dialog open={publishDialogOpen} onClose={() => !saving && setPublishDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Set Publish Dates</DialogTitle>
        <DialogContent>

              Published end date cannot exceed event end date.
            </Typography>
          </Alert>

          {publishError && (

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

    </PageContainer>
  );
}
