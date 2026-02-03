import yfinance as yf
import pandas as pd
import os
import time

# Target Directory
DATA_DIR = os.path.join(os.path.dirname(__file__), '../data')

if not os.path.exists(DATA_DIR):
    os.makedirs(DATA_DIR)

# 40+ Real World Symbols (US & India)
SYMBOLS = [
    # US TECH & BLUE CHIP
    'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 
    'NVDA', 'META', 'ADBE', 'NFLX', 'DIS',
    'CRM', 'AMD', 'INTC', 'CSCO', 'ORCL',
    'JPM', 'V', 'MA', 'WMT', 'COST',
    'PG', 'KO', 'PEP', 'HD', 'NKE',

    # INDIA (NIFTY 50)
    'RELIANCE.NS', 'TCS.NS', 'HDFCBANK.NS', 'INFY.NS', 'ICICIBANK.NS',
    'SBIN.NS', 'BHARTIARTL.NS', 'ITC.NS', 'KOTAKBANK.NS', 'LT.NS',
    'AXISBANK.NS', 'HINDUNILVR.NS', 'BAJFINANCE.NS', 'MARUTI.NS', 'TITAN.NS',
    'ASIANPAINT.NS', 'SUNPHARMA.NS', 'ADANIENT.NS', 'TATASTEEL.NS', 'WIPRO.NS'
]

print(f"Starting Batch Download for {len(SYMBOLS)} Stocks...")

for symbol in SYMBOLS:
    try:
        print(f"Fetching {symbol}...")
        # Download 2 years of data to ensure enough history for 6M filter
        ticker = yf.Ticker(symbol)
        df = ticker.history(period="2y")
        
        if df.empty:
            print(f"Failed to fetch {symbol}: No data found")
            continue

        # Save to CSV
        filename = f"{symbol.replace('.NS', '')}.csv"
        filepath = os.path.join(DATA_DIR, filename)
        df.to_csv(filepath)
        print(f"Saved: {filename}")
        
        # Be polite
        time.sleep(1)

    except Exception as e:
        print(f"Error fetching {symbol}: {e}")

print("Batch Download Complete.")
