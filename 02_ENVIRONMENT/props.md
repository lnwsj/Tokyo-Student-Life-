# 🪨 Props & Street Furniture — Tokyo Student Life
## 小道具とストリートファニチャー

> ก้อนหิน ถังขยะ ม้านั่ง ตู้ขายของ ป้าย ฯลฯ
> ใช้ procedural + Three.js primitives

---

## Prop Categories (5)

### 1. Rocks (ก้อนหิน)
- **Types:** small (0.3m), medium (0.5m), large (1m)
- **Material:** `concrete.sidewalk` (variation)
- **Use:** สวนหิน (shrine), ริมทาง, ใต้ต้นไม้
- **Shape:** IcosahedronGeometry (irregular)
- **Density:** sparse

### 2. Benches (ม้านั่ง)
- **Types:** wood, metal, stone
- **Material:** `wood.japanese_oak` + `metal.brushed_aluminum`
- **Size:** 1.5m × 0.4m × 0.5m
- **Use:** สวน, สถานี, ศาลเจ้า
- **Color:** warm wood + dark metal

### 3. Vending Machines (ตู้ขายของ)
- **Type:** single unit
- **Material:** `plastic.vending_machine`
- **Size:** 0.8m × 1.8m × 0.6m
- **Use:** station, shopping
- **Detail:** window, button, slot, branding

### 4. Trash Cans (ถังขยะ)
- **Type:** Japanese style (5-bin separation)
- **Material:** `metal.brushed_aluminum`
- **Size:** 0.4m × 0.8m × 0.4m
- **Use:** ทุก zone ที่มีคน
- **Color:** gray + colored labels

### 5. Signs / Posts (ป้าย / เสา)
- **Types:** 
  - Street sign (vertical)
  - Bus stop sign
  - Shop sign (hanging)
  - Direction sign
- **Material:** `metal.brushed_aluminum` + `paper.signage`
- **Use:** station, shopping

---

## Other Props

### Mailbox (ตู้จดหมาย)
- Red Japanese style
- `metal.brushed_aluminum` + paint
- Zone: 1 (Home), 3 (Station)

### Lamp Post (เสาไฟ)
- Street light
- `metal.brushed_aluminum` + emissive
- Zone: 3 (Station), 4 (Shopping)

### Bicycle (จักรยาน)
- Player + NPC
- `metal.brushed_aluminum` + `fabric.school_uniform_navy`
- Zone: all (player has 1)

### Bicycles Parked (จักรยานจอด)
- 5-10 คัน
- Zone: 1 (Home), 2 (School)

### Bollard (เสากันชน)
- Short post
- `concrete.modern` or `metal.brushed_aluminum`
- Zone: 2, 3

### Planter (กระถาง)
- With small plant
- `ceramic.tiles` + plant
- Zone: 1, 2, 3, 4

### Awning (ผ้าใบ)
- Shop cover
- `fabric.cotton_casual` (striped)
- Zone: 4 (Shopping)

### Stone Lantern (โคมหิน)
- Japanese style
- `stone.torii_red` (or gray)
- Zone: 5 (Shrine)

### Wooden Bridge (สะพานไม้)
- Curved wooden bridge
- `wood.shrine`
- Zone: 5 (Shrine)

### Wind Chime (风铃)
- Hanging decoration
- `metal.brushed_aluminum` + `wood.bamboo`
- Zone: 1 (Home), 5 (Shrine)

---

## Zone Distribution

