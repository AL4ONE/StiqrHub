import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Grid, Box, Chip, Stack, Divider } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiGet, apiPut } from 'src/utils/api';
import { useParams, useNavigate } from 'react-router';

const statusColor = (status) => {
  if (status === 'ACTIVE') return 'success';
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
              <Box display="flex" gap={1} mb={2}>
                <Button variant="outlined" size="small" disabled={saving} onClick={() => setStatus('ACTIVE')}>Set Active</Button>
                <Button variant="contained" size="small" disabled={saving} onClick={() => setStatus('PUBLISHED')}>Publish</Button>
              </Box>
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
                <Button variant="outlined" onClick={() => navigate(`/eo/events/${id}/rules`)}>
                  Manage Rules
                </Button>
                <Button variant="outlined" onClick={() => navigate('/eo/events')}>
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
    </PageContainer>
  );
}
