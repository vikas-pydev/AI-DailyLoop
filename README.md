# ⚡ AI Mastery Lab — IITP-AIMLT-2601 Exam Accelerator & Interactive Studio

[![Live App](https://img.shields.io/badge/Live-ai--dailyloop.netlify.app-00C7B7?style=for-the-badge&logo=netlify)](https://ai-dailyloop.netlify.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-indigo.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/vikas-pydev/AI-DailyLoop)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-emerald.svg)](sw.js)
[![Stack](https://img.shields.io/badge/Tech-HTML5%20%7C%20CSS3%20%7C%20JS-pink.svg)](index.html)

**Live Production Application:**  
👉 **[AI Mastery Lab - IITP-AIMLT-2601 Exam Accelerator & Interactive Studio](https://ai-dailyloop.netlify.app/)**  
🌐 **https://ai-dailyloop.netlify.app**

**AI Mastery Lab (AI DailyLoop)** is a comprehensive, gamified interactive learning platform, exam revision studio, and daily habit engine built specifically for the **IITP-AIMLT-2601 Certification Exam** (Certificate Program in Artificial Intelligence and Machine Learning).

It combines **all 46 curriculum topics**, **9 interactive visual simulators**, an **adaptive Daily Loop engine**, **spaced repetition flashcards (SRS)**, a **timed mock exam simulator**, an **actionable Progress Center with Mistake Bank and Bookmarks**, and an **interview articulation studio** with zero external runtime dependencies.

---

## 🌟 Comprehensive Features

### 1. 📱 Mobile-First Daily Hub & Adaptive Learning Feed
- **Daily Loop Engine:** Deterministic 6-step personalized daily session (`Learn` → `Recall` → `Test` → `Apply` → `Explain` → `Complete`) prioritizing active mistakes, weak areas, and due flashcards.
- **Interactive Learning Feed:** Fluid, vertical sequence of interactive study cards, scenario challenges, and instant-feedback MCQs.
- **Mobile Navigation:** Touch-friendly sticky header, 5-tab fixed bottom navigation bar (`Home`, `Learn`, `Topics`, `Progress`, `More`), and slide-out navigation drawer.
- **Streak & Habit Tracking:** Real-time streak tracking, rank titles, and milestone celebration toasts.

---

### 2. 📚 46-Topic Knowledge Hub Across 6 Learning Tracks
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

### 3. 🎛️ 9 Interactive Visual Simulators
1. **RAG Vector Search Simulator:** Computes 384-dimensional vector embeddings, ranks documents by Cosine Similarity, and constructs grounded LLM context prompts with 1-tap query presets.
2. **AI Agent ReAct Loop Simulator:** Interactive step-by-step execution of Thought $\to$ Action (`get_user_tickets`) $\to$ Observation $\to$ Final Answer.
3. **Data Leakage Visualizer:** Live interactive comparison of a Leaky Pipeline (preprocessing before split) vs a Leak-Free Sklearn Pipeline.
4. **Confusion Matrix & Metrics Tuner:** Real-time sliders for TP, FP, TN, FN dynamically calculating Precision, Recall, F1, Accuracy, and FPR, with presets demonstrating the *Accuracy Paradox*.
5. **Sigmoid Curve & Decision Threshold Explorer:** Interactive threshold slider ($0.0 \to 1.0$) showcasing sensitivity trade-offs (Cancer Screening vs Spam Filtering).
6. **Decision Tree Split & Gini / Entropy Calculator:** Live computation of Gini Impurity and Shannon Entropy based on class distribution inputs.
7. **SQL Joins Visualizer:** Visual switch between `INNER`, `LEFT`, `RIGHT`, and `FULL OUTER` joins with dynamic joined table rendering.
8. **K-Means 4-Step Convergence Simulator:** Step-by-step centroid initialization, distance assignment, centroid update, and convergence.
9. **LangGraph Multi-Agent Router:** Interactive state-graph query classifier routing requests to Billing, HR, or General agent nodes.

---

### 4. 📇 Spaced Repetition Flashcards Deck (SRS)
- 4-Tier recall rating system: `Again (1d)`, `Hard (2d)`, `Good (4d)`, `Easy (7d)`.
- Filterable by due count and track with 3D flip animation, LaTeX math formatting, and keyboard shortcuts (`Space` to flip, `Arrow keys` to cycle, `1-4` to rate).

---

### 5. ⏱️ IITP Timed Mock Exam Simulator
- 10 randomized exam questions drawn across all 46 topics with a 5-minute countdown timer, sticky mobile header, 10-pill navigator matrix, question flagging, submission confirmation modal, and score diagnostics.

---

### 6. 📊 Actionable Progress Control Center, Mistake Bank & Bookmarks
- **Mastery Breakdown:** Real-time overall and 6-track mastery percentages calculated from completion, quiz accuracy, SRS recall, and active mistakes.
- **Mistake Bank:** Prioritized repository of unresolved errors with direct `[ Review & Solve ]` remediation modal to resolve mistakes and earn XP on the spot.
- **Saved Bookmarks:** 1-tap bookmarking for Topics, Questions, Flashcards, and Formulas with category filter chips.

---

### 7. 🎤 Interview Articulation Studio
- Practice explaining complex AI/ML concepts out loud or in writing.
- Automated keyword matching and gold-standard model answers for top AI Engineer interview questions.

---

### 8. ⚡ Formula Revision Matrix & 150+ Key Terms Directory
- Quick revision cards with LaTeX equations and plain representations for all core exam formulas.
- Tag filters: *Classification*, *Regression*, *Statistics*, *Decision Trees*, *GenAI & RAG*.
- Searchable Key Terms Directory with instant jump links to relevant topics.

---

## 🛠️ Tech Stack & Architecture

- **Frontend:** Pure Vanilla HTML5, CSS3, Modern JavaScript (ES6+). Zero heavy frontend frameworks or runtime dependencies.
- **Design System:** Responsive dark glassmorphism architecture with CSS custom properties, WCAG AA high-contrast focus rings, and safe-area padding (`env(safe-area-inset-*)`).
- **Persistence:** Resilient LocalStorage state management (`ai_mastery_iitp_v2`) tracking XP, levels, streak, completed topics, SRS schedule, mistakes, and bookmarks.
- **PWA & 100% Offline Capability:** Service Worker (`sw.js`) with versioned cache (`ai-dailyloop-v10`) pre-caching the core application shell for complete offline access.

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

- **Production URL:** [https://ai-dailyloop.netlify.app/](https://ai-dailyloop.netlify.app/)
- **Configuration:** Caching headers, PWA MIME types, and single-page routing pre-configured in [`netlify.toml`](./netlify.toml).

---

## 📜 License

MIT License © 2026 [Vikas](https://github.com/vikas-pydev). Built for the IITP-AIMLT-2601 Program.

