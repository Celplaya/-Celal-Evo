/* ---------- state & storage ---------- */
let S={cards:{},streak:0,lastDay:null,log:{},lvl:"Alles",typeMode:false,curNode:0};
let memOnly=false;
const today=()=>new Date().toISOString().slice(0,10);
async function load(){
  try{
    const raw=localStorage.getItem("wortschatz-v1");
    if(raw)S=Object.assign(S,JSON.parse(raw));
  }catch(e){memOnly=true;}
}
let saveT=null;
function save(){
  if(memOnly)return;
  clearTimeout(saveT);
  saveT=setTimeout(()=>{try{localStorage.setItem("wortschatz-v1",JSON.stringify(S))}catch(e){console.error("opslaan mislukt",e)}},350);
}

/* ---------- SRS (vereenvoudigde SM-2) ---------- */
function getCard(i){return S.cards[i]||(S.cards[i]={iv:0,ease:2.5,reps:0,due:0})}
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
    c.reps++;c.due=now+c.iv*864e5;
  }
  const d=today();
  if(!S.log[d]){S.log[d]={n:0,rev:0};
    S.streak = S.lastDay===yesterday()? S.streak+1 : (S.lastDay===d? S.streak : 1);
    S.lastDay=d;
  }
  S.log[d].rev++;
  save();
}
function yesterday(){const t=new Date();t.setDate(t.getDate()-1);return t.toISOString().slice(0,10)}
const inLvl=i=>S.lvl==="Alles"||W[i][1]===S.lvl;
function dueIds(){const n=Date.now();return W.map((_,i)=>i).filter(i=>S.cards[i]&&S.cards[i].reps>0&&S.cards[i].due<=n&&inLvl(i))}
function newIds(){
  // geen daglimiet meer — elke sessie brengt max NEW_PER_SESSION nieuwe kaarten
  return W.map((_,i)=>i).filter(i=>!S.cards[i]||S.cards[i].reps===0).filter(inLvl).slice(0,NEW_PER_SESSION);
}
function catCounts(k,lvl){
  const ids=W.map((_,i)=>i).filter(i=>W[i][0]===k&&(lvl==="Alles"||W[i][1]===lvl));
  const now=Date.now();
  const newC=ids.filter(i=>!S.cards[i]||S.cards[i].reps===0).length;
  const dueC=ids.filter(i=>S.cards[i]&&S.cards[i].reps>0&&S.cards[i].due<=now).length;
  const seenC=ids.filter(i=>S.cards[i]&&S.cards[i].reps>0).length;
  return{total:ids.length,newC,dueC,seenC};
}

/* ---------- views ---------- */
const app=document.getElementById("app");
let view="home",queue=[],pos=0,flipped=false,sessDone=0,sessTotal=0,catFilter=null,checkResult=null;
let sessMode="mixed",sessLvl="Alles",popupCat=null,popupLvl="Alles",curIdx=0,nodePositions=[],pathH=0,CAT_KEYS=[];
const reducedMotion=()=>window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));

