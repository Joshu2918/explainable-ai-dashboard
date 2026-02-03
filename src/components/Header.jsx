import React from 'react';
import { User, ShieldCheck, Sun, Moon, Cpu, Globe } from 'lucide-react';

export default function Header({ user, onLogout, theme, onToggleTheme, confidence = 76 }) {
    return (
        <header className="glass-panel" style={{
            margin: '0 0 var(--space-lg) 0',
            padding: 'var(--space-md) var(--space-lg)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            borderRadius: '0 0 16px 16px',
            borderTop: 'none',
            background: 'rgba(10, 14, 23, 0.8)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)'
        }}>
            <div className="flex-center" style={{ gap: 'var(--space-md)' }}>
                <div style={{
                    background: 'linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-purple) 100%)',
                    padding: '10px',
                    borderRadius: '12px',
                    boxShadow: '0 0 20px rgba(0, 240, 255, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <ShieldCheck size={28} color="#000" strokeWidth={2.5} />
                </div>
                <div>
                    <h1 style={{
                        fontSize: '1.4rem',
                        lineHeight: '1.1',
                        fontWeight: '900',
                        letterSpacing: '-0.5px',
                        background: 'linear-gradient(to right, #fff, var(--text-secondary))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>NEURAL CORE V4</h1>
                    <div className="flex-center" style={{ gap: '6px', justifyContent: 'start', marginTop: '4px' }}>
                        <Globe size={12} color="var(--accent-cyan)" />
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', letterSpacing: '1px', fontWeight: 'bold' }}>
                            INSTITUTIONAL NODE #0412
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex-center" style={{ gap: 'var(--space-xl)' }}>
                {/* Status Indicator */}
                <div className="flex-center hide-mobile" style={{
                    gap: '12px',
                    padding: '8px 16px',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '10px',
                    border: '1px solid var(--border-subtle)'
                }}>
                    <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', display: 'block', textTransform: 'uppercase' }}>System Health</span>
                        <div className="flex-center" style={{ gap: '6px' }}>
                            <div className="live-pulse" style={{ width: '6px', height: '6px', background: 'var(--accent-green)', borderRadius: '50%' }} />
                            <span style={{ fontSize: '0.8rem', color: 'var(--accent-green)', fontWeight: 'bold' }}>OPTIMAL</span>
                        </div>
                    </div>
                    <div style={{ width: '1px', height: '24px', background: 'var(--border-subtle)' }} />
                    <div style={{ textAlign: 'center' }}>
                        <span style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', display: 'block', textTransform: 'uppercase' }}>Neural Confidence</span>
                        <span className="glow-text" style={{ fontSize: '1rem', color: confidence > 70 ? 'var(--accent-green)' : 'var(--accent-orange)', fontWeight: '900' }}>
                            {confidence}%
                        </span>
                    </div>
                </div>

                <div className="flex-center" style={{ gap: 'var(--space-md)' }}>
                    <button
                        onClick={onToggleTheme}
                        className="btn-outline flex-center"
                        style={{
                            width: '42px',
                            height: '42px',
                            padding: 0,
                            borderRadius: '12px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid var(--border-subtle)',
                            color: 'var(--accent-cyan)',
                            transition: 'all 0.3s'
                        }}
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    {user ? (
                        <div className="flex-center" style={{ gap: 'var(--space-lg)' }}>
                            <div className="flex-center" style={{
                                gap: '10px',
                                padding: '6px 12px',
                                background: 'rgba(0, 240, 255, 0.05)',
                                borderRadius: '10px',
                                border: '1px solid rgba(0, 240, 255, 0.2)'
                            }}>
                                <div style={{ background: 'var(--accent-cyan)', borderRadius: '50%', padding: '6px' }}>
                                    <User size={16} color="#000" />
                                </div>
                                <div className="flex-col" style={{ alignItems: 'start' }}>
                                    <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#fff' }}>{user}</span>
                                    <span style={{ fontSize: '0.6rem', color: 'var(--accent-cyan)' }}>Alpha Operator</span>
                                </div>
                            </div>
                            <button className="btn-outline" onClick={onLogout} style={{
                                padding: '8px 16px',
                                fontSize: '0.75rem',
                                borderRadius: '8px',
                                fontWeight: 'bold',
                                color: 'var(--accent-red)',
                                borderColor: 'var(--accent-red)'
                            }}>LOGOUT</button>
                        </div>
                    ) : (
                        <div className="flex-center" style={{ gap: 'var(--space-md)' }}>
                            <Cpu size={18} className="animate-spin" color="var(--accent-cyan)" />
                            <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 'bold' }}>GATEWAY SECURE</span>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
