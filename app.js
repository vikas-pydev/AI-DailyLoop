/**
 * AI Mastery Lab - Core Application Controller
 * Handles gamification state, localStorage persistence, interactive visualizers,
 * quiz engines, and interview articulation evaluator.
 */

// Initialize or Load State from localStorage
const STORAGE_KEY = "ai_mastery_user_state_v1";

let userState = {
  xp: 0,
  level: 1,
  streak: 1,
  lastLoginDate: new Date().toISOString().split('T')[0],
  unlockedBadges: [],
  completedQuizzes: [],
  completedScenarios: [],
  articulationScores: {},
  agentVisDone: false,
  leakDebugDone: false
};

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  loadUserState();
  checkDailyStreak();
  updateHeaderUI();
  setupTabNavigation();
  renderCurriculum("day1");
  setupRAGVisualizer();
  setupAgentVisualizer();
  setupDataLeakageVisualizer();
  renderQuizzes();
  renderFlashcards();
  setupArticulationStudio();
  renderBadges();
  setupQuests();
});

// Load state
function loadUserState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      userState = { ...userState, ...JSON.parse(saved) };
    } catch (e) {
      console.error("Failed to parse userState", e);
    }
  }
}

function saveUserState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userState));
}

// Daily Streak Handling
function checkDailyStreak() {
  const today = new Date().toISOString().split('T')[0];
  const lastDate = userState.lastLoginDate;

  if (lastDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (lastDate === yesterdayStr) {
      userState.streak += 1;
    } else if (lastDate < yesterdayStr) {
      userState.streak = 1;
    }
    userState.lastLoginDate = today;
    saveUserState();
  }

  if (userState.streak >= 3) {
    unlockBadge("streak_3");
  }
}

// Gamification Engine - Add XP & Level Up
function addXP(amount, sourceInfo = "") {
  userState.xp += amount;
  
  // Calculate Level
  let currentLvl = userState.level;
  let newLvl = currentLvl;
  
  for (let i = APP_DATA.levels.length - 1; i >= 0; i--) {
    if (userState.xp >= APP_DATA.levels[i].minXP) {
      newLvl = APP_DATA.levels[i].level;
      break;
    }
  }

  if (newLvl > currentLvl) {
    userState.level = newLvl;
    showLevelUpModal(newLvl);
    if (newLvl >= 5) unlockBadge("level_5");
  }

  saveUserState();
  updateHeaderUI();
  showToast(`+${amount} XP ${sourceInfo}`);
}

function updateHeaderUI() {
  document.getElementById("streak-count").textContent = userState.streak;
  document.getElementById("user-xp").textContent = userState.xp;
  
  const currentLvlConfig = APP_DATA.levels.find(l => l.level === userState.level) || APP_DATA.levels[0];
  const nextLvlConfig = APP_DATA.levels.find(l => l.level === userState.level + 1);
  
  document.getElementById("user-level-title").textContent = `Lvl ${currentLvlConfig.level}: ${currentLvlConfig.title}`;

  if (nextLvlConfig) {
    const currentMin = currentLvlConfig.minXP;
    const nextMin = nextLvlConfig.minXP;
    const progress = Math.min(100, Math.max(0, ((userState.xp - currentMin) / (nextMin - currentMin)) * 100));
    document.getElementById("xp-progress-fill").style.width = `${progress}%`;
  } else {
    document.getElementById("xp-progress-fill").style.width = `100%`;
  }
}

// Tab Navigation
function setupTabNavigation() {
  const navItems = document.querySelectorAll(".nav-item");
  const tabPanels = document.querySelectorAll(".tab-panel");

  navItems.forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const targetTab = item.getAttribute("data-tab");
      
      navItems.forEach(nav => nav.classList.remove("active"));
      tabPanels.forEach(panel => panel.classList.remove("active"));

      item.classList.add("active");
      const targetPanel = document.getElementById(targetTab);
      if (targetPanel) targetPanel.classList.add("active");
    });
  });
}

