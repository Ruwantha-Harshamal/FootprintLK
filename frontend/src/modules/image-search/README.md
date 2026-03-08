# Module 3: Image Prediction (Face Recognition)

## Purpose
Detects if user's images appear online through advanced face recognition technology.

## Features
- ✅ Image upload with drag-and-drop
- ✅ Face detection and extraction
- ✅ Similarity search using FAISS
- ✅ Results with confidence scores
- ✅ Source website tracking
- ✅ Search history

## Folder Structure
```
image-search/
├── components/          # UI components for this module
│   ├── ImageUploader.tsx        # Drag-and-drop upload
│   ├── ImagePreview.tsx         # Preview uploaded image
│   ├── SearchResults.tsx        # Display search results
│   ├── SimilarityCard.tsx       # Individual result card
│   ├── FaceComparisonSlider.tsx # Side-by-side comparison
│   └── SearchHistory.tsx        # Past searches
├── hooks/              # Custom hooks
│   ├── useImageSearch.ts        # Search logic
│   └── useImageUpload.ts        # Upload logic
├── services/           # API services
│   └── imageSearchApi.ts        # Backend API calls
└── types/              # TypeScript types
    └── index.ts                 # Search result types
```

## Backend Status
✅ **ACTIVE** - Existing Flask backend (`User/backend/app.py`)
- FAISS index with 98 face embeddings
- FaceNet + MTCNN face detection
- SQLite database integration

## Technology Stack
- **Frontend:** React dropzone, image preview
- **Backend:** Python Flask + FaceNet + FAISS
- **Database:** SQLite (face_recognition.db)
- **ML Models:** MTCNN (detection) + FaceNet (embeddings)

## API Endpoints
```
POST /api/search       - Upload image and search
GET  /api/history      - Get search history
GET  /api/result/:id   - Get specific result
DELETE /api/result/:id - Delete result
GET  /api/stats        - Get system statistics
```

## Status
✅ **READY TO BUILD** - Backend fully operational
