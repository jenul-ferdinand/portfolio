# Jenul Ferdinand Portfolio – Engineering Guide
This project is a React portfolio website showcasing work experience, built with **Vite + React + Tailwind CSS** and deployed to GitHub Pages.

## 🔑 Core Principles
**IMPORTANT: You MUST follow these principles in all code changes:**

### KISS (Keep It Simple, Stupid)
- Prefer straightforward solutions over complex ones
- Simpler code is easier to read, test, and maintain

### YAGNI (You Aren't Gonna Need It)
- Only implement functionality when it's needed
- Avoid speculative features

### Component-Based Architecture
- Create reusable components with single responsibilities
- Use custom hooks for state logic
- Keep components focused and composable

---

## 🛠 Development Setup
```bash
# Clone repository
git clone https://github.com/jenul-ferdinand/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start dev server
npm run dev

# Build production bundle
npm run build

# Preview production build
npm run preview
```

---

## 📦 Essential npm Commands
```bash
npm install                # Install dependencies
npm install <pkg>          # Add a dependency
npm install -D <pkg>       # Add a dev dependency
npm uninstall <pkg>        # Remove a package
npm update                 # Update dependencies
npm run <script>           # Run package.json script
```

## Current Project Structure:
This project uses React 18 with Vite and Tailwind CSS.
```
portfolio/
├── .gitignore
├── CLAUDE.md
├── package.json
├── README.md
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .prettierrc
├── .eslintrc.cjs
├── public/
│   └── vite.svg
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── components/
│   │   ├── WorkExperience.jsx
│   │   └── LoadingOverlay.jsx
│   ├── hooks/
│   │   └── useWorkExperience.js
│   └── assets/
│       └── fonts/
├── .github/
│   └── workflows/
│       └── deploy.yml
└── dist/ (build output)
```

---

You are an expert in React, JavaScript/JSX, Tailwind CSS, and modern web development. You write maintainable, performant, and accessible code following React and modern JavaScript best practices.

## JavaScript/JSX Best Practices
- Use modern ES6+ syntax
- Prefer const/let over var
- Use destructuring for cleaner code
- Prefer template literals for strings
- Use arrow functions appropriately

---

## 📝 Naming Conventions
- **Folders**: kebab-case → `work-experience/`
- **Components**: PascalCase → `WorkExperience.jsx`
- **Hooks**: camelCase starting with "use" → `useWorkExperience.js`
- **CSS files**: kebab-case → `loading-overlay.css`
- **Constants**: UPPER_SNAKE_CASE → `API_BASE_URL`
- **Functions**: camelCase → `formatWorkExperience()`

---

## 🎨 React Best Practices
- Write functional components (no class components)
- Use hooks for state and side effects
- Keep components small and focused
- Extract custom hooks for reusable logic
- Use PropTypes for type checking (or TypeScript)
- Prefer composition over inheritance

---

## ⚡ Components
- Single responsibility principle
- Use destructured props for cleaner code
- Use `useMemo` and `useCallback` for performance when needed
- Don't optimize prematurely - profile first
- Keep JSX readable and semantic
- Create JSDoc comments for functions:
```javascript
/**
 * Renders work experience with company details and bullet points
 * @param {Object} props - Component props
 * @param {string} props.role - Job role/title
 * @param {string} props.companyName - Name of the company
 * @param {Array<string>} props.description - List of job responsibilities
 * @returns {JSX.Element} Work experience component
 */
function WorkExperience({ role, companyName, description }) {
  // Component implementation
}
```

---

## 📊 State Management
- `useState` for local component state
- `useEffect` for side effects and lifecycle
- Custom hooks for reusable state logic
- `useMemo` for expensive computations
- `useCallback` for stable function references
- Context API for global state (when needed)

---

## 🖼 JSX Templates
- Keep JSX clean and readable
- Use conditional rendering with `&&` or ternary operators
- Map over arrays for dynamic lists
- Always provide `key` props for list items
- Use fragments `<>` to avoid wrapper divs

---

## 🧑‍🦽 Accessibility
- Semantic HTML
- Keyboard operability
- ARIA labels for icon-only buttons
- Test with screen readers

---

## Custom Hooks
- Start with "use" prefix
- Single responsibility
- Return objects for multiple values
- Handle loading and error states
- Clean up effects properly

---

## 🎨 Tailwind CSS & Design System

This portfolio uses a carefully curated design system with Tailwind CSS for consistent, beautiful styling.

### 🎨 Brand Colors & Typography
```css
/* Custom brand colors */
:root {
  --color-amber-50: #FFFBEB;  /* Main background */
  --color-gray-800: #1f2937;  /* Primary text */
  --color-gray-600: #4b5563;  /* Secondary text */
  --color-gray-500: #6b7280;  /* Muted text */
}
```

