import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, TextField, Button, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiPost } from 'src/utils/api';
import { useParams, useNavigate } from 'react-router-dom';

export default function ClaimForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [incidentDate, setIncidentDate] = useState('');
  const [description, setDescription] = useState('');
  const [claimAmount, setClaimAmount] = useState('');
  const [documentFile, setDocumentFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('incident_date', incidentDate);
      fd.append('description', description);
      if (claimAmount) fd.append('claim_amount', String(claimAmount));
      if (documentFile) fd.append('document', documentFile);
      const res = await apiPost(`${BACKEND_URL}/api/tenant/events/${id}/claims`, fd, true);
      if (res?.status === 'success') {
        alert('Claim submitted. Waiting for insurer review.');
        navigate('/tenant/events/active');
      } else {
        setError(res?.message || 'Failed to submit claim');
      }
    } catch (e) {
      setError('Failed to submit claim');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageContainer title="Submit Claim">
      <Card>
        <CardContent>
          <Typography variant="h6" mb={3}>Submit Claim for Event #{id}</Typography>
          <form onSubmit={submit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Incident Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={incidentDate}
                  onChange={(e) => setIncidentDate(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Claim Amount (optional)"
                  type="number"
                  value={claimAmount}
                  onChange={(e) => setClaimAmount(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Evidence (jpg/jpeg/png/pdf, max 2MB)</Typography>
                <input type="file" accept="image/*,application/pdf" onChange={(e) => setDocumentFile(e.target.files?.[0] || null)} />
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" gap={2}>
                  <Button type="submit" variant="contained" disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Submit Claim'}
                  </Button>
                  <Button variant="outlined" onClick={() => navigate(-1)}>Cancel</Button>
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

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Stack,
  Alert,
  Box
} from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL, API_PREFIX } from 'src/config/constants';
import { getAuthHeaders } from 'src/utils/auth';

const ClaimForm = () => {
  // Ambil eventId dari URL params
  const params = useParams();
  const eventId = params.id || window.location.pathname.split('/')[3]; // /tenant/events/{ID}/claim
  
  const [eventInfo, setEventInfo] = useState(null);
  const [formData, setFormData] = useState({
    incident_date: '', // tanggal kejadian
    description: '',
    document: null,
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingEvent, setLoadingEvent] = useState(true);
  const [message, setMessage] = useState(null);

  // Load event info untuk validasi
  useEffect(() => {
    const loadEventInfo = async () => {
      if (!eventId) {
        setMessage({ 
          type: 'error', 
          text: 'Event ID tidak ditemukan di URL.' 
        });
        setLoadingEvent(false);
        return;
      }

      try {
        const response = await axios.get(
          `${BACKEND_URL}${API_PREFIX}/tenant/events/active`,
          { headers: getAuthHeaders() }
        );
        const events = response.data?.data || response.data || [];
        const event = events.find(e => String(e.id) === String(eventId));
        
        console.log('Event ID from URL:', eventId);
        console.log('Active events:', events);
        console.log('Found event:', event);
        
        setEventInfo(event);
        
        if (!event) {
          setMessage({ 
            type: 'error', 
            text: 'Event tidak ditemukan atau kamu belum terdaftar di event ini.' 
          });
        }
      } catch (err) {
        console.error('Error loading event:', err);
        setMessage({ 
          type: 'error', 
          text: 'Gagal memuat informasi event.' 
        });
      } finally {
        setLoadingEvent(false);
      }
    };

    loadEventInfo();
  }, [eventId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const file = files ? files[0] : null;

    setFormData({
      ...formData,
      [name]: file || value,
    });

    if (file) {
      // Preview kalau file gambar
      if (file.type.startsWith('image/')) {
        setPreview(URL.createObjectURL(file));
      } else {
        setPreview(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!eventId) {
      setMessage({ type: 'error', text: 'Event ID tidak ditemukan di URL.' });
      return;
    }

    if (!eventInfo) {
      setMessage({ type: 'error', text: 'Kamu belum terdaftar di event ini atau event tidak valid.' });
      return;
    }

    // Validasi deskripsi minimal 10 karakter
    if (formData.description.length < 10) {
      setMessage({ type: 'error', text: 'Deskripsi minimal 10 karakter!' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const form = new FormData();
      form.append('incident_date', formData.incident_date);
      form.append('description', formData.description);
      if (formData.document) form.append('document', formData.document);

      console.log('Submitting claim for event ID:', eventId);
      console.log('Form data:', {
        incident_date: formData.incident_date,
        description: formData.description,
        document: formData.document?.name
      });

      const response = await axios.post(
        `${BACKEND_URL}${API_PREFIX}/tenant/events/${eventId}/claims`,
        form,
        {
          headers: {
            ...getAuthHeaders(),
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Claim response:', response.data);

      setMessage({ type: 'success', text: 'Klaim berhasil dikirim!' });
      setFormData({ incident_date: '', description: '', document: null });
      setPreview(null);
      
      // Redirect ke list claims setelah 2 detik
      setTimeout(() => {
        window.location.href = '/tenant/claims';
      }, 2000);
    } catch (err) {
      console.error('Claim submission error:', err);
      const errorMsg = err.response?.data?.message || 
                       err.response?.data?.data?.description?.[0] || 
                       err.response?.data?.data?.incident_date?.[0] || 
                       'Gagal mengirim klaim, periksa data kamu.';
      setMessage({
        type: 'error',
        text: errorMsg,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer title="Ajukan Klaim">
      <Card sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Ajukan Klaim Asuransi
          </Typography>

          {loadingEvent ? (
            <Alert severity="info" sx={{ mb: 2 }}>
              Memuat data event...
            </Alert>
          ) : eventInfo ? (
            <Alert severity="info" sx={{ mb: 2 }}>
              Event: <strong>{eventInfo.name}</strong>
            </Alert>
          ) : null}

          {message && (
            <Alert severity={message.type} sx={{ mb: 2 }}>
              {message.text}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Tanggal Kejadian"
                name="incident_date"
                type="date"
                value={formData.incident_date}
                onChange={handleChange}
                required
                InputLabelProps={{ shrink: true }}
                disabled={!eventInfo || loadingEvent}
                helperText="Tanggal kejadian yang ingin diklaim"
              />

              <TextField
                label="Deskripsi Klaim"
                name="description"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Jelaskan detail kejadian yang ingin diklaim (minimal 10 karakter)..."
                disabled={!eventInfo || loadingEvent}
                helperText={`${formData.description.length} karakter (minimal 10)`}
                error={formData.description.length > 0 && formData.description.length < 10}
              />

              <Button 
                variant="contained" 
                component="label"
                disabled={!eventInfo || loadingEvent}
              >
                Upload Dokumen Bukti
                <input type="file" name="document" hidden onChange={handleChange} required />
              </Button>

              {/* Preview gambar atau nama file */}
              {preview ? (
                <Box
                  component="img"
                  src={preview}
                  alt="Preview dokumen"
                  sx={{
                    mt: 1,
                    width: '100%',
                    maxHeight: 200,
                    objectFit: 'contain',
                    borderRadius: 1,
                    border: '1px solid #ddd',
                  }}
                />
              ) : formData.document ? (
                <Typography variant="body2">
                  File terpilih: {formData.document.name}
                </Typography>
              ) : null}

              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  onClick={() => window.history.back()}
                  disabled={loading}
                >
                  Batal
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={loading || !eventInfo || loadingEvent}
                  fullWidth
                >
                  {loading ? 'Mengirim...' : 'Kirim Klaim'}
                </Button>
              </Stack>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default ClaimForm;