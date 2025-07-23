'use client'
import { createTheme } from '@mui/material/styles'

// Hallmark brand colors
const hallmarkColors = {
  primary: '#8B0000', // Hallmark red
  secondary: '#DAA520', // Gold
  background: '#FFFFFF',
  surface: '#F5F5F5',
}

export const theme = createTheme({
  palette: {
    primary: {
      main: hallmarkColors.primary,
      light: '#B71C1C',
      dark: '#5D0000',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: hallmarkColors.secondary,
      light: '#FFD700',
      dark: '#B8860B',
      contrastText: '#000000',
    },
    background: {
      default: hallmarkColors.background,
      paper: hallmarkColors.surface,
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          padding: '12px 24px',
          fontSize: '1rem',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          },
          // Migration of old classes
          '&.PrimaryBtn': {
            backgroundColor: hallmarkColors.primary,
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#A00000',
            },
          },
          '&.SmBtn': {
            padding: '8px 16px',
            fontSize: '0.875rem',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        },
      },
    },
  },
})