# Favlogix-FE-Assessment

## Task Overview
This project is a high-fidelity front-end implementation based on the provided Figma design. It demonstrates advanced UI/UX patterns, including complex loading sequences, responsive layouts, and seamless state transitions.

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
   git clone <repository-url>
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
- **Styling**: Tailwind CSS (Vanilla CSS for custom animations)
- **State Management**: Zustand
- **Icons**: Custom SVG assets from Figma
- **Animations**: CSS Keyframes + Framer Motion (where applicable)

---

## 🧩 Key Features & Implementation
- **Splash Screen**: Three-phase loading sequence (`loading` -> `migrating` -> `populating`).
- **Dashboard**: Multi-column layout with conditional sidebar collapses.
- **Data Fetching**: Artificial delays implemented to demonstrate high-fidelity skeleton loading states.
- **Immersive UI**: Glowing background effects with subtle rotation and overflow for atmospheric depth.

## 🔗 APIs Used
- **DummyJSON** (`https://dummyjson.com/users`): Integrated for live user data fetching.
- **Local Backend** (`http://localhost:3001`): Used for relational chat data, rooms, and real-time Socket.io communication.

## 📄 Assumptions
- The "Inbox" section was prioritized for the migration animation as highlighted in the requirements.
- The 5px margin and #0C0C0C background color were applied strictly to match the specific UI refinement requests.
- Skeletal states remain visible for ~2 seconds to ensure visibility of the loading experience.

---

**Developed by Antigravity AI for Favlogix Assessment.**
