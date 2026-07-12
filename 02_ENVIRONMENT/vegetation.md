# 🌳 Vegetation — Tokyo Student Life
## 植生

> ต้นไม้ พุ่มไม้ หญ้า ใบไม้
> ใช้ procedural geometry + instancing

---

## Plant Types (8 แบบ)

### 🌸 Sakura (ซากุระ)
- **Use:** ต้นไม้ประดับ ทุก zone
- **Color:** `#F5CCD5` (light pink)
- **Size:** trunk 3m + canopy 4m radius
- **Season:** late March - early April
- **Effect:** petals falling (continuous)
- **Material:** `leaf.sakura` (canopy) + `wood.japanese_oak` (trunk)

### 🍃 Ginkgo (กิงโกะ)
- **Use:** ต้นไม้ใหญ่ ในสวน / ศาลเจ้า
- **Color:** `#E8D058` (golden yellow)
- **Size:** trunk 4m + canopy 5m radius
- **Season:** late April (ออกใบอ่อน)
- **Material:** `leaf.ginkgo` + `wood.shrine`

### 🎋 Bamboo (ไผ่)
- **Use:** กอไผ่ ริมทาง / ศาลเจ้า
- **Color:** `#6B8E5A` (green)
- **Size:** 6-8m tall
- **Growth:** cluster of 3-7 stems
- **Material:** `leaf.bamboo` + `wood.bamboo`

### 🌳 Pine (สน)
- **Use:** ต้นไม้ประดับ สวนญี่ปุ่น
- **Color:** `#5A7A4A` (dark green)
- **Size:** 4m + canopy 3m radius
- **Style:** stylized cone
- **Material:** custom dark green

### 🌲 Deciduous (ไม้ผลัดใบ)
- **Use:** ต้นไม้ทั่วไป ริมถนน
- **Color:** `#7A9A6A` (medium green)
- **Size:** 3-4m + canopy 3m radius
- **Style:** round canopy
- **Material:** custom green

### 🌿 Hedge (พุ่มไม้)
- **Use:** รั้วต้นไม้ แบ่งเขต
- **Color:** `#6B8E5A` (green)
- **Size:** 0.5-1m tall
- **Style:** rectangular box (slight bumpy)
- **Material:** custom dark green

### 🌱 Grass (หญ้า)
- **Use:** พื้นสนาม
- **Color:** `#A8C490` (light green)
- **Style:** 2-3 blade shapes
- **Density:** 1000+ instances
- **Material:** `leaf.bamboo` (variation)

### 🍂 Fallen Leaves (ใบไม้ร่วง)
- **Use:** particle on ground
- **Color:** mix of pink, yellow, green
- **Density:** sparse
- **Material:** `leaf.sakura` (variation)

---

## Zone Distribution

| Zone | Tree Types | Count | Notes |
|------|------------|-------|-------|
| 🏠 Home | small deciduous | 1-2 | ริมระเบียง |
| 🏫 School | sakura, deciduous | 4-6 | สนาม |
| 🚉 Station | small deciduous | 2-3 | ริมถนน |
| 🛍️ Shopping | small deciduous | 2-3 | ริมตึก |
| ⛩️ Shrine | sakura, ginkgo, bamboo | 8-12 | ในสวน |

---

## Geometry Strategy

### Tree (3 Parts)
```javascript
// Trunk
const trunk = new THREE.Mesh(
  new THREE.CylinderGeometry(0.2, 0.3, 3, 8),
  getMaterial('wood.japanese_oak')
);

// Canopy (irregular sphere)
const canopy = new THREE.Mesh(
  new THREE.SphereGeometry(2.5, 12, 8),
  getMaterial('leaf.sakura')
);
canopy.position.y = 3.5;
canopy.scale.set(1, 0.7, 1);  // flatter
```

### Bamboo Cluster
```javascript
// 5 stems clustered
for (let i = 0; i < 5; i++) {
  const stem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 6, 6),
    getMaterial('wood.bamboo')
  );
  stem.position.set(
    (Math.random() - 0.5) * 0.5,
    3,
    (Math.random() - 0.5) * 0.5
  );
}
```

