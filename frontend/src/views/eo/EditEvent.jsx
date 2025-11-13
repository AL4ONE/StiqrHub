import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, TextField, Grid, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiGet, apiPut } from 'src/utils/api';
import { useNavigate, useParams } from 'react-router-dom';
import { toIndonesiaDateTimeLocal, fromIndonesiaDateTimeToUTC } from 'src/utils/dateFormat';

const categories = ['F&B', 'Fashion', 'Automotive', 'Art & Craft', 'Snack & Beverage', 'Wellness', 'Others'];

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    map_link: '',
    start_date: '',
    end_date: '',
    category: 'F&B',
    booth_capacity: 1,
    booth_size: '3x3m',
    booth_price: 0,
    estimated_visitors: 500,
    payment_method: 'per_event',
    insurance_active: true,
  });
  const [bannerFile, setBannerFile] = useState(null);
  const [previewBanner, setPreviewBanner] = useState('');
  const [status, setStatus] = useState('DRAFT');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError('');
      try {
        const data = await apiGet(BACKEND_URL + `/api/eo/events/${id}`);
        const ev = data?.data;
        if (!ev) {
          setError('Event not found');
          setLoading(false);
          return;
        }
        setStatus(ev.status);
        setFormData({
          name: ev.name || '',
          location: ev.location || '',
          map_link: ev.map_link || '',
          // Convert to datetime-local compatible (Indonesia timezone)
          start_date: toIndonesiaDateTimeLocal(ev.start_date),
          end_date: toIndonesiaDateTimeLocal(ev.end_date),
          category: ev.category || 'F&B',
          booth_capacity: ev.booth_capacity ?? 1,
          booth_size: ev.booth_size || '3x3m',
          booth_price: ev.booth_price ?? 0,
          estimated_visitors: ev.estimated_visitors ?? 500,
          payment_method: ev.payment_method || 'per_event',
          insurance_active: !!ev.insurance_active,
        });
        if (ev.banner_url) {
          setPreviewBanner(ev.banner_url.startsWith('http') ? ev.banner_url : `${BACKEND_URL}${ev.banner_url}`);
        } else if (ev.banner) {
          setPreviewBanner(`${BACKEND_URL}/storage/${ev.banner}`);
        }
      } catch (e) {
        setError('Failed to load event');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleChange = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status !== 'DRAFT') {
      setError('Only DRAFT events can be updated');
      return;
    }
    setSaving(true);
    setError('');
    try {
      // Prepare payload as JSON unless uploading new banner
      if (bannerFile) {
        // If file is provided, use multipart via fetch directly
        const fd = new FormData();
          // Override to POST + _method=PUT for Laravel file handling
          fd.append('_method', 'PUT');
        // Backend expects datetime format "YYYY-MM-DD HH:mm:ss" in UTC
        // datetime-local input is in Indonesia timezone, convert to UTC
        const toBackendDate = fromIndonesiaDateTimeToUTC;
          if (formData.name) fd.append('name', formData.name);
          if (formData.location) fd.append('location', formData.location);
          if (formData.map_link) fd.append('map_link', formData.map_link);
          const sd = toBackendDate(formData.start_date);
          if (sd) fd.append('start_date', sd);
          const ed = toBackendDate(formData.end_date);
          if (ed) fd.append('end_date', ed);
          if (formData.category) fd.append('category', formData.category);
          if (formData.booth_capacity != null) fd.append('booth_capacity', String(formData.booth_capacity));
          if (formData.booth_size) fd.append('booth_size', formData.booth_size);
          if (formData.booth_price != null) fd.append('booth_price', String(formData.booth_price ?? 0));
          if (formData.estimated_visitors != null) fd.append('estimated_visitors', String(formData.estimated_visitors));
          if (formData.payment_method) fd.append('payment_method', formData.payment_method);
          fd.append('insurance_active', formData.insurance_active ? '1' : '0');
        fd.append('banner', bannerFile);
        // Use native fetch for PUT multipart
        const token = localStorage.getItem('token');
          const headers = {};
          if (token) headers['Authorization'] = `Bearer ${token}`;
          headers['Accept'] = 'application/json';
          const res = await fetch(BACKEND_URL + `/api/eo/events/${id}`, {
            method: 'POST',
            headers,
          body: fd,
        });
        const json = await res.json();
        if (json?.status === 'success') {
          alert('Event updated successfully');
          navigate(`/app/eo/events/${id}`);
        } else {
          setError(json?.message || 'Failed to update event');
        }
      } else {
        // JSON path
        // Backend expects datetime format "YYYY-MM-DD HH:mm:ss" in UTC
        // datetime-local input is in Indonesia timezone, convert to UTC
        const toBackendDate = fromIndonesiaDateTimeToUTC;
        const payload = {
          name: formData.name,
          location: formData.location,
          map_link: formData.map_link || null,
          start_date: toBackendDate(formData.start_date),
          end_date: toBackendDate(formData.end_date),
          category: formData.category,
          booth_capacity: Number(formData.booth_capacity),
          booth_size: formData.booth_size || null,
          booth_price: Number(formData.booth_price ?? 0),
          estimated_visitors: formData.estimated_visitors != null ? Number(formData.estimated_visitors) : null,
          payment_method: formData.payment_method,
          insurance_active: !!formData.insurance_active,
        };
        const res = await apiPut(BACKEND_URL + `/api/eo/events/${id}`, payload);
        if (res?.status === 'success') {
          alert('Event updated successfully');
          navigate(`/app/eo/events/${id}`);
        } else {
          setError(res?.message || 'Failed to update event');
        }
      }
    } catch (e) {
      setError('Failed to update event');
    } finally {
      setSaving(false);
    }
  };

  const disabled = status !== 'DRAFT';

  return (
    <PageContainer title="Edit Event">
      <Card>
        <CardContent>
          <Typography variant="h6" mb={3}>Edit Event</Typography>
          {disabled && (
            <Typography color="error" mb={2}>
              This event cannot be edited because it is {status}.
            </Typography>
          )}
          {error && <Typography color="error" mb={2}>{error}</Typography>}
          {!loading && (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Event Name"
                    value={formData.name}
                    onChange={handleChange('name')}
                    required
                    disabled={disabled}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Location"
                    value={formData.location}
                    onChange={handleChange('location')}
                    required
                    disabled={disabled}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Map Link (optional)"
                    value={formData.map_link}
                    onChange={handleChange('map_link')}
                    disabled={disabled}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Start Date"
                    type="datetime-local"
                    value={formData.start_date}
                    onChange={handleChange('start_date')}
                    InputLabelProps={{ shrink: true }}
                    required
                    disabled={disabled}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="End Date"
                    type="datetime-local"
                    value={formData.end_date}
                    onChange={handleChange('end_date')}
                    InputLabelProps={{ shrink: true }}
                    required
                    disabled={disabled}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    select
                    label="Category"
                    value={formData.category}
                    onChange={handleChange('category')}
                    SelectProps={{ native: true }}
                    disabled={disabled}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Booth Capacity"
                    type="number"
                    value={formData.booth_capacity}
                    onChange={handleChange('booth_capacity')}
                    required
                    disabled={disabled}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Booth Size"
                    value={formData.booth_size}
                    onChange={handleChange('booth_size')}
                    disabled={disabled}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Booth Price"
                    type="number"
                    value={formData.booth_price}
                    onChange={handleChange('booth_price')}
                    disabled={disabled}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setBannerFile(file);
                        if (file) {
                          setPreviewBanner(URL.createObjectURL(file));
                        }
                      }}
                      disabled={disabled}
                    />
                    {previewBanner ? (
                      <Box mt={1}>
                        <img
                          src={previewBanner}
                          alt="banner"
                          style={{ maxWidth: '100%', maxHeight: 200, display: 'block' }}
                        />
                      </Box>
                    ) : null}
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Estimated Visitors"
                    type="number"
                    value={formData.estimated_visitors}
                    onChange={handleChange('estimated_visitors')}
                    disabled={disabled}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    select
                    label="Payment Method"
                    value={formData.payment_method}
                    onChange={handleChange('payment_method')}
                    SelectProps={{ native: true }}
                    disabled={disabled}
                  >
                    <option value="per_event">Per Event</option>
                    <option value="per_day">Per Day</option>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex" gap={2}>
                    <Button type="submit" variant="contained" disabled={saving || disabled}>
                      {saving ? 'Updating...' : 'Update Event'}
                    </Button>
                    <Button variant="outlined" onClick={() => navigate(`/app/eo/events/${id}`)}>
                      Cancel
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          )}
          {loading && <Typography>Loading...</Typography>}
        </CardContent>
      </Card>
    </PageContainer>
  );
}



