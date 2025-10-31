import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Button,
  Chip,
  TextField,
  MenuItem,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiGet, apiPost } from 'src/utils/api';

const statusColor = (s) =>
  s === 'APPROVED' ? 'success' : s === 'REJECTED' ? 'error' : 'warning';

export default function ClaimsInbox() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [action, setAction] = useState('');
  const [approvedAmount, setApprovedAmount] = useState('');
  const [reason, setReason] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const url = status
        ? `${BACKEND_URL}/api/insurer/claims?status=${status}`
        : `${BACKEND_URL}/api/insurer/claims`;
      const resp = await apiGet(url);
      setClaims(resp?.data || []);
    } catch (e) {
      setError('Failed to load claims');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await load();
    })();
  }, [status]);

  const handleAction = (claim, actionType) => {
    setSelectedClaim(claim);
    setAction(actionType);
    setApprovedAmount(claim.claim_amount || '');
    setReason('');
  };

  const submitAction = async () => {
    if (!selectedClaim) return;
    try {
      if (action === 'approve') {
        await apiPost(
          `${BACKEND_URL}/api/insurer/claims/${selectedClaim.id}/approve`,
          {
            approved_amount: parseFloat(approvedAmount),
            case_reference:
              reason ||
              `Approved by ${
                JSON.parse(localStorage.getItem('user') || '{}')?.name ||
                'Insurer'
              }`,
          }
        );
      } else if (action === 'reject') {
        await apiPost(
          `${BACKEND_URL}/api/insurer/claims/${selectedClaim.id}/reject`,
          { reason }
        );
      }
      setSelectedClaim(null);
      setAction('');
      await load();
    } catch (e) {
      alert('Failed to process claim');
    }
  };

  return (
    <PageContainer title="Claims Inbox">
      <Card>
        <CardContent>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            mb={2}
            alignItems="center"
          >
            <Typography variant="h6" flex={1}>
              Claims
            </Typography>
            <TextField
              label="Filter Status"
              select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              size="small"
              sx={{ minWidth: 180 }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="REQUEST_CLAIM">Pending</MenuItem>
              <MenuItem value="APPROVED">Approved</MenuItem>
              <MenuItem value="REJECTED">Rejected</MenuItem>
            </TextField>
            <Button variant="outlined" onClick={load}>
              Refresh
            </Button>
          </Stack>

          {loading && <Typography>Loading...</Typography>}
          {error && <Typography color="error">{error}</Typography>}

          <Grid container spacing={2}>
            {claims.map((c) => (
              <Grid item xs={12} md={6} key={c.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      mb={1}
                    >
                      <Typography variant="h6">Claim #{c.id}</Typography>
                      <Chip
                        label={c.status}
                        color={statusColor(c.status)}
                        size="small"
                      />
                    </Box>

                    {c.document_path ? (
                      <Box mb={1}>
                        {/\.pdf$/i.test(c.document_path) ? (
                          <Button
                            size="small"
                            href={`${BACKEND_URL}/storage/${c.document_path}`}
                            target="_blank"
                            rel="noopener"
                          >
                            View Document (PDF)
                          </Button>
                        ) : (
                          <Box
                            sx={{
                              width: '100%',
                              height: 180,
                              overflow: 'hidden',
                              borderRadius: 1,
                              backgroundColor: '#f5f5f5',
                            }}
                          >
                            <img
                              src={`${BACKEND_URL}/storage/${c.document_path}`}
                              alt={`Claim ${c.id} document`}
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
                      </Box>
                    ) : null}

                    <Typography variant="body2" color="textSecondary" mb={1}>
                      Event: {c?.insurance_policy?.event?.name || '-'}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" mb={1}>
                      Tenant: {c?.tenant?.name || '-'}
                    </Typography>
                    <Typography variant="body2" mb={1}>
                      Amount: Rp {(c.claim_amount || 0).toLocaleString()}
                    </Typography>
                    <Typography variant="body2" mb={1}>
                      Description: {c.description}
                    </Typography>

                    {c.status === 'REQUEST_CLAIM' && (
                      <Stack direction="row" spacing={1} mt={1}>
                        <Button
                          size="small"
                          variant="contained"
                          color="success"
                          onClick={() => handleAction(c, 'approve')}
                        >
                          Approve
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          color="error"
                          onClick={() => handleAction(c, 'reject')}
                        >
                          Reject
                        </Button>
                      </Stack>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      <Dialog
        open={!!selectedClaim}
        onClose={() => setSelectedClaim(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {action === 'approve' ? 'Approve Claim' : 'Reject Claim'}
        </DialogTitle>
        <DialogContent>
          {action === 'approve' && (
            <TextField
              fullWidth
              label="Approved Amount"
              type="number"
              value={approvedAmount}
              onChange={(e) => setApprovedAmount(e.target.value)}
              margin="normal"
            />
          )}
          <TextField
            fullWidth
            label={
              action === 'approve'
                ? 'Case Reference (optional)'
                : 'Rejection Reason (required)'
            }
            multiline
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            margin="normal"
            required={action === 'reject'}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedClaim(null)}>Cancel</Button>
          <Button
            onClick={submitAction}
            variant="contained"
            color={action === 'approve' ? 'success' : 'error'}
          >
            {action === 'approve' ? 'Approve' : 'Reject'}
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
}