### 📝 Typography System
- **Primary Font**: Tiempos (serif) - for headings and important text
- **Secondary Font**: Poppins (sans-serif) - for body text and UI elements
- **System Fallback**: System fonts as fallback for performance

### 🎨 Design Tokens
```javascript
// Tailwind classes used throughout the project
const designTokens = {
  colors: {
    background: 'bg-amber-50',      // Warm, professional background
    textPrimary: 'text-gray-900',   // High contrast headings
    textSecondary: 'text-gray-600', // Comfortable reading
    textMuted: 'text-gray-500'      // Subtle information
  },
  typography: {
    heading: 'font-tiempos',        // Elegant serif for headings
    body: 'font-poppins',           // Clean sans-serif for content
    sizes: {
      hero: 'text-4xl',             // Main name/title
      section: 'text-2xl',          // Section headings
      subsection: 'text-xl',        // Job titles
      body: 'text-base',            // Standard content
      small: 'text-sm'              // Meta information
    }
  },
  spacing: {
    container: 'max-w-4xl',         // Content width
    section: 'mt-12',               // Section spacing
    element: 'mb-8'                 // Element spacing
  }
}
```

### 🧩 Component Architecture Example
This portfolio follows a clean component structure:
```jsx
// Example: WorkExperience Component
import PropTypes from 'prop-types'

function WorkExperience({ 
  companyImage, 
  role, 
  companyName, 
  location, 
  startDate, 
  endDate, 
  description 
}) {
  return (
    <div className="flex gap-4 mb-8">
      {/* Company Image */}
      <div className="flex-shrink-0">
        <img 
          src={companyImage} 
          alt={`${companyName} logo`}
          className="w-12 h-12 rounded object-cover"
        />
      </div>

      {/* Work Details */}
      <div className="flex-1">
        <h3 className="font-tiempos text-lg font-bold text-gray-900">{role}</h3>
        <p className="font-poppins text-base text-gray-700 mb-1">{companyName}</p>
        <p className="font-poppins text-sm text-gray-500 mb-2">
          {location} • {startDate} - {endDate}
        </p>
        
        {/* Dynamic bullet points */}
        <ul className="font-poppins text-sm text-gray-600 leading-relaxed space-y-1">
          {Array.isArray(description) ? (
            description.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2 text-gray-400">•</span>
                <span>{item}</span>
              </li>
            ))
          ) : (
            <li className="flex items-start">
              <span className="mr-2 text-gray-400">•</span>
              <span>{description}</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

// PropTypes for type safety
WorkExperience.propTypes = {
  companyImage: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  companyName: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]).isRequired,
}

export default WorkExperience
```

### ⚡ Custom Hook Example
```javascript
// hooks/useWorkExperience.js
import { useState, useEffect } from 'react'

const GITHUB_RAW_URL = 'https://raw.githubusercontent.com/jenul-ferdinand/resume/refs/heads/main/data/work_experience.json'

export function useWorkExperience() {
  const [workExperiences, setWorkExperiences] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWorkExperience = async () => {
      try {
        const response = await fetch(GITHUB_RAW_URL)
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`)
        }
        const data = await response.json()
        setWorkExperiences(data.experiences || [])
        setError(null)
      } catch (err) {
        console.warn('Failed to fetch work experience from GitHub:', err.message)
        setError(err.message)
        // Fallback to local data if needed
        setWorkExperiences(getFallbackData())
      } finally {
        setLoading(false)
      }
    }

    fetchWorkExperience()
  }, [])

  return { workExperiences, loading, error }
}
```

### 🎨 Styling Best Practices
- Use Tailwind utility classes for consistent styling
- Create reusable components for repeated patterns
- Keep custom CSS minimal - prefer Tailwind utilities
- Use semantic class names when custom CSS is needed

### ♿ Accessibility
- Use semantic HTML elements (`article`, `header`, `time`)
- Provide meaningful `alt` text for images
- Ensure proper heading hierarchy (h1, h2, h3)
- Test with keyboard navigation
- Maintain good color contrast (gray-900 on amber-50)

### ⚡ Performance Optimizations
- Use `useMemo` for expensive computations
- Implement proper `key` props for dynamic lists
- Optimize images (consider lazy loading for large lists)
- Use React.StrictMode for development
- Profile before optimizing

### 🚀 Deployment & CI/CD
This portfolio uses GitHub Actions for automated deployment to GitHub Pages:

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: ["main"]
  repository_dispatch:
    types: [resume-updated]  # Triggered by resume repo updates

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v4
        with:
          path: './dist'
```

### 🔄 Dynamic Data Integration
- Work experience data fetched from separate GitHub repository
- Automatic portfolio updates when resume is updated
- Fallback data for offline/error scenarios
- Loading states for better UX

