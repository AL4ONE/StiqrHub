import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiGet } from 'src/utils/api';
import { formatDateIndonesia } from 'src/utils/dateFormat';

const formatPrice = (price) => {
  if (price == null) return 'Rp 0';
  const num = Math.floor(Number(price));
  const formatted = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `Rp ${formatted}`;
};

const claimStatusColor = (status) => {
  if (status === 'APPROVED') return 'success';
  if (status === 'PENDING') return 'warning';
  if (status === 'REJECTED') return 'error';
  return 'default';
};

export default function Claims() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedClaim, setSelectedClaim] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError('');
      try {
        const data = await apiGet(BACKEND_URL + '/api/eo/claims');
        setClaims(data?.data || []);
      } catch (e) {
        setError('Failed to load claims');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleViewDetails = (claim) => {
    setSelectedClaim(claim);
  };

  const handleCloseDialog = () => {
    setSelectedClaim(null);
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <PageContainer title="Claim Insurance">
      <Card>
        <CardContent>
          <Typography variant="h6" mb={3}>Insurance Claims</Typography>
          
          {claims.length === 0 ? (
            <Box textAlign="center" py={4}>
              <Typography variant="body1" color="textSecondary">
                No insurance claims yet.
              </Typography>
            </Box>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>No</strong></TableCell>
                    <TableCell><strong>Tenant Name</strong></TableCell>
                    <TableCell><strong>Email</strong></TableCell>
                    <TableCell><strong>Event Name</strong></TableCell>
                    <TableCell><strong>Event Date</strong></TableCell>
                    <TableCell><strong>Policy Number</strong></TableCell>
                    <TableCell><strong>Incident Date</strong></TableCell>
                    <TableCell><strong>Claim Amount</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                    <TableCell><strong>Submitted Date</strong></TableCell>
                    <TableCell><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {claims.map((claim, index) => (
                    <TableRow key={claim.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{claim.tenant_name}</TableCell>
                      <TableCell>{claim.tenant_email}</TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          {(claim.event_banner_url || claim.event_banner) && (
                            <Box
                              component="img"
                              src={
                                claim.event_banner_url
                                  ? (claim.event_banner_url.startsWith('http') ? claim.event_banner_url : `${BACKEND_URL}${claim.event_banner_url}`)
                                  : `${BACKEND_URL}/storage/${claim.event_banner}`
                              }
                              alt={claim.event_name}
                              sx={{
                                width: 50,
                                height: 50,
                                objectFit: 'cover',
                                borderRadius: 1,
                                border: '1px solid',
                                borderColor: 'divider'
                              }}
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          )}
                          <Box>
                            <Typography variant="body2" fontWeight={500}>
                              {claim.event_name}
                            </Typography>
                            {claim.event_id && (
                              <Typography variant="caption" display="block" color="textSecondary">
                                ID: {claim.event_id}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {claim.event_start_date && claim.event_end_date ? (
                          <>
                            {formatDateIndonesia(claim.event_start_date)}
                            <br />
                            <Typography variant="caption" color="textSecondary">
                              to {formatDateIndonesia(claim.event_end_date)}
                            </Typography>
                          </>
                        ) : (
                          'N/A'
                        )}
                      </TableCell>
                      <TableCell>{claim.policy_number}</TableCell>
                      <TableCell>
                        {claim.incident_date ? formatDateIndonesia(claim.incident_date) : 'N/A'}
                      </TableCell>
                      <TableCell>{formatPrice(claim.claim_amount)}</TableCell>
                      <TableCell>
                        <Chip 
                          label={claim.status || 'PENDING'} 
                          size="small"
                          color={claimStatusColor(claim.status)}
                        />
                      </TableCell>
                      <TableCell>
                        {claim.created_at ? formatDateIndonesia(claim.created_at) : 'N/A'}
                      </TableCell>
                      <TableCell>
                        <Button size="small" onClick={() => handleViewDetails(claim)}>
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {claims.length > 0 && (
            <Box mt={3}>
              <Typography variant="subtitle2" mb={1}>
                Claim Summary
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body2" color="textSecondary">Total Claims</Typography>
                  <Typography variant="h6">{claims.length}</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body2" color="textSecondary">Pending</Typography>
                  <Typography variant="h6" color="warning.main">
                    {claims.filter(c => c.status === 'PENDING').length}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body2" color="textSecondary">Total Claim Amount</Typography>
                  <Typography variant="h6" color="primary.main">
                    {formatPrice(claims.reduce((sum, c) => sum + (c.claim_amount || 0), 0))}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Claim Details Dialog */}
      <Dialog open={!!selectedClaim} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h6" fontWeight={600}>
            📋 Detail Klaim Asuransi
          </Typography>
        </DialogTitle>
        <DialogContent>
          {selectedClaim && (
            <Box>
              {/* Event Banner */}
              {(selectedClaim.event_banner_url || selectedClaim.event_banner) && (
                <Box mb={3}>
                  <Typography variant="body2" color="textSecondary" mb={1}>
                    Banner Event
                  </Typography>
                  <Box
                    component="img"
                    src={
                      selectedClaim.event_banner_url
                        ? (selectedClaim.event_banner_url.startsWith('http') ? selectedClaim.event_banner_url : `${BACKEND_URL}${selectedClaim.event_banner_url}`)
                        : `${BACKEND_URL}/storage/${selectedClaim.event_banner}`
                    }
                    alt={selectedClaim.event_name}
                    sx={{
                      width: '100%',
                      maxHeight: 200,
                      objectFit: 'cover',
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'divider'
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </Box>
              )}

              <Grid container spacing={2} mb={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="textSecondary">Nama Tenant</Typography>
                  <Typography variant="body1" fontWeight="bold">{selectedClaim.tenant_name}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="textSecondary">Email</Typography>
                  <Typography variant="body1">{selectedClaim.tenant_email}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="textSecondary">Nama Event</Typography>
                  <Typography variant="body1" fontWeight="bold">{selectedClaim.event_name}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="textSecondary">Tanggal Event</Typography>
                  <Typography variant="body1">
                    {selectedClaim.event_start_date && selectedClaim.event_end_date ? (
                      `${formatDateIndonesia(selectedClaim.event_start_date)} - ${formatDateIndonesia(selectedClaim.event_end_date)}`
                    ) : 'N/A'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="textSecondary">Nomor Polis</Typography>
                  <Typography variant="body1">{selectedClaim.policy_number}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="textSecondary">Tanggal Kejadian</Typography>
                  <Typography variant="body1">
                    {selectedClaim.incident_date ? formatDateIndonesia(selectedClaim.incident_date) : 'N/A'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="textSecondary">Jumlah Klaim</Typography>
                  <Typography variant="body1" fontWeight="bold" color="primary.main">
                    {formatPrice(selectedClaim.claim_amount)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="textSecondary">Status</Typography>
                  <Chip 
                    label={selectedClaim.status || 'PENDING'} 
                    size="small"
                    color={claimStatusColor(selectedClaim.status)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="textSecondary" mb={1}>Deskripsi</Typography>
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                    {selectedClaim.description || 'Tidak ada deskripsi'}
                  </Typography>
                </Grid>
                {selectedClaim.reason && (
                  <Grid item xs={12}>
                    <Typography variant="body2" color="textSecondary" mb={1}>Alasan</Typography>
                    <Typography variant="body1" color={selectedClaim.status === 'REJECTED' ? 'error.main' : 'text.primary'}>
                      {selectedClaim.reason}
                    </Typography>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Typography variant="body2" color="textSecondary">Tanggal Submit</Typography>
                  <Typography variant="body1">
                    {selectedClaim.created_at ? formatDateIndonesia(selectedClaim.created_at) : 'N/A'}
                  </Typography>
                </Grid>
                
                {/* Foto Dokumen Klaim */}
                {selectedClaim.document_path && (
                  <Grid item xs={12}>
                    <Typography variant="body2" color="textSecondary" mb={1}>
                      📎 Dokumen Bukti Klaim
                    </Typography>
                    <Box
                      sx={{
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 2,
                        overflow: 'hidden',
                        backgroundColor: 'grey.50'
                      }}
                    >
                      {selectedClaim.document_path.toLowerCase().endsWith('.pdf') ? (
                        <Box p={2} textAlign="center">
                          <Typography variant="body2" mb={1}>
                            File PDF
                          </Typography>
                          <Button
                            variant="outlined"
                            size="small"
                            href={`${BACKEND_URL}/storage/${selectedClaim.document_path}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Buka PDF
                          </Button>
                        </Box>
                      ) : (
                        <Box
                          component="img"
                          src={`${BACKEND_URL}/storage/${selectedClaim.document_path}`}
                          alt="Dokumen Bukti Klaim"
                          sx={{
                            width: '100%',
                            maxHeight: 400,
                            objectFit: 'contain',
                            display: 'block'
                          }}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement.innerHTML = '<div style="padding: 20px; text-align: center; color: #666;">Gagal memuat gambar</div>';
                          }}
                        />
                      )}
                    </Box>
                  </Grid>
                )}
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="contained">
            Tutup
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
}

