import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiGet } from 'src/utils/api';

export default function ActiveEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError('');
      try {
        const resp = await apiGet(BACKEND_URL + '/api/tenant/events/active');
        setEvents(Array.isArray(resp?.data) ? resp.data : resp);
      } catch (e) {
        setError('Failed to load active events');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <PageContainer title="My Active Events">
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={2}>
        {events.map((ev) => (
          <Grid item xs={12} md={6} key={ev.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{ev.name}</Typography>
                <Typography variant="body2" color="textSecondary">{ev.location}</Typography>
                <Typography variant="body2">{ev.start_date} → {ev.end_date}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  );
}


