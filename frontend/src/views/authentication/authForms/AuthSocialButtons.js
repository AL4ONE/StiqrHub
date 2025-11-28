import React from 'react';
<<<<<<< HEAD
import icon1 from 'src/assets/images/svgs/google-icon.svg';
import icon2 from 'src/assets/images/svgs/facebook-icon.svg';
import CustomSocialButton from '../../../components/forms/theme-elements/CustomSocialButton';
import { Stack } from '@mui/system';
import { Avatar, Box } from '@mui/material';
=======
import CustomSocialButton from '../../../components/forms/theme-elements/CustomSocialButton';
import { Stack } from '@mui/system';
import { Box } from '@mui/material';
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382

const AuthSocialButtons = ({ title }) => (
  <>
    <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
      <CustomSocialButton>
<<<<<<< HEAD
        <Avatar
          src={icon1}
          alt={icon1}
          sx={{
            width: 16,
            height: 16,
            borderRadius: 0,
            mr: 1,
          }}
        />
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, whiteSpace: 'nowrap', mr: { sm: '3px' } }}>
          {title}{' '}
        </Box>{' '}
        Google
      </CustomSocialButton>
      <CustomSocialButton>
        <Avatar
          src={icon2}
          alt={icon2}
          sx={{
            width: 25,
            height: 25,
            borderRadius: 0,
            mr: 1,
          }}
        />
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, whiteSpace: 'nowrap', mr: { sm: '3px' } }}>
          {title}{' '}
        </Box>{' '}
        FB
=======
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, whiteSpace: 'nowrap', mr: { sm: '3px' } }}>
          Sign up with{' '}
        </Box>{' '}
        STIQR
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
      </CustomSocialButton>
    </Stack>
  </>
);

export default AuthSocialButtons;
