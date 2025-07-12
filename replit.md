# ELORA E-commerce Platform

## Overview

This is a modern e-commerce platform for ELORA, a premium loungewear and nightwear brand. The application is built with a full-stack TypeScript architecture using React on the frontend, Express.js on the backend, and PostgreSQL with Drizzle ORM for data management. The platform specializes in silk, linen, and cotton loungewear collections with a focus on Pakistani market preferences.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

**July 12, 2025 - Complete DOM Validation Resolution & Payment Methods Update**
- Successfully migrated project from Replit Agent to Replit environment
- Fixed all nested anchor tag issues causing DOM validation warnings
- Resolved Button component structure using proper Link wrapping instead of asChild prop
- Fixed SelectItem components by updating empty values to "all" for category and collection filters
- Implemented proper filter logic to handle "all" values correctly
- Updated payment methods to only include Cash on Delivery and Bank Transfer (removed JazzCash and EasyPaisa)
- Updated checkout form validation and type definitions to match simplified payment options
- All routes (/, /products, /cart, /checkout, /api/products) now returning 200 status codes
- Application fully functional with no console errors or DOM validation warnings
- Golden button styling maintained with proper transparency and black text

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: Shadcn/UI components with Radix UI primitives
- **Styling**: Tailwind CSS with custom ELORA brand colors (cream, blush, sage, gold, charcoal, stone)
- **State Management**: TanStack Query for server state, React Context for cart and wishlist
- **Build Tool**: Vite with custom configuration for development and production

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with structured error handling
- **Session Management**: Simple session-based approach using headers/localStorage for cart persistence
- **Middleware**: Custom logging, CORS, and error handling

### Data Storage Solutions
- **Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle ORM with TypeScript-first approach
- **Schema**: Shared schema definitions between frontend and backend
- **Migrations**: Drizzle Kit for database migrations

## Key Components

### Product Management
- Product catalog with categories (silk, linen, cotton)
- Collections organization (new-arrivals, silk-collection, etc.)
- Size variants (XS to XL) and color options
- Stock management and featured product highlighting
- Review and rating system

### Shopping Experience
- Shopping cart with session persistence
- Wishlist functionality
- Product search and filtering
- Size guide with detailed measurements
- Product image galleries with zoom functionality

### E-commerce Features
- Multi-step checkout process
- Multiple payment methods (COD, bank transfer, JazzCash, EasyPaisa)
- Order management system
- Shipping cost calculation (free shipping over Rs. 3,000)
- Customer review system

### UI/UX Components
- Responsive design optimized for mobile devices
- Custom themed components using Shadcn/UI
- Product cards with quick actions
- Interactive size and color selectors
- Breadcrumb navigation

## Data Flow

1. **Product Discovery**: Users browse products through category/collection filters or search
2. **Product Details**: Detailed product pages with images, specifications, and reviews
3. **Cart Management**: Session-based cart with real-time updates
4. **Checkout Process**: Multi-step form with validation and payment method selection
5. **Order Processing**: Order creation with item details and customer information

## External Dependencies

### Frontend Dependencies
- **@tanstack/react-query**: Server state management and caching
- **@radix-ui/***: Accessible UI component primitives
- **wouter**: Lightweight routing library
- **react-hook-form**: Form management with validation
- **zod**: Schema validation
- **tailwindcss**: Utility-first CSS framework

### Backend Dependencies
- **drizzle-orm**: TypeScript ORM for PostgreSQL
- **@neondatabase/serverless**: Serverless PostgreSQL client
- **express**: Web application framework
- **zod**: Schema validation (shared with frontend)

### Development Tools
- **vite**: Frontend build tool and development server
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production builds
- **drizzle-kit**: Database migration and introspection tool

## Deployment Strategy

### Development Environment
- **Frontend**: Vite development server with HMR
- **Backend**: tsx for TypeScript execution with auto-restart
- **Database**: Neon serverless PostgreSQL for development and production

### Production Build
- **Frontend**: Vite build generating static assets in `dist/public`
- **Backend**: esbuild bundling server code to `dist/index.js`
- **Database**: Production PostgreSQL with environment-based configuration

### Environment Configuration
- Database connection via `DATABASE_URL` environment variable
- Separate build commands for development (`dev`) and production (`build`, `start`)
- TypeScript compilation checking with `tsc`
- Database schema deployment with `drizzle-kit push`

### Replit Integration
- Custom Vite plugins for Replit development environment
- Runtime error overlay for better debugging experience
- Cartographer integration for enhanced development tools