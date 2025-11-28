import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, Stack, Chip, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiGet } from 'src/utils/api';
import { formatDateIndonesia } from 'src/utils/dateFormat';

const statusColor = (status) => {
  if (status === 'ACTIVATED') return 'success';
  if (status === 'PUBLISHED') return 'primary';
  return 'default';
};

export default function EventsList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError('');
      try {
        const data = await apiGet(BACKEND_URL + '/api/eo/events');
        setEvents(data?.data || []);
      } catch (e) {
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <PageContainer title="My Events">

      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={2}>
        {events.map((ev) => (
          <Grid item xs={12} md={6} key={ev.id}>
            <Card>
              <CardContent>
                {(ev.banner_url || ev.banner) ? (
                  <Box
                    mb={2}
                    sx={{ width: '100%', height: 180, overflow: 'hidden', borderRadius: 1, backgroundColor: '#f5f5f5' }}
                  >
                    <img
                      src={ev.banner_url || `${BACKEND_URL}/storage/${ev.banner}`}
                      alt={ev.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  </Box>
                ) : null}
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Typography variant="h6">{ev.name}</Typography>
                  <Chip label={ev.status} color={statusColor(ev.status)} size="small" />
                </Box>
                <Typography variant="body2" color="textSecondary" mb={1}>{ev.location}</Typography>

                <Typography variant="body2" mb={2}>Registrations: {ev.registrations_count || 0}</Typography>
                <Stack direction="row" spacing={1}>
                  <Button variant="contained" size="small" component="a" href={`/app/eo/events/${ev.id}`}>
                    View Details
                  </Button>
                  <Button variant="outlined" size="small" component="a" href={`/app/eo/events/${ev.id}/rules`}>
                    Rules
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  );
}
