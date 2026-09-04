/* ---------- PocketBase sync-laag ----------
   Zorgt dat je voortgang meesynct tussen apparaten via een zelf-gehoste
   PocketBase-server. De app blijft volledig werken zonder verbinding:
   lokale opslag (localStorage) blijft altijd de eerste bron van waarheid
   op dit apparaat, PocketBase is een write-through cache eroverheen.

   Raakt de spelmechaniek, styling of woordenschat niet aan — alleen hoe
   S (zie app.js) bewaard en opgehaald wordt, plus een klein inlogscherm. */

/* Basis-URL van PocketBase. De app wordt vanaf PocketBase zelf geserveerd
   (pb_public), dus "same origin" is de standaard. */
const POCKETBASE_URL = window.location.origin;
// Fallback voor lokaal ontwikkelen (bv. vanaf de Mac naar de NAS):
// const POCKETBASE_URL = "http://truenas-scale.tail5a4b66.ts.net:8090";

const pb = new PocketBase(POCKETBASE_URL);

const STATE_COLLECTION = "user_state";
const LOCAL_KEY = "wortschatz-v1";
const REACHABILITY_TIMEOUT_MS = 3000;
const PUSH_DEBOUNCE_MS = 1500;
const RETRY_INTERVAL_MS = 20000;

let stateRecordId = null;
let pendingBlob = null;
let pushTimer = null;
let retryTimer = null;
let syncStatus = "unknown"; // "ok" | "offline" | "unknown"

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), ms)),
  ]);
}

async function pbReachable() {
  try {
    await withTimeout(pb.health.check(), REACHABILITY_TIMEOUT_MS);
    return true;
  } catch (e) {
    return false;
  }
}

function setSyncStatus(s) {
  syncStatus = s;
  if (typeof render === "function" && view) {
    try {
      render();
    } catch (e) {}
  }
}

/* ---------- server-record ---------- */
async function ensureStateRecord() {
  const uid = pb.authStore.record && pb.authStore.record.id;
  if (!uid) throw new Error("niet ingelogd");
  try {
    const rec = await pb
      .collection(STATE_COLLECTION)
      .getFirstListItem(pb.filter("owner = {:uid}", { uid }));
    stateRecordId = rec.id;
    return rec;
  } catch (e) {
    if (e && e.status === 404) {
      const rec = await pb
        .collection(STATE_COLLECTION)
        .create({ owner: uid, data: {} });
      stateRecordId = rec.id;
      return rec;
    }
    throw e;
  }
}

/* ---------- write-through: lokale wijziging -> server ---------- */
function queuePush(blob) {
  pendingBlob = blob;
  clearTimeout(pushTimer);
  pushTimer = setTimeout(flushPush, PUSH_DEBOUNCE_MS);
}

async function flushPush() {
  if (!pb.authStore.isValid || pendingBlob === null) return;
  const blob = pendingBlob;
  try {
    if (!stateRecordId) await ensureStateRecord();
    await pb.collection(STATE_COLLECTION).update(stateRecordId, { data: blob });
    if (blob === pendingBlob) pendingBlob = null;
    clearTimeout(retryTimer);
    setSyncStatus("ok");
  } catch (e) {
    setSyncStatus("offline");
    scheduleRetry();
  }
}

function scheduleRetry() {
  clearTimeout(retryTimer);
  retryTimer = setTimeout(() => {
    if (pb.authStore.isValid && pendingBlob !== null) flushPush();
  }, RETRY_INTERVAL_MS);
}

window.addEventListener("online", () => {
  if (pb.authStore.isValid && pendingBlob !== null) flushPush();
});

/* Aangeroepen vanuit app.js's save() bij elke wijziging. */
window.__syncOnSave = function (stateObj) {
  if (!pb.authStore.isValid) return;
  queuePush(JSON.parse(JSON.stringify(stateObj)));
};

/* ---------- hydrateren bij opstarten/inloggen ---------- */
async function hydrateFromServer() {
  try {
    const rec = await ensureStateRecord();
    const serverData = rec.data;
    const hasServerData =
      serverData && typeof serverData === "object" && Object.keys(serverData).length > 0;
    const localRaw = localStorage.getItem(LOCAL_KEY);
    if (hasServerData) {
      // server is de bron van waarheid zodra je bent ingelogd
      localStorage.setItem(LOCAL_KEY, JSON.stringify(serverData));
    } else if (localRaw) {
      // eerste keer inloggen op dit apparaat, maar er stond al lokale
      // voortgang klaar (bv. de bestaande streak) -> die eerst omhoog duwen
      await pb.collection(STATE_COLLECTION).update(stateRecordId, {
        data: JSON.parse(localRaw),
      });
    }
    setSyncStatus("ok");
    return true;
  } catch (e) {
    setSyncStatus("offline");
    scheduleRetry();
    return false;
  }
}

