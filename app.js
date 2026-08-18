/**
 * AI Mastery Lab - Core Application Controller
 * Full IITP-AIMLT-2601 Exam Accelerator & Interactive Studio
 * Features:
 * - 46 Curriculum Topics with Track Filtering, Search, LaTeX Math, and Self-Tests
 * - Formula Revision Matrix with Tag Filters
 * - Searchable Key Terms Directory (~150+ terms)
 * - 9 Interactive Simulators (RAG, Agent, Data Leakage, Confusion Matrix, Sigmoid, Decision Trees, SQL Joins, K-Means, LangGraph)
 * - 46+ Flashcards Spaced Repetition Engine
 * - Timed Mock Exam Simulator (10 Qs) with Timer & Score Report
 * - Interview & Exam Articulation Studio with Real-time Keyword Detector
 * - Gamification (Daily Streak, 10 Ranks, XP, Unlockable Badges)
 */

const STORAGE_KEY = "ai_mastery_iitp_v2";

let userState = {
  xp: 0,
  level: 1,
  streak: 1,
  lastLoginDate: new Date().toISOString().split('T')[0],
  completedTopics: [],
  completedQuizzes: [],
  unlockedBadges: [],
  articulationScores: {},
  examHighScore: 0,
  agentVisDone: false,
  leakDebugDone: false,
  lastStudiedTopic: "topic1",

  // Phase 5 Adaptive Engine State
  topicMastery: {},
  mistakes: {},
  attemptHistory: [],
  flashcardSRS: {},
  dailyLoop: {
    lastCompletedDate: null,
    completedDates: [],
    sessionsCompleted: 0
  }
};

// Global Interactive Simulator States
let currentTopicId = "topic1";
let currentTrackFilter = "all";
let currentFormulaTag = "all";
let currentFlashcardDeck = [...APP_DATA.flashcards];
let currentFlashcardIdx = 0;
let agentStep = 0;
let kmeansStep = 0;

// Mock Exam State
let examQuestions = [];
let currentExamIdx = 0;
let examUserAnswers = [];
let examTimer = null;
let examSecondsRemaining = 300; // 5 minutes

// Initialize on DOM Load
document.addEventListener("DOMContentLoaded", () => {
  loadUserState();
  checkDailyStreak();
  updateHeaderUI();
  setupTabNavigation();
  
  // Dashboard & Tracks
  renderDashboardTracks();
  setupQuests();
  renderFlashcards();
  renderMobileHomeSummary();
  
  // Curriculum (46 Topics)
  renderTrackFilterBar();
  renderTopicSidebar();
  renderTopicContent(userState.lastStudiedTopic || currentTopicId);
  setupTopicSearch();

  // Formula Matrix & Key Terms
  renderFormulaMatrix();
  renderKeyTerms();
  setupTermsSearch();

  // 9 Interactive Visualizers
  setupRAGVisualizer();
  setupAgentVisualizer();
  setupDataLeakageVisualizer();
  updateConfusionMatrix();
  updateSigmoidSimulator();
  calculateTreeImpurity();
  showSQLJoin('inner');
  resetKMeans();
  runLangGraphRouter();

  // Quizzes & Flashcards
  renderQuizzes();
  setupArticulationStudio();
  renderBadges();

  // Keyboard navigation for flashcards
  document.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
    if (e.code === "Space") {
      e.preventDefault();
      document.querySelectorAll(".flashcard-wrapper").forEach(w => w.classList.toggle('flipped'));
    } else if (e.code === "ArrowRight") {
      nextFlashcard();
    } else if (e.code === "ArrowLeft") {
      prevFlashcard();
    }
  });
});

// State Persistence
function loadUserState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      userState = {
        ...userState,
        ...parsed,
        lastStudiedTopic: (parsed && parsed.lastStudiedTopic) ? parsed.lastStudiedTopic : "topic1",
        topicMastery: (parsed && parsed.topicMastery && typeof parsed.topicMastery === "object") ? parsed.topicMastery : {},
        mistakes: (parsed && parsed.mistakes && typeof parsed.mistakes === "object") ? parsed.mistakes : {},
        attemptHistory: (parsed && Array.isArray(parsed.attemptHistory)) ? parsed.attemptHistory : [],
        flashcardSRS: (parsed && parsed.flashcardSRS && typeof parsed.flashcardSRS === "object") ? parsed.flashcardSRS : {},
        dailyLoop: (parsed && parsed.dailyLoop && typeof parsed.dailyLoop === "object") ? {
          lastCompletedDate: parsed.dailyLoop.lastCompletedDate || null,
          completedDates: Array.isArray(parsed.dailyLoop.completedDates) ? parsed.dailyLoop.completedDates : [],
          sessionsCompleted: parsed.dailyLoop.sessionsCompleted || 0
        } : {
          lastCompletedDate: null,
          completedDates: [],
          sessionsCompleted: 0
        }
      };
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
  const streakEl = document.getElementById("streak-count");
  const xpEl = document.getElementById("user-xp");
  const lvlTitleEl = document.getElementById("user-level-title");
  const fillEl = document.getElementById("xp-progress-fill");

  // Mobile Header & Drawer stats
  const mobileStreakEl = document.getElementById("mobile-header-streak");
  const drawerLevelEl = document.getElementById("drawer-user-level");
  const drawerXPEl = document.getElementById("drawer-user-xp");
  const drawerStreakEl = document.getElementById("drawer-user-streak");

  if (streakEl) streakEl.textContent = userState.streak;
  if (mobileStreakEl) mobileStreakEl.textContent = userState.streak;
  if (xpEl) xpEl.textContent = userState.xp;
  
  const currentLvlConfig = APP_DATA.levels.find(l => l.level === userState.level) || APP_DATA.levels[0];
  const nextLvlConfig = APP_DATA.levels.find(l => l.level === userState.level + 1);
  
  if (lvlTitleEl) lvlTitleEl.textContent = `Lvl ${currentLvlConfig.level}: ${currentLvlConfig.title}`;
  if (drawerLevelEl) drawerLevelEl.textContent = `Lvl ${currentLvlConfig.level}: ${currentLvlConfig.title}`;
  if (drawerXPEl) drawerXPEl.textContent = userState.xp;
  if (drawerStreakEl) drawerStreakEl.textContent = userState.streak;

  if (fillEl) {
    if (nextLvlConfig) {
      const currentMin = currentLvlConfig.minXP;
      const nextMin = nextLvlConfig.minXP;
      const progress = Math.min(100, Math.max(0, ((userState.xp - currentMin) / (nextMin - currentMin)) * 100));
      fillEl.style.width = `${progress}%`;
    } else {
      fillEl.style.width = `100%`;
    }
  }
}

// Main Navigation Sidebar Toggle (Expanded <-> Collapsed <-> Hidden on Desktop)
let sidebarState = "expanded"; // "expanded", "collapsed", "hidden"

function applySidebarState() {
  const layout = document.querySelector(".main-layout");
  if (!layout) return;

  layout.classList.remove("sidebar-collapsed", "sidebar-hidden");
  if (sidebarState === "collapsed") {
    layout.classList.add("sidebar-collapsed");
  } else if (sidebarState === "hidden") {
    layout.classList.add("sidebar-hidden");
  }
}

function toggleMainSidebar() {
  if (sidebarState === "expanded") {
    sidebarState = "collapsed";
    showToast("Sidebar: Compact Icon Mode");
  } else if (sidebarState === "collapsed") {
    sidebarState = "hidden";
    showToast("Sidebar: Hidden (Full Screen Width)");
  } else {
    sidebarState = "expanded";
    showToast("Sidebar: Fully Expanded");
  }
  applySidebarState();
}

// Unified Tab Navigation (Shared across Desktop Sidebar, Mobile Bottom Nav & Drawer)
function switchTab(tabId) {
  if (!tabId) return;

  const tabPanels = document.querySelectorAll(".tab-panel");
  const desktopNavItems = document.querySelectorAll(".sidebar .nav-item");
  const bottomNavItems = document.querySelectorAll(".bottom-nav-item");
  const drawerNavItems = document.querySelectorAll(".drawer-nav-item");

  // Sync Desktop Sidebar Active State
  desktopNavItems.forEach(item => {
    if (item.getAttribute("data-tab") === tabId) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  // Sync Mobile Bottom Nav Active State
  bottomNavItems.forEach(item => {
    if (item.getAttribute("data-bottom-tab") === tabId) {
      item.classList.add("active");
      item.setAttribute("aria-current", "page");
    } else {
      item.classList.remove("active");
      item.removeAttribute("aria-current");
    }
  });

  // Sync Mobile Drawer Active State
  drawerNavItems.forEach(item => {
    if (item.getAttribute("data-drawer-tab") === tabId) {
      item.classList.add("active");
      item.setAttribute("aria-current", "page");
    } else {
      item.classList.remove("active");
      item.removeAttribute("aria-current");
    }
  });

  // Switch Active Tab Panel
  tabPanels.forEach(panel => {
    if (panel.id === tabId) {
      panel.classList.add("active");
    } else {
      panel.classList.remove("active");
    }
  });

  // Dynamic panel refresh hook
  if (tabId === "tab-dashboard") {
    renderMobileHomeSummary();
  }

  // Close Mobile Drawer if open
  closeMobileDrawer();

  // Scroll smoothly to top of the view
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Mobile Drawer Controls
function openMobileDrawer() {
  const drawer = document.getElementById("mobile-drawer");
  const overlay = document.getElementById("mobile-drawer-overlay");
  const triggerBtn = document.getElementById("mobile-drawer-btn");

  if (drawer) drawer.classList.add("active");
  if (overlay) overlay.classList.add("active");
  if (triggerBtn) triggerBtn.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden"; // Prevent background page scroll while drawer is open

  // Push history state so browser back button closes the drawer
  try {
    history.pushState({ drawerOpen: true }, "");
  } catch (e) {
    // Non-blocking fallback
  }
}

function closeMobileDrawer() {
  const drawer = document.getElementById("mobile-drawer");
  const overlay = document.getElementById("mobile-drawer-overlay");
  const triggerBtn = document.getElementById("mobile-drawer-btn");

  if (drawer) drawer.classList.remove("active");
  if (overlay) overlay.classList.remove("active");
  if (triggerBtn) triggerBtn.setAttribute("aria-expanded", "false");
  document.body.style.overflow = ""; // Restore page scrolling
}

function toggleMobileDrawer() {
  const drawer = document.getElementById("mobile-drawer");
  if (drawer && drawer.classList.contains("active")) {
    closeMobileDrawer();
  } else {
    openMobileDrawer();
  }
}

// Tab Navigation Setup & Accessibility Event Listeners
function setupTabNavigation() {
  applySidebarState();

  // Attach click listener to desktop sidebar items
  const desktopNavItems = document.querySelectorAll(".sidebar .nav-item");
  desktopNavItems.forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const targetTab = item.getAttribute("data-tab");
      if (targetTab) switchTab(targetTab);
    });
  });

  // Keyboard accessibility: Escape key closes drawer
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const drawer = document.getElementById("mobile-drawer");
      if (drawer && drawer.classList.contains("active")) {
        closeMobileDrawer();
      }
    }
  });

  // Browser Back button integration: Close drawer on back
  window.addEventListener("popstate", (e) => {
    const drawer = document.getElementById("mobile-drawer");
    if (drawer && drawer.classList.contains("active")) {
      closeMobileDrawer();
    }
  });
}

// -------------------------------------------------------------
// CENTRAL RESULT PIPELINE, MASTERY & XP REWARDS (PHASE 5)
// -------------------------------------------------------------

const awardedXPEvents = new Set();

/**
 * Idempotent XP awarding helper. Prevents duplicate rewards for the same content interaction.
 */
function awardXPOnce(eventKey, amount, reason) {
  if (awardedXPEvents.has(eventKey)) return;
  awardedXPEvents.add(eventKey);
  addXP(amount, reason);
}

/**
 * Deterministic Topic Mastery Calculation (0–100%)
 * 
 * Formula:
 * - Base completion in curriculum: +40 pts
 * - Accuracy on quiz questions for this topic in attemptHistory: up to +40 pts (accuracy * 40)
 * - Flashcard SRS mastery (Good/Easy ratings): up to +20 pts
 * - Active unresolved mistakes in Mistake Bank: -15 pts per active mistake
 * Result is clamped to [0, 100].
 */
function calculateTopicMastery(topicId) {
  let score = 0;
  
  // 1. Topic completion signal (40 pts)
  if (userState.completedTopics && userState.completedTopics.includes(topicId)) {
    score += 40;
  }

  // 2. Quiz accuracy signal (up to 40 pts)
  const topicAttempts = (userState.attemptHistory || []).filter(a => a.topicId === topicId && (a.contentType === "mcq" || a.contentType === "quiz"));
  if (topicAttempts.length > 0) {
    const correctCount = topicAttempts.filter(a => a.correct).length;
    const accuracy = correctCount / topicAttempts.length;
    score += Math.round(accuracy * 40);
  } else if (userState.completedTopics && userState.completedTopics.includes(topicId)) {
    score += 20; // Fallback credit if marked complete without quiz records
  }

  // 3. Flashcard SRS signal (up to 20 pts)
  const topicCards = APP_DATA.flashcards.filter(f => {
    const mod = APP_DATA.modules.find(m => m.id === topicId);
    return mod && f.track === mod.track;
  });
  if (topicCards.length > 0) {
    let masteredCards = 0;
    topicCards.forEach(c => {
      const srs = userState.flashcardSRS ? userState.flashcardSRS[c.id] : null;
      if (srs && (srs.lastRating === "Good" || srs.lastRating === "Easy")) {
        masteredCards++;
      }
    });
    const cardRatio = masteredCards / topicCards.length;
    score += Math.round(cardRatio * 20);
  }

  // 4. Mistake deduction (-15 pts per active unresolved mistake)
  if (userState.mistakes) {
    Object.values(userState.mistakes).forEach(m => {
      if (m.topicId === topicId && !m.resolved) {
        score -= 15;
      }
    });
  }

  return Math.max(0, Math.min(100, score));
}

