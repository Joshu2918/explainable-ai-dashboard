import React from 'react';
import { Table, ArrowDown, ArrowUp } from 'lucide-react';

export default function MarketTable({ history = [], prediction = [] }) {
    return (
        <div className="glass-panel card-full-height" style={{ padding: 'var(--space-lg)', overflow: 'hidden', height: '400px' }}>
            <div className="flex-between" style={{ marginBottom: 'var(--space-md)' }}>
                <h3 style={{ color: '#fff' }}>Historical vs. Predicted Analysis</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Neural Inference Table</span>
            </div>

            <div className="flex-grow-1" style={{ overflowY: 'auto', border: '1px solid var(--border-subtle)', borderRadius: '8px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
                    <thead style={{ position: 'sticky', top: 0, background: 'var(--bg-secondary)', zIndex: 1, color: 'var(--text-secondary)' }}>
                        <tr>
                            <th style={{ padding: '12px' }}>Timeline</th>
                            <th style={{ padding: '12px' }}>Type</th>
                            <th style={{ padding: '12px' }}>Close Price</th>
                            <th style={{ padding: '12px' }}>Delta (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...history, ...prediction].map((item, index) => {
                            const type = index < history.length ? 'Historical' : 'Prediction';
                            const prevPrice = index > 0 ? [...history, ...prediction][index - 1].price : item.price;
                            const delta = (((item.price - prevPrice) / prevPrice) * 100).toFixed(2);

                            return (
                                <tr key={index} style={{ borderBottom: '1px solid var(--border-subtle)', background: type === 'Prediction' ? 'rgba(191, 0, 255, 0.05)' : 'transparent' }}>
                                    <td style={{ padding: '12px', color: 'var(--text-primary)', fontFamily: 'monospace' }}>
                                        {(() => {
                                            // Format date: "2024-01-29" -> "Jan 29, 2024"
                                            if (item.day && item.day.match(/^\d{4}-\d{2}-\d{2}$/)) {
                                                const d = new Date(item.day);
                                                return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                                            }
                                            return item.day;
                                        })()}
                                    </td>
                                    <td style={{ padding: '12px' }}>
                                        <span style={{
                                            padding: '2px 8px',
                                            borderRadius: '4px',
                                            fontSize: '0.75rem',
                                            background: type === 'Historical' ? 'rgba(0, 240, 255, 0.1)' : 'rgba(191, 0, 255, 0.1)',
                                            color: type === 'Historical' ? 'var(--accent-cyan)' : 'var(--accent-purple)',
                                            border: `1px solid ${type === 'Historical' ? 'rgba(0, 240, 255, 0.2)' : 'rgba(191, 0, 255, 0.2)'}`
                                        }}>
                                            {type}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px', fontWeight: 'bold' }}>₹{item.price.toFixed(2)}</td>
                                    <td style={{ padding: '12px', color: delta >= 0 ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                                        <div className="flex-center" style={{ justifyContent: 'start', gap: '4px' }}>
                                            {delta >= 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                                            {Math.abs(delta)}%
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
