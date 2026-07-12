# 🖼️ Texture Specs — Tokyo Student Life
## テクスチャ仕様

> กฎการ generate texture — ขนาด, format, tiling, generation method
> เน้น **procedural generation** เพื่อความเร็วและคุมโทน

---

## Generation Strategy

### Primary: Procedural Canvas
- สร้าง texture ด้วย HTML5 Canvas + JavaScript
- Runtime generation — ไม่ต้องเก็บ PNG
- คุม style ได้ 100%
- เปลี่ยน variation ได้
- ฟรี — ไม่ต้อง image generation

### Secondary: AI-Generated (Optional)
- ใช้ DALL-E / Midjourney สำหรับ hero texture
- Save as PNG ใน `textures/` folder
- ใช้สำหรับ background / hero assets

### Tertiary: CC0 Stock
- Poly Haven, ambientCG
- สำหรับ HDR environment maps
- สำหรับ complex materials (rock, wood bark)

---

## Texture Sizes (by Use)

| Use | Size | Format | Note |
|-----|------|--------|------|
| Hero prop (close-up) | 1024×1024 | PNG | Vending machine, shrine wood |
| Standard prop | 512×512 | PNG | Furniture, signs |
| Background prop | 256×256 | PNG | Trash, leaves |
| Tile (floor/wall) | 1024×1024 | PNG | ใช้ tiling |
| Skybox / HDR | 2048×1024 | HDR | Poly Haven |
| Normal map | 512×512 | PNG | Linear color space |
| Roughness map | 256×256 | PNG | Linear |
| AO map | 512×512 | PNG | Linear |
| Sprite (particle) | 128×128 | PNG | With alpha |
| Icon (UI) | 64×64 / 128×128 | SVG / PNG | Vector preferred |

---

## Format Rules

### Color Texture (Base Color / Diffuse)
- **Format:** PNG
- **Color space:** sRGB
- **Bit depth:** 8-bit (ไม่จำเป็นต้อง 16)
- **Channels:** RGB (no alpha ยกเว้น sprite)

### Normal Map
- **Format:** PNG
- **Color space:** Linear
- **Channels:** RGB (X, Y, Z)
- **Convention:** OpenGL (Y up) — Three.js default
- **Strength:** 0.3 - 0.6 (ไม่ exaggerated)

### Roughness Map
- **Format:** PNG (grayscale)
- **Color space:** Linear
- **Channels:** R (only)
- **Range:** 0.0 (smooth) → 1.0 (rough)

### Metallic Map
- **Format:** PNG (grayscale)
- **Color space:** Linear
- **Channels:** R (only)
- **Range:** 0.0 (non-metal) → 1.0 (metal)

### AO Map (Ambient Occlusion)
- **Format:** PNG (grayscale)
- **Color space:** Linear
- **Channels:** R (only)
- **Range:** 0.0 (occluded) → 1.0 (open)

### HDR Environment
- **Format:** HDR (EXR or Radiance)
- **Source:** Poly Haven CC0
- **Size:** 2048×1024 minimum
- **Note:** Use PMREMGenerator for IBL

---

## Tiling Strategy

### Per Material
| Material | Tiling | Reason |
|----------|--------|--------|
| Wood (long) | 2, 2 | Reduce repetition |
| Wood (stripes) | 4, 1 | Match grain direction |
| Concrete (smooth) | 3, 3 | Large flat surface |
| Concrete (rough) | 4, 4 | Sidewalk |
| Asphalt | 4, 4 | Small grain |
| Fabric (weave) | 3, 3 | Tight pattern |
| Tile | 4, 4 | Match grid |
| Bamboo | 4, 1 | Long stripes |
| Stone | 2, 2 | Medium surface |
| Leaf | 1, 1 | Single leaf |
| Paper | 1, 1 | Single sheet |

### Per Object
- ปรับ tiling ตามขนาด object
- Object ใหญ่ → tiling มากขึ้น
- Object เล็ก → tiling น้อยลง
- Never มากกว่า 8 (จะเห็น pattern)

---

## Texture Variation (per instance)

### Color Variation
- Random เลือกจาก `variation` array
- ±5% lightness
- ±2% hue shift (subtle)
- ❌ ไม่ขยับเยอะ (จะไม่ consistent)

### Normal Variation
- Same normal map
- Random rotation (0°, 90°, 180°, 270°)
- Mirror optional
- Scale variation ±5%

### Roughness Variation
- ±0.1 from base
- Per-instance random
- ไม่ uniform

### Wear Pattern
- Random mask overlay
- 2-5% of surface
- Lower roughness in wear area (0.6)
- Subtle color shift toward dirt

---

## Procedural Generators (ตัวอย่าง)

### Wood Grain
```javascript
generateWoodTexture('oak', 512)
// 1. Base color
// 2. Horizontal grain lines (Bezier curves)
// 3. Subtle noise overlay
// 4. Knot spots (rare)
// 5. Color variation bands
// Output: CanvasTexture
```

### Concrete
```javascript
generateConcreteTexture(512)
// 1. Base color
// 2. Random noise (sparse)
// 3. Hairline cracks (rare)
// 4. Subtle stains
// 5. Edge darkening
// Output: CanvasTexture
```

### Fabric (Weave)
```javascript
generateWeaveTexture(256)
// 1. Base color
// 2. Vertical threads
// 3. Horizontal threads
// 4. Subtle noise between
// 5. Slight specular variation
// Output: CanvasTexture
```

