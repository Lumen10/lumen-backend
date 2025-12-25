# Environment Variables Template

Use this template to set up your environment variables for Render deployment.

## Required Environment Variables

Generate secure keys by running:
```bash
node generate-env-keys.js
```

Then set these in your Render dashboard:

```env
# Environment
NODE_ENV=production
HOST=0.0.0.0
PORT=10000

# Database (PostgreSQL on Render)
DATABASE_CLIENT=postgres
DATABASE_URL=postgresql://user:password@host:port/database
DATABASE_SSL=true
DATABASE_SSL_REJECT_UNAUTHORIZED=false

# App Keys (4 keys, comma-separated)
APP_KEYS=key1,key2,key3,key4

# Admin Panel Secrets
ADMIN_JWT_SECRET=your_generated_secret
API_TOKEN_SALT=your_generated_salt
TRANSFER_TOKEN_SALT=your_generated_salt
ENCRYPTION_KEY=your_generated_key
```

## Generate ENCRYPTION_KEY

If you need to generate the ENCRYPTION_KEY separately:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Notes

- **Database**: Use the **Internal Database URL** from your Render PostgreSQL service
- **Host/Port**: Render uses `HOST=0.0.0.0` and `PORT=10000` by default
- **CORS**: Already configured in `config/middlewares.ts` for your frontend domain
- **DATABASE_URL**: Render provides this automatically when you link a database, or you can copy it from the database service

## Security

⚠️ **Never commit these values to Git!**
- All `.env` files are in `.gitignore`
- Only set these in the Render dashboard
- Use different keys for development and production
- Use the Internal Database URL (not external) for better security

