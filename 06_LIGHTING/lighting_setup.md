# 💡 Lighting Setup — Tokyo Student Life
## ライティングセットアップ

> 3-point lighting + time-of-day drives mood
> แสงคือ 50% ของความสวย

---

## Core Principle

> **"แสงไม่ใช่แค่ 'ให้สว่าง' — แสงคือ 'อารมณ์'"**

ทุก scene ใช้ 3-point lighting เสมอ — ไม่มี single light, ไม่มี flat lighting

---

## 3-Point Lighting (MUST)

### 1. Key Light (Sun)
```
- Source: DirectionalLight
- Color: warm (3500K - 4500K)
- Intensity: 1.0 - 1.5
- Cast shadow: YES
- Position: ตาม time of day
- mapSize: 2048×2048
- bias: -0.0005
- normalBias: 0.02
- radius (softness): 4
```

### 2. Fill Light (Sky)
```
- Source: DirectionalLight
- Color: cool (5500K - 6500K) — ตรงข้าม key
- Intensity: 30% of key
- Cast shadow: NO
- Position: opposite to key
- Purpose: lift shadow detail
```

### 3. Rim Light (Accent)
```
- Source: DirectionalLight
- Color: neutral (4500K - 5500K)
- Intensity: 60% of key
- Cast shadow: NO
- Position: from behind subject
- Purpose: separate subject from background
```

### 4. Ambient (Hemisphere)
```
- Source: HemisphereLight
- Sky color: ตาม time of day
- Ground color: warm (#8B6F47)
- Intensity: 0.2 - 0.4
- Purpose: base illumination
```

---

## Setup per Time

### 07:00 Morning (Home)
```
Sun:    warm gold #FFD194, angle 25° (low east), intensity 1.0
Fill:   cool blue #B8DCE6, 30%, opposite
Rim:    warm gold, 60%, from behind
Ambient: sky #B8DCE6, ground #8B6F47, 35%
Fog:    cream #F5F0E6, density 0.005
Mood:   อบอุ่น นุ่ม เริ่มวันใหม่
```

### 12:00 Noon (School)
```
Sun:    white warm #FFFAF0, angle 70° (high), intensity 1.3
Fill:   sky #B8DCE6, 30%
Rim:    white warm, 60%
Ambient: sky #D6EEF5, ground #8B6F47, 40%
Fog:    white #FFFFFF, density 0.002
Mood:   สดใส มีชีวิตชีวา
```

### 17:30 Evening (Station)
```
Sun:    deep orange #FF8C42, angle 15° (low west), intensity 1.2
Fill:   orange #F5C088, 30%
Rim:    deep orange, 60%
Ambient: warm #E8A878, ground #8B6F47, 30%
Fog:    gold #FFD194, density 0.008
Mood:   golden hour nostalgic
```

### 19:00 Night (Shopping)
```
Sun:    (none — after sunset)
Key:    warm neon #FF6B35, intensity 0.8
Fill:   cool purple #5A4F7A, 25%
Rim:    warm neon, 50%
Ambient: dusk #5A4F7A, ground #4A3F5C, 25%
Fog:    dark #1A1A2E, density 0.012
Mood:   คึกคัก cozy
```

### 16:00 Sunset (Shrine)
```
Sun:    ramen orange #FFB347, angle 20° (low west), intensity 1.1
Fill:   warm #F5C088, 32%
Rim:    ramen orange, 60%
Ambient: warm #E8A878, ground #8B6F47, 32%
Fog:    gold #FFD194, density 0.006
Mood:   สงบ wabi-sabi
```

---

## Lighting Rules

### 1. Always 3-Point
- ❌ ไม่มี single light
- ❌ ไม่มี ambient-only
- ✅ ทุก scene มี key + fill + rim + ambient

### 2. Warm Key
- ❌ ไม่ใช้ pure white sun
- ✅ ใช้ warm tone (3500K-4500K)

### 3. Tinted Shadow
- ❌ ไม่ใช้ pure black shadow
- ✅ ใช้ purple/blue/brown tint
- Shadow color = fill color (cool)

### 4. Soft Shadow
- ❌ ไม่มี harsh shadow
- ✅ PCF Soft Shadow
- radius 4, mapSize 2048

### 5. Time Variation
- ❌ ไม่ใช้แสงเดียวทุก scene
- ✅ แสงเปลี่ยนตามเวลา

### 6. Mood Consistency
- ❌ ไม่ผสม mood (เช้า + ค่ำ)
- ✅ แต่ละ scene มี mood ชัดเจน

---

## Lighting Quality Checklist

### Visual
- [ ] 3-point lighting ครบ
- [ ] ไม่มี pure white
- [ ] ไม่มี pure black
- [ ] shadow มี color tint
- [ ] shadow direction ตรงกับ time

### Mood
- [ ] mood ตรงกับ time
- [ ] warm/cool balance
- [ ] contrast พอดี
- [ ] ไม่ over/underexposed

### Performance
- [ ] shadow map ≤ 2048
- [ ] light count ≤ 5
- [ ] ไม่ dynamic light ทุก frame

---

## Indoor vs Outdoor

### Outdoor
- Sun แรงสุด
- Sky color dominant
- Ground bounce (warm)
- Shadow ยาวตามเวลา

### Indoor
- Window light เป็น key
- Bounce light simulation
- Warm ambient
- Shadow นุ่มกว่า outdoor

### Transition
- ใช้ volumetric light
- เพิ่ม particles (dust)
- HDR environment เปลี่ยน

---

## Special Lighting

### Volumetric (God Rays)
- ใช้: เช้า (ผ่านม่าน), เย็น (ผ่านต้นไม้)
- Intensity: 0.3 - 0.5
- Color: matches sun

### Particle + Light
- Dust motes เห็นใน light beam
- Sakura petals เรืองแสง
- Rain streak + reflection

### Neon (Subtle)
- ใช้เฉพาะ Zone 4 (Shopping)
- 5-8 signs max
- Warm colors only
- Bloom required

---

## Performance

### Light Budget per Scene
- 1 DirectionalLight (sun, with shadow)
- 1 DirectionalLight (fill, no shadow)
- 1 DirectionalLight (rim, no shadow)
- 1 HemisphereLight (ambient)
- Optional: PointLights (5-10 max)
- Optional: SpotLights (3-5 max)

### Shadow Budget
- 1 shadow-casting light (sun)
- 2048×2048 mapSize
- PCF Soft
- Disable for low-end devices

---

## Quick Reference Card

```
╔════════════════════════════════════╗
║  LIGHTING DNA                      ║
╠════════════════════════════════════╣
║ Setup: 3-point + ambient           ║
║ Key:   warm 3500-4500K             ║
║ Fill:  cool 5500-6500K 30%         ║
║ Rim:   neutral 4500-5500K 60%      ║
║ Shadow: soft, tinted               ║
║ Tone:  ACES, exposure 1.1          ║
║                                     ║
║ NEVER: Single light, pure white,   ║
║        pure black, harsh shadow    ║
║                                     ║
║ ALWAYS: 3-point, warm, soft,       ║
║         time-of-day, atmosphere    ║
╚════════════════════════════════════╝
```

---

**Version:** 1.0
**Last updated:** 2026-07-12