### 📱 Responsive Design
- Mobile-first approach with Tailwind breakpoints
- Flexible layouts using CSS Grid and Flexbox
- Readable typography at all screen sizes
- Touch-friendly interactive elements

---

## 🚫 What Not To Do
- ❌ Don't use class components (use functional components)
- ❌ Don't mutate state directly (use setState)
- ❌ Don't forget useEffect cleanup functions
- ❌ Don't use index as key for dynamic lists
- ❌ Don't optimize prematurely (profile first)
- ❌ Don't mix CSS frameworks (stick to Tailwind)
- ❌ Don't break the Rules of Hooks

---

## 🔍 Git & PR Guidelines
- **Conventional Commits**: Use standard format (feat:, fix:, chore:, refactor:, docs:, test:)
- **NO Claude Attribution**: Do NOT sign commits with Claude email or add "Generated by Claude" messages
- **Clean Commit History**: Commits should appear as natural developer contributions
- One focused change per PR
- Document complex logic or design decisions with multi-line commit messages

### 📝 Commit Message Examples
```bash
# ✅ Good - Simple, conventional format
feat: add loading overlay with branded animation
fix: resolve font loading FOUC issue
chore: update CLAUDE.md documentation

# ✅ Good - Multi-line for complex features
feat: implement dynamic work experience integration

- Add custom useWorkExperience hook for GitHub API calls
- Create WorkExperience component with bullet point support
- Implement loading states and error handling with fallback data
- Add PropTypes validation for type safety

# ✅ Good - Multi-line for comprehensive changes
fix: resolve font loading and FOUC issues

- Add critical font preloading in index.html
- Update CSS comment syntax from // to /* */
- Implement loading overlay to prevent flash of unstyled content
- Configure font-display: swap for better performance

# ❌ Bad - Avoid Claude attribution
feat: add loading overlay 🤖 Generated with Claude Code
fix: resolve fonts - Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## ✅ Tooling
- Vite for fast development and building
- ESLint + Prettier for code quality
- Tailwind CSS for utility-first styling
- PropTypes for runtime type checking
- GitHub Actions for automated deployment

---

## 📚 Documentation
- `CLAUDE.md` → This engineering guide
- `README.md` → Project overview and setup
- Update this guide when major dependencies change

---

## 👁‍🗨 Quick Visual Checks using Playwright MCP
IMMEDIATELY after implementing any front-end change:
1. **Identify what changed** - Review the modified components/pages.
2. **Navigate to affected pages** - Use `mcp__playwright__browser_navigate` to visit each changed view
3. **Validate feature implementation** - Ensure the change fulfills the user's specific request
4. **Check acceptance criteria** - Review any provided context files or requirements
5. **Capture evidence** - Take full page screenshot at desktop viewport (1440px) of each changed view
6. **Check for errors** - Run `mcp__playwright__browser_console_messages`

This verification ensures changes meet design standards and user requirements.

---

## 💬 Design Review
Invoke the `@agent-design-review` subagent for thorough design validation when:
- Completing significant UI/UX features
- Before finalising PRs with visual changes
- Needing comprehensive accessibility and responsiveness testing

---

### 🚀 In Summary
This portfolio engineering guide enforces:

**🎨 Design & Branding:**
- Elegant typography combining Tiempos (serif) + Poppins (sans-serif)
- Warm, professional amber-50 background with sophisticated gray text hierarchy
- Branded loading experience with name reveal animation
- Clean, minimalist layout focused on readability

**⚡ Technical Architecture:**
- React 18 functional components with modern hooks pattern
- Custom `useWorkExperience` hook for dynamic GitHub API integration
- Tailwind CSS utility-first styling for consistent design system
- Vite for lightning-fast development and optimized production builds

**🔄 Dynamic Data Integration:**
- Work experience automatically synced from separate resume repository
- Cross-repository GitHub Actions workflow for seamless updates
- Graceful fallback data and loading states for robust UX
- Single source of truth maintaining consistency across platforms

**🚀 Deployment & Performance:**
- Automated GitHub Pages deployment with custom domain (`jenulferdinand.dev`)
- Optimized font loading with preload hints to prevent FOUC
- Performance-focused React patterns (`useMemo`, proper keys, semantic JSX)
- Mobile-responsive design with accessibility-first approach

**📋 Development Practices:**
- KISS & YAGNI principles for maintainable, focused code
- Conventional commits and systematic PR workflows
- Component-driven architecture with clear separation of concerns
- PropTypes for runtime type safety and developer experience

**Focus**: A professional portfolio that elegantly showcases work experience through beautiful typography, seamless data integration, and thoughtful user experience design.