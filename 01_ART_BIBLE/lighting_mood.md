# 💡 Lighting Mood — Tokyo Student Life
## ライティングムード

> กฎเรื่องแสง — 50% ของความสวย
> แสงไม่ใช่ "ให้สว่างพอ" — แสงคือ "อารมณ์"

---

## Core Principle

> **"3-point lighting + warm key + time-of-day drives mood"**

ทุก scene ใช้ 3-point lighting เสมอ — ไม่มี single light, ไม่มี flat lighting

---

## 3-Point Setup (MUST FOLLOW)

### Key Light (Main)
- **Color temperature:** 3500K - 4500K (warm)
- **Intensity:** 1.0 - 1.5 (ขึ้นกับ time of day)
- **Direction:**
  - เช้า: low angle (15-30°)
  - เที่ยง: high angle (60-75°)
  - เย็น: low angle (10-25°)
  - ค่ำ: very low (5-10°) + warm color
- **Shadow:** soft, slightly diffused
- **Type:** DirectionalLight with shadow map 2048×2048

### Fill Light (Secondary)
- **Color temperature:** 5500K - 6500K (cool)
- **Intensity:** 0.3 - 0.5 (30% of key)
- **Direction:** opposite to key, slightly above
- **Purpose:** lift shadow detail
- **Type:** DirectionalLight (no shadow)

### Rim Light (Accent)
- **Color temperature:** 4500K - 5500K (neutral)
- **Intensity:** 0.5 - 0.8
- **Direction:** from behind subject
- **Purpose:** separate subject from background
- **Type:** DirectionalLight (no shadow)

