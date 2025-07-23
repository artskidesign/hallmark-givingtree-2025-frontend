'use client'
import { ReactNode } from 'react'
import { useUserState } from '@/lib/user-context'
import { Box, Typography, Button } from '@mui/material'

interface SecuredRouteProps {
  children: ReactNode
}

export function SecuredRoute({ children }: SecuredRouteProps) {
  const userState = useUserState()
  const isLoggedIn = userState.isLoggedIn

  if (!isLoggedIn) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="400px"
        textAlign="center"
        p={4}
      >
        <Typography variant="h4" gutterBottom>
          Access Restricted
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Please log in to access this page.
        </Typography>
        <Button 
          variant="contained" 
          sx={{ mt: 2 }}
          onClick={() => {
            // This will be updated with proper authentication logic
            console.log('Redirect to login')
          }}
        >
          Sign In
        </Button>
      </Box>
    )
  }

  return <>{children}</>
}