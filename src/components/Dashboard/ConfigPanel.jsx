import React, { useState } from 'react';
import { Activity, Search, Play, IndianRupee, Zap } from 'lucide-react';

import { REAL_SYMBOLS } from '../../constants/symbols';

export default function ConfigPanel({ onRunAnalysis }) {
    const [ticker, setTicker] = useState('AAPL');
    const [horizon, setHorizon] = useState(30);
    const [basePrice, setBasePrice] = useState(240);
    const [volatilityShift, setVolatilityShift] = useState(0);
    const [todayLow, setTodayLow] = useState(235);
    const [todayHigh, setTodayHigh] = useState(245);

    const handleTickerChange = (newTicker) => {
        setTicker(newTicker);
        const selected = REAL_SYMBOLS.find(s => s.symbol === newTicker);
        if (selected) {
            setBasePrice(selected.base || 100);
            setTodayLow((selected.base || 100) * 0.98);
            setTodayHigh((selected.base || 100) * 1.02);
        }
    };

    const [isSyncing, setIsSyncing] = useState(false);

    const handleRun = () => {
        setIsSyncing(true);
        setTimeout(() => {
            onRunAnalysis({ ticker, horizon, basePrice, volatilityShift, todayLow, todayHigh });
            setIsSyncing(false);
        }, 800);
    };

    return (
        <div className="flex-col" style={{ gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
            <div className="glass-panel" style={{ padding: 'var(--space-md)' }}>
                <div className="flex-between" style={{ flexWrap: 'wrap', gap: 'var(--space-md)' }}>
                    <div className="flex-center" style={{ gap: 'var(--space-lg)', flexWrap: 'wrap' }}>

                        <div className="flex-center" style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            border: '1px solid var(--border-subtle)'
                        }}>
                            <Search size={16} color="var(--text-secondary)" style={{ marginRight: '8px' }} />
                            <select
                                value={ticker}
                                onChange={(e) => handleTickerChange(e.target.value)}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'var(--text-primary)',
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                {REAL_SYMBOLS.map((s) => (
                                    <option key={s.symbol} value={s.symbol} style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                                        {s.symbol} - {s.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex-center" style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            border: '1px solid var(--border-subtle)'
                        }}>
                            <IndianRupee size={16} color="var(--accent-green)" style={{ marginRight: '8px' }} />
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginRight: '8px' }}>Base:</span>
                            <input
                                type="number"
                                value={basePrice}
                                onChange={(e) => setBasePrice(parseFloat(e.target.value))}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'var(--accent-green)',
                                    fontWeight: 'bold',
                                    width: '80px',
                                    fontSize: '1rem',
                                    outline: 'none'
                                }}
                            />
                        </div>

                        <div className="flex-center" style={{ gap: '15px' }}>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Horizon:</span>
                            <span style={{ color: 'var(--accent-cyan)', fontWeight: 'bold', minWidth: '60px' }}>{horizon} Days</span>
                            <input
                                type="range"
                                min="7"
                                max="90"
                                value={horizon}
                                onChange={(e) => setHorizon(parseInt(e.target.value))}
                                style={{
                                    accentColor: 'var(--accent-cyan)',
                                    cursor: 'pointer',
                                    width: '100px'
                                }}
                            />
                        </div>
                    </div>

                    <div className="flex-center" style={{ gap: 'var(--space-md)' }}>
                        <div className="flex-center" style={{ gap: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                            <Activity size={14} className={isSyncing ? "animate-spin" : "animate-pulse-glow"} color="var(--accent-purple)" />
                            <span style={{ whiteSpace: 'nowrap' }}>{isSyncing ? 'Synchronizing Neural Gate...' : 'Neural Sync Enabled'}</span>
                        </div>

                        <button
                            onClick={handleRun}
                            disabled={isSyncing}
                            className={`btn-primary flex-center ${isSyncing ? 'pulse-button' : ''}`}
                            style={{
                                gap: '8px',
                                padding: '10px 24px',
                                boxShadow: '0 0 15px rgba(0, 240, 255, 0.3)',
                                opacity: isSyncing ? 0.7 : 1,
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <Play size={16} fill={isSyncing ? "transparent" : "white"} />
                            {isSyncing ? 'INITIALIZING...' : 'RUN ENGINE'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Scenario Simulator Layer */}
            <div className="glass-panel" style={{
                padding: '12px 20px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-xl)',
                flexWrap: 'wrap'
            }}>
                <div className="flex-center" style={{ gap: '10px' }}>
                    <Zap size={14} color="var(--accent-orange)" />
                    <span style={{ fontWeight: 'bold', fontSize: '0.8rem', color: 'var(--accent-orange)' }}>SCENARIO SIMULATOR:</span>
                </div>

                <div className="flex-center" style={{ gap: '12px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Volatility Shift:</span>
                    <input
                        type="range"
                        min="-50"
                        max="100"
                        step="5"
                        value={volatilityShift}
                        onChange={(e) => setVolatilityShift(parseInt(e.target.value))}
                        style={{ accentColor: 'var(--accent-orange)', width: '120px' }}
                    />
                    <span style={{ fontSize: '0.8rem', color: volatilityShift >= 0 ? 'var(--accent-red)' : 'var(--accent-green)', fontWeight: 'bold', minWidth: '40px' }}>
                        {volatilityShift > 0 ? '+' : ''}{volatilityShift}%
                    </span>
                </div>

                <div className="flex-center" style={{ gap: '12px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Today's Low:</span>
                    <input
                        type="number"
                        value={todayLow}
                        onChange={(e) => setTodayLow(parseFloat(e.target.value))}
                        style={{
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid var(--border-subtle)',
                            color: 'var(--accent-red)',
                            fontWeight: 'bold',
                            width: '90px',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '0.9rem',
                            outline: 'none'
                        }}
                    />
                </div>

                <div className="flex-center" style={{ gap: '12px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Today's High:</span>
                    <input
                        type="number"
                        value={todayHigh}
                        onChange={(e) => setTodayHigh(parseFloat(e.target.value))}
                        style={{
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid var(--border-subtle)',
                            color: 'var(--accent-green)',
                            fontWeight: 'bold',
                            width: '90px',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '0.9rem',
                            outline: 'none'
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
