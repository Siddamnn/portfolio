# 🎵 Sid's Portfolio - Neon Dreams Creator

A modern, interactive portfolio website showcasing creative work with a unique neon aesthetic and immersive background music experience.

## ✨ Features

- **🎨 Neon Design Theme** - Cyberpunk-inspired UI with vibrant pink (#ff007f) accents
- **🎵 Background Music Player** - Auto-playing looped background music with play/pause controls
- **🌓 Dark/Light Mode Toggle** - Seamless theme switching with system preference support
- **📱 Fully Responsive** - Mobile-first design that works on all devices
- **🎭 Interactive Components** - Smooth animations and hover effects
- **📝 Multi-Section Portfolio** - Hero, About, Projects, Poems, and Contact sections
- **🎸 Custom Site Logo** - Unique "SIDS" logo with musical note integration
- **⚡ Performance Optimized** - Built with Next.js 15 and Turbopack for lightning-fast performance

## 🚀 Tech Stack

### Core Framework
- **Next.js 15** - React framework with App Router
- **React 18** - Latest React with concurrent features
- **TypeScript** - Type-safe development experience

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Headless UI components for accessibility
- **Lucide React** - Beautiful, customizable icons
- **next-themes** - Theme management for dark/light modes

### Development Tools
- **Turbopack** - Ultra-fast bundler for development
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing and optimization


## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Siddamnn/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Add your background music**
   - Place your music file as `background-music.mp3` in the `public/` directory
   - Supported formats: MP3, WAV, OGG

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:9002`
   - The website will auto-reload on file changes

## 🎵 Background Music Setup

The website features an immersive background music experience:

- **Auto-play**: Music starts automatically when the site loads (subject to browser policies)
- **Loop**: Continuously plays in the background
- **Volume**: Set to 30% for comfortable listening
- **Controls**: Floating play/pause button in the bottom-right corner
- **Persistent**: Continues playing across page navigation

To customize:
1. Replace `public/background-music.mp3` with your audio file
2. Adjust volume in `src/components/background-music.tsx`
3. Modify the control button styling as needed

## 📁 Project Structure

```
portfolio/
├── public/                 # Static assets
│   ├── background-music.mp3  # Background music file
│   ├── bg.png               # Background images
│   └── me.jpg              # Profile photo
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── layout.tsx      # Root layout with providers
│   │   ├── page.tsx        # Home page
│   │   └── globals.css     # Global styles
│   ├── components/         # React components
│   │   ├── ui/            # Reusable UI components (Radix)
│   │   ├── background-music.tsx  # Music player
│   │   ├── hero.tsx       # Hero section
│   │   ├── about.tsx      # About section
│   │   ├── projects.tsx   # Projects showcase
│   │   ├── poems.tsx      # Creative writing
│   │   ├── contact.tsx    # Contact form
│   │   ├── site-logo.tsx  # Custom logo component
│   │   └── theme-provider.tsx  # Theme management
│   ├── hooks/             # Custom React hooks
│   └── lib/               # Utility functions
├── tailwind.config.ts     # Tailwind configuration
├── next.config.ts         # Next.js configuration
└── package.json          # Dependencies and scripts
```

## 🎨 Design System

### Colors
- **Primary**: `#ff007f` (Neon Pink)
- **Background**: Dynamic based on theme
- **Text**: High contrast for accessibility

### Typography
- **Logo Font**: Custom "Literata" font
- **Body Font**: System font stack for performance

### Components
- Consistent spacing using Tailwind's scale
- Rounded corners and subtle shadows
- Smooth transitions and animations
- Accessible color contrast ratios

## 🚀 Available Scripts

```bash
# Development with Turbopack (fast refresh)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🔧 Customization

### Changing the Color Theme
1. Update the primary color in `tailwind.config.ts`
2. Modify CSS custom properties in `globals.css`
3. Update component-specific colors in TSX files

### Adding New Sections
1. Create a new component in `src/components/`
2. Import and use in `src/app/page.tsx`
3. Add navigation links in the header component

### Modifying the Music Player
- **Volume**: Adjust `audio.volume` in `background-music.tsx`
- **Position**: Modify the `fixed` positioning classes
- **Styling**: Update the button classes and icon components

## 🌐 Deployment

This project is optimized for deployment on:
- **Vercel** (Recommended for Next.js)
- **Netlify**
- **Firebase Hosting**
- **GitHub Pages** (with static export)

### Deploy to Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with zero configuration

## 🎯 Browser Support

- **Modern browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Audio support**: All modern browsers with HTML5 audio
- **Responsive design**: Works on mobile, tablet, and desktop


## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

**Sid** - Creator of Neon Dreams
- GitHub: [@Siddamnn](https://github.com/Siddamnn)
- Portfolio: [siddamn.dev]

---

*Built with ❤️ and lots of ☕ by Sid*
