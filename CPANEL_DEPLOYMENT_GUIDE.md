# Complete cPanel Deployment & Hosting Guide — PrabinXFitness

This guide provides step-by-step instructions for hosting this Next.js 16 + Prisma + MySQL application on **cPanel hosting** (using cPanel's **Setup Node.js App** manager).

---

## 📋 Prerequisites

Before starting, ensure you have:
1. **cPanel Access** with **Setup Node.js App** (Phusion Passenger) enabled.
2. **cPanel MySQL Databases** access & **phpMyAdmin**.
3. Node.js version **18.x or 20.x** installed on cPanel.

---

## 🗄️ Step 1: Create MySQL Database on cPanel

1. Log in to **cPanel**.
2. Navigate to **MySQL Databases** (or **MySQL Database Wizard**).
3. Create a new database, e.g., `yourcpaneluser_prabin_db`.
4. Create a new database user, e.g., `yourcpaneluser_dbuser`, with a strong password.
5. Add the user to the database and check **ALL PRIVILEGES**.
6. Note your connection details:
   - **DB Host**: `localhost` (or `127.0.0.1:3306`)
   - **DB Name**: `yourcpaneluser_prabin_db`
   - **DB User**: `yourcpaneluser_dbuser`
   - **DB Password**: `your_password_here`

---

## ⚙️ Step 2: Configure Node.js Application in cPanel

1. In cPanel, search for **Setup Node.js App**.
2. Click **Create Application**.
3. Set the configuration parameters:
   - **Node.js Version**: `20.x` (or `18.x` minimum)
   - **Application Mode**: `Production`
   - **Application Root**: `prabinxfitness` (or subfolder path where project files will sit)
   - **Application URL**: `yourdomain.com` (or subfolder/subdomain)
   - **Application Startup File**: `server.js`
4. Click **Create**.

cPanel will create the application directory and display a Virtual Environment command line path at the top of the page (e.g. `source /home/yourusername/nodevenv/prabinxfitness/20/bin/activate`).

---

## 📂 Step 3: Upload Project Files & Environment Variables

1. Open **cPanel File Manager** (or upload via FTP/SFTP).
2. Go to your Application Root directory (e.g., `public_html` or `prabinxfitness`).
3. Upload your project files:
   - Include: `app/`, `src/`, `prisma/`, `public/`, `package.json`, `next.config.ts`, `server.js`, `tsconfig.json`, etc.
   - Do **NOT** upload `node_modules` or `.next` (these will be built on cPanel).
4. Create a `.env` file in the project root with the following variables:

```env
# Database Connection (Replace with your actual cPanel MySQL credentials)
DATABASE_URL="mysql://yourcpaneluser_dbuser:your_password@localhost:3306/yourcpaneluser_prabin_db"

# Admin JWT Authentication Secret
JWT_SECRET="prabinxfitness_jwt_secret_key_987654321_secure"

# Optional Cloudinary Configuration (if storing uploads on Cloudinary)
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```

---

## ⚡ Step 4: Run Install, Database Migration & Build

1. Open **Terminal** in cPanel (or SSH into your hosting account).
2. Copy and run the virtual environment activation command provided in Step 2:
   ```bash
   source /home/yourusername/nodevenv/prabinxfitness/20/bin/activate && cd /home/yourusername/prabinxfitness
   ```
3. Install project dependencies:
   ```bash
   npm install
   ```
4. Push database schema to your cPanel MySQL database:
   ```bash
   npm run db:push
   ```
   *(Alternative: You can also import `prisma/schema.sql` directly into phpMyAdmin if you prefer).*

5. Seed default initial content (SEO, Hero, Services, Testimonials, Gallery):
   ```bash
   npm run db:seed
   ```

6. Build the Next.js production bundle:
   ```bash
   npm run build
   ```

---

## 🚀 Step 5: Start / Restart Application

1. Return to cPanel **Setup Node.js App**.
2. Click **Restart Application**.
3. Visit your website domain (`yourdomain.com`) in your browser!
4. Access the admin control panel at `yourdomain.com/login` (or `yourdomain.com/admin`).

---

## 🛠️ Troubleshooting & Tips

- **404 or Server Error on Refresh**:
  `next.config.ts` is configured with `output: "standalone"` and `server.js` uses `0.0.0.0` host binding for Phusion Passenger reverse proxy compatibility.
- **Media Uploads**:
  File uploads automatically fallback to `/public/uploads/` on local storage. Ensure the `/public/uploads` directory has write permissions (`755` or `775`).
- **Restarting Server**:
  Whenever you make changes to `.env` or run a new `npm run build`, click **Restart Application** in cPanel.