### 🏠 Home (Zone 1)
- Bicycles: 1 (player's)
- Planters: 2-3 (balcony)
- Wind chime: 1
- Trash can: 1 (entrance)
- Mailbox: 1 (street)

### 🏫 School (Zone 2)
- Benches: 4-6 (yard)
- Bicycles: 10-15 (parking)
- Bollards: 4-6 (entrance)
- Planters: 2-3
- Trash cans: 2-3

### 🚉 Station (Zone 3)
- Vending machines: 3-4
- Benches: 2-3 (platform)
- Trash cans: 2-3
- Lamp posts: 3-4
- Signs: 2-3
- Mailbox: 1

### 🛍️ Shopping (Zone 4)
- Vending machines: 1-2
- Benches: 1-2
- Trash cans: 2-3
- Lamp posts: 3-4
- Awnings: 5-8
- Signs: 5-8 (with neon)
- Bicycles: 3-5 (parked)

### ⛩️ Shrine (Zone 5)
- Stone lanterns: 5-6
- Benches: 1-2
- Wooden bridge: 1
- Stone path: integrated
- Wind chimes: 2-3
- Offering box: 1
- Ema boards: 1 (wooden plaque wall)

---

## Geometry Strategy

### Rock
```javascript
const rock = new THREE.Mesh(
  new THREE.IcosahedronGeometry(0.3, 0),  // low poly
  getMaterial('concrete.sidewalk', { variation: 0.5 })
);
rock.scale.set(1, 0.7, 1.2);  // irregular shape
rock.rotation.y = Math.random() * Math.PI;
```

### Bench
```javascript
const bench = new THREE.Group();
// Seat
const seat = new THREE.Mesh(
  new THREE.BoxGeometry(1.5, 0.05, 0.4),
  getMaterial('wood.japanese_oak')
);
seat.position.y = 0.45;
bench.add(seat);
// Legs
for (let i = -1; i <= 1; i += 2) {
  const leg = new THREE.Mesh(
    new THREE.BoxGeometry(0.05, 0.45, 0.4),
    getMaterial('metal.brushed_aluminum')
  );
  leg.position.set(i * 0.6, 0.225, 0);
  bench.add(leg);
}
```

### Vending Machine
```javascript
const vending = new THREE.Group();
const body = new THREE.Mesh(
  new THREE.BoxGeometry(0.8, 1.8, 0.6),
  getMaterial('plastic.vending_machine')
);
body.position.y = 0.9;
body.castShadow = true;
vending.add(body);

// Window (emissive)
const window = new THREE.Mesh(
  new THREE.PlaneGeometry(0.6, 1.0),
  getMaterial('glass.window')
);
window.position.set(0, 1.0, 0.31);
vending.add(window);

// Button panel
const buttons = new THREE.Mesh(
  new THREE.PlaneGeometry(0.3, 0.3),
  getMaterial('metal.brushed_aluminum')
);
buttons.position.set(0.2, 0.5, 0.31);
vending.add(buttons);
```

### Trash Can
```javascript
const trash = new THREE.Group();
const body = new THREE.Mesh(
  new THREE.CylinderGeometry(0.2, 0.2, 0.8, 12),
  getMaterial('metal.brushed_aluminum')
);
body.position.y = 0.4;
trash.add(body);

// Lid
const lid = new THREE.Mesh(
  new THREE.SphereGeometry(0.2, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2),
  getMaterial('metal.brushed_aluminum')
);
lid.position.y = 0.8;
trash.add(lid);
```

### Stone Lantern
```javascript
const lantern = new THREE.Group();
// Base
const base = new THREE.Mesh(
  new THREE.CylinderGeometry(0.2, 0.25, 0.3, 6),
  getMaterial('stone.torii_red', { variation: 0.3 })
);
// Post
const post = new THREE.Mesh(
  new THREE.CylinderGeometry(0.08, 0.08, 0.8, 6),
  getMaterial('stone.torii_red', { variation: 0.3 })
);
post.position.y = 0.55;
// Light box (emissive)
const light = new THREE.Mesh(
  new THREE.BoxGeometry(0.3, 0.3, 0.3),
  new THREE.MeshStandardMaterial({
    color: 0xFFD194,
    emissive: 0xFFD194,
    emissiveIntensity: 0.5
  })
);
light.position.y = 1.1;
// Roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(0.3, 0.2, 4),
  getMaterial('stone.torii_red', { variation: 0.3 })
);
roof.position.y = 1.35;
roof.rotation.y = Math.PI / 4;
```

---

## Scatter Rules

### Density
- ใช้จาก scatter_rules.json
- Random position within zone
- Avoid overlap with other objects

### Min Distance
- Prop to prop: 1m
- Prop to building: 1.5m
- Prop to path: 0.5m
- Trash can to trash can: 5m

### Rotation
- Y rotation: random
- Always upright (no tilt)

### Variation
- Color: from variation array
- Scale: ±5%
- Rotation: random Y

---

## Performance

### Per Zone
- 10-30 props per zone
- Total tris: 5,000 - 20,000
- Instanced for similar props (trash cans)

### Optimization
- Use shared geometry
- LOD for distant props
- Skip small props at distance

---

## Quick Reference

```
prop types: 14 (rocks, benches, vending, trash, signs, mailbox, lamp, bike, bollard, planter, awning, lantern, bridge, wind chime)
zones: all
material: ใช้จาก 05_MATERIALS/PBR_palette.json
geometry: procedural + Three.js primitives
```

---

**Version:** 1.0
**Last updated:** 2026-07-12
