import React from 'react';
import { Rocket, Box, Brain, Newspaper } from 'lucide-react';

export default function FutureScope() {
    return (
        <div className="glass-panel" style={{
            padding: 'var(--space-xl)',
            marginTop: 'var(--space-xl)',
            background: 'linear-gradient(180deg, rgba(22, 27, 40, 0.7) 0%, rgba(0, 0, 0, 0.4) 100%)',
            border: '1px solid var(--border-subtle)',
            position: 'relative'
        }}>
            <div className="flex-center" style={{ marginBottom: 'var(--space-lg)', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: 'var(--space-sm)' }}>Product Roadmap & Future Scope</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Enterprise-grade features currently in development</p>
            </div>

            <div className="grid-cols-4">
                <div style={{ padding: 'var(--space-md)', border: '1px solid var(--border-subtle)', borderRadius: '8px' }}>
                    <div className="flex-center" style={{ justifyContent: 'start', marginBottom: '10px' }}>
                        <Box color="var(--accent-purple)" size={24} />
                        <h4 style={{ marginLeft: '10px', fontSize: '1rem' }}>Transformer Models</h4>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        Migrating from LSTM to Transformer-based time-series architectures for long-horizon dependency modeling.
                    </p>
                </div>

                <div style={{ padding: 'var(--space-md)', border: '1px solid var(--border-subtle)', borderRadius: '8px' }}>
                    <div className="flex-center" style={{ justifyContent: 'start', marginBottom: '10px' }}>
                        <Newspaper color="var(--accent-cyan)" size={24} />
                        <h4 style={{ marginLeft: '10px', fontSize: '1rem' }}>Sentiment Analysis</h4>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        Real-time integration of Bloomberg & Reuters news feeds for macroeconomic context awareness.
                    </p>
                </div>

                <div style={{ padding: 'var(--space-md)', border: '1px solid var(--border-subtle)', borderRadius: '8px' }}>
                    <div className="flex-center" style={{ justifyContent: 'start', marginBottom: '10px' }}>
                        <Brain color="var(--accent-green)" size={24} />
                        <h4 style={{ marginLeft: '10px', fontSize: '1rem' }}>Personalized Risk</h4>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        Adaptive risk profiles based on individual investor psychology and portfolio composition.
                    </p>
                </div>

                <div style={{ padding: 'var(--space-md)', border: '1px solid var(--border-subtle)', borderRadius: '8px' }}>
                    <div className="flex-center" style={{ justifyContent: 'start', marginBottom: '10px' }}>
                        <Rocket color="var(--accent-orange)" size={24} />
                        <h4 style={{ marginLeft: '10px', fontSize: '1rem' }}>Auto-Execution</h4>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        (Experimental) Integration with broker APIs for automated hedging strategies.
                    </p>
                </div>
            </div>
        </div>
    );
}
