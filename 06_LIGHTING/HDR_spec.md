# 🌅 HDR Environment Maps — Tokyo Student Life
## HDR環境マップ

> Image-Based Lighting (IBL) สำหรับ PBR materials
> ใช้สำหรับ metal/glass reflection

---

## Why HDR?

### PBR ต้องการ IBL
- **Metal** (>0.5 metallic) — ต้องมี env map ไม่งั้นดำ
- **Glass** (transmission) — ต้องมี env map
- **Water** — ต้องมี env map
- **Glossy** — ต้องมี env map

### ไม่ใช้ HDR
- Wood, fabric, paper, concrete — diffuse only
- ❌ ไม่ต้อง HDR แต่ใช้ได้ (ช่วย overall lighting)

---

## Required HDR Maps

### 1. Morning (เช้า)
- **File:** `kiara_1_dawn_1k.hdr`
- **Source:** Poly Haven
- **Size:** 1024×512
- **Mood:** warm golden, low sun, soft sky

### 2. Noon (เที่ยง)
- **File:** `kloppenheim_06_puresky_1k.hdr`
- **Source:** Poly Haven
- **Size:** 1024×512
- **Mood:** bright, clear sky, high sun

### 3. Evening (เย็น)
- **File:** `industrial_sunset_puresky_1k.hdr`
- **Source:** Poly Haven
- **Size:** 1024×512
- **Mood:** orange, low sun, warm

### 4. Night (ค่ำ)
- **Generated procedural** (no HDR file)
- ใช้ dark purple + city light
- สร้างใน code

### 5. Sunset (ศาลเจ้า)
- **File:** `industrial_sunset_puresky_1k.hdr` (variant)
- **Source:** Poly Haven
- **Size:** 1024×512
- **Mood:** warm orange, soft

---

## Sources (CC0)

### Poly Haven (Primary)
- URL: https://polyhaven.com/hdris
- License: CC0 (public domain)
- Free download
- Search: "puresky" (gradient only — no clouds)

### Recommended Files
| Preset | File | Notes |
|--------|------|-------|
| Morning | `kiara_1_dawn_1k.hdr` | Soft dawn |
| Noon | `kloppenheim_06_puresky_1k.hdr` | Clear sky |
| Evening | `industrial_sunset_puresky_1k.hdr` | Golden |
| Sunset | `industrial_sunset_02_puresky_1k.hdr` | Warmer |

### ambientCG
- URL: https://ambientcg.com
- License: CC0
- More options

---

## Three.js Setup

### Load HDR
```javascript
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

const rgbeLoader = new RGBELoader();
rgbeLoader.load('path/to/kiara_1_dawn_1k.hdr', (texture) => {
  // Set as environment
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = texture;
});
```

### PMREM (Pre-filtered)
```javascript
import { PMREMGenerator } from 'three';

const pmremGenerator = new PMREMGenerator(renderer);

rgbeLoader.load('path/to/kiara_1_dawn_1k.hdr', (texture) => {
  const envMap = pmremGenerator.fromEquirectangular(texture).texture;
  scene.environment = envMap;
  texture.dispose();
  pmremGenerator.dispose();
});
```

### Apply to Material
```javascript
// scene.environment จะ apply อัตโนมัติ
// หรือ apply manually:
material.envMap = envMap;
material.envMapIntensity = 1.0;
```

---

## Procedural Night Sky

ไม่มี HDR file สำหรับ night — สร้างเอง

