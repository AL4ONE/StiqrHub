<<<<<<< HEAD
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000';
=======
// Remove trailing slash to avoid double slashes in URLs
const backendUrl = (import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000').replace(/\/+$/, '');
export const BACKEND_URL = backendUrl;
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
export const API_PREFIX = '/api';

export const SITE_TITLE = 'WCLOUD.my.id';
export const SITE_DESCRIPTION = 'WCLOUD.my.id - Dashboard Monitoring Website';