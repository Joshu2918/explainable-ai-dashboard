const https = require('https');
const fs = require('fs');
const path = require('path');

// Target Directory
const DATA_DIR = path.join(__dirname, '../data');

// 40+ Real World Symbols (US & Inda)
const SYMBOLS = [
    // US TECH & BLUE CHIP
    'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA',
    'NVDA', 'META', 'ADBE', 'NFLX', 'DIS',
    'CRM', 'AMD', 'INTC', 'CSCO', 'ORCL',
    'JPM', 'V', 'MA', 'WMT', 'COST',
    'PG', 'KO', 'PEP', 'HD', 'NKE',

    // INDIA (NIFTY 50 - Requires .NS suffix for Yahoo)
    'RELIANCE.NS', 'TCS.NS', 'HDFCBANK.NS', 'INFY.NS', 'ICICIBANK.NS',
    'SBIN.NS', 'BHARTIARTL.NS', 'ITC.NS', 'KOTAKBANK.NS', 'LT.NS',
    'AXISBANK.NS', 'HINDUNILVR.NS', 'BAJFINANCE.NS', 'MARUTI.NS', 'TITAN.NS',
    'ASIANPAINT.NS', 'SUNPHARMA.NS', 'ADANIENT.NS', 'TATASTEEL.NS', 'WIPRO.NS'
];

// Helper to download data
const downloadStockData = (symbol) => {
    // Switch to query2 endpoint and use standard browser headers
    const url = `https://query2.finance.yahoo.com/v7/finance/download/${symbol}?period1=1704067200&period2=9999999999&interval=1d&events=history&includeAdjustedClose=true`;

    const filePath = path.join(DATA_DIR, `${symbol.replace('.NS', '')}.csv`); // Remove .NS for local filename consistency

    const options = {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
    };

    return new Promise((resolve, reject) => {
        https.get(url, options, (res) => {
            if (res.statusCode !== 200) {
                console.error(`Failed to fetch ${symbol}: Status Code ${res.statusCode}`);
                // Use a fallback or create empty file to prevent crash
                res.resume();
                resolve();
                return;
            }

            const fileStream = fs.createWriteStream(filePath);
            res.pipe(fileStream);

            fileStream.on('finish', () => {
                fileStream.close();
                console.log(`Successfully downloaded: ${symbol} -> ${path.basename(filePath)}`);
                resolve();
            });
        }).on('error', (err) => {
            console.error(`Error downloading ${symbol}: ${err.message}`);
            resolve(); // Resolve anyway to continue loop
        });
    });
};

const run = async () => {
    console.log(`Starting Batch Download for ${SYMBOLS.length} Stocks...`);

    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    for (const symbol of SYMBOLS) {
        await downloadStockData(symbol);
        // Generous delay to avoid 429 Rate Limits
        await new Promise(r => setTimeout(r, 2500));
    }

    console.log('Batch Download Complete.');
};

run();
