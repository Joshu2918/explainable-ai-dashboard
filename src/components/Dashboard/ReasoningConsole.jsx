import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Cpu } from 'lucide-react';

export default function ReasoningConsole({ thoughts = [], loading = false, regime = 'STABLE' }) {
    const [displayThoughts, setDisplayThoughts] = useState([]);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (loading) {
            setDisplayThoughts([{ text: ">>> BROADCAST INITIALIZED: SYNCING WITH NEURAL ENGINE...", type: 'system' }]);
            return;
        }

        if (thoughts.length > 0) {
            let i = 0;
            const interval = setInterval(() => {
                if (i < thoughts.length) {
                    setDisplayThoughts(prev => [...prev, { text: `> ${thoughts[i]}`, type: 'info' }]);
                    i++;
                } else {
                    clearInterval(interval);
                    setDisplayThoughts(prev => [...prev, { text: ">>> SYSTEM STABLE. CONTINUOUS MONITORING ACTIVE.", type: 'system' }]);
                }
            }, 800);
            return () => clearInterval(interval);
        }
    }, [thoughts, loading]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [displayThoughts]);

    return (
        <div className="glass-panel card-full-height" style={{
            background: 'rgba(5, 10, 20, 0.8)',
            border: '1px solid var(--accent-purple)',
            padding: 'var(--space-md)',
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div className="flex-between" style={{ marginBottom: '10px', borderBottom: '1px solid rgba(191, 0, 255, 0.2)', paddingBottom: '6px' }}>
                <div className="flex-center" style={{ gap: '8px' }}>
                    <Terminal size={14} color="var(--accent-purple)" />
                    <span style={{ fontSize: '0.7rem', color: 'var(--accent-purple)', fontWeight: 'bold', letterSpacing: '1px' }}>NEURAL REASONING CONSOLE</span>
                </div>
                <div className="flex-center" style={{ gap: '6px' }}>
                    <div className="animate-pulse" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-purple)' }} />
                    <span style={{ fontSize: '0.65rem', color: 'var(--accent-cyan)', fontWeight: 'bold' }}>PHASE: {regime}</span>
                    <span style={{ fontSize: '0.6rem', color: 'var(--text-secondary)' }}>_L08</span>
                </div>
            </div>

            <div
                ref={scrollRef}
                style={{
                    flex: 1,
                    overflowY: 'auto',
                    fontSize: '0.7rem',
                    lineHeight: '1.6',
                    padding: '4px',
                }}
                className="custom-scrollbar"
            >
                {displayThoughts.map((t, i) => (
                    <div key={i} style={{
                        color: t.type === 'system' ? 'var(--accent-purple)' : 'var(--text-primary)',
                        opacity: 0.9,
                        marginBottom: '4px',
                        display: 'flex',
                        gap: '6px'
                    }}>
                        <span style={{ color: t.type === 'system' ? 'var(--accent-purple)' : 'var(--accent-cyan)' }}>
                            [{new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })}]
                        </span>
                        <span>{t.text}</span>
                    </div>
                ))}
                {loading && (
                    <div className="animate-pulse" style={{ color: 'var(--accent-cyan)', marginTop: '8px' }}>
                        _PROCESSING_DATA_STREAMS...
                    </div>
                )}
            </div>

            <div style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                padding: 'var(--space-xs)',
                opacity: 0.1
            }}>
                <Cpu size={40} color="var(--accent-purple)" />
            </div>
        </div>
    );
}
