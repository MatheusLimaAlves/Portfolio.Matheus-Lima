# 💼 Personal Portfolio

> A modern, minimalist portfolio website built with React, TypeScript, and Tailwind CSS, inspired by Tesla's innovative design philosophy and Apple's clean aesthetic.

**Live Demo:** [Portfolio.Matheus-Lima](https://portfolio-matheus-lima.vercel.app/)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Customization](#customization)
- [Deployment](#deployment)
- [Performance](#performance)
- [License](#license)

---

## 🎯 Overview

This portfolio showcases my work as a Full Stack Developer, featuring a clean, professional design with sophisticated animations and interactive elements. The site emphasizes technical precision, elegant typography, and seamless user experience across all devices.

### Key Highlights

- **Minimalist Design:** Black and white color scheme with strategic use of negative space
- **Interactive Elements:** Typing animation, particle effects, and smooth transitions
- **Project Showcase:** Professional carousel with thumbnail navigation for featured work
- **Responsive:** Fully optimized for mobile, tablet, and desktop devices
- **Performance:** Lightweight with fast load times and optimized assets

---

## ✨ Features

### Design & UX
- **Typing Animation:** Name appears letter-by-letter with blinking cursor effect
- **Particle System:** Subtle electrical circuit animation in the background
- **Scroll Progress Bar:** Visual indicator of page scroll position
- **Custom Cursor:** Elegant circular cursor with blend modes (desktop only)
- **Smooth Scrolling:** Animated navigation between sections

### Interactive Components
- **Mobile Menu:** Fully functional hamburger menu with smooth animations
- **Project Carousel:** 
  - Multiple navigation methods (arrows, dots, thumbnails)
  - Touch-friendly controls
  - Auto-detecting current slide
  - Smooth fade and scale transitions
- **Hover States:** Premium hover effects on all interactive elements

### Content Sections
1. **Hero:** Animated introduction with CTA buttons and statistics
2. **About:** Personal story with feature cards
3. **Featured Work:** Interactive project showcase with detailed description
4. **Expertise:** Skills organized by category with contextual descriptions
5. **Contact:** Multiple contact methods and resume download

### Technical Features
- **SEO Optimized:** Proper meta tags and semantic HTML
- **Active Section Detection:** Navigation highlights current section on scroll
- **Accessible:** WCAG compliant with proper contrast ratios
- **Fast Loading:** Optimized images and code splitting

---

## 🛠️ Tech Stack

### Core
- **React 19.1.0** - UI library
- **TypeScript 5.9.2** - Type safety
- **Vite** - Build tool and dev server

### Styling
- **Tailwind CSS 3.x** - Utility-first CSS framework
- **Custom CSS** - Additional animations and effects

### Icons & Assets
- **Lucide React** - Icon library
- **Custom Fonts** - SF Pro Display / -apple-system

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

---

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── curriculo.pdf           # Resume file
│   └── projects/
│       └── stockflow/          # Project assets
│           ├── demo.gif
│           ├── screen-1.png
│           ├── screen-2.png
│           └── screen-3.png
├── src/
│   ├── App.tsx                 # Main portfolio component
│   ├── main.tsx               # Application entry point
│   └── index.css              # Global styles
├── index.html                  # HTML template
├── tailwind.config.js         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite configuration
└── package.json               # Dependencies
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/MatheusLimaAlves/Portfolio.Matheus-Lima.git
cd Portfolio.Matheus-Lima
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

---

## 🎨 Customization

### Personal Information

Update the following in `src/App.tsx`:

```typescript
// Line ~10: Your name
const fullName = "Your Name Here";

// Project images array
const projectImages = [
  { src: '/projects/your-project/demo.gif', alt: 'Demo', type: 'gif' },
  // Add your screenshots
];
```

### Contact Links

Replace these URLs throughout the code:
- LinkedIn: `https://linkedin.com/in/your-profi`
- GitHub: `https://github.com/your-username`
- Email: `mailto:your.email@example.com`

### Resume File

1. Add your PDF to: `public/curriculo.pdf`
2. Update download name in the Contact section:
```typescript
download="Your_Name_Resume.pdf"
```

### Project Content

Update project details in the Featured Work section:
- Project name and description
- Features list
- Technologies used
- Status badge

### Colors & Theme

Modify the Tailwind config (`tailwind.config.js`) to change:
- Font families
- Custom colors
- Spacing scales
- Breakpoints

---

## 🌐 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy on Vercel**
```bash
npm i -g vercel
vercel login
vercel
```

Or connect your GitHub repo at [vercel.com](https://vercel.com)

### Other Platforms

The site can be deployed to:
- **Netlify:** Drag & drop the `dist/` folder
- **GitHub Pages:** Use `gh-pages` branch
- **Cloudflare Pages:** Connect repository
- **Railway:** Direct GitHub integration

---

## ⚡ Performance

### Optimization Strategies

- **Code Splitting:** Vite automatically splits code
- **Image Optimization:** 
  - Use WebP format when possible
  - Compress images with TinyPNG
  - Lazy load below-the-fold images
- **Minification:** CSS and JS minified in production
- **Caching:** Leverage browser caching for static assets
- **CDN:** Deploy to CDN for global distribution

### Lighthouse Scores

Target metrics:
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

---

## 🔧 Troubleshooting

### Common Issues

**Images not loading:**
- Ensure images are in `public/` folder
- Check file names match exactly (case-sensitive)
- Verify paths start with `/`

**Typing animation not working:**
- Clear browser cache
- Check `fullName` variable is set
- Verify useEffect dependencies

**Mobile menu not opening:**
- Check `isMobileMenuOpen` state
- Verify hamburger button onClick handler
- Test on actual mobile device, not just DevTools

---

## 📝 Development Notes

### Design Philosophy

This portfolio follows these principles:
1. **Precision:** Every pixel matters, alignments are perfect
2. **Simplicity:** Remove anything that doesn't add value
3. **Elegance:** Subtle animations over flashy effects
4. **Performance:** Speed is a feature
5. **Accessibility:** Everyone should be able to use it

### Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Responsive Breakpoints

```
Mobile:  < 768px
Tablet:  768px - 1024px
Desktop: > 1024px
```

---

## 📄 License

This project is open source and available under the MIT License.

Feel free to use this code for your own portfolio, but please:
- ✅ Change all personal information
- ✅ Add your own projects and content
- ✅ Customize the design to make it unique
- ❌ Don't claim the design as entirely your own creation

---

## 🤝 Contributing

While this is a personal portfolio, suggestions and improvements are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

---

## 📬 Contact

**Matheus Lima Alves**
- Portfolio: [MatheusLima](https://portfolio-matheus-lima.vercel.app/)
- LinkedIn: [@dev-matheu-lima](https://www.linkedin.com/in/dev-matheus-lima/?trk=opento_sprofile_details)
- GitHub: [@MatheusLimaAlves](https://github.com/MatheusLimaAlves)
- Email: [devmatheuslimaalves@outlook.com](mailto:devmatheuslimaalves@outlook.com)

 "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life" - John 3:16

---

- Design inspiration: Tesla, Apple
- Icons: Lucide React
- Animations: Custom CSS & Tailwind
- Typography: SF Pro Display
- Hosting: Vercel

---

<div align="center">

**⭐️ If you found this portfolio helpful, consider giving it a star!**

Made with ☕ by [Matheus Lima Alves](https://github.com/MatheusLimaAlves)

</div>
