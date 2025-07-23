'use client'
import { CircularProgress, Box } from '@mui/material'

interface LoaderProps {
  size?: number
  color?: 'primary' | 'secondary' | 'inherit'
}

export function Loader({ size = 40, color = 'primary' }: LoaderProps) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="200px"
      className="loading-spinner"
    >
      <CircularProgress size={size} color={color} />
    </Box>
  )
}