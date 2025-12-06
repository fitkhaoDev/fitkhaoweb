# Deploy to GitHub Pages - Quick Start

## The Issue (Fixed!)

GitHub Pages was showing 404 because it was looking for `index.html` in `/docs` but Angular builds to `/docs/browser`.

**Solution:** Files have been copied to `/docs` root and a new build script created.

---

## Deploy Right Now - 3 Simple Steps

### Step 1: Commit the files to GitHub

```bash
cd "c:\Users\Subho Chakraborty\Desktop\fitkhaoweb\fitkhaoweb"

git add .
git commit -m "Fix GitHub Pages deployment - add files to docs root"
git push origin main
```

### Step 2: Configure GitHub Pages (One-time setup)

1. Go to: https://github.com/fitkhao/fitkhaoweb/settings/pages
2. Under "Build and deployment":
   - **Source:** Deploy from a branch
   - **Branch:** main
   - **Folder:** /docs ← IMPORTANT!
3. Click **Save**

### Step 3: Wait 1-2 minutes and visit your site!

Your site will be live at:
- https://fitkhao.github.io/fitkhaoweb (GitHub default URL)
- http://www.fitkhao.com (after DNS is configured)

---

## Future Updates - Easy Workflow

Every time you make changes:

```bash
# 1. Edit your code in /src

# 2. Build for GitHub Pages
npm run build:github

# 3. Deploy
git add .
git commit -m "Update website"
git push origin main
```

**Done!** GitHub automatically deploys in 1-2 minutes.

---

## What's in /docs Now?

All the files GitHub Pages needs:
```
docs/
├── index.html        ✓
├── .htaccess         ✓
├── CNAME             ✓
├── chunk-*.js        ✓
├── main-*.js         ✓
├── styles-*.css      ✓
└── images/           ✓
```

GitHub Pages will now find `index.html` and serve your Angular app!

---

## Custom Domain Setup (Optional)

To use www.fitkhao.com instead of GitHub's URL:

1. **In GitHub Pages settings:**
   - Custom domain: www.fitkhao.com
   - Check "Enforce HTTPS" (after DNS propagates)

2. **In GoDaddy DNS Management:**
   Add these DNS records:
   ```
   Type: A, Name: @, Value: 185.199.108.153
   Type: A, Name: @, Value: 185.199.109.153
   Type: A, Name: @, Value: 185.199.110.153
   Type: A, Name: @, Value: 185.199.111.153
   Type: CNAME, Name: www, Value: fitkhao.github.io
   ```

3. **Wait 24-48 hours** for DNS to propagate

---

## Troubleshooting

**Still seeing 404?**
- Verify GitHub Pages is set to deploy from `/docs` folder (not /root)
- Check that `docs/index.html` exists in your GitHub repository
- Wait a few minutes after pushing for GitHub to rebuild

**CNAME file errors?**
- The CNAME file contains: www.fitkhao.com
- It's already included in the build

**Need help?**
- Check the full guide: DEPLOYMENT_GUIDE.md
- Verify files pushed: https://github.com/fitkhao/fitkhaoweb/tree/main/docs

---

## Summary

✓ Files copied to `/docs` root
✓ New build script: `npm run build:github`
✓ Ready to push to GitHub
✓ GitHub Pages will work once configured

**Next:** Run the 3 commands in Step 1 above to deploy!