```javascript
function createNightEnvironment() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  
  // Sky gradient
  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, '#1A1A2E');
  grad.addColorStop(0.4, '#2D2840');
  grad.addColorStop(0.5, '#4A3F5C');
  grad.addColorStop(0.55, '#5A4F7A');
  grad.addColorStop(0.6, '#4A3F5C');
  grad.addColorStop(1, '#1A1A2E');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 512);
  
  // City lights (lower half)
  for (let i = 0; i < 200; i++) {
    const x = Math.random() * 1024;
    const y = 280 + Math.random() * 200;
    const size = Math.random() * 2;
    const warm = Math.random() > 0.3;
    ctx.fillStyle = warm 
      ? `rgba(255, 179, 71, ${0.3 + Math.random() * 0.5})` 
      : `rgba(255, 255, 200, ${0.2 + Math.random() * 0.4})`;
    ctx.fillRect(x, y, size, size);
  }
  
  // Stars (upper half)
  for (let i = 0; i < 100; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 200;
    ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + Math.random() * 0.5})`;
    ctx.fillRect(x, y, 1, 1);
  }
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  
  // Apply PMREM
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envMap = pmrem.fromEquirectangular(texture).texture;
  texture.dispose();
  pmrem.dispose();
  
  return envMap;
}
```

---

## Memory Budget

### Per HDR
- 1k (1024×512): ~2MB
- 2k (2048×1024): ~8MB
- 4k (4096×2048): ~32MB

### Total
- 3 HDR files (morning, noon, evening): ~6MB
- 1 procedural (night): ~2MB
- 1 procedural (sunset, or reuse evening): ~2MB
- **Total: ~10MB**

### Streaming
- Load HDR per zone
- Morning → load morning HDR
- Evening → load evening HDR
- Night → use procedural (instant)
- Sunset → load sunset HDR

---

## File Locations

```
06_LIGHTING/
├── HDR_spec.md                ← คุณอยู่ที่นี่
├── time_of_day.json           ← preset configs
├── shadow_settings.md
├── color_grading.md
├── lighting_setup.md
├── lighting_rig.js
├── presets/
│   ├── morning.js
│   ├── noon.js
│   ├── evening.js
│   ├── night.js
│   └── sunset.js
└── hdr/                       ← (download แล้วใส่ที่นี่)
    ├── kiara_1_dawn_1k.hdr
    ├── kloppenheim_06_puresky_1k.hdr
    ├── industrial_sunset_puresky_1k.hdr
    └── (procedural night — ไม่ต้องเก็บ file)
```

---

## HDR Loading Strategy

### Preload
```javascript
// ตอน boot game — preload all HDR
const hdrs = {};
async function preloadHDRs() {
  const files = {
    morning: 'kiara_1_dawn_1k.hdr',
    noon: 'kloppenheim_06_puresky_1k.hdr',
    evening: 'industrial_sunset_puresky_1k.hdr'
  };
  for (const [name, file] of Object.entries(files)) {
    hdrs[name] = await loadHDR(file);
  }
}
```

### Lazy
```javascript
// โหลดตอนเข้า zone
async function loadZone(zone) {
  const time = getTimeForZone(zone);
  if (!hdrs[time]) {
    hdrs[time] = await loadHDR(getHDRForTime(time));
  }
  scene.environment = hdrs[time];
}
```

---

## HDR Quality Tiers

### High (Desktop)
- 2k HDR (2048×1024)
- PMREM with 256 samples
- Mipmap chain

### Medium (Laptop)
- 1k HDR (1024×512)
- PMREM with 128 samples
- Mipmap chain

### Low (Mobile)
- 512×256 HDR
- PMREM with 64 samples
- Skip if mobile

---

## Validation

### Check HDR is working
- [ ] metal material มี reflection
- [ ] glass material โปร่งใส
- [ ] scene มี fill light จาก env
- [ ] ไม่มี material pure black (except shadow)

### Visual Test
- [ ] reflection ตรงกับ time of day
- [ ] color ตรงกับ palette
- [ ] contrast พอดี
- [ ] ไม่มี artifact

---

## Quick Reference Card

```
╔════════════════════════════════════╗
║  HDR DNA                           ║
╠════════════════════════════════════╣
║ Source: Poly Haven CC0             ║
║ Size: 1k (1024×512)                ║
║ Format: HDR / EXR                   ║
║ Processing: PMREM                  ║
║ Memory: ~10MB total                ║
║                                     ║
║ Required for: Metal, Glass, Water  ║
║ Optional for: Wood, Fabric         ║
║                                     ║
║ NEVER: 4K HDR, no PMREM            ║
║ ALWAYS: PMREM, CC0 source          ║
╚════════════════════════════════════╝
```

---

**Version:** 1.0
**Last updated:** 2026-07-12
