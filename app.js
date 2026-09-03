/* ---------- state & storage ---------- */
let S={lang:"de",decks:{},streak:0,lastDay:null,log:{},lvl:"Alles",typeMode:false};
let memOnly=false;
const today=()=>new Date().toISOString().slice(0,10);
async function load(){
  try{
    const raw=localStorage.getItem("wortschatz-v1");
    let migrated=false;
    if(raw){
      const saved=JSON.parse(raw);
      const oldCards=saved.cards,oldNode=saved.curNode;
      S=Object.assign(S,saved);
      if(!S.decks)S.decks={};
      if(oldCards){
        if(!S.decks.de)S.decks.de={cards:{},curNode:0};
        if(Object.keys(S.decks.de.cards).length===0){
          S.decks.de.cards=oldCards;
          if(oldNode!=null)S.decks.de.curNode=oldNode;
        }
        delete S.cards;delete S.curNode;
        migrated=true;
      }
      if(!LANGS[S.lang])S.lang="de";
    }
    for(const l of LANG_ORDER)if(!S.decks[l])S.decks[l]={cards:{},curNode:0};
    if(migrated)save();
  }catch(e){memOnly=true;}
}
let saveT=null;
function save(){
  if(typeof window.__syncOnSave==="function")window.__syncOnSave(S);
  if(memOnly)return;
  clearTimeout(saveT);
  saveT=setTimeout(()=>{try{localStorage.setItem("wortschatz-v1",JSON.stringify(S))}catch(e){console.error("opslaan mislukt",e)}},350);
}

/* ---------- taal-accessors ---------- */
function curLang(){return LANGS[S.lang]||LANGS.de}
function curW(){return DECKS[S.lang]||DECKS.de}
function curDeck(){return S.decks[S.lang]}
function curCards(){return curDeck().cards}
function setLang(l){
  if(!LANGS[l]||l===S.lang)return;
  S.lang=l;save();
  document.documentElement.dataset.lang=l;
  closePopup();
  view="home";render();
}

/* ---------- thema (licht/donker) ---------- */
function initTheme(){
  try{
    if(localStorage.getItem("wortschatz-theme")==="dark")document.documentElement.dataset.theme="dark";
  }catch(e){}
}
function toggleTheme(){
  const isDark=document.documentElement.dataset.theme==="dark";
  if(isDark)delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme="dark";
  try{localStorage.setItem("wortschatz-theme",isDark?"light":"dark")}catch(e){}
  render();
}

