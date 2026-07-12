# 📦 Materials Bible — Tokyo Student Life
## マテリアル聖書

> **25 materials** — รากฐานของ visual consistency
> "เมื่อ material เหมือนกัน → เกมเป็นโลกเดียวกัน"

---

## Why Materials Matter Most

> **"Material เป็น 50% ของความเป็นโลกเดียวกัน"**
> — ถ้า texture palette + lighting ตรงกัน → asset ต่างกันก็ยังดูเป็นเกมเดียวกัน

---

## Material Categories (8 หมวด, 25 materials)

### 🪵 Wood (5)
| ID | Material | Use | Color |
|----|----------|-----|-------|
| `wood.japanese_oak` | ไม้โอ๊คญี่ปุ่น | เฟอร์นิเจอร์, ของใช้ | #C8A26A |
| `wood.dark_walnut` | ไม้วอลนัทเข้ม | โต๊ะเรียน, เก้าอี้ | #5C4530 |
| `wood.bamboo` | ไม้ไผ่ | เสา, ราว, เครื่องใช้ | #A8B07A |
| `wood.light_pine` | ไม้สนอ่อน | ตู้, ชั้นวาง | #D4B280 |
| `wood.shrine` | ไม้ศาลเจ้า | ศาลเจ้า, สะพาน | #8B6F47 |

### 🧵 Fabric (3)
| ID | Material | Use | Color |
|----|----------|-----|-------|
| `fabric.school_uniform_navy` | ชุดนักเรียน (น้ำเงิน) | เสื้อนักเรียน | #2D4A6B |
| `fabric.school_uniform_white` | ชุดนักเรียน (ขาว) | เสื้อเชิ้ต | #F0EDE5 |
| `fabric.cotton_casual` | ผ้าฝ้าย | เสื้อลำลอง, ผ้าม่าน | #E8D5BC |

### 🪨 Stone / Mineral (4)
| ID | Material | Use | Color |
|----|----------|-----|-------|
| `concrete.modern` | คอนกรีตสมัยใหม่ | ตึก, ผนัง | #B8AFA0 |
| `concrete.sidewalk` | คอนกรีตทางเท้า | ทางเท้า, ลาน | #A89F90 |
| `asphalt.road` | แอสฟัลต์ | ถนน, ลานจอด | #5A5650 |
| `stone.torii_red` | หินทาสีแดง | โทริอิ, เสาศาลเจ้า | #CC4A2C |

### 🔩 Metal (2)
| ID | Material | Use | Color |
|----|----------|-----|-------|
| `metal.brushed_aluminum` | อะลูมิเนียม brushed | ราว, ป้าย, ขอบหน้าต่าง | #B8B8B0 |
| `metal.rusted_train` | เหล็กเป็นสนิม | รถไฟ, เครื่องจักรเก่า | #7A6B5A |

### 📄 Paper (2)
| ID | Material | Use | Color |
|----|----------|-----|-------|
| `paper.shoji` | กระดาษโชจิ | ประตู, ฉาก | #F8F2E0 |
| `paper.signage` | กระดาษป้าย | ป้ายร้าน, ป้ายโฆษณา | #FAF6EE |

### 🌿 Natural (5)
| ID | Material | Use | Color |
|----|----------|-----|-------|
| `leaf.sakura` | ใบซากุระ | ต้นซากุระ, กลีบร่วง | #F5CCD5 |
| `leaf.ginkgo` | ใบกิงโกะ | ต้นกิงโกะ | #E8D058 |
| `leaf.bamboo` | ใบไผ่ | ต้นไผ่ | #6B8E5A |
| `tatami` | เสื่อทาทามิ | พื้นญี่ปุ่น | #B8A872 |
| `water.pond` | น้ำในบ่อ | บ่อน้ำ, สระ | #B8DCE6 |

### 💎 Synthetic (3)
| ID | Material | Use | Color |
|----|----------|-----|-------|
| `glass.window` | กระจกหน้าต่าง | หน้าต่าง, กระจก | #D6EEF5 |
| `ceramic.tiles` | กระเบื้องเซรามิก | พื้น, ผนัง, ห้องน้ำ | #EAE0CE |
| `plastic.vending_machine` | พลาสติก | ตู้ขายของ | #C8BFB0 |

### 💡 Special (1)
| ID | Material | Use | Color |
|----|----------|-----|-------|
| `neon.warm` | นีออนอุ่น (emissive) | ป้ายร้าน, ตกแต่ง | #FF6B35 |

---

## Material Distribution per Zone

### Zone 1: Home (8 materials)
```
wood.japanese_oak, wood.dark_walnut, wood.light_pine,
fabric.cotton_casual, paper.shoji, tatami,
glass.window, ceramic.tiles
```

### Zone 2: School (7 materials)
```
concrete.modern, wood.dark_walnut, fabric.school_uniform_navy,
fabric.school_uniform_white, metal.brushed_aluminum,
glass.window, ceramic.tiles
```

### Zone 3: Station (6 materials)
```
asphalt.road, concrete.sidewalk, metal.rusted_train,
glass.window, metal.brushed_aluminum, plastic.vending_machine
```

### Zone 4: Shopping (6 materials)
```
concrete.modern, metal.brushed_aluminum, paper.signage,
neon.warm, ceramic.tiles, fabric.cotton_casual
```

### Zone 5: Shrine (6 materials)
```
stone.torii_red, wood.shrine, water.pond,
leaf.sakura, leaf.ginkgo, leaf.bamboo
```

---

## Common Rules (ทุก material ต้องตาม)

