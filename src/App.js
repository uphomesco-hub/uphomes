// import React, { useEffect, useRef, useState } from 'react';
// import { FaFacebook, FaInstagram, FaLinkedin, FaBars, FaTimes } from 'react-icons/fa';
// import { motion, AnimatePresence } from 'framer-motion';
// import { IoMdClose } from 'react-icons/io';
// import { FaBarsStaggered } from 'react-icons/fa6';

// const App = () => {
//   const particlesRef = useRef(null);
//   const tiltRef = useRef(null);
//   const animationFrameRef = useRef(null);
//   const [showFloatingButton, setShowFloatingButton] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const heroSectionRef = useRef(null);

//   useEffect(() => {
//     // Set year
//     const yearEl = document.getElementById('y');
//     if (yearEl) yearEl.textContent = new Date().getFullYear();

//     // Floating button visibility
//     const handleScroll = () => {
//       if (heroSectionRef.current) {
//         const heroHeight = heroSectionRef.current.offsetHeight;
//         setShowFloatingButton(window.scrollY > heroHeight * 0.7);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
    
//     // Parallax on scroll
//     const items = Array.from(document.querySelectorAll('.parallax'));
//     const speeds = items.map(el => parseFloat(el.getAttribute('data-speed') || '0.04'));
//     let ticking = false;
//     const raf = window.requestAnimationFrame;

//     const onScroll = () => {
//       if (!ticking) {
//         raf(() => {
//           const y = window.scrollY || 0;
//           for (let i = 0; i < items.length; i++) {
//             items[i].style.setProperty('--py', (y * speeds[i]) + 'px');
//           }
//           ticking = false;
//         });
//         ticking = true;
//       }
//     };

//     window.addEventListener('scroll', onScroll, { passive: true });
//     onScroll();

//     // Particle animation
//     const c = particlesRef.current;
//     if (c) {
//       const ctx = c.getContext('2d');
//       if (ctx) {
//         let frame = 0;
//         const DPR = Math.min(window.devicePixelRatio || 1, 2);
//         let w = 0, h = 0, parts = [];
//         const COLORS = [[75, 57, 239], [0, 229, 167], [185, 167, 255]];

//         // Debounce utility
//         function debounce(fn, wait) {
//           let timeout;
//           return (...args) => {
//             clearTimeout(timeout);
//             timeout = setTimeout(() => fn(...args), wait);
//           };
//         }

//         function resize() {
//           if (!c || !ctx) return; // Ensure canvas and context are valid
//           const b = c.getBoundingClientRect();
//           w = b.width | 0;
//           h = b.height | 0;
//           c.width = w * DPR;
//           c.height = h * DPR;
//           ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
//           spawn();
//         }

//         function rand(a, b) {
//           return Math.random() * (b - a) + a;
//         }

//         function spawn() {
//           const count = Math.min(120, Math.floor((w * h) / 18000));
//           parts = Array.from({ length: count }, () => ({
//             x: rand(0, w),
//             y: rand(0, h),
//             r: rand(0.6, 2.2),
//             a: rand(0.2, 0.85),
//             vx: rand(-0.25, 0.25),
//             vy: rand(-0.25, 0.25),
//             color: COLORS[(Math.random() * COLORS.length) | 0]
//           }));
//         }

//         function step() {
//           animationFrameRef.current = requestAnimationFrame(step);
//           ctx.clearRect(0, 0, w, h);
//           for (const p of parts) {
//             p.x += p.vx;
//             p.y += p.vy;
//             if (p.x < 0) p.x = w;
//             if (p.x > w) p.x = 0;
//             if (p.y < 0) p.y = h;
//             if (p.y > h) p.y = 0;
//             p.a += (Math.random() - 0.5) * 0.03;
//             if (p.a < 0.15) p.a = 0.15;
//             if (p.a > 0.9) p.a = 0.9;
//             ctx.beginPath();
//             ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
//             ctx.fillStyle = `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, ${p.a})`;
//             ctx.fill();
//           }
//         }

//         // Debounced resize function
//         const debouncedResize = debounce(resize, 100);

//         // Initialize ResizeObserver with debounced callback
//         const ro = new ResizeObserver(debouncedResize);
//         ro.observe(c);
//         resize(); // Initial resize
//         step();

//         return () => {
//           ro.disconnect();
//           if (animationFrameRef.current) {
//             cancelAnimationFrame(animationFrameRef.current);
//           }
//         };
//       }
//     }

//     // Tilt effect
//     const el = tiltRef.current;
//     if (el) {
//       const handleMouseMove = (e) => {
//         const r = el.getBoundingClientRect();
//         const cx = r.left + r.width / 2;
//         const cy = r.top + r.height / 2;
//         const dx = (e.clientX - cx) / r.width;
//         const dy = (e.clientY - cy) / r.height;
//         el.style.transform = `perspective(1000px) rotateY(${dx * 10}deg) rotateX(${-dy * 10}deg)`;
//       };

//       const handleMouseLeave = () => {
//         el.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg)`;
//       };

//       el.addEventListener('mousemove', handleMouseMove);
//       el.addEventListener('mouseleave', handleMouseLeave);

//       return () => {
//         el.removeEventListener('mousemove', handleMouseMove);
//         el.removeEventListener('mouseleave', handleMouseLeave);
//       };
//     }

//     // Magnetic hover on buttons
//     if (matchMedia('(hover: hover)').matches) {
//       const strength = 14;
//       document.querySelectorAll('.magnetic').forEach(el => {
//         const enter = () => el.style.transition = 'transform .15s ease-out';
//         const leave = () => {
//           el.style.transition = 'transform .25s ease';
//           el.style.transform = 'translate3d(0,0,0)';
//         };
//         const move = (e) => {
//           const r = el.getBoundingClientRect();
//           const x = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
//           const y = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
//           el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
//         };
//         el.addEventListener('mouseenter', enter);
//         el.addEventListener('mousemove', move);
//         el.addEventListener('mouseleave', leave);
//       });
//     }