// Helper: Format LaTeX Math expressions into clean readable math HTML
function formatLaTeXMath(latex) {
  if (!latex) return "";
  return latex
    .replace(/\\text\{(.*?)\}/g, '$1')
    .replace(/\\frac\{(.*?)\}\{(.*?)\}/g, '($1) / ($2)')
    .replace(/\\cdot/g, '·')
    .replace(/\\times/g, '×')
    .replace(/\\mid/g, '|')
    .replace(/\\dots/g, '...')
    .replace(/\\sum_\{([^}]+)\}\^\{([^}]+)\}/g, '∑($1 to $2)')
    .replace(/\\sqrt\{([^}]+)\}/g, '√($1)')
    .replace(/\\vec\{([^}]+)\}/g, 'vec($1)')
    .replace(/\\\|/g, '||')
    .replace(/\\\\/g, '\n');
}

// Helper: Enhanced Markdown & Math Block Formatter
function formatMarkdownContent(rawText) {
  if (!rawText) return "";

  // 1. Extract code blocks
  const codeBlocks = [];
  let text = rawText.replace(/```([\s\S]*?)```/g, (match, code) => {
    codeBlocks.push(code);
    return `\n\n___CODE_BLOCK_${codeBlocks.length - 1}___\n\n`;
  });

  // 2. Extract block math $$...$$
  const mathBlocks = [];
  text = text.replace(/\$\$([\s\S]*?)\$\$/g, (match, math) => {
    mathBlocks.push(formatLaTeXMath(math.trim()));
    return `\n\n___MATH_BLOCK_${mathBlocks.length - 1}___\n\n`;
  });

  // 3. Extract inline math $...$
  text = text.replace(/\$([^\$\n]+)\$/g, (match, math) => {
    return `<span class="math-inline">${formatLaTeXMath(math)}</span>`;
  });

  // 4. Format bold **text** and italic *text*
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
  text = text.replace(/`([^`]+)`/g, '<span class="math-inline">$1</span>');

  // 5. Split into paragraphs
  const paragraphs = text.split(/\n\s*\n/);
  const formattedParagraphs = paragraphs.map(p => {
    p = p.trim();
    if (!p) return '';
    if (p.includes('___MATH_BLOCK_')) {
      return p.replace(/___MATH_BLOCK_(\d+)___/g, (m, idx) => {
        return `<div class="math-block"><i class="fas fa-square-root-variable" style="color: var(--accent-cyan); margin-right: 0.5rem;"></i>${mathBlocks[parseInt(idx)]}</div>`;
      });
    }
    if (p.includes('___CODE_BLOCK_')) {
      return p.replace(/___CODE_BLOCK_(\d+)___/g, (m, idx) => {
        return `<pre><code>${codeBlocks[parseInt(idx)]}</code></pre>`;
      });
    }
    if (p.startsWith('- ') || p.startsWith('* ')) {
      const items = p.split(/\n/).map(line => line.replace(/^[-*]\s+/, '').trim()).filter(Boolean);
      return `<ul>${items.map(it => `<li>${it}</li>`).join('')}</ul>`;
    }

    return `<p>${p.replace(/\n/g, '<br>')}</p>`;
  });

  return formattedParagraphs.join('');
}

// Render Curriculum Module
function renderCurriculum(dayId) {
  const module = APP_DATA.modules.find(m => m.id === dayId) || APP_DATA.modules[0];
  const selector = document.getElementById("module-selector");
  
  selector.innerHTML = APP_DATA.modules.map(m => `
    <div class="day-chip ${m.id === dayId ? 'active' : ''}" onclick="renderCurriculum('${m.id}')">
      Day ${m.day}: ${m.title.split('&')[0]}
    </div>
  `).join('');

  const contentArea = document.getElementById("module-content-area");
  
  let html = `
    <div class="module-header">
      <span class="module-tag">Day ${module.day} • ${module.readTime}</span>
      <h2 class="module-title-text">${module.title}</h2>
      <p class="card-subtitle">${module.subtitle}</p>
    </div>
  `;

  module.sections.forEach(sec => {
    const formattedContent = formatMarkdownContent(sec.content);
    html += `
      <div class="module-section">
        <h3><i class="fas fa-bookmark" style="color: var(--accent-primary); font-size: 0.95rem;"></i> ${sec.heading}</h3>
        <div class="markdown-body">${formattedContent}</div>
      </div>
    `;
  });

  html += `
    <div class="takeaway-box">
      <h4><i class="fas fa-check-circle"></i> Key Interview Takeaways</h4>
      <ul>
        ${module.keyTakeaways.map(t => `<li>${t}</li>`).join('')}
      </ul>
    </div>
  `;

  contentArea.innerHTML = html;
}

// Visualizer 1: RAG Cosine Similarity Simulator
function setupRAGVisualizer() {
  const queryInput = document.getElementById("rag-query-input");
  const runBtn = document.getElementById("run-rag-sim-btn");
  const stage = document.getElementById("rag-sim-stage");

  const documentPool = [
    { id: 1, title: "HR Policy Manual 2026", text: "Employees are granted 20 days of paid annual leave each year. Up to 5 days can be carried forward." },
    { id: 2, title: "IT Infrastructure Handbook", text: "Password reset requests must be submitted via IT Portal ticket. Overdue tickets escalate after 48 hours." },
    { id: 3, title: "Zepto ML Architecture Spec", text: "Models are trained using leak-free scikit-learn pipelines and 5-fold GridSearchCV with SMOTE class balancing." },
    { id: 4, title: "Security & Secret Key Guidelines", text: "API keys like GROQ_API_KEY must be stored in .env files and excluded from Git using .gitignore." }
  ];

  if (!runBtn) return;

  runBtn.addEventListener("click", () => {
    const query = queryInput.value.toLowerCase().trim();
    if (!query) return;

    stage.innerHTML = `<p style="color: var(--accent-cyan); font-size: 0.9rem;"><i class="fas fa-spinner fa-spin"></i> Generating 384-dim all-MiniLM-L6-v2 embedding & calculating cosine similarity...</p>`;

    setTimeout(() => {
      // Mock Cosine Similarity scoring based on term overlap & semantic distance
      const scoredDocs = documentPool.map(doc => {
        let score = 0.15; // baseline noise
        const words = query.split(/\s+/);
        words.forEach(w => {
          if (w.length > 3 && doc.text.toLowerCase().includes(w)) {
            score += 0.28;
          }
        });
        score = Math.min(0.98, score + Math.random() * 0.1);
        return { ...doc, score: parseFloat(score.toFixed(4)) };
      });

      scoredDocs.sort((a, b) => b.score - a.score);
      const topK = scoredDocs.slice(0, 2);

      let html = `
        <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.8rem;">
          Query Vector: <span style="font-family: var(--font-code); color: var(--accent-primary);">[0.042, -0.198, 0.512, ... (384-dims)]</span>
        </div>
        <h4 style="font-size: 0.95rem; margin-bottom: 0.8rem;">Indexed Documents Ranked by Cosine Similarity:</h4>
      `;

      scoredDocs.forEach((doc, idx) => {
        const isMatched = idx < 2;
        const scoreClass = doc.score > 0.6 ? 'high' : (doc.score > 0.3 ? 'med' : 'low');
        
        html += `
          <div class="chunk-card ${isMatched ? 'matched' : ''}">
            <div>
              <strong style="font-size: 0.85rem; color: ${isMatched ? '#ffffff' : 'var(--text-muted)'};">${doc.title}</strong>
              <p style="font-size: 0.82rem; color: var(--text-muted); margin-top: 0.2rem;">"${doc.text}"</p>
            </div>
            <div class="sim-score ${scoreClass}">
              CosSim: ${doc.score}
            </div>
          </div>
        `;
      });

      html += `
        <div style="margin-top: 1rem; background: rgba(99, 102, 241, 0.15); border: 1px solid var(--accent-primary); padding: 1rem; border-radius: var(--radius-md);">
          <strong style="color: var(--accent-primary); font-size: 0.88rem;"><i class="fas fa-microchip"></i> Constructed LLM Context Prompt (Top-K Chunks):</strong>
          <pre style="margin-top: 0.5rem; font-size: 0.8rem;">System: Answer the question using ONLY context below.
