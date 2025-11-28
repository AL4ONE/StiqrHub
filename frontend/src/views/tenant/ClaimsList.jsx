import React, { useEffect, useState } from 'react';


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

              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  );
}


