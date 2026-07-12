# 🌱 Ground & Water — Tokyo Student Life
## 地面と水

> พื้นผิวทุกประเภท — ดิน หญ้า ทราย น้ำ
> ใช้ procedural geometry ไม่ต้องเก็บ model

---

## Ground Types (6 แบบ)

### 1. Tatami (Home zone)
- **Use:** พื้นห้องญี่ปุ่น
- **Material:** `tatami`
- **Size:** 1m × 2m ต่อแผ่น
- **Pattern:** grid เห็นชัด
- **Edge:** ขอบเข้ม (border)

### 2. Wood Floor (Home, School)
- **Use:** พื้นไม้ภายใน
- **Material:** `wood.japanese_oak` (home) / `wood.dark_walnut` (school)
- **Pattern:** plank lines
- **Tone:** warm, slightly worn

### 3. Concrete (School, Shopping)
- **Use:** พื้นคอนกรีตภายนอก
- **Material:** `concrete.modern` / `concrete.sidewalk`
- **Pattern:** ไม่มี (uniform)
- **Detail:** hairline cracks + stains

### 4. Asphalt (Station, Shopping)
- **Use:** ถนน
- **Material:** `asphalt.road`
- **Color:** dark gray
- **Detail:** aggregate grain + road markings

### 5. Grass (School, Shrine)
- **Use:** สนามหญ้า
- **Material:** `leaf.bamboo` (green variant)
- **Density:** dense short blades
- **Variation:** subtle color variation

### 6. Sand/Gravel (Shrine)
- **Use:** พื้นสวนญี่ปุ่น
- **Material:** `concrete.sidewalk` (lighter variant)
- **Pattern:** raked lines (zen garden)
- **Decoration:** ก้อนหินเรียง

---

## Water Types (2 แบบ)

### 1. Pond (Shrine)
- **Use:** บ่อน้ำ koi
- **Material:** `water.pond`
- **Size:** 8m × 5m
- **Color:** `#B8DCE6` (light blue)
- **Effect:** gentle ripple
- **Decoration:** koi fish (3-5 ตัว), lotus leaves

### 2. Fountain (School)
- **Use:** น้ำพุเล็กกลางสนาม
- **Material:** `water.pond` + `concrete.modern` (base)
- **Size:** 2m × 2m
- **Effect:** water particles + ripple
- **Optional:** สำหรับ zone 2

---

## Material Mapping

| Surface | Material | Zones |
|---------|----------|-------|
| Tatami | `tatami` | 1 |
| Wood floor (home) | `wood.japanese_oak` | 1 |
| Wood floor (school) | `wood.dark_walnut` | 2 |
| Concrete (modern) | `concrete.modern` | 2, 4 |
| Sidewalk | `concrete.sidewalk` | 3, 4 |
| Asphalt | `asphalt.road` | 3, 4 |
| Grass | procedural | 2, 5 |
| Sand/gravel | `concrete.sidewalk` (light) | 5 |
| Water | `water.pond` | 5 |

---

## Geometry Strategy

### Ground Plane
- Default: PlaneGeometry ขนาด zone (100×100m)
- ใช้ MeshStandardMaterial
- castShadow: false (ground ไม่ส่ง shadow)
- receiveShadow: true (รับ shadow)

### Custom Geometry
- สำหรับ irregular shapes (บ่อ, สนาม)
- ใช้ Shape + ExtrudeGeometry
- หรือ custom BufferGeometry

### Subdivision
- Plane subdivisions: 1 (no need for ground)
- Water: 64×64 (for ripple)
- Grass: instanced (1000+ instances)

---

## Code Example

```javascript
import { getMaterial } from '../05_MATERIALS/material_factory.js';

function buildGround(env, zone, config) {
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    getMaterial(config.material)
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  env.add(ground);
}
```

---

## Performance

### Per Zone
- 1-3 ground planes
- Total: < 500 tris per zone
- 1 water plane (zone 5)
- Total water tris: 8,000 (with subdivision)

### Streaming
- Ground โหลดพร้อม zone
- Water โหลดแค่ zone 5

---

## Quick Reference

```
ground types: 6 (tatami, wood, concrete, sidewalk, asphalt, grass)
water types: 2 (pond, fountain)
material: ทั้งหมดจาก 05_MATERIALS/PBR_palette.json
geometry: procedural (Three.js primitives)
```

---

**Version:** 1.0
**Last updated:** 2026-07-12
