import { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Zap, Code, Terminal, Brain, ArrowUpRight } from 'lucide-react';

const Portfolio = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [displayedName, setDisplayedName] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const fullName = "Matheus Lima Alves";
  const projectImages = [
    { 
      src: '/projects/stockflow/demo.gif',
      alt: 'StockFlow App Demo - Main Interface',
      type: 'gif'
    },
    { 
      src: '/projects/stockflow/screen-1.png',
      alt: 'StockFlow - Login Screen',
      type: 'image'
    },
    { 
      src: '/projects/stockflow/screen-2.png',
      alt: 'StockFlow - Dashboard',
      type: 'image'
    },
    { 
      src: '/projects/stockflow/screen-3.png',
      alt: 'StockFlow - Inventory Management',
      type: 'image'
    }
  ];

  // Typing Animation
  useEffect(() => {
    if (displayedName.length < fullName.length) {
      const timeout = setTimeout(() => {
        setDisplayedName(fullName.slice(0, displayedName.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      setIsTypingComplete(true);
    }
  }, [displayedName]);

  // Elegant Electric Particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles: Array<{x: number, y: number, vx: number, vy: number, life: number}> = [];
    
    const createParticle = () => {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        life: Math.random() * 200 + 100
      });
    };
    
    for (let i = 0; i < 8; i++) createParticle();
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        
        if (p.life <= 0 || p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
          particles.splice(i, 1);
          createParticle();
        }
        
        const opacity = Math.min(p.life / 100, 0.015);
        
        // Draw connections
        particles.forEach(p2 => {
          const dx = p2.x - p.x;
          const dy = p2.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 200) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 0, 0, ${opacity * (1 - dist / 200)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 0, 0, ${opacity * 2})`;
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      
      const sections = ['hero', 'about', 'project', 'skills', 'contact'];
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
          }
        }
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-white text-black min-h-screen relative overflow-hidden">
      {/* Elegant Particle Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
      
      {/* Scroll Progress */}
      <div className="fixed top-0 left-0 w-full h-0.5 bg-gray-100 z-50">
        <div 
          className="h-full bg-black transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Elegant Cursor - Hidden on mobile */}
      <div 
        className="hidden md:block fixed w-4 h-4 border border-black/30 rounded-full pointer-events-none z-50 transition-all duration-200 ease-out"
        style={{
          left: `${mousePosition.x - 8}px`,
          top: `${mousePosition.y - 8}px`,
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-white/90 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-6 md:py-8">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => scrollToSection('hero')}
              className="text-lg md:text-xl font-light tracking-[0.2em] hover:tracking-[0.25em] transition-all duration-500"
            >
              PORTFOLIO
            </button>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-12 lg:gap-16">
              {[
                { name: 'About', id: 'about' },
                { name: 'Work', id: 'project' },
                { name: 'Expertise', id: 'skills' },
                { name: 'Contact', id: 'contact' }
              ].map(item => (
                <button 
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm tracking-wider transition-all duration-300 relative ${
                    activeSection === item.id ? 'text-black' : 'text-gray-400 hover:text-black'
                  }`}
                >
                  {item.name}
                  {activeSection === item.id && (
                    <div className="absolute -bottom-2 left-0 w-full h-px bg-black" />
                  )}
                </button>
              ))}
            </div>

            {/* Mobile Hamburger */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              aria-label="Menu"
            >
              <span className={`w-6 h-px bg-black transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-6 h-px bg-black transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-6 h-px bg-black transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-black/10 transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
        }`}>
          <div className="px-6 py-8 space-y-6">
            {[
              { name: 'About', id: 'about' },
              { name: 'Work', id: 'project' },
              { name: 'Expertise', id: 'skills' },
              { name: 'Contact', id: 'contact' }
            ].map(item => (
              <button 
                key={item.id}
                onClick={() => {
                  scrollToSection(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left text-xl font-light tracking-wider transition-all duration-300 ${
                  activeSection === item.id ? 'text-black' : 'text-gray-400'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center px-6 md:px-16 pt-32 md:pt-24 relative">
        <div className="max-w-7xl w-full relative z-10">
          <div className="mb-12 md:mb-16">
            <div className="inline-flex items-center gap-3 mb-8 md:mb-12 group">
              <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
              <span className="text-xs tracking-[0.25em] text-gray-500 uppercase">Available for Work</span>
            </div>
          </div>

          <div className="space-y-6 md:space-y-8 mb-16 md:mb-20">
            <h1 className="text-[12vw] sm:text-[10vw] md:text-[9vw] lg:text-[8vw] font-light leading-[0.9] tracking-tighter">
              {displayedName}
              {!isTypingComplete && (
                <span className="inline-block w-1 h-[0.9em] bg-black ml-2 animate-pulse" />
              )}
            </h1>
            
            <div className="flex items-center gap-4 md:gap-8 pl-1">
              <div className="w-12 md:w-24 h-px bg-black" />
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-wider text-gray-700">
                Full Stack Developer
              </h2>
            </div>
          </div>

          <div className="max-w-3xl mb-16 md:mb-24">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-gray-600">
              I’m a developer driven by curiosity and purpose, 
              learning every day to craft technology that truly makes an impact.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6 mb-20 md:mb-32">
            <button 
              onClick={() => scrollToSection('project')}
              className="group relative px-8 md:px-12 py-4 md:py-6 bg-black text-white overflow-hidden w-full sm:w-auto"
            >
              <span className="relative z-10 text-sm tracking-wider flex items-center justify-center gap-3">
                View Projects
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </button>
            
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-8 md:px-12 py-4 md:py-6 text-sm tracking-wider border border-black/20 hover:border-black transition-all duration-300 w-full sm:w-auto"
            >
              Get in Touch
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 md:gap-12 lg:gap-20 max-w-4xl pt-8 md:pt-12 border-t border-black/10">
            {[
              { value: '08', label: 'Technologies', unit: '+' },
              { value: '01', label: 'Featured Project', unit: '' },
              { value: '100', label: 'Dedication', unit: '%' }
            ].map((stat, i) => (
              <div key={i} className="group">
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light mb-2 md:mb-3 transition-all duration-300">
                  {stat.value}<span className="text-xl sm:text-2xl md:text-3xl lg:text-5xl text-gray-400">{stat.unit}</span>
                </div>
                <div className="text-[10px] sm:text-xs tracking-wider text-gray-500 uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-40 px-6 md:px-16 relative">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:mb-20">
            <span className="text-xs tracking-[0.25em] text-gray-400 uppercase mb-4 md:mb-6 block">01 — About</span>
          </div>

          <div className="grid md:grid-cols-12 gap-12 md:gap-20 items-start">
            <div className="md:col-span-5 space-y-6 md:space-y-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
                Innovation Through Learning
              </h2>
              
              <div className="space-y-4 md:space-y-6 text-base md:text-lg font-light text-gray-600 leading-relaxed">
                <p>
                  Like every great developer, I believe progress starts with curiosity and continuous learning.
                  I’m passionate about building meaningful digital experiences with clean code and modern design principles.
                </p>
                
                <p>
                  Currently deepening my skills in React, TypeScript, and Python, 
                  I’m focused on developing projects that combine functionality, performance, and creativity.
                </p>
              </div>

              <div className="flex gap-4 md:gap-6 pt-6 md:pt-8">
                {[
                  { icon: Github, url: 'https://github.com/MatheusLimaAlves' },
                  { icon: Linkedin, url: 'https://www.linkedin.com/in/dev-matheus-lima/' },
                  { icon: Mail, url: 'mailto:devmatheuslimaalves@outlook.com' }
                ].map((social, i) => (
                  <a 
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 border border-black/20 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all duration-300 active:scale-95"
                  >
                    <social.icon size={18} strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </div>

            <div className="md:col-span-7 space-y-4 md:space-y-6">
              {[
                {
                  icon: Code,
                  title: 'Clean Code',
                  desc: 'Writing readable and maintainable code to ensure long-term project growth.'
                },
                {
                  icon: Zap,
                  title: 'Performance Mindset',
                  desc: 'Learning how to optimise every interaction for better user experience.'
                },
                {
                  icon: Terminal,
                  title: 'Full Stack Growth',
                  desc: 'Building projects that connect frontend and backend technologies step by step.'
                },
                {
                  icon: Brain,
                  title: 'Strategic Thinking',
                  desc: 'Approaching challenges with logic, creativity, and a learner’s mindset.'
                }
              ].map((item, i) => (
                <div 
                  key={i}
                  className="group p-6 md:p-8 lg:p-10 bg-gray-50 hover:bg-white border border-transparent hover:border-black/10 transition-all duration-500"
                >
                  <div className="flex items-start gap-4 md:gap-6">
                    <div className="mt-1 flex-shrink-0">
                      <item.icon className="transition-transform duration-500 group-hover:scale-110" size={24} strokeWidth={1} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-light mb-2 md:mb-3">{item.title}</h3>
                      <p className="text-sm font-light text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project Section */}
      <section id="project" className="py-20 md:py-40 px-6 md:px-16 relative bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:mb-20">
            <span className="text-xs tracking-[0.25em] text-gray-400 uppercase mb-4 md:mb-6 block">02 — Featured Work</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light">
              Selected Project
            </h2>
          </div>

          <div className="bg-white border border-black/10 hover:border-black/30 transition-all duration-500">
            <div className="grid md:grid-cols-5 gap-0">
              {/* Visual Showcase - 3 columns */}
              <div className="md:col-span-3 bg-gray-50 p-6 md:p-12 lg:p-16">
                <div className="space-y-6 md:space-y-8">
                  {/* Main Carousel */}
                  <div className="relative aspect-[9/16] max-w-sm mx-auto bg-white rounded-2xl overflow-hidden group shadow-2xl border border-gray-200">
                    {/* Image Container */}
                    <div className="relative w-full h-full flex items-center justify-center">
                      {projectImages.map((img, i) => (
                        <div
                          key={i}
                          className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out ${
                            i === currentImageIndex 
                              ? 'opacity-100 scale-100' 
                              : 'opacity-0 scale-95'
                          }`}
                        >
                          <img 
                            src={img.src}
                            alt={img.alt}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Navigation Arrows - Larger for touch */}
                    <button
                      onClick={() => setCurrentImageIndex((currentImageIndex - 1 + projectImages.length) % projectImages.length)}
                      className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/95 backdrop-blur border border-gray-300 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 hover:bg-black hover:text-white hover:border-black hover:scale-110 active:scale-95 shadow-xl"
                    >
                      <span className="text-lg font-bold">←</span>
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex((currentImageIndex + 1) % projectImages.length)}
                      className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/95 backdrop-blur border border-gray-300 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 hover:bg-black hover:text-white hover:border-black hover:scale-110 active:scale-95 shadow-xl"
                    >
                      <span className="text-lg font-bold">→</span>
                    </button>

                    {/* Progress Indicator */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-white/80 backdrop-blur px-3 py-2 rounded-full">
                      {projectImages.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentImageIndex(i)}
                          className={`transition-all duration-300 ${
                            i === currentImageIndex
                              ? 'w-8 h-1.5 bg-black'
                              : 'w-1.5 h-1.5 bg-black/30 hover:bg-black/60'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Thumbnail Navigation */}
                  <div className="grid grid-cols-4 gap-2 md:gap-3">
                    {projectImages.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentImageIndex(i)}
                        className={`aspect-[9/16] bg-white border rounded-lg overflow-hidden transition-all duration-300 flex items-center justify-center ${
                          i === currentImageIndex
                            ? 'border-black ring-2 ring-black scale-105'
                            : 'border-gray-200 hover:border-gray-400 active:scale-95'
                        }`}
                      >
                        <img 
                          src={img.src}
                          alt={`${img.alt} - Thumbnail`}
                          className="w-full h-full object-contain"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content - 2 columns */}
              <div className="md:col-span-2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <div className="mb-6 flex flex-wrap items-center gap-3">
                  <span className="text-xs tracking-wider text-gray-400 uppercase">Expo / React Native / TypeScript</span>
                  <div className="px-3 py-1 bg-black text-white text-xs tracking-wider">
                    PRODUCT
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-light mb-4 md:mb-6 leading-tight">
                  StockFlow
                </h3>

                <p className="text-sm text-gray-500 font-light mb-6 md:mb-8 leading-relaxed">
                  Enterprise Inventory Management System
                </p>

                <p className="text-sm md:text-base font-light text-gray-600 leading-relaxed mb-8 md:mb-10">
                  A complete mobile inventory management system designed for enterprise use.
                  It includes barcode scanning, QR code generation, advanced analytics, Excel import/export, and offline-first
                  functionality — all built with scalability and usability in mind.
                </p>

                <div className="space-y-3 md:space-y-4 mb-8 md:mb-10">
                  {[
                    'Integrated barcode scanner for fast product registration',
                    'Advanced analytics and inventory trend insights',
                    'PDF report generation with print and share capabilities',
                    'Data import/export via Excel spreadsheets',
                    'Push notification system for low-stock alerts',
                    'Offline-first mode with automatic data synchronization',
                    'Native iOS/Android interface optimized for performance'
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-3 md:w-4 h-px bg-black/20 mt-2 md:mt-2.5 flex-shrink-0" />
                      <p className="text-xs md:text-sm font-light text-gray-700 leading-relaxed flex-1">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-8 md:mb-10 pb-8 md:pb-10 border-b border-gray-200">
                  {['Expo SDK 54', 'React Native', 'TypeScript', 'AsyncStorage', 'Chart Kit', 'QR Code', 'Excel Integration'].map(tech => (
                    <span 
                      key={tech}
                      className="px-3 py-1.5 text-xs tracking-wider border border-black/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="inline-flex items-center gap-2 text-xs tracking-wider text-gray-500">
                  <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
                  <span>In Active Development • Scaling for Enterprise use</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 md:py-40 px-6 md:px-16 relative">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:mb-20">
            <span className="text-xs tracking-[0.25em] text-gray-400 uppercase mb-4 md:mb-6 block">03 — Expertise</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light">
              Technical Proficiency
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: 'Frontend Development',
                skills: [
                  { 
                    name: 'React & TypeScript', 
                    desc: 'Developing interactive user interfaces and learning best practices for component-based design and clean architecture.'
                  },
                  { 
                    name: 'JavaScript ES6+', 
                    desc: 'Strengthening skills with async/await, destructuring, and modular code to create efficient web solutions.'
                  },
                  { 
                    name: 'HTML & CSS', 
                    desc: 'Building responsive layouts with semantic HTML and modern CSS tools like Flexbox and Grid.'
                  },
                  { 
                    name: 'React Native', 
                    desc: 'Exploring cross-platform development and building simple mobile applications for hands-on experience.'
                  }
                ]
              },
              {
                title: 'Backend Development',
                skills: [
                  { 
                    name: 'Python & Flask', 
                    desc: 'Learning to create RESTful APIs and understand the basics of server-side logic and data handling.'
                  },
                  { 
                    name: 'Node.js', 
                    desc: 'Building small backend applications and experimenting with asynchronous operations.'
                  },
                  { 
                    name: 'REST APIs', 
                    desc: 'Understanding how to design, test, and document simple API endpoints.'
                  },
                  { 
                    name: 'Authentication', 
                    desc: 'Implementing basic authentication with JWT and exploring secure login flows.'
                  }
                ]
              },
              {
                title: 'Tools & Workflow',
                skills: [
                  { 
                    name: 'Git & GitHub', 
                    desc: 'Practicing version control, branching, and collaborative workflows.'
                  },
                  { 
                    name: 'Figma', 
                    desc: 'Converting UI designs into responsive interfaces while learning design fundamentals.'
                  },
                  { 
                    name: 'Postman', 
                    desc: 'Testing and documenting API routes to improve understanding of request–response cycles.'
                  },
                  { 
                    name: 'VS Code', 
                    desc: 'Using extensions and settings to optimise productivity and learn debugging tools.'
                  }
                ]
              }
            ].map((category, i) => (
              <div key={i} className="bg-gray-50 p-8 md:p-10 border border-transparent hover:border-black/10 transition-all duration-500">
                <h3 className="text-lg md:text-xl font-light mb-8 md:mb-10 pb-4 md:pb-6 border-b border-black/10">
                  {category.title}
                </h3>
                <div className="space-y-6 md:space-y-8">
                  {category.skills.map((skill, j) => (
                    <div key={j} className="group">
                      <h4 className="text-sm font-medium mb-2">{skill.name}</h4>
                      <p className="text-xs font-light text-gray-600 leading-relaxed">
                        {skill.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-40 px-6 md:px-16 relative">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 md:mb-20">
            <span className="text-xs tracking-[0.25em] text-gray-400 uppercase mb-4 md:mb-6 block">04 — Contact</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-light leading-tight mb-8 md:mb-12">
            Let’s Build and Learn Together
          </h2>
          
          <p className="text-lg sm:text-xl md:text-2xl font-light text-gray-600 mb-12 md:mb-20 max-w-3xl leading-relaxed">
            I’m looking for opportunities to grow as a developer, 
            collaborate with inspiring teams, and turn ideas into meaningful digital experiences.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6 mb-12 md:mb-16">
            <a 
              href="mailto:devmatheuslimaalves@outlook.com"
              className="group px-8 md:px-12 py-4 md:py-6 bg-black text-white hover:bg-gray-900 transition-all duration-300 w-full sm:w-auto"
            >
              <span className="flex items-center justify-center gap-3 text-sm tracking-wider">
                <Mail size={18} strokeWidth={1.5} />
                Email Me
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
            
            <a 
              href="https://www.linkedin.com/in/dev-matheus-lima/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 md:px-12 py-4 md:py-6 text-sm tracking-wider border border-black/20 hover:border-black transition-all duration-300 flex items-center justify-center gap-3 w-full sm:w-auto active:scale-95"
            >
              <Linkedin size={18} strokeWidth={1.5} />
              LinkedIn
            </a>

            <a 
              href="https://github.com/MatheusLimaAlves"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 md:px-12 py-4 md:py-6 text-sm tracking-wider border border-black/20 hover:border-black transition-all duration-300 flex items-center justify-center gap-3 w-full sm:w-auto active:scale-95"
            >
              <Github size={18} strokeWidth={1.5} />
              GitHub
            </a>
          </div>

          <a 
            href="/curriculo.pdf"
            download="Currículo-Matheus-Lima.pdf"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors border-b border-gray-300 hover:border-black pb-1"
          >
            Download Resume
            <ArrowUpRight size={12} />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 md:py-16 px-6 md:px-16 border-t border-black/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 text-center md:text-left">
          <p className="text-xs tracking-wider text-gray-400 uppercase">
            © 2025 Matheus Lima Alves
          </p>
          <p className="text-xs tracking-wider text-gray-400 uppercase">
            Designed & Developed with Precision
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Portfolio;