# Cancel Flow Task

## Overview

This project implements a subscription cancellation flow for a service, providing a seamless user experience while handling business logic, A/B testing, and secure data persistence. The application is built using modern web technologies and follows best practices for security and maintainability.

## Features

### 1. Subscription Cancellation Flow

- A multi-step cancellation process tailored for employed and unemployed users.
- Dynamic UI rendering based on user choices and employment status.
- Final messages for subscription continuation or cancellation.

### 2. A/B Testing

- Implements a 50/50 split A/B testing mechanism.
- **Variant A**: No downsell offer.
- **Variant B**: Displays a downsell offer with a discounted price.
- User's variant is determined using a cryptographically secure random number generator and persisted for future visits.

### 3. Data Persistence

- Records cancellation details in the database, including:
  - User ID
  - Subscription ID
  - Employment status
  - Downsell variant
  - Cancellation reason
  - Feedback and other metadata
- Updates subscription status to `pending_cancellation` or `cancelled` as appropriate.

### 4. Security

- Implements CSRF protection using tokens validated on both client and server.
- Validates all user inputs using Zod schemas.

## Tech Stack

- **Next.js** with App Router for server-side rendering and API routes.
- **React** with TypeScript for building a robust and type-safe UI.
- **Tailwind CSS** for responsive and modern styling.
- **Supabase** for database management and authentication.
- **Zustand** for state management.

## Project Structure

- `src/app`: Contains Next.js pages and API routes.
- `src/components`: Reusable React components for the cancellation flow.
- `src/lib`: Utility functions and Supabase client setup.
- `src/store`: State management using Zustand.
- `src/utils`: Helper functions for validation and server-side logic.
- `supabase`: Configuration files for the Supabase setup.

## Setup Instructions

### Prerequisites

- Node.js (v19 or higher)
- Supabase CLI
- PostgreSQL

### Steps

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd cancel-flow-task
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the database:
   ```bash
   npm run db:setup
   ```
4. Create a .env.local file in the project root and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Key Files

- `src/app/api/cancel-subscription/cancel/route.ts`: Handles cancellation requests, including CSRF validation and database updates.
- `src/app/api/cancel-subscription/initialize/route.ts`: Initializes the cancellation process and assigns A/B testing variants.
- `src/components/SubscriptionCancellation/CancelFlow.tsx`: Main component for rendering the cancellation flow UI.
- `seed.sql`: SQL script for seeding the database with initial data.

## Development Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm run start`: Start the production server.
- `npm run db:setup`: Set up the database and seed initial data.

## Security Measures

- CSRF protection using tokens.
- Input validation with Zod.
- Row-Level Security (RLS) policies in Supabase.

> **Note:** Due to time constraints, Row-Level Security (RLS) was not fully implemented in this project. Future updates will address this limitation.

## Future Enhancements

- Add payment processing for downsell offers.
- Integrate user authentication.
- Implement analytics tracking for user interactions.

---

**Thank you for exploring this project!**
