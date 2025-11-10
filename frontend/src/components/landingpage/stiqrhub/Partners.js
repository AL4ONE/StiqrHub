import React from 'react';
import { Box, Container, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

import logoNobu from 'src/assets/images/logos/logoNobu.png';
import logoDana from 'src/assets/images/logos/logoDana.png';
import logoAsuransi from 'src/assets/images/logos/logoAsuransi.png';
import logoAyoConnect from 'src/assets/images/logos/logoAyoConnect.png';
import logoPacific from 'src/assets/images/logos/logoPacific.png';

const Partners = () => {
  const SectionBox = styled(Box)(({ theme }) => ({
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    backgroundColor: '#FFFFFF',
  }));

  const PartnerCard = styled(Box)(({ theme }) => ({
    height: '80px',
    minWidth: '180px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2.5),
    backgroundColor: '#F9FAFB',
    borderRadius: '12px',
    boxShadow: '0 2px 6px rgba(15, 23, 42, 0.08)',
    border: '1px solid #E2E8F0',
  }));

  const partnerLogos = [
    { src: logoNobu, alt: 'NOBU National Bank', width: 160 },
    { src: logoDana, alt: 'DANA', width: 110 },
    { src: logoAsuransi, alt: 'Asuransi MAG', width: 160 },
    { src: logoAyoConnect, alt: 'Ayoconnect', width: 150 },
    { src: logoPacific, alt: 'Pacific Cross', width: 160 },
  ];

  return (
    <SectionBox>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={3}
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          useFlexGap
        >
          {partnerLogos.map((partner) => (
            <PartnerCard key={partner.alt}>
              <Box
                component="img"
                src={partner.src}
                alt={partner.alt}
                sx={{
                  maxWidth: partner.width,
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            </PartnerCard>
          ))}
        </Stack>
      </Container>
    </SectionBox>
  );
};

export default Partners;

