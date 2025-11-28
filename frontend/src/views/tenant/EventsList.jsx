import React, { useEffect, useState, useMemo } from 'react';
import { Grid, Card, CardContent, Typography, Button, Stack, Box, TextField, MenuItem } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiGet } from 'src/utils/api';

export default function EventsList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('ALL'); // ALL | FREE | PAID

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

  const filteredEvents = useMemo(() => {
    const q = query.trim().toLowerCase();
    return events.filter((ev) => {
      const matchesQuery =
        !q ||
        (ev.name && ev.name.toLowerCase().includes(q)) ||
        (ev.location && ev.location.toLowerCase().includes(q));

      const matchesPrice =
        priceFilter === 'ALL' ||
        (priceFilter === 'FREE' && isFree) ||
        (priceFilter === 'PAID' && !isFree);
      return matchesQuery && matchesPrice;
    });
  }, [events, query, priceFilter]);

  return (
    <PageContainer title="Browse Events">
      <Box mb={2} display="flex" gap={2} flexDirection={{ xs: 'column', sm: 'row' }}>
        <TextField
          fullWidth
          size="small"
          label="Cari nama atau lokasi event"
          placeholder="Contoh: jakarta, taman, sol ground"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <TextField
          select
          size="small"
          label="Harga Booth"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="ALL">Semua</MenuItem>
          <MenuItem value="FREE">Gratis</MenuItem>
          <MenuItem value="PAID">Berbayar</MenuItem>
        </TextField>
      </Box>
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={2}>
        {filteredEvents.map((ev) => {
          const isFree = !ev.booth_price || ev.booth_price === 0;
          return (
            <Grid item xs={12} md={6} key={ev.id}>
              <Card>
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
                <CardContent>
                  <Typography variant="h6" gutterBottom>{ev.name}</Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    📍 {ev.location}
                  </Typography>
                  <Stack direction="row" spacing={2} mt={2}>
                    <Button variant="contained" component="a" href={`/app/tenant/events/${ev.id}`}>
                      View Details
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </PageContainer>
  );
}
