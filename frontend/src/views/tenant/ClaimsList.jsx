import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import { Grid, Card, CardContent, Typography, Chip } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiGet } from 'src/utils/api';
=======
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Chip, 
  Box, 
  Stack, 
  LinearProgress,
  Divider
} from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiGet } from 'src/utils/api';
import { formatDateIndonesia } from 'src/utils/dateFormat';
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382

const statusColor = (s) => {
  if (s === 'APPROVED') return 'success';
  if (s === 'REJECTED') return 'error';
  return 'warning';
}

<<<<<<< HEAD
=======
const getStatusLabel = (s) => {
  if (s === 'REQUEST_CLAIM') return 'Menunggu Review';
  if (s === 'APPROVED') return 'Disetujui';
  if (s === 'REJECTED') return 'Ditolak';
  return s;
}

const getProgressValue = (s) => {
  if (s === 'REQUEST_CLAIM') return 33;
  if (s === 'APPROVED') return 100;
  if (s === 'REJECTED') return 100;
  return 0;
}

>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
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
<<<<<<< HEAD
                <Typography variant="h6">{c?.insurance_policy?.event?.name || 'Event'}</Typography>
                <Typography variant="body2" color="textSecondary">{c.description}</Typography>
                <Typography variant="body2">Amount: {c.claim_amount || '-'}</Typography>
                <Chip label={c.status} color={statusColor(c.status)} size="small" sx={{ mt: 1 }} />
=======
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                  <Typography variant="h6">{c?.insurance_policy?.event?.name || 'Event'}</Typography>
                  <Chip 
                    label={getStatusLabel(c.status)} 
                    color={statusColor(c.status)} 
                    size="small"
                  />
                </Box>
                
                <Typography variant="body2" color="textSecondary" sx={{ mb: 1.5 }}>
                  {c.description}
                </Typography>

                <Divider sx={{ my: 1.5 }} />

                <Stack spacing={1}>
                  <Box>
                    <Typography variant="caption" color="textSecondary" display="block">
                      Progress Pengajuan
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={getProgressValue(c.status)} 
                      color={statusColor(c.status)}
                      sx={{ mt: 0.5, height: 6, borderRadius: 1 }}
                    />
                  </Box>

                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2" color="textSecondary">
                      Tanggal Kejadian:
                    </Typography>
                    <Typography variant="body2" fontWeight={500}>
                      {c.incident_date ? formatDateIndonesia(c.incident_date) : '-'}
                    </Typography>
                  </Box>

                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2" color="textSecondary">
                      Tanggal Pengajuan:
                    </Typography>
                    <Typography variant="body2" fontWeight={500}>
                      {c.created_at ? formatDateIndonesia(c.created_at) : '-'}
                    </Typography>
                  </Box>

                  {c.claim_amount && (
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2" color="textSecondary">
                        Jumlah Klaim:
                      </Typography>
                      <Typography variant="body2" fontWeight={600} color="primary.main">
                        Rp {parseFloat(c.claim_amount).toLocaleString('id-ID')}
                      </Typography>
                    </Box>
                  )}

                  {c.reason && (
                    <Box mt={1}>
                      <Typography variant="caption" color="textSecondary" display="block" mb={0.5}>
                        {c.status === 'APPROVED' ? 'Catatan Persetujuan:' : 'Alasan Penolakan:'}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          p: 1, 
                          borderRadius: 1, 
                          backgroundColor: c.status === 'APPROVED' ? 'success.50' : 'error.50',
                          color: c.status === 'APPROVED' ? 'success.dark' : 'error.dark'
                        }}
                      >
                        {c.reason}
                      </Typography>
                    </Box>
                  )}

                  {c.status === 'REQUEST_CLAIM' && (
                    <Box mt={1}>
                      <Typography variant="caption" color="textSecondary">
                        Status: Menunggu review dari insurer. Kami akan menginformasikan hasilnya segera.
                      </Typography>
                    </Box>
                  )}
                </Stack>
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  );
}


