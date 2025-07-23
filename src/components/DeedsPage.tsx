'use client'
import React, { useEffect } from 'react'
import { Box, Container, Typography, Button, Card, CardContent, Grid } from '@mui/material'
import Link from 'next/link'
// Removed Redux dependency - data now passed as props
import { ArrowLeft } from '@/images/icons'
import Title from './Layout/Title'
// import DeedRow from '../slices/deeds/components/DeedRow'

// Constants (will be moved to constants file)
const pageNameDeedsListPage = 'Deeds List Page'
const eventCategoryDeedsPage = 'Deeds Page'

interface Deed {
  id: string
  title: string
  description?: string
  category?: string
  completed?: boolean
}

interface DeedsPageProps {
  deeds?: Deed[]
  completedDeedIds?: string[]
  user?: { userId: string; name: string; feed: any[] }
}

export function DeedsPage({ 
  deeds = [], 
  completedDeedIds = [], 
  user = { userId: 'sample-id', name: 'Sample User', feed: [] } 
}: DeedsPageProps) {
  const apiCalled = true // Always true since we're using server components

  useEffect(() => {
    // Analytics tracking will be added when we migrate tracking
    console.log(`Page view: ${pageNameDeedsListPage}`)
  }, [])

  const trackEvent = (action: string, label: string) => {
    console.log(`Event: ${eventCategoryDeedsPage} - ${action} - ${label}`)
  }

  // Sample deed data for demonstration
  const sampleDeeds = [
    {
      id: '1',
      title: 'Call a family member',
      description: 'Reach out to a family member you haven\'t spoken to in a while',
      category: 'Family',
      completed: completedDeedIds.includes('1')
    },
    {
      id: '2',
      title: 'Help a neighbor',
      description: 'Offer to help a neighbor with groceries or household tasks',
      category: 'Community',
      completed: completedDeedIds.includes('2')
    },
    {
      id: '3',
      title: 'Donate to charity',
      description: 'Make a donation to your favorite charity or cause',
      category: 'Giving',
      completed: completedDeedIds.includes('3')
    },
    {
      id: '4',
      title: 'Volunteer your time',
      description: 'Spend time volunteering at a local organization',
      category: 'Service',
      completed: completedDeedIds.includes('4')
    },
    {
      id: '5',
      title: 'Write a thank you note',
      description: 'Write a heartfelt thank you note to someone who made a difference',
      category: 'Gratitude',
      completed: completedDeedIds.includes('5')
    },
    {
      id: '6',
      title: 'Share a meal',
      description: 'Cook or share a meal with someone in need',
      category: 'Kindness',
      completed: completedDeedIds.includes('6')
    }
  ]

  const deedsToShow = deeds.length > 0 ? deeds : sampleDeeds

  return (
    <Box className="page deeds-list-view" sx={{ minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header with back button and title */}
        <Box sx={{ mb: 4 }}>
          <Link href="/your-tree" style={{ textDecoration: 'none' }}>
            <Button
              onClick={() => trackEvent('Click', 'BackToTree')}
              sx={{
                color: 'white',
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                textTransform: 'none',
                mb: 2,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                }
              }}
              startIcon={<ArrowLeft />}
            >
              Back to tree
            </Button>
          </Link>
          
          <Title>
            {apiCalled && (
              <>
                You&apos;ve Performed{' '}
                <Box 
                  component="span" 
                  sx={{ 
                    color: '#FFD700',
                    textShadow: '0 0 10px rgba(255,215,0,0.5)'
                  }}
                >
                  {completedDeedIds.length}/{deedsToShow.length}
                </Box>{' '}
                Deeds
              </>
            )}
          </Title>
        </Box>

        {/* Deeds Grid */}
        <Box sx={{ mb: 4 }}>
          {apiCalled && (
            <Grid container spacing={3}>
              {deedsToShow.map((deed: Deed) => (
                <Grid item xs={12} sm={6} md={4} key={deed.id}>
                  <Card
                    sx={{
                      backgroundColor: deed.completed 
                        ? 'rgba(255, 215, 0, 0.1)' 
                        : 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: deed.completed 
                        ? '2px solid #FFD700' 
                        : '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: 3,
                      minHeight: 200,
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: deed.completed 
                          ? '0 8px 25px rgba(255, 215, 0, 0.3)' 
                          : '0 8px 25px rgba(255, 255, 255, 0.1)',
                      }
                    }}
                    onClick={() => trackEvent('Click', `Deed-${deed.id}`)}
                  >
                    <CardContent sx={{ flex: 1, p: 3, color: 'white' }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            fontSize: '1.1rem',
                            lineHeight: 1.3,
                            flex: 1,
                            mr: 1
                          }}
                        >
                          {deed.title}
                        </Typography>
                        
                        {deed.completed && (
                          <Box
                            sx={{
                              width: 24,
                              height: 24,
                              borderRadius: '50%',
                              backgroundColor: '#FFD700',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '14px',
                              flexShrink: 0
                            }}
                          >
                            ✓
                          </Box>
                        )}
                      </Box>

                      {deed.description && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontSize: '0.9rem',
                            lineHeight: 1.4,
                            mb: 2
                          }}
                        >
                          {deed.description}
                        </Typography>
                      )}

                      {deed.category && (
                        <Box
                          sx={{
                            display: 'inline-block',
                            backgroundColor: 'rgba(139, 0, 0, 0.3)',
                            color: '#FFD700',
                            px: 2,
                            py: 0.5,
                            borderRadius: 2,
                            fontSize: '0.8rem',
                            fontWeight: 500,
                            mt: 'auto'
                          }}
                        >
                          {deed.category}
                        </Box>
                      )}
                      
                      {!deed.completed && (
                        <Box sx={{ mt: 2 }}>
                          <Button
                            variant="contained"
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation()
                              trackEvent('Complete', deed.id)
                            }}
                            sx={{
                              backgroundColor: '#8B0000',
                              color: 'white',
                              fontSize: '0.8rem',
                              px: 2,
                              py: 1,
                              borderRadius: 2,
                              '&:hover': {
                                backgroundColor: '#A00000',
                              }
                            }}
                          >
                            Mark Complete
                          </Button>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        {/* Bottom back button */}
        <Box sx={{ textAlign: 'center' }}>
          <Link href="/your-tree" style={{ textDecoration: 'none' }}>
            <Button
              onClick={() => trackEvent('Click', 'BackToTreeBottom')}
              sx={{
                color: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                fontSize: '1rem',
                fontWeight: 500,
                textTransform: 'none',
                px: 3,
                py: 1.5,
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                }
              }}
              startIcon={<ArrowLeft />}
            >
              Back to tree
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  )
}