# Hallmark Giving Tree - Next.js Application

A modern Christmas-themed web application built with Next.js, allowing users to track and share their good deeds during the holiday season. Features interactive Christmas trees, deed tracking, and community engagement.

## 🎄 Features

- **Interactive Christmas Trees**: Personal and community trees that grow as good deeds are completed
- **Good Deed Tracking**: Track and complete charitable actions with visual progress
- **Community Feed**: See recent good deeds completed by other users
- **Responsive Design**: Optimized for desktop and mobile devices
- **Modern Animations**: Smooth transitions and Christmas-themed effects
- **Server-Side Rendering**: Fast loading with Next.js App Router

## 🚀 Technology Stack

**Frontend Framework:**
- Next.js 14 (App Router)
- React 18
- TypeScript 5

**Styling:**
- Tailwind CSS v4
- Material-UI (MUI) v5
- Custom animations and Christmas theme

**State Management:**
- React Context API
- Server Actions for mutations
- localStorage for persistence

**Development:**
- pnpm package manager
- PostCSS with Tailwind
- ESLint configuration

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd hallmark-givingtree-frontend-2025
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Start development server:**
   ```bash
   pnpm dev
   ```

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠 Available Scripts

### `pnpm dev`
Runs the app in development mode on [http://localhost:3000](http://localhost:3000).
The page will reload automatically when you make changes.

### `pnpm build`
Builds the app for production in the `.next` folder.
Optimizes the build for best performance with static generation.

### `pnpm start`
Starts the production server after running `pnpm build`.

### `pnpm lint`
Runs ESLint to check for code quality issues.

## 🏗 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx          # Community tree (homepage)
│   ├── your-tree/        # Personal tree page
│   └── deeds/            # Deeds listing page
├── components/           # Reusable React components
├── lib/                 # Utilities and configurations
│   ├── actions.ts       # Server Actions
│   ├── user-context.tsx # User state management
│   └── theme-provider.tsx # MUI theming
├── styles/             # Global styles and Tailwind config
├── images/            # Static assets and SVG components
└── types/            # TypeScript type definitions
```

## 🎨 Key Components

- **CommunityTreeClient**: Interactive community Christmas tree with deed feed
- **YourTreeClient**: Personal tree showing individual progress
- **UserProvider**: Context-based state management for user data
- **Server Actions**: Handle deed completion and data mutations


## 🎄 Christmas Theme

The application features a festive Christmas theme with:
- **Colors**: Traditional red, green, gold, and winter blue palette
- **Animations**: Floating hearts, glowing stars, and smooth transitions
- **Interactive Elements**: Tree bulbs that light up when deeds are completed
- **Seasonal Graphics**: Christmas trees, presents, snow effects

## 🔧 Environment Setup

The application uses environment variables for configuration:

```bash
# .env.local (create this file)
NEXT_PUBLIC_API_BASE_URL=https://your-api-url.com
```

## 📱 Browser Support

- Chrome/Chromium (latest)
- Firefox (latest) 
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a Pull Request

## 📄 License

This project is part of Hallmark's digital initiatives for spreading holiday joy and community engagement.

---

**Happy Holidays! 🎄✨**