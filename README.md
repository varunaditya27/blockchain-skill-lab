# 🔗 Blockchain SkillLab

![Status](https://img.shields.io/badge/Status-Active%20Development-green)
![Version](https://img.shields.io/badge/Version-1.0.0%20(Beta)-blue)

Welcome to **Blockchain SkillLab**, an open-source, interactive curriculum designed to teach the fundamentals of decentralized systems, smart contracts, and protocol engineering.

This project is built with **Next.js 14** (App Router), **Tailwind CSS**, and **Framer Motion**, featuring a rigorous "Swiss/Brutalist" design system.

---

## 🚨 Contribution Guidelines (Strict)

This project follows a **strict structural convention** to ensure scalability. Please read this section carefully before submitting a PR.

### 1. Directory Structure Convention

We organize content by **Days** and **Sessions**. When adding new content, you **MUST** follow this folder structure:

```plaintext
blockchain-skilllab/
├── app/
│   ├── d1-session-1/       # Day 1, Session 1 (Page Route)
│   ├── d2-session-1/       # Day 2, Session 1
│   ├── d2-session-2/       # Day 2, Session 2
│   └── ...
├── components/
│   ├── Session1.tsx        # Content Component for D1-S1
│   ├── SessionEthereum.tsx # Content Component for D2-S1
│   └── ...
```

### 2. Naming Conventions

#### Routes (Folders in `app/`):
- Must be **lowercase** and **kebab-case**.
- Format: `d{day}-session-{number}`
- Example: `d4-session-1` (Day 3, Session 1)
- Example: `d4-session-2` (Day 4, Session 2)

#### Components (Files in `components/`):
- Must be **PascalCase**.
- Prefix with `Session` or specific topic name if unique.
- Example: `SessionSolidity.tsx`

### 3. Adding a New Session (Step-by-Step)

If you are contributing a new learning module (e.g., Day 3, Session 1):

#### **Step 1: Create the Route**
Create a new folder: `app/d3-session-1/`

Inside, create a `page.tsx`:

```tsx
import SessionNewTopic from '@/components/SessionNewTopic'

export default function Page() {
  return <SessionNewTopic />
}
```

#### **Step 2: Create the Content Component**
Create a new file: `components/SessionNewTopic.tsx`

- Copy the structure from an existing component (e.g., `components/Session1.tsx`).
- **CRITICAL:** Maintain the existing design tokens (colors, fonts, layout). Do not introduce new global CSS.

#### **Step 3: Update the Navigation**
1. Open `app/page.tsx`
2. Locate the `CURRICULUM_DATA` constant.
3. Update the link and available status for your session.

---

## 🛠️ Development Workflow

### Prerequisites
- Node.js 18+ (LTS Recommended)
- npm (v9+)

### 1. Installation

Clone the repo and install dependencies.

```bash
git clone https://github.com/your-org/blockchain-skilllab.git
cd blockchain-skilllab
npm install
```

### 2. Run Local Server

Start the development server with hot-reloading.

```bash
npm run dev
```

Access the app at [http://localhost:3000](http://localhost:3000).

### 3. Production Build (Mandatory Check)

Before pushing any code, you **must** verify that the production build succeeds. This catches type errors and static generation issues that `npm run dev` might miss.

```bash
npm run build
```

> ❌ **If `npm run build` fails, do not open a Pull Request.** Fix the errors locally first.

---

## 🎨 Design System

We use a specific aesthetic: **"Dark Tech / Swiss Brutalism"**.

### Color Palette

- **Backgrounds:** `bg-black` or `bg-[#050505]` (OLED Black).
- **Text:** `text-white` (Headings), `text-neutral-400` (Body).

#### Accents:
- **Ethereum/Core:** `blue-600` / `blue-500`
- **Solana/Speed:** `purple-600` / `cyan-500`
- **Success/System:** `green-500`
- **Warning/Critical:** `red-500`

### Typography

- **Headings:** `font-sans` (Inter), `tracking-tighter`, uppercase.
- **Data/Labels:** `font-mono` (JetBrains Mono), uppercase, `tracking-widest`.

### Do NOT use:

- ❌ Gradients for text (unless specifically for hero headers).
- ❌ Glassmorphism (frosted glass) heavily. We prefer solid borders (`border-neutral-800`).
- ❌ Rounded corners > `rounded-sm` or `rounded-md`. We prefer sharp edges.

---

## 📂 Project Structure Overview

```plaintext
blockchain-skilllab/
├── app/                    # Next.js App Router (Routes)
│   ├── layout.tsx          # Root Layout (Navbar/Footer)
│   ├── page.tsx            # Landing Page
│   ├── d1-session-1/       # Route: Day 1 Session 1
│   ├── d2-session-1/       # Route: Day 2 Session 1
│   └── ...
├── components/             # React Components
│   ├── AnimatedVisuals.tsx # 3D Visualizations (R3F)
│   ├── Hero3D.tsx          # Landing Page 3D Element
│   ├── Navbar.tsx          # Global Navigation
│   ├── Footer.tsx          # Global Footer
│   └── ...                 # Session Content Components
├── public/                 # Static Assets (Images/Logos)
│   └── logos/              # Platform logos (SVG preferred)
└── ...config files
```

---

## 📜 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please ensure you follow the contribution guidelines above before submitting a PR.

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Happy Learning! 🚀**