Context:
${topK.map(k => `[Source: ${k.title}] ${k.text}`).join('\n')}

User: ${queryInput.value}</pre>
        </div>
      `;

      stage.innerHTML = html;
      addXP(25, "for testing RAG Simulator");
    }, 600);
  });
}

// Visualizer 2: Agent ReAct Tool Loop Simulator
function setupAgentVisualizer() {
  const stepBtn = document.getElementById("step-agent-btn");
  const stage = document.getElementById("agent-sim-stage");
  if (!stepBtn || !stage) return;

  let step = 0;
  const agentSteps = [
    {
      type: "user",
      text: "User Intent: 'Find my pending IT support tickets and tell me which ones are overdue.'"
    },
    {
      type: "thought",
      text: "Agent Reasoning 1: User wants pending tickets. Need to query the IT ticket database API for user Vikas."
    },
    {
      type: "action",
      text: "Tool Execution: Calling get_user_tickets(user_id='Vikas', status='open')..."
    },
    {
      type: "observation",
      text: "Tool Result: Received 2 tickets: [{id: 104, title: 'VPN Reset', created: '2026-08-10', SLA: '24h'}, {id: 108, title: 'Monitor Stand', created: '2026-08-16', SLA: '72h'}]"
    },
    {
      type: "thought",
      text: "Agent Reasoning 2: Today is 2026-08-17. Ticket #104 (created 2026-08-10 with 24h SLA) is 6 days overdue. Ticket #108 is within SLA. Formulating response."
    },
    {
      type: "final",
      text: "Final Output: 'You have 2 pending IT tickets. Ticket #104 (VPN Reset) is currently overdue by 6 days. Ticket #108 (Monitor Stand) is still within SLA.'"
    }
  ];

  stepBtn.addEventListener("click", () => {
    if (step >= agentSteps.length) {
      step = 0;
      stage.innerHTML = "";
    }

    const currentStep = agentSteps[step];
    const card = document.createElement("div");
    card.style.padding = "0.9rem 1.2rem";
    card.style.borderRadius = "var(--radius-md)";
    card.style.marginBottom = "0.8rem";
    card.style.fontSize = "0.88rem";
    card.style.animation = "fadeIn 0.3s ease";

    if (currentStep.type === "user") {
      card.style.background = "rgba(255, 255, 255, 0.08)";
      card.style.border = "1px solid var(--border-color)";
      card.innerHTML = `<strong><i class="fas fa-user"></i> ${currentStep.text}</strong>`;
    } else if (currentStep.type === "thought") {
      card.style.background = "rgba(99, 102, 241, 0.15)";
      card.style.border = "1px solid var(--accent-primary)";
      card.style.color = "#a5b4fc";
      card.innerHTML = `<i class="fas fa-brain"></i> ${currentStep.text}`;
    } else if (currentStep.type === "action") {
      card.style.background = "rgba(245, 158, 11, 0.15)";
      card.style.border = "1px solid var(--accent-warning)";
      card.style.color = "#fcd34d";
      card.innerHTML = `<i class="fas fa-wrench"></i> ${currentStep.text}`;
    } else if (currentStep.type === "observation") {
      card.style.background = "rgba(6, 182, 212, 0.15)";
      card.style.border = "1px solid var(--accent-cyan)";
      card.style.color = "#67e8f9";
      card.innerHTML = `<i class="fas fa-eye"></i> ${currentStep.text}`;
    } else if (currentStep.type === "final") {
      card.style.background = "rgba(16, 185, 129, 0.2)";
      card.style.border = "1px solid var(--accent-success)";
      card.style.color = "#ffffff";
      card.innerHTML = `<strong><i class="fas fa-check-circle"></i> ${currentStep.text}</strong>`;
    }

    stage.appendChild(card);
    step++;

    if (step === agentSteps.length) {
      if (!userState.agentVisDone) {
        userState.agentVisDone = true;
        unlockBadge("agent_master");
        addXP(50, "for completing Agent ReAct Tool Loop Simulation");
      }
    }
  });
}

// Visualizer 3: Data Leakage Simulator
function setupDataLeakageVisualizer() {
  const leakyBtn = document.getElementById("toggle-leaky-btn");
  const cleanBtn = document.getElementById("toggle-clean-btn");
  const outputStage = document.getElementById("leakage-output-stage");

  if (!leakyBtn || !cleanBtn) return;

  leakyBtn.addEventListener("click", () => {
    outputStage.innerHTML = `
      <div style="background: rgba(239, 68, 68, 0.15); border: 1px solid #ef4444; padding: 1.2rem; border-radius: var(--radius-md);">
        <h4 style="color: #fca5a5; font-size: 1rem;"><i class="fas fa-exclamation-triangle"></i> LEAKY PIPELINE DETECTED</h4>
        <pre style="margin: 0.8rem 0; font-size: 0.8rem;">
