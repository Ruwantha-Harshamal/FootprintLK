# 🚀 FootprintLK Frontend - Quick Start Guide

## ✅ What's Been Built

### Phase 1A: Foundation (Complete)
- ✅ Next.js 16 + TypeScript + Tailwind v4
- ✅ shadcn/ui dark theme (Lyra preset)
- ✅ Authentication system (Login/Register)
- ✅ Dashboard layout with sidebar navigation
- ✅ Protected routes
- ✅ Modular folder structure (4 modules)

### Phase 1B: Image Search Module (Complete)
- ✅ **Full UI Implementation**
  - Image uploader with drag & drop
  - Search results with filtering/sorting
  - Search history with thumbnails
  - Statistics dashboard
- ✅ **Complete Backend Integration**
  - API service layer
  - Custom React hooks
  - TypeScript types
  - Error handling

---

## 🏃 Running the Project

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure Environment
Create `.env.local` in the `frontend/` directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production

# App Configuration
NEXT_PUBLIC_APP_NAME=FootprintLK
```

### 3. Start Development Server
```bash
npm run dev
```

Visit: **http://localhost:3000**

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                           # Next.js App Router
│   │   ├── (auth)/                   # ✅ Authentication pages
│   │   │   ├── login/page.tsx       # ✅ Login page
│   │   │   ├── register/page.tsx    # ✅ Register page
│   │   │   └── layout.tsx           # ✅ Auth layout
│   │   ├── (dashboard)/              # ✅ Protected dashboard
│   │   │   ├── dashboard/
│   │   │   │   ├── page.tsx         # ✅ Dashboard home
│   │   │   │   ├── image-search/    # ✅ FULLY IMPLEMENTED
│   │   │   │   ├── breach-detection/# ⏳ Placeholder
│   │   │   │   ├── social-media/    # ⏳ Placeholder
│   │   │   │   └── risk-scoring/    # ⏳ Placeholder
│   │   │   └── layout.tsx           # ✅ Dashboard layout
│   │   ├── globals.css              # ✅ Tailwind styles
│   │   └── layout.tsx               # ✅ Root layout
│   │
│   ├── modules/                      # ✅ Feature modules
│   │   └── image-search/            # ✅ COMPLETE MODULE
│   │       ├── components/          # 5 UI components
│   │       ├── hooks/               # 2 custom hooks
│   │       ├── services/            # API integration
│   │       ├── types/               # TypeScript types
│   │       ├── index.ts             # Module exports
│   │       └── README.md            # Documentation
│   │
│   ├── shared/                       # ✅ Shared resources
│   │   ├── components/layout/       # Sidebar, Navbar, Layout
│   │   ├── hooks/                   # useAuth
│   │   ├── services/                # API client, authService
│   │   ├── store/                   # Zustand stores
│   │   └── types/                   # Common types
│   │
│   ├── components/                   # ✅ shadcn/ui components
│   │   └── ui/                      # Button, Card, Input, etc.
│   │
│   ├── config/                       # ✅ Configuration
│   │   ├── site.config.ts           # Site metadata
│   │   └── api.config.ts            # API endpoints
│   │
│   └── lib/
│       └── utils.ts                 # ✅ Utility functions
│
├── .env.example                      # ✅ Environment template
├── tailwind.config.ts               # ✅ Tailwind configuration
├── tsconfig.json                    # ✅ TypeScript config
├── package.json                     # ✅ Dependencies
└── next.config.ts                   # ✅ Next.js config
```

---

## 🎯 Module Status

| Module | Status | Components | API | UI |
|--------|--------|------------|-----|-----|
| **Image Search** | ✅ Complete | 5/5 | ✅ | ✅ |
| **Breach Detection** | ⏳ Placeholder | 0/? | ❌ | ⏳ |
| **Social Media** | ⏳ Placeholder | 0/? | ❌ | ⏳ |
| **Risk Scoring** | ⏳ Placeholder | 0/? | ❌ | ⏳ |

---

## 🔗 Image Search Module - API Integration

The Image Search module is **fully implemented** and ready to connect to your backend.

### Required Backend Endpoints

#### 1. Upload & Search
```http
POST /api/search
Content-Type: multipart/form-data

Body: { file: File }

Response: {
  id: string,
  uploadedImage: string,
  uploadedAt: string,
  facesDetected: number,
  matches: [
    {
      id: string,
      similarity: number,
      imageUrl: string,
      sourceUrl: string,
      websiteName: string,
      detectedAt: string
    }
  ],
  totalMatches: number,
  processingTime: number,
  status: "completed" | "processing" | "failed"
}
```

#### 2. Get Search History
```http
GET /api/history?minSimilarity=70&limit=10

Response: {
  searches: SearchResult[],
  totalSearches: number,
  lastSearchAt: string
}
```

#### 3. Get Specific Result
```http
GET /api/result/:id

Response: SearchResult
```

#### 4. Delete Result
```http
DELETE /api/result/:id

Response: { success: boolean }
```

#### 5. Get Statistics
```http
GET /api/search/stats

Response: {
  totalSearches: number,
  totalMatches: number,
  averageSimilarity: number,
  mostSearchedDate: string,
  uniqueWebsites: number
}
```

### Testing the Module

1. **Without Backend** (Mock Data):
   - Components render correctly
   - UI interactions work
   - Error states display

2. **With Backend** (Real Data):
   - Update `NEXT_PUBLIC_API_URL` in `.env.local`
   - Ensure backend CORS is configured
   - Test file upload
   - Verify response formats match TypeScript types

---

## 🎨 UI Components Available