### 1. Roughness Range
- Wood: 0.65 - 0.85
- Concrete: 0.80 - 0.95
- Fabric: 0.85 - 0.95
- Metal: 0.30 - 0.55
- Glass: 0.05 - 0.15
- Plastic: 0.50 - 0.70
- Paper: 0.90 - 0.98
- Stone: 0.75 - 0.90
- Leaf: 0.50 - 0.75
- Water: 0.05 - 0.15 (mirror-like)
- Ceramic: 0.40 - 0.60
- Neon: 0.30 - 0.50 (emissive)

### 2. Metallic Range
- ส่วนใหญ่: 0.0
- Metal: 0.85 - 1.0
- Water: 0.0 (transparent แทน)
- Neon: 0.0 (emissive แทน)
- Glass: 0.0

### 3. Color Saturation
- ≤ 60% (ไม่ primary color เต็ม)
- ทุก color เป็น pastel variant
- ❌ ห้าม pure RGB (255, 0, 0)

### 4. Normal Scale
- Subtle: 0.3 - 0.6
- ไม่ exaggerated
- Wood grain: 0.4
- Concrete: 0.3
- Fabric weave: 0.4
- Stone: 0.5

### 5. Subtle Variation
- ทุก material มี variation 3-5 สี (ใน palette)
- Random เลือกตอน instance
- ไม่ uniform color

### 6. Wear Pattern
- ทุก material มี slight wear (2-5% area)
- Dust เล็กน้อย
- ไม่ brand new

---

## Material Priority (ความสำคัญ)

### ⭐ Critical (ใช้บ่อยสุด)
- wood.japanese_oak
- wood.dark_walnut
- concrete.modern
- fabric.school_uniform_navy
- glass.window
- leaf.sakura

### 🌟 Important (ใช้บ่อย)
- fabric.school_uniform_white
- metal.brushed_aluminum
- asphalt.road
- paper.shoji
- tatami
- water.pond
- neon.warm

### 💫 Standard (ใช้บางครั้ง)
- wood.bamboo
- wood.light_pine
- wood.shrine
- fabric.cotton_casual
- concrete.sidewalk
- stone.torii_red
- leaf.ginkgo
- leaf.bamboo
- ceramic.tiles
- paper.signage
- metal.rusted_train
- plastic.vending_machine

---

## Workflow: การใช้ Materials

### Step 1: เลือก Material
- ดูจาก categories + zone distribution
- ใช้ PBR_palette.json เป็นแหล่งข้อมูล

### Step 2: Get Material Instance
```javascript
import { getMaterial } from './material_factory.js';

const woodMaterial = getMaterial('wood.japanese_oak');
mesh.material = woodMaterial;
```

### Step 3: Variation (Optional)
```javascript
const woodMaterial = getMaterial('wood.japanese_oak', {
  variation: 0.3,  // 0-1: random color shift
  wear: 0.1,       // 0-1: amount of wear
});
```

### Step 4: Override (Special Cases)
```javascript
const customMaterial = getMaterial('wood.japanese_oak', {
  color: '#A8895A',  // override base color
  roughness: 0.85,   // override roughness
});
```

---

## Material Combinations (Examples)

### 🏠 Home Apartment
- Floor: tatami
- Wall: plaster (use fabric.cotton_casual)
- Window frame: metal.brushed_aluminum
- Glass: glass.window
- Furniture: wood.japanese_oak
- Closet: wood.light_pine
- Curtain: fabric.cotton_casual
- Door: paper.shoji (frame + wood)

### 🏫 School Building
- Wall: concrete.modern
- Floor: wood.dark_walnut (ห้องเรียน)
- Window: glass.window
- Window frame: metal.brushed_aluminum
- Desk: wood.dark_walnut
- Chair: wood.dark_walnut
- Uniform: fabric.school_uniform_navy

### 🚉 JR Station
- Floor: concrete.sidewalk
- Wall: concrete.modern
- Vending machine: plastic.vending_machine
- Train: metal.rusted_train
- Window: glass.window
- Handrail: metal.brushed_aluminum
- Sign: paper.signage

### 🛍️ Shopping District
- Wall: concrete.modern
- Floor: ceramic.tiles
- Sign: paper.signage
- Neon: neon.warm
- Frame: metal.brushed_aluminum
- Awning: fabric.cotton_casual

### ⛩️ Shrine
- Torii: stone.torii_red
- Building: wood.shrine
- Bridge: wood.shrine
- Pond: water.pond
- Trees: leaf.sakura + leaf.ginkgo
- Stone: stone.torii_red (or variant)

---

## Color Reference (Quick Lookup)

### Warm
- Wood: #C8A26A, #5C4530, #A8B07A, #D4B280, #8B6F47
- Stone: #CC4A2C
- Fabric: #F0EDE5, #E8D5BC

### Cool
- Concrete: #B8AFA0, #A89F90
- Asphalt: #5A5650
- Glass: #D6EEF5
- Water: #B8DCE6
- Sky: #B8DCE6, #D6EEF5

### Navy
- Uniform: #2D4A6B
- Variation: #1A3A5B, #3D5A7B

### Accent
- Sakura: #E8B4BC, #F5CCD5
- Ramen orange: #FFB347
- Ginkgo: #E8D058
- Leaf green: #6B8E5A, #A8C490
- Neon: #FF6B35

### Neutral
- Cream: #F5F0E6, #FAF6EE, #EAE0CE
- Paper: #F8F2E0, #FAF6EE
- Tatami: #B8A872

---

## ดู Spec เต็มที่ไหน

- `PBR_palette.json` — 25 materials, full PBR specs
- `texture_specs.md` — texture sizes, tiling, format
- `material_factory.js` — code to instantiate
- `texture_generator.js` — procedural texture generation
- `materials/*.json` — individual material breakdown (top 10)

---

**Version:** 1.0
**Last updated:** 2026-07-12
