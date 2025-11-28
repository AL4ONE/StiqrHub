import React, { useEffect, useState } from 'react';

  if (status === 'PENDING') return 'warning';
  return 'default';
};


export default function Payouts() {
  const [payouts, setPayouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  useEffect(() => {
    (async () => {
      setLoading(true);
      setError('');
      try {
        const data = await apiGet(BACKEND_URL + '/api/eo/payouts');
        setPayouts(data?.data || []);
      } catch (e) {
        setError('Failed to load payouts');
      } finally {
        setLoading(false);

  return (
    <PageContainer title="Payouts & Settlement">
      <Card>
        <CardContent>
          <Typography variant="h6" mb={3}>Payouts & Settlement</Typography>
          {loading && <Typography>Loading...</Typography>}
          {error && <Typography color="error">{error}</Typography>}

                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </PageContainer>
  );
}

