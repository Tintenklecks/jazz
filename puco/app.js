const CATEGORIES = [
  {id:"getting-started", title:"First Steps", icon:"🚀", color:"violet", desc:"Your first successful prompt"},
  {id:"browse", title:"Find Prompts", icon:"🔎", color:"blue", desc:"Search, categories and sections"},
  {id:"use", title:"Use a Prompt", icon:"📋", color:"green", desc:"Fill, preview, copy and launch"},
  {id:"create", title:"Create Prompts", icon:"✍️", color:"orange", desc:"Build reusable templates"},
  {id:"syntax", title:"Syntax", icon:"{{ }}", color:"pink", desc:"Variables and form fields"},
  {id:"help", title:"Fix & Learn", icon:"🛟", color:"slate", desc:"Mistakes, privacy and FAQ"}
];

const ITEMS = [
  {
    id:"what-is-puco", category:"getting-started", title:"What PUCO does", icon:"P", difficulty:"Beginner", platform:"iOS/iPadOS",
    summary:"PUCO turns reusable AI prompt templates into guided forms that you can fill, preview and copy.",
    body:[
      ["The basic idea","Instead of rewriting the same detailed instruction, choose a prepared template. PUCO converts its placeholders into fields such as text boxes, dropdowns, number inputs, sliders and date pickers."],
      ["The iOS workflow","Browse or search → open a prompt → fill the fields → inspect the preview → copy the finished prompt → optionally open ChatGPT, Claude, Gemini or Grok."],
      ["Important platform difference","The system-wide keyboard hotkey belongs to the macOS version. Do not expect a global hotkey on iPhone or iPad."]
    ],
    related:["first-prompt","copy-launch"]
  },
  {
    id:"first-prompt", category:"getting-started", title:"Create your first result", icon:"1", difficulty:"Beginner", platform:"iOS/iPadOS",
    summary:"Use the five-step beginner workflow: choose, fill, preview, copy and send.",
    steps:[
      "Open PUCO and browse a relevant category, or search for the task you want to complete.",
      "Open a prompt and read its short description before filling anything.",
      "Complete the visible fields. Required or missing values should be resolved before copying.",
      "Check the generated preview. Confirm names, dates, tone, format and private information.",
      "Copy the prompt. On iOS, choose an AI destination when offered, then paste or continue there."
    ],
    tip:"For your first attempt, choose a simple writing or explanation prompt with only two or three fields.",
    related:["search-tips","fill-variables","copy-launch"]
  },
  {
    id:"beginner-loop", category:"getting-started", title:"Improve a result by iteration", icon:"↻", difficulty:"Beginner", platform:"All",
    summary:"Keep most values unchanged, alter one variable, and compare the AI outputs.",
    body:[
      ["Why it works","Changing one parameter at a time makes it easier to understand which instruction affected the result."],
      ["A practical loop","Run the prompt once. Change only tone, length, audience or output format. Copy again and compare. Repeat until the result is useful."],
      ["Prompt memory","PUCO can remember previous form selections, reducing repeated entry. Exact behavior can depend on the current app version and settings."]
    ],
    related:["fill-variables","preview-check"]
  },
  {
    id:"search-tips", category:"browse", title:"Find the right prompt", icon:"⌕", difficulty:"Beginner", platform:"iOS/iPadOS",
    summary:"Search by the task, desired output or subject—not only by a remembered title.",
    body:[
      ["Good search terms","Try concrete terms such as “email”, “summarize”, “Swift”, “image”, “travel plan”, “code review” or “explain”."],
      ["Browse when unsure","Categories are useful when you do not yet know what AI can do. Search is faster when you already know your objective."],
      ["Search depth","Depending on settings and version, search may include titles, descriptions, template text, variable names, tags and hidden prompts."]
    ],
    related:["library-sections","favorites-recent"]
  },
  {
    id:"library-sections", category:"browse", title:"Understand library sections", icon:"▦", difficulty:"Beginner", platform:"iOS/iPadOS",
    summary:"PUCO can organize prompts by category, favorites, recent use, frequent use, new or updated status.",
    body:[
      ["Useful sections","Hot prompts help with discovery. Favorites provide manual shortcuts. Often used and recently used adapt to your activity. New and updated sections highlight library changes."],
      ["Hidden prompts","Hide prompts that create noise. Search or settings may provide ways to include or manage hidden items."],
      ["iPad layout","On iPad, browsing and prompt details may appear side by side in a split view."]
    ],
    related:["favorites-recent","search-tips"]
  },
  {
    id:"favorites-recent", category:"browse", title:"Use favorites and recent prompts", icon:"★", difficulty:"Beginner", platform:"iOS/iPadOS",
    summary:"Favorite dependable prompts and use recent history for fast repetition.",
    steps:[
      "Mark a prompt as a favorite when you expect to reuse it.",
      "Open Favorites for deliberate shortcuts.",
      "Use Recently Used when repeating something from the current project or day.",
      "Remove old favorites when the list becomes noisy."
    ],
    related:["library-sections","beginner-loop"]
  },
  {
    id:"fill-variables", category:"use", title:"Fill variables correctly", icon:"▣", difficulty:"Beginner", platform:"All",
    summary:"Each field replaces a named placeholder inside the prompt template.",
    body:[
      ["What to enter","Provide specific, task-relevant information. Replace vague values such as “something professional” with a real audience, purpose, constraints and desired output."],
      ["Dropdowns and sliders","Options are curated starting points, not hidden AI commands. Choose the value that best describes the current task."],
      ["Saved values","Some fields may remember prior selections. Always review them because a value from an earlier task can be wrong for the current one."]
    ],
    warning:"Do not paste passwords, private keys, medical identifiers, client secrets or confidential source code unless your organization and chosen AI service explicitly permit it.",
    related:["syntax-basics","preview-check"]
  },
  {
    id:"preview-check", category:"use", title:"Check the generated preview", icon:"✓", difficulty:"Beginner", platform:"All",
    summary:"The preview is your last quality and privacy check before the prompt leaves PUCO.",
    checklist:[
      "All placeholders have been replaced.",
      "Names, dates, units and numbers are correct.",
      "The audience and tone match the situation.",
      "The requested output format is explicit.",
      "No previous form value leaked into the new task.",
      "No confidential or unnecessary personal information is included."
    ],
    related:["fill-variables","copy-launch","troubleshooting"]
  },
  {
    id:"copy-launch", category:"use", title:"Copy and open an AI destination", icon:"↗", difficulty:"Beginner", platform:"iOS/iPadOS",
    summary:"PUCO prepares the prompt; the selected external AI service generates the answer.",
    steps:[
      "Review the final preview.",
      "Tap the copy action.",
      "When the iOS destination menu is available, choose ChatGPT, Claude, Gemini or Grok.",
      "PUCO attempts to open the installed app; a browser fallback may be used when necessary.",
      "Confirm that the complete prompt is present before submitting it."
    ],
    warning:"Opening an external AI service is a data transfer boundary. Its privacy terms, retention rules and account settings apply after you submit the prompt.",
    related:["preview-check","external-ai"]
  },
  {
    id:"external-ai", category:"use", title:"Know what happens outside PUCO", icon:"↗", difficulty:"Beginner", platform:"All",
    summary:"PUCO manages prompt creation; it does not make every external AI service behave identically.",
    body:[
      ["Model differences","The same prompt can produce different answers in ChatGPT, Claude, Gemini, Grok, Midjourney or a local model."],
      ["App availability","A destination app or URL scheme may not be installed or available in every region. Use the web fallback or copy manually."],
      ["Result responsibility","Verify important facts, code, financial claims, legal statements and medical information generated by any AI."]
    ],
    related:["copy-launch","troubleshooting"]
  },
  {
    id:"create-first-template", category:"create", title:"Create a reusable prompt", icon:"✎", difficulty:"Intermediate", platform:"iOS/iPadOS",
    summary:"Turn a repeated instruction into a template by replacing changing details with variables.",
    steps:[
      "Start with a prompt that already works.",
      "Highlight the values that change each time: topic, audience, tone, count, date or format.",
      "Replace those values with PUCO placeholders.",
      "Give the prompt a clear action-oriented title and short description.",
      "Validate the template, test every field, then save it.",
      "Run it with at least two different sets of values before relying on it."
    ],
    tip:"The current project documentation states that the free tier allows two user-created prompts; store-managed limits can change, so verify inside the app.",
    related:["syntax-basics","template-quality","validation"]
  },
  {
    id:"template-quality", category:"create", title:"Make templates beginner-friendly", icon:"A", difficulty:"Intermediate", platform:"All",
    summary:"A useful template explains the task through clear field labels and sensible choices.",
    checklist:[
      "Use a title that starts with the task: Draft, Explain, Compare, Plan, Review.",
      "Use field labels that describe the expected value.",
      "Add practical default values only when they are broadly safe.",
      "Keep dropdown choices distinct and understandable.",
      "Avoid fields that do not materially change the output.",
      "Specify the desired output structure in the template."
    ],
    related:["create-first-template","syntax-dropdown","validation"]
  },
  {
    id:"validation", category:"create", title:"Validate and test a template", icon:"✓", difficulty:"Intermediate", platform:"All",
    summary:"Validation catches malformed placeholders; real test runs catch weak instructions.",
    body:[
      ["Syntax validation","Use PUCO's template validation tooling when available. It can identify malformed or unsupported placeholder structures."],
      ["Behavior testing","Try short, long and unusual values. Check commas in dropdown choices, number interpretation, date defaults and empty fields."],
      ["Completion test","A template is ready only when the generated prompt reads naturally and contains no visible braces or placeholder labels."]
    ],
    related:["syntax-basics","troubleshooting"]
  },
  {
    id:"syntax-basics", category:"syntax", title:"Variable syntax overview", icon:"{{ }}", difficulty:"Intermediate", platform:"All",
    summary:"Double curly braces define values that PUCO turns into form fields.",
    codes:[
      ["Multiline text","{{Topic}}"],
      ["Text with a default","{{Topic:AI ethics}}"],
      ["Dropdown choices","{{Tone:Professional,Casual,Gentle}}"],
      ["Shared option list","{{Tone:[tones]}}"],
      ["Number","{{Count:10}}"],
      ["Range or slider","{{Words:50-200}}"],
      ["Date","{{Date:2026-07-17}}"]
    ],
    warning:"Treat labels, option names and defaults as template content. Do not include unmatched braces, and test values containing commas before publication.",
    related:["syntax-dropdown","syntax-number-date","validation"]
  },
  {
    id:"syntax-dropdown", category:"syntax", title:"Dropdowns and shared variables", icon:"⌄", difficulty:"Intermediate", platform:"All",
    summary:"Comma-separated choices create a dropdown; bracketed names reference a shared option list.",
    codes:[
      ["Literal choices","{{Audience:Beginner,Professional,Developer}}"],
      ["Global list","{{Tone:[tones]}}"]
    ],
    body:[
      ["When to use choices","Use a dropdown when the valid options are known and mutually understandable."],
      ["When to use a global variable","Use a shared list when many templates need the same maintained choices."],
      ["Common mistake","Do not assume a global variable exists merely because its name sounds plausible. It must be defined in PUCO's variable data."]
    ],
    related:["syntax-basics","template-quality"]
  },
  {
    id:"syntax-number-date", category:"syntax", title:"Numbers, ranges and dates", icon:"#", difficulty:"Intermediate", platform:"All",
    summary:"Numeric defaults, ranges and ISO-style dates can generate specialized controls.",
    codes:[
      ["Number input","{{Count:10}}"],
      ["Range slider","{{Words:50-200}}"],
      ["Date picker","{{Deadline:2026-07-31}}"]
    ],
    body:[
      ["Be explicit","The label should include the unit where ambiguity is possible, such as “Duration in minutes” or “Budget in CHF”."],
      ["Date format","Use a full year-month-day value in the template. The rendered form may localize the visible picker."],
      ["Range design","Choose a useful minimum and maximum. An enormous range makes a slider hard to control."]
    ],
    related:["syntax-basics","validation"]
  },
  {
    id:"troubleshooting", category:"help", title:"Quick troubleshooting", icon:"!", difficulty:"Beginner", platform:"iOS/iPadOS",
    summary:"Resolve common problems without losing your current prompt.",
    body:[
      ["Prompt still shows braces","Return to the form and fill missing fields. If braces remain despite complete fields, the template may be malformed."],
      ["Copy appears to fail","Tap copy again, switch to a text field, and paste to verify. Check whether clipboard access prompts or device restrictions are involved."],
      ["AI app does not open","The destination app may not be installed or its URL scheme may have changed. Use the browser fallback or paste manually."],
      ["Library is empty or old","Check connectivity, reopen the app and allow sync to finish. PUCO can fall back to bundled local content when remote loading fails."],
      ["Favorite or recent state is missing","Confirm iCloud and app settings. Sync can take time, and per-user state may differ before synchronization completes."]
    ],
    related:["preview-check","copy-launch","sync-icloud"]
  },
  {
    id:"sync-icloud", category:"help", title:"iCloud and device sync", icon:"☁", difficulty:"Beginner", platform:"Apple devices",
    summary:"Prompts and user state are designed to persist with SwiftData and optionally synchronize through iCloud.",
    body:[
      ["What may sync","User-created prompts and state such as favorites, hidden status, last-used times and usage counts are designed for persistence."],
      ["What to check","Use the same Apple Account, enable iCloud for the app where available, and allow time for the first synchronization."],
      ["Recovery","Do not immediately reset or delete data when a device appears behind. First check connectivity and whether the other device has finished uploading."]
    ],
    warning:"Reset, deletion and import operations can affect local or synchronized data. Read confirmation messages and export important custom prompts first.",
    related:["troubleshooting","favorites-recent"]
  },
  {
    id:"privacy", category:"help", title:"Privacy and safe prompting", icon:"◉", difficulty:"Beginner", platform:"All",
    summary:"Separate storage inside PUCO from what you intentionally send to an external AI provider.",
    checklist:[
      "Remove secrets, credentials and private keys.",
      "Minimize personal data and client identifiers.",
      "Check company policy before sending source code or documents.",
      "Review the external AI provider's retention and training settings.",
      "Verify generated answers before acting on them.",
      "Export or back up valuable custom templates before destructive changes."
    ],
    related:["external-ai","preview-check"]
  },
  {
    id:"ios-vs-macos", category:"help", title:"iOS versus macOS", icon:"⌘", difficulty:"Beginner", platform:"Apple devices",
    summary:"The core library and form workflow are shared, but system integration differs.",
    body:[
      ["iPhone and iPad","Touch-first browsing, guided forms, copy actions and optional opening of supported AI destinations."],
      ["Mac","Adds menu-bar behavior, a floating panel and a global keyboard hotkey such as Command–Shift–P."],
      ["Do not confuse them","An instruction mentioning the global hotkey is not an iOS instruction."]
    ],
    related:["what-is-puco","copy-launch"]
  },
  {
    id:"glossary", category:"help", title:"Beginner glossary", icon:"Aa", difficulty:"Beginner", platform:"All",
    summary:"The essential PUCO vocabulary in plain English.",
    body:[
      ["Prompt","The instruction sent to an AI model."],
      ["Template","A reusable prompt containing values that can change."],
      ["Variable","A named placeholder that becomes a form field."],
      ["Preview","The completed prompt after variable values are inserted."],
      ["Category and tag","Ways to organize and find prompts."],
      ["Destination","The external AI app or website opened after copying."],
      ["Global variable","A centrally maintained list of reusable choices."],
      ["Suffix","An instruction appended to prompts to enforce a recurring rule or format."]
    ],
    related:["syntax-basics","what-is-puco"]
  },
  {
    id:"sources", category:"help", title:"Sources and verification", icon:"↗", difficulty:"Reference", platform:"All",
    summary:"See the project documents, official site and verification notes used for this cheat sheet.",
    route:"sources",
    related:[]
  }
];

