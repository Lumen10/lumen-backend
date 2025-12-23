# Environment Variables Template

Use this template to set up your environment variables for Strapi Cloud deployment.

## Required Environment Variables

Generate secure keys by running:
```bash
node generate-env-keys.js
```

Then set these in your Strapi Cloud dashboard:

```env
# App Keys (4 keys, comma-separated)
APP_KEYS=key1,key2,key3,key4

# Admin Panel Secrets
ADMIN_JWT_SECRET=your_generated_secret
API_TOKEN_SALT=your_generated_salt
TRANSFER_TOKEN_SALT=your_generated_salt
ENCRYPTION_KEY=your_generated_key

# Environment
NODE_ENV=production
```

## Generate ENCRYPTION_KEY

If you need to generate the ENCRYPTION_KEY separately:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Notes

- **Database**: Strapi Cloud automatically configures PostgreSQL - no manual setup needed
- **Host/Port**: Automatically configured by Strapi Cloud
- **CORS**: Already configured in `config/middlewares.ts` for your frontend domain

## Security

⚠️ **Never commit these values to Git!**
- All `.env` files are in `.gitignore`
- Only set these in the Strapi Cloud dashboard
- Use different keys for development and production