//     return () => {
//       window.removeEventListener('scroll', onScroll);
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   const features = [
//     {
//       icon: "🛰",
//       title: "Micro‑Broker Network",
//       description: "Locals bring hidden supply online — students, guards, and neighbors earn passively."
//     },
//     {
//       icon: "🧭",
//       title: "Smart Filters",
//       description: "Powerful search with pricing bands to prevent deal leakage and speed up discovery."
//     },
//     {
//       icon: "🔐",
//       title: "Anti‑Leakage Design",
//       description: "All chats, visits, and payouts close inside the app — trust by design."
//     },
//     {
//       icon: "🪪",
//       title: "Listing Verification",
//       description: "Govt ID + selfie match + interior checks issue verified badges that users can rely on."
//     },
//     {
//       icon: "📈",
//       title: "Revenue‑Ready",
//       description: "Aligned commissions, low CAC, and add‑ons like rent receipts & credit boost."
//     },
//     {
//       icon: "🛟",
//       title: "Tenant Safety",
//       description: "In‑app alerts, reporting, and human moderation within 24 hours on escalations."
//     }
//   ];

//   const testimonials = [
//     {
//       quote: "I found a great place with amazing flatmates in 2 days. The verification gave me peace of mind.",
//       image: "https://firebasestorage.googleapis.com/v0/b/uphome12-8fb6a.appspot.com/o/WhatsApp%20Image%202025-04-18%20at%2022.41.56%20(1).jpeg?alt=media&token=c6d724db-40bc-4514-8294-0388704bb1e8",
//       name: "Sahibaj",
//       role: "Student, Pune"
//     },
//     {
//       quote: "Filters saved me hours. Being able to call owners directly meant no time wasted with middlemen.",
//       image: "https://firebasestorage.googleapis.com/v0/b/uphome12-8fb6a.appspot.com/o/WhatsApp%20Image%202025-04-18%20at%2022.41.56.jpeg?alt=media&token=46d479df-54fa-4985-9429-c9a8f8087f42",
//       name: "Keshav Natla",
//       role: "Working Professional, Bangalore"
//     },
//     {
//       quote: "Verified listings and genuine reviews helped me find a safe place without getting scammed by brokers.",
//       image: "https://firebasestorage.googleapis.com/v0/b/uphome12-8fb6a.appspot.com/o/WhatsApp%20Image%202025-04-18%20at%2022.41.55.jpeg?alt=media&token=32d35e7a-d8d1-487c-b8cd-0b838fa0977e",
//       name: "Hitesh Mali",
//       role: "IT Professional, Pune"
//     }
//   ];

//   return (
//     <>
//       <style>{`
//         /* ======= RESPONSIVE NAVIGATION ======= */
//          .menu-toggle {
//           display: none;
//           background: transparent;
//           border: none;
//           color: white;
//           font-size: 24px;
//           cursor: pointer;
//           z-index: 101;
//         }
        
//         @media (max-width: 768px) {
//           .nav-links {
//             position: fixed;
//             top: 0;
//             right: -100%;
//             height: 100vh;
//             width: 70%;
//             background: rgba(16, 20, 24, 0.98);
//             backdrop-filter: blur(12px);
//             flex-direction: column;
//             padding: 80px 20px 40px;
//             gap: 24px;
//             transition: right 0.4s ease;
//             z-index: 100;
//           }
          
//           .nav-links.open {
//             right: 0;
//           }
          
//           .nav-links a {
//             font-size: 18px;
//             padding: 12px;
//             border-radius: 12px;
//             background: rgba(255,255,255,0.05);
//             width: 100%;
//           }
          
//           .menu-toggle {
//             display: block;
//             z-index: 101;
//             position: relative;
//           }
          
//           /* Remove fade-in class interference */
//           .nav-links.fade-in.delay-2 {
//             display: flex;
//           }
//         }
        
//         /* Floating button styles */
//         .floating-button {
//           position: fixed;
//           bottom: 30px;
//           right: 30px;
//           z-index: 40;
//           display: flex;
//           align-items: center;
//           gap: 12px;
//           padding: 10px 14px;
//           border-radius: 16px;
//           background: #4b39ef;
//           backdrop-filter: blur(10px);
//           color: white;
//           font-weight: 600;
//           box-shadow: 0 8px 32px rgba(93,74,255,0.4);
//           border: 1px solid rgba(255,255,255,0.15);
//           cursor: pointer;
//           text-decoration: none;
//           transition: all 0.3s ease;
//         }
        
//         .floating-button:hover {
//           transform: translateY(-3px);
//           box-shadow: 0 12px 40px rgba(93,74,255,0.6);
//         }
        
//         .floating-button img {
//           width: 75px;
//           height: 75px;
//           border-radius: 8px;
//           background: white;
//           padding: 4px;
//         }
        
//         /* Framer motion animations */
//         .fade-up {
//           opacity: 0;
//           transform: translateY(20px);
//         }

//         /* ======= FIXED SECTION STYLES ======= */
//         section {
//           background: rgba(16, 20, 24, 0.85);
//           backdrop-filter: blur(12px);
//           padding: 100px 0;
//           position: relative;
//           overflow: hidden;
//         }
        
//         section::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           height: 1px;
//           background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
//         }
        
//         section::after {
//           content: '';
//           position: absolute;
//           bottom: 0;
//           left: 0;
//           right: 0;
//           height: 1px;
//           background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
//         }
        
//         .section-content {
//           position: relative;
//           z-index: 2;
//         }
        
//         .section-bg {
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           z-index: 1;
//           opacity: 0.1;
//           background: 
//             radial-gradient(800px 400px at 20% 10%, rgba(105,91,255,.15), transparent 70%),
//             radial-gradient(600px 300px at 80% 90%, rgba(0,229,167,.1), transparent 70%);
//           pointer-events: none;
//         }

//         /* ======= ENHANCED STYLES ======= */
//         :root {
//           --bg-dark: #161C22;
//           --bg-dark-2: #1D2429;
//           --text: #B1BCC7;
//           --primary: #5D4AFF;
//           --primary-2: #7B6AFF;
//           --accent: #00F0B5;
//           --glass: rgba(255,255,255,0.08);
//           --border: rgba(255,255,255,0.12);
//           --maxw: 1200px;
//           --radius-xl: 24px;
//           --radius-2xl: 32px;
//           --shadow-1: 0 12px 36px rgba(0,0,0,0.3);
//           --shadow-2: 0 24px 64px rgba(0,0,0,0.4);
//         }

//         body {
//           background: radial-gradient(1400px 1000px at 80% -10%, rgba(93,74,255,.4), transparent 65%),
//                       radial-gradient(1000px 800px at 0% 20%, rgba(0,240,181,.25), transparent 60%),
//                       linear-gradient(180deg, #0D1216, #0A0D10 100%);
//           font-family: "Montserrat", sans-serif;
//           letter-spacing: -0.01em;
//         }

//         /* ===== TYPOGRAPHY ENHANCEMENTS ===== */
//         h1, h2, h3, h4 {
//           font-weight: 800;
//           letter-spacing: -0.03em;
//         }
        
//         .hero-copy h1 {
//           font-size: clamp(36px, 6.5vw, 68px);
//           line-height: 1.02;
//           margin: 16px 0 20px;
//         }
        
//         .sub {
//           font-size: clamp(16px, 1.8vw, 18px);
//           color: #ffffff;
//           opacity: 0.85;
//           line-height: 1.7;
//         }

//         /* ===== BUTTON ENHANCEMENTS ===== */
//         .btn {
//           padding: 16px 28px;
//           border-radius: 16px;
//           font-weight: 700;
//           transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
//         }
        
//         .btn-primary {
//           background: linear-gradient(135deg, var(--primary), var(--primary-2));
//           box-shadow: 0 12px 32px rgba(93,74,255,0.4), inset 0 0 0 1px rgba(255,255,255,0.1);
//         }
        
//         .btn-primary:hover {
//           transform: translateY(-4px);
//           box-shadow: 0 16px 48px rgba(93,74,255,0.6), inset 0 0 0 1px rgba(255,255,255,0.15);
//         }
        
//         .btn-ghost:hover {
//           background: rgba(255,255,255,0.1);
//         }

//         /* ===== CARD ENHANCEMENTS ===== */
//         .card {
//           border-radius: var(--radius-2xl);
//           padding: 28px;
//           background: linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
//           backdrop-filter: blur(16px);
//           border: 1px solid var(--border);
//           transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
//         }
        
//         .card:hover {
//           transform: translateY(-8px);
//           box-shadow: var(--shadow-2);
//           border-color: rgba(255,255,255,0.18);
//         }
        
//         .icon {
//           width: 52px;
//           height: 52px;
//           border-radius: 16px;
//           font-size: 24px;
//         }

//         /* ===== HERO ENHANCEMENTS ===== */
//         .hero {
//           padding: 120px 0 80px;
//         }
        
//         .shine {
//           color: #fff;
//           background-size: 300% auto;
//           animation: shine 4s linear infinite;
//         }
        
//         .badge-floating {
//           padding: 12px 20px;
//           font-size: 16px;
//           box-shadow: 0 8px 24px rgba(0,0,0,0.3);
//           border: 1px solid rgba(255,255,255,0.15);
//         }
        
//         .orb {
//           filter: blur(10px);
//           opacity: 0.7;
//         }

//         /* ===== SECTION SPACING ===== */
//         .section-head {
//           margin-bottom: 48px;
//         }

//         /* ===== ANIMATION IMPROVEMENTS ===== */
//         @keyframes shine {
//           to { background-position: 200% center; }
//         }
        
//         @keyframes sweep {
//           0% { transform: translateX(-40%) rotate(5deg); }
//           50% { transform: translateX(40%) rotate(5deg); }
//           100% { transform: translateX(-40%) rotate(5deg); }
//         }
        
//         @keyframes floaty {
//           0%,100% { transform:translateY(0) }
//           50% { transform: translateY(-15px) }
//         }
        
//         .fade-up {
//           animation: fadeUp 1s cubic-bezier(0.16, 0.84, 0.44, 1) forwards;
//         }

//         /* ===== RESPONSIVE ADJUSTMENTS ===== */
//         @media (max-width: 1000px) {
//           .hero {
//             padding: 100px 0 60px;
//           }
          
//           section {
//             padding: 80px 0;
//           }
//         }
        
//         @media (max-width: 768px) {
//           .cta-row .btn {
//             font-size: 14px;
//           }
          
//           section {
//             padding: 70px 0;
//           }
//         }
//                   .grid-container {
//     display: grid;
//     grid-template-columns: 3fr 4fr;
//     gap: 40px;
//     align-items: center;
//   }

//         /* Keep existing styles below */
//         :root{
//           --bg-dark: #232C31;
//           --bg-dark-2: #1D2429;
//           --bg-light: #F1F4F8;
//           --text: #95A1AC;
//           --text-strong-dark: #14181B;
//           --text-strong-light: #FFFFFF;
//           --glass: rgba(255,255,255,0.06);
//           --border: rgba(255,255,255,0.08);
//           --maxw: 1200px;
//           --radius-xl: 20px;
//           --radius-2xl: 28px;
//           --shadow-1: 0 10px 30px rgba(0,0,0,.25);
//           --shadow-2: 0 20px 60px rgba(0,0,0,.35);
//         }
//         *{box-sizing:border-box}
//         html,body{margin:0;height:100%}
//         body{
//           line-height:1.6; overflow-x:hidden;
//         }
//         a{ color: inherit; text-decoration: none; }
//         img{ max-width: 100%; display:block; }

//         /* Utilities */
//         .container{ width:100%; max-width: var(--maxw); margin: auto; padding: 0 20px; }
//         .chip{color:#ffffff; display:inline-flex; align-items:center; gap:10px; border:1px solid var(--border); padding:8px 16px; border-radius: 999px; background:var(--glass); backdrop-filter: blur(8px); font-size: 15px; }
//         .gradient-text{ background: linear-gradient(90deg, #fff, #8ec5ff, #b9a7ff); -webkit-background-clip:text; background-clip:text; color:transparent; }
//         .btn{ display:inline-flex; align-items:center; gap:10px; padding:14px 20px; border-radius:12px; font-weight:700; letter-spacing:.2px; border:1px solid transparent; transition:.3s ease; }
//         .btn-ghost{ background:transparent; color:#fff; border-color:var(--border); }
//         .fade-up{ opacity:0; transform: translateY(24px); animation: fadeUp .9s cubic-bezier(.2,.8,.2,1) forwards; }
//         .fade-in{ opacity:0; animation: fadeIn .9s ease forwards; }
//         .delay-1{ animation-delay:.12s } .delay-2{ animation-delay:.24s } .delay-3{ animation-delay:.36s } .delay-4{ animation-delay:.48s } .delay-5{ animation-delay:.6s }
//         @keyframes fadeUp{to{opacity:1; transform: translateY(0)}}
//         @keyframes fadeIn{to{opacity:1}}
//         @keyframes spinSlow{ to{ transform: rotate(360deg) } }

//         /* Nav */
//         .nav{ position: sticky; top:0; z-index:40; backdrop-filter: blur(10px); background: linear-gradient(180deg, rgba(0,0,0,.55), rgba(0,0,0,.25)); border-bottom:1px solid var(--border); }
//         .nav-inner{ display:flex; align-items:center; justify-content:space-between; gap:16px; padding:14px 0; }
//         .brand{ display:flex; align-items:center; gap:12px; }
//         .logo{ width:40px; height:40px; display:grid; place-items:center; border-radius:12px; background: radial-gradient(120% 120% at 0% 0%, #6f62ff, #4b39ef 60%, #2b21a0 100%); color:#fff; font-weight:800; letter-spacing:.5px; }
//         .nav a{ color:#d7dde5; opacity:.92; }
//         .nav-links{ display:flex; gap:18px; align-items:center; }

//         /* Fancy Hero */
//         .hero{ padding: 90px 0 40px; position:relative; isolation:isolate; background: radial-gradient(1000px 600px at 20% 10%, rgba(75,57,239,.35), transparent 70%),
//     radial-gradient(800px 500px at 80% 90%, rgba(0,229,167,.25), transparent 70%);}
//         .aurora, .grid-bg{ position:absolute; inset:0; z-index:-2 }
//         .aurora{
//           background:
//             radial-gradient(800px 400px at 15% 20%, rgba(105,91,255,.35), transparent 60%),
//             radial-gradient(700px 380px at 85% 10%, rgba(0,229,167,.22), transparent 60%),
//             radial-gradient(900px 500px at 50% 100%, rgba(75,57,239,.25), transparent 60%);
//           filter: blur(6px);
//           animation: drift 16s ease-in-out infinite alternate;
//         }
//         .grid-bg::before{ content:""; position:absolute; inset:-30% -10%;
//           background:
//             linear-gradient(transparent 49%, rgba(255,255,255,.08) 50%, transparent 51%) top/100% 40px,
//             linear-gradient(90deg, transparent 49%, rgba(255,255,255,.08) 50%, transparent 51%) left/40px 100%;
//           opacity:.25; transform: perspective(900px) rotateX(55deg) translateY(-20%);
//           animation: gridPan 30s linear infinite;
//         }
//         @keyframes drift{ from{ transform: translateY(-10px)} to{ transform: translateY(10px)} }
//         @keyframes gridPan{ to{ background-position: 0 40px, 40px 0 } }

//         .hero-fancy{ display:grid; grid-template-columns: 1.05fr .95fr; gap:36px; align-items:center }
//         .hero-copy .sub{ color:#D0D6DF; max-width: 54ch }
//         .cta-row{ display:flex; gap:12px; flex-wrap:wrap; margin-top:14px }
//         .hero-visual{ position:relative; display:grid; place-items:center }
//         .tilt{ width:min(460px, 92%); aspect-ratio:9/19.5; border-radius:28px; position:relative; transform-style: preserve-3d; transition: transform .2s ease-out; }
//         .device{ width:100%; height:100%; object-fit:cover; display:block; border-radius:28px; }
//         .sweep{ position:absolute; inset:-1px; pointer-events:none; background: linear-gradient(115deg, transparent 10%, rgba(255,255,255,.25) 35%, transparent 60%); mix-blend-mode: screen; filter: blur(2px); animation: sweep 4.8s ease-in-out infinite }

//         .badge-floating{ position:absolute; padding:10px 14px; border-radius:999px; background: rgba(255,255,255,.08); border:1px solid var(--border); backdrop-filter: blur(8px); color:#EAF2FF; font-weight:600 }
//         .badge-floating.one{ left:-18px; top:10%; animation: floaty 6s ease-in-out infinite }
//         .badge-floating.two{ right:-18px; top:22%; animation: floaty 7s ease-in-out .3s infinite }
//         .badge-floating.three{ left:0; bottom:8%; animation: floaty 8s ease-in-out .6s infinite }

//         .orb{ position:absolute; filter: blur(8px); opacity:.8; border-radius:50%; mix-blend-mode: screen; }
//         .orb.o1{ width:130px; height:130px; left:-60px; top:-30px; background: conic-gradient(from 0deg, rgba(75,57,239,.9), rgba(105,91,255,.4), rgba(0,229,167,.4), rgba(75,57,239,.9)); animation: spinSlow 18s linear infinite }
//         .orb.o2{ width:90px; height:90px; right:-40px; bottom:-20px; background: conic-gradient(from 0deg, rgba(0,229,167,.9), rgba(105,91,255,.35), rgba(75,57,239,.9)); animation: spinSlow 12s linear reverse infinite }

//         /* Particles + Goo + Magnetic */
//         .particles{ position:absolute; inset:0; z-index:-1; pointer-events:none; width:100%; height:100%; background: transparent;
//   mix-blend-mode: screen;
// }
//         .goo-blob-wrap{ position:absolute; inset:0; z-index:-1; filter:url(#goo); display:none; }
//         .goo-blob-wrap .blob{ position:absolute; border-radius:50%; opacity:.7; mix-blend-mode:screen;
//           background: radial-gradient(60% 60% at 30% 30%, rgba(75,57,239,.85), rgba(105,91,255,.25) 60%, transparent 70%),
//                       radial-gradient(60% 60% at 70% 70%, rgba(0,229,167,.8), transparent 60%);
//           animation: blobFloat var(--d,12s) ease-in-out infinite alternate; filter: blur(2px);
//         }
//         .goo-blob-wrap .b1{ width:240px; height:240px; left:8%; bottom:12%; --d: 12s; }
//         .goo-blob-wrap .b2{ width:190px; height:190px; right:10%; bottom:22%; --d: 14s; }
//         .goo-blob-wrap .b3{ width:280px; height:280px; left:24%; top:12%; --d: 16s; }
//         @keyframes blobFloat{ 0%{ transform: translate(0,0) scale(1)} 100%{ transform: translate(24px,-26px) scale(1.12) } }

//         .magnetic{ position:relative; will-change: transform; transition: transform .2s ease-out; }
//         .magnetic:active{ transform: scale(.98) !important; }

//         /* Parallax utility */
//         // .parallax{ transform: translate3d(0,var(--py,0),0); will-change: transform; }

//         /* Sections */
//         .section-head{ display:flex; align-items:center; justify-content:space-between; gap:16px; margin-bottom:60px; }
//         h2{ color:#fff; font-size: clamp(26px, 3.6vw, 40px); margin:0; line-height:1.15; }

//         .grid-3{ display:grid; grid-template-columns: repeat(3,1fr); gap:22px; }

//         .card{ position:relative; background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02)); border:1px solid var(--border); border-radius: 18px; padding:20px; transition:.35s ease; }
//         .icon{ width:42px; height:42px; border-radius:12px; display:grid; place-items:center; background:linear-gradient(135deg, var(--primary), var(--primary-2)); color:#fff; }
//         .tag{ position:absolute; right:14px; top:14px; font-size:12px; padding:6px 10px; border-radius:999px; background:rgba(0,229,167,.15); color:#9ff1dc; border:1px solid rgba(0,229,167,.25) }

//         /* Steps */
//         .steps{ margin-top:50px; display:grid; grid-template-columns: repeat(4,1fr); gap:18px; counter-reset: step; }
//         .step{ background: var(--glass); border:1px solid var(--border); padding:18px; border-radius:18px; position:relative; }
//         .step:before{ counter-increment: step; content: counter(step); position:absolute; top:-20px; left:-12px; width:36px; height:36px; border-radius:10px; background:linear-gradient(135deg, var(--primary), var(--primary-2)); color:#fff; display:grid; place-items:center; font-weight:800; box-shadow: var(--shadow-1) }

//         /* Table */
//         .table{ overflow:auto; border-radius:16px; border:1px solid var(--border); }
//         table{ width:100%; border-collapse: collapse; min-width:760px; background:rgba(255,255,255,.02) }
//         th, td{ padding:14px 16px; text-align:left; border-bottom:1px solid var(--border); }
//         th{ color:#E8EDF5; font-weight:700; background: rgba(255,255,255,.04) }
//         .yes{ color: #18c964; font-weight:700 } .no{ color:#FF5C5C; font-weight:700 } .maybe{ color:#FFB020; font-weight:700 }

//         /* Testimonials */
//         #testimonials .testi-grid{ display:grid; grid-template-columns: repeat(3,1fr); gap:22px }
//         #testimonials .quote{ color:#CFD6E1; font-style:italic; margin:0 0 16px }
//         #testimonials .person{ display:flex; align-items:center; gap:12px }
//         #testimonials .person img{ width:42px; height:42px; border-radius:50%; object-fit:cover }

//         /* CTA */
//         .cta{ position:relative; border:1px solid var(--border); border-radius: 24px; padding: 28px; background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02)); overflow:hidden; }
//         .cta:after{ content:""; position:absolute; right:-60px; top:-60px; width:200px; height:200px; border-radius:28px; filter: blur(8px); opacity:.6; background: conic-gradient(from 0deg, rgba(0,229,167,.9), rgba(105,91,255,.3), rgba(75,57,239,.9)); animation: spinSlow 16s linear infinite; }
//         .qr{ width:96px; height:96px; border-radius:12px; overflow:hidden; background:#fff; display:block }
//         .qr img{ width:100%; height:100%; object-fit:cover; display:block }

//         /* Footer */
//         footer{ padding: 40px 0; border-top:1px solid var(--border); color:#AAB3BF; background: linear-gradient(180deg, rgba(10,13,16,0.85), rgba(8,10,13,0.95));
//   backdrop-filter: blur(12px);
//   border-top: 1px solid rgba(255,255,255,0.08);}

//         /* Responsive */
//         @media (max-width: 1000px){
//           .hero-fancy{ grid-template-columns:1fr; text-align:center }
//           .hero-visual{ margin-top:8px }
//           .badge-floating.one, .badge-floating.two{ display:none }
//           .grid-3{ grid-template-columns: 1fr 1fr; }
//           .steps{ grid-template-columns: 1fr 1fr; }
//           .goo-blob-wrap{ display:block }
//           #testimonials .testi-grid{ display:grid; grid-template-columns: repeat(2,1fr); gap:22px 
//         }
//         @media (max-width: 640px){
// .nav-links {
//             display: flex;
//           }
          
//           .nav-links:not(.open) {
//             display: none;
//           }          .grid-3{ grid-template-columns: 1fr; }
//           .steps{ grid-template-columns: 1fr; }
//           #testimonials .testi-grid{ display:grid; grid-template-columns: repeat(1,1fr); gap:22px 
//         }



//   /* Responsive adjustments */
//   @media (max-width: 1000px) {
//     .grid-container {
//       gap: 30px;
//     }
//   }

//   @media (max-width: 768px) {
//     .grid-container {
//       grid-template-columns: 1fr;
//       gap: 20px;
//     }
//   }

//   .image-container {
//     order: 0;
//   }

//   .content-container {
//     order: 0;
//   }


//   @media (max-width: 768px) {


//     .image-container {
//       order: 1 !important;
//       margin-left: -100px;
//     }
    
//     .content-container {
//       order: 2 !important;
//     }
//   }
//       `}</style>

//       {/* NAV */}
//       <nav className="nav">
//         <div className="container nav-inner">
//           <div className="brand fade-in">
//             <img src="https://firebasestorage.googleapis.com/v0/b/uphome12-8fb6a.appspot.com/o/logoUpHome%403x%20(1).png?alt=media&token=0756edff-426c-463f-9cdb-4a95a4b035de" 
//                  alt="UpHomes logo" 
//                  style={{height:'36px', width:'auto', borderRadius:'8px'}}/>
//           </div>
          
//           <button 
//             className="menu-toggle" 
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             aria-label={isMenuOpen ? "Close menu" : "Open menu"}
//           >
//             {isMenuOpen ? <IoMdClose /> : <FaBarsStaggered />}
//           </button>
          
//           <div className={`nav-links ${isMenuOpen ? 'open' : ''} fade-in delay-2`}>
//             <a href="#showcase" onClick={() => setIsMenuOpen(false)}>Showcase</a>
//             <a href="#features" onClick={() => setIsMenuOpen(false)}>Features</a>
//             <a href="#how" onClick={() => setIsMenuOpen(false)}>How it works</a>
//             <a href="#compare" onClick={() => setIsMenuOpen(false)}>Compare</a>
//             <a href="#download" className="chip" onClick={() => setIsMenuOpen(false)} aria-label="Download the app">
//               📲 <span>Get the App</span>
//             </a>
//           </div>
//         </div>
//       </nav>

//       {/* HERO */}
//       <motion.header 
//         className="hero" 
//         ref={heroSectionRef}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.8 }}
//       >
//         <div className="aurora"></div>
//         <div className="grid-bg"></div>
//         <canvas
//           ref={particlesRef}
//           id="particles"
//           className="particles"
//           aria-hidden="true"
//           style={{ width: '100%', height: '100%' }}
//         />
//         <div className="goo-blob-wrap" aria-hidden="true">
//           <div className="blob b1"></div>
//           <div className="blob b2"></div>
//           <div className="blob b3"></div>
//         </div>

//         <div className="container hero-fancy">
//           <div className="hero-copy fade-up parallax" data-speed="0.04">
//             <motion.h1
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 }}
//             >
//               <span className="shine">Find verified rentals</span><br/>
//               <span className="gradient-text">fast, fair & spam‑free.</span>
//             </motion.h1>
            
