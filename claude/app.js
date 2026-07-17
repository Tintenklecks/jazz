"use strict";

const categories = {
  foundations: { name: "Foundations", icon: "01", color: "#1f6b4d", description: "Clear tasks, context, examples, structure" },
  coding: { name: "Coding work", icon: "</>", color: "#345e8c", description: "Build, debug, review, and verify" },
  autonomy: { name: "Long runs", icon: "∞", color: "#a6532e", description: "Effort, progress, memory, delegation" },
  control: { name: "Control & safety", icon: "!", color: "#886817", description: "Scope, pauses, refusals, guardrails" }
};

const patterns = [
  {
    id: "clear-brief", title: "The clear brief", category: "foundations", task: ["build", "debug", "review", "learn"], level: "starter", scope: "general", risk: "safe",
    purpose: "Turn a vague request into an observable outcome.", when: "Start here for almost every programming request, especially when several interpretations are possible.",
    template: `<task>\n<one concrete action>\n</task>\n<context>\n<facts Claude cannot infer>\n</context>\n<constraints>\n<what must stay true>\n</constraints>\n<done_when>\n<observable acceptance criteria>\n</done_when>`,
    example: `<task>Add keyboard navigation to the command palette.</task>\n<context>Vanilla JavaScript; focus is currently trapped in the search input.</context>\n<constraints>Keep the current visual layout and public API.</constraints>\n<done_when>Arrow keys move the active option, Enter selects it, and Escape closes the palette. Existing tests pass.</done_when>`,
    explanation: "The action, facts, boundaries, and finish line are separated so Claude does not have to infer the assignment.",
    mistakes: ["Listing technology without stating the requested action", "Using subjective success criteria such as “make it better”", "Hiding an important constraint at the end"],
    compatibility: "Applies to all current Claude models and both chat and API use.", related: ["give-context", "output-contract", "verify-finish"], keywords: "objective success acceptance specification requirements"
  },
  {
    id: "give-context", title: "Give the reason", category: "foundations", task: ["build", "debug", "review", "learn"], level: "starter", scope: "general", risk: "safe",
    purpose: "Help Claude generalize from your intent instead of guessing it.", when: "Use when a rule may seem arbitrary or the best implementation depends on who will use the result.",
    template: `I'm working on <larger project> for <audience>. They need <what this enables>. With that in mind: <request>.`,
    example: `I'm building a course project for students using screen readers. They need to complete the navigation exercise without a mouse. With that in mind: audit this menu's keyboard behavior and implement the smallest compliant fix.`,
    explanation: "The motivation makes accessibility and minimal scope part of the decision, not decorative background.",
    mistakes: ["Adding a long biography that does not change the answer", "Assuming Claude knows your course rubric or repository conventions"],
    compatibility: "General guidance; useful across all current Claude models.", related: ["clear-brief", "role-system", "minimal-scope"], keywords: "intent motivation audience why background"
  },
  {
    id: "output-contract", title: "Output contract", category: "foundations", task: ["build", "debug", "review", "learn"], level: "starter", scope: "general", risk: "safe",
    purpose: "Control the response shape without micromanaging the reasoning.", when: "Use for assignments, machine-readable output, code review reports, and answers with a strict length.",
    template: `<output_format>\nReturn: <sections or schema>.\nLength: <limit>.\nInclude: <required evidence>.\nOmit: <unwanted content>.\n</output_format>`,
    example: `<output_format>Return exactly three sections: Finding, Patch, Verification. Put the patch in one diff block. Under Verification, list only checks actually run and their results.</output_format>`,
    explanation: "A positive structure tells Claude what to produce. Requiring actual results prevents a plan from masquerading as completed verification.",
    mistakes: ["Saying only “be concise” when exact sections matter", "Conflicting format rules", "Requesting JSON without defining keys or types"],
    compatibility: "General guidance. For production JSON, validate the response at the system boundary.", related: ["examples", "xml-structure", "progress-evidence"], keywords: "format json schema concise sections length markdown"
  },
  {
    id: "examples", title: "Steer with examples", category: "foundations", task: ["build", "review", "learn"], level: "practical", scope: "general", risk: "safe",
    purpose: "Show the desired format, tone, or classification boundary.", when: "Use when instructions alone produce inconsistent output or when edge cases matter.",
    template: `<examples>\n<example>\n<input><representative input></input>\n<ideal_output><ideal output></ideal_output>\n</example>\n</examples>\n\n<input><new input></input>`,
    example: `<examples>\n<example><input>let total = price + tax</input><ideal_output>Prefer const: the binding is never reassigned.</ideal_output></example>\n<example><input>count++</input><ideal_output>No issue: count is intentionally reassigned.</ideal_output></example>\n</examples>\nReview: <new code>`,
    explanation: "Relevant, diverse examples teach both the desired comment style and an important no-issue boundary.",
    mistakes: ["Examples that contradict the written rule", "Using only happy-path examples", "Letting placeholder text look like literal input"],
    compatibility: "Anthropic recommends several relevant, diverse examples for consistency; keep token cost in mind.", related: ["output-contract", "xml-structure"], keywords: "few shot multishot demonstrations tone classification"
  },
  {
    id: "xml-structure", title: "Structure with XML tags", category: "foundations", task: ["build", "debug", "review", "learn", "agent"], level: "practical", scope: "general", risk: "safe",
    purpose: "Separate instructions, context, examples, and variable input.", when: "Use for long or mixed prompts. Tags are most useful when content types could be confused.",
    template: `<instructions>...</instructions>\n<context>...</context>\n<examples>...</examples>\n<input>...</input>`,
    example: `<documents>\n  <document index="1">\n    <source>auth.js</source>\n    <document_content>...</document_content>\n  </document>\n</documents>\n<task>Trace the failing login path using only the provided files.</task>`,
    explanation: "Descriptive, consistently nested tags establish boundaries. There is no fixed required tag vocabulary.",
    mistakes: ["Using mismatched closing tags", "Wrapping every sentence in a tag", "Treating XML tags as an automatic substitute for clear instructions"],
    compatibility: "General Claude prompting convention, not an API syntax requirement.", related: ["long-context", "examples", "clear-brief"], keywords: "tags structure documents input instructions nesting"
  },
  {
    id: "role-system", title: "Use a focused role", category: "foundations", task: ["build", "debug", "review", "learn"], level: "starter", scope: "general", risk: "safe",
    purpose: "Set stable expertise and tone without asking for a persona performance.", when: "Put a short, reusable role in the API system prompt or at the start of a chat.",
    template: `You are a <discipline> assistant specializing in <technology or audience>. Prioritize <quality>.`,
    example: `You are a teaching assistant specializing in introductory Python. Explain the first incorrect assumption before showing a minimal correction.`,
    explanation: "The role narrows domain and teaching behavior. The task still belongs in the user message.",
    mistakes: ["Using a celebrity persona instead of relevant expertise", "Putting changing user data in a reusable system prompt", "Assuming a role overrides missing context"],
    compatibility: "All current Claude models; the Messages API has a top-level system parameter rather than a system role message.", related: ["give-context", "output-contract"], keywords: "persona system prompt expertise teacher"
  },
  {
    id: "build-feature", title: "Build a focused feature", category: "coding", task: ["build"], level: "starter", scope: "general", risk: "safe",
    purpose: "Move from requirement to implementation and proof without scope creep.", when: "Use for a contained feature or course assignment in an existing repository.",
    template: `Implement <feature> in <project>.\n\nRequirements:\n- <behavior 1>\n- <behavior 2>\n\nConstraints:\n- Preserve <interface or behavior>.\n- Do not <out-of-scope work>.\n\nInspect the relevant code, implement the smallest complete change, and run <checks>. In the final response, summarize changed behavior and report the checks actually run.`,
    example: `Implement a “copy link” action in the article toolbar. Preserve the toolbar layout and existing analytics event names. Do not add dependencies. Inspect the relevant code, implement the smallest complete change, and run the toolbar tests plus the formatter.`,
    explanation: "It authorizes action, defines scope, and asks for verification. The model can discover details instead of inventing file paths.",
    mistakes: ["Asking “can you suggest…” when you want implementation", "Naming tests that do not exist without allowing discovery", "Requesting extra cleanup “while you are there”"],
    compatibility: "General current-model pattern. Tool access and permissions depend on the coding environment.", related: ["minimal-scope", "verify-finish", "clear-brief"], keywords: "implement feature code edit repository"
  },
  {
    id: "debug-evidence", title: "Debug from evidence", category: "coding", task: ["debug"], level: "practical", scope: "general", risk: "caution",
    purpose: "Diagnose the actual failure before changing state.", when: "Use with a reproducible error, failing test, stack trace, or unexpected behavior.",
    template: `<symptom><exact error and observed behavior></symptom>\n<reproduction><minimal steps></reproduction>\n<expected><expected behavior></expected>\n<context><versions, recent changes, relevant files></context>\n\nDiagnose the root cause from evidence. Before editing, state the evidence that supports the proposed cause. Implement the smallest fix and rerun the narrow reproduction plus relevant regression checks.`,
    example: `<symptom>Safari throws “QuotaExceededError” when saving an empty preference object.</symptom>\n<reproduction>Private window → Settings → Save defaults.</reproduction>\n<expected>Settings save or show a storage-unavailable message.</expected>\n<context>Safari 18; localStorage wrapper in storage.js.</context>`,
    explanation: "Symptom, reproduction, expectation, and environment prevent a familiar-looking error from triggering an unrelated stock fix.",
    mistakes: ["Pasting only the final stack-trace line", "Authorizing restarts or config edits before the cause is supported", "Changing tests to match broken behavior"],
    compatibility: "General pattern. Versions and platform behavior must be verified against their own documentation.", related: ["progress-evidence", "verify-finish", "boundaries"], keywords: "bug error stack trace reproduce root cause diagnosis"
  },
  {
    id: "review-risk", title: "Review by risk", category: "coding", task: ["review"], level: "practical", scope: "general", risk: "safe",
    purpose: "Find consequential defects instead of producing a style inventory.", when: "Use before submitting an assignment, merging a change, or auditing an unfamiliar diff.",
    template: `Review <scope> for correctness defects, regressions, security boundaries, accessibility failures, and missing tests. Prioritize findings that can change behavior. For each finding include: severity, file/line, failure scenario, and a concrete fix. Do not report style preferences unless they hide a defect. If no actionable findings remain, say so.`,
    example: `Review the staged diff. Trace changed call sites and relevant tests. Prioritize user-visible regressions and data-loss risks. For each finding, explain the concrete input or state that triggers it.`,
    explanation: "Risk categories and required evidence reduce vague comments. Explicitly allowing “no findings” discourages filler.",
    mistakes: ["Requesting “a thorough review” without scope", "Treating speculative concerns as confirmed bugs", "Ignoring repository history or callers when they are available"],
    compatibility: "General pattern. Cybersecurity content may trigger Fable 5 safety classifiers; benign requests can still be declined.", related: ["progress-evidence", "boundaries", "refusal-handling"], keywords: "code review diff finding severity regression audit"
  },
  {
    id: "verify-finish", title: "Define verification", category: "coding", task: ["build", "debug", "review", "agent"], level: "starter", scope: "general", risk: "safe",
    purpose: "Make completion testable and status claims honest.", when: "Add to any prompt that authorizes edits or claims a result is complete.",
    template: `Before finishing, verify the result against: <acceptance criteria>. Run the narrowest relevant checks first, then <broader check> if warranted. Do not edit or remove tests merely to make them pass. Report each command or check with its actual result; identify anything not run.`,
    example: `Before finishing, verify keyboard-only use, the existing unit suite, and a 375 px viewport. Report pass/fail for each. If browser testing is unavailable, mark it not run rather than claiming it works.`,
    explanation: "The prompt specifies what evidence counts and what to do when a check is unavailable.",
    mistakes: ["Saying “test thoroughly” without criteria", "Claiming success from code inspection alone", "Hiding skipped checks behind a generic success statement"],
    compatibility: "General practice. The environment must actually expose the requested tools.", related: ["progress-evidence", "build-feature", "debug-evidence"], keywords: "test check validate acceptance done pass fail"
  },
  {
    id: "minimal-scope", title: "Keep changes minimal", category: "coding", task: ["build", "debug", "agent"], level: "practical", scope: "fable", risk: "safe",
    purpose: "Prevent high-effort work from expanding into cleanup or abstractions you did not request.", when: "Use for routine fixes, one-shot operations, and mature repositories where unrelated churn is costly.",
    template: `Make only changes required for <task>. Do not add features, refactor surrounding code, or introduce abstractions for hypothetical future needs. Prefer the simplest complete solution. Validate at user-input and external-system boundaries; trust established internal invariants.`,
    example: `Fix the null state in the profile header. Do not redesign the profile model, rename nearby types, or add a general-purpose formatting layer. Preserve all public interfaces.`,
    explanation: "Clear exclusions keep Fable 5's stronger planning and verification focused on the actual deliverable.",
    mistakes: ["Forbidding changes that are actually necessary for correctness", "Using “minimal” to justify skipping tests", "Adding broad backward-compatibility shims by default"],
    compatibility: "Especially useful for Fable 5 at high effort; broadly useful for agentic coding.", related: ["build-feature", "effort-control", "boundaries"], keywords: "scope creep overengineering refactor abstraction simple"
  },
  {
    id: "long-context", title: "Place long context well", category: "autonomy", task: ["debug", "review", "learn", "agent"], level: "advanced", scope: "general", risk: "safe",
    purpose: "Help Claude find the relevant signal in large documents or many files.", when: "Use for roughly 20k+ tokens, multiple documents, transcripts, or large source bundles.",
    template: `<documents>\n  <document index="1"><source><name></source><document_content>...</document_content></document>\n</documents>\n\n<instructions>First identify evidence relevant to <question>. Then complete <task>, citing the source name for each important claim.</instructions>`,
    example: `<documents>...large logs and source files...</documents>\n<instructions>Extract the log lines that constrain the failure first. Then form and test the most likely diagnosis. Do not rely on facts outside these documents.</instructions>`,
    explanation: "Place bulk material before the query. Asking for grounding evidence first helps the model attend to the right passages.",
    mistakes: ["Putting the key question before a very long data dump", "Combining documents without source labels", "Requesting quotes when paraphrased evidence would suffice"],
    compatibility: "General current-model guidance; context limits depend on the selected model and API configuration.", related: ["xml-structure", "progress-evidence"], keywords: "documents tokens large context quote source logs"
  },
  {
    id: "effort-control", title: "Choose effort deliberately", category: "autonomy", task: ["build", "debug", "review", "learn", "agent"], level: "practical", scope: "fable", risk: "safe",
    purpose: "Trade capability and thoroughness for latency and token use.", when: "Choose low or medium for routine interaction, high for most tasks, and xhigh for the hardest capability-sensitive work.",
    template: `API setting: effort: "<low|medium|high|xhigh>"\nPrompt steering: <brief instruction that matches the desired depth>`,
    example: `Routine formatter explanation → medium.\nRepository-wide concurrency bug with verification → high.\nHardest long-horizon migration where quality dominates latency → xhigh.`,
    explanation: "Effort is an API parameter, not a magic phrase. Fable 5 uses adaptive thinking only and calibrates work from effort plus task complexity.",
    mistakes: ["Using xhigh for every quick question", "Treating effort as an exact completion-time guarantee", "Using deprecated manual thinking budgets with Fable 5"],
    compatibility: "Fable 5 supports low, medium, high, and xhigh according to its model-specific guide. Check the Effort page for other models.", related: ["minimal-scope", "long-run", "early-stop"], keywords: "low medium high xhigh latency cost intelligence thinking"
  },
  {
    id: "long-run", title: "Frame a long autonomous run", category: "autonomy", task: ["agent"], level: "advanced", scope: "fable", risk: "caution",
    purpose: "Let Claude continue end to end while preserving real checkpoints.", when: "Use for multi-stage coding, research, or migration work that may take minutes or hours.",
    template: `Complete <objective> end to end. When you have enough information to act, act. Maintain a short progress record tied to actual tool results. Continue through reversible in-scope work. Pause only for a destructive or irreversible action, a genuine scope change, or input only I can provide. Before ending, verify <criteria> and report what actually happened.`,
    example: `Migrate the package to the new parser API end to end. Discover affected callers, update them incrementally, and run tests after each coherent slice. Pause only if the public API must change or a destructive migration is required.`,
    explanation: "The prompt combines autonomy, evidence, checkpoints, and a finish condition without prescribing every internal step.",
    mistakes: ["Saying “never ask questions” even when user-only input is required", "Blocking a client request while a run may take hours", "Allowing shared-system changes without confirmation"],
    compatibility: "Fable 5-specific tuning. Clients should support streaming, longer timeouts, or asynchronous status checks.", related: ["progress-evidence", "boundaries", "memory-notes", "early-stop"], keywords: "autonomous hours long horizon continue checkpoint"
  },
  {
    id: "progress-evidence", title: "Ground progress claims", category: "autonomy", task: ["build", "debug", "review", "agent"], level: "practical", scope: "fable", risk: "safe",
    purpose: "Stop plans or assumptions from being reported as completed work.", when: "Use in long runs, CI repair, migrations, or any workflow with status updates.",
    template: `Before reporting progress, audit every claim against a tool result from this run. State failed checks with their output, identify skipped work, and mark unverified claims explicitly. Report completed and verified work plainly.`,
    example: `In each checkpoint, include: completed change, supporting tool result, current failure if any, and next active step. Never convert “planned” into “done” without evidence.`,
    explanation: "Progress is tied to session evidence, making updates useful to someone who was not watching the run.",
    mistakes: ["Reporting expected test results", "Using confident language for code not executed", "Listing tool calls without their outcomes"],
    compatibility: "Anthropic reports this is particularly effective on Fable 5 long runs.", related: ["verify-finish", "long-run", "early-stop"], keywords: "status evidence tool result audit fabricated verified"
  },
  {
    id: "memory-notes", title: "Keep useful memory", category: "autonomy", task: ["agent"], level: "advanced", scope: "fable", risk: "caution",
    purpose: "Preserve corrections and confirmed approaches across runs without duplicating repository facts.", when: "Use when your harness gives Claude a persistent notes directory or memory tool.",
    template: `Store durable lessons in <memory location>. Keep one lesson per note with a one-line summary. Record confirmed approaches and corrections with why they matter. Do not duplicate repository documentation or chat history. Update an existing note instead of creating a duplicate; remove notes proven wrong.`,
    example: `In .agent-notes/, record only project-specific lessons that will change a future decision, such as the confirmed test command or an API trap not documented elsewhere.`,
    explanation: "A narrow memory policy prevents a junk drawer while retaining information that improves later work.",
    mistakes: ["Storing secrets or personal data", "Copying entire transcripts", "Treating an unverified guess as a lesson", "Writing outside the authorized project scope"],
    compatibility: "Requires a harness with persistent, authorized storage. Claude chat alone may not expose such a filesystem.", related: ["long-run", "boundaries"], keywords: "notes lessons persistent history state filesystem"
  },
  {
    id: "delegate-well", title: "Delegate independent work", category: "autonomy", task: ["agent"], level: "advanced", scope: "fable", risk: "caution",
    purpose: "Use parallel agents where isolation or concurrency provides a real benefit.", when: "Use for independent workstreams, separate verification, or research that does not need shared mutable state.",
    template: `Delegate independent subtasks that can run in parallel or benefit from isolated context. Keep working while they run. Give each subagent a concrete deliverable, constraints, and verification method. Work directly for simple searches, sequential edits, and tasks that require one shared context.`,
    example: `Have one subagent audit accessibility and another inspect regression-test coverage while the main agent traces the implementation. Do not let multiple agents edit the same file concurrently.`,
    explanation: "Delegation is bounded by independence. Clear ownership prevents duplicated work and shared-file conflicts.",
    mistakes: ["Spawning an agent for a single grep", "Parallel edits to the same state", "Waiting for each independent subtask sequentially", "Omitting relevant constraints"],
    compatibility: "Fable 5 is tuned for subagent orchestration, but the host must provide subagent tools.", related: ["long-run", "progress-evidence", "boundaries"], keywords: "subagent parallel orchestration delegation concurrency"
  },
  {
    id: "boundaries", title: "State action boundaries", category: "control", task: ["build", "debug", "review", "agent"], level: "practical", scope: "fable", risk: "safety",
    purpose: "Separate assessment from authorization and protect shared or irreversible state.", when: "Use whenever tools can edit files, restart services, push code, send messages, or change infrastructure.",
    template: `If the user asks a question or requests an assessment, report findings and stop. Apply changes only when requested. Proceed with local, reversible actions inside the task. Ask before destructive, hard-to-reverse, shared-system, or externally visible actions. Do not bypass safeguards or discard unfamiliar work to make progress.`,
    example: `You may inspect files and run read-only diagnostics. Do not restart services, change configuration, delete data, force-push, or send external messages without explicit confirmation.`,
    explanation: "The prompt grants enough authority for useful work while reserving consequential decisions for the user.",
    mistakes: ["Using a vague “be safe” instruction", "Treating all tool use as equally risky", "Assuming a diagnosis automatically authorizes a fix"],
    compatibility: "Especially important for agentic models and shared development environments.", related: ["long-run", "debug-evidence", "refusal-handling"], keywords: "permission destructive irreversible shared push delete restart safety"
  },
  {
    id: "early-stop", title: "Prevent early stopping", category: "control", task: ["agent"], level: "advanced", scope: "fable", risk: "safe",
    purpose: "Keep a long task moving when Claude has enough information to continue.", when: "Use if a run ends with a promise, repeats a plan, or asks permission for an already authorized reversible step.",
    template: `You are operating autonomously. For reversible actions within the requested scope, proceed without asking. Before ending, check whether your last paragraph is a plan, question, next-step list, or promise about unfinished work. If so, do that work now. End only when the task is complete or blocked on input only the user can provide.`,
    example: `Do not end on “I’ll run the tests next.” Run them. If they fail, report the failure and continue diagnosing unless the next action crosses a stated safety boundary.`,
    explanation: "This distinguishes genuine checkpoints from text-only intent, while preserving safety boundaries.",
    mistakes: ["Removing all pause conditions", "Continuing after a destructive-action checkpoint", "Using this instruction for a simple question that needs only an answer"],
    compatibility: "Fable 5-specific mitigation for rare behavior deep in long sessions.", related: ["long-run", "boundaries", "progress-evidence"], keywords: "continue stop promise plan permission autonomous"
  },
  {
    id: "refusal-handling", title: "Handle classifier refusals", category: "control", task: ["build", "debug", "agent"], level: "advanced", scope: "fable", risk: "safety",
    purpose: "Recognize a declined API response and route it intentionally.", when: "Use in API clients built on Fable 5, especially where benign cyber or life-science requests may be declined.",
    template: `if (response.stop_reason === "refusal") {\n  // Show an appropriate user message or retry using your approved fallback policy.\n}`,
    example: `Treat stop_reason: "refusal" as a normal response state, not a transport error. Preserve the original request, log the routing decision without sensitive content, and use an approved server-side or client-side fallback such as Claude Opus 4.8.`,
    explanation: "Fable 5 returns classifier refusals in a normal response. Fallback behavior belongs in the client or approved server-side configuration.",
    mistakes: ["Blindly retrying forever", "Treating every refusal as a network error", "Attempting to extract or reproduce the model’s hidden reasoning", "Logging sensitive prompt content"],
    compatibility: "Fable 5 API behavior. Server-side fallback availability and beta headers can change; verify the current official page.", related: ["boundaries", "review-risk"], keywords: "stop_reason refusal fallback classifier cyber biology API"
  }
];

