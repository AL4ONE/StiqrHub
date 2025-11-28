import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Box, Chip, Button, Divider } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiGet, apiPost } from 'src/utils/api';
import { formatDateIndonesia } from 'src/utils/dateFormat';

export default function EventAudit() {
  const [events, setEvents] = useState([]);
  const [pendingEvents, setPendingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activatingId, setActivatingId] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError('');
      try {
        const [activeResp, pendingResp] = await Promise.all([
          apiGet(`${BACKEND_URL}/api/admin/events/active`),
          apiGet(`${BACKEND_URL}/api/admin/events/pending`),
        ]);
        setEvents(activeResp?.data || []);
        setPendingEvents(pendingResp?.data || []);
      } catch (e) {
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const activate = async (id) => {
    setActivatingId(id);
    try {
      const resp = await apiPost(`${BACKEND_URL}/api/admin/events/${id}/activate`, {});
      if (resp?.status === 'success') {
        // Move event from pending to active list in UI
        const activated = pendingEvents.find((e) => e.id === id);
        if (activated) {
          activated.status = 'ACTIVATED';
          setEvents([activated, ...events]);
          setPendingEvents(pendingEvents.filter((e) => e.id !== id));
        }
      } else {
        alert(resp?.message || 'Failed to activate event');
      }
    } catch (e) {
      alert('Failed to activate event');
    } finally {
      setActivatingId(null);
    }
  };

  return (
    <PageContainer title="Events (Admin)">
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      {/* Pending Section */}
      <Typography variant="h6" sx={{ mb: 1 }}>Pending Activation</Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {pendingEvents.length === 0 && (
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary">No pending events</Typography>
          </Grid>
        )}
        {pendingEvents.map((ev) => (
          <Grid item xs={12} md={6} key={ev.id}>
            <Card>
              <CardContent>
                {(ev.banner_url || ev.banner) && (
                  <Box
                    mb={2}
                    sx={{
                      width: '100%',
                      height: 180,
                      overflow: 'hidden',
                      borderRadius: 1,
                      backgroundColor: '#f5f5f5',
                    }}
                  >
                    <img
                      src={ev.banner_url || `${BACKEND_URL}/storage/${ev.banner}`}
                      alt={ev.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </Box>
                )}
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                  <Typography variant="h6">{ev.name}</Typography>
                  <Chip label={ev.status} size="small" />
                </Box>
<<<<<<< HEAD
                <Typography variant="body2" color="textSecondary" mb={1}>EO: {ev?.eo?.name || '-'}</Typography>
                <Typography variant="body2" mb={1}>{formatDateIndonesia(ev.start_date)} → {formatDateIndonesia(ev.end_date)}</Typography>
                <Typography variant="body2" mb={2}>Registrations: {ev.registrations_count || 0}</Typography>
=======
                <Typography variant="body2" color="textSecondary" mb={0.5}>EO: {ev?.eo?.name || '-'}</Typography>
                <Typography variant="body2" mb={0.5}><strong>Tanggal mulai:</strong> {formatDateIndonesia(ev.start_date)}</Typography>
                <Typography variant="body2" mb={0.5}><strong>Tanggal berakhir:</strong> {formatDateIndonesia(ev.end_date)}</Typography>
                <Typography variant="body2" mb={0.5}><strong>Harga:</strong> {ev.booth_price ? `Rp. ${Number(ev.booth_price).toLocaleString('id-ID')}` : 'Gratis'}</Typography>
                <Typography variant="body2" mb={1}>Registrations: {ev.registrations_count || 0}</Typography>
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
                <Button variant="contained" size="small" onClick={() => activate(ev.id)} disabled={activatingId === ev.id}>
                  {activatingId === ev.id ? 'Activating...' : 'Activate'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Divider sx={{ mb: 2 }} />
      {/* Active Section */}
      <Typography variant="h6" sx={{ mb: 1 }}>Active & Published</Typography>
      <Grid container spacing={2}>
        {events.length === 0 && (
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary">No active events</Typography>
          </Grid>
        )}
        {events.map((ev) => (
          <Grid item xs={12} md={6} key={ev.id}>
            <Card>
              <CardContent>
                {(ev.banner_url || ev.banner) && (
                  <Box
                    mb={2}
                    sx={{
                      width: '100%',
                      height: 180,
                      overflow: 'hidden',
                      borderRadius: 1,
                      backgroundColor: '#f5f5f5',
                    }}
                  >
                    <img
                      src={ev.banner_url || `${BACKEND_URL}/storage/${ev.banner}`}
                      alt={ev.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </Box>
                )}
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                  <Typography variant="h6">{ev.name}</Typography>
                  <Chip label={ev.status} size="small" />
                </Box>
<<<<<<< HEAD
                <Typography variant="body2" color="textSecondary" mb={1}>EO: {ev?.eo?.name || '-'}</Typography>
                <Typography variant="body2" mb={1}>{ev.start_date} → {ev.end_date}</Typography>
=======
                <Typography variant="body2" color="textSecondary" mb={0.5}>EO: {ev?.eo?.name || '-'}</Typography>
                <Typography variant="body2" mb={0.5}><strong>Tanggal mulai:</strong> {formatDateIndonesia(ev.start_date)}</Typography>
                <Typography variant="body2" mb={0.5}><strong>Tanggal berakhir:</strong> {formatDateIndonesia(ev.end_date)}</Typography>
                <Typography variant="body2" mb={0.5}><strong>Harga:</strong> {ev.booth_price ? `Rp. ${Number(ev.booth_price).toLocaleString('id-ID')}` : 'Gratis'}</Typography>
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
                <Typography variant="body2" mb={1}>Registrations: {ev.registrations_count || 0}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  );
}
