import React from 'react';
import CustomSocialButton from '../../../components/forms/theme-elements/CustomSocialButton';
import { Stack } from '@mui/system';
import { Box } from '@mui/material';

const AuthSocialButtons = ({ title }) => (
  <>
    <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
      <CustomSocialButton>
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, whiteSpace: 'nowrap', mr: { sm: '3px' } }}>
          Sign up with{' '}
        </Box>{' '}
        STIQR
      </CustomSocialButton>
    </Stack>
  </>
);

export default AuthSocialButtons;