/**
 * Central Learning Result Pipeline
 * Processes any learning event (MCQ, flashcard, scenario, articulation, topic) and
 * updates attempts, mistakes, SRS schedules, mastery, and streak.
 */
function recordLearningResult({ contentId, contentType, topicId, correct, rating = null }) {
  const timestamp = new Date().toISOString();

  // 1. Record bounded attempt history (max 50)
  if (!userState.attemptHistory) userState.attemptHistory = [];
  userState.attemptHistory.unshift({
    contentId,
    contentType,
    topicId,
    correct: !!correct,
    timestamp
  });
  if (userState.attemptHistory.length > 50) {
    userState.attemptHistory.pop();
  }

  // 2. Mistake Bank tracking
  if (!userState.mistakes) userState.mistakes = {};
  if (contentType === "mcq" || contentType === "scenario" || contentType === "quiz") {
    if (!correct) {
      if (!userState.mistakes[contentId]) {
        userState.mistakes[contentId] = {
          contentId,
          topicId,
          incorrectCount: 1,
          lastIncorrectAt: timestamp,
          resolved: false
        };
      } else {
        userState.mistakes[contentId].incorrectCount += 1;
        userState.mistakes[contentId].lastIncorrectAt = timestamp;
        userState.mistakes[contentId].resolved = false;
      }
    } else {
      if (userState.mistakes[contentId]) {
        userState.mistakes[contentId].resolved = true;
      }
    }
  }

  // 3. Flashcard SRS scheduling
  if (!userState.flashcardSRS) userState.flashcardSRS = {};
  if (contentType === "flashcard" && rating) {
    const prev = userState.flashcardSRS[contentId] || { intervalDays: 1, repetitions: 0 };
    let intervalDays = 1;
    if (rating === "Again") intervalDays = 1;
    else if (rating === "Hard") intervalDays = Math.max(1, Math.round((prev.intervalDays || 1) * 1.2));
    else if (rating === "Good") intervalDays = Math.max(2, Math.round((prev.intervalDays || 1) * 2.0));
    else if (rating === "Easy") intervalDays = Math.max(4, Math.round((prev.intervalDays || 1) * 3.5));

    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + intervalDays);

    userState.flashcardSRS[contentId] = {
      lastReviewed: timestamp,
      nextReviewDate: nextDate.toISOString().split('T')[0],
      intervalDays,
      repetitions: (prev.repetitions || 0) + 1,
      lastRating: rating
    };
  }

  // 4. Update Topic Mastery
  if (topicId) {
    if (!userState.topicMastery) userState.topicMastery = {};
    userState.topicMastery[topicId] = calculateTopicMastery(topicId);
  }

  saveUserState();
  renderMobileHomeSummary();
}

// -------------------------------------------------------------
// MOBILE HOME & DAILY HUB ENGINE
// -------------------------------------------------------------

function getGreetingText() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Good morning 👋";
  if (hour >= 12 && hour < 17) return "Good afternoon 👋";
  return "Good evening 👋";
}

function renderMobileHomeSummary() {
  const today = new Date().toISOString().split('T')[0];

  // 1. Dynamic Greeting
  const greetingEl = document.getElementById("mobile-greeting-text");
  if (greetingEl) greetingEl.textContent = getGreetingText();

  // 2. Mobile Status Hero (Streak, XP, Level, Progress Bar)
  const streakEl = document.getElementById("mobile-hero-streak");
  const xpEl = document.getElementById("mobile-hero-xp");
  const lvlEl = document.getElementById("mobile-hero-level");
  const fillEl = document.getElementById("mobile-hero-fill");

  const currentLvlConfig = APP_DATA.levels.find(l => l.level === userState.level) || APP_DATA.levels[0];
  const nextLvlConfig = APP_DATA.levels.find(l => l.level === userState.level + 1);

  if (streakEl) streakEl.textContent = userState.streak || 1;
  if (xpEl) xpEl.textContent = userState.xp || 0;
  if (lvlEl) lvlEl.textContent = `Lvl ${currentLvlConfig.level}: ${currentLvlConfig.title}`;

  if (fillEl) {
    if (nextLvlConfig) {
      const currentMin = currentLvlConfig.minXP;
      const nextMin = nextLvlConfig.minXP;
      const progress = Math.min(100, Math.max(0, (((userState.xp || 0) - currentMin) / (nextMin - currentMin)) * 100));
      fillEl.style.width = `${progress}%`;
    } else {
      fillEl.style.width = `100%`;
    }
  }

  // 3. Daily Loop Hero Card State (Completed vs Ready)
  const isLoopDoneToday = userState.dailyLoop && userState.dailyLoop.lastCompletedDate === today;
  const loopTagEl = document.querySelector(".mobile-loop-tag");
  const loopBtnEl = document.querySelector(".btn-daily-loop");

  if (loopTagEl) {
    if (isLoopDoneToday) {
      loopTagEl.innerHTML = `<span style="color: var(--accent-success);"><i class="fas fa-check-circle"></i> TODAY'S LOOP COMPLETED</span>`;
    } else {
      loopTagEl.textContent = "⚡ TODAY'S RECOMMENDED ACTION";
    }
  }

  if (loopBtnEl) {
    if (isLoopDoneToday) {
      loopBtnEl.innerHTML = `<i class="fas fa-redo"></i> Practice Another Set`;
    } else {
      loopBtnEl.innerHTML = `<i class="fas fa-play"></i> Start Daily Loop`;
    }
  }

  // 4. Continue Learning Resume Card
  const lastTopicId = userState.lastStudiedTopic || currentTopicId || "topic1";
  const mod = APP_DATA.modules.find(m => m.id === lastTopicId) || APP_DATA.modules[0];
  const trackObj = APP_DATA.tracks.find(t => t.id === mod.track) || { name: "Core Curriculum" };

  const contTitleEl = document.getElementById("mobile-continue-title");
  const contTrackEl = document.getElementById("mobile-continue-track");
  if (contTitleEl) contTitleEl.textContent = `Topic ${mod.number}: ${mod.title}`;
  if (contTrackEl) contTrackEl.textContent = trackObj.name;

  // 5. Progress Metrics
  const statTopicsEl = document.getElementById("mobile-stat-topics");
  const statQuizzesEl = document.getElementById("mobile-stat-quizzes");
  const statBadgesEl = document.getElementById("mobile-stat-badges");

  if (statTopicsEl) statTopicsEl.textContent = `${userState.completedTopics ? userState.completedTopics.length : 0} / ${APP_DATA.modules.length}`;
  if (statQuizzesEl) statQuizzesEl.textContent = `${userState.completedQuizzes ? userState.completedQuizzes.length : 0} / ${APP_DATA.quizzes.length}`;
  if (statBadgesEl) statBadgesEl.textContent = `${userState.unlockedBadges ? userState.unlockedBadges.length : 0} / ${APP_DATA.badges.length}`;

  // 6. Weak Areas / Recommended Focus (Prioritizing Active Mistakes & Low Mastery)
  const weakContainer = document.getElementById("mobile-weak-areas-container");
  if (weakContainer) {
    const activeMistakes = Object.values(userState.mistakes || {}).filter(m => !m.resolved);
    if (activeMistakes.length > 0) {
      const topMistakes = activeMistakes.slice(0, 2);
      weakContainer.innerHTML = topMistakes.map(m => {
        const tMod = APP_DATA.modules.find(mod => mod.id === m.topicId) || APP_DATA.modules[0];
        return `
          <div class="weak-topic-item" style="border-color: rgba(239, 68, 68, 0.35); background: rgba(239, 68, 68, 0.08);">
            <span><strong style="color: #fca5a5;">⚠ ${m.incorrectCount} mistake${m.incorrectCount > 1 ? 's' : ''}:</strong> Topic ${tMod.number}: ${tMod.title.slice(0, 26)}...</span>
            <button class="weak-topic-btn" style="background: #ef4444; color: #ffffff;" onclick="openTopicFromHome('${tMod.id}')">Review</button>
          </div>
        `;
      }).join('');
    } else {
      // Find low mastery or next uncompleted topic
      const uncompleted = APP_DATA.modules.filter(m => !userState.completedTopics || !userState.completedTopics.includes(m.id));
      if (uncompleted.length > 0 && userState.completedTopics && userState.completedTopics.length > 0) {
        const topFocus = uncompleted.slice(0, 2);
        weakContainer.innerHTML = topFocus.map(f => {
          const mastery = userState.topicMastery ? (userState.topicMastery[f.id] || 0) : 0;
          return `
            <div class="weak-topic-item">
              <span>Topic ${f.number}: ${f.title.slice(0, 28)}... <small style="color: var(--text-muted);">(${mastery}% mastery)</small></span>
              <button class="weak-topic-btn" onclick="openTopicFromHome('${f.id}')">Practice</button>
            </div>
          `;
        }).join('');
      } else {
        weakContainer.innerHTML = `<div class="empty-state-text">No weak areas yet 🎉 Keep practicing to identify topics that need more attention.</div>`;
      }
    }
  }
}

function resumeLastStudiedTopic() {
  const topicId = userState.lastStudiedTopic || currentTopicId || "topic1";
  switchTab("tab-curriculum");
  const mod = APP_DATA.modules.find(m => m.id === topicId) || APP_DATA.modules[0];
  currentTrackFilter = mod.track;
  renderTrackFilterBar();
  renderTopicSidebar();
  renderTopicContent(topicId);
}

function openTopicFromHome(topicId) {
  switchTab("tab-curriculum");
  const mod = APP_DATA.modules.find(m => m.id === topicId) || APP_DATA.modules[0];
  currentTrackFilter = mod.track;
  renderTrackFilterBar();
  renderTopicSidebar();
  renderTopicContent(topicId);
}

function startDailyLoopEntry() {
  startLearningFeed();
}

// -------------------------------------------------------------
// ADAPTIVE DAILY LOOP ENGINE & SESSION GENERATION (PHASE 5)
// -------------------------------------------------------------

let currentFeedItems = [];
let answeredFeedCards = {};

/**
 * Adaptive Daily Loop Generator
 * Deterministically constructs a 6-step personalized session based on:
 * 1. Active mistakes in Mistake Bank
 * 2. Due flashcards from SRS schedule
 * 3. Low mastery topics
 * 4. Active syllabus progression
 */
function generateAdaptiveDailyLoopSession() {
  const today = new Date().toISOString().split('T')[0];

  // 1. Identify Target Topic Priority
  const activeMistakes = Object.values(userState.mistakes || {}).filter(m => !m.resolved);
  let targetTopicId = userState.lastStudiedTopic || "topic1";

  if (activeMistakes.length > 0 && activeMistakes[0].topicId) {
    targetTopicId = activeMistakes[0].topicId;
  } else {
    // Check topics with lowest mastery
    const lowMasteryTopics = Object.keys(userState.topicMastery || {}).filter(tId => (userState.topicMastery[tId] || 0) < 60);
    if (lowMasteryTopics.length > 0) {
      targetTopicId = lowMasteryTopics[0];
    } else {
      const uncompleted = APP_DATA.modules.filter(m => !userState.completedTopics || !userState.completedTopics.includes(m.id));
      if (uncompleted.length > 0) {
        targetTopicId = uncompleted[0].id;
      }
    }
  }

  const targetMod = APP_DATA.modules.find(m => m.id === targetTopicId) || APP_DATA.modules[0];
  const targetTrack = targetMod.track || "track1";

  const session = [];

  // 1. LEARN: Concept Snapshot
  const firstSec = (targetMod.sections && targetMod.sections.length > 0) ? targetMod.sections[0] : null;
  const takeaway = (targetMod.keyTakeaways && targetMod.keyTakeaways.length > 0) ? targetMod.keyTakeaways[0] : targetMod.summary;

  session.push({
    id: `feed_concept_${targetMod.id}`,
    type: "concept",
    topicId: targetMod.id,
    track: targetMod.track,
    title: `Topic ${targetMod.number}: ${targetMod.title}`,
    subtitle: targetMod.subtitle,
    sectionHeading: firstSec ? firstSec.heading : "Core Concept",
    content: firstSec ? firstSec.content : targetMod.summary,
    takeaway: takeaway
  });

  // 2. RECALL: Due SRS Flashcard or Track Card
  let targetCard = null;
  if (userState.flashcardSRS) {
    const dueCardId = Object.keys(userState.flashcardSRS).find(cId => {
      const srs = userState.flashcardSRS[cId];
      return srs && srs.nextReviewDate <= today;
    });
    if (dueCardId) {
      targetCard = APP_DATA.flashcards.find(f => f.id === dueCardId);
    }
  }
  if (!targetCard) {
    const trackCards = APP_DATA.flashcards.filter(f => f.track === targetTrack);
    targetCard = trackCards.length > 0 ? trackCards[0] : APP_DATA.flashcards[0];
  }

  if (targetCard) {
    session.push({
      id: `feed_fc_${targetCard.id}`,
      type: "flashcard",
      topicId: targetMod.id,
      track: targetCard.track,
      title: "Active Recall Flashcard",
      front: targetCard.front,
      back: targetCard.back,
      math: targetCard.math
    });
  }

  // 3. TEST: Knowledge MCQ (Prioritize unresolved mistake if available)
  let targetQuiz = null;
  if (activeMistakes.length > 0) {
    const mistakeContentId = activeMistakes[0].contentId;
    targetQuiz = APP_DATA.quizzes.find(q => q.id === mistakeContentId);
  }
  if (!targetQuiz) {
    const trackQuizzes = APP_DATA.quizzes.filter(q => q.track === targetTrack);
    targetQuiz = trackQuizzes.length > 0 ? trackQuizzes[0] : APP_DATA.quizzes[0];
  }

  if (targetQuiz) {
    session.push({
      id: `feed_mcq_${targetQuiz.id}`,
      type: "mcq",
      topicId: targetMod.id,
      track: targetQuiz.track,
      title: "Active Knowledge Check",
      question: targetQuiz.question,
      options: targetQuiz.options,
      correctIndex: targetQuiz.correctIndex,
      explanation: targetQuiz.explanation,
      xp: targetQuiz.xp || 50
    });
  }

  // 4. APPLY: Scenario Challenge
  const scenario = APP_DATA.scenarioChallenges[0];
  if (scenario) {
    session.push({
      id: `feed_scenario_${scenario.id}`,
      type: "scenario",
      topicId: targetMod.id,
      title: scenario.title,
      context: scenario.context,
      symptoms: scenario.symptoms,
      question: scenario.question,
      options: scenario.options,
      correctIndex: scenario.correctIndex,
      explanation: scenario.explanation,
      xp: scenario.xp || 100
    });
  }

  // 5. EXPLAIN: Interview Articulation Studio
  const artQ = APP_DATA.articulationQuestions[0];
  if (artQ) {
    session.push({
      id: `feed_art_${artQ.id}`,
      type: "explain",
      topicId: targetMod.id,
      title: artQ.title,
      category: artQ.category,
      prompt: artQ.prompt,
      keywords: artQ.keywords,
      goldAnswer: artQ.goldAnswer,
      xp: artQ.xp || 75
    });
  }

  // 6. COMPLETE: Milestone Completion Card
  session.push({
    id: "feed_completion",
    type: "completion",
    title: "Daily Loop Completed! 🎉",
    totalSteps: session.length
  });

  return session;
}

