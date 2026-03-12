/* ══════════════════════════════════════════════
   MATHKIDS — shared.js
   Shared: profiles, XP, levels, badges, theme
   All apps import this file.
══════════════════════════════════════════════ */

// ── CONSTANTS ──────────────────────────────
const MK_XP_LEVELS = [0, 80, 200, 400, 700, 1100, 1700, 2600, 3800, 5500, 8000];
const MK_LEVEL_NAMES = [
  'Estrella nova', 'Petita estrella', 'Estrella brillant', 'Estrella daurada',
  'Superestrella', 'Campió/a', 'Gran campió/a', 'Expert/a',
  'Mestre/a', 'Gran mestre/a', '★ Llegenda'
];

// Global badges pool — each app can define its own additional badges
const MK_BADGES_GLOBAL = [
  { id: 'first_sumes',    name: 'Primera suma!',   icon: '➕', desc: 'Primera partida a Sumes i Restes' },
  { id: 'first_taules',   name: 'Primera taula!',  icon: '✖️',  desc: 'Primera partida a Taules' },
  { id: 'first_geo',      name: 'Primera forma!',  icon: '🔷', desc: 'Primera partida a Geometria' },
  { id: 'streak5',        name: 'Ratxa x5',        icon: '🔥', desc: '5 encerts seguits en qualsevol app' },
  { id: 'streak10',       name: 'Ratxa x10',       icon: '💥', desc: '10 encerts seguits' },
  { id: 'pts100',         name: '100 pts',         icon: '💯', desc: '100 punts totals' },
  { id: 'pts500',         name: '500 pts',         icon: '🏅', desc: '500 punts totals' },
  { id: 'pts1000',        name: '1000 pts',        icon: '🥇', desc: '1000 punts totals' },
  { id: 'pts5000',        name: '5000 pts',        icon: '👑', desc: '5000 punts totals' },
  { id: 'lvl5',           name: 'Nivell 5',        icon: '🚀', desc: 'Arribar al nivell 5' },
  { id: 'lvl10',          name: 'Llegenda!',       icon: '⭐', desc: 'Arribar al nivell 10' },
  { id: 'all_apps',       name: 'Explorador/a',    icon: '🗺️',  desc: 'Jugar a les tres apps' },
  { id: 'noerrors',       name: 'Perfecte!',       icon: '✨', desc: 'Partida sense errors (mínim 5)' },
  { id: 'speed15',        name: 'Llamp',           icon: '⚡', desc: '15 encerts en mode rellotge' },
];

// ── STORAGE ─────────────────────────────────
const MK_STORAGE_KEY = 'mathkids_v1';

function mkLoadData() {
  try {
    return JSON.parse(localStorage.getItem(MK_STORAGE_KEY)) || { profiles: [], theme: 'light' };
  } catch { return { profiles: [], theme: 'light' }; }
}
function mkSaveData(d) {
  localStorage.setItem(MK_STORAGE_KEY, JSON.stringify(d));
}

// ── PROFILE ─────────────────────────────────
function mkDefaultProfile(name) {
  return {
    id: Date.now().toString(),
    name,
    points: 0,
    xp: 0,
    totalCorrect: 0,
    bestStreak: 0,
    badges: [],
    gamesPlayed: 0,
    appsPlayed: [],        // ['sumes','taules','geometria']
    // Per-app stats stored as flat keys: 'sumes_*', 'taules_*', 'geo_*'
    appStats: {},
    timerRecords: {},      // { sumes: N, taules: N }
    errors: [],            // { app, a, op, b, world, ... }
  };
}

function mkGetProfile(data, id) {
  return data.profiles.find(p => p.id === id) || null;
}

function mkSaveProfile(data, profile) {
  const idx = data.profiles.findIndex(p => p.id === profile.id);
  if (idx >= 0) data.profiles[idx] = profile;
  else data.profiles.push(profile);
  mkSaveData(data);
}

// ── XP & LEVELS ─────────────────────────────
function mkGetLevel(xp) {
  let lv = 0;
  for (let i = 0; i < MK_XP_LEVELS.length; i++) {
    if (xp >= MK_XP_LEVELS[i]) lv = i; else break;
  }
  return lv;
}
function mkLevelName(lv) { return MK_LEVEL_NAMES[Math.min(lv, MK_LEVEL_NAMES.length - 1)]; }
function mkXpForLevel(lv) { return MK_XP_LEVELS[Math.min(lv, MK_XP_LEVELS.length - 1)]; }
function mkXpPct(xp) {
  const lv = mkGetLevel(xp);
  if (lv >= MK_LEVEL_NAMES.length - 1) return 100;
  const lvXp   = mkXpForLevel(lv);
  const nextXp = mkXpForLevel(lv + 1);
  return Math.round(((xp - lvXp) / (nextXp - lvXp)) * 100);
}

// ── BADGES ──────────────────────────────────
function mkCheckBadge(profile, id, condition, earned) {
  if (condition && !profile.badges.includes(id)) {
    profile.badges.push(id);
    earned.push(id);
  }
}