//             <motion.p 
//               className="sub"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4 }}
//             >
//               UpHomes is the community‑driven rental platform that unlocks hidden supply, verifies listings, and connects you directly with owners and flatmates — no noise, no traps.
//             </motion.p>
            
//             <div className="cta-row">
//               <motion.a
//                 className="btn btn-primary magnetic"
//                 href="#download"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.6 }}
//               >
//                 Download App
//               </motion.a>
//               <motion.a
//                 className="btn btn-ghost magnetic"
//                 href="#features"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.7 }}
//               >
//                 Explore Features
//               </motion.a>
//             </div>
            
//             <div className="kpis" style={{marginTop:'28px', display:'grid', gridTemplateColumns: 'repeat(3,1fr)', gap:'20px'}}>
//               <motion.div 
//                 className="kpi"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.8 }}
//               >
//                 <h3 style={{margin:0, color:'#fff', fontSize:'24px'}}>7,000+</h3>
//                 <p className="sub" style={{margin:'6px 0 0'}}>Active users</p>
//               </motion.div>
//               <motion.div 
//                 className="kpi"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.9 }}
//               >
//                 <h3 style={{margin:0, color:'#fff', fontSize:'24px'}}>3,500+</h3>
//                 <p className="sub" style={{margin:'6px 0 0'}}>Live listings</p>
//               </motion.div>
//               <motion.div 
//                 className="kpi"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 1.0 }}
//               >
//                 <h3 style={{margin:0, color:'#fff', fontSize:'24px'}}>800+</h3>
//                 <p className="sub" style={{margin:'6px 0 0'}}>Micro‑brokers</p>
//               </motion.div>
//             </div>
//           </div>