const recipes = [
  { id: "build-feature", tag: "Build", title: "Implement without scope creep", note: "Requirements → constraints → checks" },
  { id: "debug-evidence", tag: "Debug", title: "Start from the reproduction", note: "Symptom → evidence → smallest fix" },
  { id: "long-run", tag: "Agent", title: "Run end to end", note: "Autonomy → checkpoints → proof" }
];

const troubleCases = [
  { id: "verbose", title: "Too long or unfocused", note: "The answer surveys options you will not use.", diagnosis: "The desired selection rule and response shape are underspecified.", patch: `Lead with the outcome. Include only details that change what I should do next. If weighing options, recommend one and give at most two decisive reasons.`, fallback: "If it remains long, add an exact section or word limit and one positive example.", related: "output-contract" },
  { id: "overplan", title: "Plans but does not act", note: "Claude keeps analyzing after enough context is available.", diagnosis: "The request may sound advisory, or the action boundary is unclear.", patch: `Implement the requested change now. When you have enough information to act, act. Do not end with a plan or a promise about work you can perform in this run.`, fallback: "Confirm tool permissions and use the early-stopping pattern for long autonomous runs.", related: "early-stop" },
  { id: "scope", title: "Changes too much", note: "A fix grows into refactoring or new abstractions.", diagnosis: "High effort can uncover adjacent opportunities unless the boundary is explicit.", patch: `Make only changes directly required for this task. Preserve existing interfaces. Do not refactor nearby code, add features, or design for hypothetical future needs.`, fallback: "List exact in-scope files or behaviors, then ask Claude to explain any necessary expansion before editing.", related: "minimal-scope" },
  { id: "format", title: "Wrong output format", note: "The content is useful but cannot be submitted or parsed.", diagnosis: "A negative format request or vague label leaves too much interpretation.", patch: `<output_format>Return exactly: 1) <section>, 2) <section>. Use <plain text|JSON schema|Markdown table>. Include <required fields>. Omit <specific extras>.</output_format>`, fallback: "Add one representative input/ideal-output example and validate machine-readable output.", related: "output-contract" },
  { id: "claims", title: "Claims work is done", note: "Tests or actions are described without evidence.", diagnosis: "The prompt asks for completion but does not define acceptable proof.", patch: `Before reporting progress, audit every claim against a tool result from this run. If a check was skipped or unavailable, say so explicitly. Never report an expected result as observed.`, fallback: "Request a compact table of check, evidence, and result; independently rerun critical checks.", related: "progress-evidence" },
  { id: "refusal", title: "API returns a refusal", note: "Fable 5 returns stop_reason: “refusal”.", diagnosis: "A safety classifier declined the request; this is a normal response state, not a transport failure.", patch: `Handle stop_reason: "refusal" explicitly. Show a suitable user message or route the unchanged request through the approved Fable 5 fallback policy. Do not loop retries or attempt to extract hidden reasoning.`, fallback: "Use Anthropic’s current server-side/client-side fallback guidance and verify model eligibility.", related: "refusal-handling" }
];

