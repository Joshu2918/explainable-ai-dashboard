# 📊 Institutional Explainable AI Dashboard

An enterprise-grade, institutional decision-support platform for professional stock analysis and prediction. This project transforms raw market data into actionable, transparent, and risk-aware insights using advanced AI models.

## 🌟 Key Performance Features

*   **Dual-Model Prediction Engine**: Orchestrates **LSTM (Long Short-Term Memory)** and **Transformer** architectures to provide high-fidelity forecasts.
*   **Model Disagreement Protocol**: Calculates real-time variance between AI models to flag high-uncertainty market regimes.
*   **SHAP-Style Explainability**: Granular breakdown of feature importance, revealing the *why* behind every AI prediction.
*   **Risk-Aware Portfolio Management**: Dynamic capital allocation based on confidence scores and realized volatility metrics.
*   **Institutional Glassmorphic UI**: High-end, responsive interface designed for professional trading environments.

## 🚀 Minute-by-Minute Technical Breakdown

### 1. High-Level Architecture
- **Frontend**: A high-performance React application built with **Vite** for rapid development and **Vanilla CSS** for premium aesthetics.
- **Backend**: A robust **Express (Node.js)** server handling API requests and data orchestration.
- **AI Core**: Advanced simulation models that generate deterministic, reproducible forecasts based on symbol metadata and real-world distributions.
- **Database**: **MongoDB** for secure user authentication and historical tracking.

---

### 2. Core Dashboard Components (Deep Dive)

#### 🛡️ Executive Summary & Insights
- **Sentiment Ticker**: Real-time processing of news headlines to provide immediate market context.
- **Strategic Insight Panel**: AI-generated narratives explaining recommendation logic (Buy/Hold/Sell).
- **Summary Cards**: Quick-glance metrics for Expected Return, Confidence, and Volatility.

#### 📈 Advanced Forecasting
- **Multi-Horizon Charts**: Interactive time-series visualization showing historical data followed by a probabilistic future forecast.
- **Uncertainty Bands**: Visualization of ±1σ and ±2σ confidence intervals for risk assessment.
- **Market Audit Table**: A granular, line-by-line breakdown of price points versus AI-predicted values.

#### ⚖️ Risk & Portfolio Management
- **Risk Heatmap**: A sophisticated 2D visualization plotting **Volatility vs. Model Confidence**, identifying "Sweet Spots" for entries.
- **Dynamic Allocation**: Real-time recalibration of suggested position sizing based on model certainty.
- **Bullish/Bearish Console**: A balanced audit of pros and cons powered by institutional databases.

#### 🔍 Explainable AI (XAI) & Ethics
- **Neural Reasoning Console**: Transparently displays the AI's internal thought process during inference.
- **Responsible AI Layer**: Implements ethical constraints to ensure safety and prevent biased trading signals.

---

### 3. Step-by-Step Data Flow
1.  **Signal Intake**: Receives ticker symbols and user parameters (Volatility, Horizon).
2.  **Engine Seeding**: Uses deterministic hashing to ensure consistent, reliable predictions.
3.  **Inference**: Simulates dual-model paths (LSTM vs. Transformer).
4.  **Conflict Resolution**: Computes disagreement scores and adjust confidence accordingly.
5.  **Packet Delivery**: Transmits comprehensive JSON data for real-time UI hydration.

---

### 4. Setup & Installation

#### **Prerequisites**
- Node.js (v18+)
- MongoDB (Local or Atlas)
- Git

#### **Installation**
1.  **Clone the Repo**:
    ```bash
    git clone https://github.com/joshu2918/explainable-ai-dashboard.git
    cd explainable-ai-dashboard
    ```
2.  **Server Setup**:
    ```bash
    cd server
    npm install
    # Create .env: PORT=5001, MONGODB_URI=your_link
    npm start
    ```
3.  **Frontend Setup**:
    ```bash
    cd ..
    npm install
    npm run dev
    ```

---

### 👥 Contribution & Community
This repository is optimized for collaboration.
- **Developer**: joshu2918
- **Participation**: Fork the repo, create feature branches, and submit Pull Requests.
- **License**: Private / Hackathon Use Only.

---
**Institutional Grade • Transparent AI • Professional Trading**
