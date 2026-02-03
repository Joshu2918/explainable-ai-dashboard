import React from 'react';
import { Ghost, Zap } from 'lucide-react';

export default function SentimentTicker({ headlines = [] }) {
    const items = headlines.length > 0 ? headlines : [
        { text: "FEDERAL RESERVE MAINTAINS INTEREST RATES AT 5.25-5.50% RANGE", sentiment: 'Neutral' },
        { text: "TECH SECTOR ALPHA SURGES BY 1.2% IN AFTER-HOURS TRADING", sentiment: 'Positive' },
        { text: "GLOBAL SUPPLY CHAIN INDEX SHOWS REMARKABLE RESILIENCE", sentiment: 'Positive' },
        { text: "CRUDE OIL VOLATILITY IMPACTS ENERGY REGIME STABILITY", sentiment: 'Negative' }
    ];

    return (
        <div style={{
            width: '100%',
            background: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '2px 0',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            fontSize: '0.65rem',
            letterSpacing: '1px',
            color: 'var(--text-primary)',
            fontWeight: 'bold',
            zIndex: 100,
            height: '32px'
        }}>
            <div style={{
                padding: '0 12px',
                borderRight: '2px solid var(--accent-cyan)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'var(--bg-secondary)',
                height: '100%',
                zIndex: 10
            }}>
                <div className="live-pulse" style={{
                    width: '8px',
                    height: '8px',
                    background: 'var(--accent-red)',
                    borderRadius: '50%',
                    boxShadow: '0 0 10px var(--accent-red)'
                }} />
                <span style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', fontWeight: '900' }}>LIVE</span>
            </div>

            <div className="ticker-scroll" style={{
                display: 'inline-flex',
                animation: 'tickerStream 80s linear infinite',
                paddingLeft: '50px'
            }}>
                {items.concat(items).concat(items).map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', margin: '0 40px' }}>
                        <Zap size={10} color="var(--accent-cyan)" style={{ marginRight: '8px' }} />
                        <span style={{ color: 'var(--text-secondary)', marginRight: '8px', opacity: 0.6 }}>[{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}]</span>
                        <span style={{
                            color: item.sentiment === 'Positive' ? 'var(--accent-green)' : (item.sentiment === 'Negative' ? 'var(--accent-red)' : 'var(--text-primary)')
                        }}>
                            {item.text.toUpperCase()}
                        </span>
                        <Ghost size={10} style={{ marginLeft: '12px', opacity: 0.1 }} />
                    </div>
                ))}
            </div>

            <style>{`
                @keyframes tickerStream {
                    0% { transform: translate3d(0, 0, 0); }
                    100% { transform: translate3d(-50%, 0, 0); }
                }
                .live-pulse {
                    animation: pulseStatus 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                @keyframes pulseStatus {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: .4; transform: scale(1.1); }
                }
            `}</style>
        </div>
    );
}