//           <motion.div 
//             className="hero-visual fade-up delay-2 parallax" 
//             data-speed="-0.03"
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.4 }}
//           >
//             <div className="tilt" ref={tiltRef} id="tilt">
//               <img className="device" alt="UpHomes app mockup"
//                    src="https://firebasestorage.googleapis.com/v0/b/uphome12-8fb6a.appspot.com/o/iphone%2016%20pro%20max%20mock%20up.png?alt=media&token=33691747-8fbc-4386-b594-c7805c101397"/>
//               <div className="sweep"></div>
//             </div>
//             <motion.span 
//               className="badge-floating one"
//               animate={{ y: [0, -10, 0] }}
//               transition={{ repeat: Infinity, duration: 3 }}
//             >
//               🛡 Verified
//             </motion.span>
//             <motion.span 
//               className="badge-floating two"
//               animate={{ y: [0, -10, 0] }}
//               transition={{ repeat: Infinity, duration: 3.5, delay: 0.3 }}
//             >
//               🤖 AI Match
//             </motion.span>
//             <motion.span 
//               className="badge-floating three"
//               animate={{ y: [0, -10, 0] }}
//               transition={{ repeat: Infinity, duration: 4, delay: 0.6 }}
//             >
//               💬 Direct Chat
//             </motion.span>
//             <span className="orb o1"></span>
//             <span className="orb o2"></span>
//           </motion.div>
//         </div>
//       </motion.header>

//       {/* Floating Download Button */}
//       <AnimatePresence>
//         {showFloatingButton && (
//           <motion.a
//             href="#download"
//             className="floating-button"
//             initial={{ opacity: 0, y: 100 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 100 }}
//             transition={{ 
//               type: "spring", 
//               stiffness: 300, 
//               damping: 25,
//               duration: 0.5 
//             }}
//           >
//             <img 
//               src="https://firebasestorage.googleapis.com/v0/b/uphome12-8fb6a.appspot.com/o/IMG_6015.PNG?alt=media&token=d0b923cd-9efb-4baa-bcb2-0d84a4b30d66" 
//               alt="QR Code" 
//             />
//             {/* <span>Download App</span> */}
//           </motion.a>
//         )}
//       </AnimatePresence>

//       {/* SHOWCASE */}
//       <motion.section 
//         id="showcase" 
//         style={{ padding: '80px 0' }}
//         initial={{ opacity: 0, y: 50 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true, margin: "-20%" }}
//         transition={{ duration: 0.7 }}
//       >
//         <div className="section-bg"></div>
//         <div className="container section-content">
//           <motion.div 
//             className="section-head"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             style={{ marginBottom: '48px' }}
//           >
//             <div>
//               <motion.h2 
//                 style={{ fontSize: 'clamp(32px, 4.5vw, 48px)', marginBottom: '12px' }}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6 }}
//               >
//                 Built by renters, for renters.
//               </motion.h2>
//               <motion.p 
//                 className="sub"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: 0.2 }}
//                 style={{ maxWidth: '600px', fontSize: 'clamp(18px, 2vw, 22px)', opacity: 0.9 }}
//               >
//                 Finding a home made easy
//               </motion.p>
//             </div>
//             <div className="chip fade-in">📱 App Screens</div>
//           </motion.div>
          
//           <div className='grid-container'>
//             <motion.div 
//               className="fade-up parallax  content-container"
//               data-speed="0.04"
//               initial={{ opacity: 0, x: -30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.7 }}
//             >
//               <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
//                 <motion.div 
//                   className="card" 
//                   style={{ padding: '24px', borderRadius: '20px' }}
//                   whileHover={{ y: -5 }}
//                   transition={{ type: "spring", stiffness: 300 }}
//                 >
//                   <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
//                     <div className="icon" style={{ background: 'rgba(93, 74, 255, 0.15)', color: '#7B6AFF' }}>1</div>
//                     <div>
//                       <h3 style={{ color: '#fff', margin: '0 0 8px', letterSpacing: '0.1px' }}>Just drop your client's name</h3>
//                       <p className="sub" style={{ margin: '0 0', fontSize: '14px' }}>We'll verify the property and owner details instantly</p>
//                     </div>
//                   </div>
//                 </motion.div>
                
//                 <motion.div 
//                   className="card" 
//                   style={{ padding: '24px', borderRadius: '20px' }}
//                   whileHover={{ y: -5 }}
//                   transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
//                 >
//                   <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
//                     <div className="icon" style={{ background: 'rgba(0, 229, 167, 0.15)', color: '#00F0B5' }}>2</div>
//                     <div>
//                       <h3 style={{ color: '#fff', margin: '0 0 8px', letterSpacing: '0.1px' }}>For Properties</h3>
//                       <p className="sub" style={{ margin: '0 0', fontSize: '14px' }}>Browse verified listings with transparent pricing</p>
//                     </div>
//                   </div>
//                 </motion.div>
                
//                 <motion.div 
//                   className="card" 
//                   style={{ padding: '24px', borderRadius: '20px' }}
//                   whileHover={{ y: -5 }}
//                   transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
//                 >
//                   <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
//                     <div className="icon" style={{ background: 'rgba(185, 167, 255, 0.15)', color: '#B9A7FF' }}>3</div>
//                     <div>
//                       <h3 style={{ color: '#fff', margin: '0 0 8px', letterSpacing: '0.1px' }}>Direct Chat</h3>
//                       <p className="sub" style={{ margin: '0 0', fontSize: '14px' }}>Connect directly with owners or flatmates</p>
//                     </div>
//                   </div>
//                 </motion.div>
//               </div>
//             </motion.div>
            
//             <motion.div 
//               className="fade-up delay-1 parallax image-container" 
//               data-speed="-0.03" 
//               style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden' }}
//               initial={{ opacity: 0, x: 30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.7 }}
//             >
//               <img 
//                 src="./5 phone mockups.png" 
//                 alt="UpHomes app showcase" 
//                 style={{ width: '100%', height: 'auto', display: 'block' }}
//               />
//             </motion.div>
//           </div>
//         </div>
//       </motion.section>

//       {/* FEATURES */}
//       <motion.section 
//         id="features"
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.7 }}
//       >
//         <div className="section-bg"></div>
//         <div className="container section-content">
//           <motion.div 
//             className="section-head"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <h2 className="fade-up">Built for speed, trust, and scale.</h2>
//             <div className="chip fade-in">⚡ MoM Growth ~160%</div>
//           </motion.div>
          
//           <div className="grid-3">
//             {features.map((feature, index) => (
//               <motion.article 
//                 key={index}
//                 className="card"
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 whileHover={{ y: -10 }}
//               >
//                 <div className="icon" aria-hidden="true">{feature.icon}</div>
//                 <h3 style={{color:'#fff', margin:'16px 0 8px'}}>{feature.title}</h3>
//                 <p className="sub">{feature.description}</p>
//               </motion.article>
//             ))}
//           </div>
//         </div>
//       </motion.section>

//       {/* HOW IT WORKS */}
//       <motion.section 
//         id="how"
//         initial={{ opacity: 0, y: 50 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.7 }}
//       >
//         <div className="section-bg"></div>
//         <div className="container section-content">
//           <motion.div 
//             className="section-head"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <h2 className="fade-up">Turn local listings into monthly income.</h2>
//             <div className="chip fade-in">💸 Micro‑Broker Model</div>
//           </motion.div>
          
//           <div className="steps">
//             {[
//               {
//                 title: "List a Property",
//                 description: "Snap photos, add details, set a fair price band. Verification starts instantly."
//               },
//               {
//                 title: "Schedule Visits",
//                 description: "Coordinate in‑app — no phone number leaks or off‑platform haggling."
//               },
//               {
//                 title: "Close the Deal",
//                 description: "Smart flows ensure both sides confirm before moving to payout."
//               },
//               {
//                 title: "Earn Passively",
//                 description: "Payouts are processed after verified closure — transparent & secure."
//               }
//             ].map((step, index) => (
//               <motion.div 
//                 key={index}
//                 className="step"
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: index * 0.15 }}
//               >
//                 <h4 style={{color:'#fff', margin:'0 0 8px'}}>{step.title}</h4>
//                 <p className="sub">{step.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </motion.section>

//       {/* COMPARE */}
//       <motion.section 
//         id="compare"
//         initial={{ opacity: 0, y: 50 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.7 }}
//       >
//         <div className="section-bg"></div>
//         <div className="container section-content">
//           <motion.div 
//             className="section-head"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <h2 className="fade-up">Why UpHomes beats paywalls and broker traps.</h2>
//             <div className="chip fade-in">🔍 Transparent by default</div>
//           </motion.div>
          
