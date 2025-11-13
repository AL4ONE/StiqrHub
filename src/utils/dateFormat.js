/**
 * Format date to DD-MM-YYYY HH:mm format (without seconds)
 * @param {string|Date} date - Date string or Date object
 * @returns {string} Formatted date string (DD-MM-YYYY HH:mm)
 */
export const formatDate = (date) => {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (isNaN(dateObj.getTime())) {
      return '';
    }
    
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

/**
 * Format date to DD-MM-YYYY HH:mm format with Indonesia timezone (WIB - UTC+7)
 * @param {string|Date} date - Date string or Date object
 * @returns {string} Formatted date string (DD-MM-YYYY HH:mm) in Indonesia timezone
 */
export const formatDateIndonesia = (date) => {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (isNaN(dateObj.getTime())) {
      return '';
    }
    
    // Convert to Indonesia timezone (Asia/Jakarta - UTC+7) using Intl.DateTimeFormat
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Jakarta',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    
    const parts = formatter.formatToParts(dateObj);
    const day = parts.find(p => p.type === 'day').value;
    const month = parts.find(p => p.type === 'month').value;
    const year = parts.find(p => p.type === 'year').value;
    const hours = parts.find(p => p.type === 'hour').value;
    const minutes = parts.find(p => p.type === 'minute').value;
    
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  } catch (error) {
    console.error('Error formatting date to Indonesia timezone:', error);
    return '';
  }
};

/**
 * Convert date to Indonesia timezone for datetime-local input
 * @param {string|Date} date - Date string or Date object
 * @returns {string} Formatted date string (YYYY-MM-DDTHH:mm) in Indonesia timezone
 */
export const toIndonesiaDateTimeLocal = (date) => {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (isNaN(dateObj.getTime())) {
      return '';
    }
    
    // Convert to Indonesia timezone (Asia/Jakarta - UTC+7)
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Jakarta',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    
    const parts = formatter.formatToParts(dateObj);
    const year = parts.find(p => p.type === 'year').value;
    const month = parts.find(p => p.type === 'month').value;
    const day = parts.find(p => p.type === 'day').value;
    const hours = parts.find(p => p.type === 'hour').value;
    const minutes = parts.find(p => p.type === 'minute').value;
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  } catch (error) {
    console.error('Error converting date to Indonesia timezone:', error);
    return '';
  }
};

/**
 * Convert datetime-local input (Indonesia timezone) to UTC for backend
 * @param {string} dateTimeLocal - Date string from datetime-local input (YYYY-MM-DDTHH:mm)
 * @returns {string} UTC date string in format "YYYY-MM-DD HH:mm:ss"
 */
export const fromIndonesiaDateTimeToUTC = (dateTimeLocal) => {
  if (!dateTimeLocal) return null;
  
  try {
    // datetime-local input format: YYYY-MM-DDTHH:mm (no timezone info)
    // IMPORTANT: We treat this input as Indonesia timezone (WIB = UTC+7), NOT browser local timezone
    // So if user inputs "2024-12-25T10:00", we treat it as 10:00 WIB = 03:00 UTC
    
    // Parse the date parts
    const [datePart, timePart] = dateTimeLocal.split('T');
    if (!datePart || !timePart) {
      console.error('Invalid datetime-local format:', dateTimeLocal);
      return null;
    }
    
    // Create date in Indonesia timezone by appending +07:00
    // This tells JavaScript to treat the time as Indonesia timezone
    const indonesiaDateStr = `${dateTimeLocal}+07:00`;
    const indonesiaDate = new Date(indonesiaDateStr);
    
    // Validate
    if (isNaN(indonesiaDate.getTime())) {
      console.error('Invalid date:', dateTimeLocal);
      return null;
    }
    
    // Convert to UTC ISO string, then format as "YYYY-MM-DD HH:mm:ss"
    const utcISO = indonesiaDate.toISOString();
    return utcISO.slice(0, 19).replace('T', ' ');
  } catch (error) {
    console.error('Error converting Indonesia date to UTC:', error, dateTimeLocal);
    return null;
  }
};