# BAD: Preprocessing before train_test_split()
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X) # <--- LEAK! Uses mean/std of ENTIRE dataset

X_train, X_test, y_train, y_test = train_test_split(X_scaled, y)
model.fit(X_train, y_train)</pre>
        <p style="font-size: 0.85rem; color: #fca5a5;">
          <strong>Result:</strong> Cross-Validation F1 Score = <span style="font-family: var(--font-code); font-weight: bold;">0.982 (Artificial)</span><br>
          <strong>Production Result:</strong> Real F1 Score = <span style="font-family: var(--font-code); font-weight: bold;">0.541 (CRASH & BURN)</span>
        </p>
      </div>
    `;
  });

  cleanBtn.addEventListener("click", () => {
    outputStage.innerHTML = `
      <div style="background: rgba(16, 185, 129, 0.15); border: 1px solid var(--accent-success); padding: 1.2rem; border-radius: var(--radius-md);">
        <h4 style="color: var(--accent-success); font-size: 1rem;"><i class="fas fa-shield-alt"></i> LEAK-FREE SKLEARN PIPELINE</h4>
        <pre style="margin: 0.8rem 0; font-size: 0.8rem;">
# GOOD: Pipeline fits scaler ONLY on training folds during CV!
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('clf', RandomForestClassifier())
])

