'use client'
import React from 'react'
import { Box, Button, useMediaQuery, useTheme } from '@mui/material'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useUserState, useUserActions } from '@/lib/user-context'
import { InformationIcon, Community, Personal, CommunityTree, PersonalTree } from '@/images/icons'

const TreeNavigation: React.FC = () => {
  const pathname = usePathname()
  const router = useRouter()
  const theme = useTheme()
  const isMediumAndBelow = useMediaQuery(theme.breakpoints.down('lg'))
  const isLargeAndAbove = useMediaQuery(theme.breakpoints.up('lg'))
  
  // User context
  const userState = useUserState()
  const { logout } = useUserActions()
  
  const userName = userState.user?.name || null
  const userHasReadInstructions = userState.hasSeenModal

  const onLogoutClick = () => {
    logout()
    router.push('/your-tree')
  }

  const trackClick = (label: string) => {
    // Analytics tracking will be added when we migrate tracking
    console.log(`Navigation clicked: ${label}`)
  }

  const isLandingState = pathname === '/' && !userHasReadInstructions

  // Mobile/Medium navigation (currently commented out in original)
  const MobileNavigation = () => {
    if (isLandingState) return null

    return (
      <Box
        sx={{
          display: { xs: 'flex', lg: 'none' },
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          py: 2,
          px: 3,
          backgroundColor: 'rgba(139,0,0,0.1)',
          borderBottom: '1px solid rgba(139,0,0,0.2)'
        }}
      >
        {/* How it works button */}
        <Link href="/how-it-works" passHref>
          <Button
            onClick={() => trackClick('HowItWorks')}
            sx={{
              minWidth: 'auto',
              p: 1,
              borderRadius: '50%',
              backgroundColor: 'rgba(139,0,0,0.1)',
              color: '#8B0000',
              '&:hover': {
                backgroundColor: 'rgba(139,0,0,0.2)',
              }
            }}
            aria-label="How it works"
          >
            <InformationIcon />
          </Button>
        </Link>

        {/* Tree navigation */}
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Box
              onClick={() => trackClick('CommunityTree')}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 0.5,
                cursor: 'pointer',
                p: 1,
                borderRadius: 2,
                backgroundColor: pathname === '/' ? 'rgba(139,0,0,0.1)' : 'transparent',
                color: pathname === '/' ? '#8B0000' : '#666',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'rgba(139,0,0,0.1)',
                  color: '#8B0000',
                }
              }}
            >
              <CommunityTree />
              <Box component="p" sx={{ margin: 0, fontSize: '0.8rem', fontWeight: 500 }}>
                Community Tree
              </Box>
            </Box>
          </Link>

          <Link href="/your-tree" style={{ textDecoration: 'none' }}>
            <Box
              onClick={() => trackClick('YourTree')}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 0.5,
                cursor: 'pointer',
                p: 1,
                borderRadius: 2,
                backgroundColor: pathname === '/your-tree' ? 'rgba(139,0,0,0.1)' : 'transparent',
                color: pathname === '/your-tree' ? '#8B0000' : '#666',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'rgba(139,0,0,0.1)',
                  color: '#8B0000',
                }
              }}
            >
              <PersonalTree />
              <Box component="p" sx={{ margin: 0, fontSize: '0.8rem', fontWeight: 500 }}>
                Your Tree
              </Box>
            </Box>
          </Link>
        </Box>
      </Box>
    )
  }

  // Desktop navigation
  const DesktopNavigation = () => (
    <Box
      sx={{
        display: { xs: 'none', lg: 'flex' },
        alignItems: 'center',
        justifyContent: 'space-between',
        py: 2,
        px: 4,
        backgroundColor: pathname === '/' ? 'rgba(255,255,255,0.1)' : 'rgba(139,0,0,0.05)',
        borderBottom: '1px solid rgba(139,0,0,0.1)',
        backdropFilter: 'blur(10px)'
      }}
    >
      {/* Left spacer */}
      <Box sx={{ flex: 1 }} />

      {/* Tree navigation buttons - currently commented out in original */}
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        {false && ( // Keeping the structure but disabled as in original
          <>
            <Link href="/" passHref>
              <Button
                onClick={() => trackClick('CommunityTree')}
                variant={pathname === '/' ? 'contained' : 'outlined'}
                sx={{
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  ...(pathname === '/' ? {
                    backgroundColor: '#8B0000',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#A00000',
                    }
                  } : {
                    borderColor: '#8B0000',
                    color: '#8B0000',
                    '&:hover': {
                      backgroundColor: 'rgba(139,0,0,0.1)',
                    }
                  })
                }}
                startIcon={<Community />}
              >
                Community Tree
              </Button>
            </Link>

            <Link href="/your-tree" passHref>
              <Button
                onClick={() => trackClick('YourTree')}
                variant={pathname === '/your-tree' ? 'contained' : 'outlined'}
                sx={{
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  ...(pathname === '/your-tree' ? {
                    backgroundColor: '#8B0000',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#A00000',
                    }
                  } : {
                    borderColor: '#8B0000',
                    color: '#8B0000',
                    '&:hover': {
                      backgroundColor: 'rgba(139,0,0,0.1)',
                    }
                  })
                }}
                startIcon={<Personal />}
              >
                Your Tree
              </Button>
            </Link>
          </>
        )}
      </Box>

      {/* Logout section - currently commented out in original */}
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
        {false && pathname !== '/your-tree' && userName && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box component="p" sx={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
              {userName}
            </Box>
            <Box
              component="a"
              onClick={onLogoutClick}
              sx={{
                color: '#8B0000',
                cursor: 'pointer',
                textDecoration: 'underline',
                fontSize: '0.85rem',
                transition: 'color 0.2s ease',
                '&:hover': {
                  color: '#A00000'
                }
              }}
            >
              Not You?
            </Box>
          </Box>
        )}
      </Box>

      {/* Ad space placeholder */}
      <Box sx={{ width: 200, height: 60, ml: 2 }}>
        {/* FixedAd component will be migrated here */}
      </Box>
    </Box>
  )

  return (
    <Box component="nav">
      <MobileNavigation />
      <DesktopNavigation />
    </Box>
  )
}

export default TreeNavigation