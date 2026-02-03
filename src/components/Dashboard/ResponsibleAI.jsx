import React from 'react';
import { ShieldCheck, Scale, Database, Eye, Activity, AlertTriangle, Info } from 'lucide-react';

export default function ResponsibleAI({ metrics = {} }) {
    const { confidenceScore = 76, modelConflict = false } = metrics;

    return (
        <div className="flex-col card-full-height" style={{ gap: 'var(--space-md)' }}>
            {/* Ethics & Professional Standard Panel */}
            <div className="glass-panel" style={{
                padding: 'var(--space-md)',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                position: 'relative'
            }}>
                <h3 style={{ fontSize: '0.9rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ShieldCheck size={16} color="var(--accent-purple)" /> Professional Ethics Standard
                </h3>
            </div>

            <div style={{ padding: '10px', background: 'rgba(0,0,0,0.2)', borderRadius: '6px', fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                <div className="flex-center" style={{ justifyContent: 'start', gap: '8px', marginBottom: '6px' }}>
                    <Info size={12} color="var(--accent-purple)" />
                    <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>MANDATORY DISCLOSURE</span>
                </div>
                Neural predictions are <span style={{ color: '#fff' }}>probabilistic</span> and do not constitute financial advice. Historical performance does not guarantee future results.
            </div>

            {confidenceScore < 60 && (
                <div className="animate-pulse-glow" style={{
                    marginTop: '10px',
                    padding: '10px',
                    background: 'rgba(214, 48, 49, 0.1)',
                    borderRadius: '6px',
                    border: '1px solid var(--accent-red)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'var(--accent-red)',
                    fontSize: '0.7rem',
                    fontWeight: 'bold'
                }}>
                    <AlertTriangle size={14} />
                    CAUTION: CRITICALLY LOW CONFIDENCE DETECTED
                </div>
            )}

            {/* AI Governance Indicators */}
            <div className="glass-panel" style={{ padding: 'var(--space-md)', position: 'relative' }}>
                <h3 style={{ fontSize: '0.9rem', color: '#fff', marginBottom: '12px' }}>AI Governance Metrics</h3>

                <div className="flex-col" style={{ gap: '10px' }}>
                    <div className="flex-between" style={{ fontSize: '0.8rem' }}>
                        <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Scale size={14} /> Bias Detection
                        </span>
                        <span style={{ color: 'var(--accent-green)', fontWeight: 'bold' }}>CLEAN</span>
                    </div>
                    <div className="flex-between" style={{ fontSize: '0.8rem' }}>
                        <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Activity size={14} /> Concept Drift
                        </span>
                        <span style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>STABLE</span>
                    </div>
                    <div className="flex-between" style={{ fontSize: '0.8rem' }}>
                        <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Eye size={14} /> Audit Logging
                        </span>
                        <span style={{ color: 'var(--text-secondary)' }}>ACTIVE</span>
                    </div>
                </div>
            </div>

            {/* Model Architecture Overview */}
            <div className="glass-panel" style={{ padding: 'var(--space-md)' }}>
                <h3 style={{ fontSize: '0.9rem', color: '#fff', marginBottom: '12px' }}>Architecture Status</h3>
                <div className="flex-col" style={{ gap: '8px', fontSize: '0.75rem' }}>
                    <div className="flex-between">
                        <span style={{ color: 'var(--text-secondary)' }}>LSTM Pipeline</span>
                        <span style={{ color: 'var(--accent-green)' }}>SYNCED</span>
                    </div>
                    <div className="flex-between">
                        <span style={{ color: 'var(--text-secondary)' }}>Transformer Layer</span>
                        <span style={{ color: 'var(--accent-green)' }}>SYNCED</span>
                    </div>
                    <div className="flex-between">
                        <span style={{ color: 'var(--text-secondary)' }}>Consensus Engine</span>
                        <span style={{ color: modelConflict ? 'var(--accent-red)' : 'var(--accent-green)' }}>
                            {modelConflict ? 'CONFLICT' : 'HEALTHY'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
