import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, TextField, Grid, Box, Chip } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiGet, apiPost } from 'src/utils/api';
import { useParams } from 'react-router-dom';

export default function EventRules() {
  const { id } = useParams();
  const [rules, setRules] = useState([]);
  const [newRule, setNewRule] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
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
    })();
  }, [id]);

  const handleAddRule = async () => {
    if (!newRule.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await apiPost(BACKEND_URL + `/api/eo/events/${id}/rules`, { rule: newRule });
      if (res?.status === 'success') {
        setRules(prev => [...prev, { id: Date.now(), rule: newRule }]);
        setNewRule('');
      } else {
        setError(res?.message || 'Failed to add rule');
      }
    } catch (e) {
      setError('Failed to add rule');
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
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  label="Add New Rule"
                  value={newRule}
                  onChange={(e) => setNewRule(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" onClick={handleAddRule} disabled={loading || !newRule.trim()}>
                  Add Rule
                </Button>
              </Grid>
            </Grid>
          </Box>
          {loading && <Typography>Loading...</Typography>}
          {error && <Typography color="error">{error}</Typography>}
          <Grid container spacing={1}>
            {rules.map((r) => (
              <Grid item key={r.id}>
                <Chip label={r.rule} onDelete={() => {}} />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
