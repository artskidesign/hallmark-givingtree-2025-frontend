import { getDeedsData } from '@/lib/actions'
import YourTreeClientComponent from './YourTreeClient'

export default async function YourTreePage() {
  try {
    // Fetch data on the server
    const deedsData = await getDeedsData()

    return (
      <YourTreeClientComponent 
        initialDeeds={deedsData.deeds}
        allDeedsCompletedCopy={deedsData.allDeedsCompletedCopy}
      />
    )
  } catch (error) {
    console.error('Failed to load tree data:', error)
    return (
      <div>
        <h1>Error loading tree</h1>
        <p>Unable to load the giving tree. Please try again.</p>
      </div>
    )
  }
}

export const metadata = {
  title: 'Your Tree - Hallmark Giving Tree',
  description: 'Track your good deeds and see your personal giving tree grow',
}