const els = {};
const state = {
  view: "reference",
  category: "all",
  query: "",
  task: "all",
  level: "all",
  scope: "all",
  builderStep: 0,
  openCard: null,
  favorites: readStore("cpf-favorites", []),
  recent: readStore("cpf-recent", [])
};

function readStore(key, fallback) {
  try { const parsed = JSON.parse(localStorage.getItem(key)); return parsed ?? fallback; }
  catch { return fallback; }
}

function writeStore(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); }
  catch { showToast("Local storage is unavailable; this change will not persist."); }
}

function cacheElements() {
  ["searchInput", "categoryGrid", "recipeRow", "taskFilter", "levelFilter", "scopeFilter", "resetFilters", "emptyReset", "showAllButton", "cardGrid", "emptyState", "resultCount", "activeFilter", "favoritesList", "recentList", "cardDialog", "dialogContent", "dialogTitle", "dialogCategory", "dialogFavorite", "closeCard", "helpDialog", "helpButton", "bottomHelp", "closeHelp", "toast", "builderForm", "builderBack", "builderNext", "progressLabel", "progressName", "progressBar", "objectiveInput", "contextInput", "excludeInput", "objectiveCount", "contextCount", "objectiveError", "contextError", "effortInput", "formatInput", "verifyInput", "evidenceInput", "pauseInput", "generatedPrompt", "builderSummary", "troubleGrid", "troubleResult"].forEach(id => els[id] = document.getElementById(id));
}

