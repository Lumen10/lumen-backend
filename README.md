# Lumen Website - Strapi Backend

Strapi CMS backend for the Lumen website.

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher (up to 24.x)
- npm 6.x or higher

### Installation

```bash
# Install dependencies
npm install
# or
yarn install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=your_app_keys_here
API_TOKEN_SALT=your_api_token_salt_here
ADMIN_JWT_SECRET=your_admin_jwt_secret_here
TRANSFER_TOKEN_SALT=your_transfer_token_salt_here
JWT_SECRET=your_jwt_secret_here

# Database (SQLite for development)
DATABASE_CLIENT=better-sqlite3
DATABASE_FILENAME=.tmp/data.db
```

### Development

Start the Strapi development server:

```bash
npm run develop
# or
yarn develop
```

The admin panel will be available at [http://localhost:1337/admin](http://localhost:1337/admin)

### Build

Build the admin panel for production:

```bash
npm run build
# or
yarn build
```

### Start Production Server

```bash
npm run start
# or
yarn start
```

## 📁 Project Structure

```
├── config/          # Strapi configuration files
├── database/        # Database migrations
├── public/          # Public assets and uploads
└── src/
    ├── api/         # API routes and controllers
    ├── components/  # Reusable components
    └── admin/       # Admin panel customizations
```

## 🔗 Frontend

This backend serves the Next.js frontend application. Make sure to configure the frontend with the correct API URL and token.

## 🚢 Deployment

### Render Deployment

This project is configured for deployment on **Render**. See the detailed guide in [DEPLOYMENT.md](./DEPLOYMENT.md) for step-by-step instructions.

**Quick Start:**
1. Generate environment variables: `node generate-env-keys.js`
2. Push your code to GitHub/GitLab/Bitbucket
3. Sign up at [Render](https://render.com)
4. Create a PostgreSQL database on Render
5. Create a Web Service and connect your repository
6. Configure environment variables in the Render dashboard
7. Deploy!

**Other Deployment Options:**
- **Strapi Cloud**: [https://cloud.strapi.io](https://cloud.strapi.io)
- **Railway**: [https://railway.app](https://railway.app)
- **DigitalOcean**: [https://www.digitalocean.com](https://www.digitalocean.com)

For detailed Render deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## 📚 Tech Stack

- **CMS**: Strapi 5.32.0
- **Database**: SQLite (development) / PostgreSQL/MySQL (production)
- **Language**: TypeScript

## 🔐 Security

- Never commit `.env` files
- Use strong secrets for production
- Configure CORS properly for production
- Use environment-specific database configurations
