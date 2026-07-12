# 🎨 Art Style Guide — Tokyo Student Life
## アートスタイル — アートバイブル

> **DNA ของโลก** — กฎการออกแบบระดับบนสุด
> ทุก asset / scene / code ต้องเช็คกับ guide นี้ก่อน ship

---

## Style Name

**Ghibli-Pastel Modern**

3D stylized realism ที่ผสมระหว่าง:
- Studio Ghibli backgrounds (soft, natural, warm)
- Modern Tokyo photography (realistic proportions)
- Pastel color treatment (ไม่จืด ไม่จัด)

---

## Style Description (5 แกนหลัก)

### 1. Soft Edges
- Rounded corner ทุกที่
- ไม่มี sharp 90° edge
- ไม่มี perfect geometric shape ที่ไม่จำเป็น

### 2. Pastel + Warm Highlights
- Pastel dominant (60%)
- Warm accent (30%)
- Cool shadow (10%)
- ไม่มี primary color เต็มพื้นที่
- ไม่มี pure white / pure black

### 3. Slight Imperfection
- ทุก material มี subtle wear
- ทุก surface มี grain/texture
- ไม่มี brand new sterile look
- ไม่มี perfect mirror finish

### 4. PBR Stylized
- ใช้ MeshStandardMaterial (PBR)
- Roughness 0.5-0.95 (matte)
- Metallic 0.0-0.5 (rarely metal)
- ไม่ใช้ MeshPhysicalMaterial (overkill)

### 5. Time-Driven Mood
- แสงเปลี่ยน — mood เปลี่ยน
- เช้า ≠ เย็น ≠ กลางคืน
- แต่ละเวลามีบรรยากาศต่างกันชัดเจน

---

## References (Inspiration, NOT Copy)

### Films — Primary
| Film | Year | What to learn |
|------|------|---------------|
| Whisper of the Heart | 1995 | Modern Tokyo residential, warm interior |
| Kiki's Delivery Service | 1989 | Cozy European-Japanese blend, slice-of-life |
| Only Yesterday | 1991 | Rural Japan, nostalgic, soft |
| The Boy and the Heron | 2023 | Modern pastel, atmospheric |
| Porco Rosso | 1992 | Mediterranean color reference |

### Films — Secondary
| Film | Year | What to learn |
|------|------|---------------|
| Your Name (Shinkai) | 2016 | Light + sky + atmosphere |
| Weathering with You | 2019 | Rain + neon (subtle) |
| Tony Takitani | 2004 | Visual style, urban Japan |
| After the Storm (Kore-eda) | 2016 | Family, mood, lighting |

### Games
| Game | Studio | What to learn |
|------|--------|---------------|
| A Short Hike | adamgryu | Peaceful exploration |
| Alba: A Wildlife Adventure | ustwo | Cozy Mediterranean |
| Stray | BlueTwelve | Urban cat exploration |
| Shenmue | Yu Suzuki | Day/night cycle, urban Japan |
| Persona 5 | Atlus | UI typography only (NOT 3D) |

---

## Visual Rules (7 ข้อ — MUST FOLLOW)

### 1. Edge Treatment
```
✅ Soft edges ทุกที่
✅ Corner radius 2-5mm
✅ Slight curve ตามธรรมชาติ
❌ ไม่มี hard edge ใน nature
❌ ไม่มี sharp 90° ที่ไม่จำเป็น
❌ ไม่มี perfect geometric ใน organic objects
```

### 2. Texture Treatment
```
✅ Slight grain/texture แม้แต่ smooth surface
✅ Real-world reference (wood grain, fabric weave)
✅ ทุก material มี subtle wear/dust
❌ ไม่มี perfectly clean surface
❌ ไม่มี highly reflective/glossy
❌ ไม่มี obvious procedural pattern
```

