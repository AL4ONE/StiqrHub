import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Box, Chip } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiGet } from 'src/utils/api';

export default function EventAudit() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError('');
      try {
        const resp = await apiGet(`${BACKEND_URL}/api/admin/events/active`);
        setEvents(resp?.data || []);
      } catch (e) {
        setError('Failed to load active events');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <PageContainer title="Event Audit (Active)">
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={2}>
        {events.map((ev) => (
          <Grid item xs={12} md={6} key={ev.id}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                  <Typography variant="h6">{ev.name}</Typography>
                  <Chip label={ev.status} size="small" />
                </Box>
                <Typography variant="body2" color="textSecondary" mb={1}>EO: {ev?.eo?.name || '-'}</Typography>
                <Typography variant="body2" mb={1}>{ev.start_date} → {ev.end_date}</Typography>
                <Typography variant="body2" mb={1}>Registrations: {ev.registrations_count || 0}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  );
}
