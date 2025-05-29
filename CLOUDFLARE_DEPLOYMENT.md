# Cloudflare Pages Deployment Guide for UberDrip

## Quick Setup in Cloudflare Pages Dashboard:

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
```

### 3. Environment Variables (Add in Cloudflare Pages settings):
```
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
EXPO_PUBLIC_APP_URL=https://uberdrip.pages.dev
EXPO_PUBLIC_ENVIRONMENT=production
```

### 4. Advanced Settings:
- **Node.js version**: 18.x (compatible with Expo)
- **Build timeout**: 15 minutes
- **Root directory**: (leave empty)

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
