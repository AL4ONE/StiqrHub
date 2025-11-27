import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Box, Button, Chip, Stack, TextField, MenuItem } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiGet, apiPost } from 'src/utils/api';

export default function VerifyEOs() {
  const [eos, setEos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState('false');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const url = `${BACKEND_URL}/api/admin/eos${activeFilter !== '' ? `?is_active=${activeFilter}` : ''}`;
      const resp = await apiGet(url);
      setEos(resp?.data || []);
    } catch (e) {
      setError('Failed to load EO list');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { (async () => { await load(); })(); }, [activeFilter]);

  const verify = async (id) => {
    await apiPost(`${BACKEND_URL}/api/admin/eos/${id}/verify`);
    await load();
  };

  return (
    <PageContainer title="Verify EOs">
      <Card>
        <CardContent>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={2} alignItems="center">
            <Typography variant="h6" flex={1}>EO Accounts</Typography>
            <TextField label="Filter Active" select size="small" value={activeFilter} onChange={(e) => setActiveFilter(e.target.value)} sx={{ minWidth: 180 }}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="true">Active</MenuItem>
              <MenuItem value="false">Inactive</MenuItem>
            </TextField>
            <Button variant="outlined" onClick={load}>Refresh</Button>
          </Stack>
          {loading && <Typography>Loading...</Typography>}
          {error && <Typography color="error">{error}</Typography>}
          <Grid container spacing={2}>
            {eos.map((eo) => (
              <Grid item xs={12} md={6} key={eo.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                      <Typography variant="h6">{eo.name}</Typography>
                      <Chip label={eo.is_active ? 'ACTIVE' : 'INACTIVE'} color={eo.is_active ? 'success' : 'warning'} size="small" />
                    </Box>
                    <Typography variant="body2" color="textSecondary" mb={1}>Email: {eo.email}</Typography>
                    <Stack direction="row" spacing={1}>
                      <Button size="small" variant="contained" disabled={eo.is_active} onClick={() => verify(eo.id)}>Verify</Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