// Check global badges — call this after each game session
// extraData: { appId, correct, wrong, streak, timerScore }
function mkCheckGlobalBadges(profile, extraData) {
  const earned = [];
  const { appId, correct, wrong, streak } = extraData;

  mkCheckBadge(profile, `first_${appId}`,  profile.gamesPlayed >= 1, earned);
  mkCheckBadge(profile, 'streak5',          profile.bestStreak >= 5,  earned);
  mkCheckBadge(profile, 'streak10',         profile.bestStreak >= 10, earned);
  mkCheckBadge(profile, 'pts100',           profile.points >= 100,    earned);
  mkCheckBadge(profile, 'pts500',           profile.points >= 500,    earned);
  mkCheckBadge(profile, 'pts1000',          profile.points >= 1000,   earned);
  mkCheckBadge(profile, 'pts5000',          profile.points >= 5000,   earned);
  mkCheckBadge(profile, 'lvl5',             mkGetLevel(profile.xp) >= 5,  earned);
  mkCheckBadge(profile, 'lvl10',            mkGetLevel(profile.xp) >= 10, earned);
  mkCheckBadge(profile, 'all_apps',         (profile.appsPlayed || []).length >= 3, earned);
  mkCheckBadge(profile, 'noerrors',         wrong === 0 && correct >= 5, earned);
  mkCheckBadge(profile, 'speed15',          extraData.mode === 'timer' && correct >= 15, earned);

  return earned;
}

// ── THEME ────────────────────────────────────
function mkApplyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  document.querySelectorAll('.theme-btn').forEach(b => {
    b.textContent = t === 'dark' ? '☀️' : '🌙';
  });
}
function mkToggleTheme() {
  const data = mkLoadData();
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  data.theme = next;
  mkSaveData(data);
  mkApplyTheme(next);
}
function mkInitTheme() {
  const data = mkLoadData();
  mkApplyTheme(data.theme || 'light');
}

// ── PROFILE UI HELPERS ───────────────────────
function mkEscHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function mkRenderProfileList({ containerId, data, currentProfileId, onSelect, onDelete, btnEnterId }) {
  const list = document.getElementById(containerId);
  const btnEnter = document.getElementById(btnEnterId);
  if (!data.profiles.length) {
    list.innerHTML = '<div class="empty-state">Crea el teu primer perfil!</div>';
    if (btnEnter) btnEnter.disabled = true;
    return;
  }
  list.innerHTML = data.profiles.map(p => {
    const lv = mkGetLevel(p.xp || 0);
    return `<div class="profile-item ${currentProfileId === p.id ? 'selected' : ''}"
      onclick="(${onSelect.toString()})('${p.id}')">
      <div class="profile-item-info">
        <div class="profile-avatar">${mkEscHtml(p.name[0].toUpperCase())}</div>
        <div>
          <div class="profile-name">${mkEscHtml(p.name)}</div>
          <div class="profile-pts">${p.points} pts · Niv.${lv}</div>
        </div>
      </div>
      <button class="profile-delete" onclick="event.stopPropagation();(${onDelete.toString()})('${p.id}')">🗑</button>
    </div>`;
  }).join('');
  if (btnEnter) btnEnter.disabled = !currentProfileId;
}

function mkRenderXpBar({ profile, barId, currentId, nextId, levelId }) {
  const xp = profile.xp || 0;
  const lv = mkGetLevel(xp);
  const pct = mkXpPct(xp);
  if (document.getElementById(barId))    document.getElementById(barId).style.width = pct + '%';
  if (document.getElementById(currentId)) document.getElementById(currentId).textContent = `${mkLevelName(lv)} · ${xp} XP`;
  if (document.getElementById(nextId)) {
    document.getElementById(nextId).textContent = lv < MK_LEVEL_NAMES.length - 1
      ? `Niv.${lv + 1}: ${mkXpForLevel(lv + 1)} XP` : '★ Màxim!';
  }
  if (document.getElementById(levelId)) document.getElementById(levelId).textContent = lv;
}

// ── LEVEL UP OVERLAY ─────────────────────────
function mkShowLevelUp(lv, cb) {
  const el = document.createElement('div');
  el.className = 'level-up-overlay';
  el.innerHTML = `<div class="level-up-card">
    <div class="level-up-emoji">🎉</div>
    <div class="level-up-title">Nivell ${lv}!</div>
    <div class="level-up-sub">${mkLevelName(lv)}</div>
    <button class="btn btn-primary" style="margin-top:22px;width:100%"
      onclick="this.closest('.level-up-overlay').remove();(${cb.toString()})()">Continuar →</button>
  </div>`;
  document.body.appendChild(el);
}

// ── MISC UTILS ───────────────────────────────
function mkGoTo(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}
function mkFormatTime(s) { return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); }
function mkShuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
function mkShowCombo(msg) {
  const el = document.createElement('div');
  el.className = 'combo-flash'; el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1300);
}

// ── BACK TO HUB ──────────────────────────────
// Each app calls this to show a "← Hub" link
function mkBackToHub(label = '← Inici') {
  // Determine relative path to root index
  const depth = window.location.pathname.split('/').filter(Boolean).length;
  // On GitHub Pages: /mathkids/sumes/ → depth 2 → '../' × 1
  const base = depth <= 1 ? './' : '../'.repeat(depth - 1);
  return `${base}index.html`;
}
