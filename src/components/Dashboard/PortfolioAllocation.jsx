import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Wallet, Info } from 'lucide-react';

export default function PortfolioAllocation({ suggestedAllocation = 0, cashReserve = 100 }) {
    const data = [
        { name: 'Stock Allocation', value: parseFloat(suggestedAllocation) },
        { name: 'Cash Reserve', value: parseFloat(cashReserve) },
    ];

    const COLORS = ['var(--accent-cyan)', 'rgba(255, 255, 255, 0.05)'];

    return (
        <div className="glass-panel" style={{ padding: 'var(--space-lg)', height: '100%', position: 'relative' }}>
            <div className="flex-between" style={{ marginBottom: 'var(--space-md)' }}>
                <h3 style={{ color: '#fff' }}>Smart Portfolio Allocation</h3>
                <Wallet size={18} color="var(--accent-cyan)" />
            </div>

            <div style={{ height: '200px', width: '100%', position: 'relative' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-glow)', borderRadius: '8px' }}
                            itemStyle={{ color: '#fff' }}
                        />
                    </PieChart>
                </ResponsiveContainer>
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--accent-cyan)' }}>{suggestedAllocation}%</div>
                    <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)' }}>ALLOCATION</div>
                </div>
            </div>

            <div className="flex-col" style={{ gap: 'var(--space-sm)', marginTop: 'var(--space-md)' }}>
                <div className="flex-between" style={{ fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Target Asset:</span>
                    <span style={{ color: '#fff', fontWeight: 'bold' }}>{suggestedAllocation}%</span>
                </div>
                <div className="flex-between" style={{ fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Capital Reserve:</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{cashReserve}%</span>
                </div>

                <div style={{
                    marginTop: 'var(--space-md)',
                    padding: '10px',
                    background: 'rgba(0, 240, 255, 0.05)',
                    borderRadius: '8px',
                    borderLeft: '3px solid var(--accent-cyan)',
                    fontSize: '0.75rem',
                    color: 'var(--text-primary)',
                    lineHeight: '1.4'
                }}>
                    <div className="flex-center" style={{ justifyContent: 'start', gap: '5px', marginBottom: '4px' }}>
                        <Info size={12} color="var(--accent-cyan)" />
                        <span style={{ fontWeight: 'bold' }}>Neural Sizing Logic</span>
                    </div>
                    Position sized using <span style={{ color: 'var(--accent-cyan)' }}>Confidence × Inverse Volatility</span> to optimize risk-adjusted returns.
                </div>
            </div>
        </div>
    );
}