function startLearningFeed() {
  switchTab("tab-feed");
  currentFeedItems = generateAdaptiveDailyLoopSession();
  answeredFeedCards = {};
  renderLearningFeed();
  setupFeedScrollObserver();
}

function renderLearningFeed() {
  const container = document.getElementById("learning-feed-container");
  if (!container) return;

  const total = currentFeedItems.length;
  updateFeedHeaderProgress(1, total);

  container.innerHTML = currentFeedItems.map((item, idx) => {
    switch (item.type) {
      case "concept":
        return renderConceptFeedCard(item, idx, total);
      case "flashcard":
        return renderFlashcardFeedCard(item, idx, total);
      case "mcq":
        return renderMCQFeedCard(item, idx, total);
      case "scenario":
        return renderScenarioFeedCard(item, idx, total);
      case "explain":
        return renderExplainFeedCard(item, idx, total);
      case "completion":
        return renderCompletionFeedCard(item, idx, total);
      default:
        return "";
    }
  }).join('');
}

function updateFeedHeaderProgress(current, total) {
  const textEl = document.getElementById("feed-progress-text");
  if (textEl) {
    textEl.textContent = `Step ${current} of ${total}`;
  }
}

function renderConceptFeedCard(item, idx, total) {
  return `
    <div class="feed-card" id="feed-card-${idx}">
      <div>
        <div class="feed-card-header">
          <span class="feed-card-type-tag tag-concept"><i class="fas fa-lightbulb"></i> Concept Snapshot</span>
          <span style="font-size: 0.78rem; color: var(--text-muted); font-weight: 600;">${idx + 1} / ${total}</span>
        </div>
        <div class="feed-card-body">
          <h3 class="feed-card-title">${item.title}</h3>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.6rem;">${item.subtitle || ''}</p>
          <div class="feed-card-text">${formatMarkdownContent(item.content)}</div>
          ${item.takeaway ? `<div class="feed-takeaway-box"><strong>💡 Key Takeaway:</strong> ${item.takeaway}</div>` : ''}
        </div>
      </div>
      <div class="feed-card-footer">
        <button class="btn-feed-next" onclick="scrollFeedTo(${idx + 1})">
          Got it, Continue <i class="fas fa-arrow-down"></i>
        </button>
      </div>
    </div>
  `;
}

function renderFlashcardFeedCard(item, idx, total) {
  return `
    <div class="feed-card" id="feed-card-${idx}">
      <div>
        <div class="feed-card-header">
          <span class="feed-card-type-tag tag-flashcard"><i class="fas fa-clone"></i> Spaced Recall</span>
          <span style="font-size: 0.78rem; color: var(--text-muted); font-weight: 600;">${idx + 1} / ${total}</span>
        </div>
        <div class="feed-card-body">
          <div class="feed-flashcard-box" id="feed-fc-box-${idx}" onclick="handleFeedFlashcardFlip(${idx})">
            <div id="feed-fc-front-${idx}">
              <div style="font-size: 0.75rem; color: var(--accent-cyan); font-weight: 700; text-transform: uppercase; margin-bottom: 0.6rem;">Question / Concept (Tap to Reveal)</div>
              <div style="font-size: 1.1rem; font-weight: 600; color: #ffffff; line-height: 1.4;">${item.front}</div>
            </div>
            <div id="feed-fc-back-${idx}" style="display: none;">
              <div style="font-size: 0.75rem; color: var(--accent-success); font-weight: 700; text-transform: uppercase; margin-bottom: 0.6rem;">Answer & Formula</div>
              <div style="font-size: 1rem; color: #ffffff; line-height: 1.4;">${item.back}</div>
              ${item.math ? `<div class="math-block" style="margin-top: 0.6rem; font-size: 0.95rem;">${formatLaTeXMath(item.math)}</div>` : ''}
            </div>
          </div>

          <div id="feed-srs-panel-${idx}" style="display: none; margin-top: 0.8rem;">
            <div style="font-size: 0.75rem; color: var(--text-muted); text-align: center; margin-bottom: 0.4rem; font-weight: 600;">How easily did you recall this?</div>
            <div class="feed-srs-grid">
              <button class="btn-srs btn-srs-again" onclick="handleFeedSRSGrade(${idx}, 'Again')">😵 Again</button>
              <button class="btn-srs btn-srs-hard" onclick="handleFeedSRSGrade(${idx}, 'Hard')">😐 Hard</button>
              <button class="btn-srs btn-srs-good" onclick="handleFeedSRSGrade(${idx}, 'Good')">🙂 Good</button>
              <button class="btn-srs btn-srs-easy" onclick="handleFeedSRSGrade(${idx}, 'Easy')">🔥 Easy</button>
            </div>
          </div>
        </div>
      </div>
      <div class="feed-card-footer">
        <button class="btn-feed-next" onclick="scrollFeedTo(${idx + 1})">
          Next Card <i class="fas fa-arrow-down"></i>
        </button>
      </div>
    </div>
  `;
}

function handleFeedFlashcardFlip(idx) {
  const box = document.getElementById(`feed-fc-box-${idx}`);
  const front = document.getElementById(`feed-fc-front-${idx}`);
  const back = document.getElementById(`feed-fc-back-${idx}`);
  const srsPanel = document.getElementById(`feed-srs-panel-${idx}`);

  if (box && front && back) {
    const isFlipped = box.classList.toggle("flipped");
    if (isFlipped) {
      front.style.display = "none";
      back.style.display = "block";
      if (srsPanel) srsPanel.style.display = "block";
    } else {
      front.style.display = "block";
      back.style.display = "none";
    }
  }
}

function handleFeedSRSGrade(cardIdx, grade) {
  const item = currentFeedItems[cardIdx];
  if (!item) return;

  awardXPOnce(`feed_srs_${item.id}_${new Date().toISOString().split('T')[0]}`, 15, `Flashcard Recall: ${grade}`);
  recordLearningResult({
    contentId: item.id.replace('feed_fc_', ''),
    contentType: "flashcard",
    topicId: item.topicId,
    correct: grade === "Good" || grade === "Easy",
    rating: grade
  });

  showToast(`Recorded: ${grade} recall (+15 XP)`);
  scrollFeedTo(cardIdx + 1);
}

function renderMCQFeedCard(item, idx, total) {
  const letters = ["A", "B", "C", "D", "E"];
  return `
    <div class="feed-card" id="feed-card-${idx}">
      <div>
        <div class="feed-card-header">
          <span class="feed-card-type-tag tag-mcq"><i class="fas fa-bolt"></i> Knowledge Test</span>
          <span style="font-size: 0.78rem; color: var(--text-muted); font-weight: 600;">${idx + 1} / ${total}</span>
        </div>
        <div class="feed-card-body">
          <h3 class="feed-card-title">${item.question}</h3>
          <div class="feed-options-stack" id="feed-mcq-options-${idx}">
            ${item.options.map((opt, optIdx) => `
              <button class="feed-option-btn" id="feed-mcq-btn-${idx}-${optIdx}" onclick="handleFeedMCQOption(${idx}, ${optIdx}, ${item.correctIndex}, ${item.xp})">
                <span class="feed-option-letter">${letters[optIdx]}</span>
                <span>${opt}</span>
              </button>
            `).join('')}
          </div>
          <div class="feed-explanation-box" id="feed-mcq-exp-${idx}">
            <strong style="display: block; margin-bottom: 0.3rem;" id="feed-mcq-feedback-${idx}"></strong>
            <span>${item.explanation}</span>
          </div>
        </div>
      </div>
      <div class="feed-card-footer">
        <button class="btn-feed-next" onclick="scrollFeedTo(${idx + 1})">
          Next Step <i class="fas fa-arrow-down"></i>
        </button>
      </div>
    </div>
  `;
}

function handleFeedMCQOption(cardIdx, selectedIdx, correctIdx, xp) {
  if (answeredFeedCards[`mcq_${cardIdx}`]) return;
  answeredFeedCards[`mcq_${cardIdx}`] = true;

  const item = currentFeedItems[cardIdx];
  const isCorrect = selectedIdx === correctIdx;
  const quizId = item ? item.id.replace('feed_mcq_', '') : `mcq_${cardIdx}`;

  const optionsContainer = document.getElementById(`feed-mcq-options-${cardIdx}`);
  const expBox = document.getElementById(`feed-mcq-exp-${cardIdx}`);
  const feedbackLabel = document.getElementById(`feed-mcq-feedback-${cardIdx}`);

  if (optionsContainer) {
    const buttons = optionsContainer.querySelectorAll(".feed-option-btn");
    buttons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === correctIdx) {
        btn.classList.add("selected-correct");
      } else if (idx === selectedIdx) {
        btn.classList.add("selected-incorrect");
      }
    });
  }

  if (expBox && feedbackLabel) {
    expBox.style.display = "block";
    if (isCorrect) {
      feedbackLabel.innerHTML = `<span style="color: var(--accent-success);"><i class="fas fa-check-circle"></i> Correct! (+${xp} XP)</span>`;
      awardXPOnce(`feed_mcq_${quizId}`, xp, "Feed MCQ Correct");
    } else {
      feedbackLabel.innerHTML = `<span style="color: #ef4444;"><i class="fas fa-times-circle"></i> Not quite. Study the diagnostic rationale:</span>`;
      awardXPOnce(`feed_mcq_att_${quizId}`, 10, "Feed MCQ Attempt");
    }
  }

  if (item) {
    recordLearningResult({
      contentId: quizId,
      contentType: "mcq",
      topicId: item.topicId,
      correct: isCorrect
    });
  }
}

function renderScenarioFeedCard(item, idx, total) {
  const letters = ["A", "B", "C", "D"];
  return `
    <div class="feed-card" id="feed-card-${idx}">
      <div>
        <div class="feed-card-header">
          <span class="feed-card-type-tag tag-scenario"><i class="fas fa-exclamation-triangle"></i> Scenario Challenge</span>
          <span style="font-size: 0.78rem; color: var(--text-muted); font-weight: 600;">${idx + 1} / ${total}</span>
        </div>
        <div class="feed-card-body">
          <h3 class="feed-card-title">${item.title}</h3>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.4rem;">${item.context}</p>
          
          <div class="feed-symptom-box">
            <strong style="color: #fbcfe8; display: block; margin-bottom: 0.3rem;">Observed Symptoms:</strong>
            ${item.symptoms.map(s => `<div style="margin-bottom: 0.2rem;">• ${s}</div>`).join('')}
          </div>

          <div style="font-size: 0.95rem; font-weight: 600; color: #ffffff; margin: 0.6rem 0 0.4rem 0;">${item.question}</div>

          <div class="feed-options-stack" id="feed-scenario-options-${idx}">
            ${item.options.map((opt, optIdx) => `
              <button class="feed-option-btn" id="feed-sc-btn-${idx}-${optIdx}" onclick="handleFeedScenarioOption(${idx}, ${optIdx}, ${item.correctIndex}, ${item.xp})">
                <span class="feed-option-letter">${letters[optIdx]}</span>
                <span>${opt}</span>
              </button>
            `).join('')}
          </div>

          <div class="feed-explanation-box" id="feed-scenario-exp-${idx}">
            <strong style="display: block; margin-bottom: 0.3rem;" id="feed-scenario-feedback-${idx}"></strong>
            <span>${item.explanation}</span>
          </div>
        </div>
      </div>
      <div class="feed-card-footer">
        <button class="btn-feed-next" onclick="scrollFeedTo(${idx + 1})">
          Next Step <i class="fas fa-arrow-down"></i>
        </button>
      </div>
    </div>
  `;
}