function init() {
  cacheElements();
  renderCategories();
  renderRecipes();
  restoreBuilder();
  renderPatterns();
  renderPersonal();
  renderTroubleshooting();
  bindEvents();
  history.replaceState({ view: "reference", step: 0 }, "", location.pathname + location.search);
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => showToast("Offline setup is unavailable in this browser.")));
  }
}

function renderCategories() {
  els.categoryGrid.innerHTML = Object.entries(categories).map(([id, cat]) => {
    const count = patterns.filter(p => p.category === id).length;
    return `<button type="button" class="category-button" data-category="${id}" style="--cat:${cat.color}"><span class="cat-count">${count}</span><span class="cat-icon" aria-hidden="true">${cat.icon}</span><b>${cat.name}</b><small>${cat.description}</small></button>`;
  }).join("");
}

function renderRecipes() {
  els.recipeRow.innerHTML = recipes.map(r => `<button type="button" class="recipe" data-open-card="${r.id}"><span>${r.tag}</span><b>${r.title}</b><small>${r.note}</small></button>`).join("");
}

function getFilteredPatterns() {
  const q = state.query.trim().toLowerCase();
  return patterns.filter(p => {
    const haystack = `${p.title} ${p.purpose} ${p.when} ${p.template} ${p.example} ${p.keywords}`.toLowerCase();
    return (state.category === "all" || p.category === state.category) &&
      (state.task === "all" || p.task.includes(state.task)) &&
      (state.level === "all" || p.level === state.level) &&
      (state.scope === "all" || p.scope === state.scope) &&
      (!q || haystack.includes(q));
  });
}

