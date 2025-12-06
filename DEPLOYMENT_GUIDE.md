# FitKhao Deployment Guide

## Overview

This guide covers deployment to **both** GitHub Pages and GoDaddy hosting for www.fitkhao.com.

The project is now properly structured with:
- Source code in `/src`
- Built files in `/docs/browser` (committed to git for GitHub Pages)
- CNAME and .htaccess automatically included in builds

---

## Deployment Option 1: GitHub Pages (Recommended)

GitHub Pages is the easiest deployment method and it's **free**!

### Initial Setup (One-time)

1. **Push your code to GitHub**
   ```bash
   cd "c:\Users\Subho Chakraborty\Desktop\fitkhaoweb\fitkhaoweb"
   git add .
   git commit -m "Configure for GitHub Pages deployment"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to https://github.com/fitkhao/fitkhaoweb
   - Click **Settings** → **Pages** (in left sidebar)
   - Under "Build and deployment":
     - Source: **Deploy from a branch**
     - Branch: **main**
     - Folder: **/docs** (IMPORTANT!)
   - Click **Save**

3. **Configure Custom Domain (if using www.fitkhao.com)**
   - Still in GitHub Pages settings
   - Under "Custom domain", enter: **www.fitkhao.com**
   - Click **Save**
   - Check "Enforce HTTPS" (after DNS propagates)

4. **Configure DNS in GoDaddy**
   - Go to GoDaddy DNS Management for fitkhao.com
   - Add these records:
     ```
     Type: A
     Name: @
     Value: 185.199.108.153
     TTL: 600

     Type: A
     Name: @
     Value: 185.199.109.153
     TTL: 600

     Type: A
     Name: @
     Value: 185.199.110.153
     TTL: 600

     Type: A
     Name: @
     Value: 185.199.111.153
     TTL: 600

     Type: CNAME
     Name: www
     Value: fitkhao.github.io
     TTL: 600
     ```

### Deploying Updates (Every time you make changes)

```bash
cd "c:\Users\Subho Chakraborty\Desktop\fitkhaoweb\fitkhaoweb"

# 1. Make your code changes in /src

# 2. Build the application
npm run build

