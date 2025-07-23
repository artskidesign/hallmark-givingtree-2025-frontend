'use client'
import React from 'react'
import { Box, Container, Grid, Typography, Link as MuiLink, List, ListItem } from '@mui/material'
import Image from 'next/image'
import IconFacebook from '@/images/social/footer_social_facebook'
import IconInstagram from '@/images/social/footer_social_instagram'
import IconPinterest from '@/images/social/footer_social_pinterest'
import IconTwitter from '@/images/social/footer_social_twitter'
import IconYoutube from '@/images/social/footer_social_youtube'
import HallmarkChannelLogo from '@/images/HallmarkChannelLogo.svg'

interface HallmarkFooterProps {
  shouldDisplay?: boolean
  isWebView?: boolean
}

interface SocialIconProps {
  link: string
  name: string
  isWebView: boolean
}

const socialIcons = {
  facebook: IconFacebook,
  twitter: IconTwitter,
  instagram: IconInstagram,
  pinterest: IconPinterest,
  youtube: IconYoutube,
}

function SocialIcon({ link, name, isWebView }: SocialIconProps) {
  const IconComponent = socialIcons[name as keyof typeof socialIcons]

  return (
    <MuiLink
      href={link}
      target={isWebView ? '_self' : '_blank'}
      rel="noopener noreferrer"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: '50%',
        backgroundColor: 'rgba(255,255,255,0.1)',
        color: 'white',
        transition: 'all 0.2s ease',
        '&:hover': {
          backgroundColor: 'rgba(255,255,255,0.2)',
          transform: 'translateY(-2px)',
        },
        '& svg': {
          width: 20,
          height: 20,
        }
      }}
      aria-label={`Follow us on ${name}`}
    >
      <IconComponent />
    </MuiLink>
  )
}

const footerLinks = [
  { label: 'Hallmark Movies & Mysteries', url: 'https://www.hallmarkmoviesandmysteries.com/' },
  { label: 'Hallmark Drama', url: 'https://www.hallmarkdrama.com/' },
  { label: 'Hallmark Movies Now', url: 'https://www.hmnow.com' },
  { label: 'About Us', url: 'https://www.hallmarkchannel.com/about-us' },
  { label: 'Contact Us', url: 'https://www.hallmarkchannel.com/contact-us' },
  { label: 'FAQ', url: 'https://www.hallmarkchannel.com/faq' },
  { label: 'Careers', url: 'http://corporate.crownmedia.com/#/careers' },
  { label: 'Advertising', url: 'https://www.hallmarkchannel.com/advertising' },
  { label: 'International', url: 'https://www.crownmediainternational.com/' },
  { label: 'Corporate', url: 'http://corporate.crownmedia.com/' },
  { label: 'Press', url: 'http://www.hallmarkchannelpress.com/?SiteID=142&NodeID=144' },
  { label: 'Channel Locator', url: 'https://www.hallmarkchannel.com/channel-locator' },
  { label: 'Newsletter', url: 'https://www.hallmarkchannel.com/newsletter' },
  { label: 'Privacy Policy', url: 'https://www.hallmarkchannel.com/privacy-policy' },
  { label: 'Terms of Use', url: 'https://www.hallmarkchannel.com/crown-media-family-networks-terms-of-use' },
  { label: 'CA Privacy Notice', url: 'https://www.hallmarkchannel.com/ca-privacy-policy' },
  { label: 'CA Do Not Sell My Info', url: 'https://www.hallmarkchannel.com/do-not-sell-my-info' },
  { label: 'Hallmark Cards', url: 'http://www.hallmark.com/' },
  { label: 'Accessibility', url: 'https://www.hallmarkchannel.com/accessibility-notice' },
]

const socialLinks = [
  { name: 'facebook', url: 'https://www.facebook.com/hallmarkchannel' },
  { name: 'twitter', url: 'https://twitter.com/hallmarkchannel' },
  { name: 'instagram', url: 'https://www.instagram.com/hallmarkchannel/' },
  { name: 'youtube', url: 'https://www.youtube.com/hallmarkchannelusa' },
  { name: 'pinterest', url: 'https://www.pinterest.com/hallmarkchannel' },
]

export default function HallmarkFooter({ shouldDisplay = true, isWebView = false }: HallmarkFooterProps) {
  if (!shouldDisplay) return null

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#2C3E50',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="xl">
        {/* Top section with logo and social */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 3 }}>
              <MuiLink
                href="https://www.hallmarkchannel.com/"
                target={isWebView ? '_self' : '_blank'}
                rel="noopener noreferrer"
                aria-label="Hallmark Channel Home"
              >
                <Image
                  src={HallmarkChannelLogo}
                  alt="Hallmark Channel Logo"
                  width={200}
                  height={60}
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </MuiLink>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: { xs: 'center', md: 'right' } }}>
              <Typography variant="h6" sx={{ mb: 2, fontSize: '1.1rem', fontWeight: 600 }}>
                Follow Us
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'center', md: 'flex-end' } }}>
                {socialLinks.map((social) => (
                  <SocialIcon
                    key={social.name}
                    link={social.url}
                    name={social.name}
                    isWebView={isWebView}
                  />
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Footer links */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2}>
            {footerLinks.map((link) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={link.label}>
                <MuiLink
                  href={link.url}
                  target={
                    link.url.includes('crownmedia') || 
                    link.url.includes('hmnow') || 
                    link.url.includes('hallmark.com') 
                      ? (isWebView ? '_self' : '_blank') 
                      : '_self'
                  }
                  rel="noopener noreferrer"
                  sx={{
                    color: 'rgba(255,255,255,0.8)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    display: 'block',
                    py: 0.5,
                    transition: 'color 0.2s ease',
                    '&:hover': {
                      color: 'white',
                      textDecoration: 'underline',
                    }
                  }}
                >
                  {link.label}
                </MuiLink>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Copyright */}
        <Box sx={{ textAlign: 'center', pt: 3, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>
            Copyright © {new Date().getFullYear()} Crown Media Family Networks, all rights reserved
          </Typography>
        </Box>

        {/* Mobile social links (duplicate for mobile) */}
        <Box 
          sx={{ 
            display: { xs: 'block', md: 'none' },
            textAlign: 'center',
            pt: 3,
            borderTop: '1px solid rgba(255,255,255,0.1)',
            mt: 3
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontSize: '1rem', fontWeight: 600 }}>
            Follow Us
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            {socialLinks.map((social) => (
              <SocialIcon
                key={`mobile-${social.name}`}
                link={social.url}
                name={social.name}
                isWebView={isWebView}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}