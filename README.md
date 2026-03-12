# MatemApp 🧮

Plataforma d'aplicacions de matemàtiques per a nens i nenes de 6–8 anys. Totes les apps comparteixen perfils, XP i medalles, i funcionen directament al navegador sense instal·lació.

🔗 **[Obre matemapp]([https://albertgodina.github.io/MatemApp/])**

---

## 📁 Estructura del projecte

```
matemapp/
├── index.html          ← Hub central: selector d'activitats i perfils
├── css/
│   └── shared.css      ← Tokens de disseny, components i animacions comuns
├── js/
│   └── shared.js       ← Perfils, XP, nivells, medalles i utilitats comunes
├── sumes/
│   └── index.html      ← App Sumes i Restes
├── taules/
│   └── index.html      ← App Taules de Multiplicar
└── geometria/
    └── index.html      ← App Geometria
```

Cada app funciona de manera independent (pot obrir-se directament) o des del hub central. Els perfils i el progrés es comparteixen entre totes les apps via `localStorage`.

---

## 🎯 Activitats

### ➕ Sumes i Restes — 1r–2n de primària
Practica sumes i restes amb representacions visuals manipulatives.

**Mons progressius:**
| Món | Rang | Desbloqueja quan... |
|-----|------|---------------------|
| 🌱 Món 1 | Fins a 10 | Disponible des del principi |
| 🌊 Món 2 | Fins a 20 | ≥ 75% d'encerts al Món 1 amb mínim 20 intents |
| 🌟 Món 3 | Fins a 100 | ≥ 75% d'encerts al Món 2 amb mínim 20 intents |

**Modes:** Pràctica lliure · Contra rellotge · Seqüencial · Mode errors

**Representacions visuals (Mons 1 i 2):**
- 🎨 **Regletes de Cuisenaire** — Una al costat de l'altra, colors oficials, alineades per la base. Per a sumes s'ajunten; per a restes la regreta B apareix desvanida
- 📏 **Recta numèrica** — Fletxes horitzontals animades: blava per al primer sumand, verda per al segon (sumes) o vermella cap a l'esquerra (restes)

---

### ✖️ Taules de Multiplicar — 3r–5è de primària
Practica totes les taules amb dificultat adaptativa.

**Modes:** Pràctica lliure · Contra rellotge · Mode errors · Repte progressiu · Mode presentació (per projectar)

---

### 🔷 Geometria — 1r–3r de primària
Aprèn les formes geomètriques de manera progressiva.

**Nivells:**
| Nivell | Formes |
|--------|--------|
| 🟦 Nivell 1 | Cercle, triangle, quadrat, rectangle |
| 🔷 Nivell 2 | Pentàgon, hexàgon, rombe, trapezi |
| 🌟 Nivell 3 | Totes les formes barrejades |

**Modes de joc:**
| Mode | Descripció |
|------|------------|
| 🔍 Reconèixer | Identifica la forma per nom |
| 🔢 Comptar | Quants costats o vèrtexs té? |
| 📋 Classificar | A quin grup pertany per nombre de costats? |
| 🪞 Simetria | Aquesta forma és simètrica? |

---

## 👤 Perfils compartits

- Múltiples perfils en el mateix dispositiu
- **XP i nivells globals**: cada encert en qualsevol app suma XP al perfil
- **11 nivells**: Estrella nova → Llegenda
- **Medalles** desbloqueables entre totes les apps
- Progrés per app visible al hub central

---

## 🏅 Medalles

### Globals (totes les apps)
| Medalla | Condició |
|---------|----------|
| ➕ Primera suma! | Primera partida a Sumes i Restes |
| ✖️ Primera taula! | Primera partida a Taules |
| 🔷 Primera forma! | Primera partida a Geometria |
| 🔥 Ratxa x5 | 5 encerts seguits en qualsevol app |
| 💥 Ratxa x10 | 10 encerts seguits |
| 💯 100 pts | 100 punts totals |
| 🏅 500 pts | 500 punts totals |
| 🥇 1000 pts | 1000 punts totals |
| 👑 5000 pts | 5000 punts totals |
| 🚀 Nivell 5 | Arribar al nivell 5 |
| ⭐ Llegenda! | Arribar al nivell 10 |
| 🗺️ Explorador/a | Jugar a les tres apps |
| ✨ Perfecte! | Partida sense errors (mínim 5) |
| ⚡ Llamp | 15 encerts en mode rellotge |

### Específiques de Geometria
| Medalla | Condició |
|---------|----------|
| 🔷 4 formes! | Conèixes les 4 formes bàsiques |
| 📐 Geòmetra! | Conèixes totes les formes |
| 🪞 Simetria! | Mestres de la simetria |
| ✨ Perfecte! | Partida sense errors |
| 🔥 Ratxa x5 | 5 encerts seguits a Geometria |

---

## 🚀 Desplegament a GitHub Pages

1. Fes un **fork** d'aquest repositori
2. Ves a **Settings → Pages**
3. Selecciona branca `main` i carpeta `/ (root)`
4. Guarda — l'app estarà disponible a `https://el-teu-usuari.github.io/matemapp`

Per provar canvis sense afectar la versió publicada, treballa a la branca `dev` i canvia l'origen de Pages temporalment.

---

## 🧠 Decisions pedagògiques

**Progressió controlada** — Cada món i nivell es desbloqueja per rendiment real, no per temps. L'alumne consolida cada etapa abans d'avançar.

**Dificultat adaptativa** — Les operacions i formes amb pitjor percentatge d'encerts apareixen amb més freqüència gràcies a un sistema de pesos.

**Representacions manipulatives** — Les regletes de Cuisenaire i la recta numèrica connecten el càlcul abstracte amb representacions visuals i concretes, seguint la progressió enactiu → icònic → simbòlic.

**Feedback en errors** — Quan l'alumne s'equivoca, la representació revela la resposta correcta i dona temps per observar-la, convertint l'error en una oportunitat d'aprenentatge.

**Mode presentació** — Permet al docent projectar les operacions a la pissarra i gestionar la participació col·lectiva amb marcador en temps real.

---

## 📊 Exportació per al docent

Cada app inclou un botó **Exportar progrés (CSV)** que genera un fitxer amb encerts, errors, precisió i temps per activitat. Compatible amb Excel, LibreOffice i Google Sheets.

---

## 🛠 Tecnologies

- HTML5, CSS3, JavaScript (Vanilla) — sense frameworks ni dependències
- SVG dinàmic per a formes geomètriques i recta numèrica
- `localStorage` per a persistència de dades i perfils compartits
- Compatible amb GitHub Pages sense build

---

## 🔗 Roadmap

- [ ] Divisions
- [ ] Fraccions bàsiques
- [ ] Mesures (longitud, pes, capacitat)
- [ ] Mode multijugador local

---

## 📄 Llicència

[MIT](LICENSE) — Lliure per usar, modificar i distribuir.
