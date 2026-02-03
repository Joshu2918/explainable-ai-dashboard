require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

const SYMBOL_METADATA = {
    // --- US TECH & BLUE CHIP (35) ---
    'AAPL': { name: 'Apple Inc.', base: 242, volatility: 1.1, sector: 'Technology' },
    'MSFT': { name: 'Microsoft Corp.', base: 425, volatility: 0.9, sector: 'Technology' },
    'GOOGL': { name: 'Alphabet Inc.', base: 188, volatility: 1.2, sector: 'Technology' },
    'AMZN': { name: 'Amazon.com Inc.', base: 212, volatility: 1.4, sector: 'Consumer Cyclical' },
    'TSLA': { name: 'Tesla Inc.', base: 345, volatility: 2.5, sector: 'Auto Manufacturers' },
    'NVDA': { name: 'NVIDIA Corp.', base: 148, volatility: 2.1, sector: 'Technology' },
    'META': { name: 'Meta Platforms', base: 585, volatility: 1.3, sector: 'Communication Services' },
    'ADBE': { name: 'Adobe Inc.', base: 520, volatility: 1.2, sector: 'Technology' },
    'NFLX': { name: 'Netflix Inc.', base: 760, volatility: 1.5, sector: 'Entertainment' },
    'DIS': { name: 'Walt Disney Co.', base: 115, volatility: 1.1, sector: 'Entertainment' },
    'CRM': { name: 'Salesforce Inc.', base: 310, volatility: 1.3, sector: 'Technology' },
    'AMD': { name: 'Advanced Micro Devices', base: 165, volatility: 1.8, sector: 'Technology' },
    'INTC': { name: 'Intel Corp.', base: 24, volatility: 1.6, sector: 'Technology' },
    'CSCO': { name: 'Cisco Systems', base: 58, volatility: 0.8, sector: 'Technology' },
    'ORCL': { name: 'Oracle Corp.', base: 185, volatility: 1.1, sector: 'Technology' },
    'JPM': { name: 'JPMorgan Chase', base: 235, volatility: 0.9, sector: 'Financial Services' },
    'V': { name: 'Visa Inc.', base: 315, volatility: 0.8, sector: 'Financial Services' },
    'MA': { name: 'Mastercard Inc.', base: 512, volatility: 0.8, sector: 'Financial Services' },
    'WMT': { name: 'Walmart Inc.', base: 82, volatility: 0.7, sector: 'Consumer Defensive' },
    'COST': { name: 'Costco Wholesale', base: 920, volatility: 0.8, sector: 'Consumer Defensive' },
    'PG': { name: 'Procter & Gamble', base: 172, volatility: 0.6, sector: 'Consumer Defensive' },
    'KO': { name: 'Coca-Cola Co.', base: 65, volatility: 0.5, sector: 'Consumer Defensive' },
    'PEP': { name: 'PepsiCo Inc.', base: 175, volatility: 0.5, sector: 'Consumer Defensive' },
    'HD': { name: 'Home Depot', base: 410, volatility: 1.0, sector: 'Consumer Cyclical' },
    'NKE': { name: 'Nike Inc.', base: 78, volatility: 1.2, sector: 'Consumer Cyclical' },
    'LLY': { name: 'Eli Lilly & Co.', base: 840, volatility: 1.1, sector: 'Healthcare' },
    'UNH': { name: 'UnitedHealth Group', base: 535, volatility: 0.9, sector: 'Healthcare' },
    'PFE': { name: 'Pfizer Inc.', base: 28, volatility: 1.1, sector: 'Healthcare' },
    'ABBV': { name: 'AbbVie Inc.', base: 178, volatility: 0.8, sector: 'Healthcare' },
    'TMO': { name: 'Thermo Fisher Scientific', base: 550, volatility: 0.9, sector: 'Healthcare' },
    'CVX': { name: 'Chevron Corp.', base: 155, volatility: 1.2, sector: 'Energy' },
    'XOM': { name: 'Exxon Mobil', base: 118, volatility: 1.2, sector: 'Energy' },
    'UPS': { name: 'United Parcel Service', base: 135, volatility: 1.1, sector: 'Industrials' },
    'BA': { name: 'Boeing Co.', base: 145, volatility: 1.5, sector: 'Industrials' },
    'GE': { name: 'GE Aerospace', base: 185, volatility: 1.3, sector: 'Industrials' },

    // --- INDIAN MARKETS (NIFTY 50 + Major) (55) ---
    'RELIANCE': { name: 'Reliance Industries', base: 1285, volatility: 0.8, sector: 'Energy' },
    'TCS': { name: 'Tata Consultancy Services', base: 3850, volatility: 0.7, sector: 'IT Services' },
    'HDFCBANK': { name: 'HDFC Bank Ltd', base: 1745, volatility: 0.6, sector: 'Financial Services' },
    'INFY': { name: 'Infosys Ltd', base: 1910, volatility: 0.9, sector: 'IT Services' },
    'ICICIBANK': { name: 'ICICI Bank Ltd', base: 1325, volatility: 0.8, sector: 'Financial Services' },
    'SBIN': { name: 'State Bank of India', base: 812, volatility: 1.1, sector: 'Banking' },
    'BHARTIARTL': { name: 'Bharti Airtel', base: 1680, volatility: 1.0, sector: 'Telecom' },
    'LICI': { name: 'LIC of India', base: 980, volatility: 0.9, sector: 'Financial Services' },
    'HINDUNILVR': { name: 'Hindustan Unilever', base: 2450, volatility: 0.6, sector: 'Consumer Goods' },
    'ITC': { name: 'ITC Ltd', base: 485, volatility: 0.7, sector: 'Consumer Goods' },
    'KOTAKBANK': { name: 'Kotak Mahindra Bank', base: 1850, volatility: 0.9, sector: 'Banking' },
    'AXISBANK': { name: 'Axis Bank Ltd', base: 1240, volatility: 0.9, sector: 'Banking' },
    'LT': { name: 'Larsen & Toubro', base: 3650, volatility: 0.8, sector: 'Construction' },
    'BAJFINANCE': { name: 'Bajaj Finance', base: 7200, volatility: 1.2, sector: 'Financial Services' },
    'ASIANPAINT': { name: 'Asian Paints', base: 3200, volatility: 0.8, sector: 'Consumer Goods' },
    'MARUTI': { name: 'Maruti Suzuki India', base: 11800, volatility: 1.0, sector: 'Automobile' },
    'TITAN': { name: 'Titan Company', base: 3450, volatility: 0.9, sector: 'Consumer Goods' },
    'SUNPHARMA': { name: 'Sun Pharma', base: 1850, volatility: 0.8, sector: 'Healthcare' },
    'ADANIENT': { name: 'Adani Enterprises', base: 3100, volatility: 1.8, sector: 'Diversified' },
    'ULTRACEMCO': { name: 'UltraTech Cement', base: 10500, volatility: 0.8, sector: 'Construction' },
    'JSWSTEEL': { name: 'JSW Steel', base: 920, volatility: 1.2, sector: 'Metals' },
    'TATASTEEL': { name: 'Tata Steel', base: 165, volatility: 1.3, sector: 'Metals' },
    'BAJAJ-AUTO': { name: 'Bajaj Auto', base: 10200, volatility: 0.9, sector: 'Automobile' },
    'M&M': { name: 'Mahindra & Mahindra', base: 2950, volatility: 1.0, sector: 'Automobile' },
    'POWERGRID': { name: 'Power Grid Corp', base: 340, volatility: 0.7, sector: 'Utilities' },
    'NTPC': { name: 'NTPC Ltd', base: 410, volatility: 0.8, sector: 'Utilities' },
    'ONGC': { name: 'ONGC', base: 285, volatility: 1.2, sector: 'Energy' },
    'ADANIPORTS': { name: 'Adani Ports', base: 1450, volatility: 1.4, sector: 'Infrastructure' },
    'COALINDIA': { name: 'Coal India', base: 495, volatility: 1.1, sector: 'Energy' },
    'GRASIM': { name: 'Grasim Industries', base: 2450, volatility: 0.9, sector: 'Diversified' },
    'HDFCLIFE': { name: 'HDFC Life', base: 740, volatility: 1.0, sector: 'Insurance' },
    'SBILIFE': { name: 'SBI Life Insurance', base: 1850, volatility: 0.9, sector: 'Insurance' },
    'NESTLEIND': { name: 'Nestle India Ltd', base: 2650, volatility: 0.6, sector: 'Consumer Goods' },
    'DRREDDY': { name: 'Dr. Reddys Labs', base: 6850, volatility: 0.8, sector: 'Healthcare' },
    'APOLLOHOSP': { name: 'Apollo Hospitals', base: 6450, volatility: 1.1, sector: 'Healthcare' },
    'EICHERMOT': { name: 'Eicher Motors', base: 4850, volatility: 1.0, sector: 'Automobile' },
    'WIPRO': { name: 'Wipro Ltd', base: 540, volatility: 1.2, sector: 'IT Services' },
    'TECHM': { name: 'Tech Mahindra', base: 1650, volatility: 1.2, sector: 'IT Services' },
    'HCLTECH': { name: 'HCL Technologies', base: 1820, volatility: 0.9, sector: 'IT Services' },
    'BPCL': { name: 'Bharat Petroleum', base: 345, volatility: 1.3, sector: 'Energy' },
    'CIPLA': { name: 'Cipla Ltd', base: 1550, volatility: 0.8, sector: 'Healthcare' },
    'BRITANNIA': { name: 'Britannia Industries', base: 5650, volatility: 0.7, sector: 'Consumer Goods' },
    'HEROMOTOCO': { name: 'Hero MotoCorp', base: 5450, volatility: 1.0, sector: 'Automobile' },
    'UPL': { name: 'UPL Ltd', base: 580, volatility: 1.4, sector: 'Chemicals' },
    'ADANIPOWER': { name: 'Adani Power', base: 720, volatility: 2.1, sector: 'Utilities' },
    'TATACONSUM': { name: 'Tata Consumer Products', base: 1150, volatility: 0.8, sector: 'Consumer Goods' },
    'INDUSINDBK': { name: 'IndusInd Bank', base: 1450, volatility: 1.2, sector: 'Banking' },
    'HINDALCO': { name: 'Hindalco Industries', base: 680, volatility: 1.4, sector: 'Metals' },
    'DIVISLAB': { name: 'Divis Laboratories', base: 4100, volatility: 1.1, sector: 'Healthcare' },
    'TATAMOTORS': { name: 'Tata Motors', base: 920, volatility: 1.4, sector: 'Automobile' },
    'SHREECEM': { name: 'Shree Cement', base: 26000, volatility: 0.8, sector: 'Construction' },
    'BAJAJFINSV': { name: 'Bajaj Finserv', base: 1680, volatility: 1.1, sector: 'Financial Services' },
    'ADANIGREEN': { name: 'Adani Green Energy', base: 1850, volatility: 2.5, sector: 'Energy' },
    'ZOMATO': { name: 'Zomato Ltd', base: 265, volatility: 2.2, sector: 'Technology' },
    'NYKAA': { name: 'FSN E-Commerce (Nykaa)', base: 215, volatility: 1.9, sector: 'Consumer Cyclical' },

    // --- GLOBAL TECH & MARKETS (10) ---
    'TSM': { name: 'TSMC ADR', base: 195, volatility: 1.5, sector: 'Technology' },
    'ASML': { name: 'ASML Holding', base: 740, volatility: 1.6, sector: 'Technology' },
    'SAP': { name: 'SAP SE ADR', base: 235, volatility: 1.0, sector: 'Technology' },
    'BABA': { name: 'Alibaba Group', base: 95, volatility: 1.8, sector: 'Technology' },
    'TM': { name: 'Toyota Motor ADR', base: 180, volatility: 0.9, sector: 'Automobile' },
    'SONY': { name: 'Sony Group ADR', base: 95, volatility: 1.1, sector: 'Consumer Cyclical' },
    'HSBC': { name: 'HSBC Holdings ADR', base: 45, volatility: 0.8, sector: 'Financial Services' },
    'AZN': { name: 'AstraZeneca ADR', base: 75, volatility: 0.9, sector: 'Healthcare' },
    'SHEL': { name: 'Shell PLC ADR', base: 68, volatility: 1.1, sector: 'Energy' },
    'BHP': { name: 'BHP Group ADR', base: 58, volatility: 1.2, sector: 'Basic Materials' }
};

