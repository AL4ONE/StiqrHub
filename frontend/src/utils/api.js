export async function apiGet(url) {
  const token = localStorage.getItem('token');
  const res = await fetch(url, {
    headers: {
      'Authorization': token ? `Bearer ${token}` : undefined,
    },
  });
  return res.json();
}

export async function apiPost(url, body, isFormData = false) {
  const token = localStorage.getItem('token');
  const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
  if (!isFormData) headers['Content-Type'] = 'application/json';

  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: isFormData ? body : JSON.stringify(body || {}),
  });
<<<<<<< HEAD
  return res.json();
}

export async function apiPut(url, body) {
  const token = localStorage.getItem('token');
  const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
  headers['Content-Type'] = 'application/json';
=======
  
  // Handle non-JSON responses (like 500 errors)
  if (!res.ok && res.status >= 500) {
    const text = await res.text();
    let errorData;
    try {
      errorData = JSON.parse(text);
    } catch {
      errorData = { 
        status: 'error', 
        message: `Server error (${res.status}): ${text || 'Internal Server Error'}` 
      };
    }
    return errorData;
  }
  
  return res.json();
}

export async function apiPut(url, body, isFormData = false) {
  const token = localStorage.getItem('token');
  const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
  if (!isFormData) headers['Content-Type'] = 'application/json';
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382

  const res = await fetch(url, {
    method: 'PUT',
    headers,
<<<<<<< HEAD
    body: JSON.stringify(body || {}),
  });
=======
    body: isFormData ? body : JSON.stringify(body || {}),
  });
  
  // Handle non-JSON responses (like 500 errors)
  if (!res.ok && res.status >= 500) {
    const text = await res.text();
    let errorData;
    try {
      errorData = JSON.parse(text);
    } catch {
      errorData = { 
        status: 'error', 
        message: `Server error (${res.status}): ${text || 'Internal Server Error'}` 
      };
    }
    return errorData;
  }
  
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
  return res.json();
}

export async function apiDelete(url) {
  const token = localStorage.getItem('token');
  const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

  const res = await fetch(url, {
    method: 'DELETE',
    headers,
  });
  return res.json();
}