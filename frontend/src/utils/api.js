export async function apiGet(url) {
  const token = localStorage.getItem('token');
  const res = await fetch(url, {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });

  try {
    return await res.json();
  } catch {
    return { status: 'error', message: 'Invalid JSON response' };
  }
}

export async function apiPost(url, body, isFormData = false) {
  const token = localStorage.getItem('token');
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  if (!isFormData) headers['Content-Type'] = 'application/json';

  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: isFormData ? body : JSON.stringify(body || {}),
  });

  try {
    return await res.json();
  } catch {
    return { status: 'error', message: 'Invalid JSON response' };
  }
}

export async function apiPut(url, body) {
  const token = localStorage.getItem('token');
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  headers['Content-Type'] = 'application/json';

  const res = await fetch(url, {
    method: 'PUT',
    headers,
    body: JSON.stringify(body || {}),
  });

  try {
    return await res.json();
  } catch {
    return { status: 'error', message: 'Invalid JSON response' };
  }
}

export async function apiDelete(url) {
  const token = localStorage.getItem('token');
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const res = await fetch(url, { method: 'DELETE', headers });

  try {
    return await res.json();
  } catch {
    return { status: 'error', message: 'Invalid JSON response' };
  }
}
