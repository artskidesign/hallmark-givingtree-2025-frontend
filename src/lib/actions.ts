'use server'
import { CompletedDeed, Deed, DeedsListDto } from '@/types'
import { revalidateTag } from 'next/cache'

// Sample data (in a real app, this would be in a database)
const sampleDeeds: Deed[] = [
  {
    id: '1',
    title: 'Call a family member',
    titlePastTense: 'Called a family member',
    description: 'Reach out to a family member you haven\'t spoken to in a while',
    category: 'Family',
    completed: false,
    communityCount: 1245
  },
  {
    id: '2',
    title: 'Help a neighbor',
    titlePastTense: 'Helped a neighbor',
    description: 'Offer to help a neighbor with groceries or household tasks',
    category: 'Community',
    completed: false,
    communityCount: 987
  },
  {
    id: '3',
    title: 'Donate to charity',
    titlePastTense: 'Donated to charity',
    description: 'Make a donation to your favorite charity or cause',
    category: 'Giving',
    completed: false,
    communityCount: 2156
  },
  {
    id: '4',
    title: 'Volunteer your time',
    titlePastTense: 'Volunteered your time',
    description: 'Spend time volunteering at a local organization',
    category: 'Service',
    completed: false,
    communityCount: 743
  },
  {
    id: '5',
    title: 'Write a thank you note',
    titlePastTense: 'Wrote a thank you note',
    description: 'Write a heartfelt thank you note to someone who made a difference',
    category: 'Gratitude',
    completed: false,
    communityCount: 1567
  },
  {
    id: '6',
    title: 'Share a meal',
    titlePastTense: 'Shared a meal',
    description: 'Cook or share a meal with someone in need',
    category: 'Kindness',
    completed: false,
    communityCount: 892
  }
]

// Server action to add a completed deed
export async function addCompletedDeed(formData: FormData) {
  const deedId = formData.get('deedId') as string
  const userId = formData.get('userId') as string
  const userName = formData.get('userName') as string

  if (!deedId || !userId || !userName) {
    throw new Error('Missing required fields')
  }

  try {
    // In a real app, this would be a database operation
    const completedDeed: CompletedDeed = {
      deedId,
      sortOrder: Date.now(), // Simple ordering
      completedAt: new Date().toISOString(),
      userName,
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Revalidate related data
    revalidateTag('completed-deeds')
    revalidateTag('community-total')

    return { success: true, data: completedDeed }
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to add completed deed' 
    }
  }
}

// Server action to remove a completed deed
export async function removeCompletedDeed(formData: FormData) {
  const deedId = formData.get('deedId') as string
  const userId = formData.get('userId') as string

  if (!deedId || !userId) {
    throw new Error('Missing required fields')
  }

  try {
    // In a real app, this would be a database operation
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Revalidate related data
    revalidateTag('completed-deeds')
    revalidateTag('community-total')

    return { success: true }
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to remove completed deed' 
    }
  }
}

// Server action to get deeds data
export async function getDeedsData(): Promise<DeedsListDto> {
  try {
    // In a real app, this would be a database query
    const response: DeedsListDto = {
      deeds: sampleDeeds,
      communityCount: sampleDeeds.reduce((sum, deed) => sum + deed.communityCount, 0),
      feed: [
        { deedId: '1', name: 'Sarah', sortOrder: 0 },
        { deedId: '2', name: 'Michael', sortOrder: 1 },
        { deedId: '3', name: 'Emma', sortOrder: 2 },
        { deedId: '1', name: 'David', sortOrder: 3 },
        { deedId: '4', name: 'Lisa', sortOrder: 4 },
        { deedId: '2', name: 'James', sortOrder: 5 },
      ],
      allDeedsCompletedCopy: 'Congratulations! You have completed all the good deeds!'
    }

    return response
  } catch (error) {
    throw new Error('Failed to fetch deeds data')
  }
}

// Server action to get completed deeds for a user
export async function getCompletedDeeds(userId: string): Promise<CompletedDeed[]> {
  try {
    // In a real app, this would be a database query
    // For demo purposes, return sample completed deeds
    const sampleCompleted: CompletedDeed[] = [
      { deedId: '1', sortOrder: 0, completedAt: new Date().toISOString(), userName: 'You' },
      { deedId: '3', sortOrder: 1, completedAt: new Date().toISOString(), userName: 'You' },
    ]

    return sampleCompleted
  } catch (error) {
    throw new Error('Failed to fetch completed deeds')
  }
}