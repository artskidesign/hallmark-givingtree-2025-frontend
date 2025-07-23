'use client'
import React from 'react'
import { Typography, TypographyProps } from '@mui/material'

interface TitleProps extends TypographyProps {
  children: React.ReactNode
}

export default function Title({ children, sx, ...props }: TitleProps) {
  return (
    <Typography
      variant="h1"
      component="h1"
      sx={{
        fontSize: { xs: '2rem', md: '3rem' },
        fontWeight: 'bold',
        color: 'white',
        textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
        textAlign: 'center',
        mb: 3,
        ...sx
      }}
      {...props}
    >
      {children}
    </Typography>
  )
}