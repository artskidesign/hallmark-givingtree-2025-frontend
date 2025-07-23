import { Suspense } from 'react'
import { HowItWorksPage } from '@/components/HowItWorksPage'
import { Loader } from '@/components/Loader'

export default function HowItWorks() {
  return (
    <Suspense fallback={<Loader />}>
      <HowItWorksPage />
    </Suspense>
  )
}