# Simple Chatroom

A real-time chat application built with Ruby on Rails and React, featuring WebSocket-powered instant messaging with a sleek, responsive UI.

**[Live Demo](https://simple-chatroom-bsn0.onrender.com/)**

## Table of Contents

- [Requirements](#requirements)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Database Setup](#database-setup)
  - [Running the Application](#running-the-application)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Requirements

- Ruby >= 3.4.7
- Rails >= 8.1.0
- Node.js >= 22.14.0
- PostgreSQL >= 14
- Redis (for Action Cable)

## Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd simple-chatroom
   ```

2. **Setup environment variables**
   
   For development, update `config/database.yml` with your PostgreSQL credentials:
   ```yaml
   development:
     <<: *default
     database: simple_chatroom_development
     host: localhost
     username: your_username
     password: your_password
   ```
   
   For production (Render), set these environment variables:
   ```env
   # Rails
   RAILS_MASTER_KEY=your_rails_master_key
   RAILS_ENV=production
   
   # Database (auto-configured by Render)
   DATABASE_URL=postgresql://...
   
   # Redis (auto-configured by Render)
   REDIS_URL=redis://...
   
   # Action Cable
   ALLOWED_ORIGIN=https://your-domain.onrender.com
   ACTION_CABLE_URL=wss://your-domain.onrender.com/cable
   
   # Node.js (for Render build)
   NODE_VERSION=22.14.0
   ```

3. **Install dependencies**
   ```bash
   # Install Ruby gems
   bundle install
   
   # Install Node packages
   npm install
   ```

### Database Setup

1. **Create and migrate database**
   ```bash
   bin/rails db:create db:migrate
   ```

2. **Seed with initial data**
   ```bash
   bin/rails db:seed
   ```
   
   This will create a "Global Chat" chatroom.

3. **Add a new migration (optional, only for development)**
   ```bash
   bin/rails generate migration MigrationName
   ```
   Example:
   ```bash
   bin/rails generate migration AddIndexToMessages
   ```

### Running the Application

1. **Start Redis**
   ```bash
   sudo systemctl start redis-server
   # or
   redis-server
   ```

2. **Start the development server**
   ```bash
   # Start Rails + Vite dev servers
   bin/dev
   ```

The application will be available at:
- Frontend: `http://localhost:3000`
- WebSocket: `ws://localhost:3000/cable`

## Deployment

### Build Process

The build script (`bin/render-build.sh`) automatically:
1. Installs Ruby gems (`bundle install`)
2. Installs Node packages (`npm install`)
3. Builds frontend assets (`bin/rails assets:precompile`)
4. Runs database migrations (`bin/rails db:migrate`)
5. Seeds initial data (`bin/rails db:seed`)

## Troubleshooting

### Vite build fails
```bash
# Ensure Node.js version is 22.14.0+
node --version

# Clear cache and reinstall
rm -rf node_modules/.vite
npm install

# Manual build test
npm run build
```

### WebSocket connection fails in production
- Verify `ALLOWED_ORIGIN` matches your domain
- Check `ACTION_CABLE_URL` uses `wss://` (not `ws://`)
- Ensure Redis is running and `REDIS_URL` is correct
- Check browser console for connection errors

### Database connection fails
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Verify credentials in config/database.yml
bin/rails db:migrate:status

# Recreate database if needed
bin/rails db:drop db:create db:migrate db:seed
```

### Tests failing
```bash
# Run all tests
bundle exec rspec

# Run specific test
bundle exec rspec spec/models/message_spec.rb

# Check test database
RAILS_ENV=test bin/rails db:migrate
```