const state = {
  route:"home", category:"all", query:"", difficulty:"all",
  favorites:new Set(JSON.parse(localStorage.getItem("puco-favorites") || "[]")),
  recent:JSON.parse(localStorage.getItem("puco-recent") || "[]"),
  workflowStep:0,
  workflow:{goal:"", route:"browse", review:false}
};

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const views = ["homeView","listView","detailView","workflowView","sourcesView"];

function saveState(){
  localStorage.setItem("puco-favorites", JSON.stringify([...state.favorites]));
  localStorage.setItem("puco-recent", JSON.stringify(state.recent.slice(0,8)));
}
function toast(message){
  const el=$("#toast"); el.textContent=message; el.classList.add("show");
  clearTimeout(toast.timer); toast.timer=setTimeout(()=>el.classList.remove("show"),1800);
}
function setView(id){
  views.forEach(v => $("#"+v).hidden = v!==id);
  $("#hero").hidden = id!=="homeView";
  document.querySelector(".search-panel").hidden = !["homeView","listView"].includes(id);
  window.scrollTo({top:0, behavior:"smooth"});
}
function navigate(route, push=true){
  state.route=route;
  if(push) history.pushState({route}, "", route==="home" ? "#home" : "#"+route);
  $$(".bottom-nav button").forEach(b=>b.classList.toggle("active", b.dataset.route===route || (route.startsWith("item/") && b.dataset.route==="all")));
  if(route==="home") renderHome();
  else if(route==="all" || route==="favorites" || route.startsWith("category/")) renderList(route);
  else if(route==="workflow") renderWorkflow();
  else if(route==="sources") { setView("sourcesView"); }
  else if(route.startsWith("item/")) renderDetail(route.split("/")[1]);
  $("#main").focus({preventScroll:true});
}
function cardHTML(item, compact=false){
  const fav=state.favorites.has(item.id);
  return `<article class="reference-card">
    <div class="card-icon" aria-hidden="true">${item.icon}</div>
    <button class="open-card" data-open="${item.id}" aria-label="Open ${item.title}">
      <h3>${item.title}</h3><p>${item.summary}</p>
      ${compact?"":`<div class="badges"><span class="badge">${item.difficulty}</span><span class="badge">${item.platform}</span></div>`}
    </button>
    <button class="favorite-button ${fav?"active":""}" data-favorite="${item.id}" aria-label="${fav?"Remove from":"Add to"} favorites" title="Favorite">${fav?"★":"☆"}</button>
  </article>`;
}
function attachCardEvents(scope=document){
  scope.querySelectorAll("[data-open]").forEach(b=>b.onclick=()=>openItem(b.dataset.open));
  scope.querySelectorAll("[data-favorite]").forEach(b=>b.onclick=()=>{
    const id=b.dataset.favorite;
    state.favorites.has(id)?state.favorites.delete(id):state.favorites.add(id);
    saveState(); renderCurrent(); toast(state.favorites.has(id)?"Added to favorites":"Removed from favorites");
  });
}
function renderFilters(){
  const difficulties=["all","Beginner","Intermediate","Reference"];
  $("#filterRow").innerHTML=difficulties.map(d=>`<button class="filter-chip ${state.difficulty===d?"active":""}" data-difficulty="${d}">${d==="all"?"All levels":d}</button>`).join("");
  $$("[data-difficulty]").forEach(b=>b.onclick=()=>{state.difficulty=b.dataset.difficulty; renderFilters(); if(state.route!=="home") renderList(state.route);});
}
function renderHome(){
  setView("homeView");
  $("#categoryGrid").innerHTML=CATEGORIES.map(c=>`<button class="category-button" data-category="${c.id}" data-color="${c.color}">
    <span class="category-icon">${c.icon}</span><strong>${c.title}</strong><small>${c.desc}</small>
  </button>`).join("");
  $$("[data-category]").forEach(b=>b.onclick=()=>navigate("category/"+b.dataset.category));
  const quick=["first-prompt","search-tips","copy-launch","syntax-basics"].map(id=>ITEMS.find(i=>i.id===id));
  $("#quickTasks").innerHTML=quick.map(i=>cardHTML(i)).join("");
  const recentItems=state.recent.map(id=>ITEMS.find(i=>i.id===id)).filter(Boolean).slice(0,4);
  $("#recentList").innerHTML=recentItems.length?recentItems.map(i=>cardHTML(i,true)).join(""):`<div class="empty-state"><p>Your recently opened topics will appear here.</p></div>`;
  attachCardEvents($("#homeView"));
  renderFilters();
}
function filteredItems(route){
  let items=[...ITEMS];
  if(route==="favorites") items=items.filter(i=>state.favorites.has(i.id));
  if(route.startsWith("category/")) items=items.filter(i=>i.category===route.split("/")[1]);
  if(state.difficulty!=="all") items=items.filter(i=>i.difficulty===state.difficulty);
  const q=state.query.trim().toLowerCase();
  if(q) items=items.filter(i=>JSON.stringify(i).toLowerCase().includes(q));
  return items;
}
function renderList(route=state.route){
  setView("listView");
  let title="All topics", subtitle="Search the complete beginner reference.";
  if(route==="favorites"){title="Favorites";subtitle="Your locally saved shortcuts."}
  if(route.startsWith("category/")){
    const c=CATEGORIES.find(c=>c.id===route.split("/")[1]); title=c?.title||"Category"; subtitle=c?.desc||"";
  }
  $("#listTitle").textContent=title; $("#listSubtitle").textContent=subtitle;
  const items=filteredItems(route);
  $("#resultsSummary").textContent=`${items.length} ${items.length===1?"item":"items"}${state.query?` matching “${state.query}”`:""}`;
  $("#resultsList").innerHTML=items.map(i=>cardHTML(i)).join("");
  $("#emptyState").hidden=items.length>0;
  attachCardEvents($("#listView"));
  renderFilters();
}
function openItem(id){
  const item=ITEMS.find(i=>i.id===id); if(!item)return;
  if(item.route==="sources"){navigate("sources");return;}
  state.recent=[id,...state.recent.filter(x=>x!==id)].slice(0,8); saveState();
  navigate("item/"+id);
}
function sectionHTML(item){
  let html="";
  if(item.body) item.body.forEach(([h,p])=>html+=`<h2>${h}</h2><p>${p}</p>`);
  if(item.steps) html+=`<h2>Steps</h2><ol>${item.steps.map(s=>`<li>${s}</li>`).join("")}</ol>`;
  if(item.checklist) html+=`<h2>Checklist</h2><ul>${item.checklist.map(s=>`<li>${s}</li>`).join("")}</ul>`;
  if(item.codes) {
    html+=`<h2>Examples</h2>`;
    item.codes.forEach(([label,code])=>html+=`<p><strong>${label}</strong></p><div class="code-block"><pre><code>${escapeHTML(code)}</code></pre><button class="copy-code" data-copy="${escapeAttr(code)}" aria-label="Copy ${label}">⧉</button></div>`);
  }
  if(item.tip) html+=`<div class="tip"><strong>Tip:</strong> ${item.tip}</div>`;
  if(item.warning) html+=`<div class="warning"><strong>Important:</strong> ${item.warning}</div>`;
  return html;
}
function renderDetail(id){
  const item=ITEMS.find(i=>i.id===id); if(!item){navigate("home",false);return;}
  setView("detailView");
  const fav=state.favorites.has(id);
  $("#detailView").innerHTML=`<button class="back-link" id="detailBack">← Back</button>
    <article class="detail-card">
      <p class="eyebrow">${CATEGORIES.find(c=>c.id===item.category)?.title||"Reference"}</p>
      <h1>${item.title}</h1>
      <p class="summary">${item.summary}</p>
      <div class="badges"><span class="badge">${item.difficulty}</span><span class="badge">${item.platform}</span></div>
      <div class="detail-actions">
        <button class="secondary-button" data-favorite="${item.id}">${fav?"★ Favorited":"☆ Add favorite"}</button>
        <button class="secondary-button" id="shareItem">Share</button>
      </div>
      ${sectionHTML(item)}
      ${item.related?.length?`<h2>Related topics</h2><div class="related-links">${item.related.map(r=>`<button data-open-item="${r}">${ITEMS.find(i=>i.id===r)?.title||r}</button>`).join("")}</div>`:""}
    </article>`;
  $("#detailBack").onclick=()=>history.back();
  $("#shareItem").onclick=async()=>{
    const url=location.href;
    if(navigator.share){try{await navigator.share({title:item.title,text:item.summary,url});}catch(_){}}
    else {await copyText(url); toast("Link copied");}
  };
  attachCardEvents($("#detailView"));
  $$("[data-open-item]",$("#detailView")).forEach(b=>b.onclick=()=>openItem(b.dataset.openItem));
  $$(".copy-code",$("#detailView")).forEach(b=>b.onclick=async()=>{await copyText(b.dataset.copy);toast("Copied");});
}
function escapeHTML(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));}
function escapeAttr(s){return escapeHTML(s);}
async function copyText(text){
  if(navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
  const t=document.createElement("textarea"); t.value=text; t.style.position="fixed"; t.style.opacity="0"; document.body.appendChild(t); t.select(); document.execCommand("copy"); t.remove();
}
const workflowSteps=[
  {
    title:"What do you want to do?", text:"Choose the closest starting point. You can still search and change direction later.",
    render:()=>`<div class="workflow-options">
      ${[["write","Write or rewrite text"],["learn","Explain or learn something"],["code","Work with code"],["image","Create or edit an image prompt"],["other","Something else"]].map(([v,l])=>`<label><input type="radio" name="goal" value="${v}" ${state.workflow.goal===v?"checked":""}><span>${l}</span></label>`).join("")}
    </div>`,
    validate:()=>{const v=$('input[name="goal"]:checked'); if(!v){toast("Choose a goal first");return false;} state.workflow.goal=v.value;return true;}
  },
  {
    title:"Find a suitable template", text:"Search using the action or desired output. Browse categories when you are exploring.",
    render:()=>`<div class="summary-box"><strong>Suggested search</strong><p>${({write:"email, rewrite, social post or summarize",learn:"explain, compare, tutor or research",code:"code review, debug, test or document",image:"image, portrait, illustration or restore",other:"describe the result you need"})[state.workflow.goal]||"describe your task"}</p></div>
      <div class="workflow-options">
        <label><input type="radio" name="route" value="search" ${state.workflow.route==="search"?"checked":""}><span>I know the task — use search</span></label>
        <label><input type="radio" name="route" value="browse" ${state.workflow.route==="browse"?"checked":""}><span>I want ideas — browse categories</span></label>
      </div>`,
    validate:()=>{const v=$('input[name="route"]:checked'); state.workflow.route=v?.value||"browse";return true;}
  },
  {
    title:"Fill the guided form", text:"Enter the facts that change for this task. Make the audience, purpose and output explicit.",
    render:()=>`<div class="summary-box"><strong>Before continuing, check:</strong>
      <ul><li>Every visible field has the intended value.</li><li>Old remembered values still fit.</li><li>No passwords, private keys or unnecessary personal data are included.</li></ul></div>`,
    validate:()=>true
  },
  {
    title:"Review the preview", text:"Read the final prompt as if you were the AI receiving it.",
    render:()=>`<div class="workflow-options"><label><input type="checkbox" id="reviewCheck" ${state.workflow.review?"checked":""}><span>I checked placeholders, facts, format and private information.</span></label></div>`,
    validate:()=>{state.workflow.review=$("#reviewCheck").checked;if(!state.workflow.review){toast("Complete the review check");return false;}return true;}
  },
  {
    title:"Copy, launch and verify", text:"Copy the prompt, optionally open an AI destination, and confirm the whole prompt is present before submitting.",
    render:()=>`<div class="summary-box"><strong>Your workflow</strong><p>${state.workflow.route==="search"?"Search directly":"Browse a category"} for a ${state.workflow.goal||"suitable"} prompt, fill the fields, review the preview, copy it, then open your chosen AI service.</p></div>
      <div class="tip"><strong>Iteration:</strong> To improve the result, return to PUCO, change one variable and compare the next output.</div>`,
    validate:()=>true
  }
];
function renderWorkflow(){
  setView("workflowView");
  const step=workflowSteps[state.workflowStep];
  $("#progressText").textContent=`Step ${state.workflowStep+1} of ${workflowSteps.length}`;
  $("#workflowProgress").max=workflowSteps.length; $("#workflowProgress").value=state.workflowStep+1;
  $("#workflowContent").innerHTML=`<p class="eyebrow">Guided first steps</p><h1>${step.title}</h1><p>${step.text}</p>${step.render()}`;
  $("#workflowBack").disabled=state.workflowStep===0;
  $("#workflowNext").textContent=state.workflowStep===workflowSteps.length-1?"Finish":"Next";
}
function renderCurrent(){
  if(state.route==="home")renderHome();
  else if(state.route.startsWith("item/"))renderDetail(state.route.split("/")[1]);
  else if(["all","favorites"].includes(state.route)||state.route.startsWith("category/"))renderList(state.route);
}
function resetFilters(){
  state.query="";state.difficulty="all";$("#searchInput").value="";$("#clearSearch").hidden=true;renderFilters();renderCurrent();
}
$("#homeButton").onclick=()=>navigate("home");
$("#helpButton").onclick=()=>$("#helpDialog").showModal();
$("#closeHelp").onclick=()=>$("#helpDialog").close();
$("#helpDialog").addEventListener("click",e=>{if(e.target===$("#helpDialog"))$("#helpDialog").close();});
$$("[data-route]").forEach(b=>b.onclick=()=>navigate(b.dataset.route));
$("#listBack").onclick=()=>navigate("home");
$("#sourcesBack").onclick=()=>navigate("home");
$("#workflowExit").onclick=()=>navigate("home");
$("#workflowBack").onclick=()=>{if(state.workflowStep>0){state.workflowStep--;renderWorkflow();}};
$("#workflowNext").onclick=()=>{
  const step=workflowSteps[state.workflowStep];
  if(!step.validate())return;
  if(state.workflowStep<workflowSteps.length-1){state.workflowStep++;renderWorkflow();}
  else {state.workflowStep=0;navigate("home");toast("First-step workflow completed");}
};
$("#searchInput").addEventListener("input",e=>{
  state.query=e.target.value;$("#clearSearch").hidden=!state.query;
  if(state.route==="home" && state.query) navigate("all");
  else if(state.route!=="home") renderList(state.route);
});
$("#clearSearch").onclick=()=>{state.query="";$("#searchInput").value="";$("#clearSearch").hidden=true;renderCurrent();};
$("#resetFilters").onclick=resetFilters;$("#emptyReset").onclick=resetFilters;
$("#clearRecent").onclick=()=>{state.recent=[];saveState();renderHome();toast("Recent items cleared");};
$$("[data-open-item]",$("#helpDialog")).forEach(b=>b.onclick=()=>{$("#helpDialog").close();openItem(b.dataset.openItem);});
window.addEventListener("popstate",()=>navigate((location.hash||"#home").slice(1),false));

let deferredInstall;
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredInstall=e;$("#installButton").hidden=false;});
$("#installButton").onclick=async()=>{if(!deferredInstall)return;deferredInstall.prompt();await deferredInstall.userChoice;deferredInstall=null;$("#installButton").hidden=true;};

if("serviceWorker" in navigator){
  window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>toast("Offline setup unavailable")));
}

const initial=(location.hash||"#home").slice(1);
navigate(initial,false);