grid = GridSearchCV(pipeline, param_grid, cv=5)
grid.fit(X_train, y_train)</pre>
        <p style="font-size: 0.85rem; color: #ffffff;">
          <strong>Result:</strong> Cross-Validation F1 Score = <span style="font-family: var(--font-code); font-weight: bold; color: var(--accent-success);">0.782 (Honest & Leak-Free)</span><br>
          <strong>Production Result:</strong> Real F1 Score = <span style="font-family: var(--font-code); font-weight: bold; color: var(--accent-success);">0.779 (Stable & Reliable)</span>
        </p>
      </div>
    `;

    if (!userState.leakDebugDone) {
      userState.leakDebugDone = true;
      unlockBadge("leak_hunter");
      addXP(50, "for analyzing Data Leakage Pipelines");
    }
  });
}

// Quizzes & Scenario Challenges
function renderQuizzes() {
  const container = document.getElementById("quiz-list-container");
  if (!container) return;

  let html = `<h3 class="card-title"><i class="fas fa-tasks" style="color: var(--accent-primary);"></i> Daily Concept Quizzes</h3><br>`;

  APP_DATA.quizzes.forEach(q => {
    const isCompleted = userState.completedQuizzes.includes(q.id);
    html += `
      <div class="quiz-card" id="quiz-card-${q.id}">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;">
          <span style="font-size: 0.75rem; color: var(--accent-primary); font-weight: 700; text-transform: uppercase;">Day Quiz</span>
          <span style="font-size: 0.8rem; color: #fbbf24; font-weight: 600;">+${q.xp} XP ${isCompleted ? '✓ Completed' : ''}</span>
        </div>
        <p class="quiz-question-text">${q.question}</p>
        <div class="options-list">
          ${q.options.map((opt, idx) => `
            <div class="quiz-option" onclick="handleQuizAnswer('${q.id}', ${idx})">
              <span style="width: 24px; height: 24px; border-radius: 50%; background: rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: bold;">${String.fromCharCode(65 + idx)}</span>
              <span>${opt}</span>
            </div>
          `).join('')}
        </div>
        <div class="explanation-box" id="explain-${q.id}">
          <strong>Explanation:</strong> ${q.explanation}
        </div>
      </div>
    `;
  });

  html += `<h3 class="card-title" style="margin-top: 2rem;"><i class="fas fa-bug" style="color: var(--accent-pink);"></i> Production Scenario Debugging</h3><br>`;

  APP_DATA.scenarioChallenges.forEach(sc => {
    html += `
      <div class="quiz-card" style="border-color: rgba(236, 72, 153, 0.3);">
        <div class="module-tag" style="background: rgba(236, 72, 153, 0.15); color: var(--accent-pink);">${sc.title}</div>
        <p style="font-size: 0.9rem; color: #e5e7eb; margin: 0.8rem 0;">${sc.context}</p>
        <div style="background: rgba(0,0,0,0.3); border-left: 3px solid var(--accent-pink); padding: 0.8rem; margin-bottom: 1rem; border-radius: 0 8px 8px 0;">
          <strong style="font-size: 0.82rem; color: var(--accent-pink);">Observed Symptoms:</strong>
          <ul style="font-size: 0.82rem; color: var(--text-muted); padding-left: 1.2rem;">
            ${sc.symptoms.map(s => `<li>${s}</li>`).join('')}
          </ul>
        </div>
        <p class="quiz-question-text" style="font-size: 1.05rem;">${sc.question}</p>
        <div class="options-list">
          ${sc.options.map((opt, idx) => `
            <div class="quiz-option" onclick="handleQuizAnswer('${sc.id}', ${idx}, true)">
              <span>${opt}</span>
            </div>
          `).join('')}
        </div>
        <div class="explanation-box" id="explain-${sc.id}">
          <strong>Diagnostic Fix:</strong> ${sc.explanation}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function handleQuizAnswer(quizId, selectedIdx, isScenario = false) {
  const quiz = isScenario 
    ? APP_DATA.scenarioChallenges.find(s => s.id === quizId)
    : APP_DATA.quizzes.find(q => q.id === quizId);

  if (!quiz) return;

  const card = document.getElementById(`quiz-card-${quizId}`) || event.target.closest('.quiz-card');
  const options = card.querySelectorAll('.quiz-option');
  const explainBox = card.querySelector('.explanation-box');

  options.forEach((opt, idx) => {
    opt.style.pointerEvents = "none";
    if (idx === quiz.correctIndex) {
      opt.classList.add("correct");
    } else if (idx === selectedIdx) {
      opt.classList.add("incorrect");
    }
  });

  explainBox.style.display = "block";

  if (selectedIdx === quiz.correctIndex) {
    if (!userState.completedQuizzes.includes(quizId)) {
      userState.completedQuizzes.push(quizId);
      saveUserState();
      addXP(quiz.xp, "for correct quiz response");
      unlockBadge("first_quiz");
    }
  }
}