//           <motion.div 
//             className="table fade-up"
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//           >
//             <table aria-label="Competitive comparison">
//               <thead>
//                 <tr>
//                   <th>Feature / Platform</th>
//                   <th>UpHomes</th>
//                   <th>MagicBricks / 99acres</th>
//                   <th>NoBroker</th>
//                   <th>Facebook Groups</th>
//                   <th>Co‑living</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td style={{color:'#fff'}}>Free Listings for Owners</td>
//                   <td className="yes">Yes</td>
//                   <td className="no">Paid</td>
//                   <td className="maybe">Limited Free</td>
//                   <td className="yes">Yes</td>
//                   <td className="no">Not Applicable</td>
//                 </tr>
//                 <tr>
//                   <td style={{color:'#fff'}}>Flatmate Search</td>
//                   <td className="yes">Built‑in</td>
//                   <td className="no">No</td>
//                   <td className="maybe">Basic</td>
//                   <td className="yes">Yes</td>
//                   <td className="no">No</td>
//                 </tr>
//                 <tr>
//                   <td style={{color:'#fff'}}>Direct Chat / Contact</td>
//                   <td className="yes">Free In‑App</td>
//                   <td className="no">Pay to Unlock</td>
//                   <td className="no">Subscription</td>
//                   <td className="maybe">Unverified</td>
//                   <td className="no">No</td>
//                 </tr>
//                 <tr>
//                   <td  style={{color:'#fff'}}>Verified Listings</td>
//                   <td className="yes">AI‑Verified</td>
//                   <td className="maybe">Mixed</td>
//                   <td className="maybe">Limited</td>
//                   <td className="no">No</td>
//                   <td className="yes">Internal Only</td>
//                 </tr>
//                 <tr>
//                   <td style={{color:'#fff'}}>Rent Payment & Credit Boost</td>
//                   <td className="yes">Built‑in</td>
//                   <td className="no">No</td>
//                   <td className="maybe">With Charges</td>
//                   <td className="no">No</td>
//                   <td className="no">No</td>
//                 </tr>
//                 <tr>
//                   <td style={{color:'#fff'}}>Zero Brokerage / Commissions</td>
//                   <td className="yes">Yes</td>
//                   <td className="no">Brokers Dominate</td>
//                   <td className="maybe">Claims Only</td>
//                   <td className="yes">Peer‑to‑Peer</td>
//                   <td className="no">Lock‑ins Apply</td>
//                 </tr>
//               </tbody>
//             </table>
//           </motion.div>
//         </div>
//       </motion.section>

//       {/* TESTIMONIALS */}
//       <motion.section 
//         id="testimonials"
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.7 }}
//       >
//         <div className="section-bg"></div>
//         <div className="container section-content">
//           <motion.div 
//             className="section-head"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <h2 className="fade-up">What our users say</h2>
//             <div className="chip fade-in">⭐ 5/5 Rated</div>
//           </motion.div>
          
//           <div className="testi-grid parallax" data-speed="-0.05">
//             {testimonials.map((testimonial, index) => (
//               <motion.article 
//                 key={index}
//                 className="card"
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: index * 0.15 }}
//                 whileHover={{ y: -10 }}
//               >
//                 <blockquote className="quote">{testimonial.quote}</blockquote>
//                 <div className="person">
//                   <img src={testimonial.image} alt={testimonial.name} />
//                   <div style={{display:'flex', flexDirection:'column'}}>
//                     <strong style={{color:'gray'}}>{testimonial.name}</strong>
//                     <small style={{color:'lightgray', letterSpacing:'0.5px'}}>{testimonial.role}</small>
//                   </div>
//                 </div>
//               </motion.article>
//             ))}
//           </div>
//         </div>
//       </motion.section>

//       {/* CTA DOWNLOAD */}
//       <motion.section 
//         id="download"
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.7 }}
//       >
//         <div className="section-bg"></div>
//         <div className="container section-content">
//           <motion.div 
//             className="cta"
//             whileHover={{ scale: 1.02 }}
//             transition={{ type: "spring", stiffness: 300 }}
//           >
//             <div style={{display:'grid', gridTemplateColumns: '1.2fr', gap:'20px', alignItems:'center'}}>
//               <div>
//                 <motion.h2
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.6 }}
//                 >
//                   Get the UpHomes app
//                 </motion.h2>
//                 <motion.p 
//                   className="sub"
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.6, delay: 0.2 }}
//                 >
//                   Find verified rentals, match faster with AI, and close deals without brokerage. Available on iOS and Android.
//                 </motion.p>
//                 <div style={{display:'flex', gap:'12px', marginTop:'16px', width:'100%'}}>
//                   <motion.a
//                     className="btn btn-primary magnetic"
//                     href="https://apps.apple.com/in/app/uphomes/id6737268880"
//                     target="_blank"
//                     rel="noopener"
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     App Store
//                   </motion.a>
//                   <motion.a
//                     className="btn btn-ghost magnetic"
//                     href="https://play.google.com/store/apps/details?id=com.flutterflow.homeU742786"
//                     target="_blank"
//                     rel="noopener"
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     Play Store
//                   </motion.a>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </motion.section>

//       {/* FOOTER */}
//       <motion.footer
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.6 }}
//       >
//         <div className="container" style={{display:'flex', justifyContent:'space-between', gap:'12px', flexWrap:'wrap'}}>
//           <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
//             <img src="https://firebasestorage.googleapis.com/v0/b/uphome12-8fb6a.appspot.com/o/logoUpHome%403x%20(1).png?alt=media&token=0756edff-426c-463f-9cdb-4a95a4b035de" alt="UpHomes logo" style={{height:'36px', width:'auto', borderRadius:'8px'}}/>
//           </div>
//           <div>
//             <small>© <span id="y"></span> UpHomes. All rights reserved.</small>
//           </div>
//           <div style={{display:'flex', gap:'16px'}}>
//             <a href='' style={{background:'transparent', border:'none', padding:'0', margin:'0'}}><FaInstagram style={{color:'white', fontSize:'18px', }}/></a>
//             <a href='' style={{background:'transparent', border:'none', padding:'0', margin:'0'}}><FaFacebook  style={{color:'white', fontSize:'18px'}}/></a>
//             <a href='' style={{background:'transparent', border:'none', padding:'0', margin:'0'}}><FaLinkedin  style={{color:'white', fontSize:'18px'}}/></a>
//           </div>
//         </div>
//       </motion.footer>

//       {/* SVG defs for gooey filter */}
//       <svg width="0" height="0" style={{position:'absolute'}}>
//         <defs>
//           <filter id="goo">
//             <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"/>
//             <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo"/>
//             <feBlend in="SourceGraphic" in2="goo"/>
//           </filter>
//         </defs>
//       </svg>
//     </>
//   );
// };

// export default App;


import React, { useEffect, useRef, useState } from 'react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { FaBarsStaggered } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';
// import phoneMockup from '../public/5-phone-mockups.png';


// Constants for reusability
const COLORS = [[75, 57, 239], [0, 229, 167], [185, 167, 255]];
const FEATURES = [
  {
    icon: '🛰',
    title: 'Micro‑Broker Network',
    description: 'Locals bring hidden supply online — students, guards, and neighbors earn passively.',
  },
  {
    icon: '🧭',
    title: 'Smart Filters',
    description: 'Powerful search with pricing bands to prevent deal leakage and speed up discovery.',
  },
  {
    icon: '🔐',
    title: 'Anti‑Leakage Design',
    description: 'All chats, visits, and payouts close inside the app — trust by design.',
  },
  {
    icon: '🪪',
    title: 'Listing Verification',
    description: 'Govt ID + selfie match + interior checks issue verified badges that users can rely on.',
  },
  {
    icon: '📈',
    title: 'Revenue‑Ready',
    description: 'Aligned commissions, low CAC, and add‑ons like rent receipts & credit boost.',
  },
  {
    icon: '🛟',
    title: 'Tenant Safety',
    description: 'In‑app alerts, reporting, and human moderation within 24 hours on escalations.',
  },
];

const TESTIMONIALS = [
  {
    quote: 'I found a great place with amazing flatmates in 2 days. The verification gave me peace of mind.',
    image: 'https://firebasestorage.googleapis.com/v0/b/uphome12-8fb6a.appspot.com/o/WhatsApp%20Image%202025-04-18%20at%2022.41.56%20(1).jpeg?alt=media&token=c6d724db-40bc-4514-8294-0388704bb1e8',
    name: 'Sahibaj',
    role: 'Student, Pune',
  },
  {
    quote: 'Filters saved me hours. Being able to call owners directly meant no time wasted with middlemen.',
    image: 'https://firebasestorage.googleapis.com/v0/b/uphome12-8fb6a.appspot.com/o/WhatsApp%20Image%202025-04-18%20at%2022.41.56.jpeg?alt=media&token=46d479df-54fa-4985-9429-c9a8f8087f42',
    name: 'Keshav Natla',
    role: 'Working Professional, Bangalore',
  },
  {
    quote: 'Verified listings and genuine reviews helped me find a safe place without getting scammed by brokers.',
    image: 'https://firebasestorage.googleapis.com/v0/b/uphome12-8fb6a.appspot.com/o/WhatsApp%20Image%202025-04-18%20at%2022.41.55.jpeg?alt=media&token=32d35e7a-d8d1-487c-b8cd-0b838fa0977e',
    name: 'Hitesh Mali',
    role: 'IT Professional, Pune',
  },
];

const STEPS = [
  {
    title: 'List a Property',
    description: 'Snap photos, add details, set a fair price band. Verification starts instantly.',
  },
  {
    title: 'Schedule Visits',
    description: 'Coordinate in‑app — no phone number leaks or off‑platform haggling.',
  },
  {
    title: 'Close the Deal',
    description: 'Smart flows ensure both sides confirm before moving to payout.',
  },
  {
    title: 'Earn Passively',
    description: 'Payouts are processed after verified closure — transparent & secure.',
  },
];

