import React, { useState } from 'react';
import { Mail, ExternalLink, Code2, Users, Star, ArrowRight, Server, Terminal, Database, Palette } from 'lucide-react';
import { FiGithub as Github, FiLinkedin as Linkedin } from 'react-icons/fi';
import { ContainerScroll } from './components/ui/container-scroll-animation';
import { GooeyText } from './components/ui/gooey-text-morphing';

import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

const handleSmoothScroll = (e) => {
  const href = e.currentTarget.getAttribute('href');
  console.log('Clicked smooth scroll link:', href);
  if (href && href.startsWith('#')) {
    e.preventDefault();
    if (href === '#') {
      if (window.lenis) {
        console.log('Scrolling to top via Lenis');
        window.lenis.scrollTo(0, { duration: 1.5 });
      } else {
        console.log('Scrolling to top via native browser');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      const targetElement = document.querySelector(href);
      console.log('Target element:', targetElement);
      if (targetElement) {
        if (window.lenis) {
          console.log('Scrolling to element via Lenis');
          window.lenis.scrollTo(targetElement, { offset: -50, duration: 1.5 });
        } else {
          console.log('Scrolling to element via native browser');
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  }
};

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700;900&family=Kalam:wght@700&family=Patrick+Hand&display=swap');

    html {
      scroll-behavior: initial;
    }

    body {
      margin: 0;
      padding: 0;
      overflow-x: hidden;
    }

    /* --- BRUTALIST THEME SCOPE --- */
    .theme-brutalist {
      font-family: 'Space Grotesk', sans-serif;
      background-color: #FFFDF5;
      color: #000;
      background-image: radial-gradient(rgba(0,0,0,0.15) 1.5px, transparent 1.5px);
      background-size: 24px 24px;
      min-height: 100vh;
    }
    
    .theme-brutalist .marquee-container {
      overflow: hidden;
      white-space: nowrap;
      width: 100vw;
      border-top: 4px solid #000;
      border-bottom: 4px solid #000;
      background-color: #FFD93D;
      padding: 1rem 0;
      display: flex;
    }

    .theme-brutalist .marquee-content {
      display: inline-flex;
      animation: marquee 15s linear infinite;
    }

    .theme-brutalist .text-stroke {
      -webkit-text-stroke: 2px black;
      color: transparent;
    }

    /* --- HAND-DRAWN THEME SCOPE --- */
    .theme-handdrawn {
      font-family: 'Patrick Hand', cursive;
      background-color: #fdfbf7;
      color: #2d2d2d;
      /* Notebook paper dot grid */
      background-image: radial-gradient(#e5e0d8 1px, transparent 1px);
      background-size: 24px 24px;
      min-height: 100vh;
    }

    .theme-handdrawn .font-kalam {
      font-family: 'Kalam', cursive;
    }

    .theme-handdrawn .text-stroke-hand {
      -webkit-text-stroke: 1px #2d2d2d;
      color: transparent;
    }

    /* Shared Animations */
    @keyframes marquee {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-50%); }
    }

    /* Scrollbars */
    ::-webkit-scrollbar { width: 12px; }
    
    .theme-brutalist ::-webkit-scrollbar-track { background: #FFFDF5; border-left: 4px solid black; }
    .theme-brutalist ::-webkit-scrollbar-thumb { background: #FF6B6B; border: 4px solid black; }

    .theme-handdrawn ::-webkit-scrollbar-track { background: #fdfbf7; border-left: 2px dashed #e5e0d8; }
    .theme-handdrawn ::-webkit-scrollbar-thumb { background: #2d5da1; border-radius: 10px; border: 2px solid #fdfbf7; }
  `}</style>
);

// ==========================================
//          HAND-DRAWN COMPONENTS
// ==========================================

// Irregular radii for the wobbly effect
const WOBBLY_1 = "255px 15px 225px 15px / 15px 225px 15px 255px";
const WOBBLY_2 = "15px 225px 15px 255px / 255px 15px 225px 15px";
const WOBBLY_3 = "225px 15px 255px 15px / 15px 255px 15px 225px";

const HandButton = ({ children, href, className = '', color = 'hover:bg-[#ff4d4d]', ...props }) => {
  const baseClasses = `
    inline-flex items-center justify-center gap-2 bg-white border-[3px] border-[#2d2d2d] 
    text-[#2d2d2d] px-6 py-3 text-lg transition-all duration-100 ease-linear
    shadow-[4px_4px_0px_0px_#2d2d2d]
    ${color} hover:text-white hover:shadow-[2px_2px_0px_0px_#2d2d2d] hover:translate-x-[2px] hover:translate-y-[2px]
    active:shadow-none active:translate-x-[4px] active:translate-y-[4px]
    ${className}
  `;

  if (href) {
    return <a href={href} className={baseClasses} style={{ borderRadius: WOBBLY_1 }} {...props}>{children}</a>;
  }
  return <button className={baseClasses} style={{ borderRadius: WOBBLY_1 }} {...props}>{children}</button>;
};

const HandCard = ({ children, className = '', decoration = 'none' }) => (
  <div className={`relative bg-white border-[3px] border-[#2d2d2d] p-6 sm:p-8 shadow-[4px_4px_0px_0px_#2d2d2d] transition-transform hover:-rotate-1 ${className}`} style={{ borderRadius: WOBBLY_2 }}>
    {decoration === 'tape' && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-gray-400/30 backdrop-blur-sm -rotate-2 z-10" style={{ borderRadius: '2px 4px 2px 4px' }} />
    )}
    {decoration === 'tack' && (
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#ff4d4d] rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] border border-black/20 z-10" />
    )}
    {children}
  </div>
);

const StickyNote = ({ children, className = '', rotate = '-rotate-2' }) => (
  <div className={`bg-[#fff9c4] border-2 border-[#2d2d2d]/20 p-6 shadow-[3px_3px_5px_rgba(0,0,0,0.1)] ${rotate} transition-transform hover:rotate-0 ${className}`} style={{ borderRadius: '2px 15px 2px 15px' }}>
    {children}
  </div>
);

const HandDrawnArrow = ({ className }) => (
  <svg viewBox="0 0 100 100" className={`text-[#2d2d2d] fill-none stroke-current ${className}`} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10,10 Q40,20 80,80" strokeDasharray="6,4" />
    <path d="M80,80 L60,85 M80,80 L85,60" />
  </svg>
);

// ==========================================
//          HAND-DRAWN PORTFOLIO
// ==========================================

const HandDrawnPortfolio = () => {
  return (
    <div className="theme-handdrawn relative">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-[#fdfbf7]/90 backdrop-blur px-6 py-4 flex justify-between items-center border-b-2 border-dashed border-[#e5e0d8]">
        <a href="#" onClick={handleSmoothScroll} className="font-kalam text-3xl flex items-center group hover:-rotate-2 transition-transform duration-300">
          <div className="relative">
            <span className="text-[#2d2d2d] z-10 relative">Ojaswa</span>
            <span className="absolute bottom-1 left-0 w-full h-[8px] bg-[#ff4d4d]/30 -rotate-2 z-0 rounded-full group-hover:bg-[#f9a826]/50 transition-colors"></span>
          </div>
          <span className="text-[#2d5da1] ml-1 animate-pulse">.</span>
        </a>
        <div className="hidden sm:flex gap-8 text-xl">
          <a href="#about-hd" onClick={handleSmoothScroll} className="hover:text-[#ff4d4d] hover:-translate-y-1 transition-transform decoration-wavy underline-offset-4 hover:underline">About</a>
          <a href="#projects-hd" onClick={handleSmoothScroll} className="hover:text-[#2d5da1] hover:-translate-y-1 transition-transform decoration-wavy underline-offset-4 hover:underline">Projects</a>
        </div>
        <HandButton href="#contact-hd" onClick={handleSmoothScroll} className="!py-1 !px-4 text-base" color="hover:bg-[#2d5da1]">Let's Talk</HandButton>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-20 px-4 sm:px-8 max-w-5xl mx-auto relative min-h-[90vh] flex flex-col justify-center">
        <div className="absolute top-32 right-10 md:right-32 animate-[bounce_3s_infinite]">
          <StickyNote rotate="rotate-6" className="!p-3 text-sm !bg-[#e5e0d8]">🚀 Available for work!</StickyNote>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1 max-w-2xl">
            <div className="inline-block border-2 border-[#2d2d2d] px-4 py-1 mb-6 rotate-2 bg-white" style={{ borderRadius: WOBBLY_3 }}>
              <span className="text-xl text-[#2d5da1]">Hi there! I am</span>
            </div>
            
            <h1 className="font-kalam text-6xl sm:text-8xl lg:text-[7rem] leading-none text-[#2d2d2d] -rotate-1 relative mb-8">
              Ojaswa <br/>
              <span className="text-[#ff4d4d]">Chauhan</span>
            </h1>

            <p className="text-2xl md:text-3xl leading-relaxed mb-8 max-w-xl">
              Frontend Engineer, problem solver, and former <u>School Captain</u>. 
              I build creative, high-performance web experiences.
            </p>

            <div className="flex flex-wrap items-center gap-6 relative">
              <HandButton href="#projects-hd" onClick={handleSmoothScroll}>
                View Projects <ArrowRight className="stroke-[3px]" size={20} />
              </HandButton>
              <HandDrawnArrow className="w-16 h-16 absolute -bottom-12 left-32 hidden md:block" />
              
              <div className="flex gap-4">
                <a href="https://github.com/O-zayy" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center border-[3px] border-[#2d2d2d] bg-white hover:bg-[#e5e0d8] hover:-rotate-6 transition-all shadow-[2px_2px_0px_0px_#2d2d2d]" style={{ borderRadius: WOBBLY_2 }}>
                  <Github className="stroke-[2.5px]" size={24} />
                </a>
                <a href="https://www.linkedin.com/in/ojaswa-chauhan-812261381/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center border-[3px] border-[#2d2d2d] bg-white hover:bg-[#2d5da1] hover:text-white hover:rotate-6 transition-all shadow-[2px_2px_0px_0px_#2d2d2d]" style={{ borderRadius: WOBBLY_1 }}>
                  <Linkedin className="stroke-[2.5px]" size={24} />
                </a>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full flex justify-center md:justify-end mt-12 md:mt-0">
             {/* Hand-Drawn Picture Frame */}
             <div className="relative bg-white border-[3px] border-[#2d2d2d] p-3 shadow-[8px_8px_0px_0px_#2d2d2d] rotate-3 hover:rotate-1 transition-transform duration-300" style={{ borderRadius: WOBBLY_2 }}>
                {/* Tape Decoration */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-gray-400/20 backdrop-blur-sm -rotate-3 z-10" style={{ borderRadius: '2px 4px 2px 4px' }} />
                <img 
                  src="Me .jpeg" 
                  alt="Ojaswa Chauhan" 
                  className="w-64 h-80 sm:w-72 sm:h-96 object-cover border-[3px] border-[#2d2d2d]" 
                  style={{ borderRadius: WOBBLY_1 }}
                />
             </div>
          </div>
        </div>
      </header>

      {/* About & Skills */}
      <section id="about-hd" className="py-24 px-4 sm:px-8 max-w-6xl mx-auto border-t-2 border-dashed border-[#e5e0d8]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div className="relative">
            <h2 className="font-kalam text-5xl text-[#2d5da1] mb-8 rotate-1">The Pitch</h2>
            <HandCard decoration="tape" className="bg-[#fdfbf7] !border-dashed">
              <Users className="mb-4 stroke-[2.5px] text-[#ff4d4d]" size={40} />
              <h3 className="font-kalam text-3xl mb-4">Born to Lead, Built to Code</h3>
              <p className="text-xl mb-4 leading-relaxed">
                Serving as School Captain for two consecutive years (Class 11 & 12) taught me more than just public speaking. It taught me how to manage chaos, unite teams, and deliver results under pressure.
              </p>
              <p className="text-xl leading-relaxed">
                Today, I bring that same leadership to my code. Whether I'm structuring a complex React app or optimizing a MySQL database, I take ownership of the entire process.
              </p>
            </HandCard>
          </div>

          <div>
            <div className="flex flex-col items-center justify-center h-48 mb-8 border-4 border-dashed border-[#e5e0d8] bg-[#fdfbf7]">
               <GooeyText
                 texts={["React", "Motion.dev", "Python", "MySQL", "UI/UX", "JavaScript"]}
                 morphTime={1.2}
                 cooldownTime={0.8}
                 textClassName="font-kalam text-[#ff4d4d]"
               />
               <p className="font-kalam text-xl mt-12 text-[#2d2d2d]/60 rotate-2">...and counting.</p>
            </div>
            
            <h2 className="font-kalam text-5xl mb-8 -rotate-2">Tech Arsenal</h2>
            <div className="flex flex-wrap gap-4">
              <StickyNote className="!p-4 rotate-2 w-32 flex flex-col items-center gap-2">
                <Code2 className="stroke-[2.5px] text-[#2d5da1]" /> <span className="text-xl">React.js</span>
              </StickyNote>
              <StickyNote className="!p-4 -rotate-3 w-32 flex flex-col items-center gap-2 !bg-white border-2 border-[#2d2d2d]">
                <Terminal className="stroke-[2.5px] text-[#ff4d4d]" /> <span className="text-xl">JS / HTML</span>
              </StickyNote>
              <StickyNote className="!p-4 rotate-6 w-32 flex flex-col items-center gap-2 !bg-[#e5e0d8]">
                <Server className="stroke-[2.5px]" /> <span className="text-xl">Python</span>
              </StickyNote>
              <StickyNote className="!p-4 -rotate-2 w-32 flex flex-col items-center gap-2">
                <Database className="stroke-[2.5px] text-[#2d5da1]" /> <span className="text-xl">MySQL</span>
              </StickyNote>
              <StickyNote className="!p-4 rotate-1 w-32 flex flex-col items-center gap-2 !bg-white border-2 border-dashed border-[#2d2d2d]">
                <Palette className="stroke-[2.5px] text-[#ff4d4d]" /> <span className="text-xl">UI/UX</span>
              </StickyNote>
              <StickyNote className="!p-4 rotate-3 w-32 flex flex-col items-center gap-2 !bg-[#2d2d2d] text-white">
                <Star className="stroke-[2.5px] fill-[#ff4d4d] text-[#ff4d4d]" /> <span className="text-xl">Motion.dev</span>
              </StickyNote>
            </div>
          </div>

        </div>
      </section>

      {/* Projects */}
      <section id="projects-hd" className="py-24 px-4 sm:px-8 bg-white border-y-[3px] border-[#2d2d2d]">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, filter: "blur(20px) contrast(2) brightness(2) sepia(1) hue-rotate(-40deg) saturate(3)", y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, filter: "blur(0px) contrast(1) brightness(1) sepia(0) hue-rotate(0deg) saturate(1)", y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <h2 className="font-kalam text-6xl mb-4">Featured <span className="text-[#ff4d4d] decoration-wavy underline">Work</span></h2>
            <p className="text-xl text-[#2d2d2d]/70 max-w-xl mx-auto">Sketches brought to life. Applications built with passion and human touch.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16">
            <HandCard decoration="tack" className="group">
              <div className="h-64 border-[3px] border-[#2d2d2d] bg-[#111] mb-6 flex items-center justify-center relative overflow-hidden" style={{ borderRadius: WOBBLY_3 }}>
                 <img src="zaika-logo.png" alt="Zaika Logo" className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex gap-2 mb-4">
                <span className="border border-[#2d2d2d] px-2 py-1 text-sm rounded-full">React</span>
                <span className="border border-[#2d2d2d] px-2 py-1 text-sm rounded-full">UI/UX</span>
              </div>
              <h3 className="font-kalam text-3xl mb-3">Swiggy & Zomato Redesign</h3>
              <p className="text-lg mb-6 leading-relaxed">
                A complete ground-up conceptual redesign of India's leading food delivery platforms. Focused on high-conversion UI and intuitive navigation.
              </p>
              <HandButton href="https://zaika-rust.vercel.app/" target="_blank" rel="noopener noreferrer" className="w-full">
                Live Project <ExternalLink size={20} className="stroke-[2.5px]" />
              </HandButton>
            </HandCard>

            <HandCard decoration="tape" className="group md:mt-12">
              <div className="h-64 border-[3px] border-[#2d2d2d] bg-[#111] mb-6 flex items-center justify-center relative overflow-hidden" style={{ borderRadius: WOBBLY_1 }}>
                 <div className="flex items-center justify-center gap-1 group-hover:scale-110 transition-transform font-sans font-bold text-5xl">
                    <span className="text-white tracking-tighter">Ann</span>
                    <span className="bg-[#f9a826] text-black px-3 py-1 rounded-lg tracking-tighter">hub</span>
                 </div>
              </div>
              <div className="flex gap-2 mb-4">
                <span className="border border-[#2d2d2d] px-2 py-1 text-sm rounded-full">Jikan API</span>
                <span className="border border-[#2d2d2d] px-2 py-1 text-sm rounded-full">Neko API</span>
              </div>
              <h3 className="font-kalam text-3xl mb-3">Anime Trailer Showcase</h3>
              <p className="text-lg mb-6 leading-relaxed">
                A dynamic web application aggregating the latest anime trailers and information using massive database coverage APIs.
              </p>
              <HandButton href="https://annhub.vercel.app/" target="_blank" rel="noopener noreferrer" className="w-full" color="hover:bg-[#2d5da1]">
                Live Project <ExternalLink size={20} className="stroke-[2.5px]" />
              </HandButton>
            </HandCard>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact-hd" className="py-32 px-4 text-center max-w-4xl mx-auto">
        <h2 className="font-kalam text-6xl md:text-[5rem] mb-12 text-[#2d2d2d]">
          Let's Build <br/>
          <span className="text-[#2d5da1] inline-block mt-2 -rotate-2">Something</span>
        </h2>
        
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <HandButton href="mailto:thakurojaswachauhan123@gmail.com" className="!text-2xl !px-8 !py-4">
             <Mail className="stroke-[2.5px]" size={28} /> Email Me
          </HandButton>
          <HandButton href="https://www.linkedin.com/in/ojaswa-chauhan-812261381/" target="_blank" rel="noopener noreferrer" className="!text-2xl !px-8 !py-4" color="hover:bg-[#2d5da1]">
             <Linkedin className="stroke-[2.5px]" size={28} /> LinkedIn
          </HandButton>
        </div>
      </section>

      <footer className="py-8 text-center text-[#2d2d2d]/60 border-t-2 border-dashed border-[#e5e0d8] font-kalam text-xl">
        <p>© {new Date().getFullYear()} Ojaswa Chauhan. Sketched with code.</p>
      </footer>
    </div>
  );
};


// ==========================================
//          BRUTALIST COMPONENTS
// ==========================================

const BrutalistButton = ({ children, href, color = 'bg-[#FF6B6B]', className = '', ...props }) => {
  const baseClasses = `
    ${color} text-black font-black uppercase tracking-widest text-sm sm:text-base
    border-4 border-black px-6 py-3
    shadow-[4px_4px_0px_0px_#000] sm:shadow-[8px_8px_0px_0px_#000]
    hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#000] sm:hover:shadow-[10px_10px_0px_0px_#000]
    active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
    transition-all duration-100 ease-linear
    flex items-center justify-center gap-2
    ${className}
  `;

  if (href) {
    return <a href={href} className={baseClasses} {...props}>{children}</a>;
  }
  return <button className={baseClasses} {...props}>{children}</button>;
};

const Badge = ({ children, color = 'bg-[#C4B5FD]', rotate = 'rotate-0', className = '' }) => (
  <div className={`
    ${color} border-4 border-black font-black uppercase text-xs sm:text-sm
    px-3 py-1 shadow-[4px_4px_0px_0px_#000] inline-block
    ${rotate} ${className}
  `}>
    {children}
  </div>
);

// ==========================================
//          BRUTALIST PORTFOLIO
// ==========================================

const BrutalistPortfolio = () => {
  return (
    <div className="theme-brutalist relative selection:bg-[#FFD93D] selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-[#FFFDF5] border-b-4 border-black px-4 py-4 sm:px-8 flex justify-between items-center shadow-[0px_4px_0px_0px_#000]">
        <a href="#" onClick={handleSmoothScroll} className="font-black text-2xl sm:text-3xl uppercase tracking-tighter flex items-center gap-1 group hover:scale-105 transition-transform duration-200">
          <span className="bg-black text-white px-2 py-0 border-2 border-black rotate-2 group-hover:-rotate-2 transition-transform shadow-[2px_2px_0px_0px_#FF6B6B]">OJAS</span>
          <span className="bg-[#FFD93D] text-black px-2 py-0 -rotate-2 border-2 border-black group-hover:rotate-2 transition-transform shadow-[2px_2px_0px_0px_#000]">WA.</span>
        </a>
        <div className="hidden sm:flex gap-4">
          <a href="#about" onClick={handleSmoothScroll} className="font-bold text-lg hover:bg-[#FFD93D] px-2 py-1 border-2 border-transparent hover:border-black transition-all">About</a>
          <a href="#projects" onClick={handleSmoothScroll} className="font-bold text-lg hover:bg-[#C4B5FD] px-2 py-1 border-2 border-transparent hover:border-black transition-all">Projects</a>
        </div>
        <BrutalistButton href="#contact" onClick={handleSmoothScroll} color="bg-[#FFD93D]" className="!py-2 !px-4 text-xs sm:text-sm">
          Let's Talk
        </BrutalistButton>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-20 px-4 sm:px-8 max-w-7xl mx-auto relative min-h-[90vh] flex flex-col justify-center">
        <div className="absolute top-40 right-10 md:right-20 animate-bounce delay-150 z-20">
          <Badge color="bg-[#FF6B6B]" rotate="rotate-12" className="text-white">🚀 Available for work</Badge>
        </div>
        <div className="absolute bottom-40 left-5 md:left-10 animate-pulse hidden md:block z-20">
          <Badge color="bg-[#FFD93D]" rotate="-rotate-6">Frontend + Backend</Badge>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="font-black text-2xl sm:text-3xl uppercase tracking-widest mb-4 bg-[#C4B5FD] inline-block px-4 py-1 border-4 border-black shadow-[4px_4px_0px_0px_#000] -rotate-2">
              Hello, World! I am
            </h2>
            
            <h1 className="font-black text-6xl sm:text-8xl lg:text-[7rem] xl:text-[8.5rem] leading-none tracking-tighter uppercase relative">
              <span className="block text-stroke absolute top-2 left-2 md:top-4 md:left-4 z-[-1]">Ojaswa</span>
              <span className="block relative z-10 text-black">Ojaswa</span>
              <span className="block text-stroke absolute top-2 left-2 md:top-4 md:left-4 z-[-1] mt-[1em]">Chauhan</span>
              <span className="block relative z-10 text-black">Chauhan</span>
            </h1>

            <div className="mt-8 md:mt-12 max-w-xl bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_#000] rotate-1">
              <p className="font-bold text-xl md:text-2xl leading-snug">
                Frontend Engineer, problem solver, and former <span className="bg-[#FFD93D] px-1 border-2 border-black">School Captain</span>. 
                I build bold, high-performance web experiences using React, Python, and MySQL.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <BrutalistButton href="#projects" onClick={handleSmoothScroll} color="bg-[#FF6B6B]" className="text-white">
                  View Projects <ArrowRight size={20} />
                </BrutalistButton>
                <div className="flex gap-4">
                  <a href="https://github.com/O-zayy" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-white border-4 border-black shadow-[4px_4px_0px_0px_#000] flex items-center justify-center hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">
                    <Github size={28} />
                  </a>
                  <a href="https://www.linkedin.com/in/ojaswa-chauhan-812261381/" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-white border-4 border-black shadow-[4px_4px_0px_0px_#000] flex items-center justify-center hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">
                    <Linkedin size={28} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto flex justify-center md:justify-end mt-12 md:mt-0">
             {/* Neo-Brutalist Picture Frame */}
             <div className="relative group">
                {/* Thick background shadow block */}
                <div className="absolute inset-0 bg-[#FFD93D] border-4 border-black translate-x-4 translate-y-4 shadow-[8px_8px_0px_0px_#000] group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-300"></div>
                
                {/* The Image */}
                <img 
                  src="Me .jpeg" 
                  alt="Ojaswa Chauhan" 
                  className="relative z-10 w-64 h-80 sm:w-72 sm:h-96 object-cover border-4 border-black group-hover:-translate-y-2 group-hover:-translate-x-2 transition-transform duration-300" 
                />
                
                {/* Overlapping Badges */}
                <Badge color="bg-[#C4B5FD]" rotate="-rotate-6" className="absolute -bottom-4 -left-6 z-20 hover:rotate-0 transition-transform cursor-default">
                  THAT'S ME
                </Badge>
             </div>
          </div>
        </div>
      </header>

      {/* Marquee Divider */}
      <div className="marquee-container -rotate-1 relative z-20 shadow-[0px_8px_0px_0px_rgba(0,0,0,0.2)]">
        <div className="marquee-content font-black text-2xl uppercase tracking-widest">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="mx-4 flex items-center gap-4">
              OJASWA CHAUHAN <Star className="fill-black inline" size={20} /> FRONTEND ENGINEER <Star className="fill-black inline" size={20} /> LEADER <Star className="fill-black inline" size={20} />
            </span>
          ))}
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 flex flex-col justify-center">
            <h2 className="font-black text-5xl sm:text-6xl uppercase tracking-tighter mb-8 bg-black text-white inline-block w-fit px-4 py-2 rotate-2 shadow-[8px_8px_0px_0px_#FF6B6B]">The Pitch</h2>
            <div className="bg-[#FFFDF5] border-4 border-black p-8 shadow-[12px_12px_0px_0px_#000] -rotate-1">
              <Users className="mb-6 stroke-[3px]" size={48} />
              <h3 className="font-black text-3xl uppercase mb-4">Born to Lead, Built to Code</h3>
              <p className="font-bold text-lg mb-4">
                Serving as School Captain for two consecutive years (Class 11 & 12) taught me more than just public speaking. It taught me how to manage chaos, unite teams, and deliver results under pressure.
              </p>
              <p className="font-bold text-lg">
                Today, I bring that same leadership to my code. Whether I'm structuring a complex React app or optimizing a MySQL database, I take ownership of the entire process.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6">
            <div className="col-span-2 sm:col-span-3">
               <h2 className="font-black text-4xl uppercase tracking-tight mb-2 border-b-4 border-black pb-2">Tech Arsenal</h2>
            </div>
            
            <div className="bg-[#C4B5FD] border-4 border-black p-6 shadow-[8px_8px_0px_0px_#000] hover:-translate-y-2 transition-transform duration-200 flex flex-col items-center justify-center text-center gap-3">
              <Code2 size={40} className="stroke-[3px]" />
              <span className="font-black uppercase text-xl">React.js</span>
            </div>
            <div className="bg-[#FFD93D] border-4 border-black p-6 shadow-[8px_8px_0px_0px_#000] hover:-translate-y-2 transition-transform duration-200 flex flex-col items-center justify-center text-center gap-3">
              <Terminal size={40} className="stroke-[3px]" />
              <span className="font-black uppercase text-xl">JavaScript</span>
            </div>
            <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_#000] hover:-translate-y-2 transition-transform duration-200 flex flex-col items-center justify-center text-center gap-3">
              <Code2 size={40} className="stroke-[3px]" />
              <span className="font-black uppercase text-xl">HTML/CSS</span>
            </div>
            <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_#000] hover:-translate-y-2 transition-transform duration-200 flex flex-col items-center justify-center text-center gap-3">
              <Server size={40} className="stroke-[3px]" />
              <span className="font-black uppercase text-xl">Python</span>
            </div>
            <div className="bg-[#FF6B6B] border-4 border-black p-6 shadow-[8px_8px_0px_0px_#000] hover:-translate-y-2 transition-transform duration-200 flex flex-col items-center justify-center text-center gap-3 text-white">
              <Database size={40} className="stroke-[3px]" />
              <span className="font-black uppercase text-xl">MySQL</span>
            </div>
            <div className="bg-black text-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_#FFD93D] flex flex-col items-center justify-center text-center gap-3 rotate-3">
              <Star size={40} className="stroke-[3px] fill-[#FFD93D]" />
              <span className="font-black uppercase text-xl">UI/UX</span>
            </div>
            <div className="bg-[#FFFDF5] text-black border-4 border-black p-6 shadow-[8px_8px_0px_0px_#FF6B6B] hover:-translate-y-2 transition-transform duration-200 flex flex-col items-center justify-center text-center gap-3 -rotate-2">
              <Star size={40} className="stroke-[4px] fill-black" />
              <span className="font-black uppercase text-xl">Motion.dev</span>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="bg-black text-white border-y-8 border-black">
        <div className="flex flex-col overflow-hidden pb-32">
          <ContainerScroll
            titleComponent={
              <div className="flex flex-col items-center mb-16 gap-6 pt-24 px-4 sm:px-8">
                <h2 className="font-black text-6xl sm:text-8xl uppercase tracking-tighter text-white">
                  Featured<br/>
                  <span className="text-[#FFD93D] -rotate-2 inline-block">Work</span>
                </h2>
                <p className="font-bold text-xl max-w-sm text-[#FFFDF5]">
                  Real-world applications built with raw structure and unapologetic design.
                </p>
              </div>
            }
          >
            <div className="grid grid-rows-2 h-full w-full bg-[#FFFDF5]">
              {/* Project 1 */}
              <div className="text-black border-b-4 border-black group flex flex-col md:flex-row h-full">
                <div className="flex-[0.4] border-b-4 md:border-b-0 md:border-r-4 border-black bg-[#FFD93D] flex items-center justify-center relative overflow-hidden p-8 h-48 md:h-full">
                  <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-black border-4 border-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <img src="zaika-logo.png" alt="Zaika Logo" className="w-24 h-24 object-contain -rotate-12" />
                  </div>
                  <Badge color="bg-[#FF6B6B]" className="absolute top-4 left-4 text-white rotate-3">UI/UX Redesign</Badge>
                </div>
                <div className="flex-[0.6] p-6 lg:p-8 flex flex-col justify-center overflow-y-auto">
                  <h3 className="font-black text-2xl lg:text-3xl uppercase mb-2">Swiggy & Zomato Redesign</h3>
                  <p className="font-bold text-sm lg:text-base mb-4 line-clamp-3">
                    A conceptual redesign focused on high-conversion UI, intuitive navigation, and bolder aesthetics.
                  </p>
                  <BrutalistButton href="https://zaika-rust.vercel.app/" target="_blank" rel="noopener noreferrer" color="bg-[#FF6B6B]" className="w-full sm:w-fit text-white py-2 !text-xs">
                    Live Project <ExternalLink size={16} />
                  </BrutalistButton>
                </div>
              </div>

              {/* Project 2 */}
              <div className="text-black group flex flex-col md:flex-row-reverse h-full">
                <div className="flex-[0.4] border-b-4 md:border-b-0 md:border-l-4 border-black bg-[#111] flex items-center justify-center relative overflow-hidden p-8 h-48 md:h-full">
                  <div className="z-10 flex items-center justify-center gap-1 group-hover:scale-110 transition-transform duration-500 font-sans font-black text-4xl lg:text-5xl">
                    <span className="text-white tracking-tighter">Ann</span>
                    <span className="bg-[#f9a826] text-black px-3 py-1 rounded-xl tracking-tighter border-4 border-black rotate-2">hub</span>
                  </div>
                  <Badge color="bg-[#C4B5FD]" className="absolute top-4 right-4 -rotate-3 text-[10px]">API Integration</Badge>
                </div>
                <div className="flex-[0.6] p-6 lg:p-8 flex flex-col justify-center overflow-y-auto">
                  <h3 className="font-black text-2xl lg:text-3xl uppercase mb-2">Anime Trailer Showcase</h3>
                  <p className="font-bold text-sm lg:text-base mb-4 line-clamp-3">
                    A dynamic web application aggregating the latest anime trailers and information using the Jikan API.
                  </p>
                  <BrutalistButton href="https://annhub.vercel.app/" target="_blank" rel="noopener noreferrer" color="bg-[#C4B5FD]" className="w-full sm:w-fit py-2 !text-xs">
                    Live Project <ExternalLink size={16} />
                  </BrutalistButton>
                </div>
              </div>
            </div>
          </ContainerScroll>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-4 sm:px-8 max-w-5xl mx-auto text-center relative">
        <Badge color="bg-[#FFD93D]" rotate="-rotate-3" className="mb-8 text-xl px-6 py-2">Available for Hire</Badge>
        <h2 className="font-black text-6xl sm:text-[7rem] leading-none uppercase tracking-tighter mb-12">
          Let's Build<br/>
          <span className="bg-[#FF6B6B] text-white px-4 border-8 border-black shadow-[12px_12px_0px_0px_#000] rotate-2 inline-block mt-4">Something</span>
        </h2>
        
        <div className="flex flex-col sm:flex-row justify-center gap-6 mt-16">
          <a href="mailto:thakurojaswachauhan123@gmail.com" className="bg-[#FFFDF5] border-4 border-black px-8 py-6 shadow-[8px_8px_0px_0px_#000] hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_#000] transition-all duration-200 flex items-center justify-center gap-4 group">
             <Mail size={32} className="group-hover:rotate-12 transition-transform" />
             <span className="font-black uppercase text-2xl">Email Me</span>
          </a>
          <a href="https://www.linkedin.com/in/ojaswa-chauhan-812261381/" target="_blank" rel="noopener noreferrer" className="bg-black text-white border-4 border-black px-8 py-6 shadow-[8px_8px_0px_0px_#FFD93D] hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_#FFD93D] transition-all duration-200 flex items-center justify-center gap-4 group">
             <Linkedin size={32} className="group-hover:-rotate-12 transition-transform" />
             <span className="font-black uppercase text-2xl">LinkedIn</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white border-t-8 border-black py-8 px-8 text-center flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-bold text-lg uppercase tracking-widest">© {new Date().getFullYear()} Ojaswa Chauhan</p>
        <div className="flex gap-4">
           <Badge color="bg-[#FF6B6B]" className="text-white border-white border-2 !shadow-none">React</Badge>
           <Badge color="bg-[#FFD93D]" className="text-black border-white border-2 !shadow-none">Brutalism</Badge>
        </div>
      </footer>
    </div>
  );
};

// ==========================================
//          APP ROOT (THEME TOGGLER)
// ==========================================

export default function App() {
  const [theme, setTheme] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portfolio-theme') || 'hand-drawn';
    }
    return 'hand-drawn';
  });

  // Setup GSAP + Lenis Smooth Scrolling completely intercepting native scrolling
  React.useEffect(() => {
    const lenis = new Lenis({
      duration: 2.0, // Increased duration for a slower, softer ease
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.7, // Decreased from 1.2 to slow down the scroll amount per wheel tick
      touchMultiplier: 1.5, // Decreased to slow down touch drag speed
    });

    window.lenis = lenis;

    lenis.on('scroll', (e) => {
      // you can link this to other things if you want scroll callbacks
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  React.useEffect(() => {
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  return (
    <>
      <GlobalStyles />
      
      {/* SVG filter for the "Burn" or "Gooey" tear effect */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="burn-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.02"
              numOctaves="3"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="50"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displacement"
            />
          </filter>
        </defs>
      </svg>

      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0, filter: "url(#burn-filter)", scale: 1.05 }}
          animate={{ opacity: 1, filter: "brightness(1)", scale: 1 }}
          exit={{ opacity: 0, filter: "url(#burn-filter)", scale: 0.95 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {theme === 'brutalist' ? <BrutalistPortfolio /> : <HandDrawnPortfolio />}
        </motion.div>
      </AnimatePresence>
      
      {/* Floating Theme Switcher */}
      <button
        onClick={() => setTheme(t => t === 'brutalist' ? 'hand-drawn' : 'brutalist')}
        className={`
          fixed bottom-6 right-6 z-50 p-3 sm:px-4 sm:py-3 
          flex items-center gap-2 bg-white text-black transition-transform hover:-translate-y-1
          ${theme === 'brutalist' 
            ? 'border-4 border-black font-black uppercase text-sm shadow-[4px_4px_0px_0px_#000]' 
            : 'border-[3px] border-[#2d2d2d] text-lg shadow-[4px_4px_0px_0px_#2d2d2d] font-patrick-hand'
          }
        `}
        style={{
          fontFamily: theme === 'brutalist' ? "'Space Grotesk', sans-serif" : "'Patrick Hand', cursive",
          borderRadius: theme === 'brutalist' ? "0px" : WOBBLY_1
        }}
      >
        <Palette size={theme === 'brutalist' ? 20 : 24} className={theme === 'hand-drawn' ? "stroke-[2.5px] text-[#ff4d4d]" : ""} />
        <span className="hidden sm:inline">Theme: {theme === 'brutalist' ? 'Neo-Brutalism' : 'Hand-Drawn'}</span>
      </button>
    </>
  );
}