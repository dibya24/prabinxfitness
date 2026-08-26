# Complete cPanel Deployment & Hosting Guide — PrabinXFitness (cms-deployment branch)

This guide provides step-by-step instructions for hosting the **cms-deployment** branch of your Next.js 16 + Prisma + MySQL application on **cPanel hosting** using cPanel's **Setup Node.js App** manager.

---

## Prerequisites

Before starting, ensure you have:
1. **cPanel Access** with **Setup Node.js App** (Phusion Passenger) enabled.
2. **Terminal Access** enabled in cPanel (or SSH access to your hosting account).
3. **cPanel MySQL Databases** access & **phpMyAdmin**.
4. Node.js version **18.x or 20.x** selected in cPanel.

---

## Step 1: Create MySQL Database on cPanel

1. Log in to your **cPanel Dashboard**.
2. Navigate to **MySQL Databases** (or **MySQL Database Wizard**).
3. Create a new database, e.g., `yourusername_prabin_db`.
4. Create a new database user, e.g., `yourusername_dbuser`, with a strong password.
5. Add the database user to the database and select **ALL PRIVILEGES**.
6. Note down your database connection details:
   - **Host**: `localhost` (or `127.0.0.1:3306`)
   - **Database Name**: `yourusername_prabin_db`
   - **Database User**: `yourusername_dbuser`
   - **Database Password**: `your_password_here`

---

## Step 2: Configure Node.js Application in cPanel

1. In cPanel, search for and open **Setup Node.js App**.
2. Click **Create Application**.
3. Set the following configuration parameters:
   - **Node.js Version**: Select **20.x** (or **18.x** minimum).
   - **Application Mode**: **Production**
   - **Application Root**: `prabinxfitness` (the folder where your project files will sit).
   - **Application URL**: `yourdomain.com` (or subfolder/subdomain).
   - **Application Startup File**: `server.js`
4. Click **Create**.

cPanel will create the application directory and show a command at the top to enter its virtual environment (e.g. `source /home/yourusername/nodevenv/prabinxfitness/20/bin/activate`). Copy this command for later use.

---

## Step 3: Upload Project Files & Environment Variables

1. Open **cPanel File Manager** (or connect via FTP/SFTP).
2. Navigate to your application root directory (e.g., `/home/yourusername/prabinxfitness`).
3. Upload your project files from the `cms-deployment` branch:
   - **Include**: `app/`, `src/`, `prisma/`, `public/`, `package.json`, `next.config.ts`, `server.js`, `tsconfig.json`, `postcss.config.mjs`, `tailwind.config.ts`, `eslint.config.mjs`.
   - **Exclude / Do NOT upload**: `node_modules/` or `.next/` (these folders must be built directly on cPanel).
4. Create a `.env` file in your application root `/home/yourusername/prabinxfitness/.env` and add the following configuration:

```env
# 1. Database Connection URL (MySQL)
DATABASE_URL="mysql://yourusername_dbuser:your_password@localhost:3306/yourusername_prabin_db"

# 2. JWT Authentication Secret (Used for encrypting admin sessions)
JWT_SECRET="prabinxfitness_jwt_secret_key_987654321_secure"

# 3. EmailJS Credentials (For client consultation form submissions)
NEXT_PUBLIC_EMAILJS_SERVICE_ID="service_1cd7ljo"
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID="template_43bdkre"
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY="PyVv1K7qfo0aKcLo5"

# 4. Optional Cloudinary Configuration (Uncomment & fill if using Cloudinary for media uploads)
# If left blank, the app will fall back to local disk storage in /public/uploads/
# CLOUDINARY_CLOUD_NAME="your_cloud_name"
# CLOUDINARY_API_KEY="your_api_key"
# CLOUDINARY_API_SECRET="your_api_secret"
```

---

## Step 4: Run Dependency Installation, Database Migrations, & Build

1. Open the **Terminal** tool in cPanel (or SSH into your hosting account).
2. Enter the virtual environment using the command you copied in Step 2:
   ```bash
   source /home/yourusername/nodevenv/prabinxfitness/20/bin/activate && cd /home/yourusername/prabinxfitness
   ```
3. Install the project dependencies:
   ```bash
   npm install
   ```
4. Generate the Prisma client:
   ```bash
   npx prisma generate
   ```
5. Push the database schema to your cPanel MySQL database:
   ```bash
   npx prisma db push
   ```
6. Seed default initial content (SEO settings, hero texts, initial services, testimonials, gallery):
   ```bash
   node prisma/seed.js
   ```
7. Build the Next.js production bundle:
   ```bash
   npm run build
   ```

---

## Step 5: Start / Restart the Application

1. Go back to cPanel **Setup Node.js App**.
2. Find your application and click **Restart**.
3. Visit your website domain (`yourdomain.com`) in your browser to verify it is running!
4. Go to `yourdomain.com/login/` to access the admin command center.
   - **Default Admin Username**: `admin`
   - **Default Admin Password**: `adminpassword123` *(change this inside the CMS dashboard once logged in)*

---

## Troubleshooting & Tips

- **404 Page / Dynamic Route issues**:
  The application is pre-configured with `trailingSlash: true` in `next.config.ts` to ensure compatibility with typical cPanel/Apache setups routing dynamic URL paths.
- **Media Upload Permission Errors**:
  If you are not using Cloudinary, images and videos will upload to `/public/uploads/` on the server disk. Make sure that the `/public/` and `/public/uploads/` directories have write permissions (usually **755** or **775**). You can check and modify this in the **cPanel File Manager**.
- **Applying updates**:
  Whenever you modify the `.env` file, database schema, or update code files, be sure to click **Restart** inside the cPanel Node.js App manager to apply the changes.