/* ---------- uitspraak (Web Speech API) ---------- */
function escAttr(s){return String(s).replace(/&/g,"&amp;").replace(/"/g,"&quot;")}
function speak(text){
  if(!("speechSynthesis" in window)||!text)return;
  try{
    window.speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(text);
    u.lang=curLang().speechLang;
    window.speechSynthesis.speak(u);
  }catch(e){}
}
function speakerBtn(text){
  const enabled="speechSynthesis" in window;
  return `<button class="speaker-btn" data-speak="${escAttr(text)}" onclick="event.stopPropagation();speak(this.dataset.speak)" ${enabled?"":"disabled"} aria-label="Uitspraak beluisteren">🔊</button>`;
}

/* ---------- SRS (vereenvoudigde SM-2) ---------- */
function getCard(i){const c=curCards();return c[i]||(c[i]={iv:0,ease:2.5,reps:0,due:0})}
function preview(c,g){
  if(g===0)return"<10 min";
  let iv;
  if(g===1)iv=c.reps===0?1:Math.max(1,Math.round(c.iv*1.2));
  else if(g===2)iv=c.reps===0?1:(c.reps===1?3:Math.round(c.iv*c.ease));
  else iv=c.reps===0?2:(c.reps===1?4:Math.round(c.iv*c.ease*1.3));
  return iv+" d";
}
function grade(i,g){
  const c=getCard(i),now=Date.now();
  if(g===0){c.ease=Math.max(1.3,c.ease-0.2);c.iv=0;c.due=now+10*60*1000;}
  else{
    if(g===1){c.iv=c.reps===0?1:Math.max(1,Math.round(c.iv*1.2));c.ease=Math.max(1.3,c.ease-0.15);}
    if(g===2){c.iv=c.reps===0?1:(c.reps===1?3:Math.round(c.iv*c.ease));}
    if(g===3){c.iv=c.reps===0?2:(c.reps===1?4:Math.round(c.iv*c.ease*1.3));c.ease+=0.1;}
    c.due=now+c.iv*864e5;
  }
  c.reps++;
  const d=today();
  if(!S.log[d]){S.log[d]={n:0,rev:0};
    S.streak = S.lastDay===yesterday()? S.streak+1 : (S.lastDay===d? S.streak : 1);
    S.lastDay=d;
  }
  S.log[d].rev++;
  save();
}
function yesterday(){const t=new Date();t.setDate(t.getDate()-1);return t.toISOString().slice(0,10)}
const inLvl=i=>S.lvl==="Alles"||curW()[i][1]===S.lvl;
function dueIds(){const n=Date.now(),c=curCards();return curW().map((_,i)=>i).filter(i=>c[i]&&c[i].reps>0&&c[i].due<=n&&inLvl(i))}
function newIds(){
  const c=curCards();
  // geen daglimiet meer — elke sessie brengt max NEW_PER_SESSION nieuwe kaarten
  return curW().map((_,i)=>i).filter(i=>!c[i]||c[i].reps===0).filter(inLvl).slice(0,NEW_PER_SESSION);
}
function catCounts(k,lvl){
  const W=curW(),c=curCards();
  const ids=W.map((_,i)=>i).filter(i=>W[i][0]===k&&(lvl==="Alles"||W[i][1]===lvl));
  const now=Date.now();
  const newC=ids.filter(i=>!c[i]||c[i].reps===0).length;
  const dueC=ids.filter(i=>c[i]&&c[i].reps>0&&c[i].due<=now).length;
  const seenC=ids.filter(i=>c[i]&&c[i].reps>0).length;
  return{total:ids.length,newC,dueC,seenC};
}
function isCategoryDone(k){
  const W=curW(),c=curCards();
  const ids=W.map((_,i)=>i).filter(i=>W[i][0]===k);
  return ids.length>0&&ids.every(i=>c[i]&&c[i].reps>0);
}
function isCategoryMastered(k){
  const W=curW(),c=curCards();
  const ids=W.map((_,i)=>i).filter(i=>W[i][0]===k);
  return ids.length>0&&ids.every(i=>c[i]&&c[i].iv>=MASTER_IV);
}
function categoryDueCount(k){
  const W=curW(),c=curCards(),now=Date.now();
  return W.map((_,i)=>i).filter(i=>W[i][0]===k&&c[i]&&c[i].reps>0&&c[i].due<=now).length;
}
function categoryMasteredSet(){
  const set=new Set();
  for(const k of Object.keys(curLang().cats))if(isCategoryDone(k))set.add(k);
  return set;
}
function buildMasteredSegments(keys){
  const segs=[];
  let runStart=null;
  for(let i=0;i<keys.length-1;i++){
    if(isCategoryDone(keys[i])){
      if(runStart===null)runStart=i;
    }else if(runStart!==null){
      segs.push([runStart,i]);runStart=null;
    }
  }
  if(runStart!==null)segs.push([runStart,keys.length-1]);
  return segs;
}

/* ---------- mijlpalen / badges ---------- */
const MASTER_MILESTONES=[10,25,50,100,200,350];
const STREAK_MILESTONES=[3,7,14,30,100];
function computeBadges(){
  const W=curW(),c=curCards();
  const totalMastered=W.filter((_,i)=>c[i]&&c[i].reps>0).length;
  const earned=[],next=[];
  let gotNextMaster=false;
  for(const m of MASTER_MILESTONES){
    if(totalMastered>=m)earned.push({icon:"📘",label:`${m} woorden`});
    else if(!gotNextMaster){next.push({icon:"📘",label:`${m} woorden`});gotNextMaster=true;}
  }
  let gotNextStreak=false;
  for(const s of STREAK_MILESTONES){
    if(S.streak>=s)earned.push({icon:"🔥",label:`${s} dagen`});
    else if(!gotNextStreak){next.push({icon:"🔥",label:`${s} dagen`});gotNextStreak=true;}
  }
  return{earned,next};
}

/* ---------- views ---------- */
const app=document.getElementById("app");
let view="home",queue=[],pos=0,flipped=false,sessDone=0,sessTotal=0,catFilter=null,checkResult=null;
let sessMode="mixed",sessLvl="Alles",popupCat=null,popupLvl="Alles",curIdx=0,nodePositions=[],pathH=0,CAT_KEYS=[];
let combo=0,sessBestCombo=0,sessStartTime=0,preSessionMastered=new Set(),justMasteredCats=[];
const reducedMotion=()=>window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const WALKER_Y_OFFSET=17;

function langSwitchHtml(){
  return `<div class="lang-switch">${LANG_ORDER.map(l=>`<button class="${l===S.lang?"on":""}" onclick="setLang('${l}')" aria-label="${LANGS[l].name}" title="${LANGS[l].name}">${LANGS[l].flag}</button>`).join("")}</div>`;
}
function header(){
  const dark=document.documentElement.dataset.theme==="dark";
  return `<header>
    <div class="header-left"><div class="logo">Taal<span>pad</span></div></div>
    <div class="header-right">
      ${langSwitchHtml()}
      <div class="streak ${S.streak>0?"hot":""}"><span class="flame">🔥</span> <b>${S.streak}</b> ${S.streak===1?"dag":"dagen"}</div>
      ${typeof window.__syncHeaderHtml==="function"?window.__syncHeaderHtml():""}
      <button class="theme-toggle" onclick="toggleTheme()" aria-label="Thema wisselen">${dark?"☀️":"🌙"}</button>
    </div>
  </header>`;
}

/* ---------- adventure path ---------- */
function buildPathD(pts){
  if(!pts.length)return"";
  let d=`M ${pts[0].x} ${pts[0].y}`;
  for(let i=1;i<pts.length;i++){
    const p0=pts[i-1],p1=pts[i];
    const mx=(p0.x+p1.x)/2,my=(p0.y+p1.y)/2;
    d+=` Q ${p0.x} ${p0.y} ${mx} ${my}`;
  }
  const last=pts[pts.length-1];
  d+=` T ${last.x} ${last.y}`;
  return d;
}
function updateTraveledPath(idx){
  const svg=document.querySelector(".path-svg");
  if(!svg)return;
  let travEl=svg.querySelector(".path-traveled");
  const d=idx>0?buildPathD(nodePositions.slice(0,idx+1)):"";
  if(!d){if(travEl)travEl.remove();return}
  if(!travEl){
    travEl=document.createElementNS("http://www.w3.org/2000/svg","path");
    travEl.setAttribute("class","path-traveled");
    svg.appendChild(travEl);
  }
  travEl.setAttribute("d",d);
  if(!reducedMotion()){
    try{
      const len=travEl.getTotalLength();
      travEl.style.transition="none";
      travEl.style.strokeDasharray=len;
      travEl.style.strokeDashoffset=len;
      void travEl.getBoundingClientRect();
      travEl.style.transition="stroke-dashoffset .6s cubic-bezier(.4,0,.2,1)";
      travEl.style.strokeDashoffset="0";
    }catch(e){}
  }
}
function selectNode(idx){
  const nodeEls=document.querySelectorAll(".node");
  const tappedEl=nodeEls[idx];
  if(tappedEl&&!reducedMotion()){
    tappedEl.classList.remove("tapped");
    void tappedEl.offsetWidth;
    tappedEl.classList.add("tapped");
    setTimeout(()=>tappedEl.classList.remove("tapped"),500);
  }
  if(idx===curIdx){openPopup(CAT_KEYS[idx]);return}
  const target=nodePositions[idx],walkerEl=document.getElementById("walker");
  curIdx=idx;curDeck().curNode=idx;save();
  nodeEls.forEach((n,i)=>n.classList.toggle("current",i===idx));
  updateTraveledPath(idx);
  if(!walkerEl||reducedMotion()){openPopup(CAT_KEYS[idx]);return}
  walkerEl.classList.add("walking");
  walkerEl.style.left=target.x+"%";
  walkerEl.style.top=((target.y-WALKER_Y_OFFSET)/pathH*100)+"%";
  setTimeout(()=>{walkerEl.classList.remove("walking");openPopup(CAT_KEYS[idx])},620);
}
function openPopup(k){popupCat=k;popupLvl="Alles";renderModal()}
function closePopup(){popupCat=null;const root=document.getElementById("modal-root");if(root)root.innerHTML=""}
function setPopupLvl(l){popupLvl=l;renderModal()}
function renderModal(){
  const k=popupCat,root=document.getElementById("modal-root"),W=curW(),c=curCards(),lang=curLang();
  if(!k||!root)return;
  const levels=[...new Set(W.filter(w=>w[0]===k).map(w=>w[1]))].sort();
  const chips=["Alles",...levels].map(l=>`<button class="chip ${popupLvl===l?"on":""}" onclick="setPopupLvl('${l}')">${LVL_LABEL[l]||l}</button>`).join("");
  const cnt=catCounts(k,popupLvl);
  const breakdown=levels.map(l=>{
    const ids=W.map((_,i)=>i).filter(i=>W[i][0]===k&&W[i][1]===l);
    const seen=ids.filter(i=>c[i]&&c[i].reps>0).length;
    const mast=ids.filter(i=>c[i]&&c[i].iv>=MASTER_IV).length;
    return `<div class="lvl-row"><span class="lvl-tag">${l}</span><div class="bar"><i style="width:${ids.length?Math.round(seen/ids.length*100):0}%"></i></div><span class="lvl-nums">${seen}/${ids.length} · ${mast} beheerst</span></div>`;
  }).join("");
  root.innerHTML=`<div class="modal-backdrop" onclick="if(event.target===this)closePopup()">
    <div class="modal">
      <button class="modal-close" onclick="closePopup()" aria-label="Sluiten">✕</button>
      <div class="modal-icon">${lang.catIcon[k]||"📘"}</div>
      <h2>${lang.cats[k]}</h2>
      <div class="lvl-breakdown">${breakdown}</div>
      <div class="chips" style="justify-content:center;margin:14px 0 4px">${chips}</div>
      <div class="modal-modes">
        <button class="mode-btn" ${cnt.newC===0?"disabled":""} onclick="startCategorySession('${k}','new','${popupLvl}')">🆕 Nieuwe woorden leren<small>${cnt.newC} nieuwe woorden</small></button>
        <button class="mode-btn" ${cnt.dueC===0?"disabled":""} onclick="startCategorySession('${k}','review','${popupLvl}')">🔁 Woorden herhalen<small>${cnt.dueC} te herhalen</small></button>
        <button class="mode-btn" ${cnt.seenC===0?"disabled":""} onclick="startCategorySession('${k}','check','${popupLvl}')">✅ Controleren<small>${cnt.seenC} woorden testen</small></button>
      </div>
    </div>
  </div>`;
}

const LANDMARK_EMOJIS=["🌳","🪨","🧭","🌼","🏔️"];
function artHtmlFor(art){return ART[art]?`<span class="art ${ART[art][1]}">${ART[art][0]}</span>`:""}

function home(){
  const lang=curLang(),W=curW(),cards=curCards();
  const due=dueIds().length,nw=newIds().length;
  const chips=["Alles","A1","A2","B1"].map(l=>`<button class="chip ${S.lvl===l?"on":""}" onclick="setLvl('${l}')">${l}</button>`).join("");
  const keys=Object.keys(lang.cats);
  const spacing=58,H=20+(keys.length-1)*spacing+26;
  const sideX=idx=>idx===0?50:(idx%2===1?34:66);
  nodePositions=keys.map((k,idx)=>({x:sideX(idx),y:12+idx*spacing}));
  pathH=H;CAT_KEYS=keys;
  const savedNode=curDeck().curNode;
  curIdx=(savedNode!=null&&savedNode<keys.length)?savedNode:0;
  const svgD=buildPathD(nodePositions);
  const traveledD=curIdx>0?buildPathD(nodePositions.slice(0,curIdx+1)):"";
  const masteredSegHtml=buildMasteredSegments(keys).map(([a,b])=>
    `<path class="path-mastered" d="${buildPathD(nodePositions.slice(a,b+1))}"/>`
  ).join("");
  const landmarksHtml=nodePositions.slice(0,-1).map((p0,i)=>{
    if(i%3!==1)return"";
    const p1=nodePositions[i+1];
    const mx=clamp((p0.x+p1.x)/2+(i%2===0?16:-16),6,94);
    const my=(p0.y+p1.y)/2;
    const marks=lang.landmarks||LANDMARK_EMOJIS;
    const emo=marks[Math.floor(i/3)%marks.length];
    return `<span class="landmark" style="left:${mx}%;top:${my/H*100}%;animation-delay:${(i*0.4)}s">${emo}</span>`;
  }).join("");
  let masteredCatCount=0;
  const nodesHtml=keys.map((k,idx)=>{
    const ids=W.map((_,i)=>i).filter(i=>W[i][0]===k);
    const seen=ids.filter(i=>cards[i]&&cards[i].reps>0).length;
    const mastered=ids.filter(i=>cards[i]&&cards[i].iv>=MASTER_IV).length;
    const pct=ids.length?Math.round(seen/ids.length*100):0;
    const catDone=ids.length>0&&seen===ids.length;
    const catIsMastered=ids.length>0&&mastered===ids.length;
    if(catDone)masteredCatCount++;
    const isNew=seen===0;
    const state=isNew?"state-new":(catDone?"state-done":"");
    const deep=catIsMastered?"deep-mastered":"";
    const bloom=justMasteredCats.includes(k)?"bloom":"";
    const dueHere=categoryDueCount(k);
    const badgeHtml=dueHere>0?`<span class="node-badge">${dueHere>99?"99+":dueHere}</span>`:"";
    const checkHtml=catDone?`<span class="node-check">✓</span>`:"";
    const ribbonHtml=idx===curIdx?`<span class="node-ribbon">Verder →</span>`:"";
    const lvls=[...new Set(ids.map(i=>W[i][1]))].sort().join(" · ");
    const icon=isNew?"🔒":(lang.catIcon[k]||"📘");
    const p=nodePositions[idx];
    return `<button class="node ${idx===curIdx?"current":""} ${state} ${deep} ${bloom}" style="left:${p.x}%;top:${p.y/H*100}%;--pct:${pct}" onclick="selectNode(${idx})" aria-label="${lang.cats[k]}">
      <span class="node-card">
        ${badgeHtml}${checkHtml}${ribbonHtml}
        <span class="node-icon">${icon}</span>
        <span class="node-body">
          <span class="node-title">${lang.cats[k]}</span>
          <span class="node-sub">${lvls}</span>
          <span class="node-stats">⚡ ${ids.length} woorden${dueHere>0?` · ${dueHere} te herhalen`:catIsMastered?" · beheerst":catDone?" · voltooid":""}</span>
        </span>
      </span>
    </button>`;
  }).join("");
  justMasteredCats=[];
  const wp=nodePositions[curIdx];
  const walkerHtml=`<div id="walker" class="walker" style="left:${wp.x}%;top:${(wp.y-WALKER_Y_OFFSET)/H*100}%">${renderWalkerContent()}</div>`;

  const dayIndex=Math.floor(Date.now()/864e5);
  const wotdIdx=dayIndex%W.length;
  const[wCat,wLvl,wArt,wTarget,wNl]=W[wotdIdx];

  const{earned,next}=computeBadges();
  const badgesHtml=[...earned.map(b=>`<span class="badge"><span class="badge-icon">${b.icon}</span>${b.label}</span>`),
    ...next.map(b=>`<span class="badge locked"><span class="badge-icon">${b.icon}</span>${b.label}</span>`)].join("");

  app.innerHTML=header()+`
  <div class="chips">${chips}</div>
  <div class="panel wotd">
    <div>
      <div class="wotd-badge">Woord van de dag</div>
      <div class="wotd-word">${artHtmlFor(wArt)}${wTarget}</div>
      <div class="wotd-nl">${wNl} · ${lang.cats[wCat]}</div>
    </div>
    ${speakerBtn(wTarget)}
  </div>
  <div class="home-layout">
    <div class="path-col">
      <div class="panel path-panel">
        <h2>Jouw pad</h2><div class="sub">Tik op een tegel om te oefenen</div>
        <div class="progress-path"><span>Voortgang</span><span>${masteredCatCount}/${keys.length} voltooid</span></div>
        <div class="bar bar-lg"><i style="width:${keys.length?Math.round(masteredCatCount/keys.length*100):0}%"></i></div>
        <div class="path-area" style="aspect-ratio:100/${H}">
          <svg class="path-svg" viewBox="0 0 100 ${H}"><path class="path-bg" d="${svgD}"/>${masteredSegHtml}${traveledD?`<path class="path-traveled" d="${traveledD}"/>`:""}</svg>
          ${landmarksHtml}
          ${nodesHtml}
          ${walkerHtml}
        </div>
      </div>
    </div>
    <div class="today-col">
      <div class="panel">
        <h2>Vandaag</h2><div class="sub">Herhalingen komen terug op het moment dat je ze bijna vergeet.</div>
        <div class="today-nums">
          <div class="tn due"><b>${due}</b><span>TE HERHALEN</span></div>
          <div class="tn"><b>${nw}</b><span>NIEUW IN SESSIE</span></div>
          <div class="tn"><b>${(S.log[today()]||{}).rev||0}</b><span>GEDAAN VANDAAG</span></div>
        </div>
        <div class="badges">${badgesHtml}</div>
        <button class="btn-main" style="margin-top:14px" ${due+nw===0?"disabled":""} onclick="startSession()">${due+nw===0?"Alles geleerd — kom terug voor herhalingen":"Start sessie ("+(due+nw)+" kaarten)"}</button>
        <button class="chip ${S.typeMode?"on":""}" onclick="toggleType()" style="margin-top:12px">Antwoord typen: ${S.typeMode?"aan":"uit"}</button>
        <span class="sub" style="font-size:12px;margin-left:8px">${S.typeMode?"traint spelling & precisie":"hardop zeggen, zelf beoordelen"}</span>
        ${lang.hasArticles&&lang.articleLegend?`<div class="legend">${lang.articleLegend.map(([code,label])=>`<span><i class="dot" style="background:var(${ART[code][1]==="a-der"?"--der":ART[code][1]==="a-die"?"--die":"--das"})"></i>${label}</span>`).join("")}<span style="margin-left:auto">leer het lidwoord als kleur mee</span></div>`:""}
      </div>
    </div>
  </div>
  ${lang.gramGuide?`<button class="reveal-btn" onclick="gramView()" style="margin:0 0 14px">Grammatica-gids · de ${lang.gramGuide.length} regels</button>`:""}
  <div class="method"><b style="color:var(--ink)">De methode.</b> ${lang.type==="grammatica"?`Je krijgt een vraag of situatie en haalt zelf het juiste antwoord en de regel uit je geheugen`:`Je ziet het Nederlands en haalt het ${lang.name} actief uit je geheugen`} — dat ophalen zelf is de training. Daarna beoordeel je jezelf eerlijk: het algoritme plant elk woord opnieuw in vlak vóór het vergeetmoment. Kort en dagelijks wint van lang en soms.</div>
  <footer><button onclick="resetAll()">Voortgang wissen</button></footer>
  <div id="modal-root"></div>
  ${memOnly?'<div class="note">Let op: opslag niet beschikbaar — voortgang geldt alleen voor deze sessie.</div>':""}`;
}
function setLvl(l){S.lvl=l;save();home()}
function startSession(){
  const q=[...dueIds(),...newIds()];
  if(!q.length)return;
  queue=q;sessMode="mixed";sessLvl=S.lvl;catFilter=null;
  pos=0;sessDone=0;sessTotal=q.length;flipped=false;checkResult=null;
  combo=0;sessBestCombo=0;sessStartTime=Date.now();preSessionMastered=categoryMasteredSet();
  view="sess";render();
}
function startCategorySession(k,mode,lvl){
  const W=curW(),c=curCards();
  const ids=W.map((_,i)=>i).filter(i=>W[i][0]===k&&(lvl==="Alles"||W[i][1]===lvl));
  const now=Date.now();
  let ids2;
  if(mode==="new")ids2=ids.filter(i=>!c[i]||c[i].reps===0).slice(0,NEW_PER_SESSION);
  else if(mode==="review")ids2=ids.filter(i=>c[i]&&c[i].reps>0&&c[i].due<=now);
  else if(mode==="check")ids2=ids.filter(i=>c[i]&&c[i].reps>0);
  else{
    const due=ids.filter(i=>c[i]&&c[i].reps>0&&c[i].due<=now);
    const nw=ids.filter(i=>!c[i]||c[i].reps===0).slice(0,NEW_PER_SESSION);
    ids2=[...due,...nw];
  }
  if(!ids2.length)return;
  queue=ids2;pos=0;sessDone=0;sessTotal=ids2.length;flipped=false;checkResult=null;
  combo=0;sessBestCombo=0;sessStartTime=Date.now();preSessionMastered=categoryMasteredSet();
  sessMode=mode;sessLvl=lvl;catFilter=k;
  closePopup();
  view="sess";render();
}
function render(){view==="home"?home():view==="sess"?sess():done()}

function revealCard(cb){
  const inner=document.querySelector(".card-inner");
  if(!inner||reducedMotion()){cb();return}
  inner.classList.add("is-flipped");
  setTimeout(cb,420);
}

function sess(){
  if(pos>=queue.length){view="done";render();return}
  const lang=curLang(),W=curW();
  const i=queue[pos],[cat,lvl,art,word,nl,note]=W[i],c=getCard(i);
  const artHtml=artHtmlFor(art);
  const forceType=sessMode==="check"||S.typeMode;
  let fb="";
  if(checkResult){
    if(checkResult.k==="perfect")fb=`<div class="answer-fb" style="color:var(--das)">Perfect — ook de spelling klopt</div>`;
    else if(checkResult.k==="close")fb=`<div class="answer-fb" style="color:var(--brass)">Bijna goed — let op spelling of hoofdletters.<br>Jij typte: &ldquo;${checkResult.t}&rdquo;</div>`;
    else fb=`<div class="answer-fb" style="color:var(--die)">Nog niet.${checkResult.t?`<br>Jij typte: &ldquo;${checkResult.t}&rdquo;`:""}</div>`;
  }
  const bottom=flipped
    ?(sessMode==="check"
      ?`<div class="hint" style="margin-top:14px">Volgende komt eraan…</div>`
      :`<div class="grades">
      <button class="grade g0" onclick="ans(0)">Opnieuw<small>${preview(c,0)}</small></button>
      <button class="grade g1" onclick="ans(1)">Moeilijk<small>${preview(c,1)}</small></button>
      <button class="grade g2" onclick="ans(2)">Goed<small>${preview(c,2)}</small></button>
      <button class="grade g3" onclick="ans(3)">Makkelijk<small>${preview(c,3)}</small></button>
    </div>`)
    :(forceType
      ?`<input id="typein" class="type-in" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${lang.type==='grammatica'?'Typ het antwoord':`Typ het ${lang.name}${lang.id==='de'?' (ae/oe/ue mag voor umlauten)':' antwoord'}`}" onkeydown="if(event.key==='Enter')checkTyped()">
        <div style="display:flex;gap:8px;margin-top:8px">
          <button class="reveal-btn" style="margin-top:0;flex:1" onclick="checkTyped()">Controleer</button>
          <button class="reveal-btn" style="margin-top:0;flex:0 0 auto;padding:14px 16px" onclick="dontKnow()">Weet ik niet</button>
        </div>`
      :`<button class="reveal-btn" onclick="flip()">Toon antwoord</button>`);
  const comboHtml=combo>=2?`<span class="combo-chip">🔥 ${combo} op rij!</span>`:"";
  app.innerHTML=header()+`
  <div class="sess-top"><span>${MODE_LABEL[sessMode]||""} · ${sessDone} / ${sessTotal}</span><div class="progress"><i style="width:${sessTotal?Math.round(sessDone/sessTotal*100):0}%"></i></div><button onclick="endSess()">stoppen</button></div>
  <div class="card" tabindex="0" ${!forceType&&!flipped?'onclick="flip()"':""}>
    ${comboHtml}
    <div class="cat-tag">${lang.cats[cat]} · ${lvl}${c.reps===0?" · nieuw":""}</div>
    <div class="card-flip-zone">
      <div class="card-inner ${flipped?"is-flipped":""}">
        <div class="card-face card-front">
          <div class="prompt">${nl}</div>
          <div class="hint">${forceType?(lang.type==='grammatica'?"Typ het antwoord hieronder":`Typ het ${lang.name}e antwoord hieronder`):"Zeg het antwoord hardop, tik dan om te checken"}</div>
        </div>
        <div class="card-face card-back">
          <div class="prompt prompt-small">${nl}</div>
          <div class="answer">${artHtml}${word}${speakerBtn(word)}</div>
          ${note?`<div class="gram-note">💡 ${note}</div>`:""}
          ${fb}
        </div>
      </div>
    </div>
  </div>${bottom}`;
  const ti=document.getElementById("typein");if(ti)ti.focus();
}
function checkTyped(){
  const el=document.getElementById("typein"),t=(el?el.value:"").trim();
  const [,,art,word]=curW()[queue[pos]];
  const strip=s=>s.replace(/[.,!?…'’"“”]/g,"").replace(/\s+/g," ").trim();
  const norm=s=>strip(s).toLowerCase().replace(/ä/g,"ae").replace(/ö/g,"oe").replace(/ü/g,"ue").replace(/ß/g,"ss");
  const targets=[word];if(ART[art])targets.push(ART[art][0]+" "+word);
  let k="wrong";
  for(const tg of targets){
    if(strip(t)===strip(tg)){k="perfect";break}
    if(norm(t)===norm(tg))k="close";
  }
  if(!t)k="wrong";
  checkResult={k,t};
  revealCard(()=>{
    flipped=true;render();
    if(sessMode==="check"){
      const g=k==="perfect"?3:k==="close"?2:0;
      ans(g);
    }
  });
}
function dontKnow(){
  checkResult={k:"wrong",t:""};
  revealCard(()=>{
    flipped=true;render();
    if(sessMode==="check")ans(0);
  });
}
function toggleType(){S.typeMode=!S.typeMode;save();home()}
function flip(){revealCard(()=>{flipped=true;render()})}
const CHEER_WORDS={3:["Geweldig!","Fantastisch!","Top!","Uitstekend!"],2:["Goed zo!","Mooi!","Prima!"],1:["Onthouden!","Bijna daar!"]};
function burstFx(el,g){
  const good=g===3;
  const n=good?13:8;
  const emojis=good?["✨","⭐","🎉","💫","🌟"]:["✓","✨","·"];
  for(let k=0;k<n;k++){
    const p=document.createElement("span");
    p.className="fx-particle";
    p.textContent=emojis[k%emojis.length];
    const angle=Math.random()*Math.PI*-1-Math.PI/4;
    const dist=40+Math.random()*70;
    p.style.setProperty("--dx",(Math.cos(angle)*dist)+"px");
    p.style.setProperty("--dy",(Math.sin(angle)*dist)+"px");
    p.style.setProperty("--rot",(Math.random()*60-30)+"deg");
    p.style.left="50%";p.style.top="42%";
    p.style.animationDelay=(Math.random()*80)+"ms";
    el.appendChild(p);
    setTimeout(()=>p.remove(),1000);
  }
  el.classList.add(good?"glow-gold":"glow-green","pop");
  setTimeout(()=>el.classList.remove("glow-gold","glow-green","pop"),500);
  const langCheer=curLang().cheer;
  const words=(langCheer&&langCheer[g])||(langCheer&&langCheer[2])||CHEER_WORDS[g]||CHEER_WORDS[2];
  const toast=document.createElement("div");
  toast.className="fx-toast";
  toast.style.color=good?"var(--brass)":"var(--das)";
  toast.textContent=words[Math.floor(Math.random()*words.length)];
  el.appendChild(toast);
  setTimeout(()=>toast.remove(),900);
}
function ans(g){
  const i=queue[pos];
  const cardEl=document.querySelector(".card");
  if(g===0)combo=0;else{combo++;sessBestCombo=Math.max(sessBestCombo,combo);}
  const proceed=()=>{
    grade(i,g);
    if(g===0)queue.push(i);else sessDone++;
    queue.splice(pos,1);
    flipped=false;checkResult=null;render();
  };
  if(reducedMotion()||!cardEl){proceed();return}
  if(g===0){cardEl.classList.add("shake");setTimeout(proceed,320)}
  else{burstFx(cardEl,g);if(g>=2)mascotReact("happy");setTimeout(proceed,380)}
}
function endSess(){catFilter=null;sessMode="mixed";view="home";render()}
function formatElapsed(ms){
  const s=Math.max(0,Math.round(ms/1000));
  return Math.floor(s/60)+":"+String(s%60).padStart(2,"0");
}
function done(){
  const nowMastered=categoryMasteredSet();
  justMasteredCats=[...nowMastered].filter(k=>!preSessionMastered.has(k));
  let more,continueCall;
  if(catFilter){
    const c=catCounts(catFilter,sessLvl);
    more=sessMode==="new"?c.newC:sessMode==="review"?c.dueC:sessMode==="check"?c.seenC:(c.dueC+c.newC);
    continueCall=`startCategorySession('${catFilter}','${sessMode}','${sessLvl}')`;
  }else{
    more=dueIds().length+newIds().length;
    continueCall=`startSession()`;
  }
  const elapsed=formatElapsed(Date.now()-sessStartTime);
  app.innerHTML=header()+`<div class="done panel"><h2>Sessie klaar</h2><div class="big">${sessDone}</div><div class="sub">streak: ${S.streak} ${S.streak===1?"dag":"dagen"}</div>
  <div class="summary-row">
    <div class="summary-item"><b>${sessDone}</b>kaarten</div>
    <div class="summary-item"><b>${sessBestCombo}</b>beste combo</div>
    <div class="summary-item"><b>${elapsed}</b>tijd</div>
  </div>
  ${more>0?`<button class="btn-main" style="margin-top:26px" onclick="${continueCall}">Nog een sessie (${more} kaarten)</button>`:""}
  <button class="btn-main btn-ghost" style="margin-top:${more>0?"10":"26"}px" onclick="catFilter=null;sessMode='mixed';view='home';render()">Terug naar overzicht</button></div>`;
  if(sessDone>0&&!reducedMotion()){
    const big=document.querySelector(".done .big");
    if(big)burstFx(big,3);
    mascotReact("cheer");
  }
}
function gramView(){
  const guide=curLang().gramGuide;
  if(!guide){view="home";render();return}
  const lessons=guide.map((l,n)=>{
    const ex=l[2].map(p=>{const[t,nlx]=p.split("|");return `<div style="margin:8px 0"><span style="font-family:'Fredoka One',cursive;font-size:17px">${t}</span><br><span style="color:var(--muted);font-size:13px">${nlx}</span></div>`}).join("");
    return `<div class="panel"><div class="cat-tag" style="font-size:11.5px;letter-spacing:1.2px;color:var(--brass-dim);text-transform:uppercase;margin-bottom:8px">Regel ${n+1}</div><h2 style="font-size:17px">${l[0]}</h2><p class="sub" style="margin:8px 0 12px;line-height:1.6">${l[1]}</p>${ex}</div>`;
  }).join("");
  app.innerHTML=header()+`<div class="sess-top"><span>Grammatica-gids</span><span></span><button onclick="view='home';render()">terug</button></div>${lessons}
  <button class="btn-main" onclick="startCategorySession('gram','mixed','Alles')">Oefen deze regels als drills</button>
  <div class="note" style="margin-top:10px">Tip: lees één regel, oefen dan de drills — regels beklijven pas door ze te gebruiken.</div>`;
}
function resetAll(){
  const lang=curLang();
  if(!confirm(`Alle ${lang.name}-voortgang wissen? (streak blijft staan)`))return;
  S.decks[S.lang]={cards:{},curNode:0};
  save();
  home();
}
document.addEventListener("keydown",e=>{
  if(view!=="sess")return;
  if(e.target&&e.target.id==="typein")return;
  const forceType=sessMode==="check"||S.typeMode;
  if(e.code==="Space"&&!flipped&&!forceType){e.preventDefault();flip()}
  else if(flipped&&sessMode!=="check"&&["1","2","3","4"].includes(e.key))ans(Number(e.key)-1);
});
window.setLvl=setLvl;window.setLang=setLang;window.startSession=startSession;window.startCategorySession=startCategorySession;window.selectNode=selectNode;window.setPopupLvl=setPopupLvl;window.closePopup=closePopup;window.flip=flip;window.ans=ans;window.endSess=endSess;window.resetAll=resetAll;window.render=render;window.gramView=gramView;window.checkTyped=checkTyped;window.dontKnow=dontKnow;window.toggleType=toggleType;window.toggleTheme=toggleTheme;window.speak=speak;
initTheme();
window.__bootApp=function(){load().then(()=>{document.documentElement.dataset.lang=S.lang;home();});};
if(typeof window.__syncBoot==="function")window.__syncBoot();else window.__bootApp();
