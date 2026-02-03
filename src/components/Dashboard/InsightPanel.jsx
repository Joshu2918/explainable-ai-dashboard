import React from 'react';
import { ArrowRight, Zap, AlertCircle, TrendingUp, TrendingDown, ShieldCheck, Newspaper } from 'lucide-react';

export default function InsightPanel({ metrics = {} }) {
    const { confidenceScore = 76, volatility = 1.2, modelConflict = false, headlines = [] } = metrics;

    // Professional Decision Logic
    let recommendation = 'HOLD CASH';
    let rationale = 'System detecting structural uncertainty. Preserving capital is priority.';
    let color = 'var(--text-secondary)';
    let bgColor = 'rgba(255, 255, 255, 0.05)';
    let borderColor = 'var(--border-subtle)';

    if (modelConflict) {
        recommendation = 'HOLD CASH';
        rationale = 'Neural disagreement exceeds safety threshold. Awaiting signal convergence.';
        color = 'var(--accent-purple)';
        bgColor = 'rgba(191, 0, 255, 0.1)';
        borderColor = 'var(--accent-purple)';
    } else if (confidenceScore > 70 && volatility < 1.5) {
        recommendation = 'BUY';
        rationale = 'High model conviction paired with low systemic risk. Optimal entry window.';
        color = 'var(--accent-green)';
        bgColor = 'rgba(0, 255, 0, 0.1)';
        borderColor = 'var(--accent-green)';
    } else if (confidenceScore > 70 && volatility >= 1.5) {
        recommendation = 'WAIT';
        rationale = 'Strong neural signal detected, but market volatility suggests high entry risk.';
        color = 'var(--accent-orange)';
        bgColor = 'rgba(255, 159, 67, 0.1)';
        borderColor = 'var(--accent-orange)';
    } else if (confidenceScore <= 60) {
        recommendation = 'SELL';
        rationale = 'Weakening model confidence and increasing regime shift probability. Reduce exposure.';
        color = 'var(--accent-red)';
        bgColor = 'rgba(214, 48, 49, 0.1)';
        borderColor = 'var(--accent-red)';
    }

    return (
        <div className="flex-col card-full-height" style={{ gap: 'var(--space-md)' }}>
            {/* Strategic Recommendation */}
            <div className="glass-panel" style={{ padding: 'var(--space-md)', flex: 1, border: `1px solid ${borderColor}`, background: `linear-gradient(135deg, ${bgColor} 0%, rgba(10, 14, 23, 0) 100%)` }}>
                <div className="flex-between" style={{ marginBottom: 'var(--space-md)' }}>
                    <h3 style={{ fontSize: '0.9rem', color: '#fff' }}>Strategic Recommendation</h3>
                    <ShieldCheck size={18} color={color} />
                </div>

                <div className="flex-center flex-col" style={{
                    padding: 'var(--space-lg) var(--space-md)',
                    background: bgColor,
                    borderRadius: '8px',
                    border: `1px solid ${borderColor}`,
                    marginBottom: 'var(--space-md)',
                    textAlign: 'center'
                }}>
                    <h2 style={{ fontSize: '2.4rem', color: color, letterSpacing: '4px', fontWeight: '900' }}>{recommendation}</h2>
                    <span style={{ fontSize: '0.75rem', color: color, textTransform: 'uppercase', letterSpacing: '1px' }}>Decision Engine v3.0</span>
                </div>

                <div style={{ marginBottom: 'var(--space-md)' }}>
                    <div className="flex-between" style={{ fontSize: '0.85rem', marginBottom: '4px' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Conviction</span>
                        <span style={{ color: color, fontWeight: 'bold' }}>{confidenceScore}%</span>
                    </div>
                    <div className="flex-between" style={{ fontSize: '0.85rem' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Systemic Risk</span>
                        <span style={{ color: volatility > 2 ? 'var(--accent-red)' : 'var(--text-primary)' }}>{volatility > 2 ? 'EXTREME' : (volatility > 1.5 ? 'HIGH' : 'NORMAL')}</span>
                    </div>
                </div>

                <p style={{ fontSize: '0.85rem', color: '#fff', lineHeight: '1.5', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                    {rationale}
                </p>
            </div>

            {/* News Sentiment Layer */}
            <div className="glass-panel" style={{ padding: 'var(--space-md)' }}>
                <div className="flex-between" style={{ marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '0.9rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Newspaper size={16} color="var(--accent-cyan)" /> News Sentiment Layer
                    </h3>
                </div>
                {headlines.length > 0 ? (
                    <div className="flex-col" style={{ gap: '10px' }}>
                        {headlines.map((h, i) => (
                            <div key={i} style={{ fontSize: '0.75rem', padding: '8px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', borderLeft: `3px solid ${h.sentiment === 'Positive' ? 'var(--accent-green)' : (h.sentiment === 'Negative' ? 'var(--accent-red)' : 'var(--text-secondary)')}` }}>
                                <p style={{ color: '#fff', marginBottom: '4px' }}>{h.text}</p>
                                <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Impact: {h.sentiment}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>No fresh data streams detected.</p>
                )}
            </div>
        </div>
    );
}
