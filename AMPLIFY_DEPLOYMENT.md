# AWS Amplify Deployment Guide

## Prerequisites
- AWS Account
- GitHub repository with your code pushed

## Deployment Steps

### 1. Push Your Code to GitHub
```bash
git add .
git commit -m "Prepare for Amplify deployment"
git push origin main
```

### 2. Deploy with AWS Amplify

#### Option A: Via AWS Console (Recommended)

1. **Go to AWS Amplify Console**
   - Navigate to https://console.aws.amazon.com/amplify/
   - Click "New app" → "Host web app"

2. **Connect Repository**
   - Select "GitHub" as your Git provider
   - Authorize AWS Amplify to access your repositories
   - Select the `port-chops` repository
   - Choose the `main` branch

3. **Configure Build Settings**
   - Amplify will auto-detect the `amplify.yml` file
   - The build settings are already configured in `/amplify.yml`
   - Review and confirm the settings

4. **Deploy**
   - Click "Save and deploy"
   - AWS Amplify will build and deploy your app
   - Deployment typically takes 3-5 minutes

5. **Access Your Site**
   - Once deployed, you'll receive a URL like: `https://main.d3xxxxxxxxxxx.amplifyapp.com`
   - You can configure a custom domain in the Amplify console

#### Option B: Via Amplify CLI

1. **Install Amplify CLI**
   ```bash
   npm install -g @aws-amplify/cli
   ```

2. **Configure AWS Credentials**
   ```bash
   amplify configure
   ```

3. **Initialize Amplify**
   ```bash
   amplify init
   ```

4. **Add Hosting**
   ```bash
   amplify add hosting
   ```
   - Select "Hosting with Amplify Console"
   - Choose "Continuous deployment"

5. **Publish**
   ```bash
   amplify publish
   ```

### 3. Configure Custom Domain (Optional)

1. In the Amplify Console, go to "Domain management"
2. Click "Add domain"
3. Enter your domain name
4. Follow the instructions to update your DNS settings
5. SSL certificate will be automatically provisioned

### 4. Environment Variables (If Needed)

If you need to add environment variables:

1. Go to your app in Amplify Console
2. Navigate to "Environment variables"
3. Add variables:
   ```
   NUXT_PUBLIC_SITE_URL=https://yourdomain.com
   ```

## Build Configuration

The `amplify.yml` file in the root directory configures the build process:

- **Node Version**: 20
- **Build Command**: `npm run build`
- **Output Directory**: `.output/public`
- **Cache**: node_modules and .nuxt folder

## Automatic Deployments

AWS Amplify automatically deploys when you push to the connected branch:

```bash
git add .
git commit -m "Update content"
git push origin main
```

Amplify will detect the push and automatically rebuild and redeploy.

## Monitoring

- **Build Logs**: View real-time build logs in the Amplify Console
- **Performance**: Monitor app performance in the AWS Console
- **Errors**: Check CloudWatch logs for runtime errors

## Troubleshooting

### Build Fails
- Check build logs in Amplify Console
- Ensure `amplify.yml` is in the root directory
- Verify Node version is 20 or higher

### App Not Loading
- Check that `nitro.preset` is set to `'aws-amplify'` in `nuxt.config.ts`
- Verify build output directory is `.output/public`

### Environment Variables
- Make sure environment variables are set in Amplify Console
- Prefix Nuxt public variables with `NUXT_PUBLIC_`

## Cost Estimate

AWS Amplify pricing (as of 2025):
- **Build minutes**: $0.01 per minute
- **Hosting**: $0.15 per GB served
- **Free tier**: 1000 build minutes/month, 15 GB served/month

Small sites typically stay within free tier limits.

## Support

For issues:
- AWS Amplify Docs: https://docs.amplify.aws/
- AWS Support: https://console.aws.amazon.com/support/
- Nuxt Deployment Docs: https://nuxt.com/deploy/aws-amplify

---

**Your app is now ready for AWS Amplify deployment!**
