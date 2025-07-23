'use client'
import { useEffect } from 'react'
import { Box, Typography } from '@mui/material'

export function CloseWindow() {
  useEffect(() => {
    // Close the window if possible (browser security may prevent this)
    if (typeof window !== 'undefined' && window.close) {
      const timer = setTimeout(() => {
        window.close()
      }, 2000)
      
      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      textAlign="center"
      p={4}
    >
      <Typography variant="h4" gutterBottom>
        Thank you!
      </Typography>
      <Typography variant="body1" color="text.secondary">
        This window will close automatically...
      </Typography>
    </Box>
  )
}