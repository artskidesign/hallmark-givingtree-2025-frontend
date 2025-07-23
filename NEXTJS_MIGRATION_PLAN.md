# Next.js Migration Plan - Hallmark Giving Tree Frontend

## Project Overview

This document outlines the complete step-by-step migration plan for converting the Hallmark Giving Tree React application to the latest Next.js framework while maintaining all existing functionality.

**Current Stack:**
- React 17.0.1 with Create React App 4.0.0
- Material-UI v4.11.0
- React Router v5.2.0 with Connected React Router
- Redux with legacy patterns
- TypeScript 4.0.3
- SCSS with Node Sass v4.13.1

**Target Stack:**
- Next.js 14+ (latest stable)
- MUI v5+ (Material-UI successor)
- Next.js App Router (file-based routing)
- Redux Toolkit with modern patterns
- TypeScript 5+
- CSS Modules or Styled Components

## Migration Phases

### Phase 1: Pre-Migration Setup & Dependency Updates

#### 1.1 Environment Setup
```bash
# Create new Next.js project alongside existing
npx create-next-app@latest hallmark-givingtree-nextjs --typescript --tailwind --eslint --app --src-dir --import-alias="@/*"

# Or initialize in current directory (backup first!)
npx create-next-app@latest . --typescript --eslint --app --src-dir --import-alias="@/*"
```

#### 1.2 Update Core Dependencies
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "@mui/material": "^5.14.0",
    "@mui/icons-material": "^5.14.0",
    "@emotion/react": "^11.11.0",
    "@emotion/styled": "^11.11.0",
    "@reduxjs/toolkit": "^1.9.0",
    "react-redux": "^8.1.0",
    "typescript": "^5.0.0",
    "sass": "^1.69.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "@types/node": "^20.0.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^14.0.0"
  }
}
```

#### 1.3 Remove Deprecated Dependencies
```bash
npm uninstall react-router react-router-dom connected-react-router
npm uninstall @material-ui/core @material-ui/icons
npm uninstall react-pose recompose babel-polyfill node-sass
npm uninstall react-scripts react-with-breakpoints
```

### Phase 2: Project Structure Migration

#### 2.1 Create Next.js Directory Structure
```
hallmark-givingtree-nextjs/
├── src/
│   ├── app/                     # App Router (Next.js 13+)
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page (Community Tree)
│   │   ├── your-tree/
│   │   │   └── page.tsx        # Your Tree page
│   │   ├── deeds/
│   │   │   └── page.tsx        # Deeds page
│   │   └── how-it-works/
│   │       └── page.tsx        # How it works page
│   ├── components/             # Reusable components
│   ├── lib/                    # Utilities and configurations
│   ├── store/                  # Redux store (RTK)
│   ├── styles/                 # Global styles
│   └── types/                  # TypeScript types
├── public/                     # Static assets
├── next.config.js             # Next.js configuration
└── package.json
```

#### 2.2 Configure Next.js
**next.config.js:**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['example.com'], // Add your image domains
  },
  sassOptions: {
    includePaths: ['./src/styles'],
  },
  async redirects() {
    return [
      {
        source: '/signup',
        destination: '/your-tree',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig
```

**tsconfig.json:**
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Phase 3: Component Migration

#### 3.1 Root Layout Migration
**src/app/layout.tsx:**
```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { ReduxProvider } from '@/lib/redux-provider'
import { theme } from '@/lib/theme'
import '@/styles/globals.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hallmark Giving Tree',
  description: 'Spread joy this holiday season',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
```

#### 3.2 Material-UI v4 to MUI v5 Migration

**Create theme configuration (src/lib/theme.ts):**
```typescript
import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Adjust to match Hallmark colors
    },
    secondary: {
      main: '#dc004e',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // Migrate old 'classes' prop styles here
          '&.PrimaryBtn': {
            // Your primary button styles
          },
          '&.SmBtn': {
            // Your small button styles
          },
        },
      },
    },
  },
})
```

**Button migration example:**
```tsx
// OLD (Material-UI v4)
<Button
  classes={{
    root: 'PrimaryBtn SmBtn',
    label: 'BtnLabel',
  }}
  onClick={() => window.location.reload(false)}
>
  Reload
</Button>

// NEW (MUI v5)
<Button
  sx={{
    // Use sx prop for custom styling
    bgcolor: 'primary.main',
    '&.PrimaryBtn': {
      // Custom styles
    }
  }}
  onClick={() => window.location.reload()}
>
  Reload
</Button>
```

#### 3.3 Redux Store Migration to RTK

