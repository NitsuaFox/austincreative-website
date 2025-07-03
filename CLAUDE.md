# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Austin Creative UK (Phil), built with Next.js 15 and TypeScript. The site features a minimalist design with an interactive wave animation component inspired by the PS3 OS background.

## Development Commands

### Core Development
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Key Technologies
- **Next.js 15.3.4** with App Router
- **TypeScript 5.1.3** with strict mode
- **Tailwind CSS 3.3.2** for styling
- **Canvas API** for interactive animations

## Architecture

### Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout with Inter font and metadata
│   ├── page.tsx            # Single-page homepage
│   └── globals.css         # Tailwind imports and global styles
└── components/
    └── WaveAnimation.tsx   # Interactive Canvas-based wave animation
```

### Key Components

#### Homepage (`/src/app/page.tsx`)
Simple single-page layout with:
- Logo display (uses logo4.png from /public)
- WaveAnimation component
- Personal introduction
- Projects table (currently shows Blockfall game)
- Contact links (Email and GitHub)

#### WaveAnimation (`/src/components/WaveAnimation.tsx`)
Complex interactive component featuring:
- 5 layered waves with different colors (#FF6B6B, #4ECDC4, #45B7D1, #96CEB4, #FFEAA7)
- Real-time mouse interaction with ripple effects
- Canvas-based rendering with requestAnimationFrame
- Each wave has unique amplitude, frequency, and sensitivity values
- Responsive design with device pixel ratio scaling

## Design Patterns

### Styling Approach
- Utility-first CSS with Tailwind
- Responsive design using Tailwind's breakpoint system
- Custom gradients defined in tailwind.config.js

### Animation Philosophy
- Canvas-based animations for performance over CSS animations
- Mouse interactions create ripple effects and wave distortion
- Smooth 60fps animations using requestAnimationFrame
- Proper cleanup of event listeners and animation frames

### TypeScript Configuration
- Path aliases: `@/*` maps to `./src/*`
- Strict mode enabled for type safety
- Next.js plugin for optimal TypeScript experience

## Important Implementation Details

### Wave Animation Mouse Interaction
The wave animation responds to mouse movement within a 150px radius:
- Mouse Y position influences wave displacement
- Each wave layer has different sensitivity values (0.8-1.5)
- Ripple effects emanate from cursor position
- Subtle white glow follows mouse cursor

### Asset Management
- Logo files stored in `/public` (logo.png, logo2.png, logo3.png, logo4.png)
- Currently using logo4.png as the main logo
- Next.js Image component used for optimization

### Deployment Considerations
- Built for Vercel deployment (auto-detects Next.js)
- All static assets served from `/public`
- ESLint configuration prevents build failures
- TypeScript strict mode ensures type safety

## Development Notes

### Adding New Projects
Projects are displayed in a table format with columns:
- Title, Category, Description, Date Added, URL
- Currently only Blockfall game is listed
- Add new entries directly in the projects section of page.tsx

### Modifying Wave Animation
Wave parameters can be adjusted in the `waves` array:
- `amplitude`: Wave height
- `frequency`: Wave width/spacing
- `color`: Hex color value
- `opacity`: Transparency (0-1)
- `sensitivity`: Mouse interaction responsiveness
- `offset`: Phase offset for variation

### Logo Updates
To change the main logo:
1. Add new image to `/public` directory
2. Update the `src` prop in the Image component in page.tsx
3. Adjust the container size if needed (currently w-64 h-64)