import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Box, Button } from '@mui/material';
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
                {(ev.banner_url || ev.banner) && (
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
                )}
                <Typography variant="h6">{ev.name}</Typography>
                <Typography variant="body2" color="textSecondary">{ev.location}</Typography>
                <Typography variant="body2">{ev.start_date} → {ev.end_date}</Typography>
                {ev.payment_summary && (
                  <Box mt={1}>
                    <Typography variant="body2">
                      Booth: Rp {(ev.payment_summary.booth_price || 0).toLocaleString()}
                    </Typography>
                    <Typography variant="body2">
                      Platform Fee: Rp {(ev.payment_summary.platform_fee || 0).toLocaleString()}
                    </Typography>
                    <Typography variant="body2">
                      Insurance: Rp {(ev.payment_summary.insurance_fee || 0).toLocaleString()}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ mt: 0.5 }}>
                      Total: Rp {(ev.payment_summary.total || 0).toLocaleString()}
                    </Typography>
                  </Box>
                )}
                <Box mt={2}>
                  <Button variant="contained" component="a" href={`/app/tenant/events/${ev.id}`}>
                    View Details
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  );
}