// Flashcards Controller
let currentFlashcardIdx = 0;
function renderFlashcards() {
  const card = APP_DATA.flashcards[currentFlashcardIdx];
  document.querySelectorAll(".flashcard-front-text").forEach(el => el.textContent = card.front);
  document.querySelectorAll(".flashcard-back-text").forEach(el => el.textContent = card.back);
  document.querySelectorAll(".flashcard-counter").forEach(el => el.textContent = `Card ${currentFlashcardIdx + 1} of ${APP_DATA.flashcards.length}`);
}

function nextFlashcard() {
  document.querySelectorAll(".flashcard-wrapper").forEach(w => w.classList.remove("flipped"));
  currentFlashcardIdx = (currentFlashcardIdx + 1) % APP_DATA.flashcards.length;
  setTimeout(renderFlashcards, 200);
}

function prevFlashcard() {
  document.querySelectorAll(".flashcard-wrapper").forEach(w => w.classList.remove("flipped"));
  currentFlashcardIdx = (currentFlashcardIdx - 1 + APP_DATA.flashcards.length) % APP_DATA.flashcards.length;
  setTimeout(renderFlashcards, 200);
}

// Interview Articulation Studio
let selectedArtQuestion = APP_DATA.articulationQuestions[0];

function setupArticulationStudio() {
  const selector = document.getElementById("articulation-question-select");
  const textarea = document.getElementById("articulation-input");
  const evalBtn = document.getElementById("evaluate-articulation-btn");

  if (!selector) return;

  selector.innerHTML = APP_DATA.articulationQuestions.map((q, i) => `
    <option value="${q.id}">Q${i+1}: ${q.title}</option>
  `).join('');

  selector.addEventListener("change", (e) => {
    selectedArtQuestion = APP_DATA.articulationQuestions.find(q => q.id === e.target.value);
    loadArtQuestion(selectedArtQuestion);
  });

  loadArtQuestion(selectedArtQuestion);

  textarea.addEventListener("input", () => {
    checkArtKeywords(textarea.value, selectedArtQuestion);
  });

  evalBtn.addEventListener("click", () => {
    evaluateArticulation(textarea.value, selectedArtQuestion);
  });
}

