import React, { useEffect, useRef, useState } from "react";
import { FaApple, FaFacebook, FaGooglePlay, FaInstagram, FaLinkedin } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FaBarsStaggered } from "react-icons/fa6";
import { motion } from "framer-motion";


const FEATURES = [
  {
    icon: "🛰",
    title: "Micro‑Broker Network",
    description:
      "Locals bring hidden supply online — students, guards, and neighbors earn passively.",
  },
  {
    icon: "🧭",
    title: "Smart Filters",
    description:
      "Powerful search with pricing bands to prevent deal leakage and speed up discovery.",
  },
  {
    icon: "🔐",
    title: "Anti‑Leakage Design",
    description:
      "All chats, visits, and payouts close inside the app — trust by design.",
  },
  {
    icon: "🪪",
    title: "Listing Verification",
    description:
      "Govt ID + selfie match + interior checks issue verified badges that users can rely on.",
  },
  {
    icon: "📈",
    title: "Revenue‑Ready",
    description:
      "Aligned commissions, low CAC, and add‑ons like rent receipts & credit boost.",
  },
  {
    icon: "🛟",
    title: "Tenant Safety",
    description:
      "In‑app alerts, reporting, and human moderation within 24 hours on escalations.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "I found a great place with amazing flatmates in 2 days. The verification gave me peace of mind.",
    image:
      "https://firebasestorage.googleapis.com/v0/b/uphome12-8fb6a.appspot.com/o/WhatsApp%20Image%202025-04-18%20at%2022.41.56%20(1).jpeg?alt=media&token=c6d724db-40bc-4514-8294-0388704bb1e8",
    name: "Sahibaj",
    role: "Student, Pune",
  },
  {
    quote:
      "Filters saved me hours. Being able to call owners directly meant no time wasted with middlemen.",
    image:
      "https://firebasestorage.googleapis.com/v0/b/uphome12-8fb6a.appspot.com/o/WhatsApp%20Image%202025-04-18%20at%2022.41.56.jpeg?alt=media&token=46d479df-54fa-4985-9429-c9a8f8087f42",
    name: "Keshav Natla",
    role: "Working Professional, Bangalore",
  },
  {
    quote:
      "Verified listings and genuine reviews helped me find a safe place without getting scammed by brokers.",
    image:
      "https://firebasestorage.googleapis.com/v0/b/uphome12-8fb6a.appspot.com/o/WhatsApp%20Image%202025-04-18%20at%2022.41.55.jpeg?alt=media&token=32d35e7a-d8d1-487c-b8cd-0b838fa0977e",
    name: "Hitesh Mali",
    role: "IT Professional, Pune",
  },
];

const STEPS = [
  {
    title: "List a Property",
    description:
      "Snap photos, add details, set a fair price band. Verification starts instantly.",
  },
  {
    title: "Schedule Visits",
    description:
      "Coordinate in‑app — no phone number leaks or off‑platform haggling.",
  },
  {
    title: "Close the Deal",
    description:
      "Smart flows ensure both sides confirm before moving to payout.",
  },
  {
    title: "Earn Passively",
    description:
      "Payouts are processed after verified closure — transparent & secure.",
  },
];



