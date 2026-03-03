# Skill Nexus Backend

AI-powered career development platform backend.

## Architecture
- **Layered Architecture**: Routes -> Controllers -> Services -> Models
- **Security**: JWT, Bcrypt, Helmet, Rate Limiting
- **Database**: PostgreSQL with Sequelize ORM

## Getting Started
1. `npm install`
2. `npm run dev`

## Deployment
- **Docker**: `docker build -t skill-nexus-backend .`
- **Cloud**: Ready for Google Cloud Run