### Ambient (Hemisphere)
- **Color:** sky color (tied to time of day)
- **Intensity:** 0.2 - 0.4
- **Type:** HemisphereLight
- **Purpose:** base illumination
- **Ground color:** warm tone (#8B6F47)

---

## Time of Day Presets (5)

### 1. Morning Home (07:00) — Zone 1

```
Sun angle:    25° (low, from east)
Sun color:    #FFD194 (warm golden)
Sun intensity: 1.0
Sky color:    #D6EEF5 (light blue)
Ambient:      #B8DCE6
Ambient intensity: 0.35
Fog:          #F5F0E6 (cream)
Fog density:  0.005

Mood: อบอุ่น นุ่ม เริ่มวันใหม่
```

**Notes:**
- แสงผ่านม่าน — volumetric light
- shadow ยาวไปทางตะวันตก
- dust motes เห็นชัด
- indoor: window light strong

### 2. Noon School (12:00) — Zone 2

```
Sun angle:    70° (high)
Sun color:    #FFFAF0 (white-warm)
Sun intensity: 1.3
Sky color:    #B8DCE6 (sky cyan)
Ambient:      #D6EEF5
Ambient intensity: 0.4
Fog:          #FFFFFF
Fog density:  0.002

Mood: สดใส มีชีวิตชีวา กระปรี้กระเปร่า
```

**Notes:**
- shadow สั้น ใต้วัตถุ
- ทุกอย่างสว่างเท่าๆ กัน
- contrast ต่ำ
- outdoor เด่นกว่า indoor

### 3. Evening Station (17:30) — Zone 3

```
Sun angle:    15° (low, from west)
Sun color:    #FF8C42 (deep orange)
Sun intensity: 1.2
Sky color:    #F5C088 (orange)
Ambient:      #E8A878
Ambient intensity: 0.3
Fog:          #FFD194
Fog density:  0.008

Mood: golden hour อบอุ่นสุด nostalgic
```

**Notes:**
- shadow ยาวมาก (5-10 เท่าของ object)
- warm dominant
- rim light ชัด
- bloom on bright surfaces
- god rays ถ้ามี

### 4. Night Shopping (19:00) — Zone 4

```
Sun:          none (after sunset)
Key:          artificial — neon warm
Key color:    #FF6B35 (orange neon)
Key intensity: 0.8
Sky color:    #2D2840 (dark purple)
Ambient:      #5A4F7A
Ambient intensity: 0.25
Fog:          #1A1A2E
Fog density:  0.012

Mood: คึกคัก มีชีวิตชีวา แต่ cozy
```

**Notes:**
- ไม่มี sun
- ไฟจากร้านเป็น key
- bloom strong
- contrast สูง (สว่าง/มืด)
- ambient ต่ำ

### 5. Sunset Shrine (16:00) — Zone 5

```
Sun angle:    20° (low, from west)
Sun color:    #FFB347 (ramen orange)
Sun intensity: 1.1
Sky color:    #F5C088
Ambient:      #E8A878
Ambient intensity: 0.32
Fog:          #FFD194
Fog density:  0.006

Mood: สงบ อบอุ่น เหมือนเวลาหยุด wabi-sabi
```

**Notes:**
- แสงอ่อน soft
- shadow ยาวปานกลาง
- warm subtle
- rim light นุ่ม
- petals เรืองแสง

---

## Shadow Rules

### Shadow Type
- Default: **PCF Soft Shadow**
- mapSize: 2048 × 2048
- bias: -0.0005
- normalBias: 0.02
- radius: 4 (softness)

### Shadow Direction (by Time)
| Time | Sun Direction | Shadow Direction |
|------|---------------|------------------|
| เช้า (07:00) | East | West (long) |
| เที่ยง (12:00) | Top | Below (short) |
| เย็น (17:30) | West | East (very long) |
| ค่ำ (19:00) | None | Multiple (artificial) |
| sunset (16:00) | West | East (medium-long) |

### Shadow Color
**ห้าม pure black!**
- ใช้ deep purple: `#4A3F5C`
- หรือ deep blue: `#2D4A6B`
- หรือ deep brown: `#5C4530`
- เลือกตาม scene mood

### Contact Shadow
- ใต้วัตถุทุกชิ้น ต้องมี shadow
- ใช้ soft circular shadow (decal)
- ไม่มี floating object

---

## Color Grading (Post-Processing)

### Tone Mapping
```
type:         ACES Filmic
exposure:     1.1
contrast:     1.05
saturation:   0.85 (ลด 15%)
warmth:       +0.1
```

### Vignette
```
strength:     0.3
smoothness:   0.5
color:        #2D2840 (dark purple)
```

### Bloom
```
strength:     0.3
radius:       0.4
threshold:    0.85
```

### Film Grain
```
strength:     0.05
animated:     true
size:         0.5
```

### Chromatic Aberration
- ❌ ไม่ใช้ (ผิด mood)

### Depth of Field
- ❌ ไม่ใช้ (เกมนี้ชัดทุกระยะ)

---

## Indoor Lighting

### Principles
- Warm ambient (3000K - 3500K)
- Bounce light simulation
- Window light strong (key)
- Ceiling light secondary
- Shadow: deep but not pure black

### Setup
```
1. Window light (DirectionalLight, warm)
   - from window direction
   - intensity 1.2
   - cast soft shadow
2. Ceiling light (PointLight, soft)
   - from ceiling
   - intensity 0.6
   - no shadow
3. Bounce (HemisphereLight)
   - warm ground (#8B6F47)
   - cool sky (#B8DCE6)
   - intensity 0.4
```

### Color Temperature (Indoor)
| Source | K | Hex |
|--------|---|-----|
| Window sun | 4000K | #FFD194 |
| Incandescent | 2700K | #FFB87A |
| Fluorescent | 4500K | #FFF4E0 |
| LED soft | 3500K | #FFCC99 |

---

## Outdoor Lighting

### Principles
- Sky color dominant
- Sun directional
- Ground bounce (warm)
- Shadow: soft, blue-tinted

### Setup
```
1. Sun (DirectionalLight)
   - based on time of day
   - cast shadow
2. Sky (HemisphereLight)
   - sky color
   - ground warm tone
3. Fill (DirectionalLight)
   - opposite to sun
   - 30% intensity
   - no shadow
```

---

## Transition (Indoor <-> Outdoor)

### Window Light
- Light intensity changes gradually
- Color temperature shifts
- Add volumetric light through window
- Subtle particles (dust) ใน light beam

### Doorway
- ใช้ fog เพื่อ soften transition
- Light source from outside
- HDR environment เปลี่ยนตาม

---

## Volumetric Light

### God Rays
**ใช้เมื่อ:**
- เช้า (ผ่านม่าน)
- เย็น (ผ่านต้นไม้)
- indoor (ผ่าน window)

**Parameters:**
- Intensity: 0.3 - 0.5
- Color: matches sun color
- Decay: 0.5
- Density: 0.5

### Fog
- Linear or exponential
- Density ตาม time of day
- Color matches sky
- ไม่มี thick fog (มองไม่เห็น)

```
Linear: 0.005 - 0.012
Color: matches sky color
Near/Far: scene-dependent
```

---

## Particle + Light Interaction

### 🌸 Sakura Petals + Light
- Petal เรืองแสงเมื่อผ่าน sun direction
- Slight bloom on petal
- Color: warm pink

### ✨ Dust Motes
- เห็นชัดเมื่อ light ผ่าน
- ใช้ใน: indoor + golden hour
- Slow animation (0.1-0.3 m/s)
- 50-100 particles per beam

### 🌧️ Rain + Light
- Streak effect + reflection
- ใช้ใน: evening ของทุก zone (subtle)
- Volume: low (ไม่ใช่พายุ)
- Color: cool blue tint

---

## Neon (Subtle)

### ใช้เฉพาะ Zone 4 (Shopping)
- Bloom strong
- Color: warm (orange, pink, yellow)
- ❌ ไม่ใช่ blue/green/cyan
- Density: 5-8 signs per scene
- Intensity: 0.5 - 1.0 (emissive)

### ไม่ใช้ในโซนอื่น
| Zone | Neon |
|------|------|
| Home | 0 |
| School | 0 |
| Station | 1-2 max (จอ LED เล็ก) |
| Shopping | 5-8 |
| Shrine | 0 |

---

## Lighting Mistakes to Avoid

### ❌ 1. Single Light
- ทุก scene ต้องมี 3-point
- Single light = flat, boring

### ❌ 2. Pure White
- Sun ไม่ใช่ #FFFFFF
- ใช้ warm tone (#FFD194, #FFFAF0)

### ❌ 3. Pure Black Shadow
- Shadow ต้องมี color
- ใช้ purple/brown

### ❌ 4. Harsh Shadow
- ไม่มี jagged edge
- ใช้ soft shadow (PCF)

### ❌ 5. Uniform Lighting
- ทุกจุดเหมือนกัน = น่าเบื่อ
- Variation ตาม scene

### ❌ 6. Overexposed
- Highlight detail หาย
- ใช้ exposure 1.1 max

### ❌ 7. Underexposed
- Dark scene ทั้งหมด
- มี key + fill เสมอ

### ❌ 8. Wrong Color Temp
- warm = 3000K - 4500K
- cool = 5500K - 7000K
- ❌ ไม่ผสม

### ❌ 9. No Time Variation
- ทุกเวลาเหมือนกัน
- ต้องเปลี่ยนตาม time

### ❌ 10. No Mood
- แสง technical แต่ไม่มีอารมณ์
- ต้องมี "feel"

---

## Lighting Setup Template (Three.js)

```javascript
// Morning Home preset
function applyMorningHome(scene) {
  // Sun
  const sun = new THREE.DirectionalLight(0xFFD194, 1.0);
  sun.position.set(50, 30, 20);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.bias = -0.0005;
  scene.add(sun);
  
  // Fill
  const fill = new THREE.DirectionalLight(0xB8DCE6, 0.35);
  fill.position.set(-30, 20, -20);
  scene.add(fill);
  
  // Rim
  const rim = new THREE.DirectionalLight(0xFFD194, 0.6);
  rim.position.set(-20, 10, -50);
  scene.add(rim);
  
  // Hemisphere
  const hemi = new THREE.HemisphereLight(0xB8DCE6, 0x8B6F47, 0.35);
  scene.add(hemi);
  
  // Fog
  scene.fog = new THREE.Fog(0xF5F0E6, 30, 100);
  
  // Tone mapping
  scene.toneMapping = THREE.ACESFilmicToneMapping;
  scene.toneMappingExposure = 1.1;
}
```

---

## Quick Reference Card

```
╔════════════════════════════════════╗
║  LIGHTING DNA                      ║
╠════════════════════════════════════╣
║ Setup:    3-point + ambient         ║
║ Key:      Warm 3500-4500K          ║
║ Fill:     Cool 5500-6500K 30%      ║
║ Rim:      Neutral 4500-5500K 60%   ║
║ Shadow:   Soft, tinted              ║
║ Tone:     ACES, exposure 1.1       ║
║ Bloom:    0.3, threshold 0.85      ║
║                                     ║
║ NEVER:    Single light, pure white,║
║           pure black, harsh shadow ║
║                                     ║
║ ALWAYS:   3-point, warm, soft,     ║
║           time-of-day, atmosphere   ║
╚════════════════════════════════════╝
```

---

**Version:** 1.0
**Last updated:** 2026-07-12
