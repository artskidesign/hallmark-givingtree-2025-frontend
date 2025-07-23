import { getDeedsData } from '@/lib/actions'
import CommunityTreeClientComponent from './CommunityTreeClient'

export default async function CommunityTreePage() {
  try {
    // Fetch data on the server
    const deedsData = await getDeedsData()

    return (
      <CommunityTreeClientComponent 
        initialDeeds={deedsData.deeds}
        communityCount={deedsData.communityCount}
        feed={deedsData.feed}
      />
    )
  } catch (error) {
    console.error('Failed to load community tree data:', error)
    return (
      <div>
        <h1>Error loading community tree</h1>
        <p>Unable to load the community giving tree. Please try again.</p>
      </div>
    )
  }
}

export const metadata = {
  title: 'Community Tree - Hallmark Giving Tree',
  description: 'See the community giving tree and join others in spreading joy',
}