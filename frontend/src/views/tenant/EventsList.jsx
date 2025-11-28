import React, { useEffect, useState, useMemo } from 'react';
import { Grid, Card, CardContent, Typography, Button, Stack, Box, TextField, MenuItem } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiGet } from 'src/utils/api';
<<<<<<< HEAD
import { Link } from 'react-router-dom'; // ✅ ganti dari 'react-router' ke 'react-router-dom'
import { formatDateIndonesia } from 'src/utils/dateFormat';

=======
import { formatDateIndonesia } from 'src/utils/dateFormat';

const describePrice = (ev = {}) => {
  const contactForPrice = !!ev.contact_for_price;
  const rawValue =
    ev.booth_price !== null && ev.booth_price !== undefined && ev.booth_price !== ''
      ? Number(ev.booth_price)
      : 0;
  const numericValue = Number.isFinite(rawValue) ? rawValue : 0;
  const isFree = !contactForPrice && numericValue === 0;
  const label = contactForPrice
    ? 'Info lanjut'
    : isFree
      ? 'Gratis'
      : `Rp. ${numericValue.toLocaleString('id-ID')}${ev.payment_method === 'per_day' ? '/hari' : '/event'}`;
  const color = contactForPrice ? '#FF9800' : isFree ? '#2E7D32' : '#00C68E';
  return { contactForPrice, isFree, label, color };
};

>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
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
<<<<<<< HEAD
      const isFree = Number(ev.booth_price || 0) === 0;
=======
      const { isFree } = describePrice(ev);
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
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
<<<<<<< HEAD
        {filteredEvents.map((ev) => (
          <Grid item xs={12} md={6} key={ev.id}>
            <Card>
              <CardContent>
=======
        {filteredEvents.map((ev) => {
          const priceMeta = describePrice(ev);
          return (
            <Grid item xs={12} md={6} key={ev.id}>
              <Card>
                <CardContent>
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
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
<<<<<<< HEAD
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
=======
                <Typography variant="body2" color="textSecondary" mb={0.5}>
                  {ev.location}
                </Typography>
                <Typography variant="body2" mb={0.5}>
                  <strong>Tanggal mulai:</strong> {formatDateIndonesia(ev.start_date)}
                </Typography>
                <Typography variant="body2" mb={1}>
                  <strong>Tanggal berakhir:</strong> {formatDateIndonesia(ev.end_date)}
                </Typography>
                <Typography
                  variant="body2"
                  mb={1}
                  sx={{ fontWeight: 600, color: priceMeta.color }}
                >
                  <strong>Harga:</strong> {priceMeta.label}
                </Typography>
                <Stack direction="row" spacing={1} mt={2}>
                  <Button
                    variant="contained"
                    component="a"
                    href={`/app/tenant/events/${ev.id}`}
                  >
                    View Details
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
<<<<<<< HEAD
        ))}
=======
          );
        })}
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
      </Grid>
    </PageContainer>
  );
}
