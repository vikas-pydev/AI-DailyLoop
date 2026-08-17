/**
 * AI Mastery Lab - Comprehensive Dataset
 * Contains curriculum, quizzes, flashcards, interview articulation questions, 
 * badges, levels, and interactive visualizer configs.
 */

const APP_DATA = {
  levels: [
    { level: 1, title: "LLM Explorer", minXP: 0, icon: "🌱" },
    { level: 2, title: "Prompt & API Craftsman", minXP: 150, icon: "⚙️" },
    { level: 3, title: "RAG Practitioner", minXP: 350, icon: "🔍" },
    { level: 4, title: "Vector Search Specialist", minXP: 600, icon: "📐" },
    { level: 5, title: "Agentic Systems Architect", minXP: 950, icon: "🤖" },
    { level: 6, title: "ML Pipeline Engineer", minXP: 1350, icon: "📊" },
    { level: 7, title: "Production Debugger", minXP: 1800, icon: "🛡️" },
    { level: 8, title: "API & Container Deployer", minXP: 2300, icon: "🐳" },
    { level: 9, title: "Enterprise AI Architect", minXP: 2900, icon: "⚡" },
    { level: 10, title: "Principal AI Engineer", minXP: 3600, icon: "👑" }
  ],

  badges: [
    { id: "first_quiz", title: "First Quiz Master", desc: "Complete your first quiz module.", icon: "🎯", condition: "quizzes_1" },
    { id: "streak_3", title: "Consistency Champion", desc: "Maintain a 3-day learning streak.", icon: "🔥", condition: "streak_3" },
    { id: "rag_expert", title: "RAG Whisperer", desc: "Score 100% on the RAG & Embeddings quiz.", icon: "📚", condition: "quiz_day2_perfect" },
    { id: "agent_master", title: "Agent Commander", desc: "Complete the Agent Tool Loop Visualizer.", icon: "🤖", condition: "agent_vis_done" },
    { id: "leak_hunter", title: "Data Leakage Ninja", desc: "Solve the Data Leakage scenario debugging challenge.", icon: "🛡️", condition: "leak_debug_done" },
    { id: "articulation_pro", title: "Interview Silver Tongue", desc: "Complete 3 interview articulation drills with >80% score.", icon: "🎤", condition: "articulation_3" },
    { id: "zepto_hero", title: "Zepto Case Study Ace", desc: "Master the Zepto platform architecture questions.", icon: "🚀", condition: "zepto_done" },
    { id: "level_5", title: "Mid-Level AI Engineer", desc: "Reach Level 5 in the AI Mastery Lab.", icon: "⭐", condition: "level_5" }
  ],

  modules: [
    {
      id: "day1",
      day: 1,
      title: "AI Engineer Role & LLM vs AI Application Architecture",
      subtitle: "Understanding what AI Engineers actually build, token prediction, and system boundaries.",
      readTime: "8 min read",
      summary: "Master the core distinction between training models vs building production AI systems around LLMs.",
      sections: [
        {
          heading: "1. What is an AI Engineer?",
          content: `An **AI Engineer** designs, builds, and integrates AI-powered systems into real-world software applications, ensuring they are **reliable, maintainable, secure, and deployable**.

**The Core Distinction:**
- **AI Researchers:** Focus on training foundation models from scratch, mathematical proofs, model architectures (e.g., Transformer attention heads).
- **AI Engineers:** Focus on model orchestration, RAG pipelines, tool integration, prompt engineering, vector storage, API backends (FastAPI), data validation (Pydantic), evaluation, and containerized deployment (Docker).

**The AI Engineer Skill Triad:**
$$\\text{AI Engineering} = \\text{AI/LLM Concepts} + \\text{Software Engineering} + \\text{Production Operations (DevOps)}$$`
        },
        {
          heading: "2. How an LLM Actually Works (Next-Token Prediction)",
          content: `A Large Language Model (LLM) is an autoregressive model trained on vast text corpora. At its core, it performs **sequential token prediction**:

Given context $C = [t_1, t_2, \\dots, t_k]$, the LLM computes a probability distribution over the vocabulary $V$:
$$P(t_{k+1} \\mid t_1, t_2, \\dots, t_k)$$

**Key Concept to Remember for Interviews:**
An LLM alone is just a prediction function. An **AI Application** wraps that prediction function with business logic, database lookups, tool calling, input/output validation, rate limiting, and observability.`
        },
        {
          heading: "3. Architecture: LLM Model vs AI Application System",
          content: `In an interview, never say: *"I just called the OpenAI/Groq API."* Explain the complete system architecture around it!

\`\`\`
                     +---------------------------------------+
                     |            AI Application             |
                     |                                       |
  [User Request] --->|  FastAPI -> Auth -> Rate Limiter       |
                     |          |                            |
                     |          v                            |
                     |  Prompt Engine + Context Retriever   |
                     |          |                            |
                     |          v                            |
                     |  OpenAI/Groq SDK / Client Call        |---> [Groq / OpenAI API]
                     |          |                            |
                     |          v                            |
  [Structured Answer]<-| Output Validator (Pydantic) + Log   |
                     +---------------------------------------+
\`\`\`

**Config vs LLM Separation:**
- Store secrets (\`GROQ_API_KEY\`) in \`.env\` files (never committed to Git).
- Use a dedicated \`config.py\` (Pydantic Settings / \`python-dotenv\`) and an isolated \`llm.py\` wrapper for separation of concerns.`
        }
      ],
      keyTakeaways: [
        "AI Engineers bridge software engineering and AI capabilities.",
        "LLMs predict next tokens; AI Applications wrap LLMs with state, security, tools, and UI.",
        "Keep credentials isolated in .env and decouple configuration from model wrappers."
      ]
    },

    {
      id: "day2",
      day: 2,
      title: "RAG Architectures, Embeddings & Vector Databases",
      subtitle: "Retrieval-Augmented Generation from raw documents to cosine similarity search.",
      readTime: "12 min read",
      summary: "Learn how to grant LLMs private, dynamic knowledge without expensive retraining.",
      sections: [
        {
          heading: "1. Why RAG? (Retrieval-Augmented Generation)",
          content: `LLMs have two major limitations:
1. **Knowledge Cutoff:** They don't know real-time or recent events.
2. **Private Data Absence:** They lack access to internal enterprise policies (e.g., HR manuals, SQLite DBs).

**RAG Solution:** Retrieve relevant text chunks at runtime and supply them inside the prompt context window!`
        },
        {
          heading: "2. The Complete RAG Pipeline",
          content: `\`\`\`
  Ingestion Phase:
  Documents ---> Chunking (e.g. 500 tokens) ---> Embeddings (all-MiniLM-L6-v2) ---> Vector DB (ChromaDB)

  Query Phase:
  User Query ---> Query Embedding ---> Cosine Similarity Search ---> Top-K Chunks ---> Prompt + Context ---> LLM ---> Grounded Answer + Citations
\`\`\`

**Mathematical Insight - Cosine Similarity:**
Given a query vector $\\vec{q}$ and a document chunk vector $\\vec{d}$, the similarity score is:
$$\\text{Cosine Similarity}(\\vec{q}, \\vec{d}) = \\frac{\\vec{q} \\cdot \\vec{d}}{\\|\\vec{q}\\| \\|\\vec{d}\\|} = \\frac{\\sum_{i=1}^{n} q_i d_i}{\\sqrt{\\sum_{i=1}^{n} q_i^2} \\sqrt{\\sum_{i=1}^{n} d_i^2}}$$`
        },
        {
          heading: "3. Vector Databases & Embeddings in Practice",
          content: `**Embedding Models:** Convert text strings into dense vector representations (e.g. 384 dimensions for \`all-MiniLM-L6-v2\` or 1536 dimensions for OpenAI \`text-embedding-3-small\`).

**Vector Databases (e.g., ChromaDB, Pinecone, Qdrant):**
Optimized for Approximate Nearest Neighbor (ANN) index search (HNSW - Hierarchical Navigable Small World graphs) rather than exact SQL B-tree indexing.`
        }
      ],
      keyTakeaways: [
        "RAG solves knowledge cutoffs and private data boundaries by retrieving dynamic context at inference time.",
        "Cosine similarity measures the angle between high-dimensional dense embeddings.",
        "Chunk size and chunk overlap directly influence retrieval accuracy."
      ]
    },

    {
      id: "day3",
      day: 3,
      title: "AI Agents, Tool Calling & State Machines (LangGraph)",
      subtitle: "Autonomous reasoning, multi-step execution loops, and deterministic graph routing.",
      readTime: "10 min read",
      summary: "Transform static LLMs into proactive agents that execute APIs, search DBs, and handle state.",
      sections: [
        {
          heading: "1. What makes a system an 'AI Agent'?",
          content: `While a basic RAG system is a fixed linear pipeline (Query -> Retrieve -> Generate), an **AI Agent** operates in a **ReAct (Reason + Act) loop**:

\`\`\`
User Intent ---> [LLM Reasoner] ---> Decides Action / Tool Call (e.g. call_weather_api)
                      ^                                    |
                      |                                    v
                 Observe Result <--- Execute Tool <--------+
\`\`\`

**Key Agent Capabilities:**
1. **Planning & Decomposition:** Breaking complex queries into sub-tasks.
2. **Tool Integration:** Executing Python functions, SQL queries, or REST APIs.
3. **Memory & State:** Maintaining multi-turn conversation state.`
        },
        {
          heading: "2. State Graph Architecture (LangGraph / State Machines)",
          content: `In production, purely unconstrained agent loops can loop infinitely or spend excessive tokens.

Using state graphs (like **LangGraph**):
- Define explicit **Nodes** (e.g., \`intent_router\`, \`policy_retriever\`, \`fallback_node\`).
- Define explicit **Edges** with conditional routing logic based on LLM output schemas.`
        }
      ],
      keyTakeaways: [
        "Agents use LLMs to select actions, observe results, and dynamically iterate toward a goal.",
        "Production agents require deterministic guardrails like state machines (LangGraph).",
        "Tool definitions must have strict JSON schemas and descriptive docstrings."
      ]
    },

    {
      id: "day4",
      day: 4,
      title: "ML Engineering: Metrics, Data Leakage & Model Selection",
      subtitle: "Precision vs Recall vs F1, prevent validation contamination, and compare LR vs XGBoost.",
      readTime: "11 min read",
      summary: "Master classical ML pipeline integrity, hyperparameter tuning, and metric tradeoffs.",
      sections: [
        {
          heading: "1. Classification Metrics: Precision, Recall & F1",
          content: `Given a Confusion Matrix (TP, FP, TN, FN):

- **Precision:** Out of all positive predictions, how many were actually positive?
$$\\text{Precision} = \\frac{TP}{TP + FP}$$

- **Recall:** Out of all actual positive cases, how many did the model find?
$$\\text{Recall} = \\frac{TP}{TP + FN}$$

- **F1-Score:** Harmonic mean balancing Precision & Recall.
$$\\text{F1} = 2 \\times \\frac{\\text{Precision} \\times \\text{Recall}}{\\text{Precision} + \\text{Recall}}$$

**Real-world Tradeoff Example:**
- *Medical Diagnosis / Fraud Detection:* High Recall is critical (cost of False Negative is high).
- *Spam Filter:* High Precision is critical (don't send legitimate emails to Spam).`
        },
        {
          heading: "2. What is Data Leakage & How to Prevent It?",
          content: `**Data Leakage** occurs when information from outside the training dataset (e.g. test set or future timestamps) leaks into model training.

**Common Culprits:**
1. Fitting \`StandardScaler()\` or \`SimpleImputer()\` on the full dataset before \`train_test_split()\`.
2. Using target-dependent features calculated over the full history.

**Solution: Leak-Free Scikit-Learn Pipelines**
\`\`\`python
# Correct Leak-Free Setup
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import GridSearchCV

pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('clf', RandomForestClassifier())
])

# Scaler is fitted ONLY on training folds during cross-validation!
grid = GridSearchCV(pipeline, param_grid, cv=5)
grid.fit(X_train, y_train)
\`\`\``
        },
        {
          heading: "3. Logistic Regression vs Tree Ensembles (Random Forest / XGBoost)",
          content: `| Feature | Logistic Regression | Random Forest / XGBoost |
|---|---|---|
| **Model Type** | Linear model | Bagged / Gradient Boosted Trees |
| **Non-linearity** | Requires manual polynomial terms | Handles non-linear interactions automatically |
| **Interpretability** | High (coefficients) | Feature Importance / SHAP values |
| **Overfitting Risk** | Low (with L1/L2 regularization) | Medium-High (tuned via max_depth, n_estimators) |`
        }
      ],
      keyTakeaways: [
        "F1 score is the harmonic mean of precision and recall.",
        "Always scope transformers inside sklearn Pipelines to prevent data leakage during CV.",
        "Use XGBoost for non-linear tabular data, but baseline with Logistic Regression first."
      ]
    },

    {
      id: "day5",
      day: 5,
      title: "Production Deployment & Case Studies (Zepto Platform & EPL)",
      subtitle: "FastAPI, Docker containerization, mock testing, and real project walkthroughs.",
      readTime: "12 min read",
      summary: "Learn how to containerize AI applications, write unit tests, and articulate complex portfolio projects.",
      sections: [
        {
          heading: "1. The Zepto Data & AI Platform Architecture",
          content: `The **Zepto Enterprise Platform** is a gold-standard portfolio project demonstrating end-to-end data, ML, and GenAI capabilities:

\`\`\`
 Data Ingestion          ML Training          GenAI Support System
+--------------+      +-------------+      +-----------------------+
| Scraping     | ---> | SQLite 3NF  | ---> | ChromaDB Embeddings   |
| GBP to INR   |      | Leak-free   |      | LangGraph Router      |
| Normalization|      | GridSearch  |      | FastAPI + Docker      |
+--------------+      +-------------+      +-----------------------+
\`\`\`

**Key Achievements to Cite:**
- 133 scraped datasets normalized into SQLite 3NF schema.
- 891 records classified with leak-free Random Forest (CV F1 = 0.7824).
- RAG support assistant using \`all-MiniLM-L6-v2\` + ChromaDB + 76 automated Pytest suites.`
        },
        {
          heading: "2. Deploying with FastAPI and Docker",
          content: `**Why FastAPI?**
- Asynchronous ASGI performance.
- Automatic Pydantic request validation & Swagger UI docs (\`/docs\`).

**Sample Dockerfile Pattern:**
\`\`\`dockerfile
FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
\`\`\``
        },
        {
          heading: "3. Mocking Dependencies for Deterministic Testing",
          content: `In production AI engineering, unit tests should NOT call live LLM endpoints (avoids cost, rate-limits, and flakiness).

Use environment flags like \`MOCK_LLM=1\` to return mock JSON payloads during pytest runs!`
        }
      ],
      keyTakeaways: [
        "FastAPI delivers high-performance async endpoints with automatic Pydantic validation.",
        "Docker ensures reproducibility across local development and cloud production environments.",
        "Mock external LLM APIs during testing to ensure deterministic, fast CI/CD pipelines."
      ]
    }
  ],

  quizzes: [
    {
      id: "q1",
      dayId: "day1",
      question: "Which of the following best describes the primary responsibility of an AI Engineer compared to an AI Researcher?",
      options: [
        "AI Engineers prove convergence theorems and train 70B parameter models from raw scratch.",
        "AI Engineers build reliable, deployable systems around models using software engineering, RAG, APIs, and databases.",
        "AI Engineers only write prompts in ChatGPT web UI.",
        "AI Engineers focus exclusively on GPU kernel optimizations in CUDA C++."
      ],
      correctIndex: 1,
      explanation: "AI Engineers integrate models into reliable software products using APIs, databases, RAG pipelines, state management, and deployment tools.",
      xp: 50
    },
    {
      id: "q2",
      dayId: "day1",
      question: "What is the core conceptual prediction function performed by an LLM during generation?",
      options: [
        "Predicting the exact SQL query to run against a database.",
        "Predicting the next token sequentially based on previous context tokens.",
        "Calculating the exact accuracy score of the prompt.",
        "Translating Python code to C++ binary."
      ],
      correctIndex: 1,
      explanation: "An LLM is an autoregressive token predictor: given context tokens, it computes the probability distribution for the next token.",
      xp: 50
    },
    {
      id: "q3",
      dayId: "day2",
      question: "In a RAG system, why do we calculate the Cosine Similarity between query vectors and chunk vectors?",
      options: [
        "To compress the text size before passing to the LLM.",
        "To check if the query has correct grammatical syntax.",
        "To measure semantic closeness regardless of exact keyword matching.",
        "To encrypt the documents stored in ChromaDB."
      ],
      correctIndex: 2,
      explanation: "Cosine similarity measures the angle between dense vector embeddings, capturing semantic similarity even when different words are used.",
      xp: 50
    },
    {
      id: "q4",
      dayId: "day3",
      question: "What distinguishes an AI Agent from a standard linear RAG pipeline?",
      options: [
        "An AI Agent uses a smaller LLM model.",
        "An AI Agent operates in a ReAct loop: reasoning, invoking tools, observing output, and updating state.",
        "An AI Agent does not require any prompts.",
        "An AI Agent is written in C++ instead of Python."
      ],
      correctIndex: 1,
      explanation: "Agents use an LLM inside an iterative loop to make decisions, invoke external tools/APIs, observe results, and drive toward completing a goal.",
      xp: 50
    },
    {
      id: "q5",
      dayId: "day4",
      question: "Why should you fit data transformers (like StandardScaler) inside a scikit-learn Pipeline during cross-validation?",
      options: [
        "To make the code run 10x faster.",
        "To prevent Data Leakage by ensuring transformers fit only on training folds and not validation/test data.",
        "Because scikit-learn errors out without a pipeline.",
        "To automatically convert tabular data into text embeddings."
      ],
      correctIndex: 1,
      explanation: "Fitting transformers before cross-validation leaks statistics (mean, variance) from validation folds into training, artificially inflating performance scores.",
      xp: 50
    },
    {
      id: "q6",
      dayId: "day4",
      question: "If a medical diagnostic model has high Precision but low Recall, what is the major risk in production?",
      options: [
        "The model will classify non-sick people as sick.",
        "The model will miss actual sick patients (high False Negatives).",
        "The model will crash the FastAPI server.",
        "The model will take too long to infer."
      ],
      correctIndex: 1,
      explanation: "Recall measures TP / (TP + FN). Low recall means many positive cases (sick patients) are incorrectly flagged as negative (False Negatives).",
      xp: 50
    },
    {
      id: "q7",
      dayId: "day5",
      question: "Why is environment flag mock testing (e.g. MOCK_LLM=1) critical for CI/CD unit tests?",
      options: [
        "Because external LLMs don't support HTTP requests.",
        "It prevents API costs, avoids network latency/flakiness, and ensures fast deterministic test runs.",
        "Because Docker containers cannot access the internet.",
        "It trains the LLM during test execution."
      ],
      correctIndex: 1,
      explanation: "Mocking external LLM dependencies keeps unit test suites fast, cheap, and immune to API rate limits or third-party outages.",
      xp: 50
    }
  ],

  scenarioChallenges: [
    {
      id: "scenario1",
      title: "Case Study: The Hallucinating Policy Bot",
      context: "Your internal enterprise RAG chatbot for HR policies is giving incorrect answers about annual leave rollover. The prompt instructs the LLM to 'Use only the provided context'.",
      symptoms: [
        "User asked: 'How many days of leave can I carry forward?'",
        "Retrieved context chunk: 'Employees get 20 days paid leave annually.' (Doesn't mention carry forward).",
        "LLM output: 'You can carry forward up to 5 days of annual leave.'"
      ],
      question: "As an AI Engineer, what is the root cause and the most effective system fix?",
      options: [
        "The LLM model is fundamentally broken; immediately fine-tune a Llama-3 70B model.",
        "The retrieval component failed to fetch the actual carry-forward policy chunk. Fix chunking/overlap strategy and adjust embedding similarity thresholds or top-K.",
        "Increase the LLM temperature parameter to 1.5.",
        "Delete ChromaDB and use an SQLite exact string match query instead."
      ],
      correctIndex: 1,
      explanation: "RAG failure #1 is poor retrieval. If the retrieved context doesn't contain the answer, even a well-prompted LLM will either hallucinate or fail. Fix chunking, metadata filtering, top-K, or reranking first!",
      xp: 100
    },
    {
      id: "scenario2",
      title: "Case Study: Production Model Performance Crash",
      context: "In your Zepto ML project, your Random Forest classifier scored 0.96 accuracy during local training, but dropped to 0.58 accuracy when deployed in production behind FastAPI.",
      symptoms: [
        "Training used full dataset preprocessing prior to splitting.",
        "Production inputs contain un-scaled currency numerical values (raw GBP instead of converted INR).",
        "Feature names in FastAPI payload were slightly misspelled."
      ],
      question: "Which two factors caused this classic production failure?",
      options: [
        "FastAPI is slower than Flask.",
        "Data Leakage during training (giving false confidence) + Training-Serving Skew (unconverted GBP currency input).",
        "Overfitting caused by using Python 3.10 instead of 3.8.",
        "ChromaDB index corruption."
      ],
      correctIndex: 1,
      explanation: "Data leakage gave an unrealistically high validation score, and training-serving skew (serving un-normalized currency values) broke model predictions at runtime.",
      xp: 100
    }
  ],

  flashcards: [
    { id: "f1", front: "What is RAG?", back: "Retrieval-Augmented Generation: Retrieving external relevant data chunks at query time and feeding them as context to an LLM." },
    { id: "f2", front: "Formula for Precision", back: "Precision = TP / (TP + FP)\nMeasures out of predicted positives, how many are true positives." },
    { id: "f3", front: "Formula for Recall", back: "Recall = TP / (TP + FN)\nMeasures out of actual positive cases, how many were correctly retrieved." },
    { id: "f4", front: "Formula for F1 Score", back: "F1 = 2 * (Precision * Recall) / (Precision + Recall)\nHarmonic mean balancing Precision and Recall." },
    { id: "f5", front: "What is Cosine Similarity?", back: "Cos Sim(A, B) = (A · B) / (||A|| ||B||)\nMeasures the cosine of the angle between two embedding vectors in space." },
    { id: "f6", front: "Random Forest vs XGBoost", back: "Random Forest = Bagging (trees built in parallel independently).\nXGBoost = Boosting (trees built sequentially to correct residual errors)." },
    { id: "f7", front: "Why use scikit-learn Pipelines?", back: "To bundle transformers and estimators, ensuring preprocessing parameters (like mean/std) are calculated strictly on training folds to prevent Data Leakage." },
    { id: "f8", front: "What is ReAct in AI Agents?", back: "Reason + Act loop: The agent reasons about user input, invokes a tool/API, observes the output, and iterates until goal completion." }
  ],

  articulationQuestions: [
    {
      id: "art1",
      title: "Q1. Tell me about yourself and your background in AI/ML.",
      category: "Behavioral & Positioning",
      prompt: "Structure your answer using: Role -> Core Capabilities -> Hands-on Portfolio Projects (Zepto / EPL) -> Target Role.",
      keywords: ["AI/ML Engineer", "machine learning lifecycle", "Zepto", "EPL Prediction", "RAG", "ChromaDB", "FastAPI", "Docker"],
      goldAnswer: `“I'm an AI/ML Engineer with hands-on experience across the machine learning lifecycle, from data preprocessing and feature engineering to model training, evaluation, and containerized deployment.

In my portfolio projects, I developed the Zepto Data & AI Platform, an end-to-end system where I built leak-free ML pipelines, normalized scraped data into SQLite 3NF, and built a RAG support assistant using all-MiniLM-L6-v2 embeddings, ChromaDB vector storage, and a LangGraph router exposed via FastAPI and containerized with Docker.

I also built an EPL Prediction System with 5 modular statistical predictors. I'm targeting AI/ML engineering roles where I can combine machine learning fundamentals with scalable software engineering and GenAI systems.”`,
      xp: 75
    },
    {
      id: "art2",
      title: "Q2. Walk me through your RAG system architecture and how you built it.",
      category: "GenAI & RAG Deep Dive",
      prompt: "Explain document ingestion -> chunking -> vector embeddings -> similarity search -> context prompt -> LLM generation.",
      keywords: ["embeddings", "all-MiniLM-L6-v2", "ChromaDB", "cosine similarity", "chunking", "context", "grounded answer", "LangGraph"],
      goldAnswer: `“My RAG system ingests internal policy documents, breaks them into overlapping text chunks, and computes 384-dimensional dense vector embeddings using all-MiniLM-L6-v2.

These embeddings are indexed in ChromaDB. When a user submits a query, the system generates a query embedding and executes a cosine similarity search to retrieve the top-K relevant chunks.

We pass these retrieved chunks into the prompt context window of the LLM, instructing it to produce a grounded response with source citations. I also implemented a LangGraph intent router to steer non-policy queries to appropriate handlers, and exposed the pipeline through async FastAPI endpoints.”`,
      xp: 75
    },
    {
      id: "art3",
      title: "Q3. What is Data Leakage and how did you prevent it in your ML pipeline?",
      category: "ML Engineering Integrity",
      prompt: "Define leakage, explain its impact on validation scores, and detail how sklearn Pipeline + GridSearchCV prevented it.",
      keywords: ["data leakage", "training-serving skew", "validation score", "scikit-learn pipeline", "GridSearchCV", "fit_transform", "training fold"],
      goldAnswer: `“Data leakage occurs when information from outside the training dataset—such as test sets or validation folds—accidentally influences the training process. This leads to artificially inflated validation metrics that collapse in production.

To prevent this in my Zepto ML project, I built strict scikit-learn Pipelines where feature scaling and imputation were encapsulated alongside the estimator.

During 5-fold GridSearchCV hyperparameter tuning, preprocessing parameters were computed exclusively on the training folds for each split, guaranteeing that validation folds remained completely unseen until evaluation.”`,
      xp: 75
    },
    {
      id: "art4",
      title: "Q4. How do Precision, Recall, and F1-score differ, and when would you optimize for each?",
      category: "Evaluation Metrics",
      prompt: "Define equations, explain True Positives / False Positives / False Negatives, and give real-world scenario examples.",
      keywords: ["Precision", "Recall", "F1-score", "harmonic mean", "False Positive", "False Negative", "tradeoff"],
      goldAnswer: `“Precision measures the ratio of True Positives over all predicted positives (TP / (TP + FP)), focusing on minimizing False Positives. We optimize for Precision in applications like spam filtering, where misclassifying a legitimate email as spam is costly.

Recall measures True Positives over all actual positives (TP / (TP + FN)), focusing on minimizing False Negatives. We optimize for Recall in medical diagnosis or fraud detection, where missing an actual positive case has severe consequences.

F1-score is the harmonic mean of Precision and Recall, providing a balanced single metric when both False Positives and False Negatives carry significant weight.”`,
      xp: 75
    }
  ]
};
