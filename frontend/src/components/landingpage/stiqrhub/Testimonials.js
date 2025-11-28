import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Avatar, Stack, Rating } from '@mui/material';
import { styled } from '@mui/material/styles';
<<<<<<< HEAD
=======
import nadiaImage from '../../../assets/images/logos/nadia.png';
import rizalImage from '../../../assets/images/logos/rizal.png';
import yantiImage from '../../../assets/images/logos/yanti.png';
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382

const Testimonials = () => {
  const SectionBox = styled(Box)(({ theme }) => ({
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
    backgroundColor: '#FFFFFF',
  }));

  const SectionTitle = styled(Typography)(({ theme }) => ({
    fontSize: '32px',
    fontWeight: 700,
    color: '#333333',
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  }));

  const Subtitle = styled(Typography)(({ theme }) => ({
    fontSize: '18px',
    color: '#666666',
    textAlign: 'center',
    marginBottom: theme.spacing(6),
    '& span': {
      color: '#00C68E',
      fontWeight: 600,
    },
  }));

  const TestimonialCard = styled(Card)(({ theme }) => ({
    height: '100%',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
    },
  }));

  const testimonials = [
    {
      name: 'Nadia',
      role: 'EO Bandung',
      date: '01 November 2025',
      quote: 'Approve tenant tinggal klik',
<<<<<<< HEAD
      avatar: 'N',
=======
      avatar: nadiaImage,
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
    },
    {
      name: 'Rizal',
      role: 'Tenant Kopi Lokal',
      date: '01 November 2025',
      quote: 'Event jadi ramai karena promosi StiqrHub',
<<<<<<< HEAD
      avatar: 'R',
=======
      avatar: rizalImage,
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
    },
    {
      name: 'Yanti',
      role: 'EO Food Fair',
      date: '01 November 2025',
      quote: 'Bazar pertama langsung aman, bahkan dilindungi asuransi',
<<<<<<< HEAD
      avatar: 'Y',
=======
      avatar: yantiImage,
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
    },
  ];

  return (
    <SectionBox>
      <Container maxWidth="lg">
        <SectionTitle>
          Dipercaya EO & UMKM di Berbagai Kota
        </SectionTitle>
        <Subtitle>
          Kata Mereka Tentang <span>StiqrHub</span>
        </Subtitle>

        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <TestimonialCard>
                <CardContent sx={{ p: 4 }}>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar
<<<<<<< HEAD
                        sx={{
                          width: 56,
                          height: 56,
                          bgcolor: '#00C68E',
                          fontSize: '24px',
                          fontWeight: 700,
                        }}
                      >
                        {testimonial.avatar}
                      </Avatar>
=======
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        sx={{
                          width: 56,
                          height: 56,
                        }}
                      />
>>>>>>> c3d81f3595b5eb4af55db2315958af174c540382
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: '#333333',
                          }}
                        >
                          {testimonial.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: '#666666',
                          }}
                        >
                          {testimonial.role}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: '#999999',
                          }}
                        >
                          {testimonial.date}
                        </Typography>
                      </Box>
                    </Stack>
                    <Rating
                      value={5}
                      readOnly
                      sx={{
                        '& .MuiRating-iconFilled': {
                          color: '#00C68E',
                        },
                      }}
                    />
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#666666',
                        lineHeight: 1.6,
                        fontStyle: 'italic',
                      }}
                    >
                      "{testimonial.quote}"
                    </Typography>
                  </Stack>
                </CardContent>
              </TestimonialCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </SectionBox>
  );
};

export default Testimonials;

