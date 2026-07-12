# 💡 Lighting — Tokyo Student Life
## ライティング

> 5 time-of-day presets + 3-point lighting + post-processing
> แสงคือ 50% ของความสวย

---

## Quick Start

```javascript
import { applyLighting, transitionLighting } from './lighting_rig.js';
import { updateGrainTime } from './color_grading_setup.js';

// Apply preset
const rig = applyLighting(scene, renderer, 'morning_home', camera);

// Render
function animate() {
  rig.composer.render();
  updateGrainTime(rig.composer, 0.016);  // animate grain
  requestAnimationFrame(animate);
}

// Transition between presets
await rig.transition('noon_school', 30);  // 30 sec transition
```

---

## File Structure

```
06_LIGHTING/
├── README.md                  ← คุณอยู่ที่นี่
├── lighting_setup.md          ← 3-point rules + per-zone setup
├── time_of_day.json           ← 5 preset configs
├── shadow_settings.md         ← Shadow config
├── color_grading.md           ← Post-processing rules
├── HDR_spec.md                ← Environment maps
├── lighting_rig.js            ← Apply lighting (1 call)
├── color_grading_setup.js     ← EffectComposer setup
└── presets/
    ├── morning.js             ← 07:00 — Home
    ├── noon.js                ← 12:00 — School
    ├── evening.js             ← 17:30 — Station
    ├── night.js               ← 19:00 — Shopping
    └── sunset.js              ← 16:00 — Shrine
```

---

## 5 Time-of-Day Presets

| Preset | Time | Zone | Mood |
|--------|------|------|------|
| `morning_home` | 07:00 | 🏠 Home | อบอุ่น นุ่ม |
| `noon_school` | 12:00 | 🏫 School | สดใส มีชีวิตชีวา |
| `evening_station` | 17:30 | 🚉 Station | Golden hour nostalgic |
| `night_shopping` | 19:00 | 🛍️ Shopping | คึกคัก cozy |
| `sunset_shrine` | 16:00 | ⛩️ Shrine | สงบ wabi-sabi |

---

## 3-Point Lighting (ทุก preset)

| Light | Type | Source | Color | Shadow |
|-------|------|--------|-------|--------|
| Key (Sun) | DirectionalLight | Sun position | Warm (3500-4500K) | Yes (PCF Soft) |
| Fill (Sky) | DirectionalLight | Opposite | Cool (5500-6500K) 30% | No |
| Rim | DirectionalLight | Behind subject | Neutral 60% | No |
| Ambient | HemisphereLight | Sky/Ground | Tinted | No |

---

## Post-Processing Pipeline

```
Render → Tone Map (ACES) → Bloom → Vignette → Grain → Output
```

| Effect | Settings | Note |
|--------|----------|------|
| Tone Map | ACES Filmic | Industry standard |
| Exposure | 1.00 - 1.15 | Per preset |
| Bloom | 0.3 - 0.8 strength | Per preset |
| Vignette | 0.15 - 0.40 strength | Subtle |
| Grain | 0.03 - 0.08 strength | Animated |

---

## HDR Environment

- 3 HDR files (morning/noon/evening) — Poly Haven CC0
- 1 procedural (night) — generated
- ~10MB total memory
- Use PMREM for IBL

---

## Usage Patterns

### Pattern 1: Static Lighting (per zone)
```javascript
const timeForZone = {
  1: 'morning_home',
  2: 'noon_school',
  3: 'evening_station',
  4: 'night_shopping',
  5: 'sunset_shrine'
};

function loadZone(zone) {
  applyLighting(scene, renderer, timeForZone[zone], camera);
}
```

### Pattern 2: Time Cycle
```javascript
let currentTime = 0;
const times = ['morning_home', 'noon_school', 'evening_station', 'night_shopping'];

function updateTime() {
  const nextTime = times[currentTime % times.length];
  rig.transition(nextTime, 30);  // 30 sec transition
  currentTime++;
}
```

### Pattern 3: Real-time (player controls)
```javascript
// Player เลือกเวลา
const userTime = settings.time;  // 'morning', 'noon', etc.
applyLighting(scene, renderer, `custom_${userTime}`, camera);
```

---

## Rules (MUST FOLLOW)

### 1. 3-Point Lighting
- ✅ ทุก scene มี key + fill + rim + ambient
- ❌ ไม่มี single light

### 2. Tinted Shadow
- ✅ Shadow มี color (cool/purple/blue)
- ❌ ไม่ใช่ pure black

### 3. Soft Shadow
- ✅ PCFSoftShadowMap, radius 4
- ❌ ไม่มี hard edge

### 4. Tone Mapping
- ✅ ACES Filmic
- ❌ ไม่ใช่ Linear

### 5. Post-Processing
- ✅ Bloom + Vignette + Grain
- ❌ ไม่มี CA, heavy DOF

### 6. Time Variation
- ✅ แต่ละ zone มี time ต่างกัน
- ❌ ไม่ใช้แสงเดียวทั้งเกม

---

## Performance

### Light Budget
- 1 shadow-casting DirectionalLight
- 2-3 non-shadow DirectionalLights
- 1 HemisphereLight
- Optional: 5-10 PointLights (indoor)

### Shadow
- mapSize: 2048×2048
- 16MB per shadow map
- Disable for low-end

### Post-Processing
- Bloom: ~1ms
- Vignette + Grain: ~0.2ms
- Total: ~1.2ms

---

## See Also

- `lighting_setup.md` — Detailed 3-point rules
- `time_of_day.json` — All 5 presets
- `shadow_settings.md` — Shadow config
- `color_grading.md` — Post-processing
- `HDR_spec.md` — Environment maps
- `01_ART_BIBLE/lighting_mood.md` — Art Bible rules

---

**Version:** 1.0
**Last updated:** 2026-07-12
