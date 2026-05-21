#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Project structure and files
const projectFiles = {
  'package.json': `{
  "name": "vite-react-typescript-starter",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@emailjs/browser": "^4.1.0",
    "lucide-react": "^0.344.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.9.1",
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.18",
    "eslint": "^9.9.1",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.11",
    "globals": "^15.9.0",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.5.3",
    "typescript-eslint": "^8.3.0",
    "vite": "^5.4.2"
  }
}`,

  'index.html': `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Glisten TECH team</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`,

  'vite.config.ts': `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});`,

  'tailwind.config.js': `/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};`,

  'postcss.config.js': `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};`,

  'tsconfig.json': `{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}`,

  'tsconfig.app.json': `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}`,

  'tsconfig.node.json': `{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}`,

  'eslint.config.js': `import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  }
);`,

  'src/main.tsx': `import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);`,

  'src/vite-env.d.ts': `/// <reference types="vite/client" />`,

  'src/index.css': `@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: #000;
  color: #fff;
  overflow-x: hidden;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1a1a1a;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #2563eb, #7c3aed);
}

/* Smooth animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(59, 130, 246, 0.6);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.8s ease-out forwards;
}

.animate-slideInLeft {
  animation: slideInLeft 0.8s ease-out forwards;
}

.animate-slideInRight {
  animation: slideInRight 0.8s ease-out forwards;
}

.animate-scaleIn {
  animation: scaleIn 0.6s ease-out forwards;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-glow {
  animation: glow 2s ease-in-out infinite;
}

/* Gradient text */
.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gradient-text-blue {
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Glass morphism effect */
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.glass-dark {
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Custom button hover effects */
.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.btn-primary:hover::before {
  left: 100%;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
}

/* Parallax effect */
.parallax {
  transform: translateZ(0);
  will-change: transform;
}

/* Loading animation */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Focus styles */
input:focus,
textarea:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

/* Selection styles */
::selection {
  background: rgba(59, 130, 246, 0.3);
  color: white;
}

/* Smooth transitions for all interactive elements */
a, button, input, textarea {
  transition: all 0.3s ease;
}

/* Custom grid animations */
.grid > * {
  animation: fadeInUp 0.8s ease-out forwards;
}

.grid > *:nth-child(1) { animation-delay: 0.1s; }
.grid > *:nth-child(2) { animation-delay: 0.2s; }
.grid > *:nth-child(3) { animation-delay: 0.3s; }
.grid > *:nth-child(4) { animation-delay: 0.4s; }
.grid > *:nth-child(5) { animation-delay: 0.5s; }
.grid > *:nth-child(6) { animation-delay: 0.6s; }

/* Particle animation */
@keyframes particle-float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.7;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 1;
  }
}

.particle {
  animation: particle-float 4s ease-in-out infinite;
}

/* Hover effects for cards */
.card-hover {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.card-hover:hover {
  transform: translateY(-10px) scale(1.02);
}

/* Text reveal animation */
@keyframes textReveal {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.text-reveal {
  overflow: hidden;
}

.text-reveal span {
  display: inline-block;
  animation: textReveal 0.8s ease-out forwards;
}

/* Magnetic button effect */
.magnetic-btn {
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.magnetic-btn:hover {
  transform: scale(1.05);
}

/* Neon glow effect */
.neon-glow {
  text-shadow: 0 0 10px rgba(59, 130, 246, 0.8),
               0 0 20px rgba(59, 130, 246, 0.6),
               0 0 30px rgba(59, 130, 246, 0.4);
}

/* Typing animation */
@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes blink {
  50% { border-color: transparent; }
}

.typing-animation {
  overflow: hidden;
  border-right: 2px solid #3b82f6;
  white-space: nowrap;
  animation: typing 3s steps(40, end), blink 0.75s step-end infinite;
}`,

  'src/App.tsx': `import React, { useState, FormEvent, useEffect } from 'react';
import { Code2, Globe, Laptop, Users, ArrowRight, Github, Mail, Phone, MapPin, Star, Zap, Shield, ChevronDown, Menu, X } from 'lucide-react';
import emailjs from '@emailjs/browser';
import TeamMember from './components/TeamMember';
import ProjectCard from './components/ProjectCard';

function App() {
  const [formStatus, setFormStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const teamMembers = [
    {
      name: "Marko Kujacic",
      role: "UI/UX Designer & Frontend Developer",
      image: "https://avatars.githubusercontent.com/u/75786284",
      skills: ["Svelte.js", "React", "Figma", "XD", "PSD to HTML", "HTML5", "TailwindCSS"],
      github: "https://github.com/glisten-star"
    },
    {
      name: "Aljaz Lee",
      role: "Full Stack Developer",
      image: "https://avatars.githubusercontent.com/u/77128380",
      skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Svelte.js", "Angular", "Python"],
      github: "https://github.com/luckylionheart"
    },
  ];

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A modern e-commerce solution with real-time inventory management, advanced analytics, and seamless payment integration built for scalability",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800",
      tags: ["React", "Node.js", "PostgreSQL", "Stripe", "Redis"],
      featured: true
    },
    {
      title: "AI-Powered Analytics Dashboard",
      description: "Enterprise-grade analytics platform with machine learning insights, real-time data processing, and custom visualization tools",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      tags: ["TypeScript", "Python", "TensorFlow", "D3.js", "WebSocket"],
      featured: true
    },
    {
      title: "Task Management System",
      description: "Collaborative project management tool with real-time updates, advanced team coordination, and intelligent automation",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&q=80&w=800",
      tags: ["React", "Redux", "Socket.io", "MongoDB"],
      featured: false
    },
    {
      title: "Healthcare Management Portal",
      description: "Comprehensive healthcare platform with patient management, appointment scheduling, and secure data handling",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&q=80&w=800",
      tags: ["Next.js", "PostgreSQL", "HIPAA", "AWS"],
      featured: false
    }
  ];

  const services = [
    {
      icon: Globe,
      title: "Web Development",
      description: "Custom web applications built with cutting-edge technologies, optimized for performance and user experience",
      features: ["Responsive Design", "Performance Optimization", "SEO Ready", "Progressive Web Apps"]
    },
    {
      icon: Code2,
      title: "Full-Stack Solutions",
      description: "End-to-end development from database architecture to user interface, ensuring seamless integration",
      features: ["API Development", "Database Design", "Cloud Integration", "Microservices"]
    },
    {
      icon: Laptop,
      title: "UI/UX Design",
      description: "Beautiful, intuitive interfaces that provide exceptional user experiences and drive engagement",
      features: ["User Research", "Prototyping", "Design Systems", "Accessibility"]
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Lightning-fast applications optimized for speed, scalability, and exceptional user engagement",
      features: ["Code Splitting", "Lazy Loading", "CDN Integration", "Caching Strategies"]
    },
    {
      icon: Shield,
      title: "Security & Maintenance",
      description: "Robust security implementations and comprehensive maintenance support for peace of mind",
      features: ["Security Audits", "Regular Updates", "24/7 Monitoring", "Backup Solutions"]
    },
    {
      icon: Star,
      title: "Technical Consulting",
      description: "Strategic technology consulting to help your business grow, scale, and stay competitive",
      features: ["Architecture Planning", "Technology Stack", "Best Practices", "Code Reviews"]
    }
  ];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: null, message: '' });

    const form = e.currentTarget;
    const formData = {
      from_name: form.name.value,
      from_email: form.email.value,
      message: form.message.value,
      to_email: 'glistenstar00@gmail.com, aljaz@glistentech.org, marko@glistenstch.org, support@glistentech.org'
    };

    try {
      setFormStatus({
        type: 'success',
        message: 'Message sent successfully! We will get back to you soon.'
      });
      form.reset();
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-xl border-b border-gray-800/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center animate-glow">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text-blue">Glisten Tech</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">Services</a>
              <a href="#projects" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">Projects</a>
              <a href="#team" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105">Team</a>
              <a href="#contact" className="btn-primary px-6 py-3 rounded-full font-semibold magnetic-btn">
                Contact Us
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-800">
              <div className="flex flex-col space-y-4 pt-4">
                <a href="#services" className="text-gray-300 hover:text-white transition" onClick={() => setIsMenuOpen(false)}>Services</a>
                <a href="#projects" className="text-gray-300 hover:text-white transition" onClick={() => setIsMenuOpen(false)}>Projects</a>
                <a href="#team" className="text-gray-300 hover:text-white transition" onClick={() => setIsMenuOpen(false)}>Team</a>
                <a href="#contact" className="btn-primary px-6 py-3 rounded-full font-semibold text-center" onClick={() => setIsMenuOpen(false)}>
                  Contact Us
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=139&oauth2_token_id=57447761" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-10">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-400 rounded-full particle opacity-30"
              style={{
                left: \`\${Math.random() * 100}%\`,
                top: \`\${Math.random() * 100}%\`,
                animationDelay: \`\${Math.random() * 4}s\`,
                animationDuration: \`\${3 + Math.random() * 2}s\`
              }}
            ></div>
          ))}
        </div>

        <div className="container mx-auto px-6 text-center relative z-20">
          <div 
            className="transform transition-all duration-1000 animate-fadeInUp"
            style={{ transform: \`translateY(\${scrollY * 0.1}px)\` }}
          >
            <div className="mb-8">
              <h1 className="text-7xl md:text-9xl font-black mb-6 leading-tight">
                <span className="block gradient-text-blue neon-glow">GLISTEN</span>
                <span className="block text-white">TECH</span>
              </h1>
            </div>
            
            <div className="max-w-4xl mx-auto mb-12">
              <p className="text-3xl md:text-4xl mb-6 text-gray-200 font-light">
                Build Amazing Web Experiences
              </p>
              <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
                We are a passionate team of developers dedicated to creating high-quality, 
                scalable web applications that drive business growth and exceptional user engagement.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <a 
                href="#contact" 
                className="group btn-primary px-10 py-5 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 flex items-center justify-center magnetic-btn"
              >
                Start Your Project
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </a>
              <a 
                href="#projects" 
                className="glass-dark px-10 py-5 rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-500 magnetic-btn"
              >
                View Our Work
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-gray-400 text-sm">Scroll to explore</span>
            <ChevronDown className="w-6 h-6 text-gray-400" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-gradient-to-b from-black via-gray-900 to-black relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20 animate-fadeInUp">
            <h2 className="text-6xl md:text-7xl font-bold mb-8 gradient-text-blue">
              Our Services
            </h2>
            <p className="text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              We offer comprehensive web development services to help your business thrive in the digital world
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={service.title}
                className="group glass-dark p-8 rounded-3xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-700 card-hover animate-fadeInUp"
                style={{ animationDelay: \`\${index * 0.1}s\` }}
              >
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-5 rounded-2xl w-fit mb-8 group-hover:shadow-2xl group-hover:shadow-blue-500/30 transition-all duration-500 animate-glow">
                  <service.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-6 text-white group-hover:gradient-text-blue transition-all duration-300">{service.title}</h3>
                <p className="text-gray-400 mb-8 text-lg leading-relaxed">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-300">
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mr-4 animate-pulse"></div>
                      <span className="text-lg">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 bg-black relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20 animate-fadeInUp">
            <h2 className="text-6xl md:text-7xl font-bold mb-8 gradient-text-blue">
              Featured Projects
            </h2>
            <p className="text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Explore our latest work and see how we've helped businesses achieve their digital transformation goals
            </p>
          </div>
          
          {/* Featured Projects */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            {projects.filter(p => p.featured).map((project, index) => (
              <div 
                key={project.title}
                className="group relative glass-dark rounded-3xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-700 card-hover animate-fadeInUp"
                style={{ animationDelay: \`\${index * 0.2}s\` }}
              >
                <div className="aspect-video overflow-hidden relative">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute top-6 left-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm px-4 py-2 rounded-full font-bold animate-pulse">
                    Featured Project
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="p-10">
                  <h3 className="text-3xl font-bold mb-6 text-white group-hover:gradient-text-blue transition-all duration-300">{project.title}</h3>
                  <p className="text-gray-400 mb-8 text-lg leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-800/50 text-gray-300 text-sm px-4 py-2 rounded-full border border-gray-600/50 hover:border-blue-500/50 transition-colors duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Other Projects */}
          <div className="grid md:grid-cols-2 gap-8">
            {projects.filter(p => !p.featured).map((project, index) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-32 bg-gradient-to-b from-black via-gray-900 to-black relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20 animate-fadeInUp">
            <h2 className="text-6xl md:text-7xl font-bold mb-8 gradient-text-blue">
              Meet Our Team
            </h2>
            <p className="text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Passionate developers with years of experience in creating exceptional digital experiences and innovative solutions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={member.name} className="animate-fadeInUp" style={{ animationDelay: \`\${index * 0.2}s\` }}>
                <TeamMember {...member} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-black relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20 animate-fadeInUp">
            <h2 className="text-6xl md:text-7xl font-bold mb-8 gradient-text-blue">
              Let's Work Together
            </h2>
            <p className="text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Ready to bring your ideas to life? Get in touch and let's create something amazing together.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-20 max-w-7xl mx-auto">
            <div className="animate-slideInLeft">
              <h3 className="text-4xl font-bold mb-12 text-white">Get in Touch</h3>
              <div className="space-y-8">
                <div className="flex items-center space-x-6 group">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-lg">Email</p>
                    <p className="text-white text-xl font-semibold">support@glistentech.org</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6 group">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300">
                    <Github className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-lg">GitHub</p>
                    <a href="https://github.com/Glisten-Tech-Group" className="text-white text-xl font-semibold hover:gradient-text-blue transition-all duration-300">
                      Glisten-Tech-Group
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="animate-slideInRight">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label htmlFor="name" className="block text-lg font-semibold text-gray-300 mb-3">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white placeholder-gray-400 text-lg transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-lg font-semibold text-gray-300 mb-3">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white placeholder-gray-400 text-lg transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-lg font-semibold text-gray-300 mb-3">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white placeholder-gray-400 text-lg transition-all duration-300 resize-none"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>
                {formStatus.message && (
                  <div className={\`p-6 rounded-2xl \${
                    formStatus.type === 'success' ? 'bg-green-900/50 text-green-300 border border-green-700' : 'bg-red-900/50 text-red-300 border border-red-700'
                  }\`}>
                    {formStatus.message}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={\`w-full btn-primary text-white px-8 py-5 rounded-2xl font-bold text-lg magnetic-btn \${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }\`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900/50 border-t border-gray-800/50 py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-16">
            <div className="animate-fadeInUp">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center animate-glow">
                  <Code2 className="w-7 h-7 text-white" />
                </div>
                <span className="text-3xl font-bold gradient-text-blue">Glisten Tech</span>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed">
                Building the future of web development, one innovative project at a time.
              </p>
            </div>
            
            <div className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
              <h4 className="text-2xl font-bold text-white mb-8">Aljaz Lee</h4>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <span className="text-lg">+1 902 418 8005</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span className="text-lg">uyscuti0513@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span className="text-lg">Halifax, Nova Scotia, Canada</span>
                </div>
              </div>
            </div>
            
            <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <h4 className="text-2xl font-bold text-white mb-8">Marko Kujacic</h4>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <span className="text-lg">+381 63 878 3143</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span className="text-lg">eternity.authority@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span className="text-lg">Belgrade, Serbia</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-16 pt-8 text-center">
            <p className="text-gray-400 text-lg">&copy; 2024 Glisten Tech Team. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;`,

  'src/components/TeamMember.tsx': `import React from 'react';
import { Github, ExternalLink } from 'lucide-react';

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  skills: string[];
  github: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, image, skills, github }) => {
  return (
    <div className="group glass-dark rounded-3xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-700 card-hover">
      <div className="aspect-square overflow-hidden relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
      <div className="p-10">
        <h3 className="text-3xl font-bold mb-3 text-white group-hover:gradient-text-blue transition-all duration-300">{name}</h3>
        <p className="text-blue-400 mb-8 font-semibold text-xl">{role}</p>
        <div className="mb-8">
          <h4 className="text-lg font-bold text-gray-300 mb-4">Expertise</h4>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="bg-gray-800/50 text-gray-300 text-sm px-4 py-2 rounded-full border border-gray-600/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-gray-300 hover:text-blue-400 transition-all duration-300 group/link text-lg font-semibold"
        >
          <Github className="w-6 h-6 mr-3" />
          <span className="mr-2">GitHub Profile</span>
          <ExternalLink className="w-5 h-5 group-hover/link:translate-x-1 transition-transform duration-300" />
        </a>
      </div>
    </div>
  );
};

export default TeamMember;`,

  'src/components/ProjectCard.tsx': `import React from 'react';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  featured?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, image, tags, featured = false }) => {
  return (
    <div className="group glass-dark rounded-3xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-700 card-hover">
      <div className="aspect-video overflow-hidden relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        {featured && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs px-3 py-1 rounded-full font-semibold animate-pulse">
            Featured
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute bottom-4 right-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
              <ExternalLink className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-bold mb-4 text-white group-hover:gradient-text-blue transition-all duration-300">{title}</h3>
        <p className="text-gray-400 mb-6 text-lg leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-800/50 text-gray-300 text-sm px-3 py-2 rounded-full border border-gray-600/50 hover:border-blue-500/50 transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;`,

  '.gitignore': `# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?`,

  'README.md': `# Glisten Tech Website

A modern, responsive website for Glisten Tech team built with React, TypeScript, and Tailwind CSS.

## Features

- Modern dark theme design
- Responsive layout
- Smooth animations and transitions
- Contact form integration
- Team member profiles
- Project showcase
- Service offerings

## Getting Started

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

3. Build for production:
   \`\`\`bash
   npm run build
   \`\`\`

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Lucide React (icons)
- EmailJS (contact form)

## Team

- **Aljaz Lee** - Full Stack Developer
- **Marko Kujacic** - UI/UX Designer & Frontend Developer

## Contact

- Email: support@glistentech.org
- GitHub: [Glisten-Tech-Group](https://github.com/Glisten-Tech-Group)
`
};

// Create directory structure
function createDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
}

// Write file with content
function writeFile(filePath, content) {
  const dir = path.dirname(filePath);
  createDirectory(dir);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Created file: ${filePath}`);
}

// Main setup function
function setupProject() {
  console.log('🚀 Setting up Glisten Tech project...');
  
  // Create project directory
  const projectName = 'glisten-tech-website';
  createDirectory(projectName);
  
  // Change to project directory
  process.chdir(projectName);
  
  // Create all files
  Object.entries(projectFiles).forEach(([filePath, content]) => {
    writeFile(filePath, content);
  });
  
  console.log(`\n✅ Project setup complete!\n`);
  console.log(`Next steps:`);
  console.log(`1. cd ${projectName}`);
  console.log(`2. npm install`);
  console.log(`3. npm run dev`);
  console.log(`\n🌟 Happy coding!`);
}

// Run setup
setupProject();