import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, TextField, Grid, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiPost } from 'src/utils/api';
import { useNavigate } from 'react-router-dom';
import { fromIndonesiaDateTimeToUTC } from 'src/utils/dateFormat';

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
  const [dateErrors, setDateErrors] = useState({ start_date: '', end_date: '' });

  // Get current date in Indonesia timezone for min attribute
  const getCurrentDateTimeLocal = () => {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Jakarta',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    const parts = formatter.formatToParts(now);
    const year = parts.find(p => p.type === 'year').value;
    const month = parts.find(p => p.type === 'month').value;
    const day = parts.find(p => p.type === 'day').value;
    const hours = parts.find(p => p.type === 'hour').value;
    const minutes = parts.find(p => p.type === 'minute').value;
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const [minDateTime] = useState(getCurrentDateTimeLocal());

  const validateDate = (field, value) => {
    if (!value) {
      setDateErrors(prev => ({ ...prev, [field]: '' }));
      return;
    }

    const errors = { ...dateErrors };
    
    // Check if date is before today
    const selectedDate = new Date(value + '+07:00'); // Treat as Indonesia timezone
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      errors[field] = 'Tanggal tidak boleh sebelum hari ini';
    } else {
      errors[field] = '';
    }

    // Validate end_date is after start_date
    if (field === 'end_date' && formData.start_date) {
      const startDate = new Date(formData.start_date + '+07:00');
      if (selectedDate <= startDate) {
        errors.end_date = 'Tanggal akhir harus setelah tanggal mulai';
      }
    } else if (field === 'start_date' && formData.end_date) {
      const endDate = new Date(formData.end_date + '+07:00');
      if (selectedDate >= endDate) {
        errors.start_date = 'Tanggal mulai harus sebelum tanggal akhir';
      }
    }

    setDateErrors(errors);
  };

  const handleChange = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Validate date fields on change
    if (field === 'start_date' || field === 'end_date') {
      validateDate(field, value);
    }
  };

  const handleDateBlur = (field) => (e) => {
    validateDate(field, e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate dates before submit
    let hasErrors = false;
    const errors = { start_date: '', end_date: '' };
    
    if (!formData.start_date) {
      errors.start_date = 'Tanggal mulai wajib diisi';
      hasErrors = true;
    } else {
      const startDate = new Date(formData.start_date + '+07:00');
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (startDate < today) {
        errors.start_date = 'Tanggal tidak boleh sebelum hari ini';
        hasErrors = true;
      }
    }

    if (!formData.end_date) {
      errors.end_date = 'Tanggal akhir wajib diisi';
      hasErrors = true;
    } else {
      const endDate = new Date(formData.end_date + '+07:00');
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (endDate < today) {
        errors.end_date = 'Tanggal tidak boleh sebelum hari ini';
        hasErrors = true;
      }
    }

    // Validate end_date is after start_date
    if (formData.start_date && formData.end_date) {
      const startDate = new Date(formData.start_date + '+07:00');
      const endDate = new Date(formData.end_date + '+07:00');
      if (endDate <= startDate) {
        errors.end_date = 'Tanggal akhir harus setelah tanggal mulai';
        hasErrors = true;
      }
    }

    if (hasErrors) {
      setDateErrors(errors);
      setError('Mohon perbaiki error pada field tanggal');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const fd = new FormData();
      // Convert dates from Indonesia timezone to UTC for backend
      Object.entries(formData).forEach(([k, v]) => {
        if (k === 'start_date' || k === 'end_date') {
          const utcDate = fromIndonesiaDateTimeToUTC(v);
          if (utcDate) fd.append(k, utcDate);
        } else {
          fd.append(k, v);
        }
      });
      // Normalize boolean for backend (1/0 strings)
      fd.set('insurance_active', formData.insurance_active ? '1' : '0');
      if (bannerFile) fd.append('banner', bannerFile);
      const res = await apiPost(BACKEND_URL + '/api/eo/events', fd, true);
      if (res?.status === 'success') {
        alert('Event created successfully!');
        navigate('/app/eo/events');
      } else {
        // Handle validation errors from backend
        if (res?.errors && typeof res.errors === 'object') {
          const fieldErrors = {};
          Object.keys(res.errors).forEach(field => {
            const errorMessages = Array.isArray(res.errors[field]) 
              ? res.errors[field].join(', ') 
              : res.errors[field];
            fieldErrors[field] = errorMessages;
          });
          
          // Set date errors if any
          if (fieldErrors.start_date || fieldErrors.end_date) {
            setDateErrors({
              start_date: fieldErrors.start_date || '',
              end_date: fieldErrors.end_date || ''
            });
          }
          
          // Set general error with field details
          const errorFields = Object.keys(fieldErrors);
          if (errorFields.length > 0) {
            const errorMessages = errorFields.map(field => {
              const fieldName = field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
              return `${fieldName}: ${fieldErrors[field]}`;
            }).join('; ');
            setError(`Validation failed: ${errorMessages}`);
          } else {
            setError(res?.message || 'Failed to create event');
          }
        } else {
          setError(res?.message || 'Failed to create event');
        }
      }
    } catch (e) {
      setError('Failed to create event: ' + (e.message || 'Unknown error'));
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
                  label="Start Date (WIB)"
                  type="datetime-local"
                  value={formData.start_date}
                  onChange={handleChange('start_date')}
                  onBlur={handleDateBlur('start_date')}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ min: minDateTime }}
                  required
                  error={!!dateErrors.start_date}
                  helperText={dateErrors.start_date || "Waktu Indonesia Barat (WIB)"}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="End Date (WIB)"
                  type="datetime-local"
                  value={formData.end_date}
                  onChange={handleChange('end_date')}
                  onBlur={handleDateBlur('end_date')}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ min: formData.start_date || minDateTime }}
                  required
                  error={!!dateErrors.end_date}
                  helperText={dateErrors.end_date || "Waktu Indonesia Barat (WIB)"}
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
