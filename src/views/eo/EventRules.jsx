import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardContent, Typography, Button, TextField, Grid, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiGet, apiPost, apiDelete } from 'src/utils/api';
import { useParams } from 'react-router-dom';

export default function EventRules() {
  const { id } = useParams();
  const [rules, setRules] = useState([]);
  const [newRule, setNewRule] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadRules = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await apiGet(BACKEND_URL + `/api/eo/events/${id}/rules`);
      setRules(data?.data || []);
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

  const handleDeleteRule = async (ruleId) => {
    if (!window.confirm('Are you sure you want to delete this rule?')) {
      return;
    }
    setLoading(true);
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
      setLoading(false);
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
        </CardContent>
      </Card>
    </PageContainer>
  );
}
