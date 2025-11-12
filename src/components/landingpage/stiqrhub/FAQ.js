import React from 'react';
import { Box, Container, Typography, Grid, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import faqIllustration from 'src/assets/images/logos/FAQ.png';

const FAQ = () => {
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
    marginBottom: theme.spacing(6),
  }));

  const FAQIllustration = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(2, 0),
    },
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(4),
    },
  }));

  const IllustrationImage = styled('img')(({ theme }) => ({
    width: '100%',
    height: 'auto',
    maxWidth: '640px',
    objectFit: 'contain',
    display: 'block',
    transform: 'translateX(0)',
    [theme.breakpoints.up('lg')]: {
      maxWidth: '720px',
      transform: 'translateX(-6px)',
    },
    [theme.breakpoints.down('md')]: {
      maxWidth: '520px',
      transform: 'translateX(0)',
    },
  }));

  const StyledAccordion = styled(Accordion)(({ theme }) => ({
    boxShadow: 'none',
    border: '1px solid #E5E7EB',
    borderRadius: '8px !important',
    marginBottom: theme.spacing(2),
    '&:before': {
      display: 'none',
    },
    '&.Mui-expanded': {
      margin: theme.spacing(0, 0, 2, 0),
    },
  }));

  const faqs = [
    {
      question: 'Apakah StiqrHub berbayar?',
      answer: 'Gratis untuk EO & Tenant.',
    },
    {
      question: 'Siapa yang bisa daftar EO?',
      answer: 'Komunitas, kampus, instansi, individu.',
    },
    {
      question: 'Pembayaran booth bagaimana?',
      answer: 'Via QRIS otomatis tercatat.',
    },
    {
      question: 'Transaksi cair kapan?',
      answer: 'Same-day settlement.',
    },
    {
      question: 'Aman?',
      answer: 'Ya, dengan enkripsi dan proteksi asuransi.',
    },
  ];

  return (
    <SectionBox>
      <Container maxWidth="lg">
        <SectionTitle>
          FAQ (Frequently Asked Questions)
        </SectionTitle>

        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <FAQIllustration>
              <IllustrationImage src={faqIllustration} alt="StiqrHub FAQ Illustration" />
            </FAQIllustration>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              {faqs.map((faq, index) => (
                <StyledAccordion key={index}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: '#666666' }} />}
                    sx={{
                      '& .MuiAccordionSummary-content': {
                        margin: '16px 0',
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color: '#333333',
                        fontSize: '16px',
                      }}
                    >
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography
                      sx={{
                        color: '#666666',
                        fontSize: '14px',
                        lineHeight: 1.6,
                      }}
                    >
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </StyledAccordion>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </SectionBox>
  );
};

export default FAQ;

