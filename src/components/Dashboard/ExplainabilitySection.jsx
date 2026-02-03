import React from 'react';
import { Info, ShieldAlert } from 'lucide-react';

export default function ExplainabilitySection({ factors = [], disagreement = 0 }) {
    const defaultFactors = [
        { name: 'Neural Momentum', weight: 0.42, type: 'Positive' },
        { name: 'Macro Volatility', weight: 0.28, type: 'Negative' },
        { name: 'LSTM Consensus', weight: 0.18, type: 'Positive' },
        { name: 'Sector Correlation', weight: 0.12, type: 'Neutral' }
    ];

    const displayFactors = factors.length > 0 ? factors : defaultFactors;

    return (
        <div className="glass-panel card-full-height" style={{ padding: 'var(--space-lg)', position: 'relative' }}>
            <div className="flex-between" style={{ marginBottom: 'var(--space-lg)' }}>
                <div>
                    <h3 style={{ color: '#fff' }}>Neural Feature Importance (XAI)</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>SHAP-based Factor Contribution</p>
                </div>
                <div style={{ padding: '8px', background: 'rgba(191, 0, 255, 0.1)', borderRadius: '50%' }}>
                    <Info size={18} color="var(--accent-purple)" />
                </div>
            </div>

            <div className="flex-col" style={{ gap: 'var(--space-md)' }}>
                {displayFactors.map((f, i) => (
                    <div key={i}>
                        <div className="flex-between" style={{ fontSize: '0.85rem', marginBottom: '8px' }}>
                            <span style={{ color: 'var(--text-primary)' }}>{f.name}</span>
                            <span style={{
                                fontWeight: 'bold',
                                color: f.type === 'Positive' ? 'var(--accent-green)' : (f.type === 'Negative' ? 'var(--accent-red)' : 'var(--text-secondary)')
                            }}>
                                {(f.weight * 100).toFixed(1)}% {f.type === 'Positive' ? '↑' : (f.type === 'Negative' ? '↓' : '→')}
                            </span>
                        </div>
                        <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{
                                width: `${Math.min(100, f.weight * 100)}%`,
                                height: '100%',
                                background: f.type === 'Positive' ? 'var(--accent-green)' : (f.type === 'Negative' ? 'var(--accent-red)' : 'var(--text-secondary)'),
                                boxShadow: `0 0 10px ${f.type === 'Positive' ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 0, 0, 0.1)'}`
                            }} />
                        </div>
                    </div>
                ))}
            </div>

            {disagreement > 0 && (
                <div style={{
                    marginTop: 'var(--space-xl)',
                    padding: '12px',
                    background: disagreement > 5 ? 'rgba(214, 48, 49, 0.1)' : 'rgba(108, 92, 231, 0.1)',
                    borderRadius: '8px',
                    border: `1px solid ${disagreement > 5 ? 'var(--accent-red)' : 'var(--accent-purple)'}`,
                    display: 'flex',
                    alignItems: 'start',
                    gap: '12px'
                }}>
                    <ShieldAlert size={20} color={disagreement > 5 ? 'var(--accent-red)' : 'var(--accent-purple)'} />
                    <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#fff' }}>
                            Neural Consensus Variance: {disagreement}%
                        </div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>
                            {disagreement > 5
                                ? "Critical disagreement detected between LSTM and Transformer models. Strategic confidence reduced."
                                : "Minor predictive variance detected between internal neural layers. Within operational bounds."}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
