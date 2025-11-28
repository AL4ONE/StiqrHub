import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Divider,
  Stack,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Chip,
<<<<<<< HEAD
} from '@mui/material';
=======
  InputAdornment,
  IconButton,
} from '@mui/material';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
import { Link } from 'react-router-dom';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import AuthSocialButtons from './AuthSocialButtons';

// ✅ Import dari env
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const allCategories = [
  'F&B',
  'Fashion',
  'Automotive',
  'Art & Craft',
  'Snack & Beverage',
  'Wellness',
  'Others',
];

const AuthRegister = ({ title, subtitle, subtext }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
<<<<<<< HEAD
  const [loading, setLoading] = useState(false); // ✅ Tambah loading state
=======
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false); // ✅ Tambah loading state
  const [showPassword, setShowPassword] = useState(false);

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = (value) => {
    if (!value) {
      setEmailError('Email is required');
      return false;
    }
    if (!emailRegex.test(value)) {
      setEmailError('Format email tidak valid. Contoh: nama@domain.com');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (value) => {
    if (!value) {
      setPasswordError('Password is required');
      return false;
    }
    if (!passwordRegex.test(value)) {
      setPasswordError(
        'Password must be at least 8 characters and include uppercase, lowercase, number, and special character'
      );
      return false;
    }
    setPasswordError('');
    return true;
  };
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

<<<<<<< HEAD
=======
    if (!validateEmail(email)) {
      setLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setLoading(false);
      return;
    }

>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
    try {
      const params = new URLSearchParams(window.location.search);
      const role = params.get('role') || 'TENANT';

      const payload = { name, email: email.toLowerCase(), password, role };
      
      // ✅ Validasi categories untuk EO
      if (role === 'EO') {
        if (categories.length === 0) {
          setError('Please select at least 1 category');
          setLoading(false);
          return;
        }
        if (categories.length > 3) {
          setError('Maximum 3 categories allowed');
          setLoading(false);
          return;
        }
        payload.categories = categories;
      }

      // ✅ Tambah Accept header
      const res = await fetch(`${BACKEND_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json', // ✅ Penting untuk Laravel
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      // ✅ Cek HTTP status code
      if (!res.ok) {
        // Handle validation errors
        if (data.errors) {
          const errorMessages = Object.values(data.errors).flat().join(', ');
          setError(errorMessages);
        } else {
          setError(data.message || 'Registration failed');
        }
        setLoading(false);
        return;
      }

      // ✅ Success case
      if (data && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user)); // ✅ Simpan full user object
        localStorage.setItem('role', data.user?.role);

        const r = data.user?.role || 'TENANT';
        
        // ✅ Redirect berdasarkan role
        if (r === 'EO') {
          window.location.href = '/app/eo/dashboard';
        } else if (r === 'ADMIN') {
          window.location.href = '/app/admin/dashboard';
        } else if (r === 'INSURER') {
          window.location.href = '/app/insurer/dashboard';
        } else {
          window.location.href = '/app/tenant/dashboard';
        }
      } else {
        setError(data?.message || 'Registration failed');
        setLoading(false);
      }
    } catch (err) {
      console.error('Register error:', err);
      setError('Network error. Please check your connection.');
      setLoading(false);
    }
  };

  const params = new URLSearchParams(window.location.search);
  const role = params.get('role') || 'TENANT';

  return (
    <>
      {title && (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      )}

      {subtext}
      <AuthSocialButtons title="Sign up with" />

      <Box mt={3}>
        <Divider>
          <Typography
            component="span"
            color="textSecondary"
            variant="h6"
            fontWeight="400"
            position="relative"
            px={2}
          >
            or sign up with
          </Typography>
        </Divider>
      </Box>

      <Box component="form" onSubmit={handleRegister}>
        <Stack mb={3}>
          <CustomFormLabel htmlFor="name">Name</CustomFormLabel>
          <CustomTextField
            id="name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <CustomFormLabel htmlFor="email">Email Address</CustomFormLabel>
          <CustomTextField
            id="email"
            type="email"
            variant="outlined"
            fullWidth
            value={email}
<<<<<<< HEAD
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            required
=======
            onChange={(e) => {
              const value = e.target.value.toLowerCase();
              setEmail(value);
              if (emailError) {
                validateEmail(value);
              }
            }}
            onBlur={() => validateEmail(email)}
            required
            error={!!emailError}
            helperText={emailError || 'Masukkan email yang valid'}
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
          />

          <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
          <CustomTextField
            id="password"
<<<<<<< HEAD
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            inputProps={{ minLength: 6 }}
=======
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => {
              const value = e.target.value;
              setPassword(value);
              if (passwordError) {
                validatePassword(value);
              }
            }}
            onBlur={() => validatePassword(password)}
            required
            error={!!passwordError}
            helperText={
              passwordError ||
              'Min. 8 characters with uppercase, lowercase, number, and special character'
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
          />

          {/* Dropdown categories muncul kalau role EO */}
          {role === 'EO' && (
            <>
              <CustomFormLabel htmlFor="categories">
                Categories (1–3) <span style={{ color: 'red' }}>*</span>
              </CustomFormLabel>
              <FormControl fullWidth>
                <InputLabel id="categories-label">Select categories</InputLabel>
                <Select
                  labelId="categories-label"
                  id="categories"
                  multiple
                  value={categories}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length <= 3) setCategories(value);
                  }}
                  input={<OutlinedInput label="Select categories" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {allCategories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
                <Typography variant="caption" color="textSecondary">
                  You can select up to 3 categories
                </Typography>
              </FormControl>
            </>
          )}
        </Stack>

        {/* ✅ Tambah loading state */}
        <Button 
          color="primary" 
          variant="contained" 
          size="large" 
          fullWidth 
          type="submit"
          disabled={loading}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </Button>

        {/* ✅ Better error display */}
        {error && (
          <Box 
            mt={2} 
            p={2} 
            sx={{ 
              backgroundColor: '#ffebee', 
              borderRadius: 1,
              border: '1px solid #ef5350'
            }}
          >
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          </Box>
        )}
      </Box>

      {subtitle}
    </>
  );
};

export default AuthRegister;