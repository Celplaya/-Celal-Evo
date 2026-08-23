/* ============================================================
   MASCOTTE — nu uit, klaar om aan te zetten.
   ============================================================
   Hoe zet ik straks mijn eigen SVG erin?
   1. Zet SHOW_MASCOT hieronder op true.
   2. Vervang de <svg>...</svg> in PLACEHOLDER_SVG (of maak een
      eigen MASCOT_SVG string) door jouw eigen tekening. Belangrijk:
        - Groepeer je onderdelen met deze class-namen, zodat de
          animaties automatisch werken:
            <g class="mascot-head">...</g>
            <g class="mascot-body">...</g>
            <g class="mascot-legs">
              <g class="mascot-leg mascot-leg-l">...</g>
              <g class="mascot-leg mascot-leg-r">...</g>
            </g>
            <g class="mascot-face">...</g>   (optioneel)
        - Gebruik fill="currentColor" (of stroke="currentColor")
          op de onderdelen die met het thema moeten meekleuren —
          de kleur komt dan automatisch uit --brass (via
          .mascot-svg{color:var(--brass)} in style.css).
        - Geef de <svg> zelf class="mascot-svg" en een viewBox
          (geen vaste width/height nodig, dat regelt de CSS).
   3. Zet MASCOT_SVG = `...jouw svg-string...` en klaar. De
      loop-animatie (de benen zwaaien via .mascot-leg-l/-r) en de
      hop-beweging (via de bestaande .walker/.char-classes in
      style.css) werken dan automatisch mee.
   ============================================================ */

const SHOW_MASCOT = false;

/* Simpele placeholder — een rond figuurtje met 2 beentjes, puur om
   de animatie-logica mee te testen. Blijft verborgen zolang
   SHOW_MASCOT false is. */
const PLACEHOLDER_SVG = `
<svg class="mascot-svg" viewBox="0 0 40 40" aria-hidden="true">
  <g class="mascot-legs">
    <g class="mascot-leg mascot-leg-l"><rect x="15" y="24" width="4" height="12" rx="2" fill="currentColor"/></g>
    <g class="mascot-leg mascot-leg-r"><rect x="21" y="24" width="4" height="12" rx="2" fill="currentColor"/></g>
  </g>
  <g class="mascot-body"><rect x="12" y="14" width="16" height="14" rx="7" fill="currentColor"/></g>
  <g class="mascot-head"><circle cx="20" cy="10" r="8" fill="currentColor"/></g>
  <g class="mascot-face">
    <circle cx="17" cy="9" r="1.3" fill="var(--panel)"/>
    <circle cx="23" cy="9" r="1.3" fill="var(--panel)"/>
  </g>
</svg>`;

/* Zet hier straks je eigen SVG-string in en laat MASCOT_SVG
   ernaar wijzen (of vervang PLACEHOLDER_SVG hierboven direct). */
const MASCOT_SVG = PLACEHOLDER_SVG;

/* Bouwt de inhoud van #walker. Zolang SHOW_MASCOT false is, blijft
   dit de bestaande emoji-placeholder (👣 al zichtbaar in de app),
   zodat er niets verandert aan hoe het er nu uitziet. */
function renderWalkerContent(){
  if(!SHOW_MASCOT)return `<span class="char">🚶</span><span class="char-shadow"></span>`;
  return `<span class="char">${MASCOT_SVG}</span><span class="char-shadow"></span>`;
}

/* Kleine reacties (blij bij goed antwoord, viering bij sessie-einde).
   Werkt nu als no-op zolang de mascotte uit staat — de aanroepen
   in app.js staan er al, dus zodra je 'm aanzet hoef je hier alleen
   nog een leuke class/animatie aan toe te voegen. */
function mascotReact(kind){
  if(!SHOW_MASCOT)return;
  const walkerEl=document.getElementById("walker");
  if(!walkerEl)return;
  const cls=kind==="cheer"?"mascot-cheer":"mascot-happy";
  walkerEl.classList.remove("mascot-happy","mascot-cheer");
  void walkerEl.offsetWidth;
  walkerEl.classList.add(cls);
  setTimeout(()=>walkerEl.classList.remove(cls),900);
}

window.SHOW_MASCOT=SHOW_MASCOT;
window.renderWalkerContent=renderWalkerContent;
window.mascotReact=mascotReact;