const ALLOWED_SYMBOLS = Object.keys(SYMBOL_METADATA);

// Helper to load Stock Data (Real CSV or Simulation)
async function loadStockData(symbol) {
    const cleanSymbol = symbol.replace('.NS', '');
    const csvPath = path.join(__dirname, 'data', `${cleanSymbol}.csv`);

    // 1. Try Loading Real Data
    if (fs.existsSync(csvPath)) {
        console.log(`Loading Real Data for: ${symbol}`);
        return new Promise((resolve) => {
            const results = [];
            fs.createReadStream(csvPath)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', () => {
                    const mapped = results.map((row, index) => {
                        // Handle yfinance headers (Date, Open, High, Low, Close, Volume)
                        let dateVal = row.Date || row.date || '';
                        const priceVal = parseFloat(row.Close || row.close);

                        // Clean: "2024-01-29 00:00:00-05:00" -> "2024-01-29"
                        if (dateVal) {
                            dateVal = dateVal.split(' ')[0]; // Remove time
                            dateVal = dateVal.split('T')[0]; // Handle ISO format
                        }

                        return { day: dateVal || `Day ${index}`, price: priceVal };
                    }).filter(r => !isNaN(r.price));

                    // Return up to 2 years of data (approx 500 trading days) for 6M filter
                    resolve(mapped.slice(-500));
                })
                .on('error', (err) => {
                    console.error('CSV Read Error:', err);
                    resolve(null);
                });
        });
    }

    // 2. Fallback to Simulation (if no CSV found)
    console.log(`Simulating Data for: ${symbol}`);
    const seed = (symbol.length * 123) % 1000;
    const history = [];
    let price = 100 + (seed % 500);

    for (let i = 0; i < 90; i++) {
        price += (Math.random() - 0.5) * 5;
        history.push({ day: `Day ${i + 1}`, price });
    }
    return history;
}

