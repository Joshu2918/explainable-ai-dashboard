import React from 'react';
import { ThumbsUp, ThumbsDown, Info } from 'lucide-react';

export default function StockProsCons({ pros = [], cons = [], loading = false }) {
    return (
        <div className="glass-panel" style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: 'var(--space-lg)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div className="flex-between" style={{ marginBottom: 'var(--space-lg)' }}>
                <h3 style={{ color: '#fff', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Info size={18} color="var(--accent-cyan)" />
                    Strategic Analysis
                </h3>
            </div>

            {loading ? (
                <div className="flex-center flex-grow-1">
                    <div className="animate-pulse" style={{ color: 'var(--accent-cyan)' }}>_CALCULATING_PROS_CONS_</div>
                </div>
            ) : (
                <div className="flex-col flex-grow-1" style={{ gap: 'var(--space-lg)' }}>
                    {/* Pros Section */}
                    <div className="flex-col" style={{ gap: 'var(--space-md)' }}>
                        <div className="flex-center" style={{ justifyContent: 'start', gap: '8px', color: 'var(--accent-green)', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
                            <ThumbsUp size={14} />
                            Neural Strengths
                        </div>
                        <div className="flex-col" style={{ gap: '8px' }}>
                            {pros.map((pro, i) => (
                                <div key={i} style={{
                                    padding: '10px',
                                    background: 'rgba(76, 175, 80, 0.05)',
                                    borderLeft: '2px solid var(--accent-green)',
                                    fontSize: '0.8rem',
                                    color: 'rgba(255,255,255,0.9)'
                                }}>
                                    {pro}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Cons Section */}
                    <div className="flex-col" style={{ gap: 'var(--space-md)' }}>
                        <div className="flex-center" style={{ justifyContent: 'start', gap: '8px', color: 'var(--accent-red)', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
                            <ThumbsDown size={14} />
                            Risk Factors
                        </div>
                        <div className="flex-col" style={{ gap: '8px' }}>
                            {cons.map((con, i) => (
                                <div key={i} style={{
                                    padding: '10px',
                                    background: 'rgba(255, 77, 77, 0.05)',
                                    borderLeft: '2px solid var(--accent-red)',
                                    fontSize: '0.8rem',
                                    color: 'rgba(255,255,255,0.9)'
                                }}>
                                    {con}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