function header(){
  return `<header><div class="logo">Wort<span>schatz</span></div><div class="streak">streak <b>${S.streak}</b> ${S.streak===1?"dag":"dagen"}</div></header>`;
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
  if(d){
    if(!travEl){
      travEl=document.createElementNS("http://www.w3.org/2000/svg","path");
      travEl.setAttribute("class","path-traveled");
      svg.appendChild(travEl);
    }
    travEl.setAttribute("d",d);
  }else if(travEl){
    travEl.remove();
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
  curIdx=idx;S.curNode=idx;save();
  nodeEls.forEach((n,i)=>n.classList.toggle("current",i===idx));
  updateTraveledPath(idx);
  if(!walkerEl||reducedMotion()){openPopup(CAT_KEYS[idx]);return}
  walkerEl.classList.add("walking");
  walkerEl.style.left=target.x+"%";
  walkerEl.style.top=(target.y/pathH*100)+"%";
  setTimeout(()=>{walkerEl.classList.remove("walking");openPopup(CAT_KEYS[idx])},620);
}
function openPopup(k){popupCat=k;popupLvl="Alles";renderModal()}
function closePopup(){popupCat=null;const root=document.getElementById("modal-root");if(root)root.innerHTML=""}
function setPopupLvl(l){popupLvl=l;renderModal()}
function renderModal(){
  const k=popupCat,root=document.getElementById("modal-root");
  if(!k||!root)return;
  const levels=[...new Set(W.filter(w=>w[0]===k).map(w=>w[1]))].sort();
  const chips=["Alles",...levels].map(l=>`<button class="chip ${popupLvl===l?"on":""}" onclick="setPopupLvl('${l}')">${LVL_LABEL[l]||l}</button>`).join("");
  const c=catCounts(k,popupLvl);
  const breakdown=levels.map(l=>{
    const ids=W.map((_,i)=>i).filter(i=>W[i][0]===k&&W[i][1]===l);
    const seen=ids.filter(i=>S.cards[i]&&S.cards[i].reps>0).length;
    const mast=ids.filter(i=>S.cards[i]&&S.cards[i].iv>=MASTER_IV).length;
    return `<div class="lvl-row"><span class="lvl-tag">${l}</span><div class="bar"><i style="width:${ids.length?Math.round(seen/ids.length*100):0}%"></i></div><span class="lvl-nums">${seen}/${ids.length} · ${mast} beheerst</span></div>`;
  }).join("");
  root.innerHTML=`<div class="modal-backdrop" onclick="if(event.target===this)closePopup()">
    <div class="modal">
      <button class="modal-close" onclick="closePopup()" aria-label="Sluiten">✕</button>
      <div class="modal-icon">${CAT_ICON[k]||"📘"}</div>
      <h2>${CATS[k]}</h2>
      <div class="lvl-breakdown">${breakdown}</div>
      <div class="chips" style="justify-content:center;margin:14px 0 4px">${chips}</div>
      <div class="modal-modes">
        <button class="mode-btn" ${c.newC===0?"disabled":""} onclick="startCategorySession('${k}','new','${popupLvl}')">🆕 Nieuwe woorden leren<small>${c.newC} nieuwe woorden</small></button>
        <button class="mode-btn" ${c.dueC===0?"disabled":""} onclick="startCategorySession('${k}','review','${popupLvl}')">🔁 Woorden herhalen<small>${c.dueC} te herhalen</small></button>
        <button class="mode-btn" ${c.seenC===0?"disabled":""} onclick="startCategorySession('${k}','check','${popupLvl}')">✅ Controleren<small>${c.seenC} woorden testen</small></button>
      </div>
    </div>
  </div>`;
}

function home(){
  const due=dueIds().length,nw=newIds().length;
  const chips=["Alles","A1","A2","B1"].map(l=>`<button class="chip ${S.lvl===l?"on":""}" onclick="setLvl('${l}')">${l}</button>`).join("");
  const keys=Object.keys(CATS);
  const spacing=34,H=16+(keys.length-1)*spacing+18;
  nodePositions=keys.map((k,idx)=>({x:clamp(50+Math.sin(idx*0.9)*28,16,84),y:10+idx*spacing}));
  pathH=H;CAT_KEYS=keys;
  curIdx=(S.curNode!=null&&S.curNode<keys.length)?S.curNode:0;
  const svgD=buildPathD(nodePositions);
  const traveledD=curIdx>0?buildPathD(nodePositions.slice(0,curIdx+1)):"";
  const nodesHtml=keys.map((k,idx)=>{
    const ids=W.map((_,i)=>i).filter(i=>W[i][0]===k);
    const seen=ids.filter(i=>S.cards[i]&&S.cards[i].reps>0).length;
    const pct=ids.length?Math.round(seen/ids.length*100):0;
    const lvls=[...new Set(ids.map(i=>W[i][1]))].sort().join("·");
    const p=nodePositions[idx];
    return `<button class="node ${idx===curIdx?"current":""}" style="left:${p.x}%;top:${p.y/H*100}%;--pct:${pct}" onclick="selectNode(${idx})" aria-label="${CATS[k]}">
      <span class="node-ring"><span class="node-face">${CAT_ICON[k]||"📘"}</span></span>
      <span class="node-label">${CATS[k]}</span>
      <span class="node-lvl">${lvls}</span>
    </button>`;
  }).join("");
  const wp=nodePositions[curIdx];
  const walkerHtml=`<div id="walker" class="walker" style="left:${wp.x}%;top:${wp.y/H*100}%"><span class="char">🚶</span><span class="char-shadow"></span></div>`;
  app.innerHTML=header()+`
  <div class="chips">${chips}</div>
  <div class="home-layout">
    <div class="path-col">
      <div class="panel path-panel">
        <h2>Jouw pad</h2><div class="sub">Tik op een tegel om te oefenen — je figuurtje loopt er naartoe</div>
        <div class="path-area" style="aspect-ratio:100/${H}">
          <svg class="path-svg" viewBox="0 0 100 ${H}"><path class="path-bg" d="${svgD}"/>${traveledD?`<path class="path-traveled" d="${traveledD}"/>`:""}</svg>
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
        <button class="btn-main" ${due+nw===0?"disabled":""} onclick="startSession()">${due+nw===0?"Alles geleerd — kom terug voor herhalingen":"Start sessie ("+(due+nw)+" kaarten)"}</button>
        <button class="chip ${S.typeMode?"on":""}" onclick="toggleType()" style="margin-top:12px">Antwoord typen: ${S.typeMode?"aan":"uit"}</button>
        <span class="sub" style="font-size:12px;margin-left:8px">${S.typeMode?"traint spelling & precisie":"hardop zeggen, zelf beoordelen"}</span>
        <div class="legend"><span><i class="dot" style="background:var(--der)"></i>der</span><span><i class="dot" style="background:var(--die)"></i>die</span><span><i class="dot" style="background:var(--das)"></i>das</span><span style="margin-left:auto">leer het lidwoord als kleur mee</span></div>
      </div>
    </div>
  </div>
  <button class="reveal-btn" onclick="gramView()" style="margin:0 0 14px">Grammatica-gids · de 6 regels</button>
  <div class="method"><b style="color:var(--ink)">De methode.</b> Je ziet het Nederlands en haalt het Duits actief uit je geheugen — dat ophalen zelf is de training. Daarna beoordeel je jezelf eerlijk: het algoritme plant elk woord opnieuw in vlak vóór het vergeetmoment. Kort en dagelijks wint van lang en soms.</div>
  <footer><button onclick="resetAll()">Voortgang wissen</button></footer>
  <div id="modal-root"></div>
  ${memOnly?'<div class="note">Let op: opslag niet beschikbaar — voortgang geldt alleen voor deze sessie.</div>':""}`;
}
function setLvl(l){S.lvl=l;save();home()}
function startSession(){
  const q=[...dueIds(),...newIds()];
  if(!q.length)return;
  queue=q;sessMode="mixed";sessLvl=S.lvl;catFilter=null;
  pos=0;sessDone=0;sessTotal=q.length;flipped=false;checkResult=null;view="sess";render();
}
function startCategorySession(k,mode,lvl){
  const ids=W.map((_,i)=>i).filter(i=>W[i][0]===k&&(lvl==="Alles"||W[i][1]===lvl));
  const now=Date.now();
  let ids2;
  if(mode==="new")ids2=ids.filter(i=>!S.cards[i]||S.cards[i].reps===0).slice(0,NEW_PER_SESSION);
  else if(mode==="review")ids2=ids.filter(i=>S.cards[i]&&S.cards[i].reps>0&&S.cards[i].due<=now);
  else if(mode==="check")ids2=ids.filter(i=>S.cards[i]&&S.cards[i].reps>0);
  else{
    const due=ids.filter(i=>S.cards[i]&&S.cards[i].reps>0&&S.cards[i].due<=now);
    const nw=ids.filter(i=>!S.cards[i]||S.cards[i].reps===0).slice(0,NEW_PER_SESSION);
    ids2=[...due,...nw];
  }
  if(!ids2.length)return;
  queue=ids2;pos=0;sessDone=0;sessTotal=ids2.length;flipped=false;checkResult=null;
  sessMode=mode;sessLvl=lvl;catFilter=k;
  closePopup();
  view="sess";render();
}
function render(){view==="home"?home():view==="sess"?sess():done()}
function sess(){
  if(pos>=queue.length){view="done";render();return}
  const i=queue[pos],[cat,lvl,art,de,nl]=W[i],c=getCard(i);
  const artHtml=ART[art]?`<span class="art ${ART[art][1]}">${ART[art][0]}</span>`:"";
  const forceType=sessMode==="check"||S.typeMode;
  let fb="";
  if(flipped&&checkResult){
    if(checkResult.k==="perfect")fb=`<div class="hint" style="color:var(--das)">Perfect — ook de spelling klopt</div>`;
    else if(checkResult.k==="close")fb=`<div class="hint" style="color:var(--brass)">Bijna goed — let op spelling of hoofdletters.<br>Jij typte: &ldquo;${checkResult.t}&rdquo;</div>`;
    else fb=`<div class="hint" style="color:var(--die)">Nog niet.${checkResult.t?`<br>Jij typte: &ldquo;${checkResult.t}&rdquo;`:""}</div>`;
  }
  const bottom=flipped
    ?(sessMode==="check"
      ?`<div class="hint" style="margin-top:14px">Volgende komt eraan…</div>`
      :`<div class="grades">
      <button class="grade g0" onclick="ans(0)">Opnieuw<small>${preview(c,0)}</small></button>
      <button class="grade" onclick="ans(1)">Moeilijk<small>${preview(c,1)}</small></button>
      <button class="grade" onclick="ans(2)">Goed<small>${preview(c,2)}</small></button>
      <button class="grade g3" onclick="ans(3)">Makkelijk<small>${preview(c,3)}</small></button>
    </div>`)
    :(forceType
      ?`<input id="typein" class="type-in" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Typ het Duits (ae/oe/ue mag voor umlauten)" onkeydown="if(event.key==='Enter')checkTyped()">
        <div style="display:flex;gap:8px;margin-top:8px">
          <button class="reveal-btn" style="margin-top:0;flex:1" onclick="checkTyped()">Controleer</button>
          <button class="reveal-btn" style="margin-top:0;flex:0 0 auto;padding:14px 16px" onclick="dontKnow()">Weet ik niet</button>
        </div>`
      :`<button class="reveal-btn" onclick="flip()">Toon antwoord</button>`);
  app.innerHTML=header()+`
  <div class="sess-top"><span>${MODE_LABEL[sessMode]||""} · ${sessDone} / ${sessTotal}</span><div class="progress"><i style="width:${sessTotal?Math.round(sessDone/sessTotal*100):0}%"></i></div><button onclick="endSess()">stoppen</button></div>
  <div class="card" tabindex="0" ${!forceType&&!flipped?'onclick="flip()"':""}>
    <div class="cat-tag">${CATS[cat]} · ${lvl}${c.reps===0?" · nieuw":""}</div>
    <div class="prompt">${nl}</div>
    ${flipped?`<div class="answer">${artHtml}${de}</div>${fb}`:`<div class="hint">${forceType?"Typ het Duitse antwoord hieronder":"Zeg het antwoord hardop, tik dan om te checken"}</div>`}
  </div>${bottom}`;
  const ti=document.getElementById("typein");if(ti)ti.focus();
}
function checkTyped(){
  const el=document.getElementById("typein"),t=(el?el.value:"").trim();
  const [,,art,de]=W[queue[pos]];
  const strip=s=>s.replace(/[.,!?…'’"“”]/g,"").replace(/\s+/g," ").trim();
  const norm=s=>strip(s).toLowerCase().replace(/ä/g,"ae").replace(/ö/g,"oe").replace(/ü/g,"ue").replace(/ß/g,"ss");
  const targets=[de];if(ART[art])targets.push(ART[art][0]+" "+de);
  let k="wrong";
  for(const tg of targets){
    if(strip(t)===strip(tg)){k="perfect";break}
    if(norm(t)===norm(tg))k="close";
  }
  if(!t)k="wrong";
  checkResult={k,t};flipped=true;render();
  if(sessMode==="check"){
    const g=k==="perfect"?3:k==="close"?2:0;
    ans(g);
  }
}
function dontKnow(){
  checkResult={k:"wrong",t:""};flipped=true;render();
  if(sessMode==="check")ans(0);
}
function toggleType(){S.typeMode=!S.typeMode;save();home()}
function flip(){flipped=true;render()}
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
  const words=CHEER_WORDS[g]||CHEER_WORDS[2];
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
  const proceed=()=>{
    grade(i,g);
    if(g===0)queue.push(i);else sessDone++;
    queue.splice(pos,1);
    flipped=false;checkResult=null;render();
  };
  if(reducedMotion()||!cardEl){proceed();return}
  if(g===0){cardEl.classList.add("shake");setTimeout(proceed,320)}
  else{burstFx(cardEl,g);setTimeout(proceed,380)}
}
function endSess(){catFilter=null;sessMode="mixed";view="home";render()}
function done(){
  let more,continueCall;
  if(catFilter){
    const c=catCounts(catFilter,sessLvl);
    more=sessMode==="new"?c.newC:sessMode==="review"?c.dueC:sessMode==="check"?c.seenC:(c.dueC+c.newC);
    continueCall=`startCategorySession('${catFilter}','${sessMode}','${sessLvl}')`;
  }else{
    more=dueIds().length+newIds().length;
    continueCall=`startSession()`;
  }
  app.innerHTML=header()+`<div class="done panel"><h2>Sessie klaar</h2><div class="big">${sessDone}</div><div class="sub">kaarten geoefend · streak: ${S.streak} ${S.streak===1?"dag":"dagen"}</div>
  ${more>0?`<button class="btn-main" style="margin-top:26px" onclick="${continueCall}">Nog een sessie (${more} kaarten)</button>`:""}
  <button class="btn-main" style="margin-top:${more>0?"10":"26"}px;background:transparent;color:var(--ink);border:1px solid var(--line)" onclick="catFilter=null;sessMode='mixed';view='home';render()">Terug naar overzicht</button></div>`;
  if(sessDone>0&&!reducedMotion()){
    const big=document.querySelector(".done .big");
    if(big)burstFx(big,3);
  }
}
function gramView(){
  const lessons=GRAM.map((l,n)=>{
    const ex=l[2].map(p=>{const[de,nl]=p.split("|");return `<div style="margin:8px 0"><span style="font-family:'Fraunces',serif;font-size:17px">${de}</span><br><span style="color:var(--muted);font-size:13px">${nl}</span></div>`}).join("");
    return `<div class="panel"><div class="cat-tag" style="font-size:11.5px;letter-spacing:1.2px;color:var(--brass-dim);text-transform:uppercase;margin-bottom:8px">Regel ${n+1}</div><h2 style="font-size:17px">${l[0]}</h2><p class="sub" style="margin:8px 0 12px;line-height:1.6">${l[1]}</p>${ex}</div>`;
  }).join("");
  app.innerHTML=header()+`<div class="sess-top"><span>Grammatica-gids</span><span></span><button onclick="view='home';render()">terug</button></div>${lessons}
  <button class="btn-main" onclick="startCategorySession('gram','mixed','Alles')">Oefen deze regels als drills</button>
  <div class="note" style="margin-top:10px">Tip: lees één regel, oefen dan de drills — regels beklijven pas door ze te gebruiken.</div>`;
}
function resetAll(){
  if(!confirm("Alle voortgang en je streak wissen?"))return;
  S={cards:{},streak:0,lastDay:null,log:{},lvl:S.lvl,typeMode:S.typeMode,curNode:0};
  try{localStorage.setItem("wortschatz-v1",JSON.stringify(S))}catch(e){}
  home();
}
document.addEventListener("keydown",e=>{
  if(view!=="sess")return;
  if(e.target&&e.target.id==="typein")return;
  const forceType=sessMode==="check"||S.typeMode;
  if(e.code==="Space"&&!flipped&&!forceType){e.preventDefault();flip()}
  else if(flipped&&sessMode!=="check"&&["1","2","3","4"].includes(e.key))ans(Number(e.key)-1);
});
window.setLvl=setLvl;window.startSession=startSession;window.startCategorySession=startCategorySession;window.selectNode=selectNode;window.setPopupLvl=setPopupLvl;window.closePopup=closePopup;window.flip=flip;window.ans=ans;window.endSess=endSess;window.resetAll=resetAll;window.render=render;window.gramView=gramView;window.checkTyped=checkTyped;window.dontKnow=dontKnow;window.toggleType=toggleType;
load().then(home);