function loadArtQuestion(q) {
  document.getElementById("art-prompt-text").textContent = q.prompt;
  document.getElementById("art-category-tag").textContent = q.category;
  document.getElementById("gold-answer-content").textContent = q.goldAnswer;
  document.getElementById("gold-answer-box").style.display = "none";
  document.getElementById("articulation-input").value = "";

  const chipsArea = document.getElementById("art-keyword-chips");
  chipsArea.innerHTML = q.keywords.map(kw => `
    <span class="keyword-chip" id="kw-${kw.replace(/\s+/g, '_')}">${kw}</span>
  `).join('');
}

function checkArtKeywords(text, q) {
  const lowerText = text.toLowerCase();
  q.keywords.forEach(kw => {
    const chip = document.getElementById(`kw-${kw.replace(/\s+/g, '_')}`);
    if (chip) {
      if (lowerText.includes(kw.toLowerCase())) {
        chip.classList.add("detected");
      } else {
        chip.classList.remove("detected");
      }
    }
  });
}

function evaluateArticulation(text, q) {
  if (!text || text.trim().length < 30) {
    alert("Please type or record a substantive answer (at least 2-3 sentences) before evaluating!");
    return;
  }

  const lowerText = text.toLowerCase();
  let detectedCount = 0;
  q.keywords.forEach(kw => {
    if (lowerText.includes(kw.toLowerCase())) detectedCount++;
  });

  const keywordCoverage = Math.round((detectedCount / q.keywords.length) * 100);
  const goldBox = document.getElementById("gold-answer-box");
  goldBox.style.display = "block";

  userState.articulationScores[q.id] = keywordCoverage;
  saveUserState();

  const completedCount = Object.keys(userState.articulationScores).length;
  if (completedCount >= 3) {
    unlockBadge("articulation_pro");
  }

  addXP(q.xp, `for interview articulation attempt (${keywordCoverage}% keyword match)`);
}

