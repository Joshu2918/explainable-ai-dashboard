import React from 'react';
import {
    ComposedChart,
    Line,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    ReferenceLine
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="glass-panel" style={{ padding: 'var(--space-sm)', border: '1px solid var(--border-glow)', background: 'rgba(10, 14, 23, 0.95)' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginBottom: '4px' }}>{label}</p>
                {payload.map((entry, index) => (
                    <div key={index} style={{ color: entry.color, fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '2px' }}>
                        {entry.name}: ₹{entry.value.toLocaleString()}
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

export default function PredictionChart({ data = null }) {
    if (!data) return (
        <div className="glass-panel flex-center" style={{ height: '400px', width: '100%', color: 'var(--text-secondary)' }}>
            <div className="flex-col flex-center" style={{ gap: '10px' }}>
                <div className="animate-spin" style={{ width: '20px', height: '20px', border: '2px solid var(--accent-cyan)', borderTopColor: 'transparent', borderRadius: '50%' }}></div>
                <span>Awaiting Neural Engine Input...</span>
            </div>
        </div>
    );

    const [timeRange, setTimeRange] = React.useState('6M');
    const { history = [], prediction = [], comparison = [], symbol = '', companyName = '' } = data;

    // Filter Logic: User requested specific day counts (Calendar Days logic)
    const getFilteredHistory = () => {
        if (!history.length) return [];
        let days = 150; // Default 6M
        if (timeRange === '1W') days = 7;
        if (timeRange === '1M') days = 30;
        if (timeRange === '3M') days = 90;
        if (timeRange === '6M') days = 150;
        if (timeRange === 'ALL') return history;
        return history.slice(-days);
    };

    const filteredHistory = getFilteredHistory();

    // Merge data for Recharts
    const chartData = [
        ...filteredHistory.map(d => ({ ...d, type: 'Historical', main: d.price })),
        ...prediction.map((d, i) => ({
            ...d,
            type: 'Predicted',
            main: d.price,
            consensus: comparison[i]?.price,
            confidenceLow: d.price * 0.97,
            confidenceHigh: d.price * 1.03
        }))
    ];

    const lastHistoryDay = history.length > 0 ? history[history.length - 1].day : null;

    return (
        <div className="glass-panel" style={{ padding: 'var(--space-lg)', height: '100%', width: '100%' }}>
            <div className="flex-between" style={{ marginBottom: 'var(--space-md)' }}>
                <div>
                    <h3 style={{ color: '#fff' }}>Institutional Neural Forecast: {symbol}{companyName && ` - ${companyName}`}</h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Transformer-LSTM Multi-Model Integration</p>
                </div>
                <div className="flex-center" style={{ gap: '8px' }}>
                    <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '8px' }}>
                        {['1W', '1M', '3M', '6M', 'ALL'].map((range) => (
                            <button
                                key={range}
                                onClick={() => setTimeRange(range)}
                                style={{
                                    background: timeRange === range ? 'var(--accent-cyan)' : 'transparent',
                                    color: timeRange === range ? '#000' : 'var(--text-secondary)',
                                    border: 'none',
                                    borderRadius: '6px',
                                    padding: '4px 10px',
                                    fontSize: '0.7rem',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {range}
                            </button>
                        ))}
                    </div>
                    <div style={{ padding: '4px 12px', background: 'rgba(0, 240, 255, 0.1)', borderRadius: '20px', fontSize: '0.7rem', color: 'var(--accent-cyan)', fontWeight: 'bold', border: '1px solid var(--accent-cyan)' }}>
                        LIVE SIGNAL
                    </div>
                </div>
            </div>

            <div style={{ width: '100%', height: '300px' }}>
                <ResponsiveContainer>
                    {/* ... Chart code ... */}
                    <ComposedChart data={chartData}>
                        {/* ... defs, axes, etc. ... */}
                        <defs>
                            <linearGradient id="bandGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--accent-purple)" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="var(--accent-purple)" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis
                            dataKey="day"
                            stroke="#e0e0e0"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            minTickGap={30}
                            tickFormatter={(val) => {
                                // Dynamic Formatter based on Time Range
                                // Expected val: 'YYYY-MM-DD' or 'Day N'
                                if (val.startsWith('Day')) return val; // Fallback
                                const date = new Date(val);
                                if (isNaN(date.getTime())) return val;

                                if (timeRange === '1W') {
                                    return date.toLocaleDateString('en-US', { weekday: 'short' }); // Mon, Tue
                                }
                                if (timeRange === '1M') {
                                    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }); // 12 Jan
                                }
                                // 3M, 6M, ALL
                                return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }); // Jan 24
                            }}
                        />
                        <YAxis
                            stroke="var(--text-secondary)"
                            fontSize={10}
                            tickLine={false}
                            axisLine={false}
                            domain={['auto', 'auto']}
                            tickFormatter={(val) => `₹${val}`}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend verticalAlign="top" height={36} />

                        {/* Uncertainty Bands */}
                        <Area
                            type="monotone"
                            dataKey="u2"
                            stroke="none"
                            fill="rgba(191, 0, 255, 0.05)"
                            baseValue="l2"
                            legendType="none"
                            connectNulls
                        />
                        <Area
                            type="monotone"
                            dataKey="u1"
                            stroke="none"
                            fill="rgba(191, 0, 255, 0.1)"
                            baseValue="l1"
                            name="Confidence Band (±2σ)"
                            connectNulls
                        />

                        <ReferenceLine x={lastHistoryDay} stroke="var(--accent-purple)" strokeDasharray="5 5" label={{ value: 'FORECAST', position: 'top', fill: 'var(--accent-purple)', fontSize: 10 }} />

                        {/* Historical Line */}
                        <Line
                            type="monotone"
                            dataKey="main"
                            name="Market Price"
                            stroke="var(--text-primary)"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 4, stroke: 'var(--accent-cyan)', strokeWidth: 2 }}
                            strokeOpacity={0.8}
                        />

                        {/* Transformer Prediction (Main) */}
                        <Line
                            type="monotone"
                            dataKey="main"
                            name="Transformer Predictor"
                            stroke="var(--accent-cyan)"
                            strokeWidth={3}
                            strokeDasharray="5 5"
                            dot={false}
                            connectNulls
                        />

                        {/* LSTM Prediction (Consensus) */}
                        <Line
                            type="monotone"
                            dataKey="consensus"
                            name="LSTM Consensus"
                            stroke="var(--accent-purple)"
                            strokeWidth={2}
                            strokeDasharray="3 3"
                            dot={false}
                            connectNulls
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>

            {/* AI Disclaimer Block */}
            <div style={{
                marginTop: 'var(--space-md)',
                padding: '16px',
                background: 'rgba(255, 165, 0, 0.08)',
                border: '1px solid rgba(255, 165, 0, 0.3)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
            }}>
                <div style={{ color: 'var(--accent-orange)' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
                </div>
                <p style={{
                    fontSize: '0.95rem',
                    color: 'var(--text-primary)',
                    lineHeight: '1.5',
                    margin: 0,
                    fontWeight: '500'
                }}>
                    <strong style={{ color: 'var(--accent-orange)', fontSize: '1rem' }}>AI Disclaimer:</strong> Neural forecasts are probabilistic models based on historical patterns and simulated market regimes. These predictions are <strong style={{ textDecoration: 'underline' }}>not 100% accurate</strong> and should be used for research and decision support only. Past performance does not guarantee future results.
                </p>
            </div>
        </div>
    );
}
