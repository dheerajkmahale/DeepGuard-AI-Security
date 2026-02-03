# Domain Configuration - DeepGuard AI

## 🌐 Domain Setup Complete

### Primary Domain
**https://deepguardai.com**

---

## 📝 Changes Made

### 1. **HTML Meta Tags** (`index.html`)
- ✅ Updated canonical URL to `https://deepguardai.com`
- ✅ Updated Open Graph meta tags with proper URL
- ✅ Updated Twitter card meta tags
- ✅ Added keywords meta tag for SEO
- ✅ Changed social media handles to `@DeepGuardAI`

### 2. **Site Configuration** (`src/config/site.ts`)
Created a centralized configuration file with:
- Site name, URL, and description
- Social media links
- Contact information (contact@deepguardai.com, support@deepguardai.com)
- API endpoints (production and development)
- Feature configurations (file size, formats, accuracy)

### 3. **Vite Configuration** (`vite.config.ts`)
- ✅ Added base URL configuration for production
- ✅ Added build optimizations
- ✅ Configured source maps

### 4. **SEO Files** (`public/`)
- ✅ Updated `robots.txt` with sitemap reference
- ✅ Created `sitemap.xml` with main pages

### 5. **Component Updates**
- ✅ **Footer**: Now uses site config for links and social media
- ✅ **Contact**: Displays contact email from site config

---

## 🔗 URLs in the Application

### Main URLs
- Homepage: `https://deepguardai.com/`
- Dashboard: `https://deepguardai.com/dashboard`

### Resource URLs
- Documentation: `https://deepguardai.com/docs`
- API Reference: `https://deepguardai.com/api`
- Research Papers: `https://deepguardai.com/research`

### Legal Pages
- Privacy Policy: `https://deepguardai.com/privacy`
- Terms of Service: `https://deepguardai.com/terms`
- Data Security: `https://deepguardai.com/security`

### Social Media
- Twitter: `@DeepGuardAI`
- GitHub: `https://github.com/deepguardai`

### Contact
- General: `contact@deepguardai.com`
- Support: `support@deepguardai.com`

---

## 🚀 API Configuration

The site config includes API endpoints:
- **Production**: `https://api.deepguardai.com`
- **Development**: `http://localhost:3000`

The application automatically switches based on `NODE_ENV`.

---

## 📦 How to Use Site Config

Import the config in any component:

```typescript
import { siteConfig } from "@/config/site";

// Access properties
const websiteUrl = siteConfig.url;
const email = siteConfig.contact.email;
const apiUrl = siteConfig.api.baseUrl;
```

---

## 🎯 Benefits

1. **Centralized Configuration** - All URLs and settings in one place
2. **Type Safety** - TypeScript ensures type checking
3. **Easy Updates** - Change domain in one file
4. **Environment Aware** - Automatic switching between dev/prod
5. **SEO Optimized** - Proper meta tags and sitemaps

---

## 📋 Deployment Checklist

When deploying to production:

1. ✅ Verify domain is set to `https://deepguardai.com`
2. ✅ Update DNS records to point to your server
3. ✅ Configure SSL certificate for HTTPS
4. ✅ Set up API endpoint at `api.deepguardai.com`
5. ✅ Test all social media links
6. ✅ Submit sitemap to Google Search Console
7. ✅ Verify contact emails are working

---

## 🛠️ Local Development

The app continues to run on `http://localhost:8080` during development.
All production URLs are only used when building for production:

```bash
# Development (uses localhost)
npm run dev

# Production build (uses deepguardai.com)
npm run build
```

---

**Status**: ✅ Domain configuration complete and ready for deployment!
