import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Chip } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiGet } from 'src/utils/api';

const statusColor = (s) => {
  if (s === 'APPROVED') return 'success';
  if (s === 'REJECTED') return 'error';
  return 'warning';
}

export default function ClaimsList() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError('');
      try {
        const resp = await apiGet(BACKEND_URL + '/api/tenant/claims');
        setClaims(resp?.data || []);
      } catch (e) {
        setError('Failed to load claims');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <PageContainer title="My Claims">
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={2}>
        {claims.map((c) => (
          <Grid item xs={12} md={6} key={c.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{c?.insurance_policy?.event?.name || 'Event'}</Typography>
                <Typography variant="body2" color="textSecondary">{c.description}</Typography>
                <Typography variant="body2">Amount: {c.claim_amount || '-'}</Typography>
                <Chip label={c.status} color={statusColor(c.status)} size="small" sx={{ mt: 1 }} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  );
}


