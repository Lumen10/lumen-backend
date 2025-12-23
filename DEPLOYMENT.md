# 🚀 Strapi Cloud Deployment Guide

This guide will help you deploy your Strapi backend to Strapi Cloud so your frontend can access the content.

## Prerequisites

1. A Strapi Cloud account ([Sign up here](https://cloud.strapi.io))
2. Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)
3. Generated environment variables (see below)

## Step 1: Generate Environment Variables

Before deploying, you need to generate secure environment variables. Run:

```bash
node generate-env-keys.js
```

This will generate secure random keys for:
- `APP_KEYS` (4 keys, comma-separated)
- `API_TOKEN_SALT`
- `ADMIN_JWT_SECRET`
- `TRANSFER_TOKEN_SALT`
- `JWT_SECRET`
- `ENCRYPTION_KEY` (you'll need to generate this separately)

**Note:** For `ENCRYPTION_KEY`, you can generate it using:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Step 2: Prepare Your Repository

1. **Ensure your code is committed and pushed to Git:**
   ```bash
   git add .
   git commit -m "Prepare for Strapi Cloud deployment"
   git push origin main
   ```

2. **Verify your `.gitignore` excludes sensitive files:**
   - `.env` files should be ignored (already configured)
   - `node_modules/` should be ignored
   - Database files should be ignored

## Step 3: Deploy to Strapi Cloud

1. **Log in to Strapi Cloud:**
   - Go to [https://cloud.strapi.io](https://cloud.strapi.io)
   - Sign in or create an account

2. **Create a New Project:**
   - Click "Create Project" or "New Project"
   - Connect your Git repository (GitHub/GitLab/Bitbucket)
   - Select the repository containing this Strapi project
   - Choose the branch (usually `main` or `master`)

3. **Configure Environment Variables:**
   In the Strapi Cloud dashboard, add these environment variables:
   
   ```
   APP_KEYS=<generated_keys_from_step_1>
   ADMIN_JWT_SECRET=<generated_secret>
   API_TOKEN_SALT=<generated_salt>
   TRANSFER_TOKEN_SALT=<generated_salt>
   ENCRYPTION_KEY=<generated_key>
   NODE_ENV=production
   ```
   
   **Important:** 
   - Strapi Cloud automatically provides database configuration (PostgreSQL)
   - You don't need to set `DATABASE_*` variables manually
   - The `HOST` and `PORT` are also configured automatically

4. **Deploy:**
   - Click "Deploy" or "Start Deployment"
   - Strapi Cloud will:
     - Install dependencies
     - Build your project
     - Start the server
     - Set up the database

## Step 4: Configure Your Frontend

Once deployed, Strapi Cloud will provide you with:
- **Admin Panel URL**: `https://your-project-name.strapi.app/admin`
- **API URL**: `https://your-project-name.strapi.app/api`

Update your frontend configuration to use the API URL:
- Update your frontend's API endpoint to point to the Strapi Cloud URL
- Ensure CORS is configured (already done in `config/middlewares.ts`)

## Step 5: Initial Setup

1. **Access the Admin Panel:**
   - Go to your admin panel URL
   - Create your first admin user

2. **Configure Content Types:**
   - Your content types (Article, Author, Category, About, Global) are already defined
   - Start adding content through the admin panel

3. **Set Up API Tokens:**
   - Go to Settings → API Tokens
   - Create a new API token for your frontend
   - Copy the token and add it to your frontend's environment variables

## Step 6: Update CORS (if needed)

If your frontend URL changes, update `config/middlewares.ts`:

```typescript
{
  name: 'strapi::cors',
  config: {
    enabled: true,
    origin: [
      "https://your-frontend-domain.com",
      "https://www.your-frontend-domain.com"
    ],
    headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
  },
},
```

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Ensure Node.js version matches (20.x - 24.x)
- Check build logs in Strapi Cloud dashboard

### Database Issues
- Strapi Cloud automatically sets up PostgreSQL
- No manual database configuration needed
- If issues occur, check environment variables

### CORS Errors
- Verify your frontend URL is in the CORS origin list
- Check that headers are properly configured
- Ensure your frontend is sending requests with proper headers

### Environment Variables
- Double-check all required variables are set
- Ensure keys are properly formatted (no extra spaces)
- Regenerate keys if you suspect they're incorrect

## Post-Deployment Checklist

- [ ] Admin panel is accessible
- [ ] Admin user created
- [ ] Content types are visible
- [ ] API is accessible from frontend
- [ ] CORS is working correctly
- [ ] API tokens are configured
- [ ] Frontend can fetch data successfully

## Additional Resources

- [Strapi Cloud Documentation](https://docs.strapi.io/cloud)
- [Strapi Deployment Guide](https://docs.strapi.io/dev-docs/deployment)
- [Strapi Cloud Support](https://support.strapi.io)

## Need Help?

If you encounter issues:
1. Check the Strapi Cloud deployment logs
2. Review the Strapi documentation
3. Contact Strapi support

---

**Your project is now ready for deployment! 🎉**

