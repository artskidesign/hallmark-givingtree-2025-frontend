'use client'
import React, { useEffect, useState, useRef } from 'react'
import { Box, Container, Typography, Button, useMediaQuery, useTheme } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useUserState } from '@/lib/user-context'
import { Deed, FeedDto } from '@/types'
import { CaretRight, InformationIcon } from '@/images/icons'
import { Buildings, PeopleLeft, PeopleRight, ClockHand } from '@/images/scenes'
import Tree from '@/images/trees/community-tree.png'
import TreeLeaves from '@/images/trees/community-tree-top-leaves.png'
import { Loader } from '@/components/Loader'

// Constants
const communityTreeHeight = 1024
const communityTreeWidth = 812
const communitySceneHeight = 752
const communitySceneWidth = 1920
const communityTreeFeedIntervalSeconds = 5

// Helper function
const numberWithCommas = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

interface Props {
  initialDeeds: Deed[]
  communityCount: number
  feed: FeedDto[]
}

export default function CommunityTreeClientComponent({ 
  initialDeeds, 
  communityCount, 
  feed 
}: Props) {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))
  
  // State
  const [feedItem, setFeedItem] = useState(feed[0] || { deedId: '', name: '', sortOrder: 0 })
  const [clickedName, setClickedName] = useState('')
  const [clickedBulbId, setClickedBulbId] = useState('')
  const [clickedBulb, setClickedBulb] = useState(false)
  const [allLoaded, setAllLoaded] = useState(false)
  const [revealTree, setRevealTree] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [currentFeedIndex, setCurrentFeedIndex] = useState(0)

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // User context
  const userState = useUserState()

  // Simulate image loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setImagesLoaded(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (imagesLoaded) {
      if (!allLoaded) {
        setTimeout(() => setRevealTree(true), 300)
      }
      setAllLoaded(true)
    }
  }, [imagesLoaded, allLoaded])

  // Feed rotation
  useEffect(() => {
    if (feed.length > 0) {
      const interval = setInterval(() => {
        setCurrentFeedIndex((prev) => (prev + 1) % feed.length)
      }, communityTreeFeedIntervalSeconds * 1000)

      return () => clearInterval(interval)
    }
  }, [feed.length])

  // Update current feed item
  useEffect(() => {
    if (feed[currentFeedIndex]) {
      setFeedItem(feed[currentFeedIndex])
    }
  }, [currentFeedIndex, feed])

  useEffect(() => {
    // Analytics tracking will be added when we migrate tracking
    console.log('Page view: Community Tree Page')
  }, [])

  const handleBulbClick = (bulbId: string) => {
    const unclickingBulb = bulbId === clickedBulbId
    console.log(`Bulb ${unclickingBulb ? 'unclicked' : 'clicked'}: ${bulbId}`)
    
    if (!unclickingBulb) {
      setClickedName('Grace') // Placeholder name
    }
    setClickedBulb(!unclickingBulb)
    setClickedBulbId(unclickingBulb ? '' : bulbId)
    
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current)
    }
  }

  const trackClick = (label: string) => {
    console.log(`Navigation clicked: ${label}`)
  }

  if (!allLoaded) {
    return <Loader />
  }

  const currentDeed = initialDeeds.find(deed => deed.id === feedItem.deedId)

  return (
    <Box className="min-h-screen bg-gradient-christmas">
      <Container maxWidth={false} sx={{ px: 0 }}>
        {/* Tree Scene Container */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: communitySceneHeight,
            maxWidth: communitySceneWidth,
            margin: '0 auto',
            overflow: 'hidden',
            background: 'linear-gradient(180deg, #1e3a8a 0%, #3730a3 50%, #1e1b4b 100%)',
          }}
        >
          {/* Background Elements */}
          <Buildings
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: 'auto',
              zIndex: 1,
            }}
          />

          <PeopleLeft
            style={{
              position: 'absolute',
              bottom: '10%',
              left: '5%',
              width: '200px',
              height: '150px',
              zIndex: 2,
            }}
          />

          <PeopleRight
            style={{
              position: 'absolute',
              bottom: '10%',
              right: '5%',
              width: '200px',
              height: '150px',
              zIndex: 2,
            }}
          />

          <ClockHand
            style={{
              position: 'absolute',
              top: '10%',
              right: '10%',
              width: '100px',
              height: '100px',
              zIndex: 2,
            }}
          />

          {/* Tree Container */}
          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              bottom: '15%',
              transform: 'translateX(-50%)',
              width: communityTreeWidth,
              height: communityTreeHeight,
              transition: 'opacity 0.8s ease-in-out',
              opacity: revealTree ? 1 : 0,
              zIndex: 3,
            }}
          >
            {/* Main Tree Image */}
            <Image
              src={Tree}
              alt="Community Christmas Tree"
              width={communityTreeWidth}
              height={communityTreeHeight}
              priority
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: 'auto'
              }}
            />

            {/* Tree Leaves */}
            <Image
              src={TreeLeaves}
              alt="Tree Leaves"
              width={communityTreeWidth}
              height={communityTreeHeight * 0.7}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: 'auto'
              }}
            />

            {/* Placeholder bulbs - in real app these would be positioned based on completed community deeds */}
            {Array.from({ length: 12 }).map((_, i) => {
              const bulbId = `community-bulb-${i}`
              const position = {
                left: `${(i % 4) * 25 + 15}%`,
                top: `${Math.floor(i / 4) * 15 + 30}%`
              }
              
              return (
                <Box
                  key={bulbId}
                  onClick={() => handleBulbClick(bulbId)}
                  sx={{
                    position: 'absolute',
                    ...position,
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    backgroundColor: clickedBulbId === bulbId ? '#FFD700' : ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'][i % 5],
                    cursor: 'pointer',
                    border: '2px solid white',
                    boxShadow: '0 0 10px rgba(255,255,255,0.8)',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'scale(1.3)',
                      boxShadow: '0 0 15px rgba(255,215,0,0.9)'
                    }
                  }}
                />
              )
            })}
          </Box>
        </Box>

        {/* Content Section */}
        <Box className="p-8 text-center bg-white">
          {/* Community Count Display */}
          <Typography variant="h4" component="h1" className="mb-4 text-green font-bold">
            Community Giving Tree
          </Typography>
          
          <Typography variant="h5" className="mb-6 text-gray-600">
            {numberWithCommas(communityCount)} good deeds completed by our community!
          </Typography>

          {/* Current Feed Item */}
          {currentDeed && (
            <Box className="mb-8 p-6 bg-blue-50 rounded-lg max-w-2xl mx-auto border border-blue-100">
              <Typography variant="h6" className="text-green-700 mb-2 font-semibold">
                Latest Good Deed:
              </Typography>
              <Typography variant="body1" className="mb-2">
                <strong className="text-red-600">{feedItem.name}</strong> {currentDeed.titlePastTense.toLowerCase()}
              </Typography>
              <Typography variant="body2" className="text-gray-600 italic">
                "{currentDeed.description}"
              </Typography>
            </Box>
          )}

          {/* Action Buttons */}
          <Box className="flex gap-4 justify-center mb-8 flex-wrap">
            <Link href="/your-tree" passHref>
              <Button
                variant="contained"
                onClick={() => trackClick('Your Tree')}
                className="bg-green-700 hover:bg-green-800 px-8 py-3 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Box component="span" className="mr-2">Your Tree</Box>
                <CaretRight />
              </Button>
            </Link>
            
            <Link href="/deeds" passHref>
              <Button
                variant="outlined"
                onClick={() => trackClick('View All Deeds')}
                className="border-2 border-green-700 text-green-700 hover:bg-green-50 px-8 py-3 font-semibold rounded-lg transition-all duration-200"
              >
                <InformationIcon />
                <Box component="span" className="ml-2">View All Deeds</Box>
              </Button>
            </Link>
          </Box>

          {/* User Status */}
          {userState.user ? (
            <Typography variant="body2" sx={{ color: '#666' }}>
              Welcome back, {userState.user.name}! Visit your tree to see your progress.
            </Typography>
          ) : (
            <Typography variant="body2" sx={{ color: '#666' }}>
              Sign in to track your own good deeds and grow your personal tree.
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  )
}