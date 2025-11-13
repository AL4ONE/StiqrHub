import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, Stack, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiGet } from 'src/utils/api';
import { Link } from 'react-router-dom'; // ✅ ganti dari 'react-router' ke 'react-router-dom'
import { formatDateIndonesia } from 'src/utils/dateFormat';

export default function EventsList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError('');
      try {
        const data = await apiGet(`${BACKEND_URL}/api/tenant/events`); // ✅ pakai template literal
        setEvents(Array.isArray(data) ? data : data?.data || []);
      } catch (e) {
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <PageContainer title="Browse Events">
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
                    sx={{
                      width: '100%',
                      height: 180,
                      overflow: 'hidden',
                      borderRadius: 1,
                      backgroundColor: '#f5f5f5',
                    }}
                  >
                    <img
                      src={ev.banner_url || `${BACKEND_URL}/storage/${ev.banner}`} // ✅ benerin template literal
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
                <Typography variant="h6">{ev.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {ev.location}
                </Typography>
                <Typography variant="body2">
                  {formatDateIndonesia(ev.start_date)} → {formatDateIndonesia(ev.end_date)}
                </Typography>
                <Stack direction="row" spacing={1} mt={2}>
                 <Button
                            variant="contained"
                            component="a"
                           href={`/app/tenant/events/${ev.id}`}
                          >
                            View Details
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
