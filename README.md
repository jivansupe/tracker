# Full Stack Application with React and FastAPI

This project consists of a React frontend with TypeScript and a FastAPI backend.

## Project Structure

## Backend Setup

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)

### Steps to Run Backend

1. Create and activate virtual environment:
```bash
cd be
python -m venv venv
source venv/bin/activate  # Linux/Mac
./venv/Scripts/activate   # Windows
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up the database:
```bash
# Create database
createdb manager_db

# Run migrations
alembic upgrade head

# Create admin user
python scripts/create_admin.py
```

4. Start the server:
```bash
python run.py
```

Admin credentials:
- Username: admin
- Password: admin

The backend will be running at http://localhost:8000

## Frontend Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (Node package manager)

### Steps to Run Frontend

1. Install dependencies:
```bash
cd fe
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Type check:
```bash
npm run type-check
```

The frontend will be running at http://localhost:5173

## API Documentation

The backend provides API documentation at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Notes

- The backend uses FastAPI's automatic API documentation
- The frontend is configured with:
    - TypeScript for type safety
    - ESLint for code quality
    - Vite for fast development and building
