import React, { useState } from 'react';
import axios from 'axios';
import { ShieldCheck, Lock, User, ArrowRight } from 'lucide-react';

export default function AuthPage({ onLogin }) {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
        try {
            const { data } = await axios.post(`http://localhost:5001${endpoint}`, { username, password });
            if (isLogin) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.username);
                onLogin(data.username);
            } else {
                setIsLogin(true);
                alert('Registration successful! Please login.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-center" style={{ minHeight: '80vh', perspective: '1000px' }}>
            <div className="glass-panel" style={{
                width: '100%',
                maxWidth: '400px',
                padding: 'var(--space-xl)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                animation: 'slideIn 0.5s ease-out'
            }}>
                <div className="flex-center flex-col" style={{ marginBottom: 'var(--space-xl)' }}>
                    <div style={{
                        background: 'var(--accent-cyan)',
                        padding: '12px',
                        borderRadius: '50%',
                        boxShadow: '0 0 20px var(--accent-cyan)',
                        marginBottom: 'var(--space-md)'
                    }}>
                        <ShieldCheck size={32} color="#000" />
                    </div>
                    <h2 style={{ fontSize: '1.5rem', letterSpacing: '2px' }}>{isLogin ? 'SECURE LOGIN' : 'CREATE ACCOUNT'}</h2>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        STOCKS PREDICTOR | NEURAL ACCESS
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex-col" style={{ gap: 'var(--space-md)' }}>
                    <div style={{ position: 'relative' }}>
                        <User size={16} color="var(--text-secondary)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="auth-input"
                            style={{
                                width: '100%',
                                padding: '12px 12px 12px 40px',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid var(--border-subtle)',
                                borderRadius: '10px',
                                color: 'var(--text-primary)',
                                outline: 'none',
                                transition: 'all 0.3s ease'
                            }}
                        />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <Lock size={16} color="var(--text-secondary)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="auth-input"
                            style={{
                                width: '100%',
                                padding: '12px 12px 12px 40px',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid var(--border-subtle)',
                                borderRadius: '10px',
                                color: 'var(--text-primary)',
                                outline: 'none',
                                transition: 'all 0.3s ease'
                            }}
                        />
                    </div>

                    {error && <p style={{ fontSize: '0.8rem', color: 'var(--accent-red)', textAlign: 'center' }}>{error}</p>}

                    <button
                        type="submit"
                        className="btn-primary flex-center"
                        disabled={loading}
                        style={{ padding: '14px', gap: '8px', marginTop: 'var(--space-md)', borderRadius: '10px' }}
                    >
                        {loading ? 'SYNCHRONIZING...' : (isLogin ? 'ACCESS ENGINE' : 'CREATE ACCOUNT')}
                        <ArrowRight size={18} />
                    </button>
                </form>

                <div style={{ marginTop: 'var(--space-lg)', textAlign: 'center' }}>
                    <span
                        onClick={() => setIsLogin(!isLogin)}
                        style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', cursor: 'pointer', opacity: 0.8 }}
                        className="hover-bright"
                    >
                        {isLogin ? "NEW TRADER? INITIALIZE ACCESS" : "EXISTING OPERATOR? LOGIN"}
                    </span>
                </div>
            </div>

            <style>{`
        .auth-input:focus {
            border-color: var(--accent-cyan) !important;
            background: rgba(0, 240, 255, 0.05) !important;
            box-shadow: 0 0 15px rgba(0, 240, 255, 0.1);
        }
        .hover-bright:hover {
            opacity: 1 !important;
            text-shadow: 0 0 10px var(--accent-cyan);
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
        </div>
    );
}
