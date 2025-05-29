# Cloudflare Pages Deployment Guide for UberDrip

## 🔧 Fixed Configuration for Cloudflare Pages Dashboard:

### 1. Project Configuration:
- **Name**: `uberdrip`
- **GitHub repo**: `SilverBtc/UberDrip`
- **Branch**: `main`
- **Root directory**: (leave empty)

### 2. Build Settings:
```bash
# Build command:
npm install && npx expo export -p web

# Output directory:
dist

# Deploy command:
npx wrangler pages deploy dist
```

### 3. Environment Variables (REQUIRED - Add in Cloudflare Pages settings):
**Go to: Project → Settings → Environment variables → Production**

```
EXPO_PUBLIC_SUPABASE_URL=https://jsqutcbjouulaypspvqt.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzcXV0Y2Jqb3V1bGF5cHNwdnF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczNzM3NjQsImV4cCI6MjA2Mjk0OTc2NH0.tw94pFCbE1rmEj3gRhG_NoPlrZnzNgrCCY6UzXILYmI
EXPO_PUBLIC_APP_URL=https://uberdrip.pages.dev
EXPO_PUBLIC_ENVIRONMENT=production
```

### 4. Advanced Settings:
- **Node.js version**: 18.x (compatible with Expo)
- **Build timeout**: 15 minutes
- **Root directory**: (leave empty)

## ✅ What Was Fixed:

1. **Removed invalid `[build]` section** from wrangler.toml
2. **Updated Supabase config** to use environment variables
3. **Simplified deploy command** - removed `--project-name` parameter
4. **Added environment variables** for proper production configuration

## 🚀 Deployment Steps:

### Step 1: Add Environment Variables
1. Go to Cloudflare Pages Dashboard
2. Select your `uberdrip` project
3. Go to **Settings** → **Environment variables**
4. Add all the variables listed above

### Step 2: Redeploy
After adding the environment variables, trigger a new deployment:
- Go to **Deployments** tab
- Click **Retry deployment** on the latest failed build
- Or push a new commit to trigger automatic rebuild

## Important Notes:

### Mobile App Limitations:
⚠️ **This will deploy as a web app, not a mobile app**
- Users can access it via browser on mobile/desktop
- Native mobile features (camera, push notifications) may be limited
- For full mobile app, you'll need to build APK/IPA separately

### Web App Features:
✅ **What works on web:**
- All UI components and screens
- Navigation and routing
- Supabase authentication and database
- Image uploads (with some limitations)
- Most React Native components

### Post-Deployment Steps:
1. **Update Supabase Auth Settings:**
   - Add `https://uberdrip.pages.dev` to allowed origins
   - Update redirect URLs in Supabase Auth settings

2. **Test the deployment:**
   - Check all screens load correctly
   - Test authentication flow
   - Verify image uploads work
   - Test profile system

## Alternative: Native Mobile App Deployment

If you want a true mobile app:

### For Android (APK):
```bash
npx expo build:android
```

### For iOS (App Store):
```bash
npx expo build:ios
```

### For App Stores:
Use Expo Application Services (EAS):
```bash
npm install -g @expo/cli
npx expo install expo-dev-client
npx eas build --platform all
```
