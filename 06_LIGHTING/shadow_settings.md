# 🌑 Shadow Settings — Tokyo Student Life
## シャドウ設定

> Soft shadow ทุก scene — ไม่มี harsh shadow
> Shadow มี color tint — ไม่ใช่ pure black

---

## Core Principles

### 1. Always Soft Shadow
- ❌ ไม่มี hard edge shadow
- ✅ PCF Soft Shadow (Percentage-Closer Filtering)
- radius 4-8

### 2. Tinted Shadow
- ❌ ไม่ใช่ pure black (#000000)
- ✅ ใช้ cool tone (purple, blue, brown)
- Shadow color = fill light color

### 3. Single Shadow Source
- ❌ ไม่มี multiple shadow direction
- ✅ มี shadow จาก sun/key เท่านั้น
- Fill/rim ไม่ cast shadow

### 4. Performance Budget
- mapSize: 2048×2048 (max)
- 1 shadow-casting light per scene
- Disable for low-end devices

---

## Three.js Shadow Setup

### Renderer
```javascript
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
```

### Light (Sun)
```javascript
const sun = new THREE.DirectionalLight(color, intensity);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.bias = -0.0005;
sun.shadow.normalBias = 0.02;
sun.shadow.radius = 4;
sun.shadow.camera.near = 0.5;
sun.shadow.camera.far = 200;
sun.shadow.camera.left = -50;
sun.shadow.camera.right = 50;
sun.shadow.camera.top = 50;
sun.shadow.camera.bottom = -50;
```

### Object (must opt-in)
```javascript
mesh.castShadow = true;
mesh.receiveShadow = true;
```

---

## Shadow Type Comparison

| Type | Use | Performance |
|------|-----|-------------|
| BasicShadowMap | ❌ ไม่ใช้ | Fast but ugly |
| PCFShadowMap | ❌ ไม่ใช้ | OK but hard |
| PCFSoftShadowMap | ✅ Default | Good + soft |
| VSMShadowMap | ⚠️ Special | Soft but artifact |

**เราใช้ PCFSoftShadowMap เสมอ**

---

## Shadow Color (Tinting)

### ❌ Default (Pure Black)
```javascript
// ไม่ทำแบบนี้ — pure black
material.shadowSide = THREE.FrontSide;
```

### ✅ Tinted Shadow
ใช้ fill light + ambient เพื่อ tint shadow
- Fill light (cool) = shadow area
- Ambient = base shadow
- Shadow color = blend of fill + ambient

### ตัวอย่าง
```
Sun:    warm #FFD194
Fill:   cool #B8DCE6
Ambient: sky #B8DCE6

Shadow color: ผสมระหว่าง fill + ambient
= ผลลัพธ์: น้ำเงินอ่อน (ไม่ใช่ดำ)
```

---

## Shadow Direction (by Time)

| Time | Sun | Shadow Direction | Length |
|------|-----|------------------|--------|
| 07:00 (เช้า) | East | West | Long |
| 12:00 (เที่ยง) | Top | Below | Short |
| 17:30 (เย็น) | West | East | Very long |
| 19:00 (ค่ำ) | None | Multiple (artificial) | N/A |
| 16:00 (sunset) | West | East | Long |

### Code
```javascript
function getShadowDirection(time) {
  const directions = {
    morning_home: { angle: 25, azimuth: 90 },  // East-low
    noon_school: { angle: 70, azimuth: 180 },  // Top
    evening_station: { angle: 15, azimuth: 270 }, // West-low
    night_shopping: null,                       // No sun
    sunset_shrine: { angle: 20, azimuth: 270 }   // West-low
  };
  return directions[time];
}
```

---

## Shadow Quality Tiers

### High (Desktop)
```
mapSize: 2048×2048
radius: 4
filter: PCFSoft
```

### Medium (Laptop)
```
mapSize: 1024×1024
radius: 3
filter: PCFSoft
```

### Low (Mobile)
```
mapSize: 512×512
radius: 2
filter: PCF (no soft)
```

### Off (Low-end)
```
mapSize: -
castShadow: false
```

---

## Shadow Camera (Frustum)

### Important
- ต้องกว้างพอให้ครอบคลุม shadow area
- แคบเกิน → shadow ถูก crop
- กว้างเกิน → shadow resolution ลด

### Setup
```javascript
sun.shadow.camera.near = 0.5;
sun.shadow.camera.far = 200;     // ครอบคลุม scene
sun.shadow.camera.left = -50;    // ครึ่ง scene width
sun.shadow.camera.right = 50;
sun.shadow.camera.top = 50;
sun.shadow.camera.bottom = -50;
```

### Helper
```javascript
const helper = new THREE.CameraHelper(sun.shadow.camera);
scene.add(helper);  // debug only
```

---

## Shadow on Object

### ต้อง opt-in
```javascript
// mesh ทุกชิ้นที่ต้องการ shadow
mesh.castShadow = true;     // ส่ง shadow
mesh.receiveShadow = true;  // รับ shadow

// ground ต้อง receiveShadow
ground.receiveShadow = true;
ground.castShadow = false;  // ground ไม่ส่ง shadow
```

### Performance Tip
- ❌ อย่าใส่ shadow กับทุก mesh
- ✅ เฉพาะ hero object + ground
- ❌ Background props ไม่ต้อง

### Default Rule
```
Cast shadow:    Hero props + characters
Receive shadow: All props + ground + buildings
```

---

## Contact Shadow

### ปัญหา
Object ลอย (floating) เพราะ shadow ไม่ถึง ground

### วิธีแก้
1. **Decal shadow** (texture ใต้ object)
2. **ContactShadows** (drei helper)
3. **Tighten shadow camera** (shadow ชัดขึ้น)
4. **Add small plane** ใต้ object (low poly)

### Recommended: ContactShadows
```javascript
import { ContactShadows } from '@react-three/drei';

<ContactShadows
  position={[0, 0, 0]}
  scale={10}
  blur={2}
  opacity={0.5}
  far={1}
/>
```

สำหรับ vanilla Three.js:
```javascript
// Manual contact shadow plane
const shadowPlane = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 2),
  new THREE.ShadowMaterial({ opacity: 0.3 })
);
shadowPlane.rotation.x = -Math.PI / 2;
shadowPlane.receiveShadow = true;
scene.add(shadowPlane);
```

---

## Shadow Mistakes to Avoid

### ❌ 1. Pure Black Shadow
- ไม่ใช้ #000000
- ใช้ tinted color

### ❌ 2. Hard Edge
- ไม่มี BasicShadowMap
- ใช้ PCF Soft เสมอ

### ❌ 3. Multiple Direction
- ไม่มี shadow จากหลาย light
- 1 shadow-casting light เท่านั้น

### ❌ 4. Wrong Direction
- shadow direction ต้องตรงกับ sun
- ตรวจ azimuth

### ❌ 5. Shadow Pop-in
- shadow หายเมื่อ object เคลื่อนออกจาก frustum
- แก้: ขยาย shadow camera

### ❌ 6. Shadow on All
- ไม่ cast shadow ทุก mesh
- เฉพาะ hero + ground

### ❌ 7. Shadow Map ขนาดใหญ่
- ไม่เกิน 2048×2048
- ประหยัด memory

---

## Performance Stats

### Memory
| mapSize | Memory (RGBA) |
|---------|---------------|
| 512×512 | 1MB |
| 1024×1024 | 4MB |
| 2048×2048 | 16MB |
| 4096×4096 | 64MB ❌ |

**เราใช้ 2048×2048 max — 16MB per shadow map**

### Frame Time
- PCF Soft: ~0.5ms per light
- Basic: ~0.2ms
- VSM: ~1.0ms

**เราใช้ PCF Soft — ประมาณ 0.5ms (1 shadow-casting light)**

---

## Quick Reference Card

```
╔════════════════════════════════════╗
║  SHADOW DNA                        ║
╠════════════════════════════════════╣
║ Type:   PCFSoftShadowMap            ║
║ Size:   2048×2048                   ║
║ Bias:   -0.0005                     ║
║ Radius: 4                           ║
║ Source: Sun only (1 light)          ║
║ Color:  Tinted (not pure black)     ║
║                                     ║
║ NEVER:  Hard shadow, pure black,   ║
║         multiple sources, 4K map    ║
║                                     ║
║ ALWAYS: Soft, tinted, performance   ║
║         budget, single source       ║
╚════════════════════════════════════╝
```

---

**Version:** 1.0
**Last updated:** 2026-07-12
