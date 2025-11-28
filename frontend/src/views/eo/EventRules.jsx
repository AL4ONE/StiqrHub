import React, { useEffect, useState, useCallback } from 'react';
<<<<<<< HEAD
import { Card, CardContent, Typography, Button, TextField, Grid, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiGet, apiPost, apiDelete } from 'src/utils/api';
=======
import { Card, CardContent, Typography, Button, TextField, Grid, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon, Cancel as CancelIcon, Delete as DeleteIcon } from '@mui/icons-material';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiGet, apiPost, apiDelete, apiPut } from 'src/utils/api';
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
import { useParams } from 'react-router-dom';

export default function EventRules() {
  const { id } = useParams();
  const [rules, setRules] = useState([]);
  const [newRule, setNewRule] = useState('');
<<<<<<< HEAD
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
=======
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382

  const loadRules = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await apiGet(BACKEND_URL + `/api/eo/events/${id}/rules`);
<<<<<<< HEAD
      setRules(data?.data || []);
=======
      const rulesList = data?.data || [];
      setRules(rulesList);
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
    } catch (e) {
      setError('Failed to load rules');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadRules();
  }, [loadRules]);

  const handleAddRule = async () => {
    if (!newRule.trim()) return;
    setLoading(true);
    setError('');
    try {
      // Split by newline and filter empty lines
      const ruleLines = newRule
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
      
      if (ruleLines.length === 0) {
        setError('Please enter at least one rule');
        setLoading(false);
        return;
      }

      // If single rule, use regular endpoint
      if (ruleLines.length === 1) {
        const res = await apiPost(BACKEND_URL + `/api/eo/events/${id}/rules`, { rule: ruleLines[0] });
        if (res?.status === 'success') {
          await loadRules();
          setNewRule('');
        } else {
          setError(res?.message || 'Failed to add rule');
        }
      } else {
        // Multiple rules, use bulk endpoint
        const rulesData = ruleLines.map(ruleName => ({
          rule_name: ruleName,
          is_mandatory: true
        }));
        const res = await apiPost(BACKEND_URL + `/api/eo/events/${id}/rules/bulk`, { rules: rulesData });
        if (res?.status === 'success') {
          await loadRules();
          setNewRule('');
        } else {
          setError(res?.message || 'Failed to add rules');
        }
      }
    } catch (e) {
      setError('Failed to add rule');
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
=======
  const handleEdit = (rule) => {
    setEditingId(rule.id);
    setEditingText(rule.rule_name || rule.rule || '');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  const handleSaveEdit = async (ruleId) => {
    if (!editingText.trim()) {
      setError('Rule cannot be empty');
      return;
    }

    setSaving(true);
    setError('');
    try {
      const res = await apiPut(BACKEND_URL + `/api/eo/events/${id}/rules/${ruleId}`, {
        rule_name: editingText.trim()
      });
      
      if (res?.status === 'success') {
        await loadRules();
        setEditingId(null);
        setEditingText('');
      } else {
        setError(res?.message || 'Failed to save changes');
      }
    } catch (e) {
      setError('Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
  const handleDeleteRule = async (ruleId) => {
    if (!window.confirm('Are you sure you want to delete this rule?')) {
      return;
    }
<<<<<<< HEAD
    setLoading(true);
=======

    setSaving(true);
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
    setError('');
    try {
      const res = await apiDelete(BACKEND_URL + `/api/eo/events/${id}/rules/${ruleId}`);
      if (res?.status === 'success') {
        await loadRules();
      } else {
        setError(res?.message || 'Failed to delete rule');
      }
    } catch (e) {
      setError('Failed to delete rule');
    } finally {
<<<<<<< HEAD
      setLoading(false);
=======
      setSaving(false);
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
    }
  };

  return (
    <PageContainer title="Event Rules">
      <Card>
        <CardContent>
          <Typography variant="h6" mb={3}>Event Rules</Typography>
          <Box mb={3}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  label="Add Rules (one per line)"
                  value={newRule}
                  onChange={(e) => setNewRule(e.target.value)}
                  placeholder="Enter each rule on a new line. Example:&#10;&#10;Rule 1&#10;Rule 2&#10;Rule 3"
                  helperText="Press Enter to create a new line. Each line will become a separate rule."
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" onClick={handleAddRule} disabled={loading || !newRule.trim()}>
                  Add Rules
                </Button>
              </Grid>
            </Grid>
          </Box>
          {loading && <Typography>Loading...</Typography>}
          {error && <Typography color="error">{error}</Typography>}
<<<<<<< HEAD
          {rules.length > 0 && (
            <Box>
              <Typography variant="h6" mb={2}>Current Rules</Typography>
              <Box component="ul" sx={{ pl: 3, m: 0, listStyle: 'none' }}>
                {rules.map((r) => (
                  <Box
                    key={r.id}
                    component="li"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mb: 1,
                      p: 1,
                      borderRadius: 1,
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      },
                    }}
                  >
                    <Typography variant="body1" sx={{ flex: 1 }}>
                      {r.rule_name || r.rule}
                    </Typography>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteRule(r.id)}
                      disabled={loading}
                      aria-label="delete rule"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
          {!loading && rules.length === 0 && (
            <Typography variant="body2" color="textSecondary">
              No rules added yet. Add rules above.
            </Typography>
          )}
=======
          
          <Box mt={3}>
            <Typography variant="h6" mb={2}>Current Rules</Typography>
            {!loading && rules.length === 0 ? (
              <Typography variant="body2" color="textSecondary" mt={2}>
                No rules yet. Add new rules above.
              </Typography>
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell width="5%">No</TableCell>
                      <TableCell>Rule</TableCell>
                      <TableCell width="20%" align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rules.map((rule, index) => (
                      <TableRow key={rule.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          {editingId === rule.id ? (
                            <TextField
                              fullWidth
                              size="small"
                              value={editingText}
                              onChange={(e) => setEditingText(e.target.value)}
                              disabled={saving}
                            />
                          ) : (
                            <Typography variant="body2">
                              {rule.rule_name || rule.rule}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {editingId === rule.id ? (
                            <>
                              <IconButton
                                size="small"
                                color="primary"
                                onClick={() => handleSaveEdit(rule.id)}
                                disabled={saving}
                                title="Simpan"
                              >
                                <SaveIcon />
                              </IconButton>
                              <IconButton
                                size="small"
                                onClick={handleCancelEdit}
                                disabled={saving}
                                title="Batal"
                              >
                                <CancelIcon />
                              </IconButton>
                            </>
                          ) : (
                            <>
                              <IconButton
                                size="small"
                                color="primary"
                                onClick={() => handleEdit(rule)}
                                disabled={saving || editingId !== null}
                                title="Edit"
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleDeleteRule(rule.id)}
                                disabled={saving || editingId !== null}
                                title="Hapus"
                              >
                                <DeleteIcon />
                              </IconButton>
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
        </CardContent>
      </Card>
    </PageContainer>
  );
}
