import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, TextField, Grid, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiPost } from 'src/utils/api';
import { useNavigate } from 'react-router-dom';

const categories = ['F&B', 'Fashion', 'Automotive', 'Art & Craft', 'Snack & Beverage', 'Wellness', 'Others'];

export default function CreateEvent() {
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
    status: 'DRAFT'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bannerFile, setBannerFile] = useState(null);

  const handleChange = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([k, v]) => fd.append(k, v));
      // Normalize boolean for backend (1/0 strings)
      fd.set('insurance_active', formData.insurance_active ? '1' : '0');
      if (bannerFile) fd.append('banner', bannerFile);
      const res = await apiPost(BACKEND_URL + '/api/eo/events', fd, true);
      if (res?.status === 'success') {
        alert('Event created successfully!');
        navigate('/app/eo/events');
      } else {
        setError(res?.message || 'Failed to create event');
      }
    } catch (e) {
      setError('Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer title="Create Event">
      <Card>
        <CardContent>
          <Typography variant="h6" mb={3}>Create New Event</Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Event Name"
                  value={formData.name}
                  onChange={handleChange('name')}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Location"
                  value={formData.location}
                  onChange={handleChange('location')}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Map Link (optional)"
                  value={formData.map_link}
                  onChange={handleChange('map_link')}
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
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Booth Size"
                  value={formData.booth_size}
                  onChange={handleChange('booth_size')}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Booth Price"
                  type="number"
                  value={formData.booth_price}
                  onChange={handleChange('booth_price')}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Banner (jpg/png)</Typography>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setBannerFile(e.target.files?.[0] || null)}
                />
                {bannerFile ? (
                  <Box mt={1}>
                    <img
                      src={URL.createObjectURL(bannerFile)}
                      alt="preview"
                      style={{ maxWidth: '100%', maxHeight: 200, display: 'block' }}
                    />
                  </Box>
                ) : null}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Estimated Visitors"
                  type="number"
                  value={formData.estimated_visitors}
                  onChange={handleChange('estimated_visitors')}
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
                >
                  <option value="per_event">Per Event</option>
                  <option value="per_day">Per Day</option>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" gap={2}>
                  <Button type="submit" variant="contained" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Event'}
                  </Button>
                  <Button variant="outlined" onClick={() => navigate('/app/eo/events')}>
                    Cancel
                  </Button>
                </Box>
              </Grid>
            </Grid>
            {error && <Typography color="error" mt={2}>{error}</Typography>}
          </form>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