### 3. Color Treatment
```
✅ Pastel dominant (60% of scene)
✅ Warm accent (30%)
✅ Cool shadow (10%)
✅ Slight desaturation
❌ ไม่มี primary color เต็มพื้นที่
❌ ไม่มี high saturation
❌ ไม่มี pure white/black
```

### 4. Lighting Treatment
```
✅ 3-point: key + fill + rim
✅ Warm key (3500K-4500K)
✅ Soft shadows
✅ Time-of-day drives mood
❌ ไม่มี harsh shadow
❌ ไม่มี single-light scene
❌ ไม่มี over/underexposed
```

### 5. Composition Treatment
```
✅ Rule of thirds
✅ Leading lines (ถนน, รั้ว)
✅ Foreground / midground / background depth
✅ Negative space 30-40%
❌ ไม่มี dead center main subject
❌ ไม่มี flat composition
❌ ไม่มี cluttered frame
```

### 6. Detail Density
```
✅ Moderate — ไม่มากไม่น้อย
✅ Detail เพิ่มที่ focal point
✅ Background เรียบกว่า foreground
❌ ไม่มี uniform high detail
❌ ไม่มี low-poly look (unless stylized)
```

### 7. Atmospheric Treatment
```
✅ Volumetric light (god rays)
✅ Subtle fog/haze
✅ Particles (dust, sakura, rain)
✅ Bloom on bright surfaces
❌ ไม่มี thick fog
❌ ไม่มี heavy DOF
❌ ไม่มี chromatic aberration
```

---

## Material Treatment (PBR)

### Roughness Range
| Material | Roughness | Note |
|----------|-----------|------|
| Wood | 0.65 - 0.85 | Matte, soft |
| Concrete | 0.80 - 0.95 | Very matte |
| Fabric | 0.85 - 0.95 | Very matte |
| Metal | 0.30 - 0.55 | Semi-glossy |
| Glass | 0.05 - 0.15 | Clear |
| Plastic | 0.50 - 0.70 | Semi-matte |
| Paper (shoji) | 0.90 - 0.98 | Very matte |
| Ceramic | 0.40 - 0.60 | Slightly glossy |

### Metallic Range
- Wood: 0.0
- Concrete: 0.0
- Fabric: 0.0
- Metal: 0.8 - 1.0
- Glass: 0.0
- Plastic: 0.0
- Paper: 0.0
- Ceramic: 0.0 (or 0.1 for glaze)

### Normal Map Scale
- Subtle (0.3 - 0.6) — ไม่ exaggerated
- Wood grain: 0.4
- Brick: 0.6
- Concrete: 0.3
- Fabric weave: 0.4
- Leather: 0.5

### Color Space
- Base color: sRGB
- Normal map: Linear
- Roughness/Metallic: Linear
- HDR environment: Linear

---

## Polygon Density (Budget)

### Per Asset
| Asset Type | Triangles | Note |
|------------|-----------|------|
| Hero prop (vending machine) | 2000 - 4000 | High detail |
| Standard prop (bench) | 500 - 1500 | Medium |
| Background prop (trash can) | 100 - 500 | Low |
| Tree (full) | 800 - 2000 | Per tree |
| Small plant | 50 - 200 | Instanced |
| Building (medium) | 3000 - 8000 | Per building |
| Building (interior) | 1000 - 3000 | Per room |
| Character (humanoid) | 8000 - 15000 | With LOD |
| Vehicle (train) | 5000 - 10000 | Hero asset |

### Per Scene (Target)
- **Hero scene:** 50,000 - 80,000 tris
- **Standard scene:** 20,000 - 50,000 tris
- **Background scene:** 10,000 - 20,000 tris
- **Loading screen:** < 5,000 tris

### LOD Strategy
```
LOD0 (0-20m):   100% tris
LOD1 (20-50m):   50% tris
LOD2 (50-100m):  25% tris
LOD3 (100m+):    skip render
```

---

## Camera Composition

