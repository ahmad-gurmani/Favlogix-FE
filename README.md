# Favlogix-FE-Assessment

## Task Overview
This project is a high-fidelity front-end implementation based on the provided Figma design. It is a standalone React application that demonstrates advanced UI/UX patterns, including complex loading sequences, responsive layouts, and seamless state transitions without any backend dependencies.

### Core Objectives Delivered:
- **UI Implementation Accuracy**: 1:1 fidelity with Figma spacing, colors (#0C0C0C), and typography.
- **Component Architecture**: Modular, reusable React components with TypeScript for type safety.
- **Responsiveness**: Fully adaptive layout across Desktop, Tablet, and Mobile.
- **Advanced Animations**: Custom splash screen sequence featuring honeycomb migration and sequential data population.
- **Skeleton States**: Integrated shimmer/skeleton loaders for all major dashboard components.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.20.8+ or v20.19+ recommended)
- pnpm (preferred) or npm

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/ahmad-gurmani/Favlogix-FE.git
   cd Favlogix-FE-Assessment
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

---

## 🛠️ Tech Stack
- **Framework**: React (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **API Integration**: Axios + Multi-source Public APIs

---

## 🧩 Key Features & Implementation
- **Splash Screen**: Three-phase loading sequence (`loading` -> `migrating` -> `populating`).
- **Dashboard**: Multi-column layout with conditional sidebar collapses and immersive animations.
- **Frontend-Only Architecture**: All relational data is managed via local mock services (`src/services/mockData.ts`), simulating real API responses with artificial latency for skeleton state transitions.
- **Deep API Integration (Mandatory)**:
  - **Users & Profiles**: Fetched from `https://dummyjson.com/users` (includes rich data like company/address for the details panel).
  - **Teams & Organizational Data**: Fetched from `https://jsonplaceholder.typicode.com/posts` to simulate dynamic structures.
  - **Conversation History**: Historical messages are pulled from `https://jsonplaceholder.typicode.com/comments` for each room.

---

## 🌐 Deployment Guide (Vercel)

This project is optimized for a simple, one-click deployment to **Vercel**.

1. Connect your GitHub repository to Vercel.
2. Ensure the **Framework Preset** is set to **Vite**.
3. No environment variables are required for basic functionality (all public APIs are handled client-side).
4. Deploy!

---

**Developed by Ahmad Gurmani for Favlogix Assessment.**
