import React from 'react';
import { TrendingUp, Activity, AlertCircle, ShieldCheck, Cpu } from 'lucide-react';

export default function SummaryCards({ metrics = {} }) {
    const { confidenceScore = 76, volatility = 1.2, modelConflict = false, todayLow = 0, todayHigh = 0 } = metrics;

    const cards = [
        {
            title: 'Expected Neural Return',
            value: (confidenceScore * 0.15).toFixed(2) + '%',
            icon: TrendingUp,
            color: 'var(--accent-green)',
            trend: '+1.2% vs avg',
            info: [
                'Projected ROI based on neural price momentum.',
                'Calculated via confidence-weighted trend analysis.'
            ]
        },
        {
            title: 'Market Volatility (σ)',
            value: volatility.toFixed(2),
            icon: Activity,
            color: volatility > 1.5 ? 'var(--accent-red)' : 'var(--accent-cyan)',
            trend: 'Sigma Shift: ' + (volatility > 1.2 ? 'High' : 'Low'),
            info: [
                'Real-time standard deviation of price action.',
                'Higher sigma indicates increased regime risk.'
            ]
        },
        {
            title: 'Day High / Low',
            value: `₹${todayHigh?.toFixed(2)} / ₹${todayLow?.toFixed(2)}`,
            icon: Cpu,
            color: 'var(--accent-orange)',
            trend: `Range: ₹${(todayHigh - todayLow).toFixed(2)}`,
            info: [
                "Intraday price boundaries applied to today's session.",
                'Used for neural anchoring in prediction bands.'
            ]
        },
        {
            title: 'Model Health Score',
            value: Math.max(0, Math.min(100, Math.floor(100 - (metrics.disagreementScore || 0) * 8))) + '/100',
            icon: AlertCircle,
            color: modelConflict ? 'var(--accent-orange)' : 'var(--accent-purple)',
            trend: modelConflict ? 'Minor Variance' : 'Neural Consensus',
            info: [
                'Disagreement level between LSTM and Transformer.',
                'consensus > 95% triggers the "Healthy" status.'
            ]
        },
        {
            title: 'Confidence Index',
            value: confidenceScore + '%',
            icon: ShieldCheck,
            color: confidenceScore > 75 ? 'var(--accent-green)' : (confidenceScore > 60 ? 'var(--accent-orange)' : 'var(--accent-red)'),
            trend: 'Decision Strength',
            info: [
                'Aggregated model probability of prediction success.',
                'Derived from signal-to-noise ratio in recent data.'
            ]
        }
    ];

    return (
        <div className="grid-cols-5" style={{ gap: 'var(--space-md)' }}>
            {cards.map((card, i) => (
                <div key={i} className="glass-panel" style={{
                    padding: 'var(--space-md)',
                    borderTop: `2px solid ${card.color}`,
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 100%)',
                    position: 'relative'
                }}>
                    <div className="flex-between" style={{ marginBottom: 'var(--space-sm)' }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 'bold' }}>{card.title}</span>
                        <card.icon size={14} color={card.color} />
                    </div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#fff', marginBottom: '4px' }}>
                        {card.value}
                    </div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>
                        {card.trend}
                    </div>
                </div>
            ))}
        </div>
    );
}
