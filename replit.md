# TalkingPills

## Overview

TalkingPills is a healthcare technology landing page and marketing site focused on patient adherence and communication. The application is built as a modern single-page application with a React frontend and Express backend. It serves as a lead generation platform with early access signups, demo requests, and investor information.

The project follows a monorepo structure with shared code between client and server, using TypeScript throughout for type safety.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: shadcn/ui component library (Radix UI primitives)
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion for page transitions and interactions
- **Fonts**: Plus Jakarta Sans (body), Outfit (display headings)

### Backend Architecture
- **Framework**: Express 5 with TypeScript
- **Build Tool**: esbuild for server bundling, Vite for client
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Schema Validation**: Zod with drizzle-zod for shared types

### Project Structure
```
├── client/           # React frontend application
│   └── src/
│       ├── components/   # Reusable UI components
│       ├── pages/        # Route-level page components
│       ├── hooks/        # Custom React hooks
│       └── lib/          # Utilities and query client
├── server/           # Express backend
│   ├── index.ts      # Server entry point
│   ├── routes.ts     # API route registration
│   └── static.ts     # Static file serving
├── shared/           # Shared code between client/server
│   └── schema.ts     # Database schema and types
└── migrations/       # Drizzle database migrations
```

### Design Patterns
- **Path Aliases**: `@/` for client source, `@shared/` for shared code
- **Component Architecture**: Atomic design with shadcn/ui primitives
- **API Layer**: Centralized API configuration in `@shared/routes`
- **Type Safety**: End-to-end TypeScript with shared Zod schemas

### Build Configuration
- Development uses Vite dev server with HMR
- Production builds bundle server with esbuild, client with Vite
- Server dependencies are selectively bundled to optimize cold start times

## External Dependencies

### Database
- **PostgreSQL**: Primary database (requires `DATABASE_URL` environment variable)
- **Drizzle ORM**: Database toolkit with push-based migrations (`npm run db:push`)

### UI/UX Libraries
- **Radix UI**: Accessible component primitives (dialog, select, tabs, etc.)
- **Lucide React**: Icon library
- **Embla Carousel**: Carousel/slider functionality
- **date-fns**: Date formatting utilities

### Development Tools
- **Vite**: Frontend build tool with React plugin
- **Replit Plugins**: Runtime error overlay, cartographer, dev banner (development only)

### Session Management
- **connect-pg-simple**: PostgreSQL session store (available but routes currently minimal)