# AppointmentGuard Frontend - Deployment Guide

## Prerequisites

- Railway account (or Netlify/Vercel)
- Backend already deployed at `https://appointment-guard-production.up.railway.app`
- Node.js 18+ installed locally (for testing before deployment)

---

## Quick Deploy to Railway

### Option A: Same Project as Backend (Recommended for MVP)

Deploying frontend alongside the backend in a single Railway project simplifies management and eliminates CORS issues.

**Steps:**

1. **Add Frontend Files to Existing Repository**
   ```bash
   # Ensure your frontend code is in /frontend folder
   git add dev-team/projects/appointment-guard/frontend/
   git commit -m "Add AppointmentGuard frontend"
   git push origin main
   ```

2. **Configure Build Settings in Railway**
   - Go to your existing Railway project: `appointment-guard-production`
   - Add a new deployment for the frontend (or configure as static site)
   - Set build command: `cd frontend && npm install && npm run build`
   - Set publish directory: `frontend/dist`

3. **Set Environment Variables**
   In Railway dashboard → Variables:
   ```
   VITE_API_URL=https://appointment-guard-production.up.railway.app
   NODE_ENV=production
   ```

4. **Deploy**
   - Click "Deploy" in Railway
   - Wait for build to complete (~2-3 minutes)
   - Frontend will be available at the same domain as backend (served from `/`)

---

### Option B: Separate Railway Project

For better separation of concerns and independent scaling.

**Steps:**

1. **Create New Railway Project**
   - Go to [Railway.app](https://railway.app)
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Choose the `frontend` directory as root (or create a separate branch)

2. **Configure Deployment Settings**
   ```yaml
   # railway.toml (create in frontend folder)
   [build]
   cmd = "npm install && npm run build"
   
   [deploy]
   start = "npx serve -s dist"
   ```

3. **Set Environment Variables**
   In the new Railway project → Variables:
   ```
   VITE_API_URL=https://appointment-guard-production.up.railway.app
   NODE_ENV=production
   ```

4. **Configure CORS on Backend**
   Ensure your backend allows requests from the frontend domain:
   - Update backend CORS settings to include the new Railway URL
   - Or use wildcard `*` for MVP (not recommended for production)

5. **Deploy**
   - Click "Deploy" in Railway
   - Frontend will be available at a separate Railway URL

---

### Option C: Deploy to Netlify/Vercel (Alternative)

Both platforms offer excellent free tiers and automatic deployments from GitHub.

#### Netlify

1. Connect your GitHub account on [Netlify](https://netlify.com)
2. Select repository → Set build settings:
   - **Base directory:** `frontend`
   - **Build command:** `npm install && npm run build`
   - **Publish directory:** `frontend/dist`
3. Add environment variable: `VITE_API_URL=https://appointment-guard-production.up.railway.app`
4. Deploy

#### Vercel

1. Connect your GitHub account on [Vercel](https://vercel.com)
2. Import project → Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
3. Add environment variable in Settings → Environment Variables
4. Deploy

---

## Environment Variables Required

| Variable | Value | Description |
|----------|-------|-------------|
| `VITE_API_URL` | `https://appointment-guard-production.up.railway.app` | Backend API endpoint |
| `NODE_ENV` | `production` | Build environment (optional) |

**Local Development (.env.local):**
```env
VITE_API_URL=http://localhost:8000
NODE_ENV=development
```

---

## Post-Deployment Checklist

After deployment, verify everything works correctly:

### Basic Functionality
- [ ] Frontend loads without errors (check browser console)
- [ ] Login screen appears on first visit
- [ ] Can enter password and access dashboard

### Dashboard Features
- [ ] Dashboard displays appointments with risk scores
- [ ] Risk badges show correct colors (red=HIGH, yellow=MEDIUM, green=LOW)
- [ ] Filter bar works (filter by risk level, date, provider)
- [ ] Appointments are sorted correctly

### Patient Details & Interventions
- [ ] Clicking an appointment card opens the modal
- [ ] Modal shows patient details and risk breakdown
- [ ] "Send Confirmation" button works
- [ ] Success notification appears after sending intervention
- [ ] Intervention status updates in the queue

### Analytics
- [ ] Analytics overview displays metrics cards
- [ ] Revenue at risk is calculated correctly
- [ ] Interventions sent counter increments

---

## Troubleshooting

### Frontend Won't Load / Blank Page

**Symptom:** White screen or "Cannot GET /" error

**Solutions:**
1. Check Railway deployment logs for build errors
2. Verify `VITE_API_URL` is set correctly in environment variables
3. Ensure the publish directory is correct (`frontend/dist`)
4. Try hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

---

### API Calls Fail / Network Errors

**Symptom:** Console shows "Failed to fetch" or CORS errors

**Solutions:**
1. Verify backend is running: `curl https://appointment-guard-production.up.railway.app/health`
2. Check `VITE_API_URL` matches your backend URL exactly (including https)
3. If using separate deployment, ensure backend allows CORS from frontend domain
4. Check browser console for specific error messages

---

### Login Doesn't Work

**Symptom:** Password is rejected or login loops

**Solutions:**
1. This is expected for MVP — the login currently accepts any password
2. For production, implement proper authentication (see Security section)
3. Clear browser cache and try again

---

### Risk Badges Show Wrong Colors

**Symptom:** HIGH risk shows green instead of red

**Solutions:**
1. Check `RiskBadge.jsx` component logic
2. Verify API is returning correct risk categories (`HIGH`, `MEDIUM`, `LOW`)
3. Inspect element to see what value the badge receives
4. Clear build cache: delete `node_modules/.vite` and rebuild

---

### Modal Doesn't Open on Card Click

**Symptom:** Clicking appointment card does nothing

**Solutions:**
1. Check browser console for JavaScript errors
2. Verify Zustand store is properly initialized
3. Ensure click handler is attached to the correct element
4. Try clicking different cards to isolate the issue

---

### Interventions Don't Send

**Symptom:** "Send Confirmation" button doesn't work or shows error

**Solutions:**
1. Check backend `/intervention/send` endpoint is working
2. Verify Twilio credentials are configured on backend
3. Check browser console for API response errors
4. Ensure patient phone number is in valid format (E.164)

---

## Security Notes

### Current State (MVP)
- Login accepts any password — suitable for demo only
- No user management or session handling
- API keys stored on backend (correct)

### Production Recommendations
1. Implement proper authentication (Supabase Auth or similar)
2. Add rate limiting to prevent abuse
3. Enable HTTPS-only cookies if using sessions
4. Add input validation and sanitization
5. Consider adding 2FA for sensitive actions

---

## Local Testing Before Deployment

Before deploying, test locally:

```bash
# Install dependencies
cd frontend
npm install

# Run development server
npm run dev

# Test build
npm run build

# Preview production build
npm run preview
```

Visit `http://localhost:4173` to verify everything works before pushing to Railway.

---

## Support & Resources

- **Railway Docs:** https://docs.railway.app
- **Vite Docs:** https://vitejs.dev
- **React Docs:** https://react.dev
- **Project Issues:** Check `/dev-team/projects/appointment-guard/` for project files

---

**Last Updated:** 2026-04-19  
**Author:** Dana (Technical Writer)  
**Version:** 1.0