function handleFeedScenarioOption(cardIdx, selectedIdx, correctIdx, xp) {
  if (answeredFeedCards[`scenario_${cardIdx}`]) return;
  answeredFeedCards[`scenario_${cardIdx}`] = true;

  const item = currentFeedItems[cardIdx];
  const isCorrect = selectedIdx === correctIdx;
  const scId = item ? item.id.replace('feed_scenario_', '') : `scenario_${cardIdx}`;

  const container = document.getElementById(`feed-scenario-options-${cardIdx}`);
  const expBox = document.getElementById(`feed-scenario-exp-${cardIdx}`);
  const feedbackLabel = document.getElementById(`feed-scenario-feedback-${cardIdx}`);

  if (container) {
    const buttons = container.querySelectorAll(".feed-option-btn");
    buttons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === correctIdx) {
        btn.classList.add("selected-correct");
      } else if (idx === selectedIdx) {
        btn.classList.add("selected-incorrect");
      }
    });
  }

  if (expBox && feedbackLabel) {
    expBox.style.display = "block";
    if (isCorrect) {
      feedbackLabel.innerHTML = `<span style="color: var(--accent-success);"><i class="fas fa-check-circle"></i> Diagnostic Solved! (+${xp} XP)</span>`;
      awardXPOnce(`feed_sc_${scId}`, xp, "Scenario Challenge Solved");
    } else {
      feedbackLabel.innerHTML = `<span style="color: #ef4444;"><i class="fas fa-times-circle"></i> Diagnostic Fix:</span>`;
      awardXPOnce(`feed_sc_att_${scId}`, 20, "Scenario Challenge Attempt");
    }
  }

  if (item) {
    recordLearningResult({
      contentId: scId,
      contentType: "scenario",
      topicId: item.topicId,
      correct: isCorrect
    });
  }
}

function renderExplainFeedCard(item, idx, total) {
  return `
    <div class="feed-card" id="feed-card-${idx}">
      <div>
        <div class="feed-card-header">
          <span class="feed-card-type-tag tag-explain"><i class="fas fa-microphone"></i> Articulation Studio</span>
          <span style="font-size: 0.78rem; color: var(--text-muted); font-weight: 600;">${idx + 1} / ${total}</span>
        </div>
        <div class="feed-card-body">
          <h3 class="feed-card-title">${item.title}</h3>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.4rem;">${item.prompt}</p>

          <textarea id="feed-art-input-${idx}" class="feed-textarea" placeholder="Type your 30-second technical answer here... (mention key terms like ChromaDB, embeddings, cosine similarity)"></textarea>

          <button class="btn btn-secondary btn-sm" style="width: 100%; margin-top: 0.6rem;" onclick="evaluateFeedArticulation(${idx})">
            <i class="fas fa-check-double"></i> Evaluate Answer Coverage
          </button>

          <div class="feed-art-feedback" id="feed-art-feedback-${idx}">
            <div id="feed-art-score-${idx}" style="font-weight: 700; font-size: 0.95rem; margin-bottom: 0.4rem;"></div>
            <div style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 0.4rem;">Keywords Detected:</div>
            <div id="feed-art-keywords-${idx}" style="display: flex; flex-wrap: wrap; gap: 0.3rem; margin-bottom: 0.8rem;"></div>
            <div style="background: rgba(0,0,0,0.3); padding: 0.8rem; border-radius: var(--radius-sm); font-size: 0.85rem; line-height: 1.45; border-left: 3px solid var(--accent-success);">
              <strong style="color: var(--accent-success); display: block; margin-bottom: 0.2rem;">Model Gold Answer:</strong>
              <div style="white-space: pre-line; color: #e2e8f0;">${item.goldAnswer}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="feed-card-footer">
        <button class="btn-feed-next" onclick="scrollFeedTo(${idx + 1})">
          Finish Session <i class="fas fa-arrow-down"></i>
        </button>
      </div>
    </div>
  `;
}

function evaluateFeedArticulation(cardIdx) {
  const item = currentFeedItems[cardIdx];
  if (!item || item.type !== "explain") return;

  const input = document.getElementById(`feed-art-input-${cardIdx}`);
  const feedbackBox = document.getElementById(`feed-art-feedback-${cardIdx}`);
  const scoreEl = document.getElementById(`feed-art-score-${cardIdx}`);
  const kwContainer = document.getElementById(`feed-art-keywords-${cardIdx}`);

  if (!input || !feedbackBox || !scoreEl || !kwContainer) return;

  const text = input.value.trim().toLowerCase();
  if (!text) {
    showToast("Please enter an answer to evaluate.");
    return;
  }

  let matched = 0;
  const kwHtml = item.keywords.map(kw => {
    const isPresent = text.includes(kw.toLowerCase());
    if (isPresent) matched++;
    return `<span style="padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.72rem; font-weight: 600; background: ${isPresent ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.05)'}; color: ${isPresent ? 'var(--accent-success)' : 'var(--text-muted)'}; border: 1px solid ${isPresent ? 'var(--accent-success)' : 'var(--border-color)'};">${isPresent ? '✓ ' : ''}${kw}</span>`;
  }).join('');

  const scorePct = Math.round((matched / item.keywords.length) * 100);
  scoreEl.innerHTML = `<span style="color: ${scorePct >= 60 ? 'var(--accent-success)' : 'var(--accent-warning)'};">Match Score: ${scorePct}% (${matched} of ${item.keywords.length} core concepts)</span>`;
  kwContainer.innerHTML = kwHtml;
  feedbackBox.style.display = "block";

  if (!answeredFeedCards[`art_${cardIdx}`]) {
    answeredFeedCards[`art_${cardIdx}`] = true;
    const earnedXP = Math.max(25, Math.round((matched / item.keywords.length) * (item.xp || 75)));
    awardXPOnce(`feed_art_${item.id}`, earnedXP, "Articulation Evaluation");
    recordLearningResult({
      contentId: item.id.replace('feed_art_', ''),
      contentType: "articulation",
      topicId: item.topicId,
      correct: scorePct >= 60
    });
    showToast(`Articulation Evaluated: +${earnedXP} XP!`);
  }
}

function renderCompletionFeedCard(item, idx, total) {
  // Trigger Daily Loop milestone completion
  completeDailyLoopSession();

  return `
    <div class="feed-card" id="feed-card-${idx}">
      <div class="feed-completion-box">
        <div class="feed-completion-icon">🎉</div>
        <h2 style="font-family: var(--font-heading); font-size: 1.6rem; color: #ffffff; margin-bottom: 0.4rem;">Daily Loop Completed!</h2>
        <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.5; margin-bottom: 1.2rem;">
          You completed all ${item.totalSteps} personalized learning steps.<br>Concepts reviewed, active recall practiced, and daily streak maintained!
        </p>
        <div style="display: flex; gap: 0.8rem; justify-content: center; flex-wrap: wrap;">
          <button class="btn btn-primary" onclick="switchTab('tab-dashboard')">
            <i class="fas fa-home"></i> Return to Home
          </button>
          <button class="btn btn-secondary" onclick="startLearningFeed()">
            <i class="fas fa-redo"></i> Practice Another Set
          </button>
        </div>
      </div>
      <div class="feed-card-footer" style="justify-content: center;">
        <span style="font-size: 0.82rem; color: var(--accent-success); font-weight: 700;">🔥 Daily Loop & Streak Updated (+50 XP)</span>
      </div>
    </div>
  `;
}

/**
 * Daily Loop Completion & Streak Preservation Engine
 */
function completeDailyLoopSession() {
  const today = new Date().toISOString().split('T')[0];
  if (!userState.dailyLoop) {
    userState.dailyLoop = { lastCompletedDate: null, completedDates: [], sessionsCompleted: 0 };
  }

  const isFirstToday = userState.dailyLoop.lastCompletedDate !== today;

  if (isFirstToday) {
    userState.dailyLoop.lastCompletedDate = today;
    if (!userState.dailyLoop.completedDates.includes(today)) {
      userState.dailyLoop.completedDates.push(today);
    }
    userState.dailyLoop.sessionsCompleted += 1;

    // Preserving & updating streak
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (userState.lastLoginDate === yesterdayStr) {
      userState.streak += 1;
    } else if (userState.lastLoginDate < yesterdayStr) {
      userState.streak = 1;
    }
    userState.lastLoginDate = today;

    // Daily Milestone Bonus (+50 XP)
    awardXPOnce(`daily_loop_milestone_${today}`, 50, "for Daily Loop Completion");
    if (userState.streak >= 3) {
      unlockBadge("streak_3");
    }

    saveUserState();
    renderMobileHomeSummary();
  }
}

function scrollFeedTo(index) {
  const targetCard = document.getElementById(`feed-card-${index}`);
  if (targetCard) {
    targetCard.scrollIntoView({ behavior: "smooth", block: "start" });
    updateFeedHeaderProgress(index + 1, currentFeedItems.length);
  }
}

function setupFeedScrollObserver() {
  const container = document.getElementById("learning-feed-container");
  if (!container || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        const match = id.match(/feed-card-(\d+)/);
        if (match) {
          const idx = parseInt(match[1], 10);
          updateFeedHeaderProgress(idx + 1, currentFeedItems.length);
        }
      }
    });
  }, { threshold: 0.6 });

  const cards = container.querySelectorAll(".feed-card");
  cards.forEach(c => observer.observe(c));
}

// LaTeX Math Formatter
function formatLaTeXMath(latex) {
  if (!latex) return "";
  let s = latex;
  // Handle \text{...}
  s = s.replace(/\\text\{([^}]*)\}/g, '$1');
  // Handle fractions \frac{a}{b} -> (a) / (b)
  s = s.replace(/\\frac\{([^}]*)\}\{([^}]*)\}/g, '($1) / ($2)');
  // Math and arrow symbols
  s = s.replace(/\\cdot/g, '·');
  s = s.replace(/\\times/g, '×');
  s = s.replace(/\\mid/g, '|');
  s = s.replace(/\\dots/g, '...');
  s = s.replace(/\\supset/g, ' ⊃ ');
  s = s.replace(/\\longrightarrow/g, ' ⟶ ');
  s = s.replace(/\\xrightarrow\{([^}]*)\}/g, ' ──[$1]──> ');
  s = s.replace(/\\to/g, ' → ');
  s = s.replace(/\\sum_\{([^}]+)\}\^\{([^}]+)\}/g, '∑($1 to $2)');
  s = s.replace(/\\sum/g, '∑');
  s = s.replace(/\\sqrt\{([^}]+)\}/g, '√($1)');
  s = s.replace(/\\sqrt/g, '√');
  s = s.replace(/\\vec\{([^}]+)\}/g, '$1');
  s = s.replace(/\\hat\{([^}]+)\}/g, '$1̂');
  s = s.replace(/\\bar\{([^}]+)\}/g, '$1̄');
  s = s.replace(/\\mu/g, 'μ');
  s = s.replace(/\\sigma/g, 'σ');
  s = s.replace(/\\alpha/g, 'α');
  s = s.replace(/\\le/g, '≤');
  s = s.replace(/\\ge/g, '≥');
  s = s.replace(/\\approx/g, '≈');
  s = s.replace(/\\in/g, '∈');
  s = s.replace(/\\pm/g, '±');
  s = s.replace(/\\infty/g, '∞');
  s = s.replace(/\\quad/g, '   ');
  s = s.replace(/\\;/g, ' ');
  s = s.replace(/\\,/g, ' ');
  s = s.replace(/\\\|/g, '‖');
  s = s.replace(/\\\\/g, '\n');
  s = s.replace(/\\/g, ''); // strip any remaining unhandled backslashes
  return s.trim();
}

// Markdown & Math Formatter
function formatMarkdownContent(rawText) {
  if (!rawText) return "";

  const codeBlocks = [];
  let text = rawText.replace(/```([\s\S]*?)```/g, (match, code) => {
    codeBlocks.push(code);
    return `\n\n___CODE_BLOCK_${codeBlocks.length - 1}___\n\n`;
  });

  const mathBlocks = [];
  text = text.replace(/\$\$([\s\S]*?)\$\$/g, (match, math) => {
    mathBlocks.push(formatLaTeXMath(math.trim()));
    return `\n\n___MATH_BLOCK_${mathBlocks.length - 1}___\n\n`;
  });

  text = text.replace(/\$([^\$\n]+)\$/g, (match, math) => {
    return `<span class="math-inline">${formatLaTeXMath(math)}</span>`;
  });

  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
  text = text.replace(/`([^`]+)`/g, '<span class="math-inline">$1</span>');

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
    if (p.includes('|') && p.includes('---')) {
      const rows = p.split('\n').filter(r => r.trim().startsWith('|'));
      if (rows.length >= 2) {
        const headers = rows[0].split('|').map(c => c.trim()).filter(Boolean);
        const bodyRows = rows.slice(2);
        let tableHtml = '<table><thead><tr>' + headers.map(h => `<th>${h}</th>`).join('') + '</tr></thead><tbody>';
        bodyRows.forEach(r => {
          const cells = r.split('|').map(c => c.trim()).filter(Boolean);
          tableHtml += '<tr>' + cells.map(c => `<td>${c}</td>`).join('') + '</tr>';
        });
        tableHtml += '</tbody></table>';
        return tableHtml;
      }
    }
    if (p.startsWith('• ') || p.startsWith('- ') || p.startsWith('* ')) {
      const items = p.split(/\n/).map(line => line.replace(/^[•\-*]\s+/, '').trim()).filter(Boolean);
      return `<ul>${items.map(it => `<li>${it}</li>`).join('')}</ul>`;
    }

    return `<p>${p.replace(/\n/g, '<br>')}</p>`;
  });

  return formattedParagraphs.join('');
}

// -------------------------------------------------------------
// TRACKS & CURRICULUM (46 TOPICS)
// -------------------------------------------------------------

function renderDashboardTracks() {
  const container = document.getElementById("dashboard-track-grid");
  if (!container) return;

  const tracksToShow = APP_DATA.tracks.filter(t => t.id !== "all");
  container.innerHTML = tracksToShow.map(track => `
    <div class="track-card" onclick="selectTrackAndOpenCurriculum('${track.id}')">
      <div>
        <div class="track-card-header">
          <span class="track-card-icon">${track.icon}</span>
          <div>
            <div class="track-card-title">${track.name}</div>
            <div class="track-card-range">${track.range} (${track.count} Topics)</div>
          </div>
        </div>
      </div>
      <div style="font-size: 0.8rem; color: var(--text-muted); display: flex; justify-content: space-between; align-items: center; margin-top: 0.8rem;">
        <span>Click to study track</span>
        <i class="fas fa-arrow-right" style="color: var(--accent-primary);"></i>
      </div>
    </div>
  `).join('');
}

function selectTrackAndOpenCurriculum(trackId) {
  currentTrackFilter = trackId;
  switchTab("tab-curriculum");
  renderTrackFilterBar();
  renderTopicSidebar();
  const firstTopicInTrack = APP_DATA.modules.find(m => m.track === trackId) || APP_DATA.modules[0];
  renderTopicContent(firstTopicInTrack.id);
}

function renderTrackFilterBar() {
  const bar = document.getElementById("track-filter-bar");
  if (!bar) return;

  bar.innerHTML = APP_DATA.tracks.map(t => `
    <button class="track-chip ${t.id === currentTrackFilter ? 'active' : ''}" onclick="filterTopicsByTrack('${t.id}')">
      ${t.icon} ${t.name}
    </button>
  `).join('');
}

function filterTopicsByTrack(trackId) {
  currentTrackFilter = trackId;
  renderTrackFilterBar();
  renderTopicSidebar();
}

function renderTopicSidebar(searchQuery = "") {
  const sidebar = document.getElementById("topic-list-sidebar");
  if (!sidebar) return;

  let filtered = APP_DATA.modules;
  if (currentTrackFilter !== "all") {
    filtered = filtered.filter(m => m.track === currentTrackFilter);
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(m => 
      m.title.toLowerCase().includes(q) || 
      m.subtitle.toLowerCase().includes(q) || 
      m.keyTerms.some(t => t.toLowerCase().includes(q))
    );
  }

  if (filtered.length === 0) {
    sidebar.innerHTML = `<div style="padding: 1rem; color: var(--text-muted); font-size: 0.85rem;">No matching topics found.</div>`;
    return;
  }

  sidebar.innerHTML = filtered.map(m => {
    const isCompleted = userState.completedTopics.includes(m.id);
    const isActive = m.id === currentTopicId;
    return `
      <div class="topic-item ${isActive ? 'active' : ''}" onclick="renderTopicContent('${m.id}')">
        <span class="topic-item-num">#${m.number}</span>
        <span class="topic-item-title">${m.title}</span>
        ${isCompleted ? '<i class="fas fa-check-circle topic-item-check" title="Completed"></i>' : ''}
      </div>
    `;
  }).join('');
}

let isFullPageMode = false;
let currentFontSizeLevel = 0; // -1, 0, 1, 2

function toggleFullPageReader() {
  isFullPageMode = !isFullPageMode;
  const layout = document.querySelector(".curriculum-layout");
  if (layout) {
    if (isFullPageMode) {
      layout.classList.add("full-page-mode");
    } else {
      layout.classList.remove("full-page-mode");
    }
  }
  renderTopicContent(currentTopicId);
}

function adjustReadingFontSize(delta) {
  currentFontSizeLevel = Math.max(-1, Math.min(3, currentFontSizeLevel + delta));
  const fontSizes = ["0.95rem", "1.08rem", "1.2rem", "1.32rem", "1.45rem"];
  const selectedSize = fontSizes[currentFontSizeLevel + 1];
  
  const markdownBodies = document.querySelectorAll(".markdown-body");
  markdownBodies.forEach(b => b.style.fontSize = selectedSize);
  showToast(`Reading Font: ${selectedSize}`);
}

function renderTopicContent(topicId) {
  currentTopicId = topicId;
  userState.lastStudiedTopic = topicId;
  saveUserState();
  renderMobileHomeSummary();

  const modIdx = APP_DATA.modules.findIndex(m => m.id === topicId);
  const mod = modIdx !== -1 ? APP_DATA.modules[modIdx] : APP_DATA.modules[0];
  const contentArea = document.getElementById("module-content-area");
  if (!contentArea) return;

  renderTopicSidebar();

  const isCompleted = userState.completedTopics.includes(mod.id);
  const prevMod = modIdx > 0 ? APP_DATA.modules[modIdx - 1] : null;
  const nextMod = modIdx < APP_DATA.modules.length - 1 ? APP_DATA.modules[modIdx + 1] : null;

  let html = `
    <div class="module-header">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.8rem; margin-bottom: 0.8rem;">
        <span class="module-tag" style="font-size: 0.82rem; padding: 0.35rem 0.8rem;">Topic ${mod.number} of 46 • ${mod.readTime}</span>
        
        <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
          <div style="display: inline-flex; border: 1px solid var(--border-color); border-radius: var(--radius-md); overflow: hidden;">
            <button class="btn btn-secondary btn-sm" onclick="adjustReadingFontSize(-1)" title="Decrease Text Size" style="border-radius: 0; border: none; padding: 0.4rem 0.7rem;">A-</button>
            <button class="btn btn-secondary btn-sm" onclick="adjustReadingFontSize(1)" title="Increase Text Size" style="border-radius: 0; border: none; padding: 0.4rem 0.7rem;">A+</button>
          </div>

          <button class="btn ${isFullPageMode ? 'btn-success' : 'btn-secondary'} btn-sm" onclick="toggleFullPageReader()" title="Toggle Full Width Reader">
            <i class="fas ${isFullPageMode ? 'fa-compress-arrows-alt' : 'fa-expand-arrows-alt'}"></i>
            ${isFullPageMode ? 'Exit Full Page' : 'Full Page Mode'}
          </button>

          <button class="btn ${isCompleted ? 'btn-success' : 'btn-secondary'} btn-sm" onclick="toggleTopicCompletion('${mod.id}')">
            <i class="fas ${isCompleted ? 'fa-check-circle' : 'fa-circle'}"></i>
            ${isCompleted ? 'Completed ✓' : 'Mark Complete (+50 XP)'}
          </button>
        </div>
      </div>
      <h1 class="module-title-text">${mod.title}</h1>
      <p class="module-subtitle-text">${mod.subtitle}</p>
    </div>
  `;

  mod.sections.forEach(sec => {
    const formatted = formatMarkdownContent(sec.content);
    html += `
      <div class="module-section">
        <h3><i class="fas fa-bookmark" style="color: var(--accent-primary); font-size: 1.1rem;"></i> ${sec.heading}</h3>
        <div class="markdown-body">${formatted}</div>
      </div>
    `;
  });

  // Key Terms Chips
  if (mod.keyTerms && mod.keyTerms.length > 0) {
    html += `
      <div style="margin: 2rem 0; background: rgba(0,0,0,0.25); border: 1px solid var(--border-color); padding: 1.2rem 1.5rem; border-radius: var(--radius-md);">
        <strong style="font-size: 0.95rem; color: #ffffff; display: block; margin-bottom: 0.6rem;"><i class="fas fa-tags" style="color: var(--accent-cyan);"></i> Key Terms in Topic ${mod.number}:</strong>
        <div>
          ${mod.keyTerms.map(t => `<span class="key-term-pill" onclick="searchKeyTerm('${t}')">${t}</span>`).join('')}
        </div>
      </div>
    `;
  }

  // Active Recall Self-Test
  if (mod.selfTest) {
    html += `
      <div class="self-test-box">
        <h4 style="color: var(--accent-warning); font-size: 1.1rem; margin-bottom: 0.6rem;"><i class="fas fa-lightbulb"></i> Active Recall Self-Test Checkpoint</h4>
        <p style="font-size: 1.02rem; color: #ffffff; margin-bottom: 0.8rem; line-height: 1.6;">${mod.selfTest.q}</p>
        <button class="btn btn-secondary btn-sm" onclick="toggleSelfTestAnswer(this)">Reveal Answer</button>
        <div class="self-test-answer" style="display: none; margin-top: 0.8rem; font-size: 0.98rem; color: #a7f3d0; background: rgba(16, 185, 129, 0.18); border-left: 4px solid var(--accent-success); padding: 0.9rem 1.1rem; border-radius: var(--radius-sm); line-height: 1.6;">
          <strong>Answer:</strong> ${mod.selfTest.a}
        </div>
      </div>
    `;
  }

  // Takeaways
  html += `
    <div class="takeaway-box">
      <h4><i class="fas fa-check-circle"></i> Key Takeaways for Exam & Evaluation</h4>
      <ul style="padding-left: 1.6rem; font-size: 1.02rem; color: #e5e7eb;">
        ${mod.keyTakeaways.map(t => `<li style="margin-bottom: 0.5rem; line-height: 1.6;">${t}</li>`).join('')}
      </ul>
    </div>
  `;

  // Chapter Navigation Bar (Previous & Next Topic)
  html += `
    <div class="chapter-nav-bar">
      ${prevMod ? `
        <button class="btn btn-secondary" onclick="renderTopicContent('${prevMod.id}'); window.scrollTo({top: 0, behavior: 'smooth'});">
          <i class="fas fa-arrow-left"></i> Previous: Topic ${prevMod.number} (${prevMod.title.slice(0, 22)}...)
        </button>
      ` : '<div></div>'}
      ${nextMod ? `
        <button class="btn" onclick="renderTopicContent('${nextMod.id}'); window.scrollTo({top: 0, behavior: 'smooth'});">
          Next: Topic ${nextMod.number} (${nextMod.title.slice(0, 22)}...) <i class="fas fa-arrow-right"></i>
        </button>
      ` : '<div></div>'}
    </div>
  `;

  contentArea.innerHTML = html;
  
  // Apply current font size setting
  if (currentFontSizeLevel !== 0) {
    const fontSizes = ["0.95rem", "1.08rem", "1.2rem", "1.32rem", "1.45rem"];
    const selectedSize = fontSizes[currentFontSizeLevel + 1];
    document.querySelectorAll(".markdown-body").forEach(b => b.style.fontSize = selectedSize);
  }
}

function toggleTopicCompletion(topicId) {
  const isCompletedNow = !userState.completedTopics.includes(topicId);
  if (isCompletedNow) {
    userState.completedTopics.push(topicId);
    awardXPOnce(`topic_${topicId}`, 50, "for completing curriculum topic");
    if (userState.completedTopics.length >= 10) {
      unlockBadge("python_master");
    }
  } else {
    userState.completedTopics = userState.completedTopics.filter(id => id !== topicId);
  }
  recordLearningResult({
    contentId: topicId,
    contentType: "topic",
    topicId: topicId,
    correct: isCompletedNow
  });
  saveUserState();
  renderTopicContent(topicId);
}

function toggleSelfTestAnswer(btn) {
  const answerDiv = btn.nextElementSibling;
  if (answerDiv.style.display === "none") {
    answerDiv.style.display = "block";
    btn.textContent = "Hide Answer";
    addXP(10, "for completing self-test recall");
  } else {
    answerDiv.style.display = "none";
    btn.textContent = "Reveal Answer";
  }
}

function setupTopicSearch() {
  const input = document.getElementById("topic-search-input");
  if (!input) return;
  input.addEventListener("input", (e) => {
    renderTopicSidebar(e.target.value);
  });
}

function searchKeyTerm(term) {
  const navCurriculum = document.querySelector('[data-tab="tab-curriculum"]');
  if (navCurriculum) navCurriculum.click();
  const searchInput = document.getElementById("topic-search-input");
  if (searchInput) {
    searchInput.value = term;
    renderTopicSidebar(term);
  }
}

// -------------------------------------------------------------
// FORMULA MATRIX & KEY TERMS REVISION
// -------------------------------------------------------------

function renderFormulaMatrix() {
  const container = document.getElementById("formula-grid-container");
  if (!container) return;

  let formulas = APP_DATA.formulas;
  if (currentFormulaTag !== "all") {
    formulas = formulas.filter(f => f.tags.includes(currentFormulaTag));
  }

  container.innerHTML = formulas.map(f => `
    <div class="formula-card">
      <div>
        <div class="formula-name">${f.name}</div>
        <div class="formula-topic-tag">${f.topic}</div>
        <div class="formula-display">
          <i class="fas fa-square-root-variable" style="color: var(--accent-warning); margin-right: 0.4rem;"></i>
          ${f.plain}
        </div>
      </div>
      <div>
        <p class="formula-desc">${f.desc}</p>
        <div style="display: flex; gap: 0.3rem; flex-wrap: wrap; margin-top: 0.6rem;">
          ${f.tags.map(t => `<span style="font-size: 0.7rem; background: rgba(255,255,255,0.06); padding: 0.15rem 0.45rem; border-radius: 10px; color: var(--text-muted);">${t}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

function filterFormulas(tag) {
  currentFormulaTag = tag;
  document.querySelectorAll(".formula-tag-filters .tag-pill").forEach(p => {
    if (p.textContent.includes(tag) || (tag === "all" && p.textContent.includes("All"))) {
      p.classList.add("active");
    } else {
      p.classList.remove("active");
    }
  });
  renderFormulaMatrix();
}

function renderKeyTerms(query = "") {
  const container = document.getElementById("key-terms-directory");
  if (!container) return;

  // Extract unique key terms across all 46 modules
  const allTerms = [];
  APP_DATA.modules.forEach(m => {
    if (m.keyTerms) {
      m.keyTerms.forEach(t => {
        if (!allTerms.find(item => item.term.toLowerCase() === t.toLowerCase())) {
          allTerms.push({ term: t, topicId: m.id, topicTitle: m.title });
        }
      });
    }
  });

  let filtered = allTerms;
  if (query.trim()) {
    const q = query.toLowerCase();
    filtered = filtered.filter(item => item.term.toLowerCase().includes(q));
  }

  container.innerHTML = filtered.map(item => `
    <span class="term-badge" onclick="renderTopicContent('${item.topicId}'); document.querySelector('[data-tab=\\'tab-curriculum\\']').click();">
      ${item.term} <span style="font-size: 0.7rem; color: var(--text-dim);">(${item.topicTitle.slice(0, 16)}...)</span>
    </span>
  `).join('');
}

function setupTermsSearch() {
  const input = document.getElementById("terms-search-input");
  if (!input) return;
  input.addEventListener("input", (e) => {
    renderKeyTerms(e.target.value);
  });
}

// -------------------------------------------------------------
// 9 INTERACTIVE SIMULATORS
// -------------------------------------------------------------

// Visualizer 1: RAG Simulator
function setupRAGVisualizer() {
  const queryInput = document.getElementById("rag-query-input");
  const runBtn = document.getElementById("run-rag-sim-btn");
  const stage = document.getElementById("rag-sim-stage");

  const documentPool = [
    { id: 1, title: "HR Leave Policy Manual (Topic 44)", text: "Employees are granted 20 days of paid annual leave each year. Up to 5 days can be carried forward." },
    { id: 2, title: "IT Infrastructure Handbook (Topic 4)", text: "Password reset requests must be submitted via IT Portal ticket. Overdue tickets escalate after 48 hours." },
    { id: 3, title: "Scikit-Learn Pipeline Guidelines (Topic 37)", text: "Models are trained using leak-free scikit-learn pipelines with StandardScaler inside cross-validation splits." },
    { id: 4, title: "API Security Guidelines (Topic 23)", text: "API keys like GROQ_API_KEY must be stored in .env files and excluded from Git using .gitignore." },
    { id: 5, title: "Logistic Regression & Sigmoid (Topic 32)", text: "Logistic regression squashes linear combinations through the sigmoid function σ(z) = 1/(1+e^-z) to yield class probabilities." }
  ];

  if (!runBtn) return;

  runBtn.addEventListener("click", () => {
    const query = queryInput.value.toLowerCase().trim();
    if (!query) return;

    stage.innerHTML = `<p style="color: var(--accent-cyan); font-size: 0.9rem;"><i class="fas fa-spinner fa-spin"></i> Generating 384-dim all-MiniLM-L6-v2 embedding & calculating cosine similarity...</p>`;

    setTimeout(() => {
      const scoredDocs = documentPool.map(doc => {
        let score = 0.15;
        const words = query.split(/\s+/);
        words.forEach(w => {
          if (w.length > 3 && doc.text.toLowerCase().includes(w)) {
            score += 0.28;
          }
        });
        score = Math.min(0.98, score + Math.random() * 0.08);
        return { ...doc, score: parseFloat(score.toFixed(4)) };
      });

      scoredDocs.sort((a, b) => b.score - a.score);
      const topK = scoredDocs.slice(0, 2);

      let html = `
        <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.8rem;">
          Query Vector: <span style="font-family: var(--font-code); color: var(--accent-primary);">[0.042, -0.198, 0.512, ... (384-dims)]</span>
        </div>
        <h4 style="font-size: 0.95rem; margin-bottom: 0.8rem;">Indexed Chunks Ranked by Cosine Similarity:</h4>
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
          <pre style="margin-top: 0.5rem; font-size: 0.8rem;">System: Answer the question using ONLY the provided context below.
Context:
${topK.map(k => `[Source: ${k.title}] ${k.text}`).join('\n')}

User: ${queryInput.value}</pre>
        </div>
      `;

      stage.innerHTML = html;
      addXP(25, "for running RAG Cosine Search");
    }, 400);
  });
}

// Visualizer 2: Agent ReAct Tool Loop
function setupAgentVisualizer() {
  const stepBtn = document.getElementById("step-agent-btn");
  const resetBtn = document.getElementById("reset-agent-btn");
  const stage = document.getElementById("agent-sim-stage");
  if (!stepBtn || !stage) return;

  const agentSteps = [
    { type: "user", text: "User Goal: 'Find my pending IT support tickets and tell me which ones are overdue.'" },
    { type: "thought", text: "Agent Thought 1: User wants pending tickets. Need to query the IT ticket database API." },
    { type: "action", text: "Tool Call: get_user_tickets(user_id='Vikas', status='open')" },
    { type: "observation", text: "Observation: Received 2 tickets: [{id: 104, title: 'VPN Reset', created: '2026-08-10', SLA: '24h'}, {id: 108, title: 'Monitor Stand', created: '2026-08-16', SLA: '72h'}]" },
    { type: "thought", text: "Agent Thought 2: Today is 2026-08-17. Ticket #104 (created 2026-08-10 with 24h SLA) is 6 days overdue. Formulating response." },
    { type: "final", text: "Final Answer: 'You have 2 open IT tickets. Ticket #104 (VPN Reset) is currently overdue by 6 days. Ticket #108 (Monitor Stand) is within SLA.'" }
  ];

  stepBtn.addEventListener("click", () => {
    if (agentStep >= agentSteps.length) {
      agentStep = 0;
      stage.innerHTML = "";
    }

    const current = agentSteps[agentStep];
    const card = document.createElement("div");
    card.style.padding = "0.85rem 1.1rem";
    card.style.borderRadius = "var(--radius-md)";
    card.style.marginBottom = "0.6rem";
    card.style.fontSize = "0.88rem";
    card.style.animation = "fadeIn 0.3s ease";

    if (current.type === "user") {
      card.style.background = "rgba(255, 255, 255, 0.08)";
      card.style.border = "1px solid var(--border-color)";
      card.innerHTML = `<strong><i class="fas fa-user"></i> ${current.text}</strong>`;
    } else if (current.type === "thought") {
      card.style.background = "rgba(99, 102, 241, 0.15)";
      card.style.border = "1px solid var(--accent-primary)";
      card.style.color = "#a5b4fc";
      card.innerHTML = `<i class="fas fa-brain"></i> ${current.text}`;
    } else if (current.type === "action") {
      card.style.background = "rgba(245, 158, 11, 0.15)";
      card.style.border = "1px solid var(--accent-warning)";
      card.style.color = "#fcd34d";
      card.innerHTML = `<i class="fas fa-wrench"></i> ${current.text}`;
    } else if (current.type === "observation") {
      card.style.background = "rgba(6, 182, 212, 0.15)";
      card.style.border = "1px solid var(--accent-cyan)";
      card.style.color = "#67e8f9";
      card.innerHTML = `<i class="fas fa-eye"></i> ${current.text}`;
    } else if (current.type === "final") {
      card.style.background = "rgba(16, 185, 129, 0.2)";
      card.style.border = "1px solid var(--accent-success)";
      card.style.color = "#ffffff";
      card.innerHTML = `<strong><i class="fas fa-check-circle"></i> ${current.text}</strong>`;
    }

    stage.appendChild(card);
    agentStep++;

    if (agentStep === agentSteps.length) {
      if (!userState.agentVisDone) {
        userState.agentVisDone = true;
        unlockBadge("agent_master");
        addXP(50, "for completing Agent ReAct Tool Loop Simulation");
      }
    }
  });

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      agentStep = 0;
      stage.innerHTML = `<p style="color: var(--text-muted); font-size: 0.9rem;">Click "Execute Next Agent Step" to step through the ReAct (Reason + Act) loop.</p>`;
    });
  }
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
X_scaled = scaler.fit_transform(X) # <--- LEAK! Computes mean/std of ENTIRE dataset

X_train, X_test, y_train, y_test = train_test_split(X_scaled, y)
model.fit(X_train, y_train)</pre>
        <p style="font-size: 0.85rem; color: #fca5a5;">
          <strong>Validation Result:</strong> Cross-Validation F1 Score = <span style="font-family: var(--font-code); font-weight: bold;">0.982 (Artificial Mirage)</span><br>
          <strong>Production Deployment:</strong> Real F1 Score = <span style="font-family: var(--font-code); font-weight: bold;">0.541 (CRASH & BURN)</span>
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
          <strong>Validation Result:</strong> Cross-Validation F1 Score = <span style="font-family: var(--font-code); font-weight: bold; color: var(--accent-success);">0.782 (Honest & Leak-Free)</span><br>
          <strong>Production Deployment:</strong> Real F1 Score = <span style="font-family: var(--font-code); font-weight: bold; color: var(--accent-success);">0.779 (Stable & Reliable)</span>
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

// Visualizer 4: Confusion Matrix & Metrics Tuner
function updateConfusionMatrix() {
  const tp = parseInt(document.getElementById("slider-tp")?.value || 80);
  const fp = parseInt(document.getElementById("slider-fp")?.value || 20);
  const fn = parseInt(document.getElementById("slider-fn")?.value || 10);
  const tn = parseInt(document.getElementById("slider-tn")?.value || 150);

  const valTp = document.getElementById("val-tp");
  const valFp = document.getElementById("val-fp");
  const valFn = document.getElementById("val-fn");
  const valTn = document.getElementById("val-tn");

  if (valTp) valTp.textContent = tp;
  if (valFp) valFp.textContent = fp;
  if (valFn) valFn.textContent = fn;
  if (valTn) valTn.textContent = tn;

  const total = tp + fp + fn + tn;
  const precision = (tp + fp) > 0 ? (tp / (tp + fp)) : 0;
  const recall = (tp + fn) > 0 ? (tp / (tp + fn)) : 0;
  const f1 = (precision + recall) > 0 ? (2 * (precision * recall) / (precision + recall)) : 0;
  const accuracy = total > 0 ? ((tp + tn) / total) : 0;
  const fpr = (fp + tn) > 0 ? (fp / (fp + tn)) : 0;

  const precEl = document.getElementById("metric-precision");
  const recEl = document.getElementById("metric-recall");
  const f1El = document.getElementById("metric-f1");
  const accEl = document.getElementById("metric-accuracy");
  const fprEl = document.getElementById("metric-fpr");

  if (precEl) precEl.textContent = precision.toFixed(3);
  if (recEl) recEl.textContent = recall.toFixed(3);
  if (f1El) f1El.textContent = f1.toFixed(3);
  if (accEl) accEl.textContent = accuracy.toFixed(3);
  if (fprEl) fprEl.textContent = fpr.toFixed(3);
}

function setConfusionPreset(type) {
  const tpEl = document.getElementById("slider-tp");
  const fpEl = document.getElementById("slider-fp");
  const fnEl = document.getElementById("slider-fn");
  const tnEl = document.getElementById("slider-tn");

  if (type === 'imbalanced') {
    // Accuracy Paradox preset: 99% negative class, dummy model
    if (tpEl) tpEl.value = 0;
    if (fpEl) fpEl.value = 0;
    if (fnEl) fnEl.value = 5;
    if (tnEl) tnEl.value = 495;
  } else if (type === 'perfect') {
    if (tpEl) tpEl.value = 100;
    if (fpEl) fpEl.value = 0;
    if (fnEl) fnEl.value = 0;
    if (tnEl) tnEl.value = 100;
  } else {
    if (tpEl) tpEl.value = 80;
    if (fpEl) fpEl.value = 20;
    if (fnEl) fnEl.value = 10;
    if (tnEl) tnEl.value = 150;
  }
  updateConfusionMatrix();
  addXP(15, "for exploring Confusion Matrix presets");
}

// Visualizer 5: Sigmoid & Decision Threshold
function updateSigmoidSimulator() {
  const slider = document.getElementById("sigmoid-threshold-slider");
  const display = document.getElementById("threshold-val-display");
  const policyText = document.getElementById("threshold-policy-text");
  const samplesList = document.getElementById("sigmoid-samples-list");

  if (!slider) return;
  const threshold = parseFloat(slider.value);
  if (display) display.textContent = threshold.toFixed(2);

  if (policyText) {
    if (threshold <= 0.3) {
      policyText.innerHTML = `<strong>High-Recall Sensitive Policy ($t=${threshold.toFixed(2)}$):</strong> Flags positive even on low probability. Ideal for <span style="color: var(--accent-warning);">Cancer Screening / Fraud Detection</span> (minimizes False Negatives).`;
    } else if (threshold >= 0.7) {
      policyText.innerHTML = `<strong>High-Precision Strict Policy ($t=${threshold.toFixed(2)}$):</strong> Requires high certainty before flagging positive. Ideal for <span style="color: var(--accent-pink);">Spam Filtering / Loan Approvals</span> (minimizes False Positives).`;
    } else {
      policyText.innerHTML = `<strong>Balanced Standard Policy ($t=${threshold.toFixed(2)}$):</strong> Default 0.50 cutoff giving equal weight to precision and recall trade-offs.`;
    }
  }

  if (samplesList) {
    const mockZValues = [-2.5, -0.8, 0.0, 0.6, 2.2];
    samplesList.innerHTML = mockZValues.map(z => {
      const p = 1 / (1 + Math.exp(-z));
      const predClass = p >= threshold ? 1 : 0;
      const isPositive = predClass === 1;
      return `
        <div style="margin-bottom: 0.3rem; display: flex; justify-content: space-between;">
          <span>z = ${z >= 0 ? '+' : ''}${z.toFixed(1)} → p = ${p.toFixed(3)}</span>
          <span style="font-weight: bold; color: ${isPositive ? 'var(--accent-success)' : 'var(--text-muted)'};">
            Pred: Class ${predClass}
          </span>
        </div>
      `;
    }).join('');
  }
}

// Visualizer 6: Decision Tree Split & Gini/Entropy
function calculateTreeImpurity() {
  const c0 = Math.max(0, parseInt(document.getElementById("dt-c0")?.value || 9));
  const c1 = Math.max(0, parseInt(document.getElementById("dt-c1")?.value || 5));
  const total = c0 + c1;
  const resultsBox = document.getElementById("tree-impurity-results");
  if (!resultsBox) return;

  if (total === 0) {
    resultsBox.innerHTML = "<p>Please enter at least 1 sample.</p>";
    return;
  }

  const p0 = c0 / total;
  const p1 = c1 / total;

  // Gini = 1 - (p0^2 + p1^2)
  const gini = 1 - (Math.pow(p0, 2) + Math.pow(p1, 2));

  // Entropy = - (p0*log2(p0) + p1*log2(p1))
  let entropy = 0;
  if (p0 > 0) entropy -= p0 * (Math.log2(p0));
  if (p1 > 0) entropy -= p1 * (Math.log2(p1));

  resultsBox.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
      <div style="background: rgba(99, 102, 241, 0.15); border: 1px solid var(--accent-primary); padding: 0.8rem; border-radius: var(--radius-sm);">
        <strong style="color: var(--accent-primary);">Gini Impurity:</strong>
        <div style="font-size: 1.4rem; font-family: var(--font-code); font-weight: bold; color: #ffffff;">${gini.toFixed(4)}</div>
        <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">Formula: 1 - (${p0.toFixed(2)}² + ${p1.toFixed(2)}²)</div>
      </div>
      <div style="background: rgba(245, 158, 11, 0.15); border: 1px solid var(--accent-warning); padding: 0.8rem; border-radius: var(--radius-sm);">
        <strong style="color: var(--accent-warning);">Shannon Entropy:</strong>
        <div style="font-size: 1.4rem; font-family: var(--font-code); font-weight: bold; color: #ffffff;">${entropy.toFixed(4)} bits</div>
        <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">Formula: -Σ p_i log₂(p_i)</div>
      </div>
    </div>
    <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.6rem;">
      * Note: When a node is perfectly pure (all Class 0 or all Class 1), Gini = 0.0 and Entropy = 0.0. Maximum binary Gini is 0.5; maximum binary Entropy is 1.0.
    </p>
  `;
}

// Visualizer 7: SQL Joins
function showSQLJoin(type) {
  const stage = document.getElementById("sql-join-stage");
  if (!stage) return;

  document.querySelectorAll("[id^='join-btn-']").forEach(b => b.classList.remove("active"));
  const activeBtn = document.getElementById(`join-btn-${type}`);
  if (activeBtn) activeBtn.classList.add("active");

  const students = [
    { id: 1, name: "Alice", course_id: 101 },
    { id: 2, name: "Bob", course_id: 102 },
    { id: 3, name: "Charlie", course_id: 103 },
    { id: 4, name: "Diana", course_id: null }
  ];

  const courses = [
    { course_id: 101, title: "ML Engineering" },
    { course_id: 102, title: "Generative AI" },
    { course_id: 105, title: "Quantum AI" }
  ];

  let joinedRows = [];
  let description = "";

  if (type === 'inner') {
    description = "INNER JOIN: Returns only rows where course_id matches in both tables (Alice and Bob).";
    joinedRows = [
      { id: 1, name: "Alice", course_id: 101, title: "ML Engineering" },
      { id: 2, name: "Bob", course_id: 102, title: "Generative AI" }
    ];
  } else if (type === 'left') {
    description = "LEFT JOIN: Returns ALL students from the left table; unmatched course fields are filled with NULL.";
    joinedRows = [
      { id: 1, name: "Alice", course_id: 101, title: "ML Engineering" },
      { id: 2, name: "Bob", course_id: 102, title: "Generative AI" },
      { id: 3, name: "Charlie", course_id: 103, title: "NULL" },
      { id: 4, name: "Diana", course_id: "NULL", title: "NULL" }
    ];
  } else if (type === 'right') {
    description = "RIGHT JOIN: Returns ALL courses from the right table; unmatched student fields are filled with NULL.";
    joinedRows = [
      { id: 1, name: "Alice", course_id: 101, title: "ML Engineering" },
      { id: 2, name: "Bob", course_id: 102, title: "Generative AI" },
      { id: "NULL", name: "NULL", course_id: 105, title: "Quantum AI" }
    ];
  } else if (type === 'outer') {
    description = "FULL OUTER JOIN: Returns all rows from both tables, filling NULLs wherever there is no match.";
    joinedRows = [
      { id: 1, name: "Alice", course_id: 101, title: "ML Engineering" },
      { id: 2, name: "Bob", course_id: 102, title: "Generative AI" },
      { id: 3, name: "Charlie", course_id: 103, title: "NULL" },
      { id: 4, name: "Diana", course_id: "NULL", title: "NULL" },
      { id: "NULL", name: "NULL", course_id: 105, title: "Quantum AI" }
    ];
  }

  stage.innerHTML = `
    <div style="background: rgba(99, 102, 241, 0.1); border-left: 3px solid var(--accent-cyan); padding: 0.8rem; border-radius: 0 var(--radius-sm) var(--radius-sm) 0; margin-bottom: 1rem; font-size: 0.88rem; color: #ffffff;">
      ${description}
    </div>
    <div style="overflow-x: auto;">
      <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem;">
        <thead>
          <tr style="background: rgba(255,255,255,0.06); text-align: left;">
            <th style="padding: 0.5rem; border: 1px solid var(--border-color);">students.id</th>
            <th style="padding: 0.5rem; border: 1px solid var(--border-color);">students.name</th>
            <th style="padding: 0.5rem; border: 1px solid var(--border-color);">course_id</th>
            <th style="padding: 0.5rem; border: 1px solid var(--border-color);">courses.title</th>
          </tr>
        </thead>
        <tbody>
          ${joinedRows.map(r => `
            <tr>
              <td style="padding: 0.5rem; border: 1px solid var(--border-color); color: ${r.id === 'NULL' ? 'var(--text-dim)' : 'inherit'};">${r.id}</td>
              <td style="padding: 0.5rem; border: 1px solid var(--border-color); color: ${r.name === 'NULL' ? 'var(--text-dim)' : 'inherit'};">${r.name}</td>
              <td style="padding: 0.5rem; border: 1px solid var(--border-color); font-family: var(--font-code);">${r.course_id}</td>
              <td style="padding: 0.5rem; border: 1px solid var(--border-color); color: ${r.title === 'NULL' ? 'var(--text-dim)' : 'var(--accent-cyan)'};">${r.title}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

// Visualizer 8: K-Means Clustering Simulator
function stepKMeans() {
  const stage = document.getElementById("kmeans-stage");
  const label = document.getElementById("kmeans-step-label");
  if (!stage || !label) return;

  const stepsInfo = [
    {
      title: "Step 1: Random Centroid Initialization",
      text: "Randomly initialized K=2 Centroids (Centroid A: Red at (2, 3), Centroid B: Blue at (7, 8)).",
      cA: "(2.0, 3.0)", cB: "(7.0, 8.0)",
      c0Count: 3, c1Count: 3
    },
    {
      title: "Step 2: Assign Points by Euclidean Distance",
      text: "Calculated Euclidean distance d = √((x1-x2)² + (y1-y2)²) from each point to both centroids. Assigned each point to closest centroid.",
      cA: "(2.0, 3.0)", cB: "(7.0, 8.0)",
      c0Count: 4, c1Count: 2
    },
    {
      title: "Step 3: Recompute Centroid Means",
      text: "Recomputed Centroid coordinates as the mean (average x, average y) of all assigned points.",
      cA: "(2.5, 3.2)", cB: "(6.8, 7.9)",
      c0Count: 4, c1Count: 2
    },
    {
      title: "Step 4: Convergence Reached!",
      text: "Centroids have stopped moving. Silhouette Score s = +0.84 (Strong, well-separated clusters).",
      cA: "(2.5, 3.2)", cB: "(6.8, 7.9)",
      c0Count: 4, c1Count: 2
    }
  ];

  const current = stepsInfo[kmeansStep % stepsInfo.length];
  label.textContent = current.title;

  stage.innerHTML = `
    <p style="font-size: 0.88rem; color: #ffffff; margin-bottom: 0.8rem;">${current.text}</p>
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <div style="background: rgba(239, 68, 68, 0.15); border: 1px solid #ef4444; padding: 0.6rem 1rem; border-radius: var(--radius-sm); font-size: 0.85rem;">
        <strong style="color: #fca5a5;">Centroid A (Cluster 0):</strong> ${current.cA} • Points: ${current.c0Count}
      </div>
      <div style="background: rgba(6, 182, 212, 0.15); border: 1px solid var(--accent-cyan); padding: 0.6rem 1rem; border-radius: var(--radius-sm); font-size: 0.85rem;">
        <strong style="color: var(--accent-cyan);">Centroid B (Cluster 1):</strong> ${current.cB} • Points: ${current.c1Count}
      </div>
    </div>
  `;

  kmeansStep++;
  addXP(15, "for stepping through K-Means loop");
}

function resetKMeans() {
  kmeansStep = 0;
  const stage = document.getElementById("kmeans-stage");
  const label = document.getElementById("kmeans-step-label");
  if (label) label.textContent = "Step 0: Unassigned Points";
  if (stage) {
    stage.innerHTML = `
      <p style="font-size: 0.85rem; color: var(--text-muted);">6 sample data points in 2D space. Click "Next K-Means Step" to initialize K=2 centroids and step through convergence.</p>
    `;
  }
}

// Visualizer 9: LangGraph Multi-Agent Router
function runLangGraphRouter() {
  const query = document.getElementById("langgraph-query-input")?.value.toLowerCase() || "";
  const stage = document.getElementById("langgraph-stage");
  if (!stage) return;

  let detectedIntent = "general_handler";
  let intentBadge = "General Inquiry Agent";
  let agentResponse = "General Agent: 'Welcome! How can I assist you with your platform questions today?'";

  if (query.includes("invoice") || query.includes("bill") || query.includes("refund") || query.includes("payment")) {
    detectedIntent = "billing_agent";
    intentBadge = "Billing & Financial Specialist Agent";
    agentResponse = "Billing Agent: 'Querying Stripe/Payment API... Your invoice #INV-2026-88 is ready for PDF download in your portal.'";
  } else if (query.includes("leave") || query.includes("hr") || query.includes("policy") || query.includes("holiday")) {
    detectedIntent = "hr_agent";
    intentBadge = "HR Policy & Leave Agent (RAG Grounded)";
    agentResponse = "HR Agent: 'Retrieving HR Policy Vector Index... Under Section 4, employees can roll over up to 5 days of annual leave.'";
  }

  stage.innerHTML = `
    <div style="display: flex; align-items: center; gap: 0.8rem; flex-wrap: wrap; margin-bottom: 1rem;">
      <div style="background: rgba(255,255,255,0.08); padding: 0.6rem 1rem; border-radius: var(--radius-sm); font-size: 0.82rem;">
        <i class="fas fa-play-circle" style="color: var(--accent-primary);"></i> StateGraph Input: <span style="color: #ffffff;">"${query}"</span>
      </div>
      <i class="fas fa-arrow-right" style="color: var(--text-dim);"></i>
      <div style="background: rgba(99, 102, 241, 0.2); border: 1px solid var(--accent-primary); padding: 0.6rem 1rem; border-radius: var(--radius-sm); font-size: 0.82rem;">
        <i class="fas fa-filter"></i> Classifier Node: <span style="color: var(--accent-cyan); font-weight: bold;">${detectedIntent}</span>
      </div>
      <i class="fas fa-arrow-right" style="color: var(--text-dim);"></i>
      <div style="background: rgba(16, 185, 129, 0.2); border: 1px solid var(--accent-success); padding: 0.6rem 1rem; border-radius: var(--radius-sm); font-size: 0.82rem;">
        <i class="fas fa-robot"></i> ${intentBadge}
      </div>
    </div>
    <div style="background: rgba(5, 8, 17, 0.9); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1rem; font-size: 0.88rem; color: #e5e7eb;">
      <strong>Updated Agent State Payload:</strong>
      <pre style="margin-top: 0.5rem; font-size: 0.8rem; color: #a7f3d0;">{
  "query": "${query}",
  "intent": "${detectedIntent}",
  "routed_node": "${detectedIntent}",
  "response": "${agentResponse}"
}</pre>
    </div>
  `;
}

// -------------------------------------------------------------
// FLASHCARDS SPACING DECK
// -------------------------------------------------------------

function renderFlashcards() {
  if (currentFlashcardDeck.length === 0) return;
  const card = currentFlashcardDeck[currentFlashcardIdx % currentFlashcardDeck.length];

  document.querySelectorAll(".flashcard-front-text").forEach(el => el.textContent = card.front);
  document.querySelectorAll(".flashcard-back-text").forEach(el => el.textContent = card.back);
  document.querySelectorAll(".flashcard-counter").forEach(el => el.textContent = `Card ${currentFlashcardIdx + 1} of ${currentFlashcardDeck.length}`);
}

function nextFlashcard() {
  document.querySelectorAll(".flashcard-wrapper").forEach(w => w.classList.remove("flipped"));
  currentFlashcardIdx = (currentFlashcardIdx + 1) % currentFlashcardDeck.length;
  setTimeout(renderFlashcards, 180);
}

function prevFlashcard() {
  document.querySelectorAll(".flashcard-wrapper").forEach(w => w.classList.remove("flipped"));
  currentFlashcardIdx = (currentFlashcardIdx - 1 + currentFlashcardDeck.length) % currentFlashcardDeck.length;
  setTimeout(renderFlashcards, 180);
}

function filterFlashcardTrack(trackId) {
  if (trackId === "all") {
    currentFlashcardDeck = [...APP_DATA.flashcards];
  } else {
    currentFlashcardDeck = APP_DATA.flashcards.filter(f => f.track === trackId);
  }
  currentFlashcardIdx = 0;
  document.querySelectorAll(".flashcard-wrapper").forEach(w => w.classList.remove("flipped"));
  renderFlashcards();
}

// -------------------------------------------------------------
// QUIZZES & TIMED EXAM SIMULATOR
// -------------------------------------------------------------

function renderQuizzes() {
  const container = document.getElementById("quiz-list-container");
  if (!container) return;

  let html = "";
  APP_DATA.quizzes.forEach(q => {
    const isCompleted = userState.completedQuizzes.includes(q.id);
    html += `
      <div class="quiz-card" id="quiz-card-${q.id}">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;">
          <span style="font-size: 0.75rem; color: var(--accent-primary); font-weight: 700; text-transform: uppercase;">IITP Exam Concept Quiz</span>
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

  container.innerHTML = html;

  // Scenario challenges
  const scenarioContainer = document.getElementById("scenario-list-container");
  if (scenarioContainer) {
    let sHtml = "";
    APP_DATA.scenarioChallenges.forEach(sc => {
      sHtml += `
        <div class="quiz-card" style="border-color: rgba(236, 72, 153, 0.3);">
          <div class="module-tag" style="background: rgba(236, 72, 153, 0.15); color: var(--accent-pink);">${sc.title}</div>
          <p style="font-size: 0.9rem; color: #e5e7eb; margin: 0.8rem 0;">${sc.context}</p>
          <div style="background: rgba(0,0,0,0.3); border-left: 3px solid var(--accent-pink); padding: 0.8rem; margin-bottom: 1rem; border-radius: 0 8px 8px 0;">
            <strong style="font-size: 0.82rem; color: var(--accent-pink);">Observed Symptoms:</strong>
            <ul style="font-size: 0.82rem; color: var(--text-muted); padding-left: 1.2rem;">
              ${sc.symptoms.map(s => `<li>${s}</li>`).join('')}
            </ul>
          </div>
          <p class="quiz-question-text" style="font-size: 1.02rem;">${sc.question}</p>
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
    scenarioContainer.innerHTML = sHtml;
  }
}

function handleQuizAnswer(quizId, selectedIdx, isScenario = false) {
  const quiz = isScenario 
    ? APP_DATA.scenarioChallenges.find(s => s.id === quizId)
    : APP_DATA.quizzes.find(q => q.id === quizId);

  if (!quiz) return;

  const card = document.getElementById(`quiz-card-${quizId}`) || event.target.closest('.quiz-card');
  const options = card ? card.querySelectorAll('.quiz-option') : [];
  const explainBox = card ? card.querySelector('.explanation-box') : null;
  const isCorrect = selectedIdx === quiz.correctIndex;

  options.forEach((opt, idx) => {
    opt.style.pointerEvents = "none";
    if (idx === quiz.correctIndex) {
      opt.classList.add("correct");
    } else if (idx === selectedIdx) {
      opt.classList.add("incorrect");
    }
  });

  if (explainBox) explainBox.style.display = "block";

  if (isCorrect) {
    if (!userState.completedQuizzes.includes(quizId)) {
      userState.completedQuizzes.push(quizId);
      saveUserState();
      awardXPOnce(`quiz_${quizId}`, quiz.xp, "for correct quiz response");
      unlockBadge("first_quiz");
    }
  }

  recordLearningResult({
    contentId: quizId,
    contentType: isScenario ? "scenario" : "quiz",
    topicId: quiz.track || "track1",
    correct: isCorrect
  });
}

// Timed Mock Exam Simulator
function startMockExam() {
  const navQuizzes = document.querySelector('[data-tab="tab-quizzes"]');
  if (navQuizzes) navQuizzes.click();

  const runtime = document.getElementById("mock-exam-runtime");
  if (!runtime) return;

  runtime.style.display = "block";

  // Build random 10-question test pool from quizzes + self-test topics
  const combinedPool = [...APP_DATA.quizzes];
  examQuestions = combinedPool.sort(() => 0.5 - Math.random()).slice(0, 10);
  currentExamIdx = 0;
  examUserAnswers = [];
  examSecondsRemaining = 300; // 5 mins

  if (examTimer) clearInterval(examTimer);
  examTimer = setInterval(updateExamTimer, 1000);
  updateExamTimer();

  renderExamQuestion();
}

function updateExamTimer() {
  const display = document.getElementById("exam-timer-display");
  if (!display) return;

  const mins = Math.floor(examSecondsRemaining / 60);
  const secs = examSecondsRemaining % 60;
  display.innerHTML = `<i class="fas fa-clock"></i> Time Remaining: ${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  if (examSecondsRemaining <= 0) {
    clearInterval(examTimer);
    finishMockExam();
  }
  examSecondsRemaining--;
}

function renderExamQuestion() {
  const qBox = document.getElementById("exam-question-box");
  const counter = document.getElementById("exam-progress-counter");
  if (!qBox || currentExamIdx >= examQuestions.length) return;

  const q = examQuestions[currentExamIdx];
  if (counter) counter.textContent = `Question ${currentExamIdx + 1} of ${examQuestions.length}`;

  qBox.innerHTML = `
    <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid var(--border-color); padding: 1.5rem; border-radius: var(--radius-md);">
      <p class="quiz-question-text" style="font-size: 1.05rem; margin-bottom: 1.2rem;">${q.question}</p>
      <div class="options-list">
        ${q.options.map((opt, idx) => `
          <div class="quiz-option" onclick="selectExamAnswer(${idx})">
            <span style="width: 24px; height: 24px; border-radius: 50%; background: rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: bold;">${String.fromCharCode(65 + idx)}</span>
            <span>${opt}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function selectExamAnswer(selectedIdx) {
  examUserAnswers[currentExamIdx] = selectedIdx;
  currentExamIdx++;

  if (currentExamIdx < examQuestions.length) {
    renderExamQuestion();
  } else {
    clearInterval(examTimer);
    finishMockExam();
  }
}

function finishMockExam() {
  const qBox = document.getElementById("exam-question-box");
  if (!qBox) return;

  let correctCount = 0;
  examQuestions.forEach((q, i) => {
    if (examUserAnswers[i] === q.correctIndex) correctCount++;
  });

  const percentage = Math.round((correctCount / examQuestions.length) * 100);
  const earnedXP = correctCount * 25;
  addXP(earnedXP, `for completing Mock Exam (${percentage}%)`);

  if (percentage >= 80) {
    unlockBadge("exam_ace");
  }

  qBox.innerHTML = `
    <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(15, 23, 42, 0.9)); border: 1px solid var(--accent-success); padding: 2rem; border-radius: var(--radius-lg); text-align: center;">
      <div style="font-size: 3rem; margin-bottom: 0.5rem;">${percentage >= 70 ? '🎉' : '📚'}</div>
      <h3 style="font-family: var(--font-heading); font-size: 1.6rem; color: #ffffff; margin-bottom: 0.4rem;">Exam Simulation Complete!</h3>
      <p style="font-size: 1.1rem; color: var(--accent-cyan); font-weight: bold; margin-bottom: 1rem;">
        Score: ${correctCount} / ${examQuestions.length} (${percentage}%)
      </p>
      <p style="font-size: 0.9rem; color: var(--text-muted); max-width: 500px; margin: 0 auto 1.5rem auto;">
        ${percentage >= 80 ? 'Outstanding! You demonstrated mastery of IITP-AIMLT-2601 concepts.' : 'Good effort! Review the formula matrix and flashcards before retrying.'}
      </p>
      <button class="btn" onclick="startMockExam()"><i class="fas fa-redo"></i> Retake Practice Exam</button>
    </div>
  `;
}

// -------------------------------------------------------------
// INTERVIEW ARTICULATION STUDIO
// -------------------------------------------------------------

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

  if (textarea) {
    textarea.addEventListener("input", () => {
      checkArtKeywords(textarea.value, selectedArtQuestion);
    });
  }

  if (evalBtn) {
    evalBtn.addEventListener("click", () => {
      evaluateArticulation(textarea.value, selectedArtQuestion);
    });
  }
}

function loadArtQuestion(q) {
  document.getElementById("art-prompt-text").textContent = q.prompt;
  document.getElementById("art-category-tag").textContent = q.category;
  document.getElementById("gold-answer-content").textContent = q.goldAnswer;
  document.getElementById("gold-answer-box").style.display = "none";
  document.getElementById("articulation-input").value = "";

  const chipsArea = document.getElementById("art-keyword-chips");
  chipsArea.innerHTML = q.keywords.map(kw => `
    <span class="keyword-chip" id="kw-${kw.replace(/[\s\(\)\/]/g, '_')}">${kw}</span>
  `).join('');
}

function checkArtKeywords(text, q) {
  const lowerText = text.toLowerCase();
  q.keywords.forEach(kw => {
    const chipId = `kw-${kw.replace(/[\s\(\)\/]/g, '_')}`;
    const chip = document.getElementById(chipId);
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
  if (!text || text.trim().length < 25) {
    alert("Please type or record a response (at least 2-3 sentences) before evaluating!");
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

  addXP(q.xp, `for articulation drill (${keywordCoverage}% key terms matched)`);
}

// -------------------------------------------------------------
// ACHIEVEMENTS & QUESTS
// -------------------------------------------------------------

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
        <div style="font-size: 0.72rem; color: var(--text-muted);">${b.desc}</div>
      </div>
    `;
  }).join('');
}

function setupQuests() {
  const container = document.getElementById("daily-quests-container");
  if (!container) return;

  container.innerHTML = `
    <div class="quest-card" onclick="document.querySelector('[data-tab=\\'tab-curriculum\\']').click()">
      <div class="quest-icon"><i class="fas fa-book-open"></i></div>
      <div class="quest-info">
        <h4>Review 3 Curriculum Topics</h4>
        <p>Read definitions & self-test checkpoints</p>
      </div>
      <div class="quest-reward">+50 XP</div>
    </div>
    <div class="quest-card" onclick="document.querySelector('[data-tab=\\'tab-visualizers\\']').click()">
      <div class="quest-icon"><i class="fas fa-sliders-h"></i></div>
      <div class="quest-info">
        <h4>Test Interactive Simulators</h4>
        <p>Run Confusion Matrix & RAG search</p>
      </div>
      <div class="quest-reward">+50 XP</div>
    </div>
    <div class="quest-card" onclick="startMockExam()">
      <div class="quest-icon"><i class="fas fa-stopwatch"></i></div>
      <div class="quest-info">
        <h4>Timed Exam Simulator</h4>
        <p>Score 80%+ on 10 random questions</p>
      </div>
      <div class="quest-reward">+75 XP</div>
    </div>
  `;
}

// -------------------------------------------------------------
// TOASTS & MODALS
// -------------------------------------------------------------

function showToast(msg) {
  let toast = document.getElementById("app-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "app-toast";
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.right = "20px";
    toast.style.background = "linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))";
    toast.style.border = "1px solid var(--accent-primary)";
    toast.style.color = "#ffffff";
    toast.style.padding = "0.75rem 1.2rem";
    toast.style.borderRadius = "var(--radius-md)";
    toast.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.5)";
    toast.style.fontSize = "0.88rem";
    toast.style.fontWeight = "600";
    toast.style.zIndex = "9999";
    toast.style.transition = "all 0.3s ease";
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fas fa-bolt" style="color: #fbbf24; margin-right: 0.5rem;"></i>${msg}`;
  toast.style.opacity = "1";
  toast.style.transform = "translateY(0)";

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
  }, 2800);
}

function showLevelUpModal(newLevel) {
  const lvlConfig = APP_DATA.levels.find(l => l.level === newLevel);
  const modal = document.getElementById("level-up-modal");
  if (!modal) return;
  document.getElementById("modal-level-num").textContent = newLevel;
  document.getElementById("modal-level-title").textContent = lvlConfig ? lvlConfig.title : "";
  modal.classList.add("active");
}

function closeModal() {
  const modal = document.getElementById("level-up-modal");
  if (modal) modal.classList.remove("active");
}