**src/store/index.ts:**
```typescript
import { configureStore } from '@reduxjs/toolkit'
import deedsSlice from './slices/deedsSlice'
import completedDeedsSlice from './slices/completedDeedsSlice'
import userSlice from './slices/userSlice'

export const store = configureStore({
  reducer: {
    deeds: deedsSlice,
    completedDeeds: completedDeedsSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

**src/lib/redux-provider.tsx:**
```tsx
'use client'
import { Provider } from 'react-redux'
import { store } from '@/store'

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}
```

### Phase 4: Routing Migration

#### 4.1 Convert React Router to Next.js App Router

**Route mapping:**
- `/` → `src/app/page.tsx` (Community Tree)
- `/your-tree` → `src/app/your-tree/page.tsx`
- `/deeds` → `src/app/deeds/page.tsx`
- `/how-it-works` → `src/app/how-it-works/page.tsx`
- `/closewindow` → `src/app/closewindow/page.tsx`

**src/app/page.tsx (Community Tree):**
```tsx
import { CommunityTreePage } from '@/components/CommunityTreePage'

export default function Home() {
  return <CommunityTreePage />
}
```

**src/app/your-tree/page.tsx:**
```tsx
import { YourTreePage } from '@/components/YourTreePage'
import { SecuredRoute } from '@/components/SecuredRoute'

export default function YourTree() {
  return (
    <SecuredRoute>
      <YourTreePage />
    </SecuredRoute>
  )
}
```

#### 4.2 Replace Router Hooks and Components

**Navigation updates:**
```tsx
// OLD
import { useHistory } from 'react-router-dom'
const history = useHistory()
history.push('/your-tree')

// NEW
import { useRouter } from 'next/navigation'
const router = useRouter()
router.push('/your-tree')
```

**Link component updates:**
```tsx
// OLD
import { Link } from 'react-router-dom'
<Link to="/your-tree">Your Tree</Link>

// NEW
import Link from 'next/link'
<Link href="/your-tree">Your Tree</Link>
```

### Phase 5: Component Pattern Updates

#### 5.1 Replace Deprecated Libraries

**React Pose → Framer Motion migration:**
```tsx
// OLD (React Pose)
import posed, { PoseGroup } from 'react-pose'
const TransitionDiv = posed.div({
  enter: { opacity: 1, delay: 0 },
  exit: { opacity: 0 },
})

// NEW (Framer Motion)
import { motion, AnimatePresence } from 'framer-motion'
const MotionDiv = motion.div

// Usage
<AnimatePresence mode="wait">
  <MotionDiv
    key={pathname}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {children}
  </MotionDiv>
</AnimatePresence>
```

**Recompose → Custom Hooks:**
```tsx
// OLD (Recompose)
import { compose, withState, withHandlers } from 'recompose'

// NEW (Custom Hooks)
function useToggle(initialValue: boolean) {
  const [value, setValue] = useState(initialValue)
  const toggle = useCallback(() => setValue(v => !v), [])
  return [value, toggle] as const
}
```

#### 5.2 Update React Patterns

**ReactDOM.render → createRoot:**
```tsx
// OLD
import ReactDOM from 'react-dom'
ReactDOM.render(<App />, document.getElementById('root'))

// NEW (handled by Next.js automatically)
// No longer needed - Next.js handles this
```

**Connect HOC → useSelector/useDispatch:**
```tsx
// OLD
import { connect } from 'react-redux'
const mapStateToProps = (state) => ({ ... })
const enhance = connect(mapStateToProps)
export default enhance(App)

// NEW
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'

function App() {
  const isWebView = useSelector((state: RootState) => state.webView.webView)
  const dispatch = useDispatch()
  // Component logic
}
```

### Phase 6: Styling Migration

#### 6.1 SCSS to CSS Modules or Styled Components

**Option A: CSS Modules**
```scss
/* styles/components/Button.module.scss */
.primaryButton {
  background-color: var(--primary-color);
  padding: 12px 24px;
  border-radius: 4px;
  
  &.small {
    padding: 8px 16px;
    font-size: 14px;
  }
}
```

```tsx
import styles from '@/styles/components/Button.module.scss'

<button className={`${styles.primaryButton} ${styles.small}`}>
  Click me
</button>
```

**Option B: MUI styled components**
```tsx
import { styled } from '@mui/material/styles'
import { Button } from '@mui/material'

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: '12px 24px',
  '&.small': {
    padding: '8px 16px',
    fontSize: '14px',
  },
}))
```

#### 6.2 Global Styles Migration

**src/styles/globals.scss:**
```scss
// Migrate existing global styles
@import './variables';
@import './layouts/app';
@import './layouts/buttons';
// ... other imports

// Next.js specific styles
html,
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif;
}

* {
  box-sizing: border-box;
}
```

### Phase 7: API Integration & Data Fetching

#### 7.1 Replace axios with Next.js patterns

**Server-side data fetching:**
```tsx
// src/app/deeds/page.tsx
import { DeedsPage } from '@/components/DeedsPage'

async function getDeeds() {
  const res = await fetch(`${process.env.API_BASE_URL}/api/app/deed/deeds`, {
    cache: 'no-store', // or 'force-cache' for static
  })
  if (!res.ok) throw new Error('Failed to fetch deeds')
  return res.json()
}

