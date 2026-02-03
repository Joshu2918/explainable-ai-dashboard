import React from 'react';
import { Target } from 'lucide-react';

export default function RiskHeatmap({ confidence = 50, volatility = 1.2, symbol = 'AAPL' }) {
    // Normalize values for positioning (0-100)
    // Confidence is already 0-100
    // Volatility assumed to be 0.5 to 5.0 range for mapping (handles high-sigma shifts)
    const xPos = Math.min(100, Math.max(0, ((volatility - 0.5) / 4.5) * 100));
    const yPos = 100 - confidence; // Invert because 0,0 is top-left

    return (
        <div className="glass-panel" style={{ padding: 'var(--space-lg)', height: '100%', position: 'relative' }}>
            <div className="flex-between" style={{ marginBottom: 'var(--space-md)' }}>
                <h3 style={{ color: '#fff' }}>Neural Risk Heatmap</h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Quadrant Analysis</span>
            </div>

            <div style={{
                height: '220px',
                width: '100%',
                background: 'linear-gradient(to top right, #ff4d4d 0%, #ffeb3b 50%, #4caf50 100%)',
                borderRadius: '8px',
                position: 'relative',
                opacity: 0.8,
                border: '1px solid var(--border-subtle)',
                overflow: 'hidden'
            }}>
                {/* Helper Grids */}
                <div style={{ position: 'absolute', top: '50%', width: '100%', borderTop: '1px dashed rgba(255,255,255,0.2)' }} />
                <div style={{ position: 'absolute', left: '50%', height: '100%', borderLeft: '1px dashed rgba(255,255,255,0.2)' }} />

                {/* Labels */}
                <div style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '0.6rem', color: '#000', fontWeight: 'bold' }}>OPTIMAL</div>
                <div style={{ position: 'absolute', bottom: '10px', left: '10px', fontSize: '0.6rem', color: '#fff', fontWeight: 'bold' }}>HIGH RISK</div>

                {/* Current Position Marker */}
                <div style={{
                    position: 'absolute',
                    left: `${xPos}%`,
                    top: `${yPos}%`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 5
                }}>
                    <div className="animate-pulse-glow" style={{
                        padding: '4px 8px',
                        background: 'var(--bg-primary)',
                        border: '2px solid #fff',
                        borderRadius: '4px',
                        color: '#fff',
                        fontSize: '0.7rem',
                        fontWeight: 'bold',
                        boxShadow: '0 0 10px rgba(255,255,255,0.5)',
                        whiteSpace: 'nowrap'
                    }}>
                        {symbol}
                    </div>
                    <div style={{
                        width: '12px',
                        height: '12px',
                        background: '#fff',
                        border: '2px solid var(--bg-primary)',
                        borderRadius: '50%',
                        position: 'absolute',
                        left: '50%',
                        top: '100%',
                        transform: 'translateX(-50%)'
                    }} />
                </div>
            </div>

            {/* Axis Labels */}
            <div className="flex-between" style={{ marginTop: '5px', fontSize: '0.65rem', color: 'var(--text-secondary)' }}>
                <span>Low Vol</span>
                <span>High Vol</span>
            </div>
            <div style={{
                position: 'absolute',
                left: '5px',
                top: '50%',
                transform: 'rotate(-90deg) translateY(-50%)',
                fontSize: '0.65rem',
                color: 'var(--text-secondary)',
                transformOrigin: 'left center'
            }}>
                Confidence
            </div>

            <div style={{
                marginTop: 'var(--space-md)',
                padding: '10px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '8px',
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
            }}>
                <Target size={14} color="var(--accent-cyan)" />
                <p>Currently in <span style={{ color: '#fff', fontWeight: 'bold' }}>
                    {confidence > 70 && volatility < 1.5 ? 'Efficiency' : (confidence < 40 ? 'Danger' : 'Observation')} Zone
                </span></p>
            </div>
        </div>
    );
}