// Badges Engine
function unlockBadge(badgeId) {
  if (!userState.unlockedBadges.includes(badgeId)) {
    userState.unlockedBadges.push(badgeId);
    saveUserState();
    const badge = APP_DATA.badges.find(b => b.id === badgeId);
    if (badge) {
      showToast(`🏆 Badge Unlocked: ${badge.title}!`);
    }
    renderBadges();
  }
}

function renderBadges() {
  const container = document.getElementById("badge-gallery-container");
  if (!container) return;

  container.innerHTML = APP_DATA.badges.map(b => {
    const isUnlocked = userState.unlockedBadges.includes(b.id);
    return `
      <div class="badge-card ${isUnlocked ? 'unlocked' : ''}">
        <div class="badge-icon-large">${b.icon}</div>
        <div class="badge-title-text">${b.title}</div>
        <div style="font-size: 0.7rem; color: var(--text-muted);">${b.desc}</div>
      </div>
    `;
  }).join('');
}

function setupQuests() {
  const container = document.getElementById("daily-quests-container");
  if (!container) return;

  container.innerHTML = `
    <div class="quest-card">
      <div class="quest-icon"><i class="fas fa-book-open"></i></div>
      <div class="quest-info">
        <h4>Review Day 1 & Day 2 Concepts</h4>
        <p>Read RAG & AI Engineer mindset modules</p>
      </div>
      <div class="quest-reward">+50 XP</div>
    </div>
    <div class="quest-card">
      <div class="quest-icon"><i class="fas fa-vial"></i></div>
      <div class="quest-info">
        <h4>Test Interactive Visualizers</h4>
        <p>Run RAG Simulator & Agent Loop</p>
      </div>
      <div class="quest-reward">+50 XP</div>
    </div>
    <div class="quest-card">
      <div class="quest-icon"><i class="fas fa-microphone"></i></div>
      <div class="quest-info">
        <h4>Interview Articulation Drill</h4>
        <p>Practice articulating RAG or Data Leakage</p>
      </div>
      <div class="quest-reward">+75 XP</div>
    </div>
  `;
}

// Modals & Notifications
function showLevelUpModal(newLevel) {
  const lvlConfig = APP_DATA.levels.find(l => l.level === newLevel);
  const modal = document.getElementById("level-up-modal");
  document.getElementById("modal-level-num").textContent = newLevel;
  document.getElementById("modal-level-title").textContent = lvlConfig ? lvlConfig.title : "";
  modal.classList.add("active");
  playSynthSound("levelup");
}

function closeModal() {
  document.getElementById("level-up-modal").classList.remove("active");
}

function showToast(msg) {
  const toast = document.createElement("div");
  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.right = "20px";
  toast.style.background = "linear-gradient(135deg, var(--accent-primary), var(--accent-pink))";
  toast.style.color = "#ffffff";
  toast.style.padding = "0.8rem 1.4rem";
  toast.style.borderRadius = "30px";
  toast.style.fontWeight = "600";
  toast.style.fontSize = "0.88rem";
  toast.style.boxShadow = "0 8px 25px rgba(0,0,0,0.4)";
  toast.style.zIndex = "2000";
  toast.style.animation = "popIn 0.3s ease";
  toast.textContent = msg;

  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// Synthesized Web Audio Effects
function playSynthSound(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === "levelup") {
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    }
  } catch (e) {
    // AudioContext fallback
  }
}

// Global Keyboard Navigation
document.addEventListener("keydown", (e) => {
  if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
  if (e.key === "ArrowRight") {
    nextFlashcard();
  } else if (e.key === "ArrowLeft") {
    prevFlashcard();
  } else if (e.key === " ") {
    e.preventDefault();
    document.querySelectorAll(".flashcard-wrapper").forEach(w => w.classList.toggle("flipped"));
  } else if (e.key === "Escape") {
    closeModal();
  }
});

// Register Service Worker for PWA Offline Support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((reg) => console.log('PWA ServiceWorker registered:', reg.scope))
      .catch((err) => console.log('ServiceWorker registration failed:', err));
  });
}

