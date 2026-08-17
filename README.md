# ⚡ AI Mastery Lab - Daily AI Engineer Accelerator & Interview Studio

[![License: MIT](https://img.shields.io/badge/License-MIT-indigo.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/your-username/ai-mastery-lab)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-emerald.svg)](sw.js)
[![Stack](https://img.shields.io/badge/Tech-HTML5%20%7C%20CSS3%20%7C%20JS-pink.svg)](index.html)

**AI Mastery Lab** is a gamified, interactive web application built to help aspiring **AI Engineers, GenAI Engineers, and Applied ML Engineers** master production concepts, run interactive system visualizers, test their knowledge with real-world scenario debugging, and practice articulating technical responses for interviews.

---

## 🌟 Key Features & Highlights

### 1. 🏆 Gamified Progress & Level System
- **Daily Streak Engine (🔥):** Tracks consecutive daily check-ins with exponential streak XP multipliers.
- **10 Level Ranks:** Progress from *Level 1: LLM Explorer* up to *Level 10: Principal AI Engineer*.
- **Daily Quests & Missions:** Complete 3 daily missions (Study Curriculum, Run Simulators, Practice Articulation).
- **Unlockable Badges & Achievements:** Earn 8 unique badges (*RAG Whisperer*, *Data Leakage Ninja*, *Agent Commander*, *Interview Silver Tongue*).
- **LocalStorage Persistence:** 100% offline progress saving across browser restarts.

---

### 2. 📇 Flashcard Spaced Repetition (Dashboard & Quiz Tab)
- Interactive 3D flip card deck directly embedded on the **Daily Dashboard**.
- Quick recall practice on core formulas: **Precision**, **Recall**, **F1-Score**, **Cosine Similarity**, **ReAct Loops**, and **Scikit-Learn Pipelines**.
- Supports keyboard navigation (Left/Right Arrow keys to cycle, Spacebar to flip card).

---

### 3. 📚 Enhanced Daily Knowledge Hub (Days 1–5)
- **Day 1: AI Engineer Role & LLM vs AI Application Architecture** — Token prediction mechanics, model boundaries vs AI applications, API key security, and `.env` isolation.
- **Day 2: RAG Architectures, Embeddings & Vector Databases** — Chunking strategies, `all-MiniLM-L6-v2` dense embeddings, Cosine Similarity equations, HNSW index search, and ChromaDB integration.
- **Day 3: AI Agents, Tool Calling & State Machines (LangGraph)** — ReAct (Reason + Act) tool loops, Pydantic schemas, and state-machine graph routing.
- **Day 4: ML Engineering: Metrics, Data Leakage & Model Selection** — Precision vs Recall vs F1 tradeoffs, preventing cross-validation data leakage using `sklearn.pipeline.Pipeline`, and Logistic Regression vs XGBoost/Random Forest.
- **Day 5: Production Deployment & Case Studies (Zepto Platform & EPL)** — Walkthrough of the Zepto Enterprise AI Platform (133 scraped datasets, 891 records, 3NF SQLite, CV F1 = 0.7824, 76 Pytest suites, FastAPI, Docker, and `MOCK_LLM=1` offline testing).

---

### 4. 🎛️ Live Interactive Simulators
- **RAG Vector Search Simulator:** Input custom queries, view 384-dimensional vector embeddings, compute Cosine Similarity scores, sort document chunks dynamically, and inspect constructed LLM context prompts.
- **AI Agent ReAct Tool Loop Simulator:** Step-by-step interactive execution of User Goal $\rightarrow$ Thought $\rightarrow$ Tool Action (`get_user_tickets`) $\rightarrow$ Observation $\rightarrow$ Final Output.
- **Data Leakage Visualizer:** Side-by-side comparison of a Leaky Pipeline (scaling full dataset before CV split leading to fake 0.98 F1 and production crash) vs a Leak-Free Sklearn Pipeline (scaling strictly inside training folds resulting in stable 0.78 F1).

---

### 5. 🎤 Interview Articulation Studio
- **Top Interview Prompts:** Includes high-priority questions (*Tell me about yourself*, *Walk me through your RAG system*, *What is Data Leakage?*, *Precision vs Recall vs F1*).
- **Real-Time Keyword Analyzer:** Scans answer text in real time and lights up detected key concept chips (`ChromaDB`, `all-MiniLM-L6-v2`, `scikit-learn pipeline`, `F1-score`).
- **Gold Standard Comparison:** Reveals comprehensive interview model answers and provides structure scoring (Problem $\rightarrow$ Solution $\rightarrow$ Result).

---

## 🏗️ System Architecture

### RAG Pipeline Mechanics
```
[User Query] ---> [Query Embedding (all-MiniLM-L6-v2)]
                         |
                         v
              [Cosine Similarity Search] <--- [ChromaDB Chunks]
                         |
                         v
                 [Top-K Context]
                         |
                         v
             [LLM Grounded Answer + Citations]
```

### Agent ReAct Loop Execution
```
User Goal ---> [LLM Reasoner] ---> Decides Tool Call (e.g. call_api)
                    ^                         |
                    |                         v
               Observe Result <--- Execute Function
```

---

## 🚀 Quick Start & Local Setup

### Option 1: Direct File Launch
Simply open [`index.html`](index.html) in your browser! Zero dependencies required.

### Option 2: Running via NPM Server
```bash
# Clone the repository
git clone https://github.com/your-username/ai-mastery-lab.git
cd ai-mastery-lab

# Start local server
npm install
npm start
```
Open **`http://localhost:8080`** in your browser.

---

## 📲 Progressive Web App (PWA) Offline Support

AI Mastery Lab includes a built-in Service Worker (`sw.js`) and Web Manifest (`manifest.json`). You can install it as a native desktop or mobile application and learn completely offline anywhere!

---

## 🛡️ Target Roles & Career Positioning

This laboratory is specifically tailored for engineers aiming for roles such as:
- **AI Engineer / LLM Engineer**
- **Generative AI Application Engineer**
- **Applied Machine Learning Engineer**
- **GenAI Solutions Architect**

---

## 📄 License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and contribute!