// Mock Stock Data Route (Now with Dual-Model Institutional Logic)
app.get('/api/stocks/:symbol', async (req, res) => {
    const { symbol } = req.params;
    const ticker = symbol.toUpperCase();

    if (!SYMBOL_METADATA[ticker]) {
        return res.status(400).json({ error: 'Invalid or unsupported stock symbol. Only real-world symbols are allowed.' });
    }

    const metadata = SYMBOL_METADATA[ticker];
    console.log(`API Request for: ${ticker}`);

    const userVolatility = parseFloat(req.query.volatilityShift) || 0;
    const todayLow = parseFloat(req.query.todayLow) || 0;
    const todayHigh = parseFloat(req.query.todayHigh) || 0;

    // --- DETERMINISTIC ENGINE: SYMBOL-BASED SEEDING ---
    // This ensures same stock + same params = same UNIQUE output every time.
    const generateSeed = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return Math.abs(hash);
    };

    let currentSeed = generateSeed(ticker + userVolatility + todayLow + todayHigh);
    const deterministicRandom = () => {
        currentSeed = (currentSeed * 9301 + 49297) % 233280;
        return currentSeed / 233280;
    };

    // 1. Load Real History (or Simulation Fallback from helper)
    let history = await loadStockData(ticker);
    let currentPrice;

    if (history && history.length > 0) {
        console.log(`Data Source: ${history.length > 200 ? 'Real CSV' : 'Simulation'} | Records: ${history.length}`);
        currentPrice = history[history.length - 1].price;
        // Keep original dates for Chart filtering, but ensure 'day' field exists for older logic if needed
        // We will rely on mapped 'day' from loadStockData which acts as the date string
    } else {
        // Emergency Fallback if helper returns null
        console.log(`Emergency Simulation for ${ticker}`);
        history = [];
        currentPrice = metadata.base;
        // Generate 150 days of simulated history with Dates
        const today = new Date();
        for (let i = 150; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];

            // Random walk
            currentPrice += (Math.random() - 0.5) * 5;
            if (currentPrice < 10) currentPrice = 10;

            history.push({ day: dateStr, price: parseFloat(currentPrice.toFixed(2)) });
        }
    }

    // 2. Dual-Model Prediction (LSTM vs Transformer)
    const lstmPrediction = [];
    const transformerPrediction = [];
    let p1 = currentPrice;
    let p2 = currentPrice;

    const dailyRange = (todayHigh - todayLow);
    const rangeRelativePos = dailyRange > 0 ? (currentPrice - todayLow) / dailyRange : 0.5;
    const sentimentBias = rangeRelativePos > 0.6 ? 1.02 : (rangeRelativePos < 0.4 ? 0.98 : 1.0);
    const volMultiplier = 1 + (userVolatility / 100) + (dailyRange / currentPrice);
    const forecastHorizon = parseInt(req.query.horizon) || 30;

    // Helper to add days to a date string
    const addDays = (dateStr, days) => {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return null; // Invalid date
        date.setDate(date.getDate() + days);
        return date.toISOString().split('T')[0];
    };

    let lastDateStr = history.length > 0 ? history[history.length - 1].day : null;
    // Verify strictly it looks like a date
    if (!lastDateStr || (!lastDateStr.includes('-') && !lastDateStr.includes('/'))) lastDateStr = null;

    for (let i = 0; i < forecastHorizon; i++) {
        // LSTM path (seeded)
        p1 += (deterministicRandom() - 0.42) * (currentPrice * 0.015 * volMultiplier) * sentimentBias;
        // Transformer path (seeded)
        p2 += (deterministicRandom() - 0.38) * (currentPrice * 0.022 * volMultiplier) * sentimentBias;

        let forecastDay;
        if (lastDateStr) {
            forecastDay = addDays(lastDateStr, i + 1);
        }
        if (!forecastDay) {
            forecastDay = `Day ${history.length + i + 1}`;
        }

        lstmPrediction.push({ day: forecastDay, price: parseFloat(p1.toFixed(2)) });
        transformerPrediction.push({ day: forecastDay, price: parseFloat(p2.toFixed(2)) });
    }

    // 3. Disagreement Calculation
    const lastP1 = lstmPrediction[forecastHorizon - 1]?.price || lstmPrediction[0]?.price;
    const lastP2 = transformerPrediction[forecastHorizon - 1]?.price || transformerPrediction[0]?.price;
    const disagreementScore = Math.abs(lastP1 - lastP2) / currentPrice * 100;
    const modelConflict = disagreementScore > 5;

    // 4. Sentiment Layer (Mock News Headlines) - Deterministic Selection
    const allHeadlines = [
        { text: `${ticker} reported Q3 earnings exceed expectations by 12%`, sentiment: 'Positive' },
        { text: `${ticker} analyst rating upgraded to 'Strong Buy' by Goldman Sachs`, sentiment: 'Positive' },
        { text: `Federal Reserve hints at potential rate adjustments next month`, sentiment: 'Neutral' },
        { text: `Market-wide RSI levels indicate ${metadata.sector} sector stability`, sentiment: 'Neutral' },
        { text: `New supply chain disruptions impacting ${ticker} production lines`, sentiment: 'Negative' },
        { text: `Regulatory scrutiny increases for ${metadata.sector} sector operations`, sentiment: 'Negative' }
    ];

    const implicitSentiment = rangeRelativePos > 0.6 ? 'Positive' : (rangeRelativePos < 0.4 ? 'Negative' : 'Neutral');
    const filteredHeadlines = allHeadlines.filter(h => implicitSentiment === 'Neutral' || h.sentiment === implicitSentiment);
    // Pick 3 headlines deterministically
    const headlines = [];
    let hIndex = Math.floor(deterministicRandom() * filteredHeadlines.length);
    for (let i = 0; i < Math.min(3, filteredHeadlines.length); i++) {
        headlines.push(filteredHeadlines[(hIndex + i) % filteredHeadlines.length]);
    }

    // 5. Advanced Institutional Metrics
    const baseConfidence = modelConflict ? 55 : (implicitSentiment !== 'Neutral' ? 82 : 76);
    // Add a tiny bit of deterministic variance to confidence to make it look "Real" but stays same for same seed
    const deterministicVariance = (deterministicRandom() * 4) - 2;
    const confidenceScore = Math.max(20, Math.min(98, baseConfidence - (disagreementScore * 2) + deterministicVariance));
    const volatility = metadata.volatility * volMultiplier;

    // Market Regime Detection
    let regime = 'NEUTRAL CONSOLIDATION';
    if (volatility > 2.0) regime = 'HIGH-SIGMA VOLATILITY';
    else if (implicitSentiment === 'Positive' && !modelConflict) regime = 'BULLISH EXPANSION';
    else if (implicitSentiment === 'Negative' || modelConflict) regime = 'BEARISH CONTRACTION';

    // 6. Uncertainty Bands (±1σ and ±2σ)
    const predictionWithBands = transformerPrediction.map((p, i) => {
        const variance = (i + 1) * (volatility * (currentPrice * 0.008));
        return {
            ...p,
            u1: parseFloat((p.price + variance).toFixed(2)),
            u2: parseFloat((p.price + (variance * 2)).toFixed(2)),
            l1: parseFloat((p.price - variance).toFixed(2)),
            l2: parseFloat((p.price - (variance * 2)).toFixed(2))
        };
    });

    // 7. Neural Reasoning (Legacy) & Strategic Pros/Cons
    const prosConsDatabase = {
        'AAPL': {
            pros: ['Strong ecosystem lock-in', 'Services revenue growth', 'Massive cash reserves'],
            cons: ['Hardware cycle saturation', 'Regulatory headwinds (EU)', 'High valuation multiples']
        },
        'TSLA': {
            pros: ['EV market leadership', 'Full Self-Driving (FSD) potential', 'Supercharger network dominance'],
            cons: ['Production margin compression', 'Key man risk (Elon Musk)', 'Increasing global competition']
        },
        'MSFT': {
            pros: ['Cloud computing (Azure) growth', 'AI integration across stack', 'Enterprise software dominance'],
            cons: ['High dependency on PC market', 'Regulatory scrutiny over AI', 'Intense cloud competition']
        },
        'NVDA': {
            pros: ['GPU dominance in AI era', 'Unrivaled software moats (CUDA)', 'Data center revenue explosion'],
            cons: ['Cyclical semiconductor nature', 'potential overcapacity risk', 'Supply chain bottlenecks']
        },
        'RELIANCE': {
            pros: ['Diversified energy to telecom', 'Digital platform (Jio) growth', 'Strong retail footprint'],
            cons: ['Oil-to-chemical price cycles', 'High capital expenditure', 'Intense telecom competition']
        }
    };

    const defaultProsCons = {
        pros: [`Strong momentum in ${metadata.sector}`, 'Improving neural confidence', 'Favorable technical setup'],
        cons: ['Macro volatility exposure', 'Sector-wide regulatory risk', 'Potential mean reversion']
    };

    const { pros, cons } = prosConsDatabase[ticker] || defaultProsCons;

    const thoughts = [
        `Initializing institutional baseline for ${ticker}...`,
        `Analyzing ${metadata.sector} sector momentum deltas. Today's High-Low spread: ${dailyRange.toFixed(2)}`,
        `Transformer attention weights favoring ${rangeRelativePos > 0.5 ? 'long-horizon momentum' : 'mean reversion'}...`,
        modelConflict ? `WARNING: High disagreement detected between LSTM (conserv) and Transformer (react).` : `Neural consensus reached at ${confidenceScore.toFixed(1)}% certainty.`,
        `Market Regime identified: ${regime}`,
        `Portfolio allocation recalibrated to ${((confidenceScore / 100) * (1 / volatility) * 50).toFixed(1)}% target.`
    ];

    // 8. SHAP-style Factor Ranking
    const factors = [
        { name: 'Neural Momentum', weight: 0.35 + (rangeRelativePos > 0.6 ? 0.1 : 0), type: 'Positive' },
        { name: 'Macro Volatility', weight: 0.25 * volMultiplier * metadata.volatility, type: 'Negative' },
        { name: 'Sector Correlation', weight: 0.15, type: 'Neutral' },
        { name: `${metadata.sector} Alpha`, weight: 0.25 - (disagreementScore * 0.01), type: 'Positive' }
    ].sort((a, b) => b.weight - a.weight);

    // 9. Portfolio Allocation Logic
    const rawAllocation = (confidenceScore / 100) * (1 / volatility);
    const suggestedAllocation = Math.min(40, (rawAllocation * 50)).toFixed(1);
    const cashReserve = (100 - suggestedAllocation).toFixed(1);

    res.json({
        symbol,
        companyName: metadata.name,
        history,
        prediction: predictionWithBands,
        comparison: lstmPrediction,
        metrics: {
            confidenceScore,
            volatility,
            disagreementScore: parseFloat(disagreementScore.toFixed(2)),
            modelConflict,
            sentiment: implicitSentiment,
            todayLow,
            todayHigh,
            regime,
            suggestedAllocation,
            cashReserve,
            factors,
            headlines,
            thoughts,
            pros,
            cons
        },
        currentPrice: currentPrice.toFixed(2)
    });
});

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/stocks-predictor')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