const App = () => {
  const particlesRef = useRef(null);
  const tiltRef = useRef(null);
  const animationFrameRef = useRef(null);
  const heroSectionRef = useRef(null);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Utility functions
  const debounce = (fn, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), wait);
    };
  };

  const rand = (a, b) => Math.random() * (b - a) + a;

  useEffect(() => {
    // Set year
    const yearEl = document.getElementById('y');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Scroll handling for floating button
    const handleScroll = () => {
      if (heroSectionRef.current) {
        const heroHeight = heroSectionRef.current.offsetHeight;
        setShowFloatingButton(window.scrollY > heroHeight * 0.7);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Parallax effect
    const items = Array.from(document.querySelectorAll('.parallax'));
    const speeds = items.map((el) => parseFloat(el.getAttribute('data-speed') || '0.04'));
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY || 0;
          items.forEach((item, i) => {
            item.style.setProperty('--py', `${y * speeds[i]}px`);
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Particle animation
    const canvas = particlesRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        let w = 0,
          h = 0,
          parts = [];
        const DPR = Math.min(window.devicePixelRatio || 1, 2);

        const resize = () => {
          if (!canvas || !ctx) return;
          const b = canvas.getBoundingClientRect();
          w = b.width | 0;
          h = b.height | 0;
          canvas.width = w * DPR;
          canvas.height = h * DPR;
          ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
          spawn();
        };

        const spawn = () => {
          const count = Math.min(120, Math.floor((w * h) / 18000));
          parts = Array.from({ length: count }, () => ({
            x: rand(0, w),
            y: rand(0, h),
            r: rand(0.6, 2.2),
            a: rand(0.2, 0.85),
            vx: rand(-0.25, 0.25),
            vy: rand(-0.25, 0.25),
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
          }));
        };

        const step = () => {
          animationFrameRef.current = requestAnimationFrame(step);
          ctx.clearRect(0, 0, w, h);
          parts.forEach((p) => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = w;
            if (p.x > w) p.x = 0;
            if (p.y < 0) p.y = h;
            if (p.y > h) p.y = 0;
            p.a += (Math.random() - 0.5) * 0.03;
            p.a = Math.max(0.15, Math.min(0.9, p.a));
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, ${p.a})`;
            ctx.fill();
          });
        };

        const debouncedResize = debounce(resize, 100);
        const ro = new ResizeObserver(debouncedResize);
        ro.observe(canvas);
        resize();
        step();

        // Cleanup
        return () => {
          ro.disconnect();
          if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        };
      }
    }

    // Tilt effect
    const el = tiltRef.current;
    if (el) {
      const handleMouseMove = (e) => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = (e.clientX - cx) / r.width;
        const dy = (e.clientY - cy) / r.height;
        el.style.transform = `perspective(1000px) rotateY(${dx * 10}deg) rotateX(${-dy * 10}deg)`;
      };

      const handleMouseLeave = () => {
        el.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg)`;
      };

      el.addEventListener('mousemove', handleMouseMove);
      el.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        el.removeEventListener('mousemove', handleMouseMove);
        el.removeEventListener('mouseleave', handleMouseLeave);
      };
    }

    // Magnetic hover
    if (window.matchMedia('(hover: hover)').matches) {
      const strength = 14;
      document.querySelectorAll('.magnetic').forEach((el) => {
        const enter = () => (el.style.transition = 'transform .15s ease-out');
        const leave = () => {
          el.style.transition = 'transform .25s ease';
          el.style.transform = 'translate3d(0,0,0)';
        };
        const move = (e) => {
          const r = el.getBoundingClientRect();
          const x = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
          const y = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
          el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
        };
        el.addEventListener('mouseenter', enter);
        el.addEventListener('mousemove', move);
        el.addEventListener('mouseleave', leave);

        return () => {
          el.removeEventListener('mouseenter', enter);
          el.removeEventListener('mousemove', move);
          el.removeEventListener('mouseleave', leave);
        };
      });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      <style>{`
        :root {
          --bg-dark: #161C22;
          --bg-dark-2: #1D2429;
          --text: #B1BCC7;
          --primary: #5D4AFF;
          --primary-2: #7B6AFF;
          --accent: #00F0B5;
          --glass: rgba(255,255,255,0.08);
          --border: rgba(255,255,255,0.12);
          --maxw: 1200px;
          --radius-xl: 24px;
          --radius-2xl: 32px;
          --shadow-1: 0 12px 36px rgba(0,0,0,0.3);
          --shadow-2: 0 24px 64px rgba(0,0,0,0.4);
        }

        * {
          box-sizing: border-box;
        }

        html, body {
          margin: 0;
          height: 100%;
          overflow-x: hidden;
        }

        body {
          background: radial-gradient(1400px 1000px at 80% -10%, rgba(93,74,255,.4), transparent 65%),
                      radial-gradient(1000px 800px at 0% 20%, rgba(0,240,181,.25), transparent 60%),
                      linear-gradient(180deg, #0D1216, #0A0D10 100%);
          font-family: "Montserrat", sans-serif;
          letter-spacing: -0.01em;
          line-height: 1.6;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        img {
          max-width: 100%;
          display: block;
        }

        /* Utilities */
        .container {
          width: 100%;
          max-width: var(--maxw);
          margin: auto;
          padding: 0 20px;
        }

        .chip {
          color: #ffffff;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border: 1px solid var(--border);
          padding: 8px 16px;
          border-radius: 999px;
          background: var(--glass);
          backdrop-filter: blur(8px);
          font-size: 15px;
        }

        .gradient-text {
          background: linear-gradient(90deg, #fff, #8ec5ff, #b9a7ff);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 20px;
          border-radius: 12px;
          font-weight: 700;
          letter-spacing: 0.2px;
          border: 1px solid transparent;
          transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .btn-primary {
          background: linear-gradient(135deg, var(--primary), var(--primary-2));
          box-shadow: 0 12px 32px rgba(93,74,255,0.4), inset 0 0 0 1px rgba(255,255,255,0.1);
          color: #fff;
        }

        .btn-primary:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(93,74,255,0.6), inset 0 0 0 1px rgba(255,255,255,0.15);
        }

        .btn-ghost {
          background: transparent;
          color: #fff;
          border-color: var(--border);
        }

        .btn-ghost:hover {
          background: rgba(255,255,255,0.1);
        }

        .card {
          border-radius: var(--radius-2xl);
          padding: 28px;
          background: linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
          backdrop-filter: blur(16px);
          border: 1px solid var(--border);
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-2);
          border-color: rgba(255,255,255,0.18);
        }

        .icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          background: linear-gradient(135deg, var(--primary), var(--primary-2));
          color: #fff;
          font-size: 24px;
        }

        /* Typography */
        h1, h2, h3, h4 {
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #fff;
        }

        .hero-copy h1 {
          font-size: clamp(36px, 6.5vw, 68px);
          line-height: 1.02;
          margin: 16px 0 20px;
        }

        .sub {
          font-size: clamp(16px, 1.8vw, 18px);
          color: #ffffff;
          opacity: 0.85;
          line-height: 1.7;
        }

        /* Animations */
        @keyframes shine {
          to { background-position: 200% center; }
        }

        @keyframes sweep {
          0% { transform: translateX(-40%) rotate(5deg); }
          50% { transform: translateX(40%) rotate(5deg); }
          100% { transform: translateX(-40%) rotate(5deg); }
        }

        @keyframes floaty {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          to { opacity: 1; }
        }

        @keyframes spinSlow {
          to { transform: rotate(360deg); }
        }

        @keyframes drift {
          from { transform: translateY(-10px); }
          to { transform: translateY(10px); }
        }

        @keyframes gridPan {
          to { background-position: 0 40px, 40px 0; }
        }

        @keyframes blobFloat {
          0% { transform: translate(0,0) scale(1); }
          100% { transform: translate(24px,-26px) scale(1.12); }
        }

        .fade-up {
          opacity: 0;
          transform: translateY(24px);
          animation: fadeUp 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        .fade-in {
          opacity: 0;
          animation: fadeIn 0.9s ease forwards;
        }

        .delay-1 { animation-delay: 0.12s; }
        .delay-2 { animation-delay: 0.24s; }
        .delay-3 { animation-delay: 0.36s; }
        .delay-4 { animation-delay: 0.48s; }
        .delay-5 { animation-delay: 0.6s; }

        /* Nav */
        .nav {
          position: sticky;
          top: 0;
          z-index: 40;
          backdrop-filter: blur(10px);
          background: linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.25));
          border-bottom: 1px solid var(--border);
        }

        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 14px 0;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo {
          width: 40px;
          height: 40px;
          display: grid;
          place-items: center;
          border-radius: 12px;
          background: radial-gradient(120% 120% at 0% 0%, #6f62ff, #4b39ef 60%, #2b21a0 100%);
          color: #fff;
          font-weight: 800;
          letter-spacing: 0.5px;
        }

        .nav-links {
          display: flex;
          gap: 18px;
          align-items: center;
        }

        .nav a {
          color: #d7dde5;
          opacity: 0.92;
        }

        .menu-toggle {
          display: none;
          background: transparent;
          border: none;
          color: white;
          font-size: 24px;
          cursor: pointer;
          z-index: 101;
        }

        /* Hero */
        .hero {
          padding: clamp(60px, 10vw, 120px) 0 clamp(40px, 8vw, 80px);
          position: relative;
          isolation: isolate;
          background: radial-gradient(1000px 600px at 20% 10%, rgba(75,57,239,0.35), transparent 70%),
                      radial-gradient(800px 500px at 80% 90%, rgba(0,229,167,0.25), transparent 70%);
        }

        .aurora, .grid-bg {
          position: absolute;
          inset: 0;
          z-index: -2;
        }

        .aurora {
          background: radial-gradient(800px 400px at 15% 20%, rgba(105,91,255,0.35), transparent 60%),
                      radial-gradient(700px 380px at 85% 10%, rgba(0,229,167,0.22), transparent 60%),
                      radial-gradient(900px 500px at 50% 100%, rgba(75,57,239,0.25), transparent 60%);
          filter: blur(6px);
          animation: drift 16s ease-in-out infinite alternate;
        }

        .grid-bg::before {
          content: '';
          position: absolute;
          inset: -30% -10%;
          background: linear-gradient(transparent 49%, rgba(255,255,255,0.08) 50%, transparent 51%) top/100% 40px,
                      linear-gradient(90deg, transparent 49%, rgba(255,255,255,0.08) 50%, transparent 51%) left/40px 100%;
          opacity: 0.25;
          transform: perspective(900px) rotateX(55deg) translateY(-20%);
          animation: gridPan 30s linear infinite;
        }

        .hero-fancy {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 36px;
          // align-items: center;
        }

        .hero-copy .sub {
          color: #D0D6DF;
          max-width: 54ch;
        }

        .cta-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 14px;
        }

        .hero-visual {
          position: relative;
          display: grid;
          place-items: center;
        }

        .tilt {
          width: min(460px, 92%);
          aspect-ratio: 9/19.5;
          border-radius: 28px;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.2s ease-out;
        }

        .device {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          border-radius: 28px;
        }

        .sweep {
          position: absolute;
          inset: -1px;
          pointer-events: none;
          background: linear-gradient(115deg, transparent 10%, rgba(255,255,255,0.25) 35%, transparent 60%);
          mix-blend-mode: screen;
          filter: blur(2px);
          animation: sweep 4.8s ease-in-out infinite;
        }

        .badge-floating {
          position: absolute;
          padding: 10px 14px;
          border-radius: 999px;
          background: rgba(255,255,255,0.08);
          border: 1px solid var(--border);
          backdrop-filter: blur(8px);
          color: #EAF2FF;
          font-weight: 600;
        }

        .badge-floating.one {
          left: -18px;
          top: 10%;
          animation: floaty 6s ease-in-out infinite;
        }

        .badge-floating.two {
          right: -18px;
          top: 22%;
          animation: floaty 7s ease-in-out 0.3s infinite;
        }

        .badge-floating.three {
          left: 0;
          bottom: 8%;
          animation: floaty 8s ease-in-out 0.6s infinite;
        }

        .orb {
          position: absolute;
          filter: blur(8px);
          opacity: 0.8;
          border-radius: 50%;
          mix-blend-mode: screen;
        }

        .orb.o1 {
          width: 130px;
          height: 130px;
          left: -60px;
          top: -30px;
          background: conic-gradient(from 0deg, rgba(75,57,239,0.9), rgba(105,91,255,0.4), rgba(0,229,167,0.4), rgba(75,57,239,0.9));
          animation: spinSlow 18s linear infinite;
        }

        .orb.o2 {
          width: 90px;
          height: 90px;
          right: -40px;
          bottom: -20px;
          background: conic-gradient(from 0deg, rgba(0,229,167,0.9), rgba(105,91,255,0.35), rgba(75,57,239,0.9));
          animation: spinSlow 12s linear reverse infinite;
        }

        .particles {
          position: absolute;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          width: 100%;
          height: 100%;
          background: transparent;
          mix-blend-mode: screen;
        }

        .goo-blob-wrap {
          position: absolute;
          inset: 0;
          z-index: -1;
          filter: url(#goo);
          display: none;
        }

        .goo-blob-wrap .blob {
          position: absolute;
          border-radius: 50%;
          opacity: 0.7;
          mix-blend-mode: screen;
          background: radial-gradient(60% 60% at 30% 30%, rgba(75,57,239,0.85), rgba(105,91,255,0.25) 60%, transparent 70%),
                      radial-gradient(60% 60% at 70% 70%, rgba(0,229,167,0.8), transparent 60%);
          animation: blobFloat var(--d, 12s) ease-in-out infinite alternate;
          filter: blur(2px);
        }

        .goo-blob-wrap .b1 {
          width: 240px;
          height: 240px;
          left: 8%;
          bottom: 12%;
          --d: 12s;
        }

        .goo-blob-wrap .b2 {
          width: 190px;
          height: 190px;
          right: 10%;
          bottom: 22%;
          --d: 14s;
        }

        .goo-blob-wrap .b3 {
          width: 280px;
          height: 280px;
          left: 24%;
          top: 12%;
          --d: 16s;
        }

        .magnetic {
          position: relative;
          will-change: transform;
          transition: transform 0.2s ease-out;
        }

        .magnetic:active {
          transform: scale(0.98) !important;
        }

        .section-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
          opacity: 0.1;
          background: radial-gradient(800px 400px at 20% 10%, rgba(105,91,255,0.15), transparent 70%),
                      radial-gradient(600px 300px at 80% 90%, rgba(0,229,167,0.1), transparent 70%);
          pointer-events: none;
        }

        section {
          background: rgba(16, 20, 24, 0.85);
          backdrop-filter: blur(12px);
          padding: clamp(60px, 10vw, 100px) 0;
          position: relative;
          overflow: hidden;
        }

        section::before, section::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
        }

        section::before {
          top: 0;
        }

        section::after {
          bottom: 0;
        }

        .section-content {
          position: relative;
          z-index: 2;
        }

        .section-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 48px;
        }

        h2 {
          font-size: clamp(26px, 3.6vw, 40px);
          margin: 0;
          line-height: 1.15;
        }

        .grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }

        .steps {
          margin-top: 50px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          counter-reset: step;
        }

        .step {
          background: var(--glass);
          border: 1px solid var(--border);
          padding: 18px;
          border-radius: 18px;
          position: relative;
        }

        .step:before {
          counter-increment: step;
          content: counter(step);
          position: absolute;
          top: -20px;
          left: -12px;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: linear-gradient(135deg, var(--primary), var(--primary-2));
          color: #fff;
          display: grid;
          place-items: center;
          font-weight: 800;
          box-shadow: var(--shadow-1);
        }

        .table {
          overflow: auto;
          border-radius: 16px;
          border: 1px solid var(--border);
        }

        table {
          width: 100%;
          border-collapse: collapse;
          min-width: 760px;
          background: rgba(255,255,255,0.02);
        }

        th, td {
          padding: 14px 16px;
          text-align: left;
          border-bottom: 1px solid var(--border);
        }

        th {
          color: #E8EDF5;
          font-weight: 700;
          background: rgba(255,255,255,0.04);
        }

        .yes {
          color: #18c964;
          font-weight: 700;
        }

        .no {
          color: #FF5C5C;
          font-weight: 700;
        }

        .maybe {
          color: #FFB020;
          font-weight: 700;
        }

        #testimonials .testi-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }

        #testimonials .quote {
          color: #CFD6E1;
          font-style: italic;
          margin: 0 0 16px;
        }

        #testimonials .person {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        #testimonials .person img {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          object-fit: cover;
        }

        .cta {
          position: relative;
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 28px;
          background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
          overflow: hidden;
        }

        .cta:after {
          content: '';
          position: absolute;
          right: -60px;
          top: -60px;
          width: 200px;
          height: 200px;
          border-radius: 28px;
          filter: blur(8px);
          opacity: 0.6;
          background: conic-gradient(from 0deg, rgba(0,229,167,0.9), rgba(105,91,255,0.3), rgba(75,57,239,0.9));
          animation: spinSlow 16s linear infinite;
        }

        .qr {
          width: 96px;
          height: 96px;
          border-radius: 12px;
          overflow: hidden;
          background: #fff;
          display: block;
        }

        .qr img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .floating-button {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 40;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          border-radius: 16px;
          background: #4b39ef;
          backdrop-filter: blur(10px);
          color: white;
          font-weight: 600;
          box-shadow: 0 8px 32px rgba(93,74,255,0.4);
          border: 1px solid rgba(255,255,255,0.15);
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .floating-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(93,74,255,0.6);
        }

        .floating-button img {
          width: 75px;
          height: 75px;
          border-radius: 8px;
          background: white;
          padding: 4px;
        }

        footer {
          padding: 40px 0;
          border-top: 1px solid var(--border);
          color: #AAB3BF;
          background: linear-gradient(180deg, rgba(10,13,16,0.85), rgba(8,10,13,0.95));
          backdrop-filter: blur(12px);
        }

        .grid-container {
          display: grid;
          grid-template-columns: 3fr 4fr;
          gap: 40px;
          align-items: center;
        }

        .image-container {
          order: 0;
        }

        .content-container {
          order: 0;
        }

        /* Responsive Navigation */
        @media (max-width: 768px) {
          .menu-toggle {
            display: block;
            position: relative;
          }

          .nav-links {
            position: fixed;
            top: 0;
            right: -100%;
            height: 100vh;
            width: 70%;
            background: rgba(16, 20, 24, 0.98);
            backdrop-filter: blur(12px);
            flex-direction: column;
            padding: 80px 20px 40px;
            gap: 24px;
            transition: right 0.4s ease;
            z-index: 100;
          }

          .nav-links.open {
            right: 0;
          }

          .nav-links a {
            font-size: 18px;
            padding: 12px;
            border-radius: 12px;
            background: rgba(255,255,255,0.05);
            width: 100%;
            text-align: center;
          }

          .nav-links:not(.open) {
            display: none;
          }
        }

        /* Responsive Adjustments */
        @media (max-width: 1000px) {
          .hero-fancy {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .hero-visual {
            margin-top: 8px;
          }

          .badge-floating.one, .badge-floating.two {
            display: none;
          }

          .grid-3 {
            grid-template-columns: repeat(2, 1fr);
          }

          .steps {
            grid-template-columns: repeat(2, 1fr);
          }

          .goo-blob-wrap {
            display: block;
          }

          #testimonials .testi-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .grid-container {
            gap: 30px;
          }
        }

        @media (max-width: 768px) {
          .hero {
            padding: clamp(50px, 8vw, 100px) 0 clamp(30px, 6vw, 60px);
          }

          section {
            padding: clamp(50px, 8vw, 70px) 0;
          }

          .cta-row .btn {
            font-size: 14px;
            padding: 12px 18px;
          }

          .grid-3 {
            grid-template-columns: 1fr;
          }

          .steps {
            grid-template-columns: 1fr;
          }

          #testimonials .testi-grid {
            grid-template-columns: 1fr;
          }

          .grid-container {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .image-container {
            order: 1;
            margin-left: 0;
            max-width: 100%;
            display: flex;
            justify-content: center;
          }

          .content-container {
            order: 2;
          }

          .hero-copy .sub {
            max-width: 100%;
          }

          .kpis {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }

          .floating-button {
            bottom: 20px;
            right: 20px;
            padding: 8px 12px;
          }

          .floating-button img {
            width: 60px;
            height: 60px;
          }
        }

        @media (max-width: 480px) {
          .hero-copy h1 {
            font-size: clamp(28px, 5.5vw, 36px);
          }

          .sub {
            font-size: clamp(14px, 1.6vw, 16px);
          }

          .kpis {
            grid-template-columns: 1fr;
          }

          .tilt {
            width: 100%;
          }

          .section-head {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          h2 {
            font-size: clamp(22px, 3.2vw, 32px);
          }

          .card {
            padding: 20px;
          }

          .btn {
            padding: 12px 16px;
            font-size: 14px;
          }
        }
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="container nav-inner">
          <div className="brand fade-in">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/uphome12-8fb6a.appspot.com/o/logoUpHome%403x%20(1).png?alt=media&token=0756edff-426c-463f-9cdb-4a95a4b035de"
              alt="UpHomes logo"
              style={{ height: '36px', width: 'auto', borderRadius: '8px' }}
            />
          </div>

          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <IoMdClose /> : <FaBarsStaggered />}
          </button>

          <div className={`nav-links ${isMenuOpen ? 'open' : ''} fade-in delay-2`}>
            <a href="#showcase" onClick={() => setIsMenuOpen(false)}>
              Showcase
            </a>
            <a href="#features" onClick={() => setIsMenuOpen(false)}>
              Features
            </a>
            <a href="#how" onClick={() => setIsMenuOpen(false)}>
              How it works
            </a>
            <a href="#compare" onClick={() => setIsMenuOpen(false)}>
              Compare
            </a>
            <a href="#download" className="chip" onClick={() => setIsMenuOpen(false)} aria-label="Download the app">
              📲 <span>Get the App</span>
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <motion.header
        className="hero"
        ref={heroSectionRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="aurora" />
        <div className="grid-bg" />
        <canvas ref={particlesRef} id="particles" className="particles" aria-hidden="true" style={{ width: '100%', height: '100%' }} />
        <div className="goo-blob-wrap" aria-hidden="true">
          <div className="blob b1" />
          <div className="blob b2" />
          <div className="blob b3" />
        </div>

        <div className="container hero-fancy">
          <div className="hero-copy fade-up parallax" data-speed="0.04">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <span className="shine">Find verified rentals</span>
              <br />
              <span className="gradient-text">fast, fair & spam‑free.</span>
            </motion.h1>

            <motion.p className="sub" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              UpHomes is the community‑driven rental platform that unlocks hidden supply, verifies listings, and connects you directly with owners and flatmates — no noise, no traps.
            </motion.p>

            <div className="cta-row">
              <motion.a
                className="btn btn-primary magnetic"
                href="#download"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Download App
              </motion.a>
              <motion.a
                className="btn btn-ghost magnetic"
                href="#features"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                Explore Features
              </motion.a>
            </div>

            <div className="kpis" style={{ marginTop: '28px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              {[
                { value: '7,000+', label: 'Active users' },
                { value: '3,500+', label: 'Live listings' },
                { value: '800+', label: 'Micro‑brokers' },
              ].map((kpi, index) => (
                <motion.div
                  key={index}
                  className="kpi"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <h3 style={{ margin: 0, color: '#fff', fontSize: '24px' }}>{kpi.value}</h3>
                  <p className="sub" style={{ margin: '6px 0 0' }}>{kpi.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="hero-visual fade-up delay-2 parallax"
            data-speed="-0.03"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="tilt" ref={tiltRef} id="tilt">
              <img
                className="device"
                alt="UpHomes app mockup"
                src="https://firebasestorage.googleapis.com/v0/b/uphome12-8fb6a.appspot.com/o/iphone%2016%20pro%20max%20mock%20up.png?alt=media&token=33691747-8fbc-4386-b594-c7805c101397"
              />
              <div className="sweep" />
            </div>
            <motion.span className="badge-floating one" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
              🛡 Verified
            </motion.span>
            <motion.span className="badge-floating two" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3.5, delay: 0.3 }}>
              🤖 AI Match
            </motion.span>
            <motion.span className="badge-floating three" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4, delay: 0.6 }}>
              💬 Direct Chat
            </motion.span>
            <span className="orb o1" />
            <span className="orb o2" />
          </motion.div>
        </div>
      </motion.header>

      {/* Floating Download Button */}
      {/* <AnimatePresence>
        {showFloatingButton && (
          <motion.a
            href="#download"
            className="floating-button"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25, duration: 0.5 }}
          >
            <img
              src="https://firebasestorage.googleapis.com/v0/b/uphome12-8fb6a.appspot.com/o/IMG_6015.PNG?alt=media&token=d0b923cd-9efb-4baa-bcb2-0d84a4b30d66"
              alt="QR Code"
            />
          </motion.a>
        )}
      </AnimatePresence> */}

      {/* SHOWCASE */}
      <motion.section
        id="showcase"
        style={{ padding: 'clamp(50px, 8vw, 80px) 0' }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.7 }}
      >
        <div className="section-bg" />
        <div className="container section-content">
          <motion.div
            className="section-head"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '48px' }}
          >
            <div>
              <motion.h2
                style={{ fontSize: 'clamp(32px, 4.5vw, 48px)', marginBottom: '12px' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Built by renters, for renters.
              </motion.h2>
              <motion.p
                className="sub"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ maxWidth: '600px', fontSize: 'clamp(18px, 2vw, 22px)', opacity: 0.9 }}
              >
                Finding a home made easy
              </motion.p>
            </div>
            <div className="chip fade-in">📱 App Screens</div>
          </motion.div>

          <div className="grid-container">
            <motion.div
              className="fade-up parallax content-container"
              data-speed="0.04"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {[
                  {
                    number: '1',
                    title: 'Just drop your property',
                    description: 'Easily list your property with no upfront charges',
                    bgColor: 'rgba(93, 74, 255, 0.15)',
                    color: '#7B6AFF',
                  },
                  {
                    number: '2',
                    title: 'For Properties',
                    description: 'Browse verified listings with transparent pricing',
                    bgColor: 'rgba(0, 229, 167, 0.15)',
                    color: '#00F0B5',
                  },
                  {
                    number: '3',
                    title: 'Direct Chat',
                    description: 'Connect directly with owners or flatmates',
                    bgColor: 'rgba(185, 167, 255, 0.15)',
                    color: '#B9A7FF',
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="card"
                    style={{ padding: '24px', borderRadius: '20px' }}
                    whileHover={{ y: -5 }}
                    transition={{ type: 'spring', stiffness: 300, delay: index * 0.1 }}
                  >
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <div className="icon" style={{ background: item.bgColor, color: item.color }}>
                        {item.number}
                      </div>
                      <div>
                        <h3 style={{ color: '#fff', margin: '0 0 8px', letterSpacing: '0.1px' }}>{item.title}</h3>
                        <p className="sub" style={{ margin: '0', fontSize: '14px' }}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="fade-up delay-1 parallax image-container"
              data-speed="-0.03"
              style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden' }}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <img   src={`${process.env.PUBLIC_URL}/5-phone-mockups.png`} alt="UpHomes app showcase" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* FEATURES */}
      <motion.section
        id="features"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="section-bg" />
        <div className="container section-content">
          <motion.div
            className="section-head"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="fade-up">Built for speed, trust, and scale.</h2>
            <div className="chip fade-in">⚡ MoM Growth ~160%</div>
          </motion.div>

          <div className="grid-3">
            {FEATURES.map((feature, index) => (
              <motion.article
                key={index}
                className="card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="icon" aria-hidden="true">
                  {feature.icon}
                </div>
                <h3 style={{ color: '#fff', margin: '16px 0 8px' }}>{feature.title}</h3>
                <p className="sub">{feature.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      {/* HOW IT WORKS */}
      <motion.section
        id="how"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="section-bg" />
        <div className="container section-content">
          <motion.div
            className="section-head"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="fade-up">Turn local listings into monthly income.</h2>
            <div className="chip fade-in">💸 Micro‑Broker Model</div>
          </motion.div>

          <div className="steps">
            {STEPS.map((step, index) => (
              <motion.div
                key={index}
                className="step"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <h4 style={{ color: '#fff', margin: '0 0 8px' }}>{step.title}</h4>
                <p className="sub">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* COMPARE */}
      <motion.section
        id="compare"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="section-bg" />
        <div className="container section-content">
          <motion.div
            className="section-head"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="fade-up">Why UpHomes beats paywalls and broker traps.</h2>
            <div className="chip fade-in">🔍 Transparent</div>
          </motion.div>

          <motion.div
            className="table fade-up"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <table aria-label="Competitive comparison">
              <thead>
                <tr>
                  <th>Feature / Platform</th>
                  <th>UpHomes</th>
                  <th>MagicBricks / 99acres</th>
                  <th>NoBroker</th>
                  <th>Facebook Groups</th>
                  <th>Co‑living</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    feature: 'Free Listings for Owners',
                    uphomes: 'Yes',
                    magicbricks: 'Paid',
                    nobroker: 'Limited Free',
                    facebook: 'Yes',
                    coliving: 'Not Applicable',
                  },
                  {
                    feature: 'Flatmate Search',
                    uphomes: 'Built‑in',
                    magicbricks: 'No',
                    nobroker: 'Basic',
                    facebook: 'Yes',
                    coliving: 'No',
                  },
                  {
                    feature: 'Direct Chat / Contact',
                    uphomes: 'Free In‑App',
                    magicbricks: 'Pay to Unlock',
                    nobroker: 'Subscription',
                    facebook: 'Unverified',
                    coliving: 'No',
                  },
                  {
                    feature: 'Verified Listings',
                    uphomes: 'AI‑Verified',
                    magicbricks: 'Mixed',
                    nobroker: 'Limited',
                    facebook: 'No',
                    coliving: 'Internal Only',
                  },
                  {
                    feature: 'Rent Payment & Credit Boost',
                    uphomes: 'Built‑in',
                    magicbricks: 'No',
                    nobroker: 'With Charges',
                    facebook: 'No',
                    coliving: 'No',
                  },
                  {
                    feature: 'Zero Brokerage / Commissions',
                    uphomes: 'Yes',
                    magicbricks: 'Brokers Dominate',
                    nobroker: 'Claims Only',
                    facebook: 'Peer‑to‑Peer',
                    coliving: 'Lock‑ins Apply',
                  },
                ].map((row, index) => (
                  <tr key={index}>
                    <td style={{ color: '#fff' }}>{row.feature}</td>
                    <td className={row.uphomes === 'Yes' ? 'yes' : row.uphomes === 'No' ? 'no' : 'maybe'}>{row.uphomes}</td>
                    <td className={row.magicbricks === 'Yes' ? 'yes' : row.magicbricks === 'No' ? 'no' : 'maybe'}>{row.magicbricks}</td>
                    <td className={row.nobroker === 'Yes' ? 'yes' : row.nobroker === 'No' ? 'no' : 'maybe'}>{row.nobroker}</td>
                    <td className={row.facebook === 'Yes' ? 'yes' : row.facebook === 'No' ? 'no' : 'maybe'}>{row.facebook}</td>
                    <td className={row.coliving === 'Yes' ? 'yes' : row.coliving === 'No' ? 'no' : 'maybe'}>{row.coliving}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </motion.section>

      {/* TESTIMONIALS */}
      <motion.section
        id="testimonials"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="section-bg" />
        <div className="container section-content">
          <motion.div
            className="section-head"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="fade-up">What our users say</h2>
            <div className="chip fade-in">⭐ 5/5 Rated</div>
          </motion.div>

          <div className="testi-grid parallax" data-speed="-0.05">
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.article
                key={index}
                className="card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -10 }}
              >
                <blockquote className="quote">❝ {testimonial.quote} ❞</blockquote>
                <div className="person">
                  <img src={testimonial.image} alt={testimonial.name} />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <strong style={{ color: 'gray' }}>{testimonial.name}</strong>
                    <small style={{ color: 'lightgray', letterSpacing: '0.5px' }}>{testimonial.role}</small>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA DOWNLOAD */}
      <motion.section
        id="download"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="section-bg" />
        <div className="container section-content">
          <motion.div className="cta" whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px', alignItems: 'center' }}>
              <div>
                <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                  Get the UpHomes app
                </motion.h2>
                <motion.p
                  className="sub"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Find verified rentals, match faster with AI, and close deals without brokerage. Available on iOS and Android.
                </motion.p>
                <div style={{ display: 'flex', gap: '12px', marginTop: '16px', width: '100%' }}>
                  <motion.a
                    className="btn btn-primary magnetic"
                    href="https://apps.apple.com/in/app/uphomes/id6737268880"
                    target="_blank"
                    rel="noopener"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    App Store
                  </motion.a>
                  <motion.a
                    className="btn btn-ghost magnetic"
                    href="https://play.google.com/store/apps/details?id=com.flutterflow.homeU742786"
                    target="_blank"
                    rel="noopener"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Play Store
                  </motion.a>
                </div>
              </div>
              <div style={{ width: "100%", display: "flex", justifyContent: "end", alignItems: "center", zIndex: "3" }}>
               <img
              src="https://firebasestorage.googleapis.com/v0/b/uphome12-8fb6a.appspot.com/o/IMG_6015.PNG?alt=media&token=d0b923cd-9efb-4baa-bcb2-0d84a4b30d66"
              alt="QR Code"
              style={{ height: "180px", width: "auto", borderRadius: "8px" , opacity:"1"}}
            />
            </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* FOOTER */}
      <motion.footer initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/uphome12-8fb6a.appspot.com/o/logoUpHome%403x%20(1).png?alt=media&token=0756edff-426c-463f-9cdb-4a95a4b035de"
              alt="UpHomes logo"
              style={{ height: '36px', width: 'auto', borderRadius: '8px' }}
            />
          </div>
          <div>
            <small>
              © <span id="y"></span> UpHomes. All rights reserved.
            </small>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="" style={{ background: 'transparent', border: 'none', padding: '0', margin: '0' }}>
              <FaInstagram style={{ color: 'white', fontSize: '18px' }} />
            </a>
            <a href="" style={{ background: 'transparent', border: 'none', padding: '0', margin: '0' }}>
              <FaFacebook style={{ color: 'white', fontSize: '18px' }} />
            </a>
            <a href="" style={{ background: 'transparent', border: 'none', padding: '0', margin: '0' }}>
              <FaLinkedin style={{ color: 'white', fontSize: '18px' }} />
            </a>
          </div>
        </div>
      </motion.footer>

      {/* SVG defs for gooey filter */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
    </>
  );
};

export default App;