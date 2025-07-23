'use client'
import React, { useEffect } from 'react'
import { Box, Container, Typography, Card, CardContent, Grid } from '@mui/material'
import Title from './Layout/Title'

// Constants (will be moved to constants file)
const pageNameHowItWorksPage = 'How It Works Page'

export function HowItWorksPage() {
  useEffect(() => {
    // Analytics tracking will be added when we migrate tracking
    console.log(`Page view: ${pageNameHowItWorksPage}`)
  }, [])

  const faqs = [
    {
      question: 'How does The Giving Tree Work?',
      answer: 'Please register to be a part of the experience and then select which Good Deeds you would like to perform. When you commit to doing a good deed, you receive a light for your personal tree. As your personal tree begins to light up, you help power the community tree!'
    },
    {
      question: 'How long can you participate in The Giving Tree?',
      answer: 'The Giving Tree will be lit until the end of the holiday season.'
    },
    {
      question: 'Will there be new deeds?',
      answer: 'Yes! Check back regularly for new deeds to be added to your list of good deeds to perform.'
    }
  ]

  return (
    <Box className="page how-it-works" sx={{ minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        <Title>How it works</Title>
        
        <Grid container spacing={4}>
          {faqs.map((faq, index) => (
            <Grid item xs={12} key={index}>
              <Card
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(255, 255, 255, 0.1)',
                  }
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      color: '#FFD700',
                      mb: 2,
                      fontSize: { xs: '1.2rem', md: '1.4rem' },
                      textShadow: '0 0 10px rgba(255,215,0,0.3)'
                    }}
                  >
                    {faq.question}
                  </Typography>
                  
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.9)',
                      fontSize: { xs: '1rem', md: '1.1rem' },
                      lineHeight: 1.6,
                      letterSpacing: '0.02em'
                    }}
                  >
                    {faq.answer}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Additional Information Section */}
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Card
            sx={{
              backgroundColor: 'rgba(139, 0, 0, 0.2)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 215, 0, 0.3)',
              borderRadius: 3,
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                  color: '#FFD700',
                  mb: 3,
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  textShadow: '0 0 15px rgba(255,215,0,0.5)'
                }}
              >
                Spread Joy This Holiday Season
              </Typography>
              
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: { xs: '1rem', md: '1.2rem' },
                  lineHeight: 1.7,
                  maxWidth: '600px',
                  mx: 'auto'
                }}
              >
                Every good deed you perform lights up your personal tree and contributes to the 
                beautiful community tree that brings everyone together. Join thousands of others 
                in making this holiday season brighter for everyone.
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Visual Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
            background: 'radial-gradient(circle at 20% 20%, rgba(255, 215, 0, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(139, 0, 0, 0.1) 0%, transparent 50%)',
            pointerEvents: 'none'
          }}
        />
      </Container>
    </Box>
  )
}