export default async function Deeds() {
  const deeds = await getDeeds()
  return <DeedsPage initialDeeds={deeds} />
}
```

**Client-side data fetching (if needed):**
```tsx
'use client'
import { useEffect, useState } from 'react'

function DeedsComponent() {
  const [deeds, setDeeds] = useState([])
  
  useEffect(() => {
    fetch('/api/deeds')
      .then(res => res.json())
      .then(setDeeds)
  }, [])
  
  return <div>{/* Render deeds */}</div>
}
```

#### 7.2 Environment Variables

**next.config.js or .env.local:**
```bash
# .env.local
NEXT_PUBLIC_API_BASE_URL=https://your-api-url.com
API_SECRET_KEY=your-secret-key
```

### Phase 8: Testing & Optimization

#### 8.1 Update Testing Framework
```json
{
  "devDependencies": {
    "@testing-library/react": "^13.4.0",
    "@testing-library/jest-dom": "^5.16.5",
    "jest": "^29.0.0",
    "jest-environment-jsdom": "^29.0.0"
  }
}
```

**jest.config.js:**
```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(customJestConfig)
```

#### 8.2 Performance Optimizations

**Image optimization:**
```tsx
import Image from 'next/image'

// OLD
<img src="/images/tree.png" alt="Tree" />

// NEW
<Image
  src="/images/tree.png"
  alt="Tree"
  width={500}
  height={300}
  priority // for above-the-fold images
/>
```

**Bundle analysis:**
```bash
npm install --save-dev @next/bundle-analyzer
```

### Phase 9: Deployment & CI/CD

#### 9.1 Update Build Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  }
}
```

#### 9.2 Update Azure Pipeline
```yaml
# azure-pipelines.yml
trigger:
- main

pool:
  vmImage: 'ubuntu-latest'

steps:
- task: NodeTool@0
  inputs:
    versionSpec: '18.x'
  displayName: 'Install Node.js'

- script: |
    npm ci
    npm run build
    npm run lint
  displayName: 'Install, build, and lint'

- task: ArchiveFiles@2
  inputs:
    rootFolderOrFile: '.next'
    includeRootFolder: false
    archiveType: 'zip'
    archiveFile: '$(Build.ArtifactStagingDirectory)/nextjs-app.zip'

- task: PublishBuildArtifacts@1
  inputs:
    pathToPublish: '$(Build.ArtifactStagingDirectory)'
    artifactName: 'nextjs-build'
```

## Migration Checklist

### Pre-Migration
- [ ] Backup current codebase
- [ ] Set up new Next.js project structure
- [ ] Update package.json dependencies
- [ ] Configure Next.js and TypeScript

### Component Migration
- [ ] Migrate root App component
- [ ] Update Material-UI components to MUI v5
- [ ] Convert Redux patterns to RTK
- [ ] Replace React Router with Next.js routing
- [ ] Update all component imports and exports

### Routing & Navigation  
- [ ] Create page components in app directory
- [ ] Implement secured routes
- [ ] Update all navigation links
- [ ] Test all route transitions

### Styling & Assets
- [ ] Migrate SCSS files
- [ ] Update image imports to Next.js Image component
- [ ] Configure global styles
- [ ] Test responsive design

### API & Data Fetching
- [ ] Update API calls
- [ ] Implement server-side data fetching where appropriate
- [ ] Configure environment variables
- [ ] Test all data flows

### Testing & Quality
- [ ] Update test configurations
- [ ] Run all existing tests
- [ ] Perform cross-browser testing
- [ ] Performance audit

### Deployment
- [ ] Update build and deployment scripts
- [ ] Configure CI/CD pipeline
- [ ] Deploy to staging environment
- [ ] Perform UAT testing
- [ ] Deploy to production

## Estimated Timeline

- **Phase 1-2**: Setup & Structure (2-3 days)
- **Phase 3-4**: Component & Routing Migration (5-7 days)
- **Phase 5-6**: Pattern Updates & Styling (3-4 days)
- **Phase 7**: API Integration (2-3 days)
- **Phase 8**: Testing & Optimization (2-3 days)
- **Phase 9**: Deployment (1-2 days)

**Total Estimated Time: 15-22 working days**

## Risk Mitigation

1. **Incremental Migration**: Migrate components gradually
2. **Feature Flags**: Use environment variables to toggle new features
3. **Extensive Testing**: Test each phase thoroughly before proceeding
4. **Rollback Plan**: Maintain ability to rollback to React version
5. **Documentation**: Document all changes and new patterns

## Post-Migration Cleanup

1. Remove all deprecated dependencies
2. Clean up unused files and code
3. Update documentation
4. Optimize bundle size
5. Implement Next.js specific optimizations (ISR, SSG, etc.)

---

*This migration plan provides a comprehensive roadmap for converting your React application to Next.js while maintaining all existing functionality and improving performance, developer experience, and maintainability.*