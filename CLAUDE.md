# Claude Code Context - Hallmark Giving Tree

This file provides context for Claude Code to better understand and work with this Next.js application.

## Project Overview

The Hallmark Giving Tree is a Christmas-themed web application that encourages users to complete and share good deeds during the holiday season. The app features interactive Christmas trees that grow as users complete charitable actions.

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 + Material-UI v5
- **State Management**: React Context API + Server Actions
- **Package Manager**: pnpm
- **Key Libraries**: React 18, Next.js Image optimization

## Architecture Patterns

### State Management
- **User State**: Managed via React Context (`src/lib/user-context.tsx`)
- **Data Fetching**: Server Components with Server Actions (`src/lib/actions.ts`)
- **Persistence**: localStorage for client-side data
- **No Redux**: Migrated away from Redux to simpler patterns

### Routing Structure
```
/ (Community Tree) - Main page showing community progress
/your-tree - Personal tree showing user's progress  
/deeds - List of all available good deeds
/how-it-works - Information page
/closewindow - Utility page
```

### Component Architecture
- **Server Components**: Pages that fetch data server-side
- **Client Components**: Interactive components marked with 'use client'
- **Context Providers**: UserProvider wraps the app for state management
- **Server Actions**: Handle form submissions and mutations

## Key Files & Directories

### Core Application
- `src/app/layout.tsx` - Root layout with providers
- `src/app/page.tsx` - Community tree (homepage)
- `src/app/your-tree/` - Personal tree functionality
- `src/lib/user-context.tsx` - User state management
- `src/lib/actions.ts` - Server Actions for data mutations

### Styling
- `src/styles/globals.scss` - Global styles with Tailwind imports
- `tailwind.config.js` - Tailwind configuration with custom colors/animations
- Custom animations: float, star-glow, fade-in

### Components
- `src/app/CommunityTreeClient.tsx` - Interactive community tree
- `src/app/your-tree/YourTreeClient.tsx` - Personal tree with progress tracking
- `src/components/` - Shared components (Header, Navigation, etc.)

## Development Patterns

### TypeScript Usage
- Strict typing enabled
- Custom types in `src/types/`
- Interface definitions for all data structures

### Data Flow
1. Server Components fetch initial data
2. Client Components handle user interactions
3. Server Actions process mutations
4. Context manages client state
5. localStorage provides persistence

### Styling Approach
- Tailwind utility classes for most styling
- MUI components for complex UI elements
- Custom CSS classes using @layer components
- Responsive design with Tailwind breakpoints

## Christmas Theme Implementation

### Visual Elements
- Interactive Christmas trees that grow with completed deeds
- Animated elements: floating hearts, glowing stars, snow effects
- Color palette: Christmas red, green, gold, winter blue
- Custom animations defined in Tailwind config

### User Experience
- Community tree shows collective progress
- Personal tree tracks individual achievements
- Good deed completion triggers visual celebrations
- Feed shows recent community activity

## Development Commands

```bash
pnpm dev        # Start development server
pnpm build      # Build for production
pnpm start      # Start production server
pnpm lint       # Run ESLint
```

## Common Tasks

### Adding New Good Deeds
1. Update the sample data in `src/lib/actions.ts`
2. Ensure proper TypeScript interfaces in `src/types/`
3. Test with both community and personal tree views

### Modifying Styling
- Use Tailwind utility classes where possible
- Custom styles go in `src/styles/globals.scss` using @layer
- Component-specific styles use className prop
- MUI components can be styled with sx prop or className

### State Management
- User-related state goes in UserContext
- UI state can be local component state
- Server state is handled by Server Actions
- Persistent data uses localStorage

## Testing Approach
- Component functionality can be tested with dev controls (development mode)
- Use browser dev tools to inspect state and performance
- Test responsive design across different screen sizes
- Verify animations and interactions work smoothly

## Performance Considerations
- Server Components reduce client-side JavaScript
- Next.js Image component optimizes images automatically
- Tailwind purges unused CSS in production
- Static generation provides fast loading times

## Christmas Season Context
This application is designed for holiday engagement, with features that encourage:
- Community participation in charitable activities
- Visual progress tracking through tree growth
- Sharing and celebrating good deeds
- Creating a sense of holiday spirit and giving

The codebase reflects these goals through interactive design, festive animations, and community-focused features.