# 🚀 Installation Guide - DeepGuard AI

## ⚠️ IMPORTANT: You MUST Install Node.js

**Unfortunately, there is NO way to run a React application without Node.js.** This is a fundamental requirement for all modern web applications built with React, Vue, Angular, etc.

However, installation is simple and straightforward!

---

## 📋 Step-by-Step Installation

### Step 1: Install Node.js (ONE-TIME SETUP - Takes 5 minutes)

1. **Download Node.js:**
   - Visit: https://nodejs.org/
   - Click the green button that says "Download Node.js (LTS)"
   - The LTS (Long Term Support) version is recommended
   - Current recommended version: v18 or higher

2. **Install Node.js:**
   - **Windows:**
     - Double-click the downloaded `.msi` file
     - Click "Next" through the installer
     - Accept the license agreement
     - Keep all default settings
     - Click "Install"
     - Wait for installation to complete (2-3 minutes)
     - Click "Finish"
   
   - **macOS:**
     - Double-click the downloaded `.pkg` file
     - Follow the installation wizard
     - You may need to enter your password
   
   - **Linux:**
     ```bash
     curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
     sudo apt-get install -y nodejs
     ```

3. **Verify Installation:**
   - Open PowerShell (Windows) or Terminal (Mac/Linux)
   - Type: `node --version`
   - You should see something like: `v18.17.0`
   - Type: `npm --version`
   - You should see something like: `9.6.7`
   
   **If you see version numbers, SUCCESS! ✅**

---

### Step 2: Extract Project Files

1. Extract the ZIP file to a location of your choice
2. Example: `C:\Projects\deepguard-ai\`

---

### Step 3: Install Project Dependencies (ONE-TIME - Takes 2-5 minutes)

1. **Open Terminal/PowerShell in Project Folder:**
   - **Windows:** Right-click the project folder → "Open in Terminal" or "Open PowerShell window here"
   - **Mac/Linux:** Right-click the project folder → "New Terminal at Folder"

2. **Run Installation Command:**
   ```bash
   npm install
   ```
   
   This will:
   - Download all required packages (React, TypeScript, Tailwind CSS, etc.)
   - Take 2-5 minutes depending on your internet speed
   - Create a `node_modules` folder (this is normal and expected)
   - You only need to do this ONCE

3. **Wait for "added XXX packages" message**
   - This means installation was successful!

---

### Step 4: Start the Application

**Every time you want to run the app:**

```bash
npm run dev
```

You should see:
```
  VITE v5.4.19  ready in XXX ms

  ➜  Local:   http://localhost:8080/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

---

### Step 5: Open in Browser

1. Open your web browser (Chrome, Firefox, Edge, Safari)
2. Go to: `http://localhost:8080`
3. **The application is now running!** 🎉

---

## 🎯 Quick Reference

### Starting the App (After Initial Setup)
```bash
cd path/to/deepguard-ai
npm run dev
```

### Stopping the App
- Press `Ctrl + C` in the terminal
- Or just close the terminal window

### Common Commands
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## 🔧 Troubleshooting

### "npm is not recognized as a command"
**Problem:** Node.js is not installed or not in your system PATH

**Solution:**
1. Install Node.js from https://nodejs.org/
2. Restart your terminal/PowerShell
3. Try again

---

### "Port 8080 is already in use"
**Problem:** Another application is using port 8080

**Solution Option 1 - Use a different port:**
1. Open `vite.config.ts`
2. Change port from `8080` to `3000` (or any other port)
3. Save and restart

**Solution Option 2 - Kill the process:**
- **Windows:**
  ```powershell
  netstat -ano | findstr :8080
  taskkill /PID <PID_NUMBER> /F
  ```
- **Mac/Linux:**
  ```bash
  lsof -ti:8080 | xargs kill -9
  ```

---

### Installation Fails or Hangs
**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules if it exists
rm -rf node_modules
# On Windows: rmdir /s node_modules

# Delete package-lock.json
rm package-lock.json
# On Windows: del package-lock.json

# Try installing again
npm install
```

---

### Dependencies Have Vulnerabilities Warning
**This is normal and doesn't affect development!**

To fix (optional):
```bash
npm audit fix
```

---

## 💡 Why Do I Need Node.js?

**Simple Answer:**
- React applications are written in JSX/TypeScript
- Browsers only understand HTML/CSS/JavaScript
- Node.js provides tools to convert your code to browser-compatible format
- It also provides a development server with hot-reload

**Think of it like:**
- Microsoft Word needs Microsoft Office installed
- Photoshop files need Adobe Photoshop installed
- React apps need Node.js installed

**The good news:**
- You only install Node.js ONCE
- It's free and open-source
- It's used by millions of developers worldwide
- Once installed, it works for ALL React/Vue/Angular projects

---

## 📦 What Gets Installed?

### Node.js (~50MB)
- JavaScript runtime
- npm package manager
- Build tools

### Project Dependencies (~300-400MB)
- React framework
- TypeScript compiler
- Vite build tool
- Tailwind CSS
- UI components
- And more...

**Total disk space needed:** ~500MB

---

## 🌐 Browser Requirements

The application works on:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Edge 90+
- ✅ Safari 14+

---

## 🔒 Security & Privacy

- All processing happens locally on your machine
- No data is sent to external servers during development
- Node.js is open-source and trusted by millions
- Developed and maintained by the OpenJS Foundation

---

## ✨ After Installation

Once everything is set up:

1. The app starts in **under 2 seconds**
2. Changes you make are **instantly reflected** (hot-reload)
3. No need to install anything again
4. Works offline (after first npm install)

---

## 🎓 Learning Resources

If you want to learn more about the technologies used:

- **React:** https://react.dev/learn
- **TypeScript:** https://www.typescriptlang.org/docs/
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Node.js:** https://nodejs.org/en/learn

---

## 📞 Need Help?

If you encounter issues:

1. Check this guide first
2. Google the error message (usually very helpful!)
3. Check StackOverflow
4. Review the project README.md

---

## 🎉 Summary

**To run this project, you need:**

1. ✅ Node.js installed (one-time, 5 minutes)
2. ✅ Run `npm install` (one-time, 2-5 minutes)
3. ✅ Run `npm run dev` (every time you want to start)
4. ✅ Open `http://localhost:8080` in browser

**Total time for first-time setup: ~10 minutes**

**After that: Just `npm run dev` and you're good to go!** 🚀

---

**Made with ❤️ for security and simplicity**
