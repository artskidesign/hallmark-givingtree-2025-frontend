'use client'
import React from 'react'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'
// Removed Redux dependency - using simple state management
import JerseyMikesLogo from '@/images/Jersey_Mikes.png'

const SponsorLogo: React.FC = () => {
  // Simplified webView state - can be passed as prop if needed
  const isWebView = false
  
  const handleSponsorClick = () => {
    // Analytics tracking will be added when we migrate tracking
    console.log('Sponsor logo clicked')
    
    const url = 'https://www.jerseymikes.com/#utm_source=IndieGlobal&utm_medium=Hallmark%20-%20CC&utm_campaign=GivingTree'
    
    if (isWebView) {
      window.location.href = url
    } else {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0.5,
        textAlign: 'center'
      }}
    >
      <Typography
        variant="caption"
        sx={{
          color: 'rgba(255,255,255,0.9)',
          fontSize: { xs: '0.7rem', sm: '0.75rem' },
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          textShadow: '0 1px 2px rgba(0,0,0,0.3)'
        }}
      >
        Presented by
      </Typography>
      
      <Box
        component="a"
        onClick={handleSponsorClick}
        sx={{
          display: 'block',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          borderRadius: 1,
          overflow: 'hidden',
          backgroundColor: 'rgba(255,255,255,0.9)',
          padding: '4px 8px',
          '&:hover': {
            backgroundColor: 'white',
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
          }
        }}
        aria-label="Visit Jersey Mike's website"
      >
        <Image
          src={JerseyMikesLogo}
          alt="Jersey Mike's"
          width={100}
          height={30}
          style={{
            objectFit: 'contain',
            display: 'block'
          }}
          priority
        />
      </Box>
    </Box>
  )
}

export default SponsorLogo