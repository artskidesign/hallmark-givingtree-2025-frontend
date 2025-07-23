import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Box } from '@mui/material'
import { UserProvider } from '@/lib/user-context'
import { MUIThemeProvider } from '@/lib/theme-provider'
import HallmarkHeader from '@/components/Hallmark/HallmarkHeader'
import HallmarkFooter from '@/components/Hallmark/HallmarkFooter'
import Header from '@/components/Header'
import TreeNavigation from '@/components/TreeNavigation'
import '@/styles/globals.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hallmark Giving Tree',
  description: 'Spread joy this holiday season with the Hallmark Giving Tree',
  keywords: ['Hallmark', 'Giving Tree', 'Christmas', 'Charity', 'Good Deeds'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <MUIThemeProvider>
            <Box 
              id="__next"
              sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <HallmarkHeader />
              <Header />
              <TreeNavigation />
              <Box 
                component="main" 
                sx={{ 
                  flex: 1,
                  position: 'relative'
                }}
              >
                {children}
                <Box id="background-container" sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }} />
              </Box>
              <HallmarkFooter />
            </Box>
          </MUIThemeProvider>
        </UserProvider>
      </body>
    </html>
  )
}