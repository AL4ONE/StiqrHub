import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardContent, Typography, Button, TextField, Grid, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiGet, apiPost, apiDelete } from 'src/utils/api';
import { useParams } from 'react-router-dom';

export default function EventRules() {
  const { id } = useParams();
  const [rules, setRules] = useState([]);
  const [newRule, setNewRule] = useState('');
  const [currentRulesText, setCurrentRulesText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const loadRules = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await apiGet(BACKEND_URL + `/api/eo/events/${id}/rules`);
      const rulesList = data?.data || [];
      setRules(rulesList);
      // Convert rules array to text format (one per line)
      setCurrentRulesText(rulesList.map(r => r.rule_name || r.rule).join('\n'));
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

  const handleUpdateRules = async () => {
    if (!currentRulesText.trim()) {
      // If empty, delete all rules
      if (rules.length === 0) return;
      
      setSaving(true);
      setError('');
      try {
        // Delete all existing rules
        for (const rule of rules) {
          await apiDelete(BACKEND_URL + `/api/eo/events/${id}/rules/${rule.id}`);
        }
        await loadRules();
      } catch (e) {
        setError('Failed to update rules');
      } finally {
        setSaving(false);
      }
      return;
    }

    setSaving(true);
    setError('');
    try {
      // Split by newline and filter empty lines
      const ruleLines = currentRulesText
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
      
      if (ruleLines.length === 0) {
        setError('Mohon masukkan setidaknya satu aturan');
        setSaving(false);
        return;
      }

      // Delete all existing rules first
      for (const rule of rules) {
        await apiDelete(BACKEND_URL + `/api/eo/events/${id}/rules/${rule.id}`);
      }

      // Add new rules using bulk endpoint
      const rulesData = ruleLines.map(ruleName => ({
        rule_name: ruleName,
        is_mandatory: true
      }));
      
      const res = await apiPost(BACKEND_URL + `/api/eo/events/${id}/rules/bulk`, { rules: rulesData });
      if (res?.status === 'success') {
        await loadRules();
      } else {
        setError(res?.message || 'Failed to update rules');
      }
    } catch (e) {
      setError('Failed to update rules');
    } finally {
      setSaving(false);
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
          
          <Box mt={3}>
            <Typography variant="h6" mb={2}>Current Rules</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={8}
                  label="Aturan Event"
                  value={currentRulesText}
                  onChange={(e) => setCurrentRulesText(e.target.value)}
                  placeholder="Masukkan aturan event, satu per baris. Contoh:&#10;&#10;Dilarang membawa makanan dari luar&#10;Wajib menggunakan seragam booth&#10;Dilarang merokok di area event"
                  helperText="Setiap baris akan menjadi satu aturan. Anda dapat mengedit semua aturan sekaligus di sini."
                  disabled={loading || saving}
                />
              </Grid>
              <Grid item xs={12}>
                <Button 
                  variant="contained" 
                  onClick={handleUpdateRules} 
                  disabled={loading || saving}
                >
                  {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
                </Button>
              </Grid>
            </Grid>
            {!loading && rules.length === 0 && (
              <Typography variant="body2" color="textSecondary" mt={2}>
                Belum ada aturan. Masukkan aturan di atas.
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