### Tatami
```javascript
generateTatamiTexture(512)
// 1. Base color
// 2. Tight horizontal weave
// 3. Border edge darkening
// 4. Slight color gradient
// Output: CanvasTexture
```

### Stone (Rough)
```javascript
generateStoneTexture(512)
// 1. Base color
// 2. Irregular cell pattern
// 3. Cell edge darkening
// 4. Random pitting
// Output: CanvasTexture
```

### Leaf
```javascript
generateLeafTexture(256, 'sakura')
// 1. Base color (petal pink)
// 2. Central vein
// 3. Side veins
// 4. Edge darkening
// 5. Subtle gradient
// Output: CanvasTexture
```

### Water Normal
```javascript
generateWaterNormal(512)
// 1. Perlin noise field
// 2. Multiple octaves
// 3. Animated (UV scroll)
// Output: Normal map
```

### Paper
```javascript
generatePaperTexture(256)
// 1. Base color (cream)
// 2. Fiber pattern (random lines)
// 3. Subtle noise
// 4. Edge darker
// Output: CanvasTexture
```

---

## HDR Environment

### Required (for PBR IBL)
- **Source:** Poly Haven CC0
- **Recommended:** 
  - `kloppenheim_06_puresky_1k.hdr` (สำหรับ clear day)
  - `industrial_sunset_puresky_1k.hdr` (สำหรับ golden hour)
  - `kiara_1_dawn_1k.hdr` (สำหรับเช้า)
- **Size:** 1k (1024×512) for performance
- **Processing:** PMREMGenerator
- **Use:** Environment map สำหรับ metal/glass reflection

### Per Time of Day
- Morning: kiara_1_dawn
- Noon: kloppenheim_06_puresky
- Evening: industrial_sunset_puresky
- Night: สร้าง procedural (ดาว + city light)
- Shrine sunset: industrial_sunset (warmer)

---

## Mipmap & Filtering

### Mipmap
- Generate mipmaps: **true** (default)
- Reduce aliasing
- Better quality at distance

### Filtering
- Magnification: **LinearFilter**
- Minification: **LinearMipmapLinearFilter**
- Anisotropy: **4** (default)
- Hero texture: **8** or **16**

### Wrap
- Wrap S / T: **RepeatWrapping** (default)
- ยกเว้น: ClampToEdgeWrapping สำหรับ UI

---

## Texture Atlas & Batching

### เมื่อไหร่ใช้ Atlas
- Multiple small textures same material
- UI icons (1 atlas)
- Particle (1 atlas)
- ตัวละคร (1 atlas per character)

### เมื่อไหร่แยก Texture
- Hero assets (ใหญ่)
- Materials ต่างกัน
- Different lighting response

---

## Performance Budget

### Total Texture Memory
- Budget: **< 100MB**
- Most textures: 256-512px
- Few hero textures: 1024px
- HDR: 1k (1-2MB)
- Atlas: 1024×1024 per major category

### Streaming Strategy
- Load textures ตาม zone
- Preload: zone ปัจจุบัน + adjacent
- Unload: zone ที่ห่าง > 150m
- First frame: ใช้ 1×1 placeholder

### Compression (Optional)
- KTX2 / Basis Universal
- 50-80% size reduction
- ใช้กับ hero texture เท่านั้น
- ไม่ใช้กับ procedural (สร้าง runtime ได้)

---

## Texture Validation

### Pre-flight Check
- [ ] Size ≤ 2048×2048
- [ ] Format = PNG / HDR
- [ ] Color space ถูกต้อง
- [ ] Channel ครบ
- [ ] ไม่มี repeating pattern visible
- [ ] Mipmap generated
- [ ] Tiling config ถูก
- [ ] Variation ไม่ uniform

### Visual Check
- [ ] สีตรงกับ palette
- [ ] Roughness ตรง material
- [ ] Normal subtle (ไม่ exaggerated)
- [ ] Wear pattern natural
- [ ] ไม่มี visible seam

---

## Texture Sources (Stock)

### CC0 Sources
- **Poly Haven** — HDR, wood, stone, fabric
- **ambientCG** — Full PBR sets
- **textures.com** — Limited free
- **Unsplash** — Photos for reference

### AI Generation
- DALL-E 3 / Midjourney / Stable Diffusion
- ใช้สำหรับ hero texture
- Apply color correction ให้ตรง palette

### Procedural
- HTML5 Canvas (หลัก)
- Three.js TextureLoader
- Custom shader (สำหรับ complex)

---

## Quick Reference Card

```
╔════════════════════════════════════╗
║  TEXTURE DNA                       ║
╠════════════════════════════════════╣
║ Primary:   Procedural Canvas       ║
║ Secondary: AI-Generated (hero)     ║
║ Tertiary:  CC0 Stock               ║
║                                     ║
║ Size: 256 (small) - 1024 (hero)    ║
║ Format: PNG (color), HDR (env)     ║
║ Tiling: 1-8 (no more)              ║
║ Mipmap: true (default)             ║
║ Anisotropy: 4-16                   ║
║                                     ║
║ Budget: < 100MB total              ║
║ Streaming: per zone                ║
╚════════════════════════════════════╝
```

---

**Version:** 1.0
**Last updated:** 2026-07-12
