# Unified Deployment & Hosting Guide — PrabinXFitness

This guide outlines what this project is built on and provides detailed, step-by-step instructions on how to deploy this Next.js 16 + Prisma + MySQL application without error.

---

## 🛠️ Project Stack & Technology

This project is built using:
1. **Runtime & Framework**: **Node.js** with **Next.js 16 (App Router)** & **React 19**.
2. **Styling**: **Tailwind CSS v4** (using the new `@tailwindcss/postcss` setup).
3. **Database & ORM**: **MySQL** database mapped and managed using **Prisma ORM**.
4. **Production Web Server**: Customized root `server.js` startup file configured to listen on `0.0.0.0` for maximum compatibility (e.g., cPanel's Passenger proxy, PM2, or standard VPS).
5. **Standalone Mode**: Next.js is configured with `output: "standalone"` in `next.config.ts` to output a highly compressed production build containing only files necessary for production deployment.

---

## ⚠️ Pre-Deployment Error-Free Checklist

Before starting any deployment, make sure:
1. **Node.js Version**: The server must run **Node.js 18.x or 20.x**. Node versions below 18 will crash.
2. **Database URI Characters**: If your database password contains special characters (like `@`, `#`, `$` etc.), you must URL-encode them:
   * `@` becomes `%40`
   * `#` becomes `%23`
   * `:` becomes `%3A`
   * `?` becomes `%3F`
3. **Upload Directories**: If you don't use Cloudinary, images will fall back to local disk storage in `public/uploads/`. The `public/` directory on the server must have write permissions enabled (`755` or `775`).

---

## ⚙️ Option 1: Deploying on cPanel (Setup Node.js App)

This is the most common deployment flow for shared hosting environments using cPanel.

### Step 1: Create the MySQL Database
1. Log in to your **cPanel**.
2. Go to **MySQL Databases** or **MySQL Database Wizard**.
3. Create a database, e.g., `yourusername_prabinx_db`.
4. Create a database user, e.g., `yourusername_dbuser`, with a strong password.
5. Add the user to the database, ensuring you check **ALL PRIVILEGES**.
6. Note the credentials:
   * **Host**: `localhost` (or `127.0.0.1:3306`)
   * **Database Name**: `yourusername_prabinx_db`
   * **Database User**: `yourusername_dbuser`
   * **Database Password**: `yourpassword`

### Step 2: Configure the Node.js App in cPanel
1. Search cPanel for **Setup Node.js App**.
2. Click **Create Application**.
3. Set the fields:
   * **Node.js Version**: Select `20.x` (or `18.x` minimum)
   * **Application Mode**: `Production`
   * **Application Root**: `p_portfolio` (folder name under `/home/yourusername/`)
   * **Application URL**: `yourdomain.com` (or subdomain)
   * **Application Startup File**: `server.js`
4. Click **Create**.
5. Copy the virtual environment activation command displayed at the top of the interface:
   `source /home/yourusername/nodevenv/p_portfolio/20/bin/activate && cd /home/yourusername/p_portfolio`

### Step 3: Upload Project Files
1. Open cPanel **File Manager** (or connect via FTP/SFTP).
2. Go to your application root directory `/home/yourusername/p_portfolio`.
3. Upload the project files:
   * **Include**: `app/`, `src/`, `prisma/`, `public/`, `package.json`, `next.config.ts`, `server.js`, `tsconfig.json`, `postcss.config.mjs`, `tailwind.config.ts`.
   * **Do NOT upload**: `node_modules/` or `.next/` (these will be built fresh).
4. Create a file named `.env` in your project root on cPanel:
   ```env
   DATABASE_URL="mysql://yourusername_dbuser:yourpassword@localhost:3306/yourusername_prabinx_db"
   JWT_SECRET="generate_a_long_random_string_key_12345"

   # Optional Cloudinary (Set these if you wish to use Cloudinary instead of local disk storage)
   CLOUDINARY_CLOUD_NAME=""
   CLOUDINARY_API_KEY=""
   CLOUDINARY_API_SECRET=""
   ```

### Step 4: Run CLI Commands (Install & Build)
1. Open **Terminal** in cPanel (or SSH into your hosting).
2. Run your virtual environment activation command:
   ```bash
   source /home/yourusername/nodevenv/p_portfolio/20/bin/activate && cd /home/yourusername/p_portfolio
   ```
3. Install package dependencies:
   ```bash
   npm install
   ```
4. Push database tables schema:
   ```bash
   npm run db:push
   ```
5. Seed the default database data:
   ```bash
   npm run db:seed
   ```
6. Build the Next.js production build:
   ```bash
   npm run build
   ```
7. Go back to cPanel **Setup Node.js App** page and click **Restart Application**.

---

## ☁️ Option 2: Deploying on Vercel

If you want cloud-native serverless hosting, Vercel is the easiest place to deploy Next.js. However, since Vercel is serverless, you must have an external database (e.g., your remote MySQL server).

### Step 1: Adjust `next.config.ts`
Vercel handles serverless routing on its own. In [next.config.ts](file:///Users/dibya/Documents/p_portfolio/next.config.ts), comment out the `output: "standalone"` option:
```typescript
// output: "standalone", 
```

### Step 2: Push Code to GitHub / GitLab / Bitbucket
Ensure your latest code commits (excluding `.env` and `node_modules`) are pushed to your remote repository.

### Step 3: Import Project to Vercel
1. Log in to your [Vercel Dashboard](https://vercel.com).
2. Click **Add New > Project** and import your Git repository.
3. In the **Environment Variables** section, add:
   * `DATABASE_URL`: `mysql://username:password@remote-db-host:3306/db_name`
   * `JWT_SECRET`: `your-long-secure-random-string`
4. Click **Deploy**. Vercel will automatically run `npm run build` (which generates the Prisma client and compiles the application).
5. Once deployed, run your database push manually on your local terminal or using a deploy script to sync the tables with your remote DB:
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

---

## 🖥️ Option 3: Deploying on a VPS (Linux/Ubuntu/Debian)

If you are using a Virtual Private Server (AWS, DigitalOcean, Linode, etc.), use **PM2** to run the app in the background.

### Step 1: Install Node.js & PM2
1. Install Node.js 20 on your VPS.
2. Install PM2 globally:
   ```bash
   npm install -g pm2
   ```

### Step 2: Set up Project on VPS
1. Clone the repository onto the server.
2. Create your `.env` file in the project directory.
3. Install dependencies and build:
   ```bash
   npm install
   npm run db:push
   npm run db:seed
   npm run build
   ```

### Step 3: Run the Application with PM2
Launch the app with PM2:
```bash
pm2 start server.js --name "prabinxfitness"
```
Ensure PM2 automatically starts on boot:
```bash
pm2 startup
pm2 save
```

---

## 🛠️ Troubleshooting Common Errors

*   **Error: `PrismaClientInitializationError: Connect to database server...`**
    *   **Fix**: Check if your `.env` database URL is correct, the remote MySQL server allows incoming connections from your deployment host, and your credentials (especially special characters in password) are encoded.
*   **Error: `MODULE_NOT_FOUND` on server start**
    *   **Fix**: Ensure `npm install` succeeded. If using cPanel, verify that the Node.js application was **Restarted** after installing packages and building.
*   **Images fail to upload or show up as broken links**
    *   **Fix**: Ensure the `public/uploads` directory has `755` permissions so the Node server can write file streams. If deploying to serverless platforms like Vercel, utilize Cloudinary variables to switch to cloud image storage.