function renderPatterns() {
  const results = getFilteredPatterns();
  els.cardGrid.innerHTML = results.map(cardMarkup).join("");
  els.emptyState.hidden = results.length !== 0;
  els.cardGrid.hidden = results.length === 0;
  els.resultCount.textContent = `${results.length} ${results.length === 1 ? "pattern" : "patterns"}`;
  document.querySelectorAll("[data-category]").forEach(b => b.classList.toggle("active", b.dataset.category === state.category));
  const labels = [];
  if (state.category !== "all") labels.push(categories[state.category].name);
  if (state.query) labels.push(`search: “${state.query}”`);
  if (state.task !== "all") labels.push(`task: ${state.task}`);
  if (state.level !== "all") labels.push(`level: ${state.level}`);
  if (state.scope !== "all") labels.push(state.scope === "fable" ? "Fable 5 specific" : "general guidance");
  els.activeFilter.hidden = labels.length === 0;
  els.activeFilter.textContent = labels.length ? `Showing ${labels.join(" · ")}` : "";
}

function cardMarkup(p) {
  const cat = categories[p.category];
  const saved = state.favorites.includes(p.id);
  const riskLabel = p.risk === "safety" ? "Safety" : p.risk === "caution" ? "Caution" : "Low risk";
  return `<article class="pattern-card" style="--cat:${cat.color}">
    <button type="button" class="card-body" data-open-card="${p.id}" aria-label="Open ${p.title}">
      <div class="card-meta"><span class="chip ${p.scope === "fable" ? "scope-fable" : ""}">${p.scope === "fable" ? "Fable 5" : "All Claude"}</span><span class="chip risk-${p.risk}">${riskLabel}</span></div>
      <h3>${p.title}</h3><p>${p.purpose}</p>
    </button>
    <footer class="card-footer"><span>${cat.name} · ${capitalize(p.level)}</span><button type="button" data-favorite="${p.id}" class="${saved ? "saved" : ""}" aria-label="${saved ? "Remove from" : "Add to"} favorites" aria-pressed="${saved}">${saved ? "★" : "☆"}</button></footer>
  </article>`;
}

