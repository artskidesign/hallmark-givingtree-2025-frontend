'use client'
import React, { useState } from 'react'
import { Box, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
// Removed Redux dependency - using simple state management
import HallmarkChannelLogo from '@/images/HallmarkChannelLogo'

interface HallmarkHeaderProps {
  isWebView?: boolean
}

interface NavItem {
  label: string
  url: string
}

const navItems: NavItem[] = [
  { label: 'Schedule', url: 'https://www.hallmarkchannel.com/schedule' },
  { label: 'Movies', url: 'https://www.hallmarkchannel.com/movies' },
  { label: 'Christmas', url: 'https://www.hallmarkchannel.com/christmas' }, // Default franchise
  { label: 'Home & Family', url: 'https://www.hallmarkchannel.com/home-and-family' },
  { label: 'Watch Live', url: 'http://www.hallmarkchanneleverywhere.com/hclive.html' },
]

export default function HallmarkHeader({ isWebView = false }: HallmarkHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // This will be updated when we migrate the webView state
  const isWebViewFromState = false // Simplified - can be passed as prop if needed
  const actualIsWebView = isWebView || isWebViewFromState

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleNavClick = (url: string) => {
    if (actualIsWebView) {
      window.location.href = url
    } else {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
    setMobileMenuOpen(false)
  }

  return (
    <>
      <AppBar 
        position="static" 
        sx={{ 
          backgroundColor: '#8B0000', // Hallmark red
          boxShadow: 'none',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
          {/* Mobile menu button */}
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={toggleMobileMenu}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Box 
            component="a"
            href="https://www.hallmarkchannel.com"
            target={actualIsWebView ? '_self' : '_blank'}
            rel="noopener noreferrer"
            aria-label="Hallmark Channel Home"
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              textDecoration: 'none',
              '& svg': {
                height: { xs: 32, md: 40 },
                width: 'auto'
              }
            }}
          >
            <HallmarkChannelLogo className="" red={false} />
          </Box>

          {/* Desktop navigation */}
          <Box 
            component="nav" 
            sx={{ 
              display: { xs: 'none', md: 'flex' },
              gap: 3,
              alignItems: 'center'
            }}
          >
            {navItems.map((item) => (
              <Box
                key={item.label}
                component="a"
                href={item.url}
                target={actualIsWebView ? '_self' : '_blank'}
                rel="noopener noreferrer"
                sx={{
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  padding: '8px 12px',
                  borderRadius: 1,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    transform: 'translateY(-1px)',
                  }
                }}
              >
                {item.label}
              </Box>
            ))}
            
            {/* Channel Locator */}
            <Box
              component="a"
              href="https://www.hallmarkchannel.com/channel-locator"
              target={actualIsWebView ? '_self' : '_blank'}
              rel="noopener noreferrer"
              sx={{
                color: 'white',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 600,
                padding: '6px 16px',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: 2,
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderColor: 'rgba(255,255,255,0.5)',
                }
              }}
            >
              Channel Locator
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            backgroundColor: '#8B0000',
            color: 'white',
          }
        }}
      >
        <Box sx={{ pt: 2, pb: 1 }}>
          <List>
            {navItems.map((item) => (
              <ListItem 
                key={item.label}
                onClick={() => handleNavClick(item.url)}
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                <ListItemText 
                  primary={item.label}
                  sx={{ color: 'white' }}
                />
              </ListItem>
            ))}
            <ListItem 
              onClick={() => handleNavClick('https://www.hallmarkchannel.com/channel-locator')}
              sx={{ 
                cursor: 'pointer',
                mt: 1,
                mx: 2,
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              <ListItemText 
                primary="Channel Locator"
                sx={{ 
                  color: 'white',
                  textAlign: 'center',
                  '& .MuiTypography-root': {
                    fontWeight: 600,
                    fontSize: '0.9rem'
                  }
                }}
              />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  )
}