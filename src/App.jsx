import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AuthPage from './pages/AuthPage';
import LoadingAnimation from './components/LoadingAnimation';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [topConfidence, setTopConfidence] = useState(76);
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    if (savedUser && token) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  const handleLogin = (username) => {
    setShowLoadingAnimation(true);
    // After animation completes, set user
    setTimeout(() => {
      setUser(username);
      setShowLoadingAnimation(false);
    }, 2800); // Animation duration + buffer
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser(null);
  };

  if (loading) return null;

  return (
    <div style={{
      maxWidth: '1600px',
      margin: '0 auto',
      padding: '0 var(--space-lg) var(--space-lg) var(--space-lg)',
      overflowX: 'hidden'
    }}>
      <Header
        user={user}
        onLogout={handleLogout}
        theme={theme}
        onToggleTheme={toggleTheme}
        confidence={topConfidence}
      />

      <main style={{ marginTop: 'var(--space-lg)', position: 'relative' }}>
        {showLoadingAnimation && (
          <LoadingAnimation onComplete={() => setShowLoadingAnimation(false)} />
        )}

        <AnimatePresence mode="wait">
          {!user ? (
            <motion.div
              key="auth"
              initial={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                y: -100,
                transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }
              }}
            >
              <AuthPage onLogin={handleLogin} />
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 50 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.2, duration: 0.8, ease: "easeOut" }
              }}
            >
              <Dashboard onUpdateConfidence={setTopConfidence} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer style={{
        marginTop: 'var(--space-xxl)',
        paddingTop: 'var(--space-lg)',
        borderTop: '1px solid var(--border-subtle)',
        textAlign: 'center',
        color: 'var(--text-secondary)',
        fontSize: '0.8rem'
      }}>
        <p>© 2024 Stocks Predictor | Neural Analysis Studio. Educational Demo Only.</p>
        <p>This system uses synthetic and real-time market data for demonstration purposes.</p>
      </footer>
    </div>
  );
}

export default App;
