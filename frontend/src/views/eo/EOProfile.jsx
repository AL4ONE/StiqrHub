import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Grid,
  Box,
  Alert,
  Stack,
  Avatar,
  MenuItem,
} from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiGet, apiPost } from 'src/utils/api';

const eoCategories = ['F&B', 'Umum', 'Fashion', 'Craft', 'Mixed Event Organizer'];

export default function EOProfile() {
  const [formData, setFormData] = useState({
    name: '',
    eo_logo: null,
    eo_description: '',
    eo_category: '',
    eo_founded_year: '',
    eo_city: '',
    eo_website: '',
    eo_instagram: '',
    eo_tiktok: '',
    eo_whatsapp: '',
    eo_official_email: '',
    eo_address: '',
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoFile, setLogoFile] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async (showLoading = true) => {
    if (showLoading) {
      setLoading(true);
    }
    setError('');
    try {
      const res = await apiGet(BACKEND_URL + '/api/eo/profile');
      if (res?.status === 'success' && res?.data) {
        const profile = res.data;
        // Set form data - preserve null values as empty string for display
        // Ensure all values are strings or null, not objects
        const safeString = (val) => {
          if (val === null || val === undefined) return '';
          if (typeof val === 'object') return '';
          return String(val);
        };

        setFormData({
          name: safeString(profile.name),
          eo_logo: profile.eo_logo || null,
          eo_description: safeString(profile.eo_description),
          eo_category: safeString(profile.eo_category),
          eo_founded_year: safeString(profile.eo_founded_year),
          eo_city: safeString(profile.eo_city),
          eo_website: safeString(profile.eo_website),
          eo_instagram: safeString(profile.eo_instagram),
          eo_tiktok: safeString(profile.eo_tiktok),
          eo_whatsapp: safeString(profile.eo_whatsapp),
          eo_official_email: safeString(profile.eo_official_email),
          eo_address: safeString(profile.eo_address),
        });

        // Set logo preview if exists
        if (profile.eo_logo) {
          const logoUrl = profile.eo_logo.startsWith('http')
            ? profile.eo_logo
            : `${BACKEND_URL}/storage/${profile.eo_logo}`;
          setLogoPreview(logoUrl);
        } else {
          // Only clear if we're not in the middle of uploading a new logo
          if (!logoFile) {
            setLogoPreview(null);
          }
        }
      } else {
        setError('Failed to load profile');
      }
    } catch (e) {
      const errorMsg = e?.message || (typeof e === 'string' ? e : 'Unknown error');
      console.error('Error loading profile:', errorMsg);
      setError('Failed to load profile: ' + errorMsg);
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError('');
    setSuccess('');
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        setError('Logo file size must be less than 4MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        setError('Logo must be an image file');
        return;
      }
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setError('');
      setSuccess('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      // Validate name first before creating FormData
      if (!formData.name || formData.name.trim() === '') {
        setError('Nama EO harus diisi');
        setSaving(false);
        return;
      }

      const fd = new FormData();
      
      // Always send name (required) - trim whitespace
      fd.append('name', formData.name.trim());
      
      // Send all other fields - always send them so backend knows to update
      const nullableFields = [
        'eo_description', 'eo_category', 'eo_founded_year', 'eo_city',
        'eo_website', 'eo_instagram', 'eo_tiktok', 'eo_whatsapp',
        'eo_official_email', 'eo_address'
      ];
      
      nullableFields.forEach((key) => {
        const value = formData[key];
        // Always append field, even if empty - backend will convert empty to null
        // Use empty string if value is null/undefined/empty
        if (value === null || value === undefined || value === '') {
          fd.append(key, '');
        } else if (typeof value === 'object') {
          // Skip objects (shouldn't happen, but just in case)
          fd.append(key, '');
        } else {
          // Convert to string safely
          fd.append(key, String(value));
        }
      });

      // Add logo file if selected (only if new file is uploaded)
      if (logoFile) {
        fd.append('eo_logo', logoFile);
      }

      // Use POST instead of PUT for FormData (Laravel handles FormData better with POST)
      const res = await apiPost(BACKEND_URL + '/api/eo/profile', fd, true);

      if (res?.status === 'success' && res?.data) {
        setSuccess('Profile updated successfully');
        
        // Update localStorage with new user data
        const updatedUser = res.data;
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        // Reset logo file state before reload
        setLogoFile(null);
        
        // Trigger custom event to refresh sidebar profile
        window.dispatchEvent(new CustomEvent('profileUpdated', { detail: updatedUser }));
        
        // Reload profile from API to get all updated data (without showing loading)
        await loadProfile(false);
      } else {
        // Handle validation errors
        let errorMessage = res?.message || 'Failed to update profile';
        
        // If there are validation errors, format them nicely
        if (res?.data && typeof res.data === 'object') {
          const validationErrors = [];
          Object.keys(res.data).forEach((field) => {
            const fieldErrors = res.data[field];
            if (Array.isArray(fieldErrors)) {
              fieldErrors.forEach((err) => {
                // Translate field names to Indonesian
                const fieldNames = {
                  'name': 'Nama EO',
                  'eo_description': 'Deskripsi',
                  'eo_category': 'Kategori',
                  'eo_founded_year': 'Tahun Berdiri',
                  'eo_city': 'Kota',
                  'eo_website': 'Website',
                  'eo_instagram': 'Instagram',
                  'eo_tiktok': 'TikTok',
                  'eo_whatsapp': 'WhatsApp',
                  'eo_official_email': 'Email Resmi',
                  'eo_address': 'Alamat',
                };
                const fieldLabel = fieldNames[field] || field;
                validationErrors.push(`${fieldLabel}: ${err}`);
              });
            } else {
              validationErrors.push(`${field}: ${fieldErrors}`);
            }
          });
          
          if (validationErrors.length > 0) {
            errorMessage = validationErrors.join('. ');
          }
        }
        
        setError(errorMessage);
      }
    } catch (e) {
      setError('Failed to update profile: ' + (e.message || 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <PageContainer title="EO Profile">
        <Typography>Loading...</Typography>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="EO Profile">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h4" mb={3}>
                Event Organizer Profile
              </Typography>

              {error && (
                <Alert 
                  severity="error" 
                  sx={{ mb: 2 }} 
                  onClose={() => setError('')}
                >
                  <Typography variant="body1" component="div">
                    {error.split('. ').map((err, idx) => (
                      <div key={idx} style={{ marginBottom: idx < error.split('. ').length - 1 ? '4px' : '0' }}>
                        {err}
                      </div>
                    ))}
                  </Typography>
                </Alert>
              )}

              {success && (
                <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
                  {success}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  {/* Logo Upload */}
                  <Grid item xs={12} md={6}>
                    <Box mb={2}>
                      <Typography variant="h6" mb={1}>
                        Logo EO
                      </Typography>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar
                          src={logoPreview}
                          alt="EO Logo"
                          sx={{ width: 120, height: 120 }}
                        >
                          {!logoPreview && 'LOGO'}
                        </Avatar>
                        <Box>
                          <Button variant="outlined" component="label" size="small">
                            Upload Logo
                            <input
                              hidden
                              accept="image/*"
                              type="file"
                              onChange={handleLogoChange}
                            />
                          </Button>
                          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                            Max size: 4MB (JPG, PNG)
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  </Grid>

                  {/* Nama EO */}
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Nama EO"
                      value={formData.name || ''}
                      onChange={handleChange('name')}
                      required
                    />
                  </Grid>

                  {/* Deskripsi Singkat */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Deskripsi Singkat EO"
                      value={formData.eo_description || ''}
                      onChange={handleChange('eo_description')}
                      multiline
                      rows={4}
                      placeholder="Apa yang mereka lakukan, fokus event..."
                      helperText={`${(formData.eo_description || '').length}/1000 characters`}
                      inputProps={{ maxLength: 1000 }}
                    />
                  </Grid>

                  {/* Kategori EO */}
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      select
                      label="Kategori EO"
                      value={formData.eo_category || ''}
                      onChange={handleChange('eo_category')}
                    >
                      {eoCategories.map((cat) => (
                        <MenuItem key={cat} value={cat}>
                          {cat}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  {/* Tahun Berdiri */}
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Tahun Berdiri"
                      type="number"
                      value={formData.eo_founded_year || ''}
                      onChange={handleChange('eo_founded_year')}
                      inputProps={{
                        min: 1900,
                        max: new Date().getFullYear(),
                      }}
                      helperText={`Min: 1900, Max: ${new Date().getFullYear()}`}
                    />
                  </Grid>

                  {/* Kota Operasional Utama */}
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Kota Operasional Utama"
                      value={formData.eo_city || ''}
                      onChange={handleChange('eo_city')}
                    />
                  </Grid>

                  {/* Website EO */}
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Website EO"
                      type="url"
                      value={formData.eo_website || ''}
                      onChange={handleChange('eo_website')}
                      placeholder="https://example.com"
                    />
                  </Grid>

                  {/* Instagram */}
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Instagram"
                      value={formData.eo_instagram || ''}
                      onChange={handleChange('eo_instagram')}
                      placeholder="@username atau URL"
                    />
                  </Grid>

                  {/* TikTok */}
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="TikTok"
                      value={formData.eo_tiktok || ''}
                      onChange={handleChange('eo_tiktok')}
                      placeholder="@username atau URL"
                    />
                  </Grid>

                  {/* Nomor WhatsApp PIC */}
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Nomor WhatsApp PIC"
                      value={formData.eo_whatsapp || ''}
                      onChange={handleChange('eo_whatsapp')}
                      placeholder="+6281234567890"
                    />
                  </Grid>

                  {/* Email Resmi EO */}
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Email Resmi EO"
                      type="email"
                      value={formData.eo_official_email || ''}
                      onChange={handleChange('eo_official_email')}
                      placeholder="info@example.com"
                    />
                  </Grid>

                  {/* Alamat Kantor EO */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Alamat Kantor EO (Opsional)"
                      value={formData.eo_address || ''}
                      onChange={handleChange('eo_address')}
                      multiline
                      rows={3}
                      placeholder="Alamat lengkap kantor..."
                      helperText={`${(formData.eo_address || '').length}/500 characters`}
                      inputProps={{ maxLength: 500 }}
                    />
                  </Grid>

                  {/* Submit Button */}
                  <Grid item xs={12}>
                    <Stack direction="row" spacing={2}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={saving}
                      >
                        {saving ? 'Saving...' : 'Save Profile'}
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={loadProfile}
                        disabled={saving}
                      >
                        Cancel
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
}