function finishBoot() {
  window.__bootApp();
}

/* ---------- opstart-gate: wordt in plaats van de normale boot in app.js aangeroepen ---------- */
window.__syncBoot = async function () {
  const reachable = await pbReachable();
  if (!reachable) {
    setSyncStatus("offline");
    finishBoot();
    return;
  }
  if (pb.authStore.isValid) {
    await hydrateFromServer();
    finishBoot();
  } else {
    renderLoginScreen("login", "", false);
  }
};

/* ---------- inlogscherm (hergebruikt bestaande stijl-klassen) ---------- */
function friendlyAuthError(err, isRegister) {
  const status = err && err.status;
  if (status === 400 && isRegister) return "Kon geen account aanmaken — controleer je e-mailadres en gebruik een wachtwoord van minstens 8 tekens.";
  if (status === 400) return "Inloggen mislukt. Controleer je e-mailadres en wachtwoord.";
  if (status === 0 || !status) return "Kan de server niet bereiken. Probeer het later opnieuw of ga verder zonder in te loggen.";
  return "Er ging iets mis. Probeer het opnieuw.";
}

function renderLoginScreen(mode, errorMsg, midSession) {
  mode = mode || "login";
  const isRegister = mode === "register";
  const appEl = document.getElementById("app");
  appEl.innerHTML = `
    <div style="max-width:380px;margin:${midSession ? "24px" : "56px"} auto 0;padding:0 16px 40px">
      <div style="text-align:center;margin-bottom:20px">
        <div class="logo" style="display:inline-block">Taal<span>pad</span></div>
      </div>
      <div class="panel">
        <h2>${isRegister ? "Account aanmaken" : "Inloggen"}</h2>
        <div class="sub">Je voortgang synct dan automatisch tussen je apparaten.</div>
        <form id="auth-form" style="margin-top:16px;display:flex;flex-direction:column;gap:10px">
          <input type="email" id="auth-email" class="type-in" style="margin-top:0" placeholder="e-mailadres" autocomplete="username" required>
          <input type="password" id="auth-password" class="type-in" style="margin-top:0" placeholder="wachtwoord" autocomplete="${isRegister ? "new-password" : "current-password"}" required minlength="8">
          ${errorMsg ? `<div class="answer-fb" style="color:var(--die);margin-top:0;text-align:left">${errorMsg}</div>` : ""}
          <button type="submit" class="btn-main" style="margin-top:4px">${isRegister ? "Account aanmaken" : "Inloggen"}</button>
        </form>
        <button class="chip" id="auth-toggle" style="margin-top:14px;width:100%">${isRegister ? "Heb je al een account? Inloggen" : "Nog geen account? Registreren"}</button>
        <button class="chip" id="auth-skip" style="margin-top:8px;width:100%">${midSession ? "Annuleren" : "Later — gebruik dit apparaat offline"}</button>
      </div>
    </div>`;

  document.getElementById("auth-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("auth-email").value.trim();
    const password = document.getElementById("auth-password").value;
    const submitBtn = e.target.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    try {
      if (isRegister) {
        await pb.collection("users").create({ email, password, passwordConfirm: password });
        await pb.collection("users").authWithPassword(email, password);
      } else {
        await pb.collection("users").authWithPassword(email, password);
      }
      await hydrateFromServer();
      finishBoot();
    } catch (err) {
      renderLoginScreen(mode, friendlyAuthError(err, isRegister), midSession);
    }
  });
  document.getElementById("auth-toggle").addEventListener("click", () => {
    renderLoginScreen(isRegister ? "login" : "register", "", midSession);
  });
  document.getElementById("auth-skip").addEventListener("click", () => {
    if (midSession) render();
    else finishBoot();
  });
}

/* ---------- kleine login/uitlog-knop in de header ---------- */
window.__syncHeaderHtml = function () {
  if (!pb.authStore.isValid) {
    return `<button class="theme-toggle" onclick="__syncShowLoginFromHeader()" aria-label="Inloggen" title="Inloggen om te synchroniseren">☁️</button>`;
  }
  const email = (pb.authStore.record && pb.authStore.record.email) || "";
  const offline = syncStatus === "offline";
  return `<button class="theme-toggle" onclick="__syncHandleHeaderClick()" aria-label="Synchronisatie" title="${offline ? "Offline — synct opnieuw zodra je verbinding hebt" : "Ingelogd als " + email + " · klik om uit te loggen"}">${offline ? "⚠️" : "☁️"}</button>`;
};
window.__syncShowLoginFromHeader = function () {
  renderLoginScreen("login", "", true);
};
window.__syncHandleHeaderClick = function () {
  if (confirm("Uitloggen op dit apparaat? Je lokale voortgang blijft bewaard.")) {
    pb.authStore.clear();
    location.reload();
  }
};
