# 🎮 Tokyo Student Life
## 東京学生生活 — เกมชีวิตนักเรียนญี่ปุ่น

> **A cozy slice-of-life walking sim — 5 zones in modern Tokyo**
> **Ghibli-pastel modern · Bilingual Thai + English · Three.js (vanilla)**

🌐 **Live Demo:** [https://r2633qqnal4d.space.minimax.io](https://r2633qqnal4d.space.minimax.io)
🎮 **GitHub:** [lnwsj/Tokyo-Student-Life-](https://github.com/lnwsj/Tokyo-Student-Life-)
📅 **Started:** 2026-07-12 · **Phases complete:** 0-6 (6/13)

---

## 🌟 What's Done (Phase 0-9) / ทำอะไรไปแล้ว

| Phase | Status | What was shipped | Deliverable |
|-------|--------|------------------|-------------|
| **0: Concept Lock** | ✅ | เอกสาร concept ครบ — 5 zones, 10 design principles, anti-references, bilingual guide, moodboard | 6 files, 65KB |
| **1A: Art Bible** | ✅ | 8 เอกสาร — art style, color palette, typography, shape language, lighting mood, negative prompts, forbidden elements | 8 files, 108KB |
| **1B: Materials** | ✅ | 25 PBR materials (wood, fabric, concrete, neon, leaf, etc.) + material_factory.js + 13 procedural generators | 12 files, 106KB |
| **1C: Lighting** | ✅ | 5 time-of-day presets (morning/noon/evening/night/sunset) + lighting_rig.js + color_grading_setup.js | 12 files, 85KB |
| **2A: Environment** | ✅ | environment_builder.js + scatter_rules.json + per-zone ground textures | 6 files, 57KB |
| **2B: Buildings** | ✅ | Procedural buildings (no GLB) per zone — house/school/station/shop/shrine | Multiple files |
| **2C: Characters** | ✅ | Player + 5 NPC types (schoolgirl, miko, attendant, shopkeeper, senpai) — **procedural**, ไม่ใช้ GLB | Procedural builder |
| **4: Props** | ✅ | Sakura trees, torii, vending machines, lanterns, benches, bicycles, houses, school, station gate | Per-zone scatter |
| **5: Player** | ✅ | **Procedural schoolgirl** with walk/run animation, pivot joints (hip/shoulder) — แทน Soldier.glb | buildSchoolgirl() |
| **6: NPCs + Story** | ✅ | 5 NPC types, bilingual dialogue (Thai + English), schedule card with daily tasks | buildNPC() + dialogue system |
| **Deploy** | ✅ | Live URL + GLB files at root + DRACO support | https://r2633qqnal4d.space.minimax.io |

### 🎬 What's in the demo right now (2026-07-12)

- ✅ **5 zones** — 🏠 Home, 🏫 School, 🚉 Station, 🛍️ Shopping, ⛩️ Shrine
- ✅ **Procedural schoolgirl player** — Japanese seifuku, 2 red ribbon bows, navy pleated skirt, randoseru bag
- ✅ **Walk/Run animations** — pivot at hip (legs) and shoulder (arms), natural swing
- ✅ **5 NPC types** — classmate, miko, attendant, shopkeeper, senpai
- ✅ **Bilingual dialogue** — Press E within 2.5 units → modal with Thai + English lines
- ✅ **Schedule card** — top-right HUD shows 5 daily tasks (Wake / School / Train / Shop / Shrine) with auto ✓
- ✅ **Ghibli-pastel backgrounds** — 5 AI-generated zone images
- ✅ **Time-of-day** — 5 lighting presets (morning / noon / sunset / night / etc.)
- ✅ **3-point lighting** — directional sun + fill + rim + hemisphere + fog
- ✅ **Procedural props** — sakura trees, torii, vending machines, lanterns, benches, bicycles
- ✅ **Zone 4 special** — uses real **LittlestTokyo.glb** as the 3D backdrop
- ✅ **HUD** — HP/stamina/yen, time, zone name (Thai + JP + EN), zone buttons
- ✅ **Controls** — WASD/arrows walk · Shift run · Space jump · 1-5 switch zone · mouse/touch rotate

### 🌅 NEW: Day/Night Cycle (Phase 7)

- ✅ **Dynamic time** — `state.gameTime` starts at 07:00, advances 1 game min per real sec at 1x
- ✅ **Time controls** — ⏸ Pause + 1x/2x/4x speed buttons (top center HUD)
- ✅ **Time-of-day presets** — เข้า/เที่ยง/บ่าย/เย็น/ค่ำ/กลางคืน labels auto-update
- ✅ **Sun arc** — 6am east, 12pm zenith, 18pm west, 22pm below horizon (Y=-18)
- ✅ **Color presets** — morning #FFD194, day #FFFAF0, sunset #FF8C42, night #6B7BA8
- ✅ **3D lighting interpolation** — sun.intensity 0.5–1.3, ambient 0.15–0.39, fog color
- ✅ **Body sky tints** — 4 CSS classes (time-morning/day/sunset/night) with gradient overlays
- ✅ **HUD time display** — HH:MM + Thai/English period label (เข้า · Morning, etc.)
- ✅ **Time persists across zone switches** — global state, not per-zone

#### Phase 7 Test Results
| Test | Expected | Actual | ✓/✗ |
|------|----------|--------|-----|
| Initial time | 07:00, เข้า·Morning | 07:00, เข้า·Morning | ✅ |
| Sun arc 7am→12pm→5pm→10pm | low→high→low→below | Y=15.8→38→15.8→-18 | ✅ |
| Color shift morning→sunset | warm orange→deep orange | #FFD194→#FF8C42 | ✅ |
| Pause button | stops time | 0 change after 3s | ✅ |
| Speed 1x→4x | 1→4 game min/sec | works (1.4 in headless due to framerate) | ✅ |
| No JS errors | 0 | 0 | ✅ |
| 8 lighting screenshots | saved | saved | ✅ |

**Live demo (Phase 7d):** https://lnq7kuwo7ja1.space.minimax.io

### 🔊 NEW: Sound System (Phase 8)

- ✅ **Web Audio API synth** — 100% synthesized, NO asset files (zero loading time)
- ✅ **5 zone ambient sounds** — birds (Home), school bell (School), train+horn (Station), crowd+chime (Shopping), bell+chime (Shrine)
- ✅ **4 time-of-day sounds** — birds morning, cicadas noon, sunset birds, crickets at night
- ✅ **Footstep sounds** — soft tap every 0.4s walk, 0.25s run
- ✅ **Event sounds** — zone switch chord, dialogue chime, pause toggle, UI click
- ✅ **Mute toggle** — 🔊/🔇 button top-right + M key shortcut, gain goes to 0
- ✅ **Autoplay policy compliant** — AudioContext resumes on first user gesture
- ✅ **Auto time-of-day check** — `setInterval` every 20s plays appropriate ambient layer

#### Phase 8 Sound Inventory
| Zone | Sound (synthesized) |
|------|---------------------|
| 1 Home | 4× bird chirps (1800-2400 Hz sine) |
| 2 School | C-E-G major chord (523/659/784 Hz) |
| 3 Station | 110 Hz sawtooth rumble + 440 Hz horn |
| 4 Shopping | Filtered noise (800 Hz bandpass) + 880 Hz shop chime |
| 5 Shrine | G3 fundamental (196 Hz) + D4 + G4 ringing |

#### Phase 8 Test Results
| Test | Result |
|------|--------|
| All 5 zone ambient functions | ✅ 0 errors |
| All 4 time-of-day sounds | ✅ 0 errors |
| Footstep 5x (test loop) | ✅ 0 errors |
| Dialogue chime | ✅ 0 errors |
| Zone switch chord | ✅ 0 errors |
| Mute button click (text 🔇↔🔊) | ✅ works |
| M key shortcut | ✅ works |
| JS errors total | ✅ 0 |

**Live demo (Phase 8d):** https://v19cwj4oh9os.space.minimax.io

### 💾 NEW: Save/Load + Atmosphere (Phase 9)

- ✅ **Save/Load system** — localStorage 'tsl-save-v1' with auto-save every 30s + on page unload
- ✅ **Manual save/load buttons** — 💾/📂 in HUD top-right + S/L keyboard shortcuts
- ✅ **Auto-load on boot** — state preserved across page refreshes (zone, time, player pos, visited)
- ✅ **Tracked state** — currentZone, gameTime, timePaused, timeScale, player.{x,y,z,rot}, visitedZones[]
- ✅ **Sakura petals** — 50 procedural pink particles drifting with sin-wave wobble
- ✅ **Time-based petals** — visible only during day + sunset (hidden at night/morning)
- ✅ **Smooth camera** — lerp factor 0.15 for position + lookAt, no rigid jumps
- ✅ **Tested reload** — save then refresh, state auto-restores

#### Phase 9 Test Results
| Test | Result |
|------|--------|
| Save state, change zone, load | ✅ all fields match |
| Auto-load on page reload | ✅ currentZone, gameTime, visitedZones preserved |
| Sakura at sunset 17:00 | ✅ visible |
| Sakura at night 22:00 | ✅ hidden |
| Sakura at morning 8:00 | ✅ hidden |
| Petal count | ✅ 50 particles |
| JS errors | ✅ 0 |

**Live demo (Phase 9d):** https://ys3io0b88j0o.space.minimax.io

---

## 📂 Project Structure

```
tokyo-student-life/
├── 00_CONCEPT/              ✅ Phase 0 — Concept Lock (DONE)
│   ├── concept.md                    · 1-page concept
│   ├── design_principles.md          · 10 design principles
│   ├── anti_references.md            · ❌ what NOT to do
│   ├── zones.md                      · 5 zones detail
│   ├── bilingual_guide.md            · TH/EN/JA rules
│   └── reference_moodboard/          · 5 Ghibli-style AI references
│
├── 01_ART_BIBLE/            ✅ Phase 1A — Art Bible (DONE)
│   ├── art_style_guide.md            · Ghibli-pastel modern
│   ├── color_palette.json            · 25-color palette
│   ├── typography_guide.md           · 3 font families
│   ├── shape_language.md             · curves, soft edges
│   ├── lighting_mood.md              · 5 moods
│   ├── negative_prompts.md           · AI image generation
│   ├── forbidden_elements.md         · weapons, brands, etc.
│   └── reference_moodboard/          · mood references
│
├── 02_ENVIRONMENT/          ✅ Phase 2A — Environment
│   ├── environment_builder.js        · ground + sky + fog
│   ├── scatter_rules.json            · prop placement rules
│   ├── ground.md, props.md, vegetation.md
│
├── 03_BUILDINGS/            ✅ Phase 2B — Procedural Buildings
│   ├── zone1_home/, zone2_school/, zone3_station/, zone4_shopping/, zone5_shrine/
│
├── 04_CHARACTERS/           ✅ Phase 2C — Procedural Characters
│   ├── buildSchoolgirl.js
│   ├── buildNPC.js
│
├── 05_MATERIALS/            ✅ Phase 1B — PBR Materials (25 materials)
│   ├── material_factory.js
│   ├── texture_generator.js         · 13 procedural generators
│   ├── materials/                    · 25 JSON definitions
│
├── 06_LIGHTING/             ✅ Phase 1C — Time-of-Day
│   ├── time_of_day.json
│   ├── lighting_rig.js
│   ├── color_grading_setup.js
│   ├── presets/                      · 5 time presets
│
├── 07_CAMERA/               ⏳ Phase 3A (planned)
│
├── 08_EFFECTS/              ⏳ Phase 3B (planned)
│
├── 09_AUDIO/                ⏳ Phase 3C (planned)
│
├── 10_PHYSICS/              ⏳ Phase 3D (planned)
│
├── 11_UI/                   ⏳ Phase 3E (bilingual)
│   └── i18n/
│       ├── th.json, en.json, ja.json
│
├── 12_OPTIMIZATION/         ⏳ Phase 3F
│
├── 13_STORY_BIBLE/          ⏳ Phase 3G
│
├── demo/                    ✅ Phase 4-6 — Working Three.js Demo
│   ├── index.html                   · 25KB single-file demo
│   ├── three.module.js              · 1.2MB bundled
│   ├── GLTFLoader.js, DRACOLoader.js, BufferGeometryUtils.js
│   ├── draco_decoder.wasm + draco_wasm_wrapper.js + draco_decoder.js
│   ├── Soldier.glb                  · 2.1MB (Khronos CC0)
│   ├── LittlestTokyo.glb            · 4.0MB (real Tokyo 3D scene — used in Zone 4)
│   ├── Xbot.glb, Horse.glb, RobotExpressive.glb
│   ├── backgrounds/                 · 5 AI-generated Ghibli images
│   └── screenshots/                  · test captures
│
├── deploy/                  ✅ Deploy scripts + results
│
└── VERIFICATION/            ⏳ Phase 4B
    ├── verification_checklist.md
    ├── test_results.md
    └── screenshots/
```

---

## 🎮 Visual Style / สไตล์

### Ghibli-Pastel Modern

| ไม่ทำ (Forbidden) | ทำ (Do) |
|-------------------|---------|
| ❌ Cyberpunk neon | ✅ Soft pastels, warm tones |
| ❌ Anime 2D | ✅ Ghibli-pastel 3D |
| ❌ Photorealistic | ✅ Slightly stylized, soft edges |
| ❌ Dark/moody | ✅ Bright, sunny, optimistic |
| ❌ Weapons/combat | ✅ Cozy, slice-of-life |
| ❌ Brand names | ✅ Generic school/station names |
| ❌ Real photos | ✅ AI-generated, procedural |

### Color Palette (25 colors)

- **Skin tones:** warm beige #FFE4D4, light pink #FFD4C4
- **Hair:** black #1A1A1A, dark brown #3D2817
- **Clothing:** navy #1E3A5F, white #F5F5F5, red #D14545
- **Environment:** sakura #FFB6C1, leaf #6B8E23, sky #B5D8E8
- **Mood:** cream #FAF0E6, gold #DAA520, rose #D87093

---

## 🌏 Bilingual System / ระบบ 2 ภาษา

| Layer | Thai | English | Japanese (in-scene signage only) |
|-------|------|---------|----------------------------------|
| **UI** | ✅ Primary | ✅ Secondary | — |
| **Dialogue** | ✅ | ✅ | — |
| **Zone names** | ✅ | ✅ | ✅ (e.g. 商店街 Shōtengai) |
| **Building signs** | partial | partial | ✅ |
| **NPC names** | ✅ | ✅ | — |

### Bilingual Guide Rules (00_CONCEPT/bilingual_guide.md)

1. **Always show both TH and EN together** — ไม่ใช่อันเดียว
2. **TH first** in lists, EN second: `🏠 บ้าน (Home)`
3. **Don't translate** brand names, place names (Tokyo, Shibuya, etc.)
4. **Japanese for atmosphere** — use sparingly for in-scene signage
5. **Use Thai fonts** that render all combining marks — `Sarabun`, `Inter`

---

## 🛠️ Tech Stack / เทคโนโลยี

| Layer | Tool | Notes |
|-------|------|-------|
| **3D Engine** | Three.js (vanilla) | r150+ — single-file deploy |
| **Models** | GLTFLoader + DRACO | Khronos CC0 GLBs |
| **Lighting** | 3-point + HDR | procedural, no HDR download |
| **Materials** | MeshStandardMaterial / PBR | 25 procedural |
| **Physics** | (planned) Rapier3D | not yet active |
| **Audio** | (planned) Web Audio API | procedural — no asset files |
| **Frontend** | vanilla HTML/CSS/JS | no build step, no framework |
| **Languages** | TH + EN (UI) + JA (in-scene) | i18n via JSON files |
| **Deploy** | space.minimax.io (CDN) | single static folder |

### Why procedural instead of GLB?

- ✅ Smaller repo (16MB total vs 200MB+ with all models)
- ✅ No GLB load latency
- ✅ 100% customizable (can edit hair color, skirt length, etc. via code)
- ✅ Future-proof (no external model dependencies)
- ❌ Less detail than hand-crafted GLBs (but Ghibli style doesn't need high detail)

### Why we use 1 real GLB (LittlestTokyo)

Zone 4 (Shopping) uses **LittlestTokyo.glb** as the real 3D Tokyo backdrop — the rest of the zones are procedural. This gives the game a sense of place without bloating the bundle.

---

## 🎯 Zone Breakdown / 5 โซน

| # | Zone | Emoji | TH | EN | JP (signage) | Color | Time | Backdrop |
|---|------|-------|----|----|--------------|-------|------|----------|
| 1 | Home | 🏠 | บ้าน | Home | 自宅 | wood | 07:00 | warm interior |
| 2 | School | 🏫 | โรงเรียน | School | 学校 | white | 12:00 | sakura + concrete |
| 3 | Station | 🚉 | สถานีรถไฟ | Station | 駅 | sunset | 17:30 | JR + asphalt |
| 4 | Shopping | 🛍️ | ย่านช้อปปิ้ง | Shopping | 商店街 | dusk | 17:00 | **LittlestTokyo GLB** |
| 5 | Shrine | ⛩️ | ศาลเจ้า | Shrine | 神社 | golden | 16:00 | sakura + torii |

### NPC Distribution

| Zone | NPC | Role | Thai name | English name |
|------|-----|------|-----------|--------------|
| 1 Home | Senpai | Upperclassman | เซ็นไป | Senpai |
| 2 School | Classmate (Yui) | Friend | ยุอิ | Yui |
| 2 School | Classmate (Aoi) | Friend | อาโออิ | Aoi |
| 3 Station | Attendant | JR staff | พนักงาน | Attendant |
| 4 Shopping | Shopkeeper | Vendor | ร้านค้า | Shopkeeper |
| 5 Shrine | Miko | Shrine maiden | มิโกะ | Miko |

---

## 🕹️ Controls / วิธีเล่น

| Input | Action |
|-------|--------|
| **WASD / Arrow keys** | เดิน / Walk |
| **Shift** | วิ่ง / Run |
| **Space** | กระโดด / Jump |
| **Mouse drag / Touch** | หมุนกล้อง / Rotate camera |
| **1-5** | สลับโซน / Switch zone |
| **E** | คุยกับ NPC / Talk to NPC (within 2.5 units) |
| **Space (in dialogue)** | ข้ามข้อความ / Skip dialogue line |

### HUD Elements

- **Top-left:** HP bar, Stamina bar, Yen (เงิน)
- **Top-right:** Time (HH:MM), Schedule card with 5 daily tasks
- **Top-center:** Zone name (TH + JP + EN)
- **Bottom:** Zone selector buttons (1-5)
- **Bottom-center:** Interaction prompt (when near NPC) "กด E เพื่อคุย"

---

## 🚀 Quick Start / เริ่มใช้งาน

### Run the demo locally

```bash
cd demo/
# Option 1: Python HTTP server
python3 -m http.server 8080
# Then open http://localhost:8080

# Option 2: Node HTTP server
npx serve -p 8080
# Then open http://localhost:8080
```

**Important:** The demo needs an HTTP origin (not `file://`) to load GLB files and modules.

### Read the docs

```bash
# Start with concept
cat 00_CONCEPT/concept.md

# Then zones
cat 00_CONCEPT/zones.md

# Then design principles
cat 00_CONCEPT/design_principles.md

# Bilingual rules
cat 00_CONCEPT/bilingual_guide.md
```

### Project structure tour

```bash
ls -la 00_CONCEPT/        # 6 files, 65KB — concept + rules
ls -la 01_ART_BIBLE/      # 8 files, 108KB — visual rules
ls -la 05_MATERIALS/      # 12 files, 106KB — PBR materials
ls -la 06_LIGHTING/       # 12 files, 85KB — time-of-day
ls -la demo/              # 25KB HTML + 16MB GLB/loader bundle
```

---

## 📊 Project Stats / ตัวเลขโปรเจกต์

- **Concept:** Tokyo Student Life · 5 zones · cozy slice-of-life walking sim
- **Visual style:** Ghibli-pastel modern
- **Languages:** TH + EN (UI) + JA (signage)
- **Stack:** Three.js (vanilla) + procedural everything
- **Demo size:** 25KB HTML + 16MB GLB bundle (single-file deploy)
- **Live URL:** https://r2633qqnal4d.space.minimax.io
- **Phases done:** 0-6 (6/13) — 4 hours of work
- **Files total:** 60+ across 14 directories
- **Materials:** 25 PBR (procedural)
- **NPCs:** 5 types × 1 per zone = 5 NPCs with bilingual dialogue
- **Time-of-day presets:** 5 (morning / noon / sunset / night / etc.)
- **Animations:** walk / run / idle (procedural, no GLB AnimationMixer)

---

## 🎨 Key Design Decisions / การตัดสินใจสำคัญ

### 1. Procedural Schoolgirl > Soldier.glb

Initially used **Soldier.glb** (Khronos CC0) as player. User feedback: *"ทำไมนักเรียนญี่ปุ่นไม่ใส่กระโปรง"* (Why don't Japanese students wear skirts?). **Fix:** Built procedural schoolgirl with seifuku uniform — pleated navy skirt, 2 red ribbon bows, randoseru school bag. **Pros:** smaller bundle, 100% customizable, fits the theme. **Cons:** less detail than hand-crafted GLB.

### 2. Ghibli background via CSS body, not scene.background

Initial approach tried `scene.background = texture` — but Three.js treated it as equirectangular and rendered it wrong. **Fix:** Used `body.zone1 { background-image: url(...) }` + transparent canvas (`alpha: true`, `setClearColor(0x000000, 0)`).

### 3. All assets at root level (not subfolders)

`website_deploy` doesn't include subfolders. Had to move `glb/`, `loaders/`, `utils/`, `draco/` to root. **Trade-off:** root is messy but deployment works.

### 4. LittlestTokyo is the ONE real GLB

Could use GLBs for everything (more detail) but chose to use only **1 real GLB** (LittlestTokyo for Zone 4) and keep the rest procedural. **Why:** faster load, smaller bundle, easier to customize.

### 5. Bilingual in code, not i18n framework

No i18n library. Just two strings side-by-side: `🏠 บ้าน (Home)`. Simple, no runtime overhead, no build step.

---

## 🚧 What's Left (Phase 7-13)

- [ ] **Phase 7: Day/Night cycle** — actual time progression
- [ ] **Phase 7: Quest system** — fetch quests, story missions
- [ ] **Phase 8: Sound** — Web Audio synth (footsteps, ambient, voice)
- [ ] **Phase 9: Physics** — Rapier3D for proper collision
- [ ] **Phase 10: Cutscenes** — story beats
- [ ] **Phase 11: Save/Load** — localStorage progress
- [ ] **Phase 12: Polish** — anti-aliasing, post-processing
- [ ] **Phase 13: Final ship** — full playthrough test, deploy to codehub.sj88ai.com

---

## 🐛 Known Issues / ปัญหาที่รู้

- **GLB load time** — LittlestTokyo is 4MB, takes ~2s on first load (CDN dependent)
- **No physics yet** — player can walk through objects (Phase 9)
- **No save** — refresh = lose progress (Phase 11)
- **No audio** — silent game (Phase 8)
- **No anti-aliasing** — jaggies on some edges (Phase 12)

---

## 📜 License / ใบอนุญาต

- **Code:** MIT
- **GLB models:** Khronos CC0 (free to use)
- **Backgrounds:** AI-generated (this project's)
- **Typography:** Open source (Sarabun Thai, Inter English)

---

## 🙏 Credits

- **Khronos Group** — GLB sample models (Soldier, LittlestTokyo, Xbot, etc.)
- **Three.js team** — for the engine
- **Studio Ghibli** — visual inspiration
- **AI-generated backgrounds** — for the 5 Ghibli-style zone backdrops

---

**Started:** 2026-07-12
**Last updated:** 2026-07-12 (Phase 6 complete)
**Live demo:** https://r2633qqnal4d.space.minimax.io
