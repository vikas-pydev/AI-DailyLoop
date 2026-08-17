# ⚡ AI Mastery Lab — IITP-AIMLT-2601 Exam Accelerator & Interactive Studio

[![License: MIT](https://img.shields.io/badge/License-MIT-indigo.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/vikas-pydev/AI-DailyLoop)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-emerald.svg)](sw.js)
[![Netlify Status](https://img.shields.io/badge/Netlify-Auto--Deploy-00C7B7.svg)](https://app.netlify.com)
[![Stack](https://img.shields.io/badge/Tech-HTML5%20%7C%20CSS3%20%7C%20JS-pink.svg)](index.html)

**AI Mastery Lab** is a gamified, interactive learning platform and exam revision studio built specifically for the **IITP-AIMLT-2601 Certification Exam** (Certificate Program in Artificial Intelligence and Machine Learning).

It combines **all 46 curriculum topics**, **9 interactive visual simulators**, a **formula revision matrix**, a **150+ key terms directory**, a **spaced repetition flashcard engine**, a **timed mock exam simulator**, and an **interview articulation studio** with zero external runtime dependencies.

---

## 🌟 Comprehensive Features

### 1. 📚 46-Topic Knowledge Hub Across 6 Learning Tracks
Fully mapped to the official **IITP-AIMLT-2601 Study Guide**:
- **Track 1: Foundations & Python Mastery (Topics 1–11):**
  - AI/ML/DL/GenAI hierarchy, Computer hardware (CPU vs GPU), OS Kernel, Compiler vs Interpreter, Colab/.py/.ipynb workflows, CLI & Git/PAT security, Python variables & dynamic typing, Conditionals, Loops, Functions & `*args`, Scope, and Data structures (Lists, Dicts, Tuples, Sets, File I/O).
- **Track 2: Numerical Computing, Pandas & SQL (Topics 12–19):**
  - NumPy ndarrays, Vectorization, Broadcasting rules, Z-scores, Pandas Series & DataFrames, `.iloc` vs `.loc`, JSON serialization, Boolean indexing, Missing data handling (`dropna`, `fillna`, `ffill`/`bfill`), `groupby().agg()`, RDBMS fundamentals, Core SQL clauses (`SELECT`, `WHERE`, `GROUP BY`, `HAVING`, `ORDER BY`), Normalization (1NF to 3NF), and 4 SQL Joins (`INNER`, `LEFT`, `RIGHT`, `FULL OUTER`).
- **Track 3: Visualization, EDA, APIs & Web Scraping (Topics 20–25):**
  - Matplotlib 3-layer architecture, 1.5×IQR Outlier Detection Rule, Box & Violin plots, Pearson Correlation Matrix & Heatmaps, REST APIs, JSON ETL Pipelines, and Beautiful Soup scraping.
- **Track 4: ML Foundations & Preprocessing (Topics 26–28):**
  - Supervised vs Unsupervised vs RL, 6-stage ML lifecycle, Data Leakage prevention, Missing data mechanisms (MCAR, MAR, MNAR), One-Hot vs Label encoding, 3-Sigma Empirical Rule (68-95-99.7), and Feature Scaling (`StandardScaler` vs `MinMaxScaler`).
- **Track 5: Regression, Classification & Model Evaluation (Topics 29–38):**
  - Linear Regression ($y=mx+c$, SSE, SGD), Regression Metrics (MAE, MSE, RMSE, $R^2$, Adjusted $R^2$), Ridge (L2) vs Lasso (L1) Regularization, Logistic Regression & Sigmoid, Confusion Matrix (TP, FP, TN, FN), Precision, Recall, F1-Score, Accuracy Paradox, Handling Imbalanced Data (SMOTE, Class Weights), Decision Trees (Shannon Entropy & Gini Impurity), Random Forests & Bagging, ROC Curves & AUC Threshold Tuning, `ColumnTransformer` + `Pipeline`, and K-Means Clustering & Silhouette Coefficient.
- **Track 6: LLMs, Prompt Engineering, Agents, RAG & LangGraph (Topics 39–46):**
  - Transformer architecture, Autoregressive next-token prediction, Q/K/V Self-Attention, RCTFL Prompt Engineering Framework, Few-Shot & Chain-of-Thought, ReAct Agent Loops, Structured JSON outputs (Pydantic), Dense Embeddings & Cosine Similarity, 2-phase RAG architecture, FastAPI + Docker, and LangGraph Multi-Agent State Machines.

---

### 2. 🎛️ 9 Interactive Simulators
1. **RAG Vector Search Simulator:** Computes 384-dimensional vector embeddings, ranks documents by Cosine Similarity, and constructs grounded LLM context prompts.
2. **AI Agent ReAct Loop Simulator:** Interactive step-by-step execution of Thought $\to$ Action (`get_user_tickets`) $\to$ Observation $\to$ Final Answer.
3. **Data Leakage Visualizer:** Live interactive comparison of a Leaky Pipeline (preprocessing before split) vs a Leak-Free Sklearn Pipeline.
4. **Confusion Matrix & Metrics Tuner:** Real-time sliders for TP, FP, TN, FN dynamically calculating Precision, Recall, F1, Accuracy, and FPR, with presets demonstrating the *Accuracy Paradox*.
5. **Sigmoid Curve & Decision Threshold Explorer:** Interactive threshold slider ($0.0 \to 1.0$) showcasing sensitivity trade-offs (Cancer Screening vs Spam Filtering).
6. **Decision Tree Split & Gini / Entropy Calculator:** Live computation of Gini Impurity and Shannon Entropy based on class distribution inputs.
7. **SQL Joins Visualizer:** Visual switch between `INNER`, `LEFT`, `RIGHT`, and `FULL OUTER` joins with dynamic joined table rendering.
8. **K-Means 4-Step Convergence Simulator:** Step-by-step centroid initialization, distance assignment, centroid update, and convergence.
9. **LangGraph Multi-Agent Router:** Interactive state-graph query classifier routing requests to Billing, HR, or General agent nodes.

---

### 3. ⚡ Formula Revision Matrix & 150+ Key Terms Directory
- Quick revision cards with LaTeX equations and plain representations for all core exam formulas.
- Tag filters: *Classification*, *Regression*, *Statistics*, *Decision Trees*, *GenAI & RAG*.
- Searchable Key Terms Directory with instant jump links to relevant topics.

---

### 4. 📇 Spaced Repetition Flashcards Deck (46+ Cards)
- Filterable by track with 3D flip animation, shuffle, and full keyboard navigation (Spacebar to flip, Arrow keys to cycle).

---

### 5. ⏱️ IITP Timed Mock Exam Simulator
- 10 randomized exam questions drawn across all 46 topics with a 5-minute countdown timer, automated score breakdown, XP rewards, and detailed answer explanations.

---

### 6. 📖 Full Page Reader & Collapsible Navigation Sidebars
- **Collapsible Main Navigation:** Hamburger toggle (`☰`) in the header cycles between Expanded (`260px`), Compact Icon (`78px`), and Full Viewport (`100%`) modes.
- **Full Page / Zen Reader Mode:** Expand any topic across the entire screen for distraction-free study.
- **Font Size Scaler ($A-$ / $A+$):** Dynamic font scaling from 15px to 23px for comfortable reading.
- **Chapter Navigation:** Previous & Next topic buttons at the bottom of every chapter.

---

## 🛠️ Tech Stack & Architecture

- **Frontend:** Pure Vanilla HTML5, CSS3, Modern JavaScript (ES6+). Zero heavy frontend frameworks or build steps required.
- **Formulas & Typography:** Custom mathematical formatter converting LaTeX notation to clean Unicode equations.
- **Persistence:** LocalStorage state management (`ai_mastery_iitp_v2`) tracking XP, level, daily streak, completed topics, badges, and exam scores.
- **PWA & Offline Support:** Service Worker (`sw.js`) with cache-first strategy for 100% offline functionality.

---

## 🚀 Running Locally

You can run AI Mastery Lab locally with any static web server:

```bash
# 1. Clone the repository
git clone https://github.com/vikas-pydev/AI-DailyLoop.git
cd AI-DailyLoop

# 2. Start a local preview server
npx serve . -p 8080

# 3. Open in browser
http://localhost:8080
```

---

## ☁️ Continuous Deployment to Netlify

This repository is configured for **automatic continuous deployment on Netlify**:

1. **Automatic Git Push Deployments:**
   - Every push to the `main` branch automatically triggers a fresh build and deploy on Netlify.
2. **`netlify.toml` Configuration:**
   - Built-in CDN caching, PWA header settings, and single-page routing redirects are pre-configured in [`netlify.toml`](./netlify.toml).
3. **Manual Deploy via Netlify CLI (Optional):**
   ```bash
   npx netlify-cli deploy --prod --dir=.
   ```

---

## 📜 License

MIT License © 2026 [Vikas](https://github.com/vikas-pydev). Built for the IITP-AIMLT-2601 Program.
