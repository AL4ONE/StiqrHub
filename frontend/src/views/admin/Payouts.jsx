import React, { useEffect, useState } from 'react';

import PageContainer from 'src/components/container/PageContainer';
import { BACKEND_URL } from 'src/config/constants';
import { apiGet } from 'src/utils/api';
import { formatDateIndonesia } from 'src/utils/dateFormat';



export default function Payouts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


    </PageContainer>
  );
}