# 3. Commit and push
git add .
git commit -m "Update website"
git push origin main
```

**That's it!** GitHub will automatically deploy your changes to www.fitkhao.com within 1-2 minutes.

---

## Deployment Option 2: GoDaddy Hosting

If you have a GoDaddy hosting plan, you can deploy directly to their servers.

### Using cPanel File Manager

1. **Build Your Application**
   ```bash
   cd "c:\Users\Subho Chakraborty\Desktop\fitkhaoweb\fitkhaoweb"
   npm run build
   ```

2. **Log into GoDaddy cPanel**
   - Go to your GoDaddy account
   - Navigate to Web Hosting → cPanel
   - Click "Manage" on your hosting plan

3. **Access File Manager**
   - In cPanel, find and click "File Manager"
   - Navigate to `public_html` folder

4. **Clear Existing Files**
   - Select all existing files in `public_html`
   - Delete them

5. **Upload Files**
   - Click "Upload" button
   - Navigate to: `C:\Users\Subho Chakraborty\Desktop\fitkhaoweb\fitkhaoweb\docs\browser`
   - Upload ALL files (18 files total):
     - index.html
     - .htaccess
     - CNAME
     - All .js files
     - All .css files
     - All images

6. **Verify Upload**
   - Ensure files are in root of `public_html`, not in a subfolder
   - Visit www.fitkhao.com to test

### Using FTP (FileZilla)

1. **Get FTP Credentials**
   - In GoDaddy cPanel, go to "FTP Accounts"
   - Note: hostname, username, password

2. **Connect via FileZilla**
   - Download from https://filezilla-project.org/
   - Host: ftp.fitkhao.com
   - Username: [your FTP username]
   - Password: [your FTP password]
   - Port: 21

3. **Upload Files**
   - Local: `C:\Users\Subho Chakraborty\Desktop\fitkhaoweb\fitkhaoweb\docs\browser`
   - Remote: `public_html`
   - Drag all files from left to right

---

## File Structure

### Repository Structure
```
fitkhaoweb/
├── src/                    # Source code (Angular app)
├── public/                 # Static assets (images, etc.)
├── docs/                   # Built files (GitHub Pages serves from here)
│   └── browser/
│       ├── index.html      ✓
│       ├── .htaccess       ✓
│       ├── CNAME           ✓
│       ├── *.js files      ✓
│       ├── *.css files     ✓
│       └── images/         ✓
├── angular.json            # Build configuration
├── package.json
├── CNAME                   # Domain configuration (copied to docs)
├── .htaccess              # Apache config (copied to docs)
└── README.md
```

### What Gets Deployed

The `/docs/browser` folder contains everything needed:
- ✓ index.html (main page)
- ✓ .htaccess (routing for Angular)
- ✓ CNAME (domain: www.fitkhao.com)
- ✓ JavaScript bundles (chunk-*.js, main-*.js)
- ✓ CSS files (styles-*.css)
- ✓ Images (all .png and .ico files)

---

## Configuration Files

### angular.json
- Output path set to `docs` (instead of `dist`)
- Automatically copies CNAME and .htaccess to build output

### .gitignore
- Ignores `/dist` folder
- Keeps `/docs` folder (for GitHub Pages)

### .htaccess
- Enables Angular routing (SPA support)
- Redirects HTTP to HTTPS
- Enables compression and caching

### CNAME
- Contains: www.fitkhao.com
- Tells GitHub Pages what custom domain to use

---

## Troubleshooting

### GitHub Pages shows 404
- **Check**: Pages is set to deploy from `/docs` folder, not `/root`
- **Fix**: Go to Settings → Pages → Change folder to `/docs`

### GitHub Pages shows README.md instead of website
- **Problem**: Built files not in repository
- **Fix**: The `/docs` folder should be in git (not ignored)
- **Verify**: Check that `/docs` is in your repository on GitHub

### Routes return 404 on refresh
- **Problem**: .htaccess not present or not working
- **GoDaddy Fix**: Ensure .htaccess is uploaded to public_html
- **GitHub Pages Fix**: Create `404.html` that redirects to index.html

### Domain not working
- **Check DNS**: Verify CNAME record points to fitkhao.github.io
- **Wait**: DNS propagation takes 24-48 hours
- **Verify**: Use https://www.whatsmydns.net/

### CSS/JS not loading
- **Clear browser cache**: Ctrl + Shift + R
- **Check file paths**: All files should be in root, not subfolders
- **Verify upload**: Check that all chunk-*.js files are present

---

## SSL/HTTPS

### GitHub Pages
- Free SSL automatically provided
- Enable "Enforce HTTPS" in Pages settings after DNS propagates

### GoDaddy
- Free SSL via cPanel → SSL/TLS Status → Run AutoSSL
- .htaccess automatically redirects HTTP to HTTPS

---

## Quick Reference

### Build Command
```bash
npm run build
```

### Build Output Location
```
C:\Users\Subho Chakraborty\Desktop\fitkhaoweb\fitkhaoweb\docs\browser
```

### Deploy to GitHub Pages
```bash
git add .
git commit -m "Deploy update"
git push origin main
```

### Deploy to GoDaddy
Upload all files from `docs/browser/` to `public_html/`

---

## Testing Checklist

After deployment, verify:
- [ ] Home page loads: https://www.fitkhao.com/
- [ ] Privacy page: https://www.fitkhao.com/privacy
- [ ] Terms page: https://www.fitkhao.com/terms
- [ ] HTTP redirects to HTTPS
- [ ] Refresh on any page doesn't cause 404
- [ ] All images load correctly
- [ ] No console errors (F12 → Console tab)
- [ ] Mobile responsive design works

---

## Support

- **GitHub Pages Docs**: https://docs.github.com/pages
- **GoDaddy Support**: https://www.godaddy.com/help
- **Angular Deployment**: https://angular.dev/tools/cli/deployment

---

## Notes

**Why /docs folder?**
- GitHub Pages can serve from `/docs` or root
- Using `/docs` keeps source (`/src`) and build files separate
- Allows committing built files without committing `/dist`

**Why commit built files?**
- GitHub Pages serves static files directly
- It doesn't run `npm build` for you
- Built files must be in the repository

**Which deployment method to use?**
- **GitHub Pages**: Free, automatic, SSL included, recommended for most cases
- **GoDaddy Hosting**: Use if you already pay for hosting, need server-side features, or specific GoDaddy features