### Third-Person (Default)
- FOV: 55° - 65°
- Distance: 4-6m
- Height: 2-3m (slightly above head)
- Slight tilt: 2-5° (ไม่ flat)
- Eye level: ± 0.5m

### Framing
- Main subject: 1/3 from edge
- Background: 30-50% of frame
- Foreground: subtle element (plant, post)
- Look-at: between subject and next point of interest

### Movement
- Smooth follow (lerp 0.1-0.2)
- Collision: don't clip into wall
- Cutscene: lerp 0.05 (cinematic)

---

## Examples — Good vs Bad

### ❌ Bad Examples

**1. Cel-shaded anime 3D**
- ผิด: flat color, hard edge, anime hair
- ควร: PBR stylized, soft edge, realistic hair

**2. Photorealistic Tokyo**
- ผิด: hyperreal, perfect skin, photographic
- ควร: stylized, soft, slightly imperfect

**3. Cyberpunk neon**
- ผิด: neon ทุกที่, glowing, holographic
- ควร: subtle neon เฉพาะ shopping zone

**4. Flat color (no gradient)**
- ผิด: solid color blocks, no shadow
- ควร: gradient, soft shadow, variation

**5. Hard edges**
- ผิด: 90° corner, sharp lines
- ควร: rounded, chamfered, soft

**6. No shadow**
- ผิด: floating object, no contact
- ควร: soft contact shadow

**7. Single light source**
- ผิด: 1 light, flat shading
- ควร: 3-point, depth, dimension

### ✅ Good Examples

**1. PBR stylized with soft lighting**
- ✅ Soft PBR material
- ✅ 3-point lighting
- ✅ Pastel + warm accent
- ✅ Subtle grain/texture
- ✅ Time-of-day mood

**2. Rounded architecture**
- ✅ Rounded corner
- ✅ Soft edge
- ✅ Material detail
- ✅ Slight wear

**3. Atmospheric scene**
- ✅ Volumetric light
- ✅ Particles (dust/sakura)
- ✅ Bloom on bright
- ✅ Subtle fog

---

## การใช้ Style Guide

### Step 1: Pre-Generation
อ่าน rules 7 ข้อ + references ก่อน generate asset

### Step 2: During Generation
ใช้ rules เป็น checklist:
- [ ] Edge soft?
- [ ] Color pastel?
- [ ] Material PBR?
- [ ] Detail moderate?
- [ ] Composition rule of thirds?

### Step 3: Post-Generation
ตรวจ anti-references:
- [ ] ไม่ใช่ cyberpunk
- [ ] ไม่ใช่ anime 2D
- [ ] ไม่ใช่ photoreal
- [ ] ไม่ใช่ horror/fantasy
- [ ] ไม่มี over-saturation
- [ ] สัดส่วนถูก

### Step 4: In Scene
ตรวจ scene-level:
- [ ] 3-point lighting
- [ ] Time-of-day appropriate
- [ ] Material variety (5+ types)
- [ ] Detail hierarchy (fg vs bg)
- [ ] Atmospheric effect

---

## Quick Reference Card

```
╔══════════════════════════════════════╗
║  TOKYO STUDENT LIFE — ART DNA        ║
╠══════════════════════════════════════╣
║ Style:    Ghibli-Pastel Modern       ║
║ Edge:     Soft, rounded, organic     ║
║ Color:    Pastel + warm + cool       ║
║ Material: PBR matte, slight wear     ║
║ Light:    3-point, time-of-day       ║
║ Mood:     Honest mundane, wabi-sabi  ║
║                                       ║
║ NEVER:    Cyberpunk, anime 2D,       ║
║           photoreal, horror          ║
║                                       ║
║ ALWAYS:   Soft, warm, atmospheric,   ║
║           imperfect, slice-of-life   ║
╚══════════════════════════════════════╝
```

---

**Version:** 1.0
**Last updated:** 2026-07-12
