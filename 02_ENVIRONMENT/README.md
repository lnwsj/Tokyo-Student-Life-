# 🌳 Environment — Tokyo Student Life
## 環境

> ทุกอย่างที่อยู่ในฉาก — พื้น ต้นไม้ หิน เฟอร์นิเจอร์
> Procedural + Three.js primitives ไม่ต้องเก็บ model

---

## Quick Start

```javascript
import { buildEnvironment, disposeEnvironment } from './environment_builder.js';

// Build environment for zone 5 (Shrine)
const env = buildEnvironment(scene, 5, { camera });

// Render — environment appears immediately

// Later, unload (when leaving zone)
disposeEnvironment(env);
```

---

## File Structure

```
02_ENVIRONMENT/
├── README.md                  ← คุณอยู่ที่นี่
├── ground.md                  ← พื้น/น้ำ spec
├── vegetation.md              ← ต้นไม้/พื่มไม้ spec
├── props.md                   ← props/street furniture spec
├── environment_builder.js     ← Main builder (procedural Three.js)
├── scatter_rules.json         ← Per-zone density rules
└── assets/                    ← (empty — procedural)
```

---

## Environment per Zone

| Zone | Ground | Vegetation | Props |
|------|--------|------------|-------|
| 🏠 1 Home | wood + tatami | 1 deciduous | bicycle, planter, mailbox |
| 🏫 2 School | concrete + grass | 3 sakura + 2 deciduous | 12 bikes, 5 benches |
| 🚉 3 Station | asphalt + sidewalk | 1 sakura + 2 deciduous | 4 vending, 3 benches |
| 🛍️ 4 Shopping | concrete + tiles | 2 deciduous | 2 vending, 6 awnings, 8 signs |
| ⛩️ 5 Shrine | sand + grass | 4 sakura + 2 ginkgo + 6 bamboo | 6 lanterns, bridge, koi pond |

---

## Build Strategy

### Procedural Everything
- ไม่มี GLB/GLTF
- ใช้ Three.js primitives:
  - `PlaneGeometry` (ground, water, signs)
  - `BoxGeometry` (buildings, planters)
  - `CylinderGeometry` (tree trunks, lanterns, posts)
  - `SphereGeometry` (canopy, lanterns, koi)
  - `IcosahedronGeometry` (rocks)
  - `TorusGeometry` (bicycle wheels, arch)

### Materials
- ใช้จาก `05_MATERIALS/material_factory.js`
- PBR procedural textures
- Consistent palette across all zones

### Scatter
- Per-zone rules in `scatter_rules.json`
- Random position within bounds
- Min-distance check
- Random Y rotation
- Scale variation ±10%

---

## Key Functions

```javascript
// Build full environment
buildEnvironment(scene, 5);  // zone 5 (Shrine)

// Dispose when leaving zone
disposeEnvironment(env);
```

---

## Prop Types (14)

| Prop | Use | Material |
|------|-----|----------|
| 🪨 Rock | shrine garden | concrete.sidewalk |
| 🪑 Bench | park, station | wood + metal |
| 🥤 Vending | station, shopping | plastic + emissive |
| 🗑️ Trash can | public area | metal |
| 🚲 Bicycle | parked, player | metal |
| 🪴 Planter | decor | ceramic + leaf |
| ⛩️ Stone lantern | shrine | stone.torii_red |
| 🌉 Wooden bridge | shrine | wood.shrine |
| 💡 Lamp post | station, shopping | metal |
| 🪧 Sign | station, shopping | metal + paper |
| 📮 Mailbox | home, station | metal |
| 🏪 Awning | shopping | fabric |
| 🎋 Wind chime | home, shrine | metal + bamboo |
| 💧 Fountain | school | water + concrete |

---

## Performance

### Per Zone
- Tris: 5,000 - 50,000
- Draw calls: 20-50
- Materials: 5-15 unique

### Optimization
- InstancedMesh for grass (1000+ instances)
- Shared geometry for similar objects
- Disable shadow for small props
- Frustum culling automatic

---

## Rules

### Scatter
- ✅ Min distance 1m between objects
- ✅ Min distance 1.5m from buildings
- ✅ Random Y rotation
- ✅ Scale variation ±10%
- ❌ ไม่ overlap กัน
- ❌ ไม่วางบน path

### Position
- ✅ Within zone bounds (-50 to +50)
- ✅ Min 5m from edge
- ❌ ไม่ทับกับ building footprints

### Rotation
- ✅ Y rotation random
- ❌ ไม่ tilt (always upright)
- ❌ ไม่หมุนแกน X/Z

---

## See Also

- `ground.md` — Ground & water spec
- `vegetation.md` — Plant types
- `props.md` — Prop types
- `scatter_rules.json` — Per-zone rules
- `05_MATERIALS/` — Material specs
- `06_LIGHTING/` — Lighting setup

---

**Version:** 1.0
**Last updated:** 2026-07-12
