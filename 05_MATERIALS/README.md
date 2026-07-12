# 📦 Materials — Tokyo Student Life
## マテリアル — 素材

> **25 materials** — รากฐานของ visual consistency
> ทุก asset ในเกมต้องใช้ material จาก PBR_palette.json เท่านั้น

---

## Quick Start

```javascript
import { getMaterial } from './material_factory.js';

// Basic
const wood = getMaterial('wood.japanese_oak');
mesh.material = wood;

// With variation (random color shift + wear)
const wood2 = getMaterial('wood.japanese_oak', { 
  variation: 0.3,  // 0-1 color variation
  wear: 0.15       // 0-1 wear amount
});

// Preload all materials (for first frame)
import { preloadAllMaterials } from './material_factory.js';
await preloadAllMaterials((progress) => {
  console.log(`Loading materials: ${(progress * 100).toFixed(0)}%`);
});
```

---

## File Structure

```
05_MATERIALS/
├── README.md                    ← คุณอยู่ที่นี่
├── materials_bible.md           ← 25 materials overview
├── PBR_palette.json             ← Single source of truth (all 25)
├── texture_specs.md             ← Texture generation rules
├── material_factory.js          ← Get material instances
├── texture_generator.js         ← Procedural texture generation
├── materials/                   ← Individual material docs (top 6)
│   ├── wood_japanese_oak.json
│   ├── wood_dark_walnut.json
│   ├── fabric_school_uniform_navy.json
│   ├── concrete_modern.json
│   ├── leaf_sakura.json
│   └── neon_warm.json
└── textures/                    ← Generated textures (runtime)
    └── (ไม่ต้องเก็บ — generated runtime)
```

---

## 25 Materials (Summary)

| Category | Count | Examples |
|----------|-------|----------|
| 🪵 Wood | 5 | japanese_oak, dark_walnut, bamboo, light_pine, shrine |
| 🧵 Fabric | 3 | school_uniform_navy, school_uniform_white, cotton_casual |
| 🪨 Stone/Mineral | 4 | concrete.modern, concrete.sidewalk, asphalt.road, stone.torii_red |
| 🔩 Metal | 2 | brushed_aluminum, rusted_train |
| 📄 Paper | 2 | shoji, signage |
| 🌿 Natural | 5 | leaf.sakura, leaf.ginkgo, leaf.bamboo, tatami, water.pond |
| 💎 Synthetic | 3 | glass.window, ceramic.tiles, plastic.vending_machine |
| 💡 Special | 1 | neon.warm (emissive) |
| **Total** | **25** | |

---

## Material Rules (MUST FOLLOW)

### 1. ใช้จาก Palette เท่านั้น
- ❌ ห้ามสร้าง material นอก PBR_palette.json
- ✅ ถ้าต้องการ material ใหม่ → เพิ่มใน PBR_palette.json ก่อน

### 2. Roughness Range
- Wood: 0.65-0.85
- Concrete: 0.80-0.95
- Fabric: 0.85-0.95
- Metal: 0.30-0.55
- Glass: 0.05-0.15
- Plastic: 0.50-0.70
- Paper: 0.90-0.98
- Stone: 0.75-0.90
- Leaf: 0.50-0.75
- Water: 0.05-0.15
- Ceramic: 0.40-0.60
- Neon: 0.30-0.50

### 3. Metallic
- เกือบทั้งหมด: 0.0
- Metal เท่านั้น: 0.85-1.0
- ❌ ไม่มี material ที่ metallic > 1.0

### 4. Color Saturation
- ≤ 60% saturation
- ❌ ไม่ primary color เต็ม
- ❌ ไม่ pure RGB (255, 0, 0)

### 5. Subtle Variation
- ทุก material มี variation 3-5 สี
- Random เลือกตอน instance

### 6. Wear Pattern
- 2-5% ของ surface
- ไม่ brand new

---

## Zone Distribution

| Zone | Materials Used |
|------|----------------|
| 🏠 Home (1) | 8 materials (oak, walnut, light_pine, cotton, shoji, tatami, glass, tiles) |
| 🏫 School (2) | 7 materials (concrete, walnut, uniform_navy, uniform_white, aluminum, glass, tiles) |
| 🚉 Station (3) | 6 materials (asphalt, sidewalk, rusted_train, glass, aluminum, vending) |
| 🛍️ Shopping (4) | 6 materials (concrete, aluminum, signage, neon, tiles, cotton) |
| ⛩️ Shrine (5) | 6 materials (torii_red, shrine, water, sakura, ginkgo, bamboo) |

---

## Performance

- **Total materials:** 25
- **Total textures:** 25 (each material has 1-2 textures)
- **Memory budget:** < 100MB
- **Streaming:** Per zone
- **First frame:** Preload all 25 materials

---

## See Also

- `materials_bible.md` — Full material overview
- `PBR_palette.json` — All material specs
- `texture_specs.md` — Texture generation rules
- `01_ART_BIBLE/` — Art style rules
- `12_OPTIMIZATION/` — Performance budget

---

**Version:** 1.0
**Last updated:** 2026-07-12