const App = () => {
  const tiltRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);



  useEffect(() => {
    // Set year
    const yearEl = document.getElementById("y");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Keyboard handler for closing sidebar with Escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);

    // KPI Counter Animation
    const animateCounter = (element, target, duration = 4000) => {
      const start = 0;
      const startTime = performance.now();
      
      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (target - start) * easeOutCubic);
        
        // Format number with comma for thousands
        const formattedNumber = current.toLocaleString();
        element.textContent = formattedNumber + '+';
        
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      }
      
      requestAnimationFrame(updateCounter);
    };

    // Initialize counter animation when KPIs come into view
    const kpiObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const h3 = entry.target.querySelector('h3[data-target]');
          if (h3 && !h3.classList.contains('animated')) {
            const target = parseInt(h3.getAttribute('data-target'));
            animateCounter(h3, target);
            h3.classList.add('animated');
          }
        }
      });
    }, { threshold: 0.5 });

    // Observe all KPI cards
    document.querySelectorAll('.kpi').forEach(kpi => kpiObserver.observe(kpi));



    // Parallax effect
    const items = Array.from(document.querySelectorAll(".parallax"));
    const speeds = items.map((el) =>
      parseFloat(el.getAttribute("data-speed") || "0.04")
    );
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY || 0;
          items.forEach((item, i) => {
            item.style.setProperty("--py", `${y * speeds[i]}px`);
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();



    // Simple Tilt effect
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

      el.addEventListener("mousemove", handleMouseMove);
      el.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        el.removeEventListener("mousemove", handleMouseMove);
        el.removeEventListener("mouseleave", handleMouseLeave);
      };
    }

    // Magnetic hover effect on buttons
    if (matchMedia('(hover: hover)').matches) { // avoid on touch devices
      const strength = 14; // px
      const magneticElements = document.querySelectorAll('.magnetic');
      const eventHandlers = [];
      
      magneticElements.forEach(el => {
        const enter = () => el.style.transition = 'transform .15s ease-out';
        const leave = () => { 
          el.style.transition = 'transform .25s ease'; 
          el.style.transform = 'translate3d(0,0,0)'; 
        };
        const move = (e) => {
          const r = el.getBoundingClientRect();
          const x = (e.clientX - (r.left + r.width/2)) / (r.width/2);
          const y = (e.clientY - (r.top + r.height/2)) / (r.height/2);
          el.style.transform = `translate3d(${x*strength}px, ${y*strength}px, 0)`;
        };
        
        el.addEventListener('mouseenter', enter);
        el.addEventListener('mousemove', move);
        el.addEventListener('mouseleave', leave);
        
        // Store handlers for cleanup
        eventHandlers.push({ el, enter, move, leave });
      });

      // Cleanup function for magnetic effect
      return () => {
        eventHandlers.forEach(({ el, enter, move, leave }) => {
          el.removeEventListener('mouseenter', enter);
          el.removeEventListener('mousemove', move);
          el.removeEventListener('mouseleave', leave);
        });
      };
    }



    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener('keydown', handleEscape);
    };
      }, [isMenuOpen]);

  return (
    <>
      <style>{`
        :root {
          --bg-dark: #232C31;
          --bg-dark-2: #1D2429;
          --text: #95A1AC;
          --primary: #4B39EF;
          --primary-2: #695BFF;
          --accent: #D97706;
          --glass: rgba(255,255,255,0.06);
          --border: rgba(255,255,255,0.08);
          --maxw: 1200px;
          --radius-xl: 20px;
          --radius-2xl: 28px;
          --shadow-1: 0 10px 30px rgba(0,0,0,0.25);
          --shadow-2: 0 20px 60px rgba(0,0,0,0.35);
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
          background: linear-gradient(180deg, #0b0f13 0%, #0e1318 100%);
          font-family: "Poppins", system-ui, sans-serif;
          color: var(--text);
          line-height: 1.6;
        }

        h1, h2, h3, h4, strong {
          font-family: "Montserrat", sans-serif;
          color: #fff;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        img {
          max-width: 100%;
          display: block;
        }

        .container {
          width: 100%;
          max-width: var(--maxw);
          margin: 0 auto;
          padding: 0 20px;
        }

        .chip {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border: 1px solid var(--border);
          padding: 8px 12px;
          border-radius: 999px;
          background: var(--glass);
          backdrop-filter: blur(8px);
          font-weight: 600;
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
          border: 1px solid transparent;
          transition: 0.3s ease;
        }

        .btn-primary {
          background: linear-gradient(135deg, var(--primary), var(--primary-2));
          color: #fff;
          box-shadow: var(--shadow-1);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-2);
        }

        .btn-ghost {
          background: transparent;
          color: #fff;
          border-color: var(--border);
        }

        .btn-ghost:hover {
          background: var(--glass);
        }

        .fade-up {
          opacity: 0;
          transform: translateY(24px);
          animation: fadeUp 0.9s ease forwards;

        }

        .fade-in {
          opacity: 0;
          animation: fadeIn 0.9s ease forwards;
        }

        .delay-1 { animation-delay: 0.12s; }
        .delay-2 { animation-delay: 0.24s; }

        @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { to { opacity: 1; } }
        @keyframes floaty { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes spinSlow { to { transform: rotate(360deg); } }

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

        .nav-links {
          display: flex;
          gap: 18px;
          align-items: center;
        }

        .nav a {
          color: #d7dde5;
          opacity: 0.92;
          transition: color 0.3s ease;
        }

        .nav a:hover {
          color: #f4a261;
          opacity: 1;
        }
        .social-icons:hover {
          color: #f4a261 !important;
          opacity: 1;
        }

        .menu-toggle {
          display: none;
          background: transparent;
          border: none;
          color: white;
          font-size: 24px;
          cursor: pointer;
        }

        /* Hero */
        .hero {
          padding: 90px 0 40px;
          position: relative;
        }

        .hero-fancy {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 36px;
          align-items: center;
        }
          .hero-copy {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: start;
            height: 100%;
          }

        .hero-copy h1 {
          font-size: clamp(34px, 6vw, 64px);
          line-height: 1.04;
          margin: 8px 0 10px;
          letter-spacing: 0.2px;
          
        }

        .shine {
          background: linear-gradient(110deg, #fff 0%, #cfe5ff 35%, #b9a7ff 55%, #fff 75%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shine 6s linear infinite;
        }

        @keyframes shine { to { background-position: 200% center; } }

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

        .kpis {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 24px;
        }

        .kpi {
          background: var(--glass);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 16px;
        }

        .kpi h3 {
          margin: 0;
          color: #fff;
          font-size: 22px;
        }

        .kpi p {
          margin: 4px 0 0;
          font-size: 13px;
          opacity: 0.8;
        }

        .hero-visual {
          position: relative;
          display: grid;
          place-items: center;
        }

        .tilt {
          width: min(460px, 92%);
          height: auto;
          // border-radius: 65px;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.2s ease-out;
          // box-shadow: 0 30px 80px rgba(0,0,0,0.5);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }

        .device {
          min-width: 100%;
          min-height: 100%;
          height: auto;
          width: auto;
          object-fit: cover;
          object-position: top;
          display: block;
          border-radius: 28px;
          max-height: 100%;
        }

        .floating-bubble {
          position: absolute;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 999px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          color: #EAF2FF;
          font-weight: 600;
          backdrop-filter: blur(6px);
          font-size: 13px;
          z-index: 9;
          pointer-events: none;
          white-space: nowrap;
          box-shadow: 0 6px 18px rgba(11,14,16,0.45);
          animation: floaty 6s ease-in-out infinite;
        }

        .floating-bubble.one { left: -18px; top: 10%; }
        .floating-bubble.two { right: -18px; top: 22%; animation-delay: 0.3s; }
        .floating-bubble.three { left: 0; bottom: 8%; animation-delay: 0.6s; }
        .floating-bubble.btxt1 { left: 2%; top: 46%; }
        .floating-bubble.btxt2 { right: 3%; top: 34%; animation-delay: 0.2s; }
        .floating-bubble.btxt3 { right: 3%; top: 57%; transform: translateX(-50%); animation-delay: 0.35s; }

        /* Sections */
        section {
          padding: 64px 0;
        }

        .section-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 60px;
        }

        h2 {
          font-size: clamp(26px, 3.6vw, 40px);
          margin: 0;
          line-height: 1.15;
        }

        .sub {
          opacity: 0.85;
        }

        .grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }

        .card {
          position: relative;
          background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 28px;
          transition: 0.35s ease;
        }

        .card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-2);
        }

        .icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          background: linear-gradient(135deg, var(--primary), var(--primary-2));
          color: #fff;
        }

        .tag {
          position: absolute;
          right: 14px;
          top: 14px;
          font-size: 12px;
          padding: 6px 10px;
          border-radius: 999px;
          background: rgba(217,119,6,0.15);
          color: #f4a261;
          border: 1px solid rgba(217,119,6,0.25);
        }

        .steps {
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
          top: -12px;
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

        td {
          color: #CFD6E1;
        }

        .yes { color: #18c964; font-weight: 700; }
        .no { color: #FF5C5C; font-weight: 700; }
        .maybe { color: #FFB020; font-weight: 700; }

        .testi-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }

        .quote {
          color: #CFD6E1;
          font-style: italic;
          margin: 0 0 16px;
        }

        .person {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .person img {
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

        .qr {
          width: 96px;
          height: 96px;
          border-radius: 12px;
          background: #fff;
          display: grid;
          place-items: center;
        }

        footer {
          padding: 40px 0;
          border-top: 1px solid var(--border);
          color: #AAB3BF;
        }

        .magnetic {
          position: relative;
          will-change: transform;
          transition: transform 0.2s ease-out;
        }

        .magnetic:active {
          transform: scale(0.98) !important;
        }

        /* Responsive */
        @media (max-width: 1000px) {
        .cta-row {
          width: 100%;
          justify-content: center;
          
        }
          .kpis {
            width: 100%;
          }
          .hero-fancy {
            grid-template-columns: 1fr;
            text-align: center;
          }
          
          .hero-visual {
            margin-top: 8px;
          }
          // .floating-bubble.one, .floating-bubble.two,
          // .floating-bubble.btxt1, .floating-bubble.btxt2, .floating-bubble.btxt3 {
          //   display: none;
          // }
          .grid-3 {
            grid-template-columns: repeat(2, 1fr);
          }
          .steps {
            grid-template-columns: repeat(2, 1fr);
          }
          .testi-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
        
          .qr-code {
            display: none !important;
          }
          .grid-col{
            grid-template-columns: 1fr !important;
          }
          
          .menu-toggle {
            display: block;
            z-index: 200;
            position: relative;
          }
          
          .sidebar-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.5);
            z-index: 150;
            backdrop-filter: blur(4px);
            cursor: pointer;
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
            z-index: 200;
          }
          .nav-links.open {
            right: 0;
          }
          .sidebar-close {
            position: absolute;
            top: 10px;
            right: 0px;
            background: transparent;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            padding: 8px;
            border-radius: 8px;
            transition: all 0.3s ease;
          }
          
          .sidebar-close:hover {
            // background: rgba(255, 255, 255, 0.1);
            color: #f4a261;
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
          .hero {
            padding: clamp(50px, 8vw, 100px) 0 clamp(30px, 6vw, 60px);
          }
          section {
            padding: clamp(50px, 8vw, 70px) 0;
          }
          .grid-3 {
            grid-template-columns: 1fr;
          }
          .steps {
            grid-template-columns: 1fr;
          }
          .testi-grid {
            grid-template-columns: 1fr;
          }
          .kpis {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .hero-copy h1 {
            font-size: clamp(28px, 5.5vw, 36px);
          }
          .sub {
            font-size: clamp(14px, 1.6vw, 16px);
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
          .kpis {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="container nav-inner">
          <div className="brand fade-in">
            <img
              src={`${process.env.PUBLIC_URL}/logo.png`}
              alt="UpHomes logo"
              style={{ height: "36px", width: "auto", borderRadius: "8px" }}
            />
          </div>

          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {!isMenuOpen && <FaBarsStaggered />}
          </button>

          {/* Overlay for closing sidebar when clicking outside */}
          {isMenuOpen && (
            <div 
              className="sidebar-overlay"
              onClick={() => {
                console.log('Overlay clicked - closing sidebar');
                setIsMenuOpen(false);
              }}
            />
          )}

          <div
            className={`nav-links ${isMenuOpen ? "open" : ""} fade-in delay-2`}
          >
            {/* Close button inside sidebar */}
            {isMenuOpen && (
            <button
              className="sidebar-close"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <IoMdClose />
            </button>
            )}
            
            <a href="#showcase" onClick={() => {
              console.log('Showcase clicked - closing sidebar');
              setIsMenuOpen(false);
            }}>
              Showcase
            </a>
            <a href="#features" onClick={() => {
              console.log('Features clicked - closing sidebar');
              setIsMenuOpen(false);
            }}>
              Features
            </a>
            <a href="#how" onClick={() => {
              console.log('How it works clicked - closing sidebar');
              setIsMenuOpen(false);
            }}>
              How it works
            </a>
            <a href="#compare" onClick={() => {
              console.log('Compare clicked - closing sidebar');
              setIsMenuOpen(false);
            }}>
              Compare
            </a>
            <a
              href="#download"
              className="chip"
              onClick={() => {
                console.log('Download clicked - closing sidebar');
                setIsMenuOpen(false);
              }}
              aria-label="Download the app"
            >
              📲 <span>Get the App</span>
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="hero">
        <div className="container hero-fancy">
          <div className="hero-copy fade-up">
            <h1>
              <span className="shine">Find verified rentals </span>
              <span className="gradient-text">fast, fair & </span>
              <span className="shine">spam-free.</span>
            </h1>
            <p className="sub">
              UpHomes is the community-driven rental platform that unlocks
              hidden supply, verifies listings, and connects you directly with
              owners and flatmates — no noise, no traps.
            </p>
            <div className="cta-row">
              <motion.a
                target="_blank"
                className="btn btn-primary magnetic"
                href="https://apps.apple.com/in/app/uphomes/id6737268880"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaApple  style={{fontSize: "22px"}}/>
                App Store
              </motion.a>
              <motion.a
                className="btn btn-ghost magnetic"
                href="https://play.google.com/store/apps/details?id=com.flutterflow.homeU742786"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGooglePlay style={{fontSize: "22px"}}/>

Play Store
              </motion.a>
            </div>
            <div className="kpis">
              <div className="kpi">
                <h3 data-target="7000">0+</h3>
                <p>Active users</p>
              </div>
              <div className="kpi">
                <h3 data-target="3500">0+</h3>
                <p>Live listings</p>
              </div>
              <div className="kpi">
                <h3 data-target="800">0+</h3>
                <p>Micro-brokers</p>
              </div>
            </div>
          </div>

          <div className="hero-visual fade-up delay-2">
            <div className="tilt" ref={tiltRef} id="tilt">
              <img
                className="device"
                alt="UpHomes app mockup"
                src={`${process.env.PUBLIC_URL}/mock-up.png`}
              />

            </div>

            <span className="floating-bubble one" aria-hidden="true">Verified</span>
            <span className="floating-bubble two" aria-hidden="true">AI Match</span>
            <span className="floating-bubble three" aria-hidden="true">Direct Chat</span>

            <span className="floating-bubble btxt1" aria-hidden="true">Micro-Broker Network</span>
            <span className="floating-bubble btxt2" aria-hidden="true">Smart Filters</span>
            <span className="floating-bubble btxt3" aria-hidden="true">Passive Income</span>
          </div>
        </div>
      </header>

      {/* SHOWCASE */}
      <section id="showcase">
        <div className="container">
          <div className="section-head">
            <h2 className="fade-up">Built by renters, for renters.</h2>
            <div className="chip fade-in delay-2">📸 App Screens</div>
          </div>
          <div className="card fade-up">
            <img
              src={`${process.env.PUBLIC_URL}/5-phone.png`}
              alt="UpHomes app showcase"
              style={{
                padding: "0",
                margin: "0",
                width: "100%",
                objectFit: "cover",
                height: "80vh",
                // marginLeft: "-100px",
                borderRadius: "14px"
              }}
            />
          </div>
        </div>
      </section>

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
                <h3 style={{ color: "#fff", margin: "16px 0 8px" }}>
                  {feature.title}
                </h3>
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
            <h2 className="fade-up">
              Turn local listings into monthly income.
            </h2>
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
                <h4 style={{ color: "#fff", margin: "0 0 8px" }}>
                  {step.title}
                </h4>
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
            <h2 className="fade-up" style={{ maxWidth: "950px" }}>
              Why UpHomes beats paywalls and broker traps.
            </h2>
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
                    feature: "Free Listings for Owners",
                    uphomes: "Yes",
                    magicbricks: "Paid",
                    nobroker: "Limited Free",
                    facebook: "Yes",
                    coliving: "Not Applicable",
                  },
                  {
                    feature: "Flatmate Search",
                    uphomes: "Built‑in",
                    magicbricks: "No",
                    nobroker: "Basic",
                    facebook: "Yes",
                    coliving: "No",
                  },
                  {
                    feature: "Direct Chat / Contact",
                    uphomes: "Free In‑App",
                    magicbricks: "Pay to Unlock",
                    nobroker: "Subscription",
                    facebook: "Unverified",
                    coliving: "No",
                  },
                  {
                    feature: "Verified Listings",
                    uphomes: "AI‑Verified",
                    magicbricks: "Mixed",
                    nobroker: "Limited",
                    facebook: "No",
                    coliving: "Internal Only",
                  },
                  {
                    feature: "Rent Payment & Credit Boost",
                    uphomes: "Built‑in",
                    magicbricks: "No",
                    nobroker: "With Charges",
                    facebook: "No",
                    coliving: "No",
                  },
                  {
                    feature: "Zero Brokerage / Commissions",
                    uphomes: "Yes",
                    magicbricks: "Brokers Dominate",
                    nobroker: "Claims Only",
                    facebook: "Peer‑to‑Peer",
                    coliving: "Lock‑ins Apply",
                  },
                ].map((row, index) => (
                  <tr key={index}>
                    <td style={{ color: "#fff" }}>{row.feature}</td>
                    <td
                      className={
                        row.uphomes === "Yes"
                          ? "yes"
                          : row.uphomes === "No"
                          ? "no"
                          : "maybe"
                      }
                    >
                      {row.uphomes}
                    </td>
                    <td
                      className={
                        row.magicbricks === "Yes"
                          ? "yes"
                          : row.magicbricks === "No"
                          ? "no"
                          : "maybe"
                      }
                    >
                      {row.magicbricks}
                    </td>
                    <td
                      className={
                        row.nobroker === "Yes"
                          ? "yes"
                          : row.nobroker === "No"
                          ? "no"
                          : "maybe"
                      }
                    >
                      {row.nobroker}
                    </td>
                    <td
                      className={
                        row.facebook === "Yes"
                          ? "yes"
                          : row.facebook === "No"
                          ? "no"
                          : "maybe"
                      }
                    >
                      {row.facebook}
                    </td>
                    <td
                      className={
                        row.coliving === "Yes"
                          ? "yes"
                          : row.coliving === "No"
                          ? "no"
                          : "maybe"
                      }
                    >
                      {row.coliving}
                    </td>
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
                <blockquote className="quote">
                  ❝ {testimonial.quote} ❞
                </blockquote>
                <div className="person">
                  <img src={testimonial.image} alt={testimonial.name} />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <strong style={{ color: "gray" }}>
                      {testimonial.name}
                    </strong>
                    <small
                      style={{ color: "lightgray", letterSpacing: "0.5px" }}
                    >
                      {testimonial.role}
                    </small>
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
          <motion.div
            className="cta"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 0.8fr",
                gap: "20px",
                alignItems: "center",
              }}
              className="grid-col"
            >
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  Get the UpHomes app
                </motion.h2>
                <motion.p
                  className="sub"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Find verified rentals, match faster with AI, and close deals
                  without brokerage. Available on iOS and Android.
                </motion.p>
                {/* <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    marginTop: "16px",
                    width: "100%",
                  }}
                >
                  <motion.a
                    className="btn btn-primary magnetic"
                    href="https://apps.apple.com/in/app/uphomes/id6737268880"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaApple  style={{fontSize: "22px"}}/>
                    App Store
                  </motion.a>
                  <motion.a
                    className="btn btn-ghost magnetic"
                    href="https://play.google.com/store/apps/details?id=com.flutterflow.homeU742786"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaGooglePlay style={{fontSize: "22px"}}/>

                    Play Store
                  </motion.a>
                </div> */}
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                  zIndex: "3",
                }}
                className="qr-code"
              >
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/uphome12-8fb6a.appspot.com/o/IMG_6015.PNG?alt=media&token=d0b923cd-9efb-4baa-bcb2-0d84a4b30d66"
                  alt="QR Code"
                  style={{
                    height: "180px",
                    width: "auto",
                    borderRadius: "8px",
                    opacity: "1",
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* FOOTER */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img
              src={`${process.env.PUBLIC_URL}/logo.png`}
              alt="UpHomes logo"
              style={{ height: "36px", width: "auto", borderRadius: "8px" }}
            />
          </div>
          <div>
            <small>
              © <span id="y"></span> UpHomes. All rights reserved.
            </small>
          </div>
          <div style={{ display: "flex", gap: "16px" }}>
            <a
              href="https://www.instagram.com/uphomes.in/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "transparent",
                border: "none",
                padding: "0",
                margin: "0",
              }}
            >
              <FaInstagram style={{ color: "white", fontSize: "18px" }} className="social-icons"/>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61572085060403"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "transparent",
                border: "none",
                padding: "0",
                margin: "0",
              }}
            >
              <FaFacebook style={{ color: "white", fontSize: "18px" }} className="social-icons" />
            </a>
            <a
              href="https://www.linkedin.com/company/uphomes/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "transparent",
                border: "none",
                padding: "0",
                margin: "0",
              }}
            >
              <FaLinkedin style={{ color: "white", fontSize: "18px" }} className="social-icons" />
            </a>
          </div>
        </div>
      </motion.footer>

      {/* SVG defs for gooey filter */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>


    </>
  );
};

export default App;