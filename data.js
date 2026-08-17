/**
 * AI Mastery Lab - Comprehensive Dataset
 * Full IITP-AIMLT-2601 Study Guide Curriculum (46 Topics)
 * Includes:
 * - 6 Learning Tracks & 46 In-Depth Modules
 * - Quick Formula Revision Matrix
 * - Searchable Key Terms Directory (~150+ terms)
 * - 46+ Flashcards with Category Filtering
 * - Comprehensive Quiz Bank & Exam Simulation Questions
 * - Real-world Scenarios & Interview Articulation Studio
 */

const APP_DATA = {
  tracks: [
    { id: "all", name: "All Topics (1–46)", icon: "📚", count: 46 },
    { id: "track1", name: "Track 1: Foundations & Python", icon: "🐍", range: "Topics 1–11", count: 11 },
    { id: "track2", name: "Track 2: NumPy, Pandas & SQL", icon: "📊", range: "Topics 12–19", count: 8 },
    { id: "track3", name: "Track 3: Viz, EDA, APIs & Scraping", icon: "📈", range: "Topics 20–25", count: 6 },
    { id: "track4", name: "Track 4: ML Foundations & Preprocessing", icon: "⚙️", range: "Topics 26–28", count: 3 },
    { id: "track5", name: "Track 5: ML Models & Evaluation", icon: "🤖", range: "Topics 29–38", count: 10 },
    { id: "track6", name: "Track 6: LLMs, RAG & Agents", icon: "🧠", range: "Topics 39–46", count: 8 }
  ],

  levels: [
    { level: 1, title: "AI Apprentice", minXP: 0, icon: "🌱" },
    { level: 2, title: "Python & Data Explorer", minXP: 250, icon: "🐍" },
    { level: 3, title: "SQL & EDA Practitioner", minXP: 600, icon: "📊" },
    { level: 4, title: "ML Modeling Specialist", minXP: 1100, icon: "🤖" },
    { level: 5, title: "Pipeline & Metrics Ninja", minXP: 1700, icon: "⚙️" },
    { level: 6, title: "Vector Search & RAG Builder", minXP: 2400, icon: "🔍" },
    { level: 7, title: "Agentic Systems Architect", minXP: 3200, icon: "🦾" },
    { level: 8, title: "FastAPI & Production Deployer", minXP: 4100, icon: "🚀" },
    { level: 9, title: "LangGraph Orchestrator", minXP: 5100, icon: "⚡" },
    { level: 10, title: "Principal AI & ML Engineer", minXP: 6500, icon: "👑" }
  ],

  badges: [
    { id: "first_quiz", title: "First Step Scholar", desc: "Complete your first quiz module.", icon: "🎯" },
    { id: "streak_3", title: "Consistency Champion", desc: "Maintain a 3-day learning streak.", icon: "🔥" },
    { id: "python_master", title: "Python Wizard", desc: "Master all Python & Data Structure topics.", icon: "🐍" },
    { id: "sql_master", title: "SQL Query Master", desc: "Complete SQL querying and joins labs.", icon: "💾" },
    { id: "ml_evaluator", title: "Metrics Maestro", desc: "Master Confusion Matrix, ROC-AUC, and Evaluation.", icon: "📐" },
    { id: "rag_expert", title: "RAG Whisperer", desc: "Master Embeddings and RAG Architecture.", icon: "📚" },
    { id: "agent_master", title: "Agent Commander", desc: "Complete Agent Loop & LangGraph simulators.", icon: "🤖" },
    { id: "leak_hunter", title: "Data Leakage Ninja", desc: "Solve the Data Leakage scenario debugging challenge.", icon: "🛡️" },
    { id: "exam_ace", title: "IITP Exam Ace", desc: "Score 85%+ on the Timed Exam Simulator.", icon: "🏆" },
    { id: "level_5", title: "Elite ML Practitioner", desc: "Reach Level 5 in the AI Mastery Lab.", icon: "⭐" }
  ],

  // 46 IN-DEPTH TOPICS MATCHING THE COMPLETE IITP-AIMLT STUDY GUIDE
  modules: [
    {
      id: "topic1",
      number: 1,
      track: "track1",
      title: "The AI / ML / DL / Generative AI Landscape and Learning Roadmap",
      subtitle: "Taxonomy, historical milestones, industry use cases, and the 3-phase career roadmap.",
      readTime: "6 min read",
      summary: "Understand the core hierarchy: AI ⊃ ML ⊃ DL ⊃ Generative AI, history, ethics, and career transitions.",
      sections: [
        {
          heading: "1. Core Hierarchy & Definitions",
          content: `• **Artificial Intelligence (AI):** Machines mimicking human intelligence — making decisions, reasoning, and performing tasks autonomously.
• **Machine Learning (ML):** A subset of AI that uses algorithms to find patterns in large datasets and make predictions without explicit rules.
• **Deep Learning (DL):** A specialized subset of ML inspired by the biological brain's neural networks, utilizing multiple stacked layers for hierarchical feature extraction.
• **Generative AI:** Produces net new content (text, images, synthetic data, code) based on deep contextual understanding, rather than solely classifying or extracting historical patterns. Examples: ChatGPT, Claude, Gemini.

$$\\text{Hierarchy: } \\text{AI} \\supset \\text{ML} \\supset \\text{DL} \\supset \\text{Generative AI}$$`
        },
        {
          heading: "2. Historical Evolution & Real-World Applications",
          content: `• **1950s:** Alan Turing asks *"Can machines think?"* (Turing Test foundation).
• **1990s onward:** Digitalization milestones such as IBM Deep Blue defeating chess grandmaster Garry Kasparov.
• **2017 Milestone:** Google publishes *"Attention Is All You Need"*, introducing the **Transformer architecture** that powers all modern LLMs.
• **Real-World Applications:** Recommendation engines (Netflix, Spotify, Amazon), healthcare diagnostics, financial fraud detection, automated manufacturing, algorithmic trading, and the emerging *Prompt Engineer* and *AI Engineer* roles.
• **Ethics in AI:** Algorithmic bias, model hallucinations, copyright, data privacy, and accountability for autonomous decisions.`
        },
        {
          heading: "3. The 3-Phase Career Roadmap",
          content: `$$\\text{Phase 1: Analyst} \\longrightarrow \\text{Phase 2: Scientist} \\longrightarrow \\text{Phase 3: Architect}$$

1. **Analyst:** Data analysis, Python, SQL, exploratory analysis, reporting.
2. **Scientist:** Pattern discovery, building predictive ML models, evaluation metrics, feature engineering.
3. **Architect:** Designing production AI-powered products, RAG pipelines, autonomous agents, and scalable APIs.
• **Study Strategy:** 1–2 hours daily practice, balance coding with mathematical intuition, and build portfolio projects.`
        }
      ],
      keyTerms: ["AI", "Machine Learning", "Deep Learning", "Generative AI", "Transformer Architecture", "Analyst-Scientist-Architect Roadmap"],
      keyTakeaways: [
        "AI is the umbrella; ML learns from data; DL uses multi-layer neural nets; GenAI generates new content.",
        "The 2017 Transformer architecture is the foundation of modern Large Language Models.",
        "Career trajectory moves from Data Analyst to ML Scientist to AI Systems Architect."
      ],
      selfTest: {
        q: "What key architectural breakthrough in 2017 unlocked modern LLMs?",
        a: "Google's Transformer architecture (Attention Is All You Need), introducing self-attention mechanisms."
      }
    },

    {
      id: "topic2",
      number: 2,
      track: "track1",
      title: "Computing Foundations: Hardware, Software, and Program Execution",
      subtitle: "Hardware vs software, CPU vs GPU, Kernel, Compiler vs Interpreter, and the DIK hierarchy.",
      readTime: "6 min read",
      summary: "Understand hardware processing, OS kernel synchronization, and how Python executes code.",
      sections: [
        {
          heading: "1. Hardware, CPU vs GPU, and the OS Kernel",
          content: `• **Hardware vs Software:** Hardware represents physical components (CPU, GPU, RAM, storage, I/O); software represents instructions instructing hardware.
• **CPU vs GPU:**
  - **CPU (Central Processing Unit):** General-purpose processing "brain", optimized for sequential execution and complex control logic with few powerful cores.
  - **GPU (Graphics Processing Unit):** Thousands of smaller, parallel cores designed for matrix math and parallel tensor computations — essential for training and running neural networks.
• **Kernel:** The core of the Operating System that manages system resources: memory management, process synchronization, device drivers, and bridging applications to physical hardware.`
        },
        {
          heading: "2. Compiler vs Interpreter & Execution Flow",
          content: `• **Compiler:** Translates the entire source code into native machine code *before* execution (e.g., C, C++, Rust). Fast runtime, but requires recompilation after every modification.
• **Interpreter:** Translates and executes code line-by-line in real time (e.g., Python, Ruby). Slower runtime execution, but enables rapid prototyping, dynamic debugging, and interactive exploration.
• **Python Execution:** Python source code (\`.py\`) compiles to intermediate bytecode (\`.pyc\`), which is then interpreted by the Python Virtual Machine (PVM).`
        },
        {
          heading: "3. The Data-Information-Knowledge (DIK) Hierarchy & Tools",
          content: `$$\\text{Data (Raw Facts)} \\longrightarrow \\text{Information (Contextualized)} \\longrightarrow \\text{Knowledge (Actionable Insights)}$$

• **IDE vs Terminal/CLI:**
  - **IDE (Integrated Development Environment):** VS Code, PyCharm, Google Colab — unified editing, syntax highlighting, and debugging.
  - **Terminal / CLI:** Direct text-based interface sending shell commands directly to the OS kernel.`
        }
      ],
      keyTerms: ["Hardware vs Software", "CPU vs GPU", "Kernel", "Compiler vs Interpreter", "PVM", "DIK Hierarchy", "IDE vs CLI", "Forking"],
      keyTakeaways: [
        "GPUs provide massive parallelism for matrix multiplication in ML, while CPUs handle sequential logic.",
        "Python is an interpreted, dynamically-typed language using a virtual machine.",
        "The Kernel manages CPU scheduling, memory allocation, and peripheral access."
      ],
      selfTest: {
        q: "Why are GPUs favored over CPUs for training deep learning models?",
        a: "GPUs possess thousands of parallel cores optimized for high-throughput matrix and tensor multiplication."
      }
    },

    {
      id: "topic3",
      number: 3,
      track: "track1",
      title: "Setting Up Your Coding Environment",
      subtitle: "VS Code, Google Colab, virtual environments, .py vs .ipynb, and API security best practices.",
      readTime: "5 min read",
      summary: "Configure local vs cloud Python environments, handle API keys safely, and manage virtual environments.",
      sections: [
        {
          heading: "1. Coding Environments: VS Code vs Google Colab",
          content: `• **Minimum Hardware Specs:** 8GB RAM, 512GB SSD; dedicated GPU is beneficial but cloud options exist.
• **VS Code Setup:** Install official Python & Pylance extensions. On Windows, ensure *"Add to PATH"* is checked during installation.
• **Google Colab:** Free cloud runtime with 12+ GB RAM, 100+ GB disk, and optional free T4 GPUs. Auto-saves to Google Drive, zero initial configuration.
• **Scripts (\`.py\`) vs Notebooks (\`.ipynb\`):**
  - \`.ipynb\` (Jupyter Notebook): Interactive code/markdown cells, incremental execution, inline visualizations; best for experimentation and EDA.
  - \`.py\` (Python Script): Modular, testable, production-ready code suitable for CI/CD pipelines and deployment.`
        },
        {
          heading: "2. API Security and Environment Isolation",
          content: `• **APIs (Application Programming Interfaces):** Client sends HTTP request with authentication $\\rightarrow$ Server processes $\\rightarrow$ Returns JSON response.
• **API Keys & Security Best Practices:**
  - Never hardcode secrets in source code.
  - Store keys in \`.env\` files and add \`.env\` to \`.gitignore\`.
  - Use environment secret managers (e.g. AWS Secrets Manager, Google Secret Manager) in production.
  - Implement regular key rotation (e.g., every 15–30 days) and adhere to the principle of least privilege.`
        }
      ],
      keyTerms: ["Google Colab", ".py vs .ipynb", "Virtual Environments", "API Keys", "Secrets Manager", ".gitignore"],
      keyTakeaways: [
        "Use notebooks (.ipynb) for EDA and experimentation; use scripts (.py) for deployable systems.",
        "Always isolate credentials in .env files and configure .gitignore to prevent API key leaks."
      ],
      selfTest: {
        q: "What is the primary difference in use case between a .py file and a .ipynb file?",
        a: ".ipynb notebooks excel at interactive, cell-by-cell experimentation; .py scripts are structured for modular production code."
      }
    },

    {
      id: "topic4",
      number: 4,
      track: "track1",
      title: "The Command Line and Git/GitHub Workflow",
      subtitle: "CLI navigation, core Git commands, PAT authentication, and version control discipline.",
      readTime: "6 min read",
      summary: "Master command-line operations, repository lifecycle, commits, remotes, and authentication.",
      sections: [
        {
          heading: "1. Core CLI Navigation (Cross-Platform)",
          content: `| Action | Mac / Linux / Bash | Windows PowerShell |
|---|---|---|
| List Directory Contents | \`ls\` | \`dir\` / \`ls\` |
| Change Directory | \`cd folder\` (up: \`cd ..\`) | \`cd folder\` (up: \`cd ..\`) |
| Create Directory | \`mkdir my_dir\` | \`mkdir my_dir\` |
| Create File | \`touch main.py\` | \`New-Item main.py\` / \`copy con\` |
| Delete File / Dir | \`rm file\` / \`rm -rf dir\` | \`del file\` / \`rmdir /s dir\` |`
        },
        {
          heading: "2. Git & GitHub 6-Step Workflow",
          content: `$$\\text{git clone} \\longrightarrow \\text{edit} \\longrightarrow \\text{git add} \\longrightarrow \\text{git commit} \\longrightarrow \\text{git push}$$

1. \`git clone <url>\` — Clone remote repository to local machine (preserves complete commit history).
2. \`git status\` — Check modified, staged, and untracked files.
3. \`git add .\` — Stage changes for commit.
4. \`git commit -m "feat: add classification pipeline"\` — Record snapshot with a descriptive message.
5. \`git push origin main\` — Upload commits to remote GitHub repository.
6. \`git pull\` — Fetch and merge upstream changes into local branch.

• **Authentication:** GitHub requires **Personal Access Tokens (PAT)** or SSH keys instead of plain account passwords.`
        }
      ],
      keyTerms: ["CLI Basics", "git clone", "git add", "git commit", "git push", "git status", "Personal Access Token (PAT)", "Branches"],
      keyTakeaways: [
        "Cloning creates a full local git history linked to remote, unlike downloading a zip file.",
        "GitHub uses Personal Access Tokens (PATs) or SSH for secure authentication."
      ],
      selfTest: {
        q: "What command stages all modified files in the current directory for git commit?",
        a: "git add ."
      }
    },

    {
      id: "topic5",
      number: 5,
      track: "track1",
      title: "Python Basics: Variables, Data Types, and Operators",
      subtitle: "Dynamic typing, type casting, arithmetic operators, floor division, modulo, and f-strings.",
      readTime: "7 min read",
      summary: "Understand Python memory references, type conversion, operator quirks, and string interpolation.",
      sections: [
        {
          heading: "1. Why Python for AI & Variable Mechanics",
          content: `• **Why Python for AI:** Clean, readable syntax, huge open-source ecosystem (NumPy, Pandas, Scikit-Learn, PyTorch, Hugging Face), interpreted execution, and dynamic typing.
• **Variables:** Named memory references.
  - Rules: Must start with a letter or underscore \`_\`; cannot start with a number; no spaces or reserved keywords (\`for\`, \`class\`, \`def\`).
• **Data Types:**
  - \`int\` (e.g. 42), \`float\` (e.g. 3.14), \`complex\` (e.g. 2 + 3j)
  - \`str\` (single, double, or triple quotes for multi-line)
  - \`bool\` (\`True\`, \`False\` — case sensitive)`
        },
        {
          heading: "2. Type Casting & Operators",
          content: `• \`input()\` always returns a \`str\`. Must explicitly cast using \`int()\`, \`float()\`, or \`str()\`.
• **Arithmetic Operators:**
  - Addition \`+\`, Subtraction \`-\`, Multiplication \`*\`
  - Division \`/\`: Always returns a **float** (e.g. \`4 / 2 = 2.0\`).
  - Floor Division \`//\`: Rounds down to the largest integer (e.g. \`7 // 2 = 3\`, \`-7 // 2 = -4\`).
  - Modulo \`%\`: Returns remainder (e.g. \`7 % 2 = 1\`, useful for parity checks).
  - Exponentiation \`**\`: Power operation (\`2 ** 3 = 8\`).`
        },
        {
          heading: "3. Formatted Strings (F-Strings)",
          content: `\`\`\`python
name = "Alice"
score = 94.567
print(f"Student: {name} | Score: {score:.2f}")
# Output: Student: Alice | Score: 94.57
\`\`\`
F-strings embed expressions and format specifiers directly, outperforming comma and \`+\` concatenation.`
        }
      ],
      keyTerms: ["Dynamic Typing", "Type Casting", "Floor Division (//)", "Modulo (%)", "F-strings", "Immutable Values"],
      keyTakeaways: [
        "Division (/) in Python 3 always produces a float.",
        "input() returns string data that must be explicitly cast to numeric types.",
        "F-strings provide safe, readable expression interpolation inside string literals."
      ],
      selfTest: {
        q: "What is the output of 15 // 4 and 15 % 4 in Python?",
        a: "15 // 4 = 3 (floor division), 15 % 4 = 3 (remainder)."
      }
    },

    {
      id: "topic6",
      number: 6,
      track: "track1",
      title: "Decision-Making in Python: Conditionals and Logic",
      subtitle: "Comparison operators, augmented assignment, if-elif-else execution flow, and logical truth tables.",
      readTime: "6 min read",
      summary: "Master logical operators, evaluation short-circuiting, first-match branching, and indentation rules.",
      sections: [
        {
          heading: "1. Comparison & Augmented Assignment",
          content: `• **Comparison Operators:** \`>\`, \`<\`, \`>=\`, \`<=\`, \`==\`, \`!=\`
  - Cross-type numeric equality: \`78.0 == 78\` evaluates to **True**.
• **Augmented Assignment:** \`+=\`, \`-=\`, \`*=\`, \`/=\`, \`**=\`
  - Note: Python does NOT have \`++\` or \`--\` increment/decrement operators.
\`\`\`python
x = 5
x **= 3  # x becomes 125
\`\`\``
        },
        {
          heading: "2. Conditionals: if-elif-else Semantics",
          content: `• **First-True-Only Semantics:** Python evaluates conditional chains from top to bottom. Once a condition evaluates to \`True\`, its block executes and all subsequent \`elif\` and \`else\` blocks are skipped.
• **Ordering Matters:** Order conditions from most specific to general to avoid logic bugs in grading or risk tiers.

\`\`\`python
score = 85
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"  # Executes here, skips below
elif score >= 70:
    grade = "C"
else:
    grade = "F"
\`\`\``
        },
        {
          heading: "3. Logical Operators & Indentation",
          content: `• \`and\`: True only if **all** operands are True.
• \`or\`: True if **at least one** operand is True.
• \`not\`: Reverses truth value.
• **Indentation:** Python uses indentation (standard 4 spaces) rather than curly braces \`{}\`. Inconsistent indents raise \`IndentationError\`.`
        }
      ],
      keyTerms: ["if-elif-else", "First-True-Only Semantics", "and / or / not", "Augmented Assignment", "IndentationError"],
      keyTakeaways: [
        "Python stops evaluating if-elif chains as soon as the first condition evaluates to True.",
        "Indentation defines block scope in Python; 4 spaces per indent level is PEP 8 standard."
      ],
      selfTest: {
        q: "What does the expression (True and False) or not False evaluate to?",
        a: "True (False or True = True)."
      }
    },

    {
      id: "topic7",
      number: 7,
      track: "track1",
      title: "Automation with Loops",
      subtitle: "For loops, while loops, range() configurations, break, continue, and nested loops.",
      readTime: "6 min read",
      summary: "Understand loop iteration, range step syntax, loop flow control, and iteration order.",
      sections: [
        {
          heading: "1. For Loops and the range() Function",
          content: `• \`for variable in sequence:\` iterates over iterables (lists, strings, ranges).
• **The 3 forms of \`range()\`:**
  1. \`range(stop)\` $\\to$ numbers from \`0\` up to \`stop - 1\`.
  2. \`range(start, stop)\` $\\to$ numbers from \`start\` up to \`stop - 1\`.
  3. \`range(start, stop, step)\` $\\to$ increments by \`step\` (negative step counts backward).
  - *Edge case:* If \`start >= stop\` with a positive step (e.g. \`range(5, 2)\`), the loop body never runs.`
        },
        {
          heading: "2. While Loops, Break, and Continue",
          content: `• \`while condition:\` repeats as long as condition evaluates to True. Must update control state to prevent infinite loops.
• \`break\`: Exits the loop immediately.
• \`continue\`: Skips the remainder of the current iteration and jumps to the next cycle.

\`\`\`python
for num in range(1, 6):
    if num == 3:
        continue  # skip 3
    if num == 5:
        break     # stop loop
    print(num)    # prints 1, 2, 4
\`\`\``
        },
        {
          heading: "3. Nested Loops",
          content: `For nested loops, the inner loop completes all its iterations for every single tick of the outer loop.
\`\`\`python
for i in range(1, 3):
    for j in range(1, 3):
        print(f"({i}, {j})")
# Output: (1,1), (1,2), (2,1), (2,2)
\`\`\``
        }
      ],
      keyTerms: ["for loop", "while loop", "range(start, stop, step)", "break vs continue", "Nested Loops", "Infinite Loop"],
      keyTakeaways: [
        "range(start, stop) is stop-exclusive (stops at stop - 1).",
        "break terminates the entire loop; continue skips only the current iteration."
      ],
      selfTest: {
        q: "What numbers are generated by list(range(2, 9, 3))?",
        a: "[2, 5, 8]"
      }
    },

    {
      id: "topic8",
      number: 8,
      track: "track1",
      title: "Functions in Python",
      subtitle: "Parameters vs arguments, default values, *args, keyword arguments, and tuple returns.",
      readTime: "7 min read",
      summary: "Write modular Python functions, handle arbitrary arguments, and unpack multiple returned values.",
      sections: [
        {
          heading: "1. Function Definition & Parameter Mechanics",
          content: `• Functions bundle reusable logic into callable blocks, adhering to DRY (Don't Repeat Yourself).
• **Parameters vs Arguments:**
  - *Parameters:* Variable names declared in the function definition header.
  - *Arguments:* Real values passed into the function at call time.
• **Default Parameters:** Provide fallback values. Parameters with default values must appear **after** all positional parameters without defaults.
\`\`\`python
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"
\`\`\``
        },
        {
          heading: "2. Positional, Keyword, and *args",
          content: `• **Keyword Arguments:** Passed by explicit parameter name (\`func(b=2, a=1)\`), allowing arbitrary order.
• **\`*args\`:** Captures any number of positional arguments into a **tuple**.
\`\`\`python
def compute_sum(*numbers):
    total = 0
    for n in numbers:
        total += n
    return total

print(compute_sum(10, 20, 30)) # 60
\`\`\``
        },
        {
          heading: "3. Return Values & Tuple Unpacking",
          content: `• \`return\` sends a value back to caller and terminates function execution.
• If no \`return\` is specified, Python implicitly returns \`None\`.
• Returning multiple comma-separated values returns a tuple, which can be unpacked immediately:
\`\`\`python
def math_ops(a, b):
    return a + b, a - b, a * b

s, d, p = math_ops(10, 5)  # s=15, d=5, p=50
\`\`\``
        }
      ],
      keyTerms: ["Parameters vs Arguments", "Default Parameters", "*args", "Keyword Arguments", "Implicit None", "Tuple Unpacking"],
      keyTakeaways: [
        "Parameters with default values must come after non-default parameters.",
        "*args gathers variable positional arguments into an immutable tuple.",
        "A function without an explicit return statement returns None."
      ],
      selfTest: {
        q: "What data structure is created inside a function when using *args?",
        a: "A tuple containing all passed positional arguments."
      }
    },

    {
      id: "topic9",
      number: 9,
      track: "track1",
      title: "Applying Fundamentals: Program Design, Variable Scope, and a First Look at Data Structures",
      subtitle: "Local vs global scope, the global keyword, modular program design, and data structures overview.",
      readTime: "7 min read",
      summary: "Understand variable lifetime, avoid global variable pollution, and compare core container types.",
      sections: [
        {
          heading: "1. Problem-Solving & Program Design Workflow",
          content: `1. Understand the problem and constraints thoroughly.
2. Outline execution logic using pseudocode.
3. Decompose the task into small, single-purpose, pure functions.
4. Integrate flow with loops and conditionals (e.g. interactive menu CLI app).`
        },
        {
          heading: "2. Variable Scope: Local vs Global",
          content: `• **Local Variables:** Defined inside a function; accessible only within that function call.
• **Global Variables:** Defined outside functions; readable anywhere unless shadowed by a local variable.
• **The \`global\` keyword:** Required inside a function if you intend to *modify* a global variable.
• **Best Practice:** Avoid mutable global variables. Pass data as function arguments and receive updated values via \`return\`.`
        },
        {
          heading: "3. First Look at Core Data Structures",
          content: `| Structure | Syntax | Properties | Common Use Case |
|---|---|---|---|
| **List** | \`[1, 2, 3]\` | Ordered, mutable, allows duplicates, indexed | Dynamic sequences |
| **Dictionary** | \`{"a": 1}\` | Key-value pairs, fast $O(1)$ lookup, keys immutable | Entity mappings |
| **Tuple** | \`(1, 2, 3)\` | Ordered, immutable, allows duplicates, hashable | Fixed records |
| **Set** | \`{1, 2, 3}\` | Unordered, unique items only, fast membership | De-duplication |`
        }
      ],
      keyTerms: ["Local vs Global Scope", "The global keyword", "Variable Shadowing", "List / Dict / Tuple / Set at a glance"],
      keyTakeaways: [
        "Local variables are destroyed when function execution completes.",
        "Prefer pure functions with explicit inputs and outputs over modifying global state."
      ],
      selfTest: {
        q: "Which data structure should you choose when elements must be unique and fast membership testing is needed?",
        a: "A Set ({})"
      }
    },

    {
      id: "topic10",
      number: 10,
      track: "track1",
      title: "Core Data Structures I: Lists and Dictionaries",
      subtitle: "List methods, slicing, dictionary key-value operations, .get() fallback, and iteration patterns.",
      readTime: "8 min read",
      summary: "Master list mutations, negative slicing, dictionary lookups, and iteration idioms.",
      sections: [
        {
          heading: "1. Lists: Mutations, Methods & Slicing",
          content: `• **Indexing:** Positive from \`0\`, negative from \`-1\` (end of list). Out-of-range index raises \`IndexError\`.
• **Adding Elements:**
  - \`list.append(x)\`: Adds single item to the end in-place.
  - \`list.insert(i, x)\`: Inserts item at index \`i\`.
  - \`list.extend(iterable)\`: Appends all items of another collection in-place.
• **Removing Elements:**
  - \`list.remove(val)\`: Removes first occurrence of value (raises \`ValueError\` if missing).
  - \`list.pop(i)\`: Removes and returns item at index \`i\` (defaults to last item).
  - \`del list[i]\`: Deletes item without returning.
  - \`list.clear()\`: Empties the list.
• **Slicing:** \`list[start:end:step]\` (end index is exclusive). Reversing: \`list[::-1]\`.`
        },
        {
          heading: "2. Dictionaries: Key-Value Operations",
          content: `• Dictionaries map hashable, immutable keys (str, int, tuple) to arbitrary values.
• **Access:**
  - \`dict[key]\`: Raises \`KeyError\` if key is absent.
  - \`dict.get(key, default)\`: Safe access, returns fallback default without throwing an error.
• **Methods:**
  - \`dict.keys()\`: Returns view of all keys.
  - \`dict.values()\`: Returns view of all values.
  - \`dict.items()\`: Returns key-value tuple pairs (\`for k, v in dict.items():\`).`
        }
      ],
      keyTerms: ["append vs extend", "sort() vs sorted()", "pop()", ".get() fallback", "KeyError vs IndexError", "list[::-1]"],
      keyTakeaways: [
        "append([1,2]) nests a list inside; extend([1,2]) flattens items into the list.",
        "Use dict.get(key, default) to prevent KeyErrors during data parsing."
      ],
      selfTest: {
        q: "What happens when you call a_list.append([1, 2]) vs a_list.extend([1, 2]) on [0]?",
        a: "append results in [0, [1, 2]]; extend results in [0, 1, 2]."
      }
    },

    {
      id: "topic11",
      number: 11,
      track: "track1",
      title: "Core Data Structures II: Tuples, Sets, and File Handling",
      subtitle: "Tuple immutability, single-element tuple trap, set algebra, and safe file I/O with context managers.",
      readTime: "7 min read",
      summary: "Understand tuple immutability, set operations, file modes, and the with open() context manager.",
      sections: [
        {
          heading: "1. Tuples & The Single-Element Trap",
          content: `• Tuples \`()\` are ordered, immutable, and hashable (can be used as dictionary keys).
• **The Single-Element Trap:** \`(42)\` is evaluated as an integer in parentheses. A single-element tuple **must** have a trailing comma: \`(42,)\`.
• **Nested Mutability:** A tuple itself cannot be altered, but mutable objects inside it (e.g. a list in a tuple) can still be modified in place.`
        },
        {
          heading: "2. Sets & Set Algebra",
          content: `• Sets \`{}\` store unique, unordered elements.
• **Empty Set Trap:** \`{}\` creates an empty **dictionary**. Use \`set()\` to create an empty set.
• **Set Operations:**
  - Union \`A | B\` (all unique elements in either)
  - Intersection \`A & B\` (common elements)
  - Difference \`A - B\` (elements in A but not B)`
        },
        {
          heading: "3. File Handling with Context Managers",
          content: `• File modes: \`'r'\` (read), \`'w'\` (write/overwrite), \`'a'\` (append), \`'x'\` (exclusive creation).
• **Safe Context Manager Pattern:**
\`\`\`python
with open("data.txt", "r", encoding="utf-8") as f:
    content = f.read()
# Automatically closes the file stream, even if an exception occurs!
\`\`\``
        }
      ],
      keyTerms: ["Trailing Comma (42,)", "set() vs {}", "Set Union (|) & Intersection (&)", "with open()", "File Modes (r, w, a, x)"],
      keyTakeaways: [
        "Single-element tuples require a trailing comma: (val,).",
        "Always use with open(...) to ensure file descriptors are safely closed."
      ],
      selfTest: {
        q: "What type is x = {} vs y = set() in Python?",
        a: "x is a dict; y is an empty set."
      }
    },

    {
      id: "topic12",
      number: 12,
      track: "track2",
      title: "NumPy for Numerical Computing",
      subtitle: "C-backed arrays, vectorization, broadcasting rules, reshaping, matrix multiplication, and Z-scores.",
      readTime: "8 min read",
      summary: "Master homogeneous ndarrays, vectorized math, broadcasting dimensions, and array operations.",
      sections: [
        {
          heading: "1. NumPy Ndarrays vs Python Lists",
          content: `• **Why NumPy:** Implemented in C with contiguous memory buffers, enabling 10x–50x speedups over Python lists.
• **Homogeneous Type:** NumPy arrays store a single \`dtype\`. Mixing types forces upcasting (often to strings).
• **Vectorization:** \`arr1 + arr2\` performs fast element-wise addition, whereas \`list1 + list2\` concatenates lists!`
        },
        {
          heading: "2. Array Creation, Shapes & Reshaping",
          content: `• **Creation:** \`np.zeros((3,3))\`, \`np.ones((2,4))\`, \`np.arange(0, 10, 2)\`, \`np.linspace(0, 1, 5)\`.
• **Properties:** \`.shape\` (dimensions), \`.ndim\` (number of axes), \`.size\` (total elements), \`.dtype\`.
• **Reshaping:** \`arr.reshape(2, -1)\` — using \`-1\` prompts NumPy to automatically compute the inferred dimension.
• **Views vs Copies:** \`arr.ravel()\` returns a memory view; \`arr.flatten()\` returns an independent copy.`
        },
        {
          heading: "3. Broadcasting & Z-Score Standardization",
          content: `• **Broadcasting Rules:** Two dimensions are compatible when they are equal, or one of them is 1.
• **Standardization Formula (Z-Score):**
$$z = \\frac{x - \\mu}{\\sigma}$$
Rescales any feature to mean $\\mu = 0$ and standard deviation $\\sigma = 1$.`
        }
      ],
      keyTerms: ["ndarray", "Element-wise Vectorization", "Broadcasting", "reshape(-1)", "ravel vs flatten", "Z-score Standardization"],
      keyTakeaways: [
        "Array addition in NumPy is element-wise; list addition is concatenation.",
        "Broadcasting matches dimensions by stretching dimensions of size 1.",
        "Z-score standardization centers data to mean=0 and variance=1."
      ],
      selfTest: {
        q: "What is the shape of (3, 1) array + (1, 4) array under broadcasting?",
        a: "(3, 4)"
      }
    },

    {
      id: "topic13",
      number: 13,
      track: "track2",
      title: "Introduction to Pandas: Series and DataFrames",
      subtitle: "Tabular data, Series vs DataFrame, labeled indexing, .iloc vs .loc, and initial data inspection.",
      readTime: "7 min read",
      summary: "Understand 1D Series vs 2D DataFrames, index labels, position slicing, and data inspection methods.",
      sections: [
        {
          heading: "1. Core Structures: Series & DataFrame",
          content: `• **Pandas:** Built on NumPy, designed for tabular, heterogeneous datasets with row/column labels.
• **Series:** 1D labeled array holding elements of a single data type.
• **DataFrame:** 2D table composed of multiple Series as columns, sharing a common index.`
        },
        {
          heading: "2. Data Inspection Methods",
          content: `• \`df.head(n)\` / \`df.tail(n)\`: View first/last $n$ rows.
• \`df.shape\`: Returns \`(rows, cols)\` tuple.
• \`df.info()\`: Summarizes column data types, non-null counts, and memory usage.
• \`df.describe()\`: Computes count, mean, std, min, 25%, 50%, 75%, and max for numeric columns.`
        },
        {
          heading: "3. Accessors: .iloc[] vs .loc[]",
          content: `• \`df.iloc[row_idx, col_idx]\`: Integer position-based indexing (exclusive end boundary).
• \`df.loc[row_label, col_label]\`: Label-based indexing (inclusive end boundary).
• Single bracket \`df['col']\` returns a Series; double brackets \`df[['col1', 'col2']]\` returns a DataFrame.`
        }
      ],
      keyTerms: ["Series", "DataFrame", ".iloc vs .loc", "df.info()", "df.describe()", "Double-bracket Selection"],
      keyTakeaways: [
        "loc is label-based (inclusive end); iloc is zero-based integer positional (exclusive end).",
        "Selecting multiple columns requires double brackets: df[['colA', 'colB']]."
      ],
      selfTest: {
        q: "Which accessor uses integer index positions with exclusive slice stops: .loc or .iloc?",
        a: ".iloc (integer position-based)"
      }
    },

    {
      id: "topic14",
      number: 14,
      track: "track2",
      title: "JSON: Structure and Python Integration",
      subtitle: "JSON objects, arrays, json.dumps() vs json.loads(), type mapping, and XML comparison.",
      readTime: "6 min read",
      summary: "Parse and serialize JSON payloads, bridge API responses, and avoid common syntax traps.",
      sections: [
        {
          heading: "1. JSON Format & Python Type Mapping",
          content: `• **JSON (JavaScript Object Notation):** Lightweight text format for API payloads and NoSQL storage.
• **Type Mappings:**
  - JSON \`object {}\` $\\leftrightarrow$ Python \`dict\`
  - JSON \`array []\` $\\leftrightarrow$ Python \`list\`
  - JSON \`true / false / null\` $\\leftrightarrow$ Python \`True / False / None\``
        },
        {
          heading: "2. json.dumps() vs json.loads()",
          content: `• \`json.dumps(dict_obj)\`: Serializes Python dictionary into a JSON formatted **string** (Dump to String).
• \`json.loads(json_str)\`: Parses JSON string into a Python **dictionary** (Load from String).
• \`json.dump()\` / \`json.load()\`: Directly read/write to physical file streams.`
        },
        {
          heading: "3. Common Traps & XML Comparison",
          content: `• **Common Mistakes:** Using single quotes \`'key'\` instead of double quotes \`"key"\`, trailing commas in objects.
• **Why JSON beats XML:** More compact, human-readable, and parses directly to native data structures across all languages.`
        }
      ],
      keyTerms: ["JSON Object / Array", "json.dumps() vs json.loads()", "true/false/null mapping", "JSON vs XML"],
      keyTakeaways: [
        "json.dumps converts Python objects to JSON strings; json.loads parses JSON strings to Python objects.",
        "JSON requires strict double quotes for strings and keys."
      ],
      selfTest: {
        q: "What is the equivalent Python value for JSON null and true?",
        a: "None and True"
      }
    },

    {
      id: "topic15",
      number: 15,
      track: "track2",
      title: "Data Selection and Filtering with Pandas",
      subtitle: "Boolean indexing, bitwise operators (&, |, ~), .isin(), .between(), and the index-shuffle trap.",
      readTime: "7 min read",
      summary: "Filter rows with boolean conditions, handle compound queries, and sort DataFrame results.",
      sections: [
        {
          heading: "1. Boolean Masking and Bitwise Operators",
          content: `• Filter rows by evaluating boolean expressions over column Series.
• Compound conditions **require parentheses** around each condition and bitwise operators:
  - AND: \`&\`
  - OR: \`|\`
  - NOT: \`~\`
\`\`\`python
filtered_df = df[(df['age'] >= 25) & (df['salary'] > 50000)]
\`\`\``
        },
        {
          heading: "2. Membership and Range Filtering",
          content: `• \`df['city'].isin(['NYC', 'London', 'Tokyo'])\`: Matches multiple categorical values.
• \`df['score'].between(80, 100)\`: Inclusive numeric range filtering.
• \`df['col'].isna()\` / \`.notna()\`: Filters missing values.`
        },
        {
          heading: "3. The .loc Index-Shuffle Trap & Sorting",
          content: `• After filtering, row indices remain non-sequential. Using \`.loc[0]\` may throw KeyError if row 0 was filtered out. Use \`df.reset_index(drop=True, inplace=True)\` to restore sequential indexing.
• \`df.sort_values(by=['score', 'age'], ascending=[False, True])\`: Multi-column sorting.`
        }
      ],
      keyTerms: ["Boolean Masking", "Bitwise Operators (&, |, ~)", ".isin()", ".between()", "reset_index()", "sort_values()"],
      keyTakeaways: [
        "In Pandas boolean filtering, always wrap conditions in parentheses: (df['a'] > 1) & (df['b'] < 5).",
        "Use reset_index(drop=True) after filtering to avoid index lookup bugs."
      ],
      selfTest: {
        q: "Why do you need parentheses around conditions in df[(df['A'] > 10) & (df['B'] < 20)]?",
        a: "Because Python's bitwise & operator has higher operator precedence than comparison operators (> and <)."
      }
    },

    {
      id: "topic16",
      number: 16,
      track: "track2",
      title: "Handling Missing Data and Group-By Operations",
      subtitle: "Detecting gaps, dropna vs fillna, ffill/bfill, split-apply-combine, and multi-column .agg().",
      readTime: "8 min read",
      summary: "Clean missing values safely, avoid data corruption, and aggregate metrics by group.",
      sections: [
        {
          heading: "1. Detecting & Handling Missing Data",
          content: `• **Detection:** \`df.isna().sum()\` counts nulls per column.
• **Strategies:**
  - \`df.dropna(subset=['critical_col'])\`: Drops rows with nulls (use when missingness is under 5%).
  - \`df.fillna(df['col'].median())\`: Imputes with central tendency.
  - \`df.ffill()\` / \`df.bfill()\`: Forward/backward fills, ideal for time series.`
        },
        {
          heading: "2. Split-Apply-Combine with .groupby()",
          content: `$$\\text{Dataset} \\xrightarrow{\\text{Split}} \\text{Groups} \\xrightarrow{\\text{Apply Function}} \\text{Results} \\xrightarrow{\\text{Combine}} \\text{Summary Table}$$

\`\`\`python
# Multi-aggregation across different columns
summary = df.groupby('department').agg({
    'salary': ['mean', 'max'],
    'experience': 'median'
}).reset_index()
\`\`\``
        },
        {
          heading: "3. Frequency Counts",
          content: `• \`df['category'].value_counts(normalize=True)\` returns relative percentages of categorical classes.`
        }
      ],
      keyTerms: ["isna().sum()", "dropna()", "fillna()", "ffill & bfill", "Split-Apply-Combine", "groupby().agg()", "value_counts()"],
      keyTakeaways: [
        "Impute numeric columns with median (skewed) or mean (normal); impute categoricals with mode.",
        "groupby().agg() allows distinct aggregation functions per column in a single pass."
      ],
      selfTest: {
        q: "What does df['status'].value_counts(normalize=True) calculate?",
        a: "The relative proportions (percentages summing to 1.0) of each unique value in the status column."
      }
    },

    {
      id: "topic17",
      number: 17,
      track: "track2",
      title: "Databases and SQL Fundamentals",
      subtitle: "Why DBs over CSVs, Relational vs NoSQL, Primary & Foreign Keys, and Python sqlite3 workflow.",
      readTime: "7 min read",
      summary: "Understand ACID properties, schema design, relational keys, and executing queries via sqlite3.",
      sections: [
        {
          heading: "1. Motivation: Databases vs Flat CSV Files",
          content: `• Flat CSVs suffer from lack of relationships, data redundancy, no concurrent multi-user writes, and lack of transaction safety.
• **Relational DBs (RDBMS):** Structured tables with strict schemas (PostgreSQL, SQLite, MySQL).
• **NoSQL DBs:** Flexible schemas — Document (MongoDB), Key-Value (Redis), Wide-Column (Cassandra), Graph (Neo4J).`
        },
        {
          heading: "2. Relational Schema & Keys",
          content: `• **Primary Key (PK):** Unique, non-null identifier for each row in a table.
• **Foreign Key (FK):** Column referencing a PK in another table, enforcing referential integrity.
• **Schema Blueprint:** Table names, column definitions, data types, and integrity constraints.`
        },
        {
          heading: "3. SQLite3 Workflow in Python",
          content: `\`\`\`python
import sqlite3

conn = sqlite3.connect("mastery.db")
cursor = conn.cursor()
cursor.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)")
cursor.execute("INSERT INTO users (name) VALUES (?)", ("Alice",))
conn.commit()
conn.close()
\`\`\`
• **Pandas Bridge:** \`pd.read_sql(query, conn)\` and \`df.to_sql('table', conn, if_exists='replace')\`.`
        }
      ],
      keyTerms: ["RDBMS vs NoSQL", "Primary Key", "Foreign Key", "sqlite3 workflow", "cursor & commit", "pd.read_sql()"],
      keyTakeaways: [
        "Primary keys uniquely identify rows; Foreign keys enforce relational links between tables.",
        "Always call conn.commit() in sqlite3 to persist data modifications before closing."
      ],
      selfTest: {
        q: "What is the purpose of a Foreign Key in a relational database?",
        a: "To reference a Primary Key in another table, establishing relationships and enforcing referential integrity."
      }
    },

    {
      id: "topic18",
      number: 18,
      track: "track2",
      title: "Core SQL Querying",
      subtitle: "SELECT, WHERE clauses, ORDER BY, LIMIT/OFFSET, DISTINCT, Aliasing, and Pandas equivalents.",
      readTime: "7 min read",
      summary: "Construct SQL queries, filter records, sort multi-column data, and bridge SQL to Pandas.",
      sections: [
        {
          heading: "1. Core SQL Clauses & Operators",
          content: `| Clause | Purpose | SQL Syntax | Pandas Equivalent |
|---|---|---|---|
| **SELECT** | Choose columns | \`SELECT name, age\` | \`df[['name', 'age']]\` |
| **WHERE** | Filter rows | \`WHERE age >= 21\` | \`df[df['age'] >= 21]\` |
| **DISTINCT** | Deduplicate rows | \`SELECT DISTINCT role\` | \`df['role'].unique()\` |
| **ORDER BY** | Sort results | \`ORDER BY age DESC\` | \`df.sort_values('age', ascending=False)\` |
| **LIMIT** | Cap row count | \`LIMIT 10\` | \`df.head(10)\` |
| **AS** | Rename alias | \`SELECT salary * 1.1 AS bonus\` | \`df.rename(...)\` |`
        },
        {
          heading: "2. Pattern Matching and Range Filters",
          content: `• \`IN ('A', 'B')\`: Multi-value inclusion.
• \`BETWEEN a AND b\`: Inclusive range matching.
• \`IS NULL\` / \`IS NOT NULL\`: Tests for missing database values.
• \`PRAGMA table_info('table_name')\`: SQLite metadata inspection command.`
        }
      ],
      keyTerms: ["SELECT", "WHERE", "ORDER BY ASC/DESC", "LIMIT / OFFSET", "DISTINCT", "BETWEEN", "PRAGMA"],
      keyTakeaways: [
        "SQL uses single '=' for equality comparison, unlike Python's '=='.",
        "Pre-filtering data with SQL queries reduces memory load before loading into Pandas."
      ],
      selfTest: {
        q: "What is the SQL equivalent to df.sort_values('score', ascending=False).head(5)?",
        a: "ORDER BY score DESC LIMIT 5"
      }
    },

    {
      id: "topic19",
      number: 19,
      track: "track2",
      title: "SQL Joins and Data Normalization",
      subtitle: "Normalization (1NF-3NF), Inner, Left, Right, and Full Outer joins, plus pd.merge() mapping.",
      readTime: "8 min read",
      summary: "Understand normalization benefits, compare the four SQL join types, and perform DataFrame merges.",
      sections: [
        {
          heading: "1. Database Normalization",
          content: `• **Goal:** Split data into specialized related tables to eliminate redundant data and avoid update anomalies.
• **1NF:** Atomic cell values, unique rows.
• **2NF:** 1NF + no partial dependency on composite keys.
• **3NF:** 2NF + no transitive dependencies (non-key columns depend only on the primary key).`
        },
        {
          heading: "2. The Four SQL Join Types",
          content: `• **INNER JOIN:** Returns only records with matching keys in **both** tables.
• **LEFT JOIN:** Returns **all** records from left table, with matching right table records (NULL where no match exists).
• **RIGHT JOIN:** Returns **all** records from right table, with matching left table records (supported in SQLite 3.39+).
• **FULL OUTER JOIN:** Returns all records from both tables, filling unmatched columns with NULL.`
        },
        {
          heading: "3. Pandas pd.merge() Equivalents",
          content: `\`\`\`python
merged_df = pd.merge(left_df, right_df, on='customer_id', how='inner')
# Options for how: 'inner', 'left', 'right', 'outer'
\`\`\``
        }
      ],
      keyTerms: ["Normalization (3NF)", "INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN", "pd.merge(how=...)"],
      keyTakeaways: [
        "INNER JOIN retains matches only; LEFT JOIN keeps all left rows and fills unmatched right columns with NULL.",
        "pd.merge(..., how='left') mirrors SQL LEFT JOIN directly in Python."
      ],
      selfTest: {
        q: "If Table A has 5 rows and Table B has 0 matching rows, how many rows does a LEFT JOIN return?",
        a: "5 rows (with NULL values for all Table B columns)."
      }
    },

    {
      id: "topic20",
      number: 20,
      track: "track3",
      title: "Data Visualization with Matplotlib",
      subtitle: "3-layer architecture (Backend, Artist, Scripting), plot types, styling, and ML model diagnostic charts.",
      readTime: "7 min read",
      summary: "Understand Matplotlib rendering architecture, choose chart types, and plot ML learning curves.",
      sections: [
        {
          heading: "1. Matplotlib Three-Layer Architecture",
          content: `1. **Backend Layer:** Renders figures to screen display or file output (PNG, SVG, PDF).
2. **Artist Layer:** Draws shapes, lines, text, axes, and ticks.
3. **Scripting Layer (\`matplotlib.pyplot\`):** User-friendly interface for building figures procedurally.`
        },
        {
          heading: "2. Choosing the Right Plot Type",
          content: `• **Line Plot (\`plt.plot\`):** Continuous trends over time or epochs.
• **Scatter Plot (\`plt.scatter\`):** Relationship between two continuous variables and cluster intuition.
• **Bar Chart (\`plt.bar\`):** Discrete category comparisons.
• **Histogram (\`plt.hist\`):** Frequency distributions, binning, identifying skew and modality.
• **Pie Chart (\`plt.pie\`):** Proportion of parts to a whole (use sparingly).`
        },
        {
          heading: "3. Minimal Standard Workflow",
          content: `\`\`\`python
import matplotlib.pyplot as plt

plt.figure(figsize=(8, 4))
plt.plot(epochs, train_loss, label="Train Loss", color="blue")
plt.plot(epochs, val_loss, label="Val Loss", color="red", linestyle="--")
plt.title("Training vs Validation Loss")
plt.xlabel("Epoch")
plt.ylabel("Loss")
plt.legend()
plt.grid(True)
plt.savefig("loss_curve.png", dpi=300)
plt.show()
\`\`\``
        }
      ],
      keyTerms: ["Matplotlib 3-Layer Architecture", "Line vs Scatter vs Bar vs Histogram", "plt.savefig()", "Loss Curves"],
      keyTakeaways: [
        "Histograms display continuous distributions; bar charts compare discrete categories.",
        "Visualizing train vs validation loss curves is critical to spotting overfitting and underfitting."
      ],
      selfTest: {
        q: "Which Matplotlib layer is user-facing when calling import matplotlib.pyplot as plt?",
        a: "The Scripting layer (pyplot)."
      }
    },

    {
      id: "topic21",
      number: 21,
      track: "track3",
      title: "Advanced Visualization and Plot Interpretation",
      subtitle: "Box plots, the 1.5x IQR outlier rule, Violin plots, Pair plots, Plotly interactivity, and PCA.",
      readTime: "8 min read",
      summary: "Interpret distributions, detect outliers with IQR boundaries, and choose Seaborn vs Plotly.",
      sections: [
        {
          heading: "1. Box Plots and the 1.5 × IQR Outlier Rule",
          content: `$$\\text{IQR} = Q_3 - Q_1$$
$$\\text{Lower Bound} = Q_1 - 1.5 \\times \\text{IQR}, \\quad \\text{Upper Bound} = Q_3 + 1.5 \\times \\text{IQR}$$

• Points outside the $[\\text{Lower Bound}, \\text{Upper Bound}]$ range are mathematically flagged as **outliers**.`
        },
        {
          heading: "2. Violin Plots & Pair Plots",
          content: `• **Violin Plot:** Combines a box plot with a Kernel Density Estimate (KDE) to show multimodal distribution shapes.
• **Pair Plot (\`sns.pairplot\`):** Plots pairwise scatter plots for all numerical features in a matrix with diagonal histograms.`
        },
        {
          heading: "3. Library Selection Guide",
          content: `• **Matplotlib:** Ultimate granular control and custom rendering.
• **Seaborn:** Built on Matplotlib with attractive defaults and statistical plotting (best for fast EDA).
• **Plotly:** Interactive JavaScript charts (hover, zoom, pan, 3D scatter plots).`
        }
      ],
      keyTerms: ["1.5 x IQR Outlier Rule", "Q1, Q2 (Median), Q3", "Violin Plot", "Pair Plot", "Seaborn vs Plotly", "PCA intro"],
      keyTakeaways: [
        "The standard outlier threshold is Q1 - 1.5*IQR and Q3 + 1.5*IQR.",
        "Violin plots show multi-modal density distributions that box plots can conceal."
      ],
      selfTest: {
        q: "If Q1 = 20 and Q3 = 40, what is the upper outlier cutoff boundary?",
        a: "IQR = 20. Upper cutoff = 40 + 1.5 * 20 = 70."
      }
    },

    {
      id: "topic22",
      number: 22,
      track: "track3",
      title: "Correlation and Exploratory Data Analysis (EDA)",
      subtitle: "Pearson correlation matrix, heatmap visualization, correlation vs causation, and EDA workflow.",
      readTime: "7 min read",
      summary: "Calculate correlation coefficients, generate annotated heatmaps, and execute structured EDA.",
      sections: [
        {
          heading: "1. Pearson Correlation Coefficient ($r$)",
          content: `• Ranges from **$-1.0$ to $+1.0$**:
  - $+1.0$: Perfect positive linear correlation.
  - $0.0$: No linear relationship (non-linear relationships like $y=x^2$ may still exist!).
  - $-1.0$: Perfect negative linear correlation.
• **Correlation $\\neq$ Causation:** Ice cream sales correlate with drowning deaths due to hot weather (confounding variable).`
        },
        {
          heading: "2. Heatmaps with Seaborn",
          content: `\`\`\`python
import seaborn as sns
import matplotlib.pyplot as plt

corr = df.corr(numeric_only=True)
sns.heatmap(corr, annot=True, cmap="coolwarm", vmin=-1, vmax=1)
plt.title("Feature Correlation Heatmap")
\`\`\``
        },
        {
          heading: "3. Complete 4-Step EDA Workflow",
          content: `1. **Structural Audit:** \`df.shape\`, \`df.info()\`, \`df.isna().sum()\`, duplicates check.
2. **Univariate Analysis:** Histograms, box plots for distributions and outliers on individual features.
3. **Bivariate Analysis:** Scatter plots, group-by aggregations, feature-target correlations.
4. **Multivariate Analysis:** Correlation heatmaps, pair plots, building a cohesive data narrative.`
        }
      ],
      keyTerms: ["Pearson Correlation (-1 to +1)", "Correlation vs Causation", "Correlation Heatmap", "Univariate / Bivariate / Multivariate"],
      keyTakeaways: [
        "A correlation of 0 means no linear relationship, but strong non-linear relationships can exist.",
        "EDA moves from univariate to bivariate to multivariate analysis to tell a data story."
      ],
      selfTest: {
        q: "Does a Pearson correlation of 0.0 prove that two variables are completely independent?",
        a: "No; it only proves the absence of a linear relationship; non-linear dependencies may still exist."
      }
    },

    {
      id: "topic23",
      number: 23,
      track: "track3",
      title: "Working with APIs",
      subtitle: "REST APIs, requests library, HTTP status codes, rate limiting with back-off, and security hygiene.",
      readTime: "7 min read",
      summary: "Send HTTP requests, parse JSON payloads, handle status code failures, and manage rate limits.",
      sections: [
        {
          heading: "1. API Architecture & The Waiter Analogy",
          content: `• **API:** An interface allowing two software systems to communicate.
• **The Waiter Metaphor:** Client is the customer; API is the waiter taking the order (request) to the kitchen (server) and returning with the meal (JSON response).`
        },
        {
          heading: "2. HTTP Verbs & Status Code Ranges",
          content: `• **Verbs:** \`GET\` (retrieve data), \`POST\` (send new data/payload), \`PUT\` (replace), \`DELETE\`.
• **Status Codes:**
  - \`2xx\` Success (e.g. \`200 OK\`, \`201 Created\`)
  - \`4xx\` Client Error (e.g. \`400 Bad Request\`, \`401 Unauthorized\`, \`404 Not Found\`, \`429 Rate Limited\`)
  - \`5xx\` Server Error (e.g. \`500 Internal Server Error\`, \`503 Service Unavailable\`)`
        },
        {
          heading: "3. Handling Rate Limits & Security",
          content: `• **Rate Limiting:** Server-enforced cap on requests per minute.
• **Mitigation:** Implement exponential back-off retries and \`time.sleep()\` pacing.
• **Security:** Never commit API keys; store them in \`.env\` and load via \`python-dotenv\`.`
        }
      ],
      keyTerms: ["REST API", "GET vs POST", "2xx / 4xx / 5xx Status Codes", "Rate Limiting & Exponential Back-off", ".env & python-dotenv"],
      keyTakeaways: [
        "2xx indicates success, 4xx represents client mistakes/auth failures, and 5xx signifies server errors.",
        "Always wrap API calls in try-except blocks and respect rate limit headers."
      ],
      selfTest: {
        q: "What HTTP status code represents hitting an API rate limit?",
        a: "429 Too Many Requests"
      }
    },

    {
      id: "topic24",
      number: 24,
      track: "track3",
      title: "API-Driven Project: an End-to-End EDA Workshop (ETL Pipeline)",
      subtitle: "Extract, Transform, Load (ETL) pipeline, relational API schema design, and insight generation.",
      readTime: "7 min read",
      summary: "Build an automated ETL pipeline: pull JSON from APIs, persist in SQLite, clean in Pandas, and run EDA.",
      sections: [
        {
          heading: "1. The ETL Lifecycle",
          content: `$$\\text{Extract (API JSON)} \\xrightarrow{\\text{Paging + sleep()}} \\text{Transform (Normalize & Clean)} \\xrightarrow{\\text{SQLite}} \\text{Load (3NF DB)} \\xrightarrow{} \\text{Analyze (EDA)}$$`
        },
        {
          heading: "2. Relational Schema for Nested API Payloads",
          content: `• Deconstruct nested JSON into normalized tables linked by foreign keys:
  - \`movies\` (movie_id, title, budget, revenue, release_date)
  - \`genres\` (genre_id, genre_name)
  - \`movie_genres\` (movie_id, genre_id) — junction table
  - \`cast\` (movie_id, actor_name, role_order)`
        },
        {
          heading: "3. Business Analytics Insights",
          content: `• Joining and aggregating data allows answering high-value questions:
  - Budget vs Revenue ROI correlation.
  - Revenue distribution by genre.
  - Release month seasonality trends.`
        }
      ],
      keyTerms: ["ETL Pipeline (Extract, Transform, Load)", "Junction Table", "Relational Mapping of APIs", "ROI Analysis"],
      keyTakeaways: [
        "ETL extracts from raw sources, transforms data types and schemas, and loads into queryable databases.",
        "Junction tables resolve many-to-many relationships in API data (e.g. movies to genres)."
      ],
      selfTest: {
        q: "What does ETL stand for in data engineering?",
        a: "Extract, Transform, Load"
      }
    },

    {
      id: "topic25",
      number: 25,
      track: "track3",
      title: "Web Scraping with Beautiful Soup",
      subtitle: "HTML DOM structure, find() vs find_all(), response.content encoding, and post-scrape cleaning.",
      readTime: "8 min read",
      summary: "Scrape HTML pages, select tags by CSS class, parse raw text, and clean dirty scraped records.",
      sections: [
        {
          heading: "1. HTML Basics & Legal/Ethical Scraping",
          content: `• **Ethics:** Review \`robots.txt\` and terms of service; prefer official APIs when available.
• **DOM Elements:** Pages use hierarchical HTML tags (\`<div>\`, \`<article>\`, \`<span>\`, \`<a>\`) with \`class\` and \`id\` attributes for styling.`
        },
        {
          heading: "2. Beautiful Soup Extraction Syntax",
          content: `\`\`\`python
from bs4 import BeautifulSoup
import requests

response = requests.get("https://example.com/products")
# Gotcha: Use response.content for correct binary character decoding!
soup = BeautifulSoup(response.content, "html.parser")

items = soup.find_all("article", class_="product-card")
for item in items:
    title = item.find("h2").text.strip()
    price_raw = item.find("span", class_="price").text
\`\`\``
        },
        {
          heading: "3. Post-Scrape Cleaning Pipeline",
          content: `• Strip currency symbols (\`$\`, \`₹\`, \`£\`) and commas: \`price_clean = re.sub(r'[^0-9.]', '', price_raw)\`.
• Cast cleaned text to numeric floats: \`pd.to_numeric(df['price'], errors='coerce')\`.`
        }
      ],
      keyTerms: ["BeautifulSoup", "find() vs find_all()", "response.content vs response.text", "DOM Class Targeting", "Post-scrape Cleaning"],
      keyTakeaways: [
        "find() returns the first matching element; find_all() returns a list of all matches.",
        "Use response.content to prevent text encoding corruption with special currency symbols."
      ],
      selfTest: {
        q: "Why use response.content instead of response.text when parsing HTML with foreign symbols?",
        a: "response.content provides raw bytes, avoiding incorrect automatic encoding guesses on currency and special symbols."
      }
    },

    {
      id: "topic26",
      number: 26,
      track: "track4",
      title: "Foundations of Machine Learning: Problem Framing and Workflow",
      subtitle: "Supervised vs Unsupervised vs RL, Problem framing, 6-stage ML workflow, and Data Leakage.",
      readTime: "8 min read",
      summary: "Frame prediction tasks, split datasets properly, and avoid validation contamination.",
      sections: [
        {
          heading: "1. Problem Framing & Learning Paradigms",
          content: `• **Supervised Learning:** Learns from labeled pairs $(X, y)$.
  - *Regression:* Predicts continuous numbers (e.g. house price, temperature).
  - *Classification:* Predicts discrete categories (e.g. spam/not spam, churn/active).
• **Unsupervised Learning:** Discovers hidden structures in unlabeled data (e.g. K-Means clustering for customer segmentation).
• **Reinforcement Learning:** Agents learn optimal policies via trial-and-error using reward/penalty signals (e.g. PPO in robotics/game-playing).`
        },
        {
          heading: "2. The 6-Stage ML Workflow",
          content: `$$\\text{Data Collection} \\to \\text{Preprocessing} \\to \\text{Model Selection} \\to \\text{Training} \\to \\text{Evaluation} \\to \\text{Fine-tuning}$$`
        },
        {
          heading: "3. Train-Test Split & Data Leakage",
          content: `• **Train-Test Split:** Standard split is 80% train / 20% test.
• **Data Leakage:** When information from outside the training set contaminates model fitting (e.g. scaling or imputing the entire dataset prior to splitting).
• **Validation Split & Cross-Validation:** $K$-Fold cross-validation provides variance-resistant performance estimates without contaminating the test set.`
        }
      ],
      keyTerms: ["Supervised vs Unsupervised vs RL", "Features (X) vs Target (y)", "Regression vs Classification", "Data Leakage", "K-Fold Cross-Validation"],
      keyTakeaways: [
        "Regression outputs continuous values; Classification outputs discrete classes.",
        "Data leakage leads to deceptively high validation scores that collapse in production."
      ],
      selfTest: {
        q: "What is data leakage in machine learning?",
        a: "When information from the test set or future data contaminates training, producing artificially optimistic performance."
      }
    },

    {
      id: "topic27",
      number: 27,
      track: "track4",
      title: "Data Preprocessing for Machine Learning",
      subtitle: "MCAR/MAR/MNAR taxonomy, imputation rules, Label vs One-Hot encoding, and high cardinality.",
      readTime: "8 min read",
      summary: "Handle missing data mechanisms, choose encoding methods, and manage categorical cardinality.",
      sections: [
        {
          heading: "1. Missing Data Taxonomy (MCAR / MAR / MNAR)",
          content: `• **MCAR (Missing Completely At Random):** Missingness is purely random, unrelated to any variable.
• **MAR (Missing At Random):** Missingness depends on other observed features (e.g. men rarely reporting depression scores).
• **MNAR (Missing Not At Random):** Missingness depends directly on the unobserved value itself (e.g. high-income earners refusing to disclose income).`
        },
        {
          heading: "2. Decision Thresholds for Missing Values",
          content: `• **$< 5\\%$ missing:** Safely drop missing rows.
• **$5\\% - 30\\%$ missing:** Impute with median (skewed numerical), mean (normal), or mode (categorical).
• **$> 30\\% - 40\\%$ missing:** Strongly consider dropping the entire column unless domain knowledge confirms high predictive importance.
• **Target Column ($y$):** Always drop missing rows in target $y$; never impute what you are predicting!`
        },
        {
          heading: "3. Categorical Encoding: Label vs One-Hot",
          content: `• **Label Encoding:** Assigns integers ($0, 1, 2$). Best for binary or truly ordinal features (e.g. Low=0, Med=1, High=2).
• **One-Hot Encoding (\`pd.get_dummies\`):** Creates $N-1$ binary columns. Prevents models from assuming false numerical ordering.
• **High Cardinality:** Group low-frequency classes into an \`"Other"\` category before one-hot encoding.`
        }
      ],
      keyTerms: ["MCAR / MAR / MNAR", "Imputation Rules (<5%, 5-30%, >30%)", "Label Encoding", "One-Hot Encoding", "High Cardinality Grouping"],
      keyTakeaways: [
        "Never impute target variable y — drop rows with missing targets.",
        "One-hot encoding creates binary dummy columns; avoid cardinality explosion by grouping rare categories."
      ],
      selfTest: {
        q: "What type of encoding should you use for an ordinal feature like [Low, Medium, High]?",
        a: "Label / Ordinal Encoding (e.g., 0, 1, 2) to preserve meaningful order."
      }
    },

    {
      id: "topic28",
      number: 28,
      track: "track4",
      title: "Descriptive Statistics, Distributions, and Feature Scaling",
      subtitle: "Mean/Median/Mode, Variance & Std Dev, Empirical 3-Sigma Rule, Skewness, and StandardScaler vs MinMaxScaler.",
      readTime: "8 min read",
      summary: "Understand central tendency, measure dispersion, interpret skewness, and apply feature scalers.",
      sections: [
        {
          heading: "1. Central Tendency & Spread",
          content: `• **Mean vs Median:** Mean is sensitive to outliers; Median is robust against extreme values. Mode is used for discrete/categorical data.
• **Variance ($\\sigma^2$) & Standard Deviation ($\\sigma$):**
$$\\sigma^2 = \\frac{1}{N}\\sum_{i=1}^N (x_i - \\mu)^2, \\quad \\sigma = \\sqrt{\\sigma^2}$$
Standard deviation returns the spread metric back to original feature units.`
        },
        {
          heading: "2. The Gaussian Distribution & 3-Sigma Rule",
          content: `• In a perfect normal distribution: $\\text{Mean} = \\text{Median} = \\text{Mode}$.
• **Empirical Rule (68-95-99.7):**
  - $\\mu \\pm 1\\sigma$: $\\approx 68.27\\%$ of data.
  - $\\mu \\pm 2\\sigma$: $\\approx 95.45\\%$ of data.
  - $\\mu \\pm 3\\sigma$: $\\approx 99.73\\%$ of data (points beyond $\\pm 3\\sigma$ are potential outliers).
• **Skewness:**
  - *Right (Positive) Skew:* $\\text{Mean} > \\text{Median} > \\text{Mode}$ (tail extends right).
  - *Left (Negative) Skew:* $\\text{Mean} < \\text{Median} < \\text{Mode}$ (tail extends left).`
        },
        {
          heading: "3. Feature Scaling: StandardScaler vs MinMaxScaler",
          content: `• **StandardScaler (Z-Score):** $z = \\frac{x - \\mu}{\\sigma} \\implies \\mu=0, \\sigma=1$.
• **MinMaxScaler:** $x_{\\text{scaled}} = \\frac{x - x_{\\min}}{x_{\\max} - x_{\\min}} \\implies [0, 1]$.
• **Crucial Rule:** Fit scalers **only** on training data (\`fit_transform\`), then apply \`transform\` to test data!
• *Tree models (Random Forest, XGBoost) do NOT require feature scaling because they split on single-feature thresholds.*`
        }
      ],
      keyTerms: ["Mean vs Median Robustness", "Variance & Standard Deviation", "Empirical 3-Sigma Rule (68-95-99.7)", "Right vs Left Skew", "StandardScaler vs MinMaxScaler"],
      keyTakeaways: [
        "In right-skewed data, Mean > Median > Mode.",
        "Tree-based models do not require feature scaling; distance-based models (KNN, SVM, Linear/Logistic Regression) do."
      ],
      selfTest: {
        q: "What percentage of data falls within ±2 standard deviations of the mean in a normal distribution?",
        a: "Approximately 95.45%"
      }
    },

    {
      id: "topic29",
      number: 29,
      track: "track5",
      title: "Linear Regression",
      subtitle: "Line equation, residuals, Sum of Squared Errors (SSE), SGD optimizer, and multivariate extension.",
      readTime: "8 min read",
      summary: "Understand least squares estimation, slope/intercept interpretation, and scikit-learn implementation.",
      sections: [
        {
          heading: "1. The Linear Regression Model",
          content: `• **Single Variable Equation:**
$$y = mx + c$$
Where $m$ is the slope (change in $y$ per unit change in $x$), and $c$ is the intercept ($y$-value when $x=0$).
• **Multivariate Extension:**
$$y = w_1 x_1 + w_2 x_2 + \\dots + w_n x_n + b$$`
        },
        {
          heading: "2. Residuals & Loss Function (SSE / MSE)",
          content: `• **Residual:** $e_i = y_i - \\hat{y}_i$ (actual minus predicted).
• **Sum of Squared Errors (SSE):**
$$\\text{SSE} = \\sum_{i=1}^n (y_i - \\hat{y}_i)^2$$
Squaring eliminates sign cancellation and penalizes large errors heavily. Solved analytically via Ordinary Least Squares (OLS) or iteratively via **Stochastic Gradient Descent (SGD)**.`
        },
        {
          heading: "3. Scikit-Learn Implementation",
          content: `\`\`\`python
from sklearn.linear_model import LinearRegression

model = LinearRegression()
model.fit(X_train_scaled, y_train)
y_pred = model.predict(X_test_scaled)
print(f"Coefficients: {model.coef_} | Intercept: {model.intercept_}")
\`\`\``
        }
      ],
      keyTerms: ["y = mx + c", "Residuals (y - ŷ)", "Sum of Squared Errors (SSE)", "OLS vs SGD", "Multivariate Regression", "Coefficients as Importance"],
      keyTakeaways: [
        "Linear regression finds the hyperplane that minimizes the sum of squared residuals.",
        "The sign of a coefficient indicates direction; its magnitude reflects feature impact (when features are scaled)."
      ],
      selfTest: {
        q: "Why does Linear Regression square the residuals in the loss function?",
        a: "To eliminate positive/negative sign cancellation and penalize large prediction errors more severely."
      }
    },

    {
      id: "topic30",
      number: 30,
      track: "track5",
      title: "Regression Evaluation Metrics",
      subtitle: "MAE, MSE, RMSE, R-squared, Adjusted R-squared, Baseline mean model, and Heteroscedasticity.",
      readTime: "8 min read",
      summary: "Evaluate regression performance, compare MAE vs RMSE penalties, and inspect residual plots.",
      sections: [
        {
          heading: "1. Core Regression Metrics",
          content: `• **MAE (Mean Absolute Error):** $\\frac{1}{n} \\sum |y - \\hat{y}|$. Linear penalty, highly interpretable.
• **MSE (Mean Squared Error):** $\\frac{1}{n} \\sum (y - \\hat{y})^2$. Penalizes large outliers heavily.
• **RMSE (Root MSE):** $\\sqrt{\\text{MSE}}$. Restores original units while keeping sensitivity to large errors.`
        },
        {
          heading: "2. $R^2$ and Adjusted $R^2$",
          content: `$$R^2 = 1 - \\frac{\\sum (y - \\hat{y})^2}{\\sum (y - \\bar{y})^2}$$
• $R^2 = 1$: Perfect fit; $R^2 = 0$: Performs no better than predicting the mean $\\bar{y}$; $R^2 < 0$: Model performs worse than baseline mean.
• **Adjusted $R^2$:** Penalizes adding useless predictor features (always $\\le R^2$).`
        },
        {
          heading: "3. Residual Plots & Heteroscedasticity",
          content: `• **Well-behaved Residuals:** Random scatter centered symmetrically around zero.
• **Heteroscedasticity:** Residuals form a cone/funnel shape (variance changes across prediction magnitudes), signaling model misspecification.`
        }
      ],
      keyTerms: ["MAE vs MSE vs RMSE", "R² (Coefficient of Determination)", "Adjusted R²", "Baseline Mean Model", "Heteroscedasticity"],
      keyTakeaways: [
        "RMSE is expressed in original target units and penalizes large errors more severely than MAE.",
        "Adjusted R² adjusts for the number of predictors to prevent artificial inflation."
      ],
      selfTest: {
        q: "What does an R² score of 0.0 indicate?",
        a: "The model explains 0% of the target variance, performing no better than predicting the constant mean."
      }
    },

    {
      id: "topic31",
      number: 31,
      track: "track5",
      title: "Underfitting, Overfitting, and Regularization (Ridge and Lasso)",
      subtitle: "Bias-Variance tradeoff, L2 Ridge penalty, L1 Lasso feature selection, and alpha hyperparameter tuning.",
      readTime: "8 min read",
      summary: "Diagnose model generalization, balance bias vs variance, and apply L1/L2 penalties.",
      sections: [
        {
          heading: "1. Bias-Variance Tradeoff",
          content: `• **Underfitting (High Bias):** Model is overly simplistic; poor performance on both train and test sets.
• **Overfitting (High Variance):** Model memorizes training noise; high train score but poor test score.
• **Optimal Fit:** Low bias and low variance simultaneously, with train and test errors closely aligned.`
        },
        {
          heading: "2. Regularization: Ridge (L2) vs Lasso (L1)",
          content: `• **Ridge Regression (L2):** Adds squared coefficient penalty:
$$\\text{Loss} = \\text{MSE} + \\alpha \\sum w_i^2$$
Shrinks coefficients smoothly toward zero without eliminating them.

• **Lasso Regression (L1):** Adds absolute coefficient penalty:
$$\\text{Loss} = \\text{MSE} + \\alpha \\sum |w_i|$$
Can force coefficients **exactly to zero**, performing automated feature selection.`
        },
        {
          heading: "3. Alpha Tuning & Leak-Free Pipelines",
          content: `• $\\alpha = 0$: Behaves like standard OLS Linear Regression.
• Large $\\alpha$: Strong regularization, pushing weights close to zero (risk of underfitting).
• Bundle with \`Pipeline\` and \`GridSearchCV\` using 80/20 train-test and internal validation folds.`
        }
      ],
      keyTerms: ["Underfitting vs Overfitting", "Bias-Variance Tradeoff", "Ridge Regression (L2)", "Lasso Regression (L1)", "Alpha Hyperparameter", "Pipeline & ColumnTransformer"],
      keyTakeaways: [
        "Lasso (L1) can zero out coefficients to perform automatic feature selection; Ridge (L2) shrinks all weights smoothly.",
        "Increasing alpha increases bias and reduces variance."
      ],
      selfTest: {
        q: "Which regularization technique can shrink feature coefficients completely to 0: Ridge or Lasso?",
        a: "Lasso Regression (L1 regularization)"
      }
    },

    {
      id: "topic32",
      number: 32,
      track: "track5",
      title: "Logistic Regression for Classification",
      subtitle: "Sigmoid function, decision thresholds, binary cross-entropy loss, and log-odds coefficients.",
      readTime: "8 min read",
      summary: "Transform linear combinations with the sigmoid curve, compute probabilities, and tune decision thresholds.",
      sections: [
        {
          heading: "1. Why Logistic Regression & The Sigmoid Function",
          content: `• Linear regression is unsuitable for classification because outputs are unbounded $(-\\infty, +\\infty)$.
• **Sigmoid (Logistic) Function:**
$$\\sigma(z) = \\frac{1}{1 + e^{-z}}$$
Squashes any real value $z = w^T X + b$ into a probability $p \\in (0, 1)$.`
        },
        {
          heading: "2. Decision Thresholds & Log-Loss",
          content: `• Default threshold is **$0.5$**: if $p \\ge 0.5 \\implies \\text{Class } 1$, else $\\text{Class } 0$.
• Lower threshold (e.g. $0.2$) in cancer detection or fraud screening to minimize False Negatives (boost Recall).
• **Binary Cross-Entropy Loss (Log Loss):**
$$\\text{Loss} = -\\left[ y \\log(p) + (1-y) \\log(1-p) \\right]$$
Heavily penalizes confident, incorrect predictions.`
        },
        {
          heading: "3. predict() vs predict_proba()",
          content: `• \`model.predict(X)\`: Returns discrete class labels ($0$ or $1$) using default $0.5$ cutoff.
• \`model.predict_proba(X)\`: Returns class probabilities $[P(y=0), P(y=1)]$, enabling custom thresholding.`
        }
      ],
      keyTerms: ["Sigmoid Function", "Cross-Entropy Loss (Log Loss)", "predict() vs predict_proba()", "Decision Threshold Tuning", "Log-odds & Odds Ratio"],
      keyTakeaways: [
        "The sigmoid function squashes linear outputs into the range (0, 1).",
        "predict_proba() yields continuous probabilities necessary for custom decision thresholds."
      ],
      selfTest: {
        q: "What is the mathematical output range of the Sigmoid function?",
        a: "(0, 1) — strictly bounded between 0 and 1."
      }
    },

    {
      id: "topic33",
      number: 33,
      track: "track5",
      title: "Classification Evaluation: Confusion Matrix, Precision, Recall, F1",
      subtitle: "TP/TN/FP/FN matrix, Accuracy paradox, Precision vs Recall tradeoffs, and F1 harmonic mean.",
      readTime: "8 min read",
      summary: "Calculate precision, recall, F1, and accuracy from confusion matrices, and navigate tradeoffs.",
      sections: [
        {
          heading: "1. Confusion Matrix Components",
          content: `| | Actually Positive ($y=1$) | Actually Negative ($y=0$) |
|---|---|---|
| **Predicted Positive ($\\hat{y}=1$)** | **True Positive (TP)** | **False Positive (FP)** (Type I Error) |
| **Predicted Negative ($\\hat{y}=0$)** | **False Negative (FN)** (Type II Error) | **True Negative (TN)** |`
        },
        {
          heading: "2. Metric Formulas",
          content: `$$\\text{Accuracy} = \\frac{TP + TN}{TP + TN + FP + FN}$$
$$\\text{Precision} = \\frac{TP}{TP + FP} \\quad \\text{(Exactness: how many predicted positives were correct)}$$
$$\\text{Recall (Sensitivity/TPR)} = \\frac{TP}{TP + FN} \\quad \\text{(Completeness: how many actual positives were caught)}$$
$$\\text{F1-Score} = 2 \\times \\frac{\\text{Precision} \\times \\text{Recall}}{\\text{Precision} + \\text{Recall}} \\quad \\text{(Harmonic Mean)}$$`
        },
        {
          heading: "3. The Accuracy Paradox",
          content: `On an imbalanced dataset with 99% negative cases, a trivial dummy classifier predicting "negative" for every row achieves 99% accuracy but has **0% Recall** on the positive class!`
        }
      ],
      keyTerms: ["Confusion Matrix (TP, TN, FP, FN)", "Accuracy Paradox", "Precision", "Recall (Sensitivity)", "F1-Score", "Type I vs Type II Error"],
      keyTakeaways: [
        "Precision focuses on minimizing False Positives (Spam filtering).",
        "Recall focuses on minimizing False Negatives (Medical diagnosis, fraud detection).",
        "F1-score is the harmonic mean of precision and recall."
      ],
      selfTest: {
        q: "If TP=80, FP=20, FN=0, TN=100, what is Precision and Recall?",
        a: "Precision = 80/(80+20) = 0.80 (80%). Recall = 80/(80+0) = 1.0 (100%)."
      }
    },

    {
      id: "topic34",
      number: 34,
      track: "track5",
      title: "Handling Imbalanced Data",
      subtitle: "Stratified splits, class weighting, random undersampling, SMOTE oversampling, and PR curves.",
      readTime: "8 min read",
      summary: "Mitigate class imbalance, apply SMOTE without data leakage, and inspect Precision-Recall curves.",
      sections: [
        {
          heading: "1. Imbalance Challenges & Stratified Splits",
          content: `• Standard random splitting can leave few or zero positive minority samples in the test set.
• **Stratified Split (\`stratify=y\`):** Preserves original class proportions across training and test partitions.`
        },
        {
          heading: "2. Resampling & Class Weighting",
          content: `• **Class Weighting (\`class_weight='balanced'\`):** Increases loss penalty on minority mistakes during gradient updates without altering dataset size.
• **Random Under-sampling:** Discards majority rows (fast, but loses potentially valuable data).
• **SMOTE (Synthetic Minority Oversampling Technique):** Generates synthetic minority examples by interpolating between $k$-nearest neighbors.`
        },
        {
          heading: "3. Preventing SMOTE Data Leakage",
          content: `• **Critical Rule:** Never apply SMOTE on the full dataset before splitting!
• Correct Pipeline: EDA $\\to$ Stratified Split $\\to$ Fit SMOTE **strictly on train fold** $\\to$ Evaluate on untouched raw test fold.`
        }
      ],
      keyTerms: ["Class Imbalance", "Stratified Train-Test Split", "class_weight='balanced'", "Random Under-sampling", "SMOTE", "Precision-Recall Curve"],
      keyTakeaways: [
        "Always apply SMOTE inside training folds only to avoid synthetic data leakage.",
        "Precision-Recall curves provide better evaluation than ROC curves on highly imbalanced data."
      ],
      selfTest: {
        q: "Why must SMOTE oversampling be applied only on the training set and never before the split?",
        a: "Applying SMOTE before splitting creates synthetic points using test set information, causing data leakage and invalid evaluations."
      }
    },

    {
      id: "topic35",
      number: 35,
      track: "track5",
      title: "Decision Trees and Random Forests",
      subtitle: "Entropy, Gini Impurity, Information Gain, Tree building, Bagging, Out-of-Bag (OOB) score, and Hyperparameters.",
      readTime: "9 min read",
      summary: "Understand tree splitting equations, Bagging mechanics, Random Forest ensembles, and OOB evaluation.",
      sections: [
        {
          heading: "1. Decision Tree Splitting Metrics",
          content: `• **Entropy:** Measures disorder in a node:
$$\\text{Entropy}(S) = -\\sum p_i \\log_2(p_i)$$
• **Gini Impurity:** Fast purity measure (default in scikit-learn):
$$\\text{Gini}(S) = 1 - \\sum p_i^2$$
• **Information Gain (IG):** $\\text{IG} = \\text{Entropy}(\\text{parent}) - \\sum w_v \\text{Entropy}(\\text{child}_v)$. The split yielding highest IG is selected.`
        },
        {
          heading: "2. Random Forest Ensembles & Bagging",
          content: `• **Bagging (Bootstrap Aggregation):**
  - *Row Sampling:* Each tree trains on a random bootstrap sample with replacement.
  - *Feature/Column Sampling:* Each split considers only a random subset of features (typically $\\sqrt{d}$ or $\\log_2 d$).
• **Aggregation:** Majority vote across all independent trees cancels individual tree overfitting.`
        },
        {
          heading: "3. Out-of-Bag (OOB) Evaluation & Hyperparameters",
          content: `• **OOB Score:** Unselected bootstrap samples act as a built-in validation test for each tree.
• **Key Hyperparameters:** \`n_estimators\` (tree count), \`max_depth\`, \`min_samples_split\`, \`min_samples_leaf\`, \`n_jobs=-1\`.`
        }
      ],
      keyTerms: ["Entropy & Gini Impurity", "Information Gain", "Bootstrap Aggregating (Bagging)", "Random Forest", "Out-of-Bag (OOB) Score", "Bagging vs Boosting vs Stacking"],
      keyTakeaways: [
        "Random Forest combines row sampling (bootstrap) and column feature subsampling to reduce variance.",
        "OOB score provides validation performance without needing a separate held-out fold."
      ],
      selfTest: {
        q: "What is the maximum Gini Impurity for a binary classification problem?",
        a: "0.5 (when classes are evenly split 50/50)."
      }
    },

    {
      id: "topic36",
      number: 36,
      track: "track5",
      title: "ROC Curve, AUC, and Threshold Tuning",
      subtitle: "TPR vs FPR axes, the ROC ideal point (0, 1), AUC interpretation, and threshold sweeping.",
      readTime: "7 min read",
      summary: "Plot ROC curves across decision thresholds, calculate AUC, and choose domain-specific cutoffs.",
      sections: [
        {
          heading: "1. ROC Axes: TPR vs FPR",
          content: `$$\\text{TPR (True Positive Rate / Recall)} = \\frac{TP}{TP + FN}$$
$$\\text{FPR (False Positive Rate)} = \\frac{FP}{FP + TN} = 1 - \\text{Specificity}$$
• The ROC curve sweeps classification thresholds from $0.0$ to $1.0$, plotting TPR ($y$-axis) against FPR ($x$-axis).`
        },
        {
          heading: "2. The Ideal Point & AUC Interpretation",
          content: `• **Ideal Point:** $(FPR=0, TPR=1)$ — zero false alarms and 100% detection.
• **AUC (Area Under the Curve):**
  - $\\text{AUC} = 1.0$: Perfect classifier.
  - $\\text{AUC} \\approx 0.5$: Random guessing (diagonal line).
  - $\\text{AUC} < 0.5$: Worse than random guessing (inverted predictions).`
        }
      ],
      keyTerms: ["TPR (Recall) vs FPR", "ROC Curve", "AUC (Area Under Curve)", "Ideal Point (0, 1)", "Threshold Sweeping"],
      keyTakeaways: [
        "AUC measures model discriminative ability across all possible classification thresholds.",
        "An AUC of 0.5 represents a completely random guessing baseline."
      ],
      selfTest: {
        q: "What are the X and Y axes of an ROC curve?",
        a: "X-axis: False Positive Rate (FPR); Y-axis: True Positive Rate (TPR / Recall)."
      }
    },

    {
      id: "topic37",
      number: 37,
      track: "track5",
      title: "End-to-End Classification Pipeline and Hyperparameter Tuning",
      subtitle: "ColumnTransformer, Pipeline, GridSearchCV vs RandomizedSearchCV, and joblib persistence.",
      readTime: "8 min read",
      summary: "Assemble leak-free production ML pipelines, optimize hyperparameters, and serialize trained models.",
      sections: [
        {
          heading: "1. ColumnTransformer & Pipeline Assembly",
          content: `\`\`\`python
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.ensemble import RandomForestClassifier

preprocessor = ColumnTransformer(transformers=[
    ('num', StandardScaler(), numeric_cols),
    ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_cols)
])

pipeline = Pipeline([
    ('prep', preprocessor),
    ('clf', RandomForestClassifier())
])
\`\`\``
        },
        {
          heading: "2. GridSearchCV vs RandomizedSearchCV",
          content: `• **GridSearchCV:** Exhaustively evaluates every combination in parameter grid with $k$-fold cross-validation (computationally expensive).
• **RandomizedSearchCV:** Evaluates a random sample of $N$ parameter combinations, achieving comparable performance in a fraction of compute time.`
        },
        {
          heading: "3. Model Persistence with Joblib",
          content: `\`\`\`python
import joblib

joblib.dump(pipeline, "churn_model.joblib")  # Save trained pipeline
loaded_model = joblib.load("churn_model.joblib")  # Load for FastAPI serving
\`\`\``
        }
      ],
      keyTerms: ["ColumnTransformer", "Pipeline", "GridSearchCV vs RandomizedSearchCV", "joblib.dump & joblib.load", "Model Persistence"],
      keyTakeaways: [
        "Pipelines bundle preprocessing and estimators to guarantee zero data leakage during cross-validation.",
        "joblib efficiently serializes trained models containing large NumPy arrays."
      ],
      selfTest: {
        q: "Why use RandomizedSearchCV over GridSearchCV when hyperparameter search spaces are large?",
        a: "RandomizedSearchCV samples fixed iterations randomly, delivering near-optimal hyperparameters much faster."
      }
    },

    {
      id: "topic38",
      number: 38,
      track: "track5",
      title: "Unsupervised Learning: Clustering with K-Means",
      subtitle: "Centroid initialization, 4-step convergence loop, Silhouette score formula, and scaling requirements.",
      readTime: "8 min read",
      summary: "Implement K-Means clustering, compute Silhouette coefficients, and understand algorithmic limitations.",
      sections: [
        {
          heading: "1. The K-Means 4-Step Convergence Algorithm",
          content: `1. Initialize $K$ centroids randomly in feature space.
2. Calculate Euclidean distance from every data point to all $K$ centroids.
3. Assign each point to its nearest centroid.
4. Recompute each centroid as the mathematical mean of assigned points.
5. Repeat steps 2–4 until centroids stabilize (convergence).`
        },
        {
          heading: "2. Silhouette Score Evaluation",
          content: `$$s = \\frac{b - a}{\\max(a, b)}$$
• $a$: Mean intra-cluster distance (cohesion — want small).
• $b$: Mean nearest-cluster distance (separation — want large).
• **Range:** $-1.0$ to $+1.0$ ($+1$ indicates dense, well-separated clusters; $0$ indicates overlapping clusters).`
        },
        {
          heading: "3. Scaling and Limitations",
          content: `• **Scaling:** Euclidean distance requires \`StandardScaler\` so large-magnitude features don't dominate.
• **Limitations:** Assumes spherical clusters of similar size; struggles with non-convex shapes or outliers (use DBSCAN or Hierarchical Clustering instead).`
        }
      ],
      keyTerms: ["K-Means Algorithm", "Centroid Convergence", "Silhouette Score (-1 to +1)", "Euclidean Distance", "DBSCAN"],
      keyTakeaways: [
        "K-Means requires feature scaling because cluster assignments rely on Euclidean distance calculations.",
        "The Silhouette score balances cluster cohesion (a) against cluster separation (b)."
      ],
      selfTest: {
        q: "What does a Silhouette Score close to +1.0 indicate?",
        a: "Dense, well-separated clusters with strong cohesion and separation."
      }
    },

    {
      id: "topic39",
      number: 39,
      track: "track6",
      title: "Foundations of Large Language Models",
      subtitle: "Autoregressive generation, Tokenization, Embeddings, Positional Encoding, and Q/K/V Self-Attention.",
      readTime: "9 min read",
      summary: "Understand Transformer architecture, multi-head self-attention, token embeddings, and model limitations.",
      sections: [
        {
          heading: "1. Autoregressive Generation & Tokenization",
          content: `• LLMs predict the next token probability conditioned on previous context: $P(t_{k+1} \\mid t_1, \\dots, t_k)$.
• **Tokenization:** Converts text into subword token integer IDs using byte-pair encoding (BPE) over fixed vocabulary sizes (~32k–128k).`
        },
        {
          heading: "2. Embeddings, Positional Encoding & Self-Attention",
          content: `• **Embeddings:** Map token IDs into dense continuous vectors capturing semantic meaning.
• **Positional Encoding:** Added to embeddings to inject token sequence order.
• **Scaled Dot-Product Self-Attention:**
$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left( \\frac{Q K^T}{\\sqrt{d_k}} \\right) V$$
Each token projects Query ($Q$), Key ($K$), and Value ($V$) vectors to compute attention weights showing how much each token attends to all others.`
        },
        {
          heading: "3. LLM Limitations & Biases",
          content: `• **Hallucination:** Generating plausible-sounding but factually fabricated statements.
• **Knowledge Cutoff:** Models cannot inherently know real-world events occurring after their training cutoff date.
• **Privacy & Bias:** Training data mirrors historical societal biases; API prompts risk data leakage.`
        }
      ],
      keyTerms: ["Autoregressive Next-Token Prediction", "Tokenization (BPE)", "Dense Embeddings", "Positional Encoding", "Q/K/V Self-Attention", "Hallucination"],
      keyTakeaways: [
        "Transformers use self-attention (Q, K, V) to capture long-range contextual relationships across tokens in parallel.",
        "LLMs are probabilistic pattern matchers and do not possess verified factual grounding without tools or RAG."
      ],
      selfTest: {
        q: "In the self-attention formula Attention(Q, K, V) = softmax((Q K^T)/sqrt(d_k)) * V, what do Q, K, and V represent?",
        a: "Query, Key, and Value vectors."
      }
    },

    {
      id: "topic40",
      number: 40,
      track: "track6",
      title: "Prompt Engineering",
      subtitle: "System/User/Assistant roles, Role-Context-Task-Format-Length skeleton, Few-Shot, and Chain-of-Thought.",
      readTime: "8 min read",
      summary: "Craft deterministic prompts, apply structured prompt skeletons, few-shot examples, and CoT reasoning.",
      sections: [
        {
          heading: "1. Prompt Roles & Structure",
          content: `• **System Prompt:** Sets persona, operating constraints, output schema, and behavioral boundaries.
• **User Prompt:** The immediate task input or query.
• **Assistant Context:** Conversation history providing multi-turn memory.`
        },
        {
          heading: "2. The RCTFL Prompt Skeleton",
          content: `1. **Role:** *"Act as a Principal Staff AI Engineer..."*
2. **Context:** Provide background constraints, domain rules, or data schemas.
3. **Task:** State the precise action to execute.
4. **Format:** Specify exact output format (e.g. valid JSON matching a schema).
5. **Length / Constraints:** Specify brevity rules and negative constraints (*"Do NOT include pleasantries"*).`
        },
        {
          heading: "3. Few-Shot Prompting & Chain of Thought (CoT)",
          content: `• **Zero-Shot:** Direct prompt without examples.
• **Few-Shot:** Supplying 2–3 input/output demonstration pairs to enforce strict tone and schema formatting.
• **Chain of Thought (CoT):** *"Think step by step before providing your final answer."* Drastically reduces reasoning errors on multi-step logic.`
        }
      ],
      keyTerms: ["System / User / Assistant Roles", "Role-Context-Task-Format-Length (RCTFL)", "Few-Shot Prompting", "Chain of Thought (CoT)", "Token Economics"],
      keyTakeaways: [
        "Chain of Thought prompting prompts models to emit intermediate reasoning steps, improving complex problem accuracy.",
        "Few-shot examples are the most effective way to lock in complex output formats."
      ],
      selfTest: {
        q: "What does Chain of Thought (CoT) prompting instruct the model to do?",
        a: "To break down reasoning into explicit step-by-step intermediate thoughts before producing the final answer."
      }
    },

    {
      id: "topic41",
      number: 41,
      track: "track6",
      title: "AI Agents and Tool Use",
      subtitle: "ReAct pattern (Reason + Act), JSON tool schemas, the 6-step manual agent loop, and function calling.",
      readTime: "8 min read",
      summary: "Extend LLMs with tool execution, implement ReAct loops, and integrate Python/API actions.",
      sections: [
        {
          heading: "1. What is an AI Agent? & The ReAct Pattern",
          content: `• While basic LLMs map input text to output text, an **AI Agent** interacts dynamically with external tools (databases, APIs, calculators) in an iterative loop.
• **ReAct Loop:** Alternates between **Reasoning** (deciding what to do next) and **Acting** (executing a tool), observing results, and looping until completion.`
        },
        {
          heading: "2. JSON Tool Specification",
          content: `Tools are declared to the LLM via structured JSON schemas detailing function name, description, and parameter types:
\`\`\`json
{
  "name": "lookup_weather",
  "description": "Fetch current temperature for a given city",
  "parameters": {
    "type": "object",
    "properties": {
      "city": { "type": "string" }
    },
    "required": ["city"]
  }
}
\`\`\``
        },
        {
          heading: "3. The 6-Step Agent Loop",
          content: `1. Initialize message list with system prompt and user query.
2. Call LLM with messages and tool definitions.
3. Check if LLM emitted a tool call request.
4. Execute corresponding local Python function with provided parameters.
5. Append tool observation back into message list with role=\`"tool"\`.
6. Call LLM again until final response without tool calls is generated.`
        }
      ],
      keyTerms: ["AI Agent", "ReAct Pattern (Reason + Act)", "Tool JSON Schema", "6-Step Agent Loop", "Function Calling"],
      keyTakeaways: [
        "Agents iterate through Thought -> Action -> Observation -> Final Answer loops.",
        "Tool specifications require clear descriptions because the LLM uses docstrings to decide when to call a tool."
      ],
      selfTest: {
        q: "What are the core phases of the ReAct agent framework?",
        a: "Reason (Thought), Act (Tool Call), and Observe (Tool Output Observation)."
      }
    },

    {
      id: "topic42",
      number: 42,
      track: "track6",
      title: "Structured Outputs and Reliable Agent Design",
      subtitle: "Temperature tuning, JSON Schema enforcement, output validation loops, and idempotent tools.",
      readTime: "8 min read",
      summary: "Guarantee strict JSON schemas, handle parsing failures gracefully, and design idempotent actions.",
      sections: [
        {
          heading: "1. Temperature Tuning & JSON Schema",
          content: `• **Temperature ($0.0$ to $1.0+$):**
  - $\\text{Temperature} = 0.0$: Near-deterministic, focused outputs (mandatory for JSON extraction and code generation).
  - Higher Temperature ($0.7+$): Creative, varied text.
• **JSON Schema Enforcement:** Modern APIs allow strict schema passing, constraining the model's token sampler to emit valid JSON conforming to a Pydantic model.`
        },
        {
          heading: "2. Output Validation & Correction Loops",
          content: `• If parsed JSON fails Pydantic validation:
  1. Catch validation error.
  2. Append error traceback to conversation history.
  3. Prompt LLM: *"Your output violated schema with error: {error}. Please correct."*`
        },
        {
          heading: "3. Idempotent Tool Design",
          content: `• **Idempotency:** Calling a tool multiple times with identical arguments produces the exact same state without unintended side effects (e.g. charging a payment card twice).
• Implement unique **request tokens / idempotency keys** to protect API execution.`
        }
      ],
      keyTerms: ["Temperature=0.0", "JSON Schema Enforcement", "Pydantic Validation Loop", "Idempotent Tools", "Idempotency Keys"],
      keyTakeaways: [
        "Always use temperature=0 for structured data extraction and tool calling.",
        "Design tools to be idempotent so agent retries do not duplicate stateful operations."
      ],
      selfTest: {
        q: "What temperature setting is recommended for deterministic JSON extraction?",
        a: "0.0 (near-deterministic sampling)."
      }
    },

    {
      id: "topic43",
      number: 43,
      track: "track6",
      title: "Embeddings and Semantic Search",
      subtitle: "Dense vectors, Cosine similarity math, document chunking strategies, Vector DBs, and HNSW indexing.",
      readTime: "8 min read",
      summary: "Convert text to dense embeddings, calculate vector similarity, chunk documents, and query vector stores.",
      sections: [
        {
          heading: "1. Dense Embeddings & Cosine Similarity",
          content: `• Embeddings convert text into dense vectors (e.g. 384 dims for \`all-MiniLM-L6-v2\`, 1536 dims for OpenAI \`text-embedding-3-small\`) capturing semantic relationships.
• **Cosine Similarity Formula:**
$$\\text{CosSim}(\\vec{u}, \\vec{v}) = \\frac{\\vec{u} \\cdot \\vec{v}}{\\|\\vec{u}\\| \\|\\vec{v}\\|} = \\frac{\\sum u_i v_i}{\\sqrt{\\sum u_i^2} \\sqrt{\\sum v_i^2}}$$
  - $> 0.8$: High semantic similarity.
  - $0.5 - 0.8$: Loosely related.
  - $< 0.5$: Unrelated.`
        },
        {
          heading: "2. Document Chunking Strategies",
          content: `• Chunking splits large documents into retrieval units.
• **Strategies:** Fixed-size with overlap (e.g. 500 characters, 50 character overlap), sentence/paragraph boundary, or recursive semantic chunking. Overlap prevents splitting key context across boundaries.`
        },
        {
          heading: "3. Vector Databases & HNSW Indexing",
          content: `• Vector DBs (ChromaDB, Pinecone, Qdrant, Milvus) index millions of high-dimensional vectors.
• **HNSW (Hierarchical Navigable Small World):** Graph-based approximate nearest neighbor (ANN) search algorithm enabling sub-millisecond retrieval at scale.`
        }
      ],
      keyTerms: ["Dense Embeddings", "Cosine Similarity Formula", "Chunking & Chunk Overlap", "Vector Databases", "HNSW Index Search"],
      keyTakeaways: [
        "Cosine similarity measures the angle between dense vector embeddings in high-dimensional space.",
        "HNSW graphs enable approximate nearest neighbor search across millions of vectors in milliseconds."
      ],
      selfTest: {
        q: "What is the primary advantage of HNSW indexing in vector databases?",
        a: "It enables sub-millisecond Approximate Nearest Neighbor (ANN) vector search at scale."
      }
    },

    {
      id: "topic44",
      number: 44,
      track: "track6",
      title: "Retrieval-Augmented Generation (RAG)",
      subtitle: "2-phase architecture (Indexing & Retrieval), context grounding, CAG, RAG variants, and evaluation.",
      readTime: "9 min read",
      summary: "Build RAG architectures, ground LLMs in private documents, eliminate hallucinations, and inspect variants.",
      sections: [
        {
          heading: "1. Why RAG? & Two-Phase Architecture",
          content: `• **Problems Solved:** Overcomes LLM knowledge cutoffs and grants access to private enterprise documents without model retraining.
• **Phase 1: Ingestion / Indexing (Offline)**
$$\\text{Documents} \\to \\text{Chunking} \\to \\text{Embedding Model} \\to \\text{Vector DB (ChromaDB)}$$
• **Phase 2: Retrieval & Generation (Online / Query Time)**
$$\\text{Query} \\to \\text{Query Vector} \\to \\text{ANN Similarity Search} \\to \\text{Top-}K \\text{ Chunks} \\to \\text{Prompt Context} \\to \\text{LLM} \\to \\text{Answer}$$`
        },
        {
          heading: "2. Advanced RAG Variants & CAG",
          content: `• **Agentic RAG:** Agents dynamically rewrite queries, decide when retrieval is necessary, and grade retrieved chunks.
• **Graph RAG:** Connects knowledge entities via knowledge graphs.
• **Cache-Augmented Generation (CAG):** Caches frequent query-response pairs or pre-loads context into extended LLM windows to avoid repetitive retrieval.`
        },
        {
          heading: "3. RAG Evaluation Metrics",
          content: `• **Context Relevance:** Are the retrieved top-$k$ chunks relevant to the user query?
• **Groundedness / Faithfulness:** Is the LLM answer strictly derived from retrieved context without hallucination?
• **Answer Relevance:** Does the answer directly address the user's question?`
        }
      ],
      keyTerms: ["RAG Architecture", "Two-Phase Indexing & Retrieval", "Top-K Chunks", "Context Grounding", "Agentic RAG", "Cache-Augmented Generation (CAG)", "Faithfulness & Relevance"],
      keyTakeaways: [
        "RAG injects retrieved private chunks into the LLM prompt window at inference time.",
        "Faithfulness measures whether the generated response is strictly supported by retrieved context."
      ],
      selfTest: {
        q: "What are the two core phases of a RAG pipeline?",
        a: "1. Indexing Phase (chunking & storing embeddings in Vector DB) and 2. Retrieval & Generation Phase (query embedding, top-k search, and LLM prompting)."
      }
    },

    {
      id: "topic45",
      number: 45,
      track: "track6",
      title: "Productionizing LLM Applications with FastAPI",
      subtitle: "FastAPI endpoints, Uvicorn ASGI server, Pydantic validation models, Docker packaging, and Streamlit UI.",
      readTime: "8 min read",
      summary: "Wrap RAG pipelines into async FastAPI microservices, validate payloads with Pydantic, and build Docker containers.",
      sections: [
        {
          heading: "1. Why FastAPI & Uvicorn",
          content: `• **FastAPI:** Modern, high-performance Python framework for building async REST APIs with automatic OpenAPI/Swagger documentation (\`/docs\`).
• **Uvicorn:** ASGI (Asynchronous Server Gateway Interface) server that runs FastAPI applications.`
        },
        {
          heading: "2. Pydantic Request & Response Schemas",
          content: `\`\`\`python
from fastapi import FastAPI
from pydantic import BaseModel, Field

app = FastAPI(title="RAG Service")

class QueryRequest(BaseModel):
    query: str = Field(..., min_length=3, example="What is leave policy?")
    top_k: int = Field(default=3, ge=1, le=10)

class QueryResponse(BaseModel):
    answer: str
    sources: list[str]
    latency_ms: float

@app.post("/api/chat", response_model=QueryResponse)
async def chat_endpoint(payload: QueryRequest):
    # RAG pipeline logic
    return QueryResponse(answer="...", sources=["hr.pdf"], latency_ms=142.5)
\`\`\``
        },
        {
          heading: "3. Docker Containerization Pattern",
          content: `\`\`\`dockerfile
FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
\`\`\``
        }
      ],
      keyTerms: ["FastAPI", "Uvicorn ASGI", "Pydantic Models", "OpenAPI / Swagger (/docs)", "Dockerfile Containerization"],
      keyTakeaways: [
        "FastAPI leverages Pydantic for automatic request validation, type serialization, and schema documentation.",
        "Docker packages Python runtimes, dependencies, and code into reproducible production containers."
      ],
      selfTest: {
        q: "What role does Pydantic serve when used inside a FastAPI application?",
        a: "It defines and validates request/response data schemas, enforcing data types and raising clear validation errors on invalid payloads."
      }
    },

    {
      id: "topic46",
      number: 46,
      track: "track6",
      title: "Advanced Orchestration: LangGraph and Multi-Agent Systems",
      subtitle: "State Graphs, Nodes, Edges, Conditional routing, TypedDict state, and LangSmith observability.",
      readTime: "9 min read",
      summary: "Design stateful multi-agent workflows with LangGraph, route conditional edges, and debug with LangSmith.",
      sections: [
        {
          heading: "1. State Graphs vs Flat While-Loops",
          content: `• Unconstrained while-loops in multi-step agents are fragile and prone to infinite loops.
• **LangGraph** models agentic workflows as explicit cyclical state graphs:
  - **State Graph:** The complete workflow structure.
  - **Nodes:** Python functions representing tasks/agents.
  - **Edges:** Unconditional or conditional transitions routing between nodes.
  - **State:** Shared data object passing between nodes.`
        },
        {
          heading: "2. LangGraph TypedDict & Conditional Routing",
          content: `\`\`\`python
from typing import TypedDict
from langgraph.graph import StateGraph, END

class AgentState(TypedDict):
    query: str
    intent: str
    answer: str

def classifier_node(state: AgentState) -> AgentState:
    # Classify intent to 'billing', 'hr', or 'general'
    state['intent'] = "billing" if "invoice" in state['query'] else "general"
    return state

workflow = StateGraph(AgentState)
workflow.add_node("classify", classifier_node)
workflow.add_node("billing_agent", billing_handler)
workflow.add_node("general_agent", general_handler)

workflow.add_conditional_edges("classify", lambda s: s['intent'], {
    "billing": "billing_agent",
    "general": "general_agent"
})
\`\`\``
        },
        {
          heading: "3. Multi-Agent Orchestration & Observability",
          content: `• Specialized worker agents collaborate with distinct tools, supervised by a master router.
• **Observability:** **LangSmith** traces token spend, step latencies, tool execution payloads, and state mutations across every node.`
        }
      ],
      keyTerms: ["State Graph", "Nodes & Edges", "Conditional Routing", "TypedDict State", "Multi-Agent Systems", "LangSmith Observability", "MCPs (Model Context Protocols)"],
      keyTakeaways: [
        "LangGraph represents multi-agent execution as stateful graphs with deterministic conditional routing.",
        "TypedDict provides static type safety for state dictionaries across workflow nodes."
      ],
      selfTest: {
        q: "In LangGraph, what is the role of State?",
        a: "A shared data object (typed dictionary) that flows through every node and records incremental updates."
      }
    }
  ],

  // COMPREHENSIVE FORMULA MATRIX FOR INSTANT REVISION
  formulas: [
    {
      id: "f_precision",
      name: "Precision",
      topic: "Topic 33: Classification Evaluation",
      formula: "\\text{Precision} = \\frac{TP}{TP + FP}",
      plain: "Precision = TP / (TP + FP)",
      desc: "Exactness: Of all predicted positives, what fraction was actually positive? Crucial for Spam Filtering.",
      tags: ["Classification", "Metrics", "Evaluation"]
    },
    {
      id: "f_recall",
      name: "Recall (Sensitivity / TPR)",
      topic: "Topic 33: Classification Evaluation",
      formula: "\\text{Recall} = \\frac{TP}{TP + FN}",
      plain: "Recall = TP / (TP + FN)",
      desc: "Completeness: Of all actual positives, what fraction did the model catch? Crucial for Medical Screening.",
      tags: ["Classification", "Metrics", "Evaluation"]
    },
    {
      id: "f_f1",
      name: "F1-Score",
      topic: "Topic 33: Classification Evaluation",
      formula: "\\text{F1} = 2 \\times \\frac{\\text{Precision} \\times \\text{Recall}}{\\text{Precision} + \\text{Recall}}",
      plain: "F1 = 2 * (Precision * Recall) / (Precision + Recall)",
      desc: "Harmonic mean balancing Precision and Recall, sensitive to imbalances between the two.",
      tags: ["Classification", "Metrics", "Evaluation"]
    },
    {
      id: "f_accuracy",
      name: "Accuracy",
      topic: "Topic 33: Classification Evaluation",
      formula: "\\text{Accuracy} = \\frac{TP + TN}{TP + TN + FP + FN}",
      plain: "Accuracy = (TP + TN) / (TP + TN + FP + FN)",
      desc: "Overall fraction of correct predictions. Misleading on imbalanced datasets (Accuracy Paradox).",
      tags: ["Classification", "Metrics"]
    },
    {
      id: "f_cossim",
      name: "Cosine Similarity",
      topic: "Topic 43: Embeddings & Semantic Search",
      formula: "\\text{CosSim}(\\vec{u}, \\vec{v}) = \\frac{\\vec{u} \\cdot \\vec{v}}{\\|\\vec{u}\\| \\|\\vec{v}\\|} = \\frac{\\sum u_i v_i}{\\sqrt{\\sum u_i^2} \\sqrt{\\sum v_i^2}}",
      plain: "CosSim(u, v) = (u · v) / (||u|| * ||v||)",
      desc: "Measures cosine of angle between two dense embedding vectors. Range [-1, 1], typically [0, 1] for text.",
      tags: ["GenAI", "Embeddings", "RAG"]
    },
    {
      id: "f_sigmoid",
      name: "Sigmoid Activation Function",
      topic: "Topic 32: Logistic Regression",
      formula: "\\sigma(z) = \\frac{1}{1 + e^{-z}}",
      plain: "σ(z) = 1 / (1 + exp(-z))",
      desc: "Squashes any real continuous number z into an interpretable probability bounded strictly in (0, 1).",
      tags: ["Classification", "Logistic Regression"]
    },
    {
      id: "f_logloss",
      name: "Binary Cross-Entropy Loss (Log Loss)",
      topic: "Topic 32: Logistic Regression",
      formula: "\\text{Loss} = -\\left[ y \\log(p) + (1-y) \\log(1-p) \\right]",
      plain: "Loss = -[y * log(p) + (1 - y) * log(1 - p)]",
      desc: "Loss function for binary classification, penalizing confident but wrong probability predictions heavily.",
      tags: ["Classification", "Loss Functions"]
    },
    {
      id: "f_mae",
      name: "Mean Absolute Error (MAE)",
      topic: "Topic 30: Regression Evaluation Metrics",
      formula: "\\text{MAE} = \\frac{1}{n} \\sum_{i=1}^n |y_i - \\hat{y}_i|",
      plain: "MAE = (1/n) * Σ |y - ŷ|",
      desc: "Average magnitude of absolute errors in original target units. Linear penalty, robust to outliers.",
      tags: ["Regression", "Metrics"]
    },
    {
      id: "f_mse",
      name: "Mean Squared Error (MSE)",
      topic: "Topic 30: Regression Evaluation Metrics",
      formula: "\\text{MSE} = \\frac{1}{n} \\sum_{i=1}^n (y_i - \\hat{y}_i)^2",
      plain: "MSE = (1/n) * Σ (y - ŷ)²",
      desc: "Average squared error. Heavily penalizes large outliers due to squaring.",
      tags: ["Regression", "Metrics"]
    },
    {
      id: "f_rmse",
      name: "Root Mean Squared Error (RMSE)",
      topic: "Topic 30: Regression Evaluation Metrics",
      formula: "\\text{RMSE} = \\sqrt{\\frac{1}{n} \\sum_{i=1}^n (y_i - \\hat{y}_i)^2}",
      plain: "RMSE = √(MSE)",
      desc: "Square root of MSE, returning error scale back to original target units while retaining outlier sensitivity.",
      tags: ["Regression", "Metrics"]
    },
    {
      id: "f_r2",
      name: "R-Squared (Coefficient of Determination)",
      topic: "Topic 30: Regression Evaluation Metrics",
      formula: "R^2 = 1 - \\frac{\\sum (y_i - \\hat{y}_i)^2}{\\sum (y_i - \\bar{y})^2}",
      plain: "R² = 1 - (SSE / SST)",
      desc: "Proportion of target variance explained by the model compared to predicting the baseline mean.",
      tags: ["Regression", "Metrics"]
    },
    {
      id: "f_iqr",
      name: "Interquartile Range & Outlier Cutoffs",
      topic: "Topic 21: Advanced Visualization",
      formula: "\\text{IQR} = Q_3 - Q_1, \\quad [Q_1 - 1.5 \\times \\text{IQR}, \\; Q_3 + 1.5 \\times \\text{IQR}]",
      plain: "IQR = Q3 - Q1 | Outlier range: [Q1 - 1.5*IQR, Q3 + 1.5*IQR]",
      desc: "Standard statistical outlier detection boundary for box plots and EDA.",
      tags: ["Statistics", "EDA", "Preprocessing"]
    },
    {
      id: "f_zscore",
      name: "Z-Score Standardization",
      topic: "Topic 28: Descriptive Statistics",
      formula: "z = \\frac{x - \\mu}{\\sigma}",
      plain: "z = (x - μ) / σ",
      desc: "Rescales feature values to have zero mean (μ=0) and unit variance (σ=1).",
      tags: ["Statistics", "Preprocessing", "NumPy"]
    },
    {
      id: "f_minmax",
      name: "Min-Max Feature Normalization",
      topic: "Topic 28: Descriptive Statistics",
      formula: "x_{\\text{scaled}} = \\frac{x - x_{\\min}}{x_{\\max} - x_{\\min}}",
      plain: "x_scaled = (x - min) / (max - min)",
      desc: "Rescales all feature values into a bounded range [0, 1].",
      tags: ["Statistics", "Preprocessing"]
    },
    {
      id: "f_entropy",
      name: "Entropy (Information Theory)",
      topic: "Topic 35: Decision Trees",
      formula: "\\text{Entropy}(S) = -\\sum_{i=1}^c p_i \\log_2(p_i)",
      plain: "Entropy = -Σ p_i * log2(p_i)",
      desc: "Measures impurity/disorder in a node. 0 = pure node; 1 = equal split in binary classification.",
      tags: ["Decision Trees", "Machine Learning"]
    },
    {
      id: "f_gini",
      name: "Gini Impurity",
      topic: "Topic 35: Decision Trees",
      formula: "\\text{Gini}(S) = 1 - \\sum_{i=1}^c p_i^2",
      plain: "Gini = 1 - Σ (p_i)²",
      desc: "Faster alternative to Entropy for decision tree splits. Maximum is 0.5 for 50/50 binary splits.",
      tags: ["Decision Trees", "Machine Learning"]
    },
    {
      id: "f_infogain",
      name: "Information Gain",
      topic: "Topic 35: Decision Trees",
      formula: "\\text{IG}(S, A) = \\text{Entropy}(S) - \\sum_{v \\in \\text{Values}(A)} \\frac{|S_v|}{|S|} \\text{Entropy}(S_v)",
      plain: "IG = Entropy(parent) - Σ weighted Entropy(children)",
      desc: "Reduction in entropy achieved by partitioning data on attribute A. Highest gain split is selected.",
      tags: ["Decision Trees", "Machine Learning"]
    },
    {
      id: "f_silhouette",
      name: "Silhouette Coefficient",
      topic: "Topic 38: Clustering with K-Means",
      formula: "s = \\frac{b - a}{\\max(a, b)}",
      plain: "s = (b - a) / max(a, b)",
      desc: "Measures clustering quality. a = average intra-cluster distance, b = average nearest-cluster distance. Range [-1, +1].",
      tags: ["Clustering", "Unsupervised Learning"]
    },
    {
      id: "f_attention",
      name: "Scaled Dot-Product Attention",
      topic: "Topic 39: Foundations of LLMs",
      formula: "\\text{Attention}(Q, K, V) = \\text{softmax}\\left( \\frac{Q K^T}{\\sqrt{d_k}} \\right) V",
      plain: "Attention(Q, K, V) = softmax((Q * K^T) / √d_k) * V",
      desc: "The mathematical core of the Transformer architecture, computing token-to-token contextual attention weights.",
      tags: ["Transformers", "GenAI", "LLMs"]
    }
  ],

  // 46+ FLASHCARDS CATEGORIZED ACROSS ALL TRACKS
  flashcards: [
    { id: "f1", track: "track1", front: "What is the core difference between AI, ML, and DL?", back: "AI is the broad field of intelligent machines; ML is algorithms learning patterns from data; DL is multi-layer neural networks for complex representations." },
    { id: "f2", track: "track1", front: "Why are GPUs essential for ML/DL over CPUs?", back: "GPUs have thousands of smaller parallel cores optimized for high-throughput matrix multiplication, whereas CPUs have fewer cores designed for sequential execution." },
    { id: "f3", track: "track1", front: "What is the difference between a Compiler and an Interpreter?", back: "A Compiler translates full code to machine language before execution (faster runtime); an Interpreter translates and executes line-by-line (easier debugging, used in Python)." },
    { id: "f4", track: "track1", front: "What is the single-element tuple trap in Python?", back: "Parentheses alone like (42) evaluate as an integer. A single-element tuple must have a trailing comma: (42,)." },
    { id: "f5", track: "track1", front: "Why does {} create a dictionary and not a set?", back: "{} is reserved for an empty dict. You must use set() to initialize an empty set in Python." },
    { id: "f6", track: "track1", front: "What is the difference between list.append() and list.extend()?", back: "append(x) adds x as a single element (can nest a list); extend(iter) unpacks and appends each item of the iterable in-place." },
    { id: "f7", track: "track1", front: "What does dict.get(key, default) accomplish?", back: "Safely looks up key in dictionary and returns default fallback without throwing a KeyError if the key is missing." },
    { id: "f8", track: "track1", front: "Why use 'with open(filename)' for file handling?", back: "It acts as a context manager that automatically closes the file stream even if exceptions or runtime errors occur." },
    { id: "f9", track: "track2", front: "What is the single biggest behavioral difference between list + list and array + array in NumPy?", back: "List + concatenates the lists; NumPy array + performs element-wise mathematical addition." },
    { id: "f10", track: "track2", front: "What is Broadcasting in NumPy?", back: "A mechanism that allows arithmetic operations between arrays of different shapes by virtually stretching dimensions of size 1 to match the larger array." },
    { id: "f11", track: "track2", front: "What is the difference between .iloc and .loc in Pandas?", back: ".loc is label-based with inclusive slice boundaries; .iloc is integer position-based (0-indexed) with exclusive slice boundaries." },
    { id: "f12", track: "track2", front: "What is the difference between json.dumps() and json.loads()?", back: "json.dumps() serializes a Python dict into a JSON string; json.loads() parses a JSON string into a Python dict." },
    { id: "f13", track: "track2", front: "What are the four SQL Join types?", back: "INNER (matches only), LEFT (all left + matched right), RIGHT (all right + matched left), and FULL OUTER (all rows from both with NULLs)." },
    { id: "f14", track: "track2", front: "What is Database Normalization (3NF)?", back: "Decomposing tables to remove redundancy, ensure atomic cells, and eliminate partial and transitive dependencies." },
    { id: "f15", track: "track3", front: "What are the 3 layers of Matplotlib architecture?", back: "1. Backend (rendering), 2. Artist (shapes/text/axes), 3. Scripting (pyplot - user-facing)." },
    { id: "f16", track: "track3", front: "What is the 1.5 x IQR outlier rule?", back: "IQR = Q3 - Q1. Any data point below Q1 - 1.5*IQR or above Q3 + 1.5*IQR is flagged as a candidate outlier." },
    { id: "f17", track: "track3", front: "What does a Pearson correlation coefficient of 0 mean?", back: "Zero linear relationship. (Note: Non-linear relationships like y = x² may still exist)." },
    { id: "f18", track: "track3", front: "What do HTTP status codes 2xx, 4xx, and 5xx represent?", back: "2xx = Success (200 OK), 4xx = Client Error (401 Auth, 404 Not Found, 429 Rate Limit), 5xx = Server Error (500 Internal Error)." },
    { id: "f19", track: "track3", front: "Why use response.content instead of response.text in web scraping?", back: "response.content returns raw bytes, preventing text encoding corruption on currency symbols ($ / ₹ / £)." },
    { id: "f20", track: "track4", front: "What is the difference between Supervised and Unsupervised Learning?", back: "Supervised learns from labeled input-output pairs (X, y); Unsupervised discovers patterns in unlabeled data (X only)." },
    { id: "f21", track: "track4", front: "What is Data Leakage in ML pipelines?", back: "When information from the test set (or future data) contaminates training (e.g., fitting scalers before train_test_split)." },
    { id: "f22", track: "track4", front: "What is the missing data rule (<5%, 5-30%, >30%)?", back: "<5% missing: Drop rows; 5-30%: Impute (median/mean/mode); >30%: Consider dropping the entire feature column." },
    { id: "f23", track: "track4", front: "What is the Empirical 3-Sigma Rule (68-95-99.7)?", back: "In a normal distribution: 68.27% of data falls within ±1σ, 95.45% within ±2σ, and 99.73% within ±3σ of the mean." },
    { id: "f24", track: "track4", front: "Why don't Tree-based models need feature scaling?", back: "Trees split data based on single-feature threshold cutoffs (X_i > t) rather than calculating geometric distances." },
    { id: "f25", track: "track5", front: "What is the equation for Linear Regression?", back: "y = m*x + c (single variable) or y = w1*x1 + w2*x2 + ... + b (multivariate), fitted by minimizing Sum of Squared Errors." },
    { id: "f26", track: "track5", front: "What is the formula and difference between MAE and RMSE?", back: "MAE = (1/n)Σ|y - ŷ| (linear penalty). RMSE = √((1/n)Σ(y - ŷ)²) (penalizes large outlier errors more heavily)." },
    { id: "f27", track: "track5", front: "Ridge (L2) vs Lasso (L1) Regularization", back: "Ridge (L2) adds sum of squared weights penalty; Lasso (L1) adds sum of absolute weights penalty and can shrink weights to exact zero." },
    { id: "f28", track: "track5", front: "What is the Sigmoid function and its range?", back: "σ(z) = 1 / (1 + e^(-z)). Squashes any real number into the probability interval (0, 1)." },
    { id: "f29", track: "track5", front: "Formula for Precision, Recall, and F1-score", back: "Precision = TP/(TP+FP), Recall = TP/(TP+FN), F1 = 2*(Prec*Recall)/(Prec+Recall)." },
    { id: "f30", track: "track5", front: "What is the Accuracy Paradox?", back: "On 99% imbalanced data, a dummy model predicting 0 for all rows achieves 99% accuracy but 0% recall on the positive class." },
    { id: "f31", track: "track5", front: "What is SMOTE and how does it prevent leakage?", back: "Synthetic Minority Oversampling Technique creates synthetic points between nearest neighbors. Must be fit strictly on training folds." },
    { id: "f32", track: "track5", front: "What is Gini Impurity vs Entropy in Decision Trees?", back: "Both measure node impurity. Gini = 1 - Σ(p_i)² (faster, max 0.5 binary); Entropy = -Σ p_i log2(p_i) (info theory, max 1.0 binary)." },
    { id: "f33", track: "track5", front: "What is Bagging in Random Forests?", back: "Bootstrap Aggregating: Training multiple trees in parallel on random row bootstrap samples and random feature subsets." },
    { id: "f34", track: "track5", front: "What does AUC-ROC measure?", back: "Area Under ROC curve. Measures classification discriminative ability across all thresholds (1.0 = perfect, 0.5 = random guess)." },
    { id: "f35", track: "track5", front: "How does the Silhouette Score evaluate K-Means clusters?", back: "s = (b - a) / max(a, b). a = intra-cluster cohesion, b = nearest-cluster separation. Scores close to +1 indicate good clustering." },
    { id: "f36", track: "track6", front: "What is next-token prediction in LLMs?", back: "Autoregressive generation where the model computes a probability distribution P(t_k+1 | t_1...t_k) over the vocabulary." },
    { id: "f37", track: "track6", front: "What is the Role-Context-Task-Format-Length (RCTFL) prompt skeleton?", back: "A structured prompt framework defining Role (persona), Context (background), Task (action), Format (schema/JSON), and Length/rules." },
    { id: "f38", track: "track6", front: "What is the ReAct pattern for AI Agents?", back: "Reason + Act loop: The LLM generates a Thought (Reasoning), invokes a Tool (Action), receives output (Observation), and iterates." },
    { id: "f39", track: "track6", front: "Why use temperature=0 for structured extraction tasks?", back: "Temperature=0 makes sampling near-deterministic, ensuring consistent adherence to JSON schemas without creative hallucinations." },
    { id: "f40", track: "track6", front: "What is Cosine Similarity in Embeddings?", back: "CosSim(u, v) = (u · v) / (||u|| ||v||). Measures the directional angle between dense vector embeddings in high-dimensional space." },
    { id: "f41", track: "track6", front: "What is RAG (Retrieval-Augmented Generation)?", back: "A system that retrieves relevant private document chunks at query time and passes them inside prompt context to ground LLM answers." },
    { id: "f42", track: "track6", front: "What are the two phases of RAG?", back: "1. Ingestion/Indexing (chunking, embedding, vector DB storage) and 2. Retrieval & Generation (query vector, similarity search, LLM prompt)." },
    { id: "f43", track: "track6", front: "Why use FastAPI with Pydantic for LLM serving?", back: "FastAPI provides async ASGI performance and automatic Swagger docs; Pydantic validates request/response payload schemas." },
    { id: "f44", track: "track6", front: "What is LangGraph and how does it differ from a while loop?", back: "LangGraph models agent workflows as explicit state graphs with typed state, deterministic nodes, and conditional edges." },
    { id: "f45", track: "track6", front: "What is Idempotency in agent tool design?", back: "Calling a tool multiple times with the same inputs produces the identical state without unintended duplicate side effects (e.g. double charging)." },
    { id: "f46", track: "track6", front: "What is HNSW in Vector Databases?", back: "Hierarchical Navigable Small World graphs — an approximate nearest neighbor (ANN) search index enabling fast vector retrieval." }
  ],

  // COMPREHENSIVE QUIZ & EXAM BANK
  quizzes: [
    {
      id: "q_tree_split",
      track: "track5",
      question: "Which impurity metric is faster to compute and defaults in scikit-learn Decision Trees?",
      options: [
        "Shannon Entropy (-Σ p_i log2(p_i))",
        "Gini Impurity (1 - Σ (p_i)²)",
        "Mean Squared Logarithmic Error",
        "Kullback-Leibler Divergence"
      ],
      correctIndex: 1,
      explanation: "Gini Impurity avoids expensive logarithmic computations and is the default split criterion in scikit-learn's DecisionTreeClassifier.",
      xp: 50
    },
    {
      id: "q_data_leak",
      track: "track4",
      question: "Why does fitting a StandardScaler() on the entire dataset prior to train_test_split() cause Data Leakage?",
      options: [
        "It speeds up model execution abnormally.",
        "It causes mean and standard deviation statistics from the test set to contaminate training, producing unrealistically optimistic evaluations.",
        "It converts numerical data into categorical strings.",
        "It throws a scikit-learn FitFailedWarning at runtime."
      ],
      correctIndex: 1,
      explanation: "StandardScaler computes mean and variance. If computed over all data before splitting, test distribution statistics leak into training.",
      xp: 50
    },
    {
      id: "q_sigmoid_range",
      track: "track5",
      question: "What is the mathematical output range of the Sigmoid activation function σ(z) = 1 / (1 + e^-z)?",
      options: [
        "[-1, 1]",
        "[0, +∞)",
        "(0, 1)",
        "(-∞, +∞)"
      ],
      correctIndex: 2,
      explanation: "The sigmoid function squashes any real continuous number into the open interval (0, 1), representing valid class probabilities.",
      xp: 50
    },
    {
      id: "q_lasso_vs_ridge",
      track: "track5",
      question: "Which regularization technique can shrink model coefficients all the way to absolute zero, performing automatic feature selection?",
      options: [
        "Ridge Regression (L2 penalty)",
        "Lasso Regression (L1 penalty)",
        "Ordinary Least Squares (OLS)",
        "Polynomial Regression"
      ],
      correctIndex: 1,
      explanation: "Lasso (L1 regularization) uses absolute weights penalty, which has sharp diamond corners that force coefficients to exactly 0.",
      xp: 50
    },
    {
      id: "q_rag_phases",
      track: "track6",
      question: "What are the two core distinct phases of a production RAG (Retrieval-Augmented Generation) system?",
      options: [
        "Pre-training phase and Reinforcement Learning from Human Feedback (RLHF)",
        "Indexing Phase (chunking, embedding, vector DB) and Retrieval & Generation Phase (query vector, top-k search, LLM prompt)",
        "Tokenization Phase and Backpropagation Phase",
        "FastAPI compilation and Docker push"
      ],
      correctIndex: 1,
      explanation: "RAG operates in an offline Indexing phase (preparing documents) and an online Retrieval & Generation phase (retrieving chunks at query time).",
      xp: 50
    },
    {
      id: "q_precision_recall",
      track: "track5",
      question: "In a medical screening application for a fatal disease where missing a sick patient is catastrophic, which metric must be maximized?",
      options: [
        "Precision",
        "Recall (Sensitivity)",
        "Specificity",
        "Adjusted R²"
      ],
      correctIndex: 1,
      explanation: "Recall = TP / (TP + FN). When missing a positive case (False Negative) is dangerous, maximizing Recall minimizes False Negatives.",
      xp: 50
    },
    {
      id: "q_sql_left_join",
      track: "track2",
      question: "In SQL, what is returned when performing a LEFT JOIN between Table A (left) and Table B (right)?",
      options: [
        "Only rows that have identical matching keys in both tables.",
        "All rows from Table A, with matching columns from Table B, filling NULLs where no match exists in Table B.",
        "All rows from Table B and only matching rows from Table A.",
        "A Cartesian product of all rows."
      ],
      correctIndex: 1,
      explanation: "A LEFT JOIN preserves every record from the left table and populates columns with NULL whenever the right table has no match.",
      xp: 50
    },
    {
      id: "q_langgraph_state",
      track: "track6",
      question: "In LangGraph, what data structure is recommended to define typed state flowing across graph nodes?",
      options: [
        "A global variable modified with the 'global' keyword",
        "typing.TypedDict (or Pydantic BaseModel)",
        "An unformatted CSV text buffer",
        "A raw C++ pointer"
      ],
      correctIndex: 1,
      explanation: "TypedDict provides static type verification for state updates across LangGraph nodes without heavy runtime overhead.",
      xp: 50
    },
    {
      id: "q_python_slicing",
      track: "track1",
      question: "What is the output of [10, 20, 30, 40, 50][1:4] in Python?",
      options: [
        "[10, 20, 30, 40]",
        "[20, 30, 40]",
        "[20, 30, 40, 50]",
        "[10, 30, 50]"
      ],
      correctIndex: 1,
      explanation: "Python slicing is start-inclusive (index 1 is 20) and end-exclusive (index 4 is 50, stops before it at index 3, which is 40). Result: [20, 30, 40].",
      xp: 50
    },
    {
      id: "q_broadcasting",
      track: "track2",
      question: "In NumPy, what will be the resulting shape of adding an array of shape (4, 1) to an array of shape (1, 3)?",
      options: [
        "(4, 3)",
        "(1, 1)",
        "BroadcastingError",
        "(12, 1)"
      ],
      correctIndex: 0,
      explanation: "Under NumPy broadcasting rules, dimensions of size 1 stretch to match the other array, resulting in a (4, 3) matrix.",
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
      context: "In your ML classification project, your Random Forest classifier scored 0.96 accuracy during local training, but dropped to 0.58 accuracy when deployed in production behind FastAPI.",
      symptoms: [
        "Training used full dataset preprocessing prior to train_test_split.",
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

  articulationQuestions: [
    {
      id: "art1",
      title: "Q1. Tell me about yourself and your background in AI/ML.",
      category: "Behavioral & Positioning",
      prompt: "Structure your answer using: Role -> Core Capabilities -> Hands-on Portfolio Projects -> Target Role.",
      keywords: ["AI/ML Engineer", "machine learning lifecycle", "RAG", "ChromaDB", "FastAPI", "Docker", "scikit-learn pipeline", "data preprocessing"],
      goldAnswer: `“I'm an AI/ML Engineer with hands-on experience across the machine learning and GenAI lifecycle, from data preprocessing and feature engineering to model training, evaluation, and containerized deployment.

In my portfolio projects, I have developed end-to-end systems where I built leak-free ML pipelines using scikit-learn ColumnTransformers, normalized data into SQLite 3NF schemas, and built RAG support assistants using all-MiniLM-L6-v2 embeddings, ChromaDB vector storage, and LangGraph intent routers exposed via async FastAPI and Docker.

I target AI/ML engineering roles where I can combine machine learning foundations with scalable software engineering and GenAI systems.”`,
      xp: 75
    },
    {
      id: "art2",
      title: "Q2. Walk me through your RAG system architecture and how you built it.",
      category: "GenAI & RAG Deep Dive",
      prompt: "Explain document ingestion -> chunking -> vector embeddings -> similarity search -> context prompt -> LLM generation.",
      keywords: ["embeddings", "all-MiniLM-L6-v2", "ChromaDB", "cosine similarity", "chunking", "context", "grounded answer", "LangGraph"],
      goldAnswer: `“My RAG system ingests private documents, splits them into overlapping chunks, and computes dense vector embeddings using all-MiniLM-L6-v2.

These embeddings are indexed in ChromaDB using HNSW indexing. When a user submits a query, the system generates a query embedding and executes a cosine similarity search to retrieve the top-K relevant chunks.

We pass these retrieved chunks into the prompt context window of the LLM, instructing it to produce a grounded response with source citations. I also implemented a LangGraph intent router to handle queries, and exposed the pipeline through async FastAPI endpoints with Docker packaging.”`,
      xp: 75
    },
    {
      id: "art3",
      title: "Q3. What is Data Leakage and how do you prevent it in ML pipelines?",
      category: "ML Engineering Integrity",
      prompt: "Define leakage, explain its impact on validation scores, and detail how sklearn Pipeline + GridSearchCV prevents it.",
      keywords: ["data leakage", "training-serving skew", "validation score", "scikit-learn pipeline", "GridSearchCV", "fit_transform", "training fold"],
      goldAnswer: `“Data leakage occurs when information from outside the training dataset—such as test sets or future timestamps—accidentally influences the training process. This leads to artificially inflated validation metrics that collapse in production.

To prevent this, I build strict scikit-learn Pipelines where feature scaling (StandardScaler) and imputation are encapsulated alongside the estimator.

During k-fold cross-validation or GridSearchCV hyperparameter tuning, preprocessing parameters are computed exclusively on the training folds for each split, guaranteeing that validation folds remain completely unseen until evaluation.”`,
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
    },
    {
      id: "art5",
      title: "Q5. Explain the Bias-Variance Tradeoff and how Ridge vs Lasso Regularization addresses it.",
      category: "ML Theory & Regularization",
      prompt: "Explain underfitting vs overfitting, L1 vs L2 penalty equations, and feature selection.",
      keywords: ["Bias-Variance tradeoff", "underfitting", "overfitting", "Ridge", "Lasso", "L1", "L2", "feature selection", "alpha"],
      goldAnswer: `“The Bias-Variance tradeoff balances underfitting and overfitting. High bias stems from oversimplified assumptions causing high error on both train and test data. High variance occurs when the model memorizes training noise, resulting in poor generalization on unseen data.

Regularization combats overfitting by adding a penalty term to the loss function. Ridge Regression (L2) adds the sum of squared coefficients (alpha * Σ w²), shrinking weights smoothly toward zero.

Lasso Regression (L1) adds the sum of absolute coefficients (alpha * Σ |w|), which can shrink coefficients all the way to zero, effectively performing automated feature selection.”`,
      xp: 75
    }
  ]
};