### shadcn/ui Components (Installed)
- ✅ Button
- ✅ Card
- ✅ Input
- ✅ Label
- ✅ Badge
- ✅ Progress
- ✅ Tabs
- ✅ Alert
- ✅ Avatar
- ✅ Dropdown Menu
- ✅ Form (react-hook-form + zod)

### Custom Components
- ✅ Sidebar (collapsible, responsive)
- ✅ Navbar (user menu, notifications)
- ✅ DashboardLayout (combines sidebar + navbar)
- ✅ ImageUploader (drag & drop)
- ✅ SearchResults (filtering, sorting)
- ✅ SimilarityCard (match display)
- ✅ SearchHistory (thumbnail grid)
- ✅ ImagePreview (uploaded image)

---

## 🔐 Authentication Flow

### Current Implementation (Frontend Only)
```typescript
// Login
const { login } = useAuth();
await login({ email, password });
// Stores token in Zustand + localStorage

// Register
const { register } = useAuth();
await register({ email, password, name });

// Protected Routes
// Automatically redirects to /login if not authenticated
```

### Backend Integration Needed
Update `authService.ts` to connect to your backend:
```typescript
// src/shared/services/authService.ts
export const authService = {
  login: async (credentials) => {
    // Change to your backend URL
    const response = await apiClient.post('/api/auth/login', credentials);
    return response.data;
  }
}
```

---

## 📦 Dependencies Overview

### Production Dependencies
```json
{
  "next": "^16.x",                      // Framework
  "react": "^19.x",                     // UI library
  "typescript": "^5.x",                 // Type safety
  "tailwindcss": "^4.x",               // Styling
  "zustand": "^5.x",                   // State management
  "axios": "^1.x",                     // HTTP client
  "react-hook-form": "^7.x",           // Form handling
  "zod": "^3.x",                       // Validation
  "lucide-react": "^0.468.0",          // Icons
  "recharts": "^2.15.0",               // Charts (ready to use)
  "next-auth": "^5.x",                 // Authentication
  "react-dropzone": "^14.x",           // File uploads
  "@radix-ui/react-*": "Multiple"      // UI primitives
}
```

---

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start dev server (http://localhost:3000)

# Build
npm run build        # Create production build
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking

# Component Generation (if needed)
npx shadcn@latest add [component-name]
```

---

## 🎯 Next Development Steps

### 1. Backend Integration (Priority)
- [ ] Connect Image Search API endpoints
- [ ] Test file upload with real backend
- [ ] Verify response formats
- [ ] Handle authentication tokens

### 2. Complete Authentication
- [ ] Connect login/register to backend
- [ ] Implement JWT refresh logic
- [ ] Add password reset flow
- [ ] Session persistence

### 3. Module 1: Breach Detection
- [ ] Design UI components
- [ ] Create API service
- [ ] Implement hooks
- [ ] Build main page

### 4. Module 2: Social Media
- [ ] Platform integration components
- [ ] Privacy score calculator
- [ ] Timeline visualization
- [ ] Recommendations system

### 5. Module 4: Risk Scoring
- [ ] Dashboard with Recharts
- [ ] Score breakdown view
- [ ] Historical trends
- [ ] PDF export

---

## 🐛 Common Issues & Solutions

### Issue: Module not found errors
```bash
# Solution: Clear cache and reinstall
rm -rf node_modules .next
npm install
```

### Issue: Port 3000 already in use
```bash
# Solution: Use different port
npm run dev -- -p 3001
```

### Issue: Environment variables not loading
```bash
# Solution: Restart dev server after changing .env.local
# Press Ctrl+C and run `npm run dev` again
```

### Issue: Tailwind styles not applying
```bash
# Solution: Rebuild
npm run build
npm run dev
```

---

## 📚 Documentation

- **Main README**: `frontend/README.md`
- **Progress Tracker**: `frontend/PROGRESS.md`
- **Image Search Module**: `frontend/IMAGE_SEARCH_MODULE.md`
- **Module READMEs**: Each module has its own README.md

---

## 🎉 What You Can Do Right Now

1. **View the Dashboard**
   - Run `npm run dev`
   - Navigate to `/dashboard`
   - See sidebar with all 4 modules

2. **Test Image Search UI**
   - Click "Image Prediction" in sidebar
   - Try drag & drop interface
   - See upload progress simulation
   - Explore tabs (Upload, Results, History)

3. **Test Authentication UI**
   - Visit `/login`
   - See form validation
   - Try register page

4. **Customize Styling**
   - Edit `tailwind.config.ts`
   - Modify theme colors
   - Add custom utilities

---

## 🚀 Production Deployment

### Build for Production
```bash
npm run build
npm run start
```

### Environment Variables (Production)
```env
NEXT_PUBLIC_API_URL=https://api.yourproduction.com
NEXTAUTH_URL=https://yourproduction.com
NEXTAUTH_SECRET=<generate-secure-secret>
```

### Recommended Platforms
- **Vercel** (Best for Next.js)
- **Netlify**
- **AWS Amplify**
- **Google Cloud Run**

---

## 💡 Tips for Development

1. **Use TypeScript**: All types are defined, leverage autocomplete
2. **Component Isolation**: Test components individually
3. **API Mocking**: Use MSW or similar for frontend-only development
4. **Console Logs**: Check browser console for errors
5. **Hot Reload**: Changes reflect instantly in dev mode
6. **File Organization**: Keep modules separate for easy maintenance

---

## 📞 Need Help?

1. Check `PROGRESS.md` for current status
2. Review module-specific README files
3. Inspect browser console for errors
4. Check TypeScript errors in IDE
5. Verify environment variables are set

---

**Current Status**: ✅ Phase 1B Complete  
**Ready for**: Backend integration + Module development  
**Estimated Progress**: ~35% Complete

Happy coding! 🎉