function openCard(id, push = true) {
  const p = patterns.find(item => item.id === id);
  if (!p) return;
  state.openCard = id;
  state.recent = [id, ...state.recent.filter(item => item !== id)].slice(0, 6);
  writeStore("cpf-recent", state.recent);
  renderPersonal();
  els.dialogCategory.textContent = categories[p.category].name;
  els.dialogFavorite.dataset.id = id;
  updateDialogFavorite();
  const risk = p.risk === "safety" ? `<aside class="warning-box"><b>Safety-sensitive</b><br>Review the action and current official documentation before using this in an automated or shared environment.</aside>` : p.risk === "caution" ? `<aside class="warning-box"><b>Use with care</b><br>Check permissions, shared state, and platform-specific behavior before acting.</aside>` : "";
  els.dialogContent.innerHTML = `<div class="card-meta"><span class="chip ${p.scope === "fable" ? "scope-fable" : ""}">${p.scope === "fable" ? "Fable 5 specific" : "All current Claude"}</span><span class="chip">${capitalize(p.level)}</span></div>
    <h2 id="dialogTitle">${p.title}</h2><p class="dialog-lead">${p.purpose}</p>${risk}
    <section class="detail-block"><h3>When to use it</h3><p>${p.when}</p></section>
    <section class="detail-block"><h3>Copyable pattern</h3><div class="code-shell"><div class="code-head"><span>Replace &lt;placeholders&gt;</span><button type="button" class="copy-button" data-copy-text="template">Copy</button></div><pre><code data-code="template"></code></pre></div></section>
    <section class="detail-block"><h3>Practical example</h3><div class="code-shell"><div class="code-head"><span>Example</span><button type="button" class="copy-button" data-copy-text="example">Copy</button></div><pre><code data-code="example"></code></pre></div><p>${p.explanation}</p></section>
    <section class="detail-block"><h3>Common mistakes</h3><ul>${p.mistakes.map(m => `<li>${m}</li>`).join("")}</ul></section>
    <section class="detail-block"><h3>Compatibility</h3><p>${p.compatibility}</p></section>
    <section class="detail-block"><h3>Related patterns</h3><div class="related-row">${p.related.map(id => { const r = patterns.find(item => item.id === id); return r ? `<button type="button" data-open-card="${r.id}">${r.title}</button>` : ""; }).join("")}</div></section>`;
  els.dialogContent.querySelector('[data-code="template"]').textContent = p.template;
  els.dialogContent.querySelector('[data-code="example"]').textContent = p.example;
  els.dialogContent.querySelectorAll("[data-copy-text]").forEach(button => button.addEventListener("click", () => copyText(p[button.dataset.copyText], button)));
  if (!els.cardDialog.open) els.cardDialog.showModal();
  els.cardDialog.scrollTop = 0;
  if (push) history.pushState({ view: state.view, card: id, step: state.builderStep }, "", `#pattern=${id}`);
}

function closeCard(useHistory = true) {
  if (!els.cardDialog.open) return;
  if (useHistory && history.state?.card) { history.back(); return; }
  els.cardDialog.close();
  state.openCard = null;
}

function toggleFavorite(id) {
  const saved = state.favorites.includes(id);
  state.favorites = saved ? state.favorites.filter(item => item !== id) : [id, ...state.favorites];
  writeStore("cpf-favorites", state.favorites);
  renderPatterns(); renderPersonal(); updateDialogFavorite();
  showToast(saved ? "Removed from favorites" : "Saved to favorites");
}

function updateDialogFavorite() {
  const id = els.dialogFavorite?.dataset.id;
  if (!id) return;
  const saved = state.favorites.includes(id);
  els.dialogFavorite.classList.toggle("saved", saved);
  els.dialogFavorite.textContent = saved ? "★" : "☆";
  els.dialogFavorite.setAttribute("aria-label", saved ? "Remove from favorites" : "Add to favorites");
  els.dialogFavorite.setAttribute("aria-pressed", String(saved));
}

