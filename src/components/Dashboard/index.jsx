import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ConfigPanel from './ConfigPanel';
import SummaryCards from './SummaryCards';
import PredictionChart from './PredictionChart';
import InsightPanel from './InsightPanel';
import ExplainabilitySection from './ExplainabilitySection';
import ResponsibleAI from './ResponsibleAI';
import FutureScope from './FutureScope';
import MarketTable from './MarketTable';
import PortfolioAllocation from './PortfolioAllocation';
import RiskHeatmap from './RiskHeatmap';
import StockProsCons from './StockProsCons';
import SentimentTicker from './SentimentTicker';

export default function Dashboard({ onUpdateConfidence }) {
    const [stockData, setStockData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchStockData = async ({ ticker, horizon, basePrice, volatilityShift = 0, todayLow = 0, todayHigh = 0 }) => {
        setLoading(true);
        try {
            const { data } = await axios.get(`http://localhost:5001/api/stocks/${ticker}`, {
                params: { basePrice, volatilityShift, todayLow, todayHigh, horizon }
            });
            setStockData(data);
            if (data.metrics?.confidenceScore) {
                onUpdateConfidence(data.metrics.confidenceScore);
            }
        } catch (err) {
            console.error('Failed to fetch stock data', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Initial fetch
        fetchStockData({ ticker: 'AAPL', horizon: 30, basePrice: 240, todayLow: 235, todayHigh: 245 });
    }, []);

    const metrics = stockData?.metrics || {};

    return (
        <div className="flex-col animate-slide-up" style={{ width: '100%', gap: 'var(--space-lg)' }}>
            <SentimentTicker headlines={metrics.headlines} />
            <ConfigPanel onRunAnalysis={fetchStockData} />

            {/* Top Row: Executive Summary Metrics */}
            <section className="section-spacing">
                <SummaryCards metrics={metrics} />
            </section>

            {/* Middle Row: Primary Forecast & Strategic Decision (CRITICAL) */}
            <section className="grid-cols-3 section-spacing" style={{ minHeight: '400px' }}>
                <div style={{ gridColumn: 'span 2' }}>
                    <PredictionChart data={stockData} />
                </div>
                <div style={{ gridColumn: 'span 1' }}>
                    <InsightPanel metrics={metrics} />
                </div>
            </section>

            {/* Institutional Risk & Allocation Row */}
            <section className="grid-cols-2 section-spacing">
                <div className="card-full-height">
                    <RiskHeatmap
                        confidence={metrics.confidenceScore}
                        volatility={metrics.volatility}
                        symbol={stockData?.symbol}
                    />
                </div>
                <div className="card-full-height">
                    <PortfolioAllocation
                        suggestedAllocation={metrics.suggestedAllocation}
                        cashReserve={metrics.cashReserve}
                    />
                </div>
            </section>

            {/* Depth Row: Market Audit & Reasoning Console */}
            <section className="grid-cols-3 section-spacing">
                <div style={{ gridColumn: 'span 2' }}>
                    <MarketTable history={stockData?.history} prediction={stockData?.prediction} />
                </div>
                <div style={{ gridColumn: 'span 1' }}>
                    <StockProsCons pros={metrics.pros} cons={metrics.cons} loading={loading} />
                </div>
            </section>

            {/* Technical Detail Row: Explainability + Responsible AI */}
            <section className="grid-cols-3 section-spacing no-gap-bottom">
                <div style={{ gridColumn: 'span 2' }}>
                    <ExplainabilitySection factors={metrics.factors} disagreement={metrics.disagreementScore} />
                </div>
                <div style={{ gridColumn: 'span 1' }}>
                    <ResponsibleAI metrics={metrics} />
                </div>
            </section>

            <FutureScope />

            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
}
