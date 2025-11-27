import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiGet } from 'src/utils/api';

export default function Fraud() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError('');
      try {
        const resp = await apiGet(`${BACKEND_URL}/api/admin/fraud/duplicate-registrations`);
        setItems(resp?.data || []);
      } catch (e) {
        setError('Failed to load fraud detections');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <PageContainer title="Fraud Detection">
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={2}>
        {items.map((it, idx) => (
          <Grid item xs={12} key={idx}>
            <Card>
              <CardContent>
                <Typography variant="h6">Tenant: {it?.tenant?.name || it.tenant_id}</Typography>
                <Typography variant="body2" color="textSecondary">Overlapping events: {it?.overlaps || '-'}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  );
}