function renderPersonal() {
  renderMiniList(els.favoritesList, state.favorites, "No favorites yet. Save patterns with ☆.");
  renderMiniList(els.recentList, state.recent, "Patterns you open appear here.");
}

function renderMiniList(container, ids, emptyText) {
  const valid = ids.map(id => patterns.find(p => p.id === id)).filter(Boolean);
  container.innerHTML = valid.length ? valid.map(p => `<button type="button" data-open-card="${p.id}">${p.title}</button>`).join("") : `<span class="mini-empty">${emptyText}</span>`;
}

function resetReference() {
  state.category = state.task = state.level = state.scope = "all";
  state.query = "";
  els.searchInput.value = ""; els.taskFilter.value = "all"; els.levelFilter.value = "all"; els.scopeFilter.value = "all";
  renderPatterns();
}

function navigateView(view, push = true) {
  if (!document.querySelector(`[data-view-panel="${view}"]`)) return;
  state.view = view;
  document.querySelectorAll("[data-view-panel]").forEach(panel => { const active = panel.dataset.viewPanel === view; panel.classList.toggle("active", active); panel.hidden = !active; });
  document.querySelectorAll("[data-view]").forEach(button => { const active = button.dataset.view === view; button.classList.toggle("active", active); if (button.classList.contains("tab")) active ? button.setAttribute("aria-current", "page") : button.removeAttribute("aria-current"); });
  if (push) history.pushState({ view, step: state.builderStep }, "", `#${view}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function restoreBuilder() {
  const saved = readStore("cpf-builder", null);
  if (!saved) return;
  const task = document.querySelector(`input[name="builderTask"][value="${saved.task}"]`);
  if (task) task.checked = true;
  els.objectiveInput.value = saved.objective || "";
  els.contextInput.value = saved.context || "";
  els.excludeInput.value = saved.exclude || "";
  els.effortInput.value = saved.effort || "high";
  els.formatInput.value = saved.format || "concise";
  els.verifyInput.checked = saved.verify !== false;
  els.evidenceInput.checked = saved.evidence !== false;
  els.pauseInput.checked = saved.pause !== false;
  updateCounts();
}

function builderData() {
  return {
    task: document.querySelector('input[name="builderTask"]:checked')?.value || "build",
    objective: els.objectiveInput.value.trim(), context: els.contextInput.value.trim(), exclude: els.excludeInput.value.trim(),
    effort: els.effortInput.value, format: els.formatInput.value, verify: els.verifyInput.checked, evidence: els.evidenceInput.checked, pause: els.pauseInput.checked
  };
}

function saveBuilder() { writeStore("cpf-builder", builderData()); }

function setBuilderStep(step, push = false) {
  state.builderStep = Math.max(0, Math.min(4, step));
  document.querySelectorAll(".builder-step").forEach((panel, index) => { const active = index === state.builderStep; panel.classList.toggle("active", active); panel.hidden = !active; });
  const names = ["Task", "Outcome", "Context", "Controls", "Ready"];
  els.progressLabel.textContent = `Step ${state.builderStep + 1} of 5`;
  els.progressName.textContent = names[state.builderStep];
  els.progressBar.style.width = `${(state.builderStep + 1) * 20}%`;
  els.builderBack.disabled = state.builderStep === 0;
  els.builderNext.textContent = state.builderStep === 4 ? "Start over" : state.builderStep === 3 ? "Build prompt" : "Next";
  if (state.builderStep === 4) generatePrompt();
  if (push) history.pushState({ view: "builder", step: state.builderStep }, "", `#builder-step-${state.builderStep + 1}`);
  document.querySelector(".workflow-shell")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function validateBuilderStep() {
  if (state.builderStep === 1 && els.objectiveInput.value.trim().length < 8) { els.objectiveError.hidden = false; els.objectiveInput.focus(); return false; }
  if (state.builderStep === 2 && els.contextInput.value.trim().length < 8) { els.contextError.hidden = false; els.contextInput.focus(); return false; }
  return true;
}

function generatePrompt() {
  const d = builderData();
  const action = { build: "Implement the requested change", debug: "Diagnose the root cause from evidence, then implement the smallest supported fix", review: "Review the specified code and report actionable, evidence-backed findings", explain: "Explain the concept accurately for a student, using a small working example" }[d.task];
  const format = { concise: "Lead with the outcome, then give a concise summary of the work and verification.", steps: "Return numbered steps in the order a student should follow them.", table: "Return the key results in a compact comparison table, followed by essential caveats.", teaching: "Explain the first key idea in plain English, then show a minimal example and a short self-check." }[d.format];
  const rules = [];
  if (d.exclude) rules.push(`Out of scope: ${d.exclude}.`);
  if (d.verify) rules.push("Before finishing, run the relevant available checks and report their actual results. Do not change tests merely to make them pass.");
  if (d.evidence) rules.push("Ground progress and completion claims in tool results from this run. Mark skipped or unavailable checks explicitly.");
  if (d.pause) rules.push("Proceed through reversible in-scope work. Pause only for a destructive or irreversible action, a real scope change, or input only I can provide.");
  const prompt = `<role>\nYou are a focused programming assistant helping a student produce correct, understandable work.\n</role>\n\n<task>\n${action}: ${d.objective}\n</task>\n\n<context>\n${d.context}\n</context>\n\n<constraints>\n${rules.map(r => `- ${r}`).join("\n")}\n- Do not add features, refactor, or introduce abstractions beyond what this task requires.\n</constraints>\n\n<output_format>\n${format}\n</output_format>`;
  els.generatedPrompt.textContent = prompt;
  els.builderSummary.innerHTML = `<div><small>Task</small><b>${capitalize(d.task)}</b></div><div><small>Effort</small><b>${d.effort}</b></div><div><small>Output</small><b>${capitalize(d.format)}</b></div>`;
  saveBuilder();
}

function updateCounts() {
  els.objectiveCount.textContent = `${els.objectiveInput.value.length}/700`;
  els.contextCount.textContent = `${els.contextInput.value.length}/1200`;
}

function renderTroubleshooting() {
  els.troubleGrid.innerHTML = troubleCases.map(t => `<button type="button" class="trouble-button" data-trouble="${t.id}"><b>${t.title}</b><small>${t.note}</small></button>`).join("");
}

function showTrouble(id) {
  const t = troubleCases.find(item => item.id === id);
  if (!t) return;
  document.querySelectorAll("[data-trouble]").forEach(button => button.classList.toggle("active", button.dataset.trouble === id));
  els.troubleResult.hidden = false;
  els.troubleResult.innerHTML = `<p class="eyebrow">Diagnosis</p><h3>${t.title}</h3><p>${t.diagnosis}</p><h4>Paste this prompt patch</h4><div class="code-shell"><div class="code-head"><span>Prompt patch</span><button type="button" class="copy-button" id="copyTrouble">Copy</button></div><pre><code id="troubleCode"></code></pre></div><div class="path-row"><div><b>If it works</b><br>Keep the smallest instruction that fixed the behavior.</div><div><b>If it does not</b><br>${t.fallback}</div></div><div class="related-row" style="margin-top:16px"><button type="button" data-open-card="${t.related}">Open related pattern</button><button type="button" id="clearTrouble">Choose another symptom</button></div>`;
  document.getElementById("troubleCode").textContent = t.patch;
  document.getElementById("copyTrouble").addEventListener("click", event => copyText(t.patch, event.currentTarget));
  document.getElementById("clearTrouble").addEventListener("click", () => { els.troubleResult.hidden = true; document.querySelectorAll("[data-trouble]").forEach(b => b.classList.remove("active")); els.troubleGrid.scrollIntoView({ behavior: "smooth" }); });
  els.troubleResult.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function copyText(text, button) {
  let copied = false;
  try { await navigator.clipboard.writeText(text); copied = true; }
  catch {
    const area = document.createElement("textarea"); area.value = text; area.setAttribute("readonly", ""); area.style.position = "fixed"; area.style.opacity = "0"; document.body.appendChild(area); area.select();
    try { copied = document.execCommand("copy"); } catch { copied = false; }
    area.remove();
  }
  if (copied) { const old = button?.textContent; if (button) { button.textContent = "Copied"; setTimeout(() => button.textContent = old, 1200); } showToast("Copied to clipboard"); }
  else showToast("Copy unavailable. Select the text manually.");
}

let toastTimer;
function showToast(message) {
  if (!els.toast) return;
  els.toast.textContent = message; els.toast.classList.add("show"); clearTimeout(toastTimer); toastTimer = setTimeout(() => els.toast.classList.remove("show"), 2200);
}

function bindEvents() {
  document.addEventListener("click", event => {
    const view = event.target.closest("[data-view]")?.dataset.view;
    const card = event.target.closest("[data-open-card]")?.dataset.openCard;
    const favorite = event.target.closest("[data-favorite]")?.dataset.favorite;
    const category = event.target.closest("[data-category]")?.dataset.category;
    const trouble = event.target.closest("[data-trouble]")?.dataset.trouble;
    if (view) navigateView(view);
    if (card) openCard(card);
    if (favorite) toggleFavorite(favorite);
    if (category) { state.category = state.category === category ? "all" : category; renderPatterns(); document.querySelector(".library").scrollIntoView({ behavior: "smooth" }); }
    if (trouble) showTrouble(trouble);
  });
  els.searchInput.addEventListener("input", () => { state.query = els.searchInput.value; renderPatterns(); });
  els.searchInput.addEventListener("keydown", event => { if (event.key === "Enter") document.querySelector(".library").scrollIntoView({ behavior: "smooth" }); });
  document.addEventListener("keydown", event => { if (event.key === "/" && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) { event.preventDefault(); navigateView("reference"); els.searchInput.focus(); } });
  [[els.taskFilter, "task"], [els.levelFilter, "level"], [els.scopeFilter, "scope"]].forEach(([el, key]) => el.addEventListener("change", () => { state[key] = el.value; renderPatterns(); }));
  [els.resetFilters, els.emptyReset, els.showAllButton].forEach(button => button.addEventListener("click", resetReference));
  els.dialogFavorite.addEventListener("click", () => toggleFavorite(els.dialogFavorite.dataset.id));
  els.closeCard.addEventListener("click", () => closeCard());
  els.cardDialog.addEventListener("cancel", event => { event.preventDefault(); closeCard(); });
  els.cardDialog.addEventListener("click", event => { if (event.target === els.cardDialog) closeCard(); });
  const openHelp = () => { if (!els.helpDialog.open) els.helpDialog.showModal(); };
  els.helpButton.addEventListener("click", openHelp); els.bottomHelp.addEventListener("click", openHelp); els.closeHelp.addEventListener("click", () => els.helpDialog.close());
  els.helpDialog.addEventListener("click", event => { if (event.target === els.helpDialog) els.helpDialog.close(); });
  els.builderNext.addEventListener("click", () => { if (state.builderStep === 4) { setBuilderStep(0, true); return; } if (!validateBuilderStep()) return; saveBuilder(); setBuilderStep(state.builderStep + 1, true); });
  els.builderBack.addEventListener("click", () => setBuilderStep(state.builderStep - 1, true));
  els.builderForm.addEventListener("input", () => { els.objectiveError.hidden = true; els.contextError.hidden = true; updateCounts(); saveBuilder(); });
  document.querySelectorAll("[data-copy-target]").forEach(button => button.addEventListener("click", () => copyText(document.getElementById(button.dataset.copyTarget).textContent, button)));
  window.addEventListener("popstate", event => {
    const next = event.state || { view: "reference", step: 0 };
    if (els.cardDialog.open && !next.card) { els.cardDialog.close(); state.openCard = null; }
    if (next.card) openCard(next.card, false);
    navigateView(next.view || "reference", false);
    if (next.view === "builder" && Number.isInteger(next.step)) setBuilderStep(next.step, false);
  });
}

function capitalize(value) { return value ? value.charAt(0).toUpperCase() + value.slice(1) : ""; }

document.addEventListener("DOMContentLoaded", init);
