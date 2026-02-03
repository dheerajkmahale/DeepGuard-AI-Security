# DeepGuard AI - Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **Git** (for version control)

### Installing Node.js and npm

1. **Windows:**
   - Download the installer from [nodejs.org](https://nodejs.org/)
   - Run the installer and follow the setup wizard
   - Verify installation:
     ```powershell
     node --version
     npm --version
     ```

2. **macOS:**
   ```bash
   # Using Homebrew
   brew install node
   ```

3. **Linux:**
   ```bash
   # Using apt (Ubuntu/Debian)
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

## Installation Steps

### 1. Clone or Extract the Project

If you have a zip file, extract it. If using Git:

```bash
git clone <repository-url>
cd digital-truth-engine-74202-main
```

### 2. Install Dependencies

Run the following command in the project root directory:

```bash
npm install
```

This will install all required dependencies including:
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Radix UI components
- React Router
- Lucide Icons
- And more...

### 3. Start Development Server

```bash
npm run dev
```

The application will start on `http://localhost:8080`

### 4. Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### 5. Preview Production Build

```bash
npm run preview
```

## Project Structure

```
digital-truth-engine-74202-main/
├── public/               # Static assets
├── src/
│   ├── assets/          # Images and media files
│   ├── components/      # React components
│   │   ├── ui/         # Shadcn UI components
│   │   ├── Navigation.tsx
│   │   ├── Hero.tsx
│   │   ├── AnalysisUpload.tsx
│   │   ├── AnalysisResults.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── data/           # Mock data and constants
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── pages/          # Route pages
│   │   ├── Index.tsx
│   │   ├── Dashboard.tsx
│   │   └── NotFound.tsx
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── package.json
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite configuration
└── tailwind.config.ts  # Tailwind CSS configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Configuration

Create a `.env` file in the root directory if you need to add environment variables:

```env
VITE_API_URL=your_api_url_here
VITE_APP_NAME=DeepGuard AI
```

## Troubleshooting

### Port Already in Use

If port 8080 is already in use, you can change it in `vite.config.ts`:

```typescript
server: {
  host: "::",
  port: 3000, // Change to your preferred port
}
```

### Dependencies Installation Failed

Try clearing npm cache and reinstalling:

```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

Ensure your TypeScript version is compatible:

```bash
npm install typescript@latest --save-dev
```

## Browser Compatibility

The application is optimized for modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Next Steps

After setting up the project:

1. Explore the codebase
2. Run the development server
3. Test the deepfake detection features
4. Review the dashboard analytics
5. Customize the design system in `src/index.css`

## Support

For issues or questions:
- Check the main README.md
- Review the code comments
- Consult the documentation in the `/docs` folder

## License

See LICENSE file for details.
