'use client'
import React, { useEffect, useState, useTransition } from 'react'
import { Box, Container, Typography, Button } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useUserState } from '@/lib/user-context'
import { addCompletedDeed, removeCompletedDeed } from '@/lib/actions'
import { Deed, CompletedDeed } from '@/types'
import { CaretRight, InformationIcon } from '@/images/icons'
import { Carpet, Chimney, Snowflakes, Window, Heart } from '@/images/scenes'
import Tree from '@/images/trees/user-tree.png'
import Presents from '@/images/trees/user-tree-presents.png'
import TreeLeaves from '@/images/trees/user-tree-top-leaves.png'
import BulbImage from '@/images/trees/user-tree-bulb.png'
import TreeStar from '@/images/trees/user-tree-star.png'
import { Loader } from '@/components/Loader'

// Constants
const personalTreeHeight = 1024
const personalTreeWidth = 739
const personalSceneHeight = 752
const personalSceneWidth = 1920
const totalAmountOfDeeds = 24

interface Props {
  initialDeeds: Deed[]
  allDeedsCompletedCopy: string
}

export default function YourTreeClientComponent({ initialDeeds, allDeedsCompletedCopy }: Props) {
  // State
  const [clickedBulbId, setClickedBulbId] = useState('')
  const [revealTree, setRevealTree] = useState(false)
  const [starClassName, setStarClassName] = useState('')
  const [allLoaded, setAllLoaded] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [completedDeeds, setCompletedDeeds] = useState<CompletedDeed[]>([])
  const [isPending, startTransition] = useTransition()

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

  // Load completed deeds from localStorage for demo
  useEffect(() => {
    if (userState.user) {
      try {
        const stored = localStorage.getItem(`completed-deeds-${userState.user.id}`)
        if (stored) {
          setCompletedDeeds(JSON.parse(stored))
        } else {
          // Set sample completed deeds for demo
          const sampleCompleted: CompletedDeed[] = [
            { deedId: '1', sortOrder: 0, completedAt: new Date().toISOString(), userName: 'You' },
            { deedId: '3', sortOrder: 1, completedAt: new Date().toISOString(), userName: 'You' },
          ]
          setCompletedDeeds(sampleCompleted)
          localStorage.setItem(`completed-deeds-${userState.user.id}`, JSON.stringify(sampleCompleted))
        }
      } catch {
        // localStorage not available
      }
    }
  }, [userState.user])

  // Check for star animation
  useEffect(() => {
    if (completedDeeds.length === initialDeeds.length && completedDeeds.length > 0) {
      try {
        const shouldAnimate = localStorage.getItem('hallmark-star-animation')
        if (shouldAnimate === 'true') {
          setStarClassName('animate-star-glow')
          localStorage.removeItem('hallmark-star-animation')
          
          setTimeout(() => {
            setStarClassName('')
          }, 3000)
        }
      } catch {
        // localStorage not available
      }
    }
  }, [completedDeeds.length, initialDeeds.length])

  const onBulbClick = (bulbId: string) => {
    const unclickingBulb = bulbId === clickedBulbId
    console.log(`Bulb ${unclickingBulb ? 'unclicked' : 'clicked'}: ${bulbId}`)
    setClickedBulbId(unclickingBulb ? '' : bulbId)
  }

  const handleCompleteDeed = (deedId: string) => {
    if (!userState.user) return

    startTransition(async () => {
      const formData = new FormData()
      formData.append('deedId', deedId)
      formData.append('userId', userState.user!.id)
      formData.append('userName', userState.user!.name)

      try {
        const result = await addCompletedDeed(formData)
        if (result.success && result.data) {
          const newCompletedDeeds = [...completedDeeds, result.data]
          setCompletedDeeds(newCompletedDeeds)
          
          // Update localStorage
          try {
            localStorage.setItem(`completed-deeds-${userState.user!.id}`, JSON.stringify(newCompletedDeeds))
            
            // Check if all deeds completed for star animation
            if (newCompletedDeeds.length === initialDeeds.length) {
              localStorage.setItem('hallmark-star-animation', 'true')
            }
          } catch {
            // localStorage not available
          }
        }
      } catch (error) {
        console.error('Failed to complete deed:', error)
      }
    })
  }

  const handleRemoveDeed = (deedId: string) => {
    if (!userState.user) return

    startTransition(async () => {
      const formData = new FormData()
      formData.append('deedId', deedId)
      formData.append('userId', userState.user!.id)

      try {
        const result = await removeCompletedDeed(formData)
        if (result.success) {
          const newCompletedDeeds = completedDeeds.filter(cd => cd.deedId !== deedId)
          setCompletedDeeds(newCompletedDeeds)
          
          // Update localStorage
          try {
            localStorage.setItem(`completed-deeds-${userState.user!.id}`, JSON.stringify(newCompletedDeeds))
          } catch {
            // localStorage not available
          }
        }
      } catch (error) {
        console.error('Failed to remove deed:', error)
      }
    })
  }

  const trackClick = (label: string) => {
    console.log(`Navigation clicked: ${label}`)
  }

  if (!allLoaded) {
    return <Loader />
  }

  const completedDeedIds = completedDeeds.map(cd => cd.deedId)
  const isAllDeedsCompleted = completedDeeds.length === initialDeeds.length && initialDeeds.length > 0

  return (
    <Box className="min-h-screen bg-gradient-christmas">
      <Container maxWidth={false} sx={{ px: 0 }}>
        {/* Tree Scene Container */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: personalSceneHeight,
            maxWidth: personalSceneWidth,
            margin: '0 auto',
            overflow: 'hidden',
            background: 'linear-gradient(180deg, #1e3a8a 0%, #3730a3 50%, #1e1b4b 100%)',
          }}
        >
          {/* Background Elements */}
          <Carpet
            style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100%',
              height: 'auto',
              zIndex: 1,
            }}
          />

          <Image
            src={Window}
            alt="Window"
            width={200}
            height={150}
            style={{
              position: 'absolute',
              top: '10%',
              left: '5%',
              zIndex: 2,
            }}
          />

          <Image
            src={Chimney}
            alt="Chimney"
            width={120}
            height={200}
            style={{
              position: 'absolute',
              top: '0%',
              right: '10%',
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
              width: personalTreeWidth,
              height: personalTreeHeight,
              transition: 'opacity 0.8s ease-in-out',
              opacity: revealTree ? 1 : 0,
              zIndex: 3,
            }}
          >
            {/* Main Tree Image */}
            <Image
              src={Tree}
              alt="Your Christmas Tree"
              width={personalTreeWidth}
              height={personalTreeHeight}
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
              width={personalTreeWidth}
              height={personalTreeHeight * 0.7}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: 'auto'
              }}
            />

            {/* Presents at the base */}
            <Image
              src={Presents}
              alt="Presents"
              width={personalTreeWidth * 0.8}
              height={personalTreeHeight * 0.3}
              style={{
                position: 'absolute',
                bottom: 0,
                left: '10%',
                width: '80%',
                height: 'auto'
              }}
            />

            {/* Tree bulbs for completed deeds */}
            {completedDeeds.map((completedDeed, i: number) => {
              // Placeholder bulb positions (will use YourTreeBulbPositions when migrated)
              const position = {
                left: `${Math.random() * 70 + 15}%`,
                top: `${Math.random() * 50 + 25}%`
              }
              
              return (
                <Box
                  key={`bulb-${completedDeed.deedId}`}
                  onClick={() => onBulbClick(completedDeed.deedId)}
                  sx={{
                    position: 'absolute',
                    ...position,
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    backgroundColor: clickedBulbId === completedDeed.deedId ? '#FFD700' : '#FF6B6B',
                    cursor: 'pointer',
                    border: '2px solid white',
                    boxShadow: '0 0 15px rgba(255,255,255,0.8)',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'scale(1.3)',
                      boxShadow: '0 0 20px rgba(255,215,0,0.9)'
                    }
                  }}
                />
              )
            })}

            {/* Tree Star - shows when all deeds completed */}
            {isAllDeedsCompleted && (
              <Box
                className={`absolute top-[-5%] left-1/2 transform -translate-x-1/2 z-10 ${starClassName}`}
              >
                <Image
                  src={TreeStar}
                  alt="Tree Star"
                  width={60}
                  height={60}
                  style={{
                    filter: 'drop-shadow(0 0 20px #FFD700)',
                  }}
                />
              </Box>
            )}
          </Box>

          {/* Floating Heart */}
          <Heart
            className="absolute top-[20%] right-[20%] w-10 h-10 animate-float z-[2]"
          />

          {/* Snowflakes */}
          <Snowflakes
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: 0.7,
              zIndex: 4,
              pointerEvents: 'none',
            }}
          />
        </Box>

        {/* Content Section */}
        <Box className="p-8 text-center bg-white">
          {/* Progress Display */}
          <Typography variant="h4" component="h1" className="mb-4 text-green-700 font-bold">
            Your Giving Tree
          </Typography>
          
          <Typography variant="h6" className="mb-6 text-gray-600">
            {completedDeeds.length} of {initialDeeds.length} good deeds completed
          </Typography>

          {/* All Deeds Completed Message */}
          {isAllDeedsCompleted && (
            <Box className="mb-8 p-6 bg-green-50 rounded-lg border border-green-200">
              <Typography variant="h5" className="text-green-700 mb-4 font-semibold">
                🌟 {allDeedsCompletedCopy} 🌟
              </Typography>
            </Box>
          )}

          {/* Action Buttons */}
          <Box className="flex gap-4 justify-center mb-8">
            <Link href="/" passHref>
              <Button
                variant="contained"
                onClick={() => trackClick('Community Tree')}
                className="bg-green-700 hover:bg-green-800 px-8 py-3 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Box component="span" className="mr-2">Community Tree</Box>
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

          {/* Dev Controls for Testing */}
          {process.env.NODE_ENV === 'development' && (
            <Box className="mt-8 p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50">
              <Typography variant="subtitle2" className="mb-4 text-gray-700 font-medium">Dev Controls:</Typography>
              <Box className="flex gap-2 flex-wrap justify-center">
                {initialDeeds.slice(0, 3).map((deed) => (
                  <Box key={deed.id} className="flex gap-2">
                    <Button
                      size="small"
                      variant="outlined"
                      disabled={isPending || completedDeedIds.includes(deed.id)}
                      onClick={() => handleCompleteDeed(deed.id)}
                      className="text-xs px-3 py-1 border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                    >
                      Complete {deed.title}
                    </Button>
                    {completedDeedIds.includes(deed.id) && (
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        disabled={isPending}
                        onClick={() => handleRemoveDeed(deed.id)}
                        className="text-xs px-3 py-1 border-red-300 text-red-700 hover:bg-red-50 disabled:opacity-50"
                      >
                        Remove
                      </Button>
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Container>

      {/* Animations now handled by Tailwind CSS classes */}
    </Box>
  )
}