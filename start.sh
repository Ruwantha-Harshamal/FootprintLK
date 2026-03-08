#!/bin/bash
# start.sh - Deployment script for FootprintLK
# This script starts both the backend API and the frontend Next.js application

# Exit on error
set -e

echo "Starting FootprintLK Deployment..."

# 1. Start the Python Backend
echo "Starting FastAPI Backend..."
cd backend
# Create virtual environment if it doesn't exist (useful for deployment environments)
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi
source venv/bin/activate
pip install -r requirements.txt
# Start the backend in the background
uvicorn main:app --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!
cd ..

# 2. Start the Frontend
echo "Starting Next.js Frontend..."
cd frontend
npm install
npm run build
# Start frontend in the foreground
npm start

# Trap SIGINT and SIGTERM to kill background processes
trap "kill $BACKEND_PID" SIGINT SIGTERM EXIT
