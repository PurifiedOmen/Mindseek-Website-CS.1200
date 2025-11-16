import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

// --- Main App Components ---
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Section from './components/Section';
import Footer from './components/Footer';
import MindSeekChatbot from './components/MindSeekChatbot';
import './index.css';

// --- Login/Auth Components ---
// (Make sure your files are at these paths)
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';
import WrongPassword from './components/WrongPassword.jsx';
import ResetPassword from './components/ResetPassword.jsx';

function App() {
  const [activeId, setActiveId] = useState('home');
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll-based section highlighting
  useEffect(() => {
    if (location.pathname !== '/') {
      return;
    }
    const ids = ['home', 'features', 'about', 'contact'];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
          try { window.history.replaceState(null, '', `#${entry.target.id}`); } catch {}
        }
      });
    }, { root: null, rootMargin: '0px 0px -40% 0px', threshold: [0,0.25,0.5,0.75,1] });

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  // Update activeId for route links
  useEffect(() => {
    const path = location.pathname.replace('/', '');
    if (path === 'signup' || path === 'ai-demo' || path === 'login') {
      setActiveId(path);
    } else if (location.pathname === '/') {
      setActiveId('home');
    } else {
      setActiveId('');
    }
  }, [location]);

  // Scroll/Navigate Function
  function scrollToId(idOrEvent, id) {
    let event = null;
    let targetId = id;

    if (typeof idOrEvent === 'string') {
      targetId = idOrEvent;
    } else {
      event = idOrEvent;
      if(event) event.preventDefault();
    }
    
    const pageRoutes = ['signup', 'ai-demo', 'login'];

    if (pageRoutes.includes(targetId)) {
      setActiveId(targetId);
      navigate(`/${targetId}`);
      return;
    }

    const el = document.getElementById(targetId);
    
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(targetId);
    } else {
      navigate('/');
      setActiveId(targetId);
      setTimeout(() => {
        const el2 = document.getElementById(targetId);
        if (el2) el2.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    }
  }

  // Compatibility Function for Login/Auth
  const setPage = (pageName) => {
    const path = `/${pageName}`;
    navigate(path);
    setActiveId(pageName);
  };

  // --- Render Logic ---
  return (
    <div className="msai-app">
      <Navbar activeId={activeId} onNavClick={scrollToId} />

      <div className="main-content min-h-screen">
        <Routes>
          {/* --- Home Page (all sections) --- */}
          <Route path="/" element={
            <main>
              <Hero
                id="home" // <-- ID is added here
                onPrimaryClick={(e) => scrollToId(e, 'contact')}
                onSecondaryClick={(e) => scrollToId(e, 'features')}
              />
              <Section id="features" title="Features">
                <p>Feature content goes here...</p>
              </Section>
              <Section id="about" title="About">
                <p>About content goes here...</p>
              </Section>
              <Section id="contact" title="Contact & Sign up">
                <p>Contact form goes here...</p>
              </Section>
            </main>
          } />

          {/* --- Other Pages --- */}
          <Route path="/ai-demo" element={<MindSeekChatbot />} />
          
          {/* --- Auth Pages --- */}
          <Route path="/login" element={
            <div className="bg-gray-50 py-12">
              <Login setPage={setPage} setMessage={setMessage} />
            </div>
          } />
          
          <Route path="/signup" element={
            <div className="bg-gray-50 py-12">
              <SignUp setPage={setPage} setMessage={setMessage} />
            </div>
          } />
          
          <Route path="/wrong-password" element={
            <div className="bg-gray-50 py-12">
              <WrongPassword setPage={setPage} />
            </div>
          } />
          
          <Route path="/reset-password" element={
            <div className="bg-gray-50 py-12">
              <ResetPassword setPage={setPage} />
            </div>
          } />
        </Routes>
      </div>

      <Footer />

      {/* --- Global Message/Notification Display --- */}
      {message && 
        <div 
          className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 cursor-pointer"
          onClick={() => setMessage(null)}
        >
          {message}
        </div>
      }
    </div>
  );
}

export default App;
