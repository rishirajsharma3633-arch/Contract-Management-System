# Contract Management Platform
https://contract-management-system-rzpr.onrender.com

A professional, frontend-only Contract Management Platform built with React, TypeScript, and Zustand.

## Features

- **Blueprint Creation**: Create reusable contract templates with dynamic fields.
- **Dynamic Fields**: Supports Text, Date, Signature, and Checkbox field types.
- **Custom Positioning**: Position fields using a coordinate-based system (X/Y).
- **Strict Lifecycle Management**: Contracts follow a rigid state machine:
  - `Created` → `Approved` → `Sent` → `Signed` → `Locked`
  - `Revoked` (from `Created` or `Sent`)
- **Contract Dashboard**: Track and filter contracts by status.
- **Data Persistence**: State is persisted in `localStorage`.
- **Responsive Design**: Modern, dashboard-style UI with Vanilla CSS.

## Tech Stack

- **React + Vite**: For a fast development experience and efficient rendering.
- **TypeScript**: Ensuring type safety and better developer experience.
- **Zustand**: Lightweight state management for handling complex business logic and lifecycle rules.
- **Lucide React**: Premium iconography.
- **Vanilla CSS**: Clean, performant styling with custom design tokens.

## Architecture & Folder Structure

```
src/
├── components/
│   ├── layout/       # Application shell and navigation
│   ├── ui/           # Reusable UI primitives (Button, Card, Modal, etc.)
│   └── features/     # Feature-specific components (Editor, Dashboard)
├── store/            # Centralized Zustand store with persistence
├── types/            # TypeScript interfaces and constants
├── utils/            # Helper functions and business logic
└── index.css         # Global styles and design tokens
```

### Key Design Decisions
- **Lifecycle Logic**: Enforced at the store level to prevent invalid state transitions regardless of UI state.
- **Positioning**: Uses absolute positioning within a relative container to mimic a document format.
- **Clean Architecture**: Separation of UI, state, and types for easier maintainability.

## Setup Instructions

1. **Clone the project**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run development server**:
   ```bash
   npm run dev
   ```
4. **Build for production**:
   ```bash
   npm run build
   ```

## Assumptions & Limitations
- All data is stored locally in the browser's `localStorage`.
- Real-time collaboration is not supported (no backend).
- Signature field is a simple text-based placeholder.
- Document positioning is based on pixels (simple fixed-size canvas).
