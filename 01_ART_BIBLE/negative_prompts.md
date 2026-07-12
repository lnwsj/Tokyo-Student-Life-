# ❌ Negative Prompts — Art Bible
## ネガティブプロンプト

> รายการ "ห้าม" สำหรับ AI generation
> ใช้ใน stable diffusion / DALL-E / procedural / manual

---

## Core Style Avoidance

### ❌ 1. Cyberpunk / Sci-Fi
```
- neon lights
- glowing panels
- holographic displays
- mech, robots, drones
- floating geometry
- "futuristic" anything
- circuit patterns
- wires / cables (visible)
- tubes / pipes
```

### ❌ 2. Anime 2D Look
```
- cel-shaded surfaces
- flat color regions
- hard anime outlines
- big eyes, small body
- anime hair styles
- kawaii mascot
- chibi proportions
- 4-finger hands
```

### ❌ 3. Photorealism
```
- hyperrealistic textures
- perfect skin
- photographic lighting
- real-world photographic style
- product photography
- studio lighting (harsh)
```

### ❌ 4. Horror / Gothic
```
- spikes, sharp teeth
- blood, decay
- distorted proportions
- dark void backgrounds
- tentacles
- skull imagery
- eyes (creepy)
- broken glass
```

### ❌ 5. Fantasy
```
- magic, glowing
- mythical creatures
- floating islands
- crystal formations
- portals
- energy beams
- runes, magic circles
```

### ❌ 6. Western Cartoon
```
- squash and stretch
- rubber hose limbs
- exaggerated expressions
- bright primary colors
- pie-cut mouth
- 4 fingers
- simple shapes
```

---

## Color Avoidance

### ❌ 1. Over-Saturated
```
- vivid red, pure blue
- rainbow gradients
- 8-bit color palette
- 100% saturation
- pure primary colors
- neon bright
```

### ❌ 2. Pure Black / White
```
- pure black shadow (#000000)
- pure white highlight (#FFFFFF)
- complete black background
- blown-out highlights
- crushed shadows
```

### ❌ 3. Neon Bright
```
- electric blue
- hot pink
- lime green
- bright purple
- pure cyan
- acid yellow
```

### ❌ 4. Wrong Palette
```
- cool blue only
- warm red only
- black + white only
- grey monotone
- 70s brown
- 80s neon
```

---

## Composition Avoidance

### ❌ 1. Cluttered
```
- too many objects
- no negative space
- no focal point
- visual noise
- busy frame
- chaotic
```

### ❌ 2. Empty
```
- no props
- no life
- no detail
- blank surfaces
- void
- desert (no atmosphere)
```

### ❌ 3. Off-Center Distorted
```
- dutch angle (tilted camera)
- extreme wide angle
- fisheye distortion
- bird's eye / worm's eye
- extreme zoom
- telephoto compression
```

### ❌ 4. Symmetric / Dead Center
```
- perfect symmetry
- main subject dead center
- no asymmetry
- no leading lines
```

---

## Lighting Avoidance

### ❌ 1. Harsh Shadow
```
- hard edge shadow
- very dark shadow
- multiple shadow direction
- over-bloomed
- blown out
- crushed black
```

### ❌ 2. Flat Lighting
```
- no shadow
- no rim light
- single light source
- 2D appearance
- ambient only
```

### ❌ 3. Wrong Color Temperature
```
- pure blue light
- pure red light
- green tinted
- cold clinical
- mixed warm + cool randomly
```

### ❌ 4. Wrong Mood
```
- bright neon for home zone
- dark for school zone
- dim for shopping zone
- cold for shrine zone
```

---

## Material Avoidance

### ❌ 1. Glossy / Reflective
```
- mirror-like surface
- high specularity
- wet-looking material
- chrome
- polished marble
- glass-like plastic
```

### ❌ 2. Perfect Surface
```
- no wear, no dust
- no scratches
- brand new looking
- sterile
- factory-perfect
- untouched
```

### ❌ 3. Wrong Material
```
- wood that looks like plastic
- metal that looks like wood
- fabric that looks like metal
- mismatched material
- wrong scale texture
- wrong age material
```

### ❌ 4. Texture Issues
```
- visible tiling
- obvious pattern repetition
- pixelated
- low resolution
- broken UV
- stretched texture
```

---

## Subject Avoidance

### ❌ 1. Wrong Subject
```
- weapons (sword, gun, knife, bow, hammer)
- vehicles (car, motorcycle) — ยกเว้นรถไฟ
- modern military
- western clothing
- non-Japanese food (pizza, burger, taco)
- fast food
- alcohol bottles
- cigarette
```

### ❌ 2. Wrong Era
```
- kimono (ยกเว้น festival)
- samurai
- traditional architecture เต็มเมือง
- old Edo period
- futuristic year
- western medieval
```

### ❌ 3. Wrong Scale
```
- giant objects
- tiny person
- impossible proportions
- dwarf/giant
- too tall / too short
- disproportionate
```

### ❌ 4. Wrong Style Mix
```
- medieval + modern
- fantasy + sci-fi
- realistic + cartoon
- 2D + 3D same scene
- anime + realistic
```

---

## Procedural Generation Avoidance

### ❌ 1. Visible Pattern
```
- repeating texture obvious
- tile-able pattern visible
- uniform noise
- procedural looking
- low variation
- identical instances
```

### ❌ 2. Edge Artifacts
```
- low-poly look
- pixelated
- jagged edge
- broken UV
- Z-fighting
- over-tessellation
```

