'use client'
import React from 'react'
import { Box } from '@mui/material'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useUserState, useUserActions } from '@/lib/user-context'
import { HorizontalLogo, VerticalLogo } from '@/images/icons'
import SponsorLogo from './SponsorLogo'

const Header: React.FC = () => {
  const pathname = usePathname()
  const router = useRouter()
  
  // User context
  const userState = useUserState()
  const { logout } = useUserActions()
  
  const userName = userState.user?.name || null
  const userHasReadInstructions = userState.hasSeenModal

  const onLogoutClick = () => {
    logout()
    router.push('/your-tree')
  }

  const isLandingState = pathname === '/' && !userHasReadInstructions

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: { xs: '1rem', md: '2rem 3rem' },
        background: isLandingState 
          ? 'transparent' 
          : 'linear-gradient(135deg, rgba(139,0,0,0.95) 0%, rgba(160,0,0,0.95) 100%)',
        backdropFilter: isLandingState ? 'none' : 'blur(10px)',
        position: 'relative',
        zIndex: 10,
        borderBottom: isLandingState ? 'none' : '1px solid rgba(255,255,255,0.1)',
        transition: 'all 0.3s ease',
      }}
      className={isLandingState ? 'header-landing' : 'header'}
    >
      {/* Logo */}
      <Link 
        href="/" 
        style={{ 
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          transition: 'transform 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)'
        }}
      >
        {/* Vertical logo for mobile/smaller screens */}
        <Box 
          sx={{ 
            display: { xs: 'block', md: 'none' },
            '& svg': { 
              height: 50, 
              width: 'auto',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
            }
          }}
        >
          <VerticalLogo white />
        </Box>
        
        {/* Horizontal logo for larger screens */}
        <Box 
          sx={{ 
            display: { xs: 'none', md: 'block' },
            '& svg': { 
              height: 60, 
              width: 'auto',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
            }
          }}
        >
          <HorizontalLogo white />
        </Box>
      </Link>

      {/* Sponsor and logout section */}
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: { xs: 1, md: 2 },
          flexDirection: { xs: 'column', sm: 'row' }
        }}
      >
        <SponsorLogo />
        
        {/* Logout section - commented out in original but keeping structure */}
        {false && pathname !== '/your-tree' && userName && (
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              color: 'white',
              fontSize: '0.9rem'
            }}
          >
            <Box component="p" sx={{ margin: 0 }}>
              {userName}.
            </Box>
            <Box
              component="a"
              onClick={onLogoutClick}
              sx={{
                color: 'rgba(255,255,255,0.8)',
                cursor: 'pointer',
                textDecoration: 'underline',
                fontSize: '0.85rem',
                transition: 'color 0.2s ease',
                '&:hover': {
                  color: 'white'
                }
              }}
            >
              Not You?
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default Header