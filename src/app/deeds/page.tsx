import { Suspense } from 'react'
import { DeedsPage } from '@/components/DeedsPage'
import { SecuredRoute } from '@/components/SecuredRoute'
import { Loader } from '@/components/Loader'

export default function Deeds() {
  return (
    <Suspense fallback={<Loader />}>
      <SecuredRoute>
        <DeedsPage />
      </SecuredRoute>
    </Suspense>
  )
}