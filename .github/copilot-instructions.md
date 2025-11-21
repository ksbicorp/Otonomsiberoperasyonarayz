# GitHub Copilot Instructions for Otonom Siber Operasyon Arayüzü

## Project Overview
This is a modern cybersecurity operations interface built with React, TypeScript, and Vite. The application provides a dashboard for autonomous cyber operations with features including command panels, orchestration workflows, and expert intelligence systems.

## Tech Stack
- **Framework**: React 18.3.1
- **Language**: TypeScript
- **Build Tool**: Vite 6.3.5 with SWC plugin
- **Styling**: Tailwind CSS v4.1.3
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Charts**: Recharts
- **Additional Libraries**: 
  - react-hook-form for form management
  - react-day-picker for date picking
  - next-themes for theme management
  - sonner for toast notifications

## Project Structure
```
src/
├── App.tsx                 # Main application component
├── main.tsx               # Application entry point
├── index.css              # Global styles with Tailwind
├── components/
│   ├── CommandPanel.tsx   # Dashboard component
│   ├── OrchestrationWorkflow.tsx  # Workflow management
│   ├── ExpertIntelligence.tsx     # Intelligence system
│   ├── SplashScreen.tsx   # Loading screen
│   ├── NetworkGraph.tsx   # Network visualization
│   ├── ui/                # Reusable UI components (Radix-based)
│   └── figma/             # Figma-exported components
├── assets/                # Static assets (images, etc.)
├── styles/                # Additional style files
└── guidelines/            # Design guidelines and documentation
```

## Development Commands
- `npm install` - Install dependencies
- `npm run dev` - Start development server (runs on port 3000)
- `npm run build` - Build for production (outputs to `build/` directory)

## Code Style Guidelines

### TypeScript
- Use TypeScript for all new files
- Prefer functional components with hooks over class components
- Use proper typing for props, state, and function parameters
- Avoid `any` type; use proper interfaces or types

### React Patterns
- Use functional components with React hooks
- Follow the existing component structure in `src/components/`
- Keep components focused and single-purpose
- Extract reusable UI elements to `src/components/ui/`

### Styling
- Use Tailwind CSS utility classes for styling
- Follow the dark theme color scheme:
  - Background: `#0a0a0f`, `#1e1e24`
  - Text: `#e8e8ea`, `#6b6b75`
  - Accent: `#d4af37` (gold)
- Use Radix UI components from `src/components/ui/` for consistent UI patterns
- Maintain responsive design patterns

### File Organization
- Place reusable UI components in `src/components/ui/`
- Place feature-specific components in `src/components/`
- Use clear, descriptive component names
- Keep one component per file

### Import Conventions
- Use the `@/` alias for absolute imports from `src/` directory
- Group imports: React, external libraries, internal components, styles
- Use named exports for components

### Component Structure
```typescript
import { useState } from 'react';
import { ExternalComponent } from 'external-library';
import { InternalComponent } from '@/components/InternalComponent';

interface ComponentProps {
  // Props definition
}

export const ComponentName = ({ prop1, prop2 }: ComponentProps) => {
  // Component implementation
};
```

## Design System
- The application uses a cybersecurity-themed dark UI
- Logo is a gold gradient 'M' character
- Sidebar icons use Lucide React
- Cards and panels have subtle borders and dark backgrounds
- Interactive elements have hover states with color transitions

## Key Features
- **Command Panel**: Main dashboard with system status and threat monitoring
- **Orchestration Workflow**: Visual workflow builder and automation
- **Expert Intelligence**: AI-powered threat analysis and recommendations
- **Network Visualization**: Graph-based network topology display
- **Responsive Sidebar**: Collapsible navigation with icon-based menu

## Special Considerations
- The project was generated from a Figma design
- Maintain consistency with the existing dark theme and color scheme
- Ensure all interactive elements are accessible
- Keep the UI responsive for different screen sizes
- Use existing UI components from `src/components/ui/` before creating new ones

## Dependencies Management
- All dependencies are specified in `package.json`
- Use version-specific imports where needed (see `vite.config.ts` aliases)
- Prefer using existing libraries over adding new ones
