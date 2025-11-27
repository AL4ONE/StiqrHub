import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, TextField, Grid, Box, Alert, Checkbox, Chip, Stack, FormControlLabel } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiPost, apiGet } from 'src/utils/api';
import { useNavigate } from 'react-router-dom';
import { fromIndonesiaDateTimeToUTC } from 'src/utils/dateFormat';

const categories = ['F&B', 'Fashion', 'Automotive', 'Art & Craft', 'Snack & Beverage', 'Wellness', 'Others'];

export default function CreateEvent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    address: '',
    rt_rw: '',
    village: '',
    district: '',
    postal_code: '',
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
    status: 'DRAFT',
    tenant_capacity: 1,
    details: '',
    contact_for_price: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [bannerFile, setBannerFile] = useState(null);
  const [dateErrors, setDateErrors] = useState({ start_date: '', end_date: '' });
  const [bankOptions, setBankOptions] = useState([]);
  const [selectedBankIds, setSelectedBankIds] = useState([]);
  const [bankOptionsLoading, setBankOptionsLoading] = useState(true);
  const [bankOptionsError, setBankOptionsError] = useState('');
  const [rulesText, setRulesText] = useState('');

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

  useEffect(() => {
    const fetchBankOptions = async () => {
      setBankOptionsLoading(true);
      setBankOptionsError('');
      try {
        const res = await apiGet(BACKEND_URL + '/api/eo/profile');
        if (res?.status === 'success') {
          const accounts = Array.isArray(res?.data?.bank_accounts) ? res.data.bank_accounts : [];
          const formatted = accounts.map((account, idx) => ({
            ...account,
            _key: account.id ? String(account.id) : `bank-${idx}`,
          }));
          setBankOptions(formatted);
          if (formatted.length > 0) {
            const defaultSelection = formatted.filter((acc) => acc.is_default).map((acc) => acc._key);
            setSelectedBankIds(defaultSelection.length > 0 ? defaultSelection : [formatted[0]._key]);
          } else {
            setSelectedBankIds([]);
          }
        } else {
          setBankOptionsError(res?.message || 'Gagal memuat rekening EO.');
        }
      } catch (err) {
        setBankOptionsError('Gagal memuat rekening EO. Silakan coba lagi.');
      } finally {
        setBankOptionsLoading(false);
      }
    };

    fetchBankOptions();
  }, []);

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
      errors[field] = 'Date cannot be before today';
    } else {
      errors[field] = '';
    }

    // Validate end_date is after start_date
    if (field === 'end_date' && formData.start_date) {
      const startDate = new Date(formData.start_date + '+07:00');
      if (selectedDate <= startDate) {
        errors.end_date = 'End date must be after start date';
      }
    } else if (field === 'start_date' && formData.end_date) {
      const endDate = new Date(formData.end_date + '+07:00');
      if (selectedDate >= endDate) {
        errors.start_date = 'Start date must be before end date';
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

  const toggleBankSelection = (key) => () => {
    setSelectedBankIds((prev) => {
      if (prev.includes(key)) {
        return prev.filter((id) => id !== key);
      }
      return [...prev, key];
    });
  };

  const handleContactForPriceToggle = (event) => {
    const { checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      contact_for_price: checked,
      booth_price: checked ? '' : prev.booth_price,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate dates before submit
    let hasErrors = false;
    const errors = { start_date: '', end_date: '' };
    
    if (!formData.start_date) {
      errors.start_date = 'Start date is required';
      hasErrors = true;
    } else {
      const startDate = new Date(formData.start_date + '+07:00');
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (startDate < today) {
        errors.start_date = 'Date cannot be before today';
        hasErrors = true;
      }
    }

    if (!formData.end_date) {
      errors.end_date = 'End date is required';
      hasErrors = true;
    } else {
      const endDate = new Date(formData.end_date + '+07:00');
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (endDate < today) {
        errors.end_date = 'Date cannot be before today';
        hasErrors = true;
      }
    }

    // Validate end_date is after start_date
    if (formData.start_date && formData.end_date) {
      const startDate = new Date(formData.start_date + '+07:00');
      const endDate = new Date(formData.end_date + '+07:00');
      if (endDate <= startDate) {
        errors.end_date = 'End date must be after start date';
        hasErrors = true;
      }
    }

    if (hasErrors) {
      setDateErrors(errors);
      // Create user-friendly error message
      const errorMessages = [];
      if (errors.start_date) errorMessages.push(`Start Date: ${errors.start_date}`);
      if (errors.end_date) errorMessages.push(`End Date: ${errors.end_date}`);
      setError(errorMessages.length > 0 ? errorMessages.join('. ') : 'Please review your input');
      return;
    }

    // Validate location details
    if (!formData.address.trim()) {
      setError('Address is required');
      return;
    }
    if (!formData.rt_rw.trim()) {
      setError('RT/RW is required');
      return;
    }
    if (!formData.village.trim()) {
      setError('Village / Sub-district is required');
      return;
    }
    if (!formData.district.trim()) {
      setError('District is required');
      return;
    }
    if (!formData.postal_code.trim()) {
      setError('Postal code is required');
      return;
    }

    if (!formData.tenant_capacity || Number(formData.tenant_capacity) < 1) {
      setError('Tenant capacity must be at least 1');
      return;
    }

    if (!formData.contact_for_price) {
      const priceValue = formData.booth_price;
      const hasPrice = priceValue !== '' && priceValue !== null && priceValue !== undefined;
      if (!hasPrice) {
        setError('Booth price is required or mark "Hubungi EO untuk harga".');
        return;
      }
    }

    if (bankOptionsLoading) {
      setError('Sedang memuat data rekening pembayaran. Mohon tunggu sebentar.');
      return;
    }

    if (bankOptions.length === 0) {
      setError('Tambahkan rekening pembayaran di halaman Profil EO terlebih dahulu.');
      return;
    }

    const selectedAccounts = bankOptions.filter((account) => selectedBankIds.includes(account._key));
    if (selectedAccounts.length === 0) {
      setError('Pilih minimal satu rekening pembayaran untuk event ini.');
      return;
    }

    let defaultIndex = selectedAccounts.findIndex((account) => account.is_default);
    if (defaultIndex === -1) {
      defaultIndex = 0;
    }

    const eventBankAccounts = selectedAccounts.map((account, index) => ({
      account_number: account.account_number,
      account_name: account.account_name,
      bank_name: account.bank_name,
      is_default: index === defaultIndex,
    }));

    setLoading(true);
    setError('');
    setFieldErrors({});
    try {
      const fd = new FormData();
      // Convert dates from Indonesia timezone to UTC for backend
      Object.entries(formData).forEach(([k, v]) => {
        if (k === 'start_date' || k === 'end_date') {
          const utcDate = fromIndonesiaDateTimeToUTC(v);
          if (utcDate) fd.append(k, utcDate);
        } else if (k === 'contact_for_price') {
          fd.append('contact_for_price', v ? '1' : '0');
        } else if (k === 'booth_price') {
          if (formData.contact_for_price) {
            fd.append('booth_price', '');
          } else if (v !== undefined && v !== null) {
            fd.append('booth_price', v);
          }
        } else {
          fd.append(k, v);
        }
      });
      // Normalize boolean for backend (1/0 strings)
      fd.set('insurance_active', formData.insurance_active ? '1' : '0');
      fd.set('location', buildLocationString());
      if (bannerFile) fd.append('banner', bannerFile);
      
      // Add bank accounts - Laravel expects this format for nested arrays in FormData
      eventBankAccounts.forEach((acc, index) => {
        fd.append(`bank_accounts[${index}][account_number]`, acc.account_number || '');
        fd.append(`bank_accounts[${index}][account_name]`, acc.account_name || '');
        fd.append(`bank_accounts[${index}][bank_name]`, acc.bank_name || '');
        // Send as string '1' or '0', Laravel will convert to boolean
        fd.append(`bank_accounts[${index}][is_default]`, acc.is_default ? '1' : '0');
      });
      
      const res = await apiPost(BACKEND_URL + '/api/eo/events', fd, true);
      
      // Check if response is error (status error or no status field)
      if (res?.status === 'error' || (!res?.status && res?.message)) {
        // Handle server errors (500, etc)
        if (res?.message) {
          setError(`An error occurred: ${res.message}`);
        } else if (res?.error) {
          setError(`An error occurred: ${res.error}`);
        } else {
          setError('A server error occurred. Please try again or contact the administrator.');
        }
        return;
      }
      
      if (res?.status === 'success') {
        const eventId = res?.data?.id;
        if (eventId) {
          await saveInitialRules(eventId);
        }
        setRulesText('');
        alert('Event created successfully!');
        navigate('/app/eo/events');
      } else {
        // Handle validation errors from backend
        if (res?.errors && typeof res.errors === 'object') {
          const backendFieldErrors = {};
          Object.keys(res.errors).forEach(field => {
            const errorMessages = Array.isArray(res.errors[field]) 
              ? res.errors[field].join(', ') 
              : res.errors[field];
            backendFieldErrors[field] = errorMessages;
          });
          
          // Set date errors if any
          if (backendFieldErrors.start_date || backendFieldErrors.end_date) {
            setDateErrors({
              start_date: backendFieldErrors.start_date || '',
              end_date: backendFieldErrors.end_date || ''
            });
          }
          
          // Set field errors for display
          setFieldErrors(backendFieldErrors);
          
          // Create user-friendly error message
          const errorFields = Object.keys(backendFieldErrors);
          if (errorFields.length > 0) {
            const errorMessages = errorFields.map(field => {
              // Translate field names to Indonesian
              const fieldNames = {
                'name': 'Event Name',
                'location': 'Location',
                'start_date': 'Start Date',
                'end_date': 'End Date',
                'category': 'Category',
                'booth_capacity': 'Booth Capacity',
                'booth_price': 'Booth Price',
                'payment_method': 'Payment Method',
                'banner': 'Banner',
                'bank_accounts': 'Bank Account',
                'account_number': 'Account Number',
                'account_name': 'Account Holder',
                'bank_name': 'Bank Name'
              };
              
              // Handle nested field names (e.g., bank_accounts.0.account_number)
              let fieldName = field;
              if (field.includes('bank_accounts')) {
                const parts = field.split('.');
                if (parts.length >= 3) {
                  const subField = parts[2];
                  const index = parts[1];
                  fieldName = `Account ${parseInt(index) + 1} - ${fieldNames[subField] || subField}`;
                } else {
                  fieldName = fieldNames['bank_accounts'] || 'Bank Account';
                }
              } else {
                fieldName = fieldNames[field] || field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
              }
              
              return `${fieldName}: ${backendFieldErrors[field]}`;
            }).join('. ');
            setError(`There are errors in your input. ${errorMessages}`);
          } else {
            setError(res?.message || 'Failed to create event. Please try again.');
          }
        } else {
          setError(res?.message || 'Failed to create event. Please try again.');
        }
      }
    } catch (e) {
      console.error('Error creating event:', e);
      setError('Failed to create event: ' + (e.message || 'Unknown error. Please check your connection or contact the administrator.'));
    } finally {
      setLoading(false);
    }
  };

  const buildLocationString = () => {
    const detailParts = [
      formData.address,
      formData.rt_rw ? `RT/RW ${formData.rt_rw}` : '',
      formData.village ? `Village ${formData.village}` : '',
      formData.district ? `District ${formData.district}` : '',
      formData.postal_code ? `Postal ${formData.postal_code}` : ''
    ].filter(Boolean);

    if (detailParts.length === 0) {
      return formData.location;
    }

    return [formData.location, detailParts.join(', ')].filter(Boolean).join(' - ');
  };

  const saveInitialRules = async (eventId) => {
    const lines = rulesText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    if (!eventId || lines.length === 0) return;

    try {
      if (lines.length === 1) {
        await apiPost(`${BACKEND_URL}/api/eo/events/${eventId}/rules`, { rule: lines[0] });
      } else {
        const rulesPayload = lines.map(rule => ({
          rule_name: rule,
          is_mandatory: true
        }));
        await apiPost(`${BACKEND_URL}/api/eo/events/${eventId}/rules/bulk`, { rules: rulesPayload });
      }
    } catch (err) {
      console.error('Failed to save initial rules', err);
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
                <Typography variant="subtitle1" fontWeight={600}>
                  Event Information
                </Typography>
              </Grid>
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
                  label="City / Area"
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
                  helperText={dateErrors.start_date || "Indonesia Western Time (WIB)"}
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
                  helperText={dateErrors.end_date || "Indonesia Western Time (WIB)"}
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
                  label="Tenant Capacity per Booth"
                  type="number"
                  value={formData.tenant_capacity}
                  onChange={handleChange('tenant_capacity')}
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
                  required={!formData.contact_for_price}
                  disabled={formData.contact_for_price}
                />
                {formData.contact_for_price && (
                  <Typography variant="caption" color="text.secondary">
                    Harga akan dibagikan setelah tenant menghubungi EO.
                  </Typography>
                )}
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.contact_for_price}
                      onChange={handleContactForPriceToggle}
                    />
                  }
                  label="Tandai sebagai 'Hubungi EO untuk harga'"
                />
                <Typography variant="caption" color="text.secondary" display="block">
                  Tenant akan diarahkan ke WhatsApp untuk diskusi harga jika opsi ini aktif.
                </Typography>
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
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Event Details"
                  placeholder="Describe your event, highlights, special requirements, etc."
                  value={formData.details}
                  onChange={handleChange('details')}
                />
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
                <Typography variant="subtitle1" fontWeight={600}>
                  Venue Information
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Venue / Location Name"
                  value={formData.location}
                  onChange={handleChange('location')}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  value={formData.address}
                  onChange={handleChange('address')}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="RT/RW"
                  value={formData.rt_rw}
                  onChange={handleChange('rt_rw')}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Postal Code"
                  value={formData.postal_code}
                  onChange={handleChange('postal_code')}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Village / Sub-district"
                  value={formData.village}
                  onChange={handleChange('village')}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="District"
                  value={formData.district}
                  onChange={handleChange('district')}
                  required
                />
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                  Rekening Pembayaran
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Pilih rekening yang ingin digunakan pada event ini. Atur daftar rekening di halaman Profil EO.
                </Typography>

                {bankOptionsLoading ? (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Memuat daftar rekening...
                  </Typography>
                ) : bankOptionsError ? (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {bankOptionsError}
                  </Alert>
                ) : bankOptions.length === 0 ? (
                  <Alert severity="warning" sx={{ mb: 2 }}>
                    Belum ada rekening yang tersimpan. Tambahkan melalui halaman Profil EO terlebih dahulu.
                  </Alert>
                ) : (
                  <Stack spacing={2} sx={{ mb: 2 }}>
                    {bankOptions.map((account) => {
                      const key = account._key;
                      const checked = selectedBankIds.includes(key);
                      return (
                        <Card
                          key={key}
                          variant="outlined"
                          sx={{
                            borderColor: checked ? 'primary.main' : 'divider',
                            borderWidth: checked ? 2 : 1,
                          }}
                        >
                          <CardContent>
                            <Box
                              display="flex"
                              justifyContent="space-between"
                              alignItems="center"
                              flexWrap="wrap"
                              gap={2}
                              mb={1}
                            >
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={checked}
                                    onChange={toggleBankSelection(key)}
                                    color="primary"
                                  />
                                }
                                label={
                                  <Box>
                                    <Typography variant="subtitle1">{account.bank_name}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      {account.account_number}
                                    </Typography>
                                  </Box>
                                }
                              />
                              <Chip
                                label={account.is_default ? 'Default EO' : 'Opsional'}
                                color={account.is_default ? 'primary' : 'default'}
                                size="small"
                              />
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                              Atas Nama: {account.account_name}
                            </Typography>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </Stack>
                )}

                <Button variant="text" onClick={() => navigate('/app/eo/profile')}>
                  Kelola rekening di halaman Profil EO
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight={600}>
                  Event Rules
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Rules (one per line)"
                  placeholder={'Example:\nRule 1\nRule 2\nRule 3'}
                  value={rulesText}
                  onChange={(e) => setRulesText(e.target.value)}
                  helperText="Rules entered here will be created automatically after the event is saved."
                />
              </Grid>

              {error && (
                <Grid item xs={12}>
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                </Grid>
              )}

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
          </form>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
