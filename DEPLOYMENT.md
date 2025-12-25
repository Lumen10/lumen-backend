# 🚀 Render Deployment Guide

This guide will help you deploy your Strapi backend to Render so your frontend can access the content.

## Prerequisites

1. A Render account ([Sign up here](https://render.com))
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
   git commit -m "Prepare for Render deployment"
   git push origin main
   ```

2. **Verify your `.gitignore` excludes sensitive files:**
   - `.env` files should be ignored (already configured)
   - `node_modules/` should be ignored
   - Database files should be ignored

## Step 3: Create PostgreSQL Database on Render

1. **Log in to Render:**
   - Go to [https://render.com](https://render.com)
   - Sign in or create an account

2. **Create a PostgreSQL Database:**
   - Click "New +" → "PostgreSQL"
   - Name it (e.g., `lumen-strapi-db`)
   - Choose a plan (Starter is fine for development)
   - Select a region close to your users
   - Click "Create Database"
   - **Important:** Copy the **Internal Database URL** - you'll need this later

## Step 4: Deploy Web Service to Render

1. **Create a New Web Service:**
   - Click "New +" → "Web Service"
   - Connect your Git repository (GitHub/GitLab/Bitbucket)
   - Select the repository containing this Strapi project
   - Choose the branch (usually `main` or `master`)

2. **Configure the Service:**
   - **Name**: `lumen-strapi-backend` (or your preferred name)
   - **Environment**: `Node`
   - **Region**: Same region as your database
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: Leave empty (or `./` if needed)
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start` (or `npm run start`)
   - **Plan**: Choose a plan (Starter is fine to start)
   - **Important**: Make sure to use `npm` commands, not `yarn`. The `package.json` has been configured to use npm.

3. **Configure Environment Variables:**
   In the Render dashboard, add these environment variables:
   
   ```
   NODE_ENV=production
   HOST=0.0.0.0
   PORT=10000
   DATABASE_CLIENT=postgres
   DATABASE_URL=<your_postgres_internal_database_url>
   DATABASE_SSL=true
   DATABASE_SSL_REJECT_UNAUTHORIZED=false
   APP_KEYS=<generated_keys_from_step_1>
   ADMIN_JWT_SECRET=<generated_secret>
   API_TOKEN_SALT=<generated_salt>
   TRANSFER_TOKEN_SALT=<generated_salt>
   ENCRYPTION_KEY=<generated_key>
   ```
   
   **Important Notes:**
   - Use the **Internal Database URL** from your PostgreSQL service (not the external one)
   - The Internal URL is only accessible from other Render services
   - Render automatically sets `PORT=10000` - don't override it
   - All secrets should be the ones you generated in Step 1

4. **Link the Database:**
   - In the "Environment" section, click "Link Database"
   - Select your PostgreSQL database
   - This will automatically add `DATABASE_URL` if you haven't set it manually

5. **Deploy:**
   - Click "Create Web Service"
   - Render will:
     - Install dependencies
     - Build your project
     - Start the server
     - Connect to the database

## Step 5: Configure Your Frontend

Once deployed, Render will provide you with:
- **Admin Panel URL**: `https://your-service-name.onrender.com/admin`
- **API URL**: `https://your-service-name.onrender.com/api`

Update your frontend configuration to use the API URL:
- Update your frontend's API endpoint to point to the Render URL
- Ensure CORS is configured (already done in `config/middlewares.ts`)

## Step 6: Initial Setup

1. **Access the Admin Panel:**
   - Go to your admin panel URL (e.g., `https://your-service-name.onrender.com/admin`)
   - Create your first admin user

2. **Configure Content Types:**
   - Your content types (Article, Author, Category, About, Global) are already defined
   - Start adding content through the admin panel

3. **Set Up API Tokens:**
   - Go to Settings → API Tokens
   - Create a new API token for your frontend
   - Copy the token and add it to your frontend's environment variables

## Step 7: Update CORS (if needed)

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

## Step 8: Configure Media Storage (Optional)

By default, uploads are stored on disk. For production, consider:

1. **Using Cloudinary** (Recommended for production):
   - Sign up at [Cloudinary](https://cloudinary.com)
   - Install the plugin: `npm install @strapi/provider-upload-cloudinary`
   - Configure in `config/plugins.ts`

2. **Using AWS S3**:
   - Install: `npm install @strapi/provider-upload-aws-s3`
   - Configure with your AWS credentials

## Troubleshooting

### Build Fails / Yarn/Corepack Errors
- **If you see "yarn start" or Corepack errors**: The `packageManager` field has been removed from `package.json` to force npm usage
- Ensure your Render service uses `npm start` (or `npm run start`) as the start command, not `yarn start`
- Check that all dependencies are in `package.json`
- Ensure Node.js version matches (20.x - 24.x)
- Check build logs in Render dashboard
- Verify `pg` package is installed (already added)
- If Render still tries to use yarn, manually set the start command to `npm start` in the Render dashboard

### Database Connection Issues / SSL Certificate Errors
- **If you see "self-signed certificate" errors**: Add `DATABASE_SSL_REJECT_UNAUTHORIZED=false` to your environment variables
- Verify `DATABASE_URL` is set correctly (use Internal Database URL)
- Check that `DATABASE_CLIENT=postgres` is set
- Ensure `DATABASE_SSL=true` is set
- Add `DATABASE_SSL_REJECT_UNAUTHORIZED=false` to accept Render's self-signed certificates
- Verify the database service is running

### Service Won't Start / Port Issues
- **If you see "No open ports detected"**: Ensure `PORT=10000` is set in environment variables
- Check the logs in Render dashboard
- Verify all environment variables are set
- Ensure `PORT=10000` (Render's default port)
- Check that `HOST=0.0.0.0` is set
- Verify the start command is `npm start` (not `yarn start`)

### CORS Errors
- Verify your frontend URL is in the CORS origin list in `config/middlewares.ts`
- Check that headers are properly configured
- Ensure your frontend is sending requests with proper headers

### Environment Variables
- Double-check all required variables are set
- Ensure keys are properly formatted (no extra spaces)
- Regenerate keys if you suspect they're incorrect
- Verify `APP_KEYS` has 4 comma-separated values

### Service Goes to Sleep (Free Tier)
- Render free tier services spin down after 15 minutes of inactivity
- First request after spin-down may take 30-60 seconds
- Consider upgrading to a paid plan for always-on service

## Post-Deployment Checklist

- [ ] PostgreSQL database is created and running
- [ ] Web service is deployed and running
- [ ] Admin panel is accessible
- [ ] Admin user created
- [ ] Content types are visible
- [ ] API is accessible from frontend
- [ ] CORS is working correctly
- [ ] API tokens are configured
- [ ] Frontend can fetch data successfully

## Render-Specific Tips

1. **Auto-Deploy**: Render automatically deploys on every push to your main branch
2. **Manual Deploy**: You can manually trigger deployments from the dashboard
3. **Logs**: Access real-time logs from the Render dashboard
4. **Metrics**: Monitor your service performance in the dashboard
5. **Custom Domain**: Add your custom domain in the service settings

## Additional Resources

- [Render Documentation](https://render.com/docs)
- [Strapi Deployment Guide](https://docs.strapi.io/dev-docs/deployment)
- [Render Strapi Examples](https://github.com/render-examples)

## Need Help?

If you encounter issues:
1. Check the Render deployment logs
2. Review the Strapi documentation
3. Check Render's status page
4. Contact Render support

---

**Your project is now ready for deployment on Render! 🎉**