### ❌ 3. Z-Fighting
```
- overlapping geometry
- flickering surface
- depth conflict
- coplanar faces
```

### ❌ 4. Bad Lighting
```
- ambient only
- no shadow
- pure black shadow
- single light
- wrong color temp
```

---

## Color Hex Codes (MUST NOT USE)

### Pure Colors
```javascript
const FORBIDDEN_COLORS = [
  '#FF0000',  // pure red
  '#00FF00',  // pure green
  '#0000FF',  // pure blue
  '#FFFF00',  // pure yellow
  '#FF00FF',  // pure magenta
  '#00FFFF',  // pure cyan
  '#000000',  // pure black
  '#FFFFFF',  // pure white
];
```

### ใช้ใน Code
```javascript
// Helper function
function isForbiddenColor(hex) {
  return FORBIDDEN_COLORS.includes(hex.toUpperCase());
}

function clampColor(hex) {
  // ป้องกันไม่ให้ใช้ pure color
  if (isForbiddenColor(hex)) {
    console.warn(`Color ${hex} is too saturated/pure, use palette instead`);
    return null;
  }
  return hex;
}
```

---

## ใช้ Negative Prompts ใน Workflow

### Stable Diffusion (txt2img)
```
Negative prompt: 
cyberpunk, neon, anime, cel-shaded, photorealistic, 
horror, fantasy, weapon, violence, blood,
saturated, vivid, neon, pure black, pure white,
glossy, mirror, chrome, plastic look,
low-poly, pixelated, artifact, repeating texture,
western clothing, fast food, modern military,
dutch angle, fisheye, harsh shadow,
cluttered, empty, no detail
```

### DALL-E / Midjourney
```
--no cyberpunk neon, anime style, photorealistic, horror,
    oversaturated, pure black, pure white, glossy,
    weapons, blood, violence,
    western clothing, fast food,
    hard shadow, single light,
    low-poly, pixelated
```

### Procedural (Three.js)
```javascript
// Material factory validation
function createMaterial(spec) {
  // ตรวจ roughness range
  if (spec.roughness < 0.3) {
    console.warn(`Material ${spec.name} is too glossy (${spec.roughness})`);
  }
  
  // ตรวจ metallic range
  if (spec.metallic > 1.0 || spec.metallic < 0) {
    throw new Error(`Invalid metallic: ${spec.metallic}`);
  }
  
  // ตรวจ color (ไม่ใช่ pure)
  if (isForbiddenColor(spec.color)) {
    console.warn(`Color ${spec.color} is forbidden, use palette`);
    return null;
  }
  
  return new THREE.MeshStandardMaterial(spec);
}
```

### Manual Review
- [ ] ไม่มี cyberpunk element
- [ ] ไม่มี anime 2D look
- [ ] ไม่มี pure black/white
- [ ] ไม่มี glossy material
- [ ] ไม่มี weapon/violence
- [ ] ไม่มี over-saturated color
- [ ] สัดส่วนถูกต้อง
- [ ] material ตรงกับ object
- [ ] shadow มี color ไม่ใช่ pure black
- [ ] 3-point lighting มีครบ

---

## Pre-flight Check (30 ข้อ)

ก่อน ship asset / scene:

### Style
- [ ] 1. ไม่ใช่ cyberpunk
- [ ] 2. ไม่ใช่ anime 2D
- [ ] 3. ไม่ใช่ photoreal
- [ ] 4. ไม่ใช่ horror
- [ ] 5. ไม่ใช่ fantasy

### Color
- [ ] 6. ไม่มี pure white
- [ ] 7. ไม่มี pure black
- [ ] 8. ไม่มี over-saturation
- [ ] 9. ไม่มี neon bright
- [ ] 10. ใช้ color palette ที่กำหนด

### Composition
- [ ] 11. ไม่ cluttered
- [ ] 12. ไม่ empty
- [ ] 13. ไม่ dutch angle
- [ ] 14. ไม่ fisheye
- [ ] 15. มี focal point

### Lighting
- [ ] 16. 3-point lighting ครบ
- [ ] 17. ไม่ harsh shadow
- [ ] 18. shadow มี color
- [ ] 19. color temp ถูก
- [ ] 20. mood ตรงกับ time of day

### Material
- [ ] 21. ไม่ glossy
- [ ] 22. ไม่ mirror
- [ ] 23. ไม่ chrome
- [ ] 24. material ตรงกับ object
- [ ] 25. มี subtle wear

### Subject
- [ ] 26. ไม่มีอาวุธ
- [ ] 27. ไม่มีเลือด/ความรุนแรง
- [ ] 28. สัดส่วนถูก
- [ ] 29. ไม่มี brand จริง
- [ ] 30. behavior เหมาะสม

---

## Quick Reference Card

```
╔════════════════════════════════════╗
║  NEGATIVE DNA                      ║
╠════════════════════════════════════╣
║ NEVER:                              ║
║ ❌ Cyberpunk, anime 2D, photoreal   ║
║ ❌ Horror, fantasy, sci-fi          ║
║ ❌ Pure black/white                 ║
║ ❌ Saturated, neon bright           ║
║ ❌ Glossy, mirror, chrome           ║
║ ❌ Weapon, blood, violence         ║
║ ❌ Brand, fast food, military       ║
║ ❌ Harsh shadow, single light      ║
╚════════════════════════════════════╝
```

---

**Version:** 1.0
**Last updated:** 2026-07-12