### Grass (Instanced)
```javascript
// 1000 grass blades
const grassGeo = new THREE.PlaneGeometry(0.05, 0.3);
const grassMesh = new THREE.InstancedMesh(grassGeo, grassMat, 1000);

for (let i = 0; i < 1000; i++) {
  const matrix = new THREE.Matrix4();
  matrix.setPosition(
    (Math.random() - 0.5) * 50,
    0.15,
    (Math.random() - 0.5) * 50
  );
  grassMesh.setMatrixAt(i, matrix);
}
grassMesh.castShadow = false;
```

### Hedge
```javascript
// Box with slight noise
const hedge = new THREE.Mesh(
  new THREE.BoxGeometry(2, 0.8, 0.5, 4, 2, 2),
  getMaterial('custom_green')
);
// Apply slight vertex displacement for natural look
```

---

## Scatter Rules

### Density per Zone
- Home: 1-2 trees (sparse)
- School: 4-6 trees (medium)
- Station: 2-3 trees (sparse)
- Shopping: 1-3 trees (sparse)
- Shrine: 8-12 trees + bamboo (dense)

### Min Distance
- Tree to tree: 3m
- Tree to building: 2m
- Tree to path: 1m
- Tree to player: 0m (player can walk under)

### Rotation
- Random Y rotation
- No tilt (always upright)
- Scale variation: ±10%

---

## Variation per Tree

### Position
- Hand-placed (key trees)
- Random scatter (background trees)

### Scale
- 0.9 - 1.1 of base
- Random per instance

### Color
- Variation array
- Slight hue shift

### Shape
- Same geometry
- Random rotation only

---

## Performance

### Per Zone
- Trees: 2-12 instances
- Grass: 0-1000 instances
- Hedge: 0-3 instances
- Total tris (with grass): ~50,000 max

### Optimization
- Use InstancedMesh for grass
- Use shared geometry for same species
- Limit tree count to 12 per zone

### LOD
- LOD0 (close): full detail
- LOD1 (medium): simplified canopy (sphere, not subdivided)
- LOD2 (far): billboard (sprite)

---

## Effect Integration

### Petals (Sakura)
- Continuous falling particles
- 20-50 particles per tree
- Color: pink + slight white
- Wind: gentle drift

### Leaves (Bamboo)
- เคลื่อนไหวเล็กน้อย (wind)
- ไม่ตก (ต้น bamboo ไม่ผลัดใบ)

### Ground Leaves
- ใต้ต้นไม้ มีใบร่วงเล็กน้อย
- Density: 5-10 ต่อต้น

---

## Code Example: Build Tree

```javascript
function buildSakuraTree(env, position, scale = 1) {
  const tree = new THREE.Group();
  tree.name = 'sakura_tree';
  
  // Trunk
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.15, 0.25, 3, 8),
    getMaterial('wood.japanese_oak', { variation: 0.3 })
  );
  trunk.position.y = 1.5;
  trunk.castShadow = true;
  tree.add(trunk);
  
  // Canopy (irregular)
  const canopy = new THREE.Mesh(
    new THREE.IcosahedronGeometry(2, 1),
    getMaterial('leaf.sakura')
  );
  canopy.position.y = 3.5;
  canopy.scale.set(1, 0.6, 1);
  canopy.castShadow = true;
  tree.add(canopy);
  
  // Petals effect (will be added by particle system)
  // tree.userData.effect = 'sakura_petals';
  
  tree.position.copy(position);
  tree.scale.setScalar(scale);
  env.add(tree);
  return tree;
}
```

---

## Quick Reference

```
plant types: 8 (sakura, ginkgo, bamboo, pine, deciduous, hedge, grass, leaves)
zones using: all
material: leaf.sakura, leaf.ginkgo, leaf.bamboo, wood.japanese_oak, etc.
geometry: procedural + instanced
```

---

**Version:** 1.0
**Last updated:** 2026-07-12
