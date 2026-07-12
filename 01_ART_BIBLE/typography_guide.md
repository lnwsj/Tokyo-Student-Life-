# 🔤 Typography Guide — Tokyo Student Life
## タイポグラフィ — フォントガイド

> กฎการใช้ฟอนต์ทั้ง 3 ภาษา + display + mono
> ทุกที่ในเกม (HUD, menu, dialog, web) ใช้ guide นี้

---

## Font Stack

### Primary Fonts (3 ภาษา)

| Lang | Font Name | Weights | Fallback |
|------|-----------|---------|----------|
| 🇹🇭 TH | **Sarabun** | 300, 400, 500, 600, 700 | Noto Sans Thai |
| 🇬🇧 EN | **Inter** | 300, 400, 500, 600, 700 | system-ui, sans-serif |
| 🇯🇵 JA | **Noto Sans JP** | 300, 400, 500, 700 | system-ui, sans-serif |
| Mono | **JetBrains Mono** | 400, 500 | monospace |

### Display Font
**Fraunces** (serif, Ghibli-feel)
- Weight 300 - 700
- ใช้กับ title ขนาดใหญ่
- ใช้กับ section header
- ไม่ใช้กับ body text

### Load Order
```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@300;400;500;600;700&family=Sarabun:wght@300;400;500;600;700&family=Noto+Sans+JP:wght@300;400;500;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

---

## Font Sizes

### HUD (16:9 reference)
| Element | Size | Weight | Note |
|---------|------|--------|------|
| Heart icon | 24px | - | Vector |
| HP value | 16px | 500 | JetBrains Mono |
| Sub-label (TH) | 12px | 400 | Sarabun |
| Money value | 16px | 500 | JetBrains Mono |
| Time | 14px | 500 | JetBrains Mono |
| Stamina bar | 8px | - | Height |

### Menu
| Element | Size | Weight | Note |
|---------|------|--------|------|
| Title | 32px | 600 | Fraunces |
| Item label (EN) | 20px | 500 | Inter |
| Item description (TH) | 16px | 400 | Sarabun |
| Button | 18px | 500 | Inter |
| Section divider | 12px | 500 | JetBrains Mono (uppercase) |

### Dialog
| Element | Size | Weight | Note |
|---------|------|--------|------|
| Character name | 18px | 600 | Match character |
| Dialog (TH primary) | 18px | 400 | Sarabun |
| Subtitle (EN) | 14px | 400 | Inter |
| Choice prompt | 20px | 500 | Inter |
| JP greeting | 18px | 500 | Noto Sans JP |

### World (3D scene)
- ไม่ใช้ 3D text
- ใช้ baked texture สำหรับ signage
- ขนาดตาม scene scale (ตึกสูง = ป้ายใหญ่)

### Web (Concept page / Marketing)
| Element | Size | Weight | Note |
|---------|------|--------|------|
| Hero title | clamp(3rem, 8vw, 6rem) | 300 | Fraunces |
| Section title | clamp(2rem, 4vw, 3rem) | 300 | Fraunces |
| Body | 1rem (16px) | 400 | Sarabun |
| Label / Mono | 0.85rem (14px) | 400 | JetBrains Mono |

---

## Font Weights

| Use | Weight | Example |
|-----|--------|---------|
| Body text | 400 | "อรุณสวัสดิ์ครับ" |
| Important body | 500 | "ข้าวกล่อง" |
| Sub-heading | 600 | "เมนูหลัก" |
| Heading | 600 | "ร้านอาหาร" |
| Display | 700 | "Tokyo Student Life" |
| Light elegant | 300 | Hero text |
| Mono label | 400 | "CONCEPT v1.0" |

---

## Color & Treatment

### Text Color
- Primary text: `#2A2A2A` (near black, not pure)
- Soft text: `#5C5C5C`
- Inverse text (on dark): `rgba(245, 240, 230, 0.9)` (warm cream)
- Accent text: `#2D4A6B` (school navy)

### Letter Spacing
| Use | Value |
|-----|-------|
| Body | 0.01em |
| Label (TH/EN) | 0.05em |
| Uppercase label | 0.2em |
| Large display | -0.02em |
| Hero title | -0.03em |

### Line Height
| Use | Value |
|-----|-------|
| Body | 1.6 |
| Heading | 1.3 |
| Display | 1.0 |
| Label | 1.4 |

---

## Language-Specific Rules

### 🇹🇭 Thai (TH)
- **ใช้ Sarabun เสมอ** (ไม่ใช้ system font)
- ไม่มี space ระหว่างคำ (เป็น default)
- ใช้สระลอยได้ (สระอิ สระอี สระอือ สระอุ)
- ไม่ใช้ตัวเลขไทย (๑ ๒ ๓) ใน UI
- ใช้ comma ไทย (,) และ full stop ไทย (.)
- ตัวเลขใช้ 1 2 3 ไม่ใช่ ๑ ๒ ๓

### 🇬🇧 English (EN)
- **ใช้ Inter เสมอ**
- Sentence case ใน UI (`"Save game"` ไม่ใช่ `"Save Game"`)
- Title case ใน label/button (`"Save"`, `"Load"`, `"Settings"`)
- ไม่ใช้ ALL CAPS (ยกเว้น mono label)
- ใช้ Oxford comma

### 🇯🇵 Japanese (JA)
- **ใช้ Noto Sans JP เสมอ**
- ไม่มี space ระหว่างคำ
- ใช้ kanji + hiragana + katakana ผสมตามธรรมชาติ
- ไม่ใช้ romaji ใน UI
- ไม่ใช้ full-width space
- punctuation: ไม่มี space ก่อน `、 。` `「」`

---

## Bilingual Display Patterns

### Pattern 1: Stacked (Most Common)
```
❤️ 100
HP
```
TH/EN label below value

### Pattern 2: Side by Side (Tag-style)
```
[HP ❤️] | [HP ❤️]
```

### Pattern 3: Primary + Subtitle
```
อรุณสวัสดิ์ครับ     ← TH primary
Good morning         ← EN smaller below
```

### Pattern 4: Toggle
```
[TH] [EN]  ← user picks
```
ใช้ใน Settings

---

## Specific Components

### HUD Style Example
```
┌────────────────────────────────────┐
│  ❤️ 100   🍱 Full   💴 1,200      │  ← value (JetBrains Mono)
│  HP      Bento     Money          │  ← EN label (Inter)
│  HP      ข้าวกล่อง  เงน            │  ← TH label (Sarabun)
└────────────────────────────────────┘
```

### Menu Style Example
```
┌──────────────────────────┐
│  SAVE GAME               │  ← EN title (Inter 600)
│  บันทึกเกม                │  ← TH description (Sarabun 400)
│                          │
│  [Save]  [Cancel]        │  ← buttons (Inter 500)
└──────────────────────────┘
```

### Dialog Style Example
```
[ยูกิ]                                          ← name (Inter 600)
「おはよう、Hiroshi！」                          ← JP (Noto Sans JP 500)
อรุณสวัสดิ์ครับ ฮิโรชิ!                        ← TH primary (Sarabun 400)
Good morning, Hiroshi!                          ← EN subtitle (Inter 400)
                                              
       [ตอบ]  [ไม่ตอบ]                          ← choices (Inter 500)
       Reply  Skip
```

### Shop Sign (3D baked)
```
「 ramen 喜楽 」
```
JA only (authentic)

### Vending Machine Button
```
ボタン / BUTTON
```
JP primary + EN secondary (small)

### School Sign
```
第二中学
No. 2 Middle School
```
JP primary + EN below

### Loading Screen
```
LOADING...
กำลังโหลด
```
Mono EN + Sarabun TH

### Achievement
```
🏆 "ช่างภาพมือใหม่"
   "Take your first photo"
   "ถ่ายรูปแรกในเกม"
```
Title + EN description + TH context

---

## Typography Mistakes to Avoid

### ❌ 1. Mixed Weights Randomly
- ไม่ใช้ weight ปนกันมั่ว
- ใช้ 400 / 500 / 600 / 700 เท่านั้น

### ❌ 2. Too Many Fonts
- ไม่เกิน 3 fonts ต่อหน้าจอ
- ใช้ mono เสริม ห้ามเกิน

### ❌ 3. Hard to Read
- ไม่ใช้ weight 300 กับ body text
- ไม่ใช้สีเดียวกับ background
- ไม่ใช้ contrast ratio < 4.5

### ❌ 4. Wrong Language Font
- ไม่ใช้ Sarabun กับ EN
- ไม่ใช้ Inter กับ TH
- ไม่ใช้ system font

### ❌ 5. Inconsistent Spacing
- ไม่มี space ผิดที่
- letter-spacing ตาม use case
- ไม่ spacing แน่นเกินไป

### ❌ 6. Title Case Abuse
- ไม่ใช้ Title Case ในทุกที่
- sentence case สำหรับ body

### ❌ 7. ALL CAPS Body
- ไม่ใช้ all caps ใน paragraph
- ใช้เฉพาะ label

---

## Font Performance

### Loading Strategy
1. **Preload critical fonts** (Inter 400, Sarabun 400, Noto Sans JP 400)
2. **Lazy load weights** ที่ไม่จำเป็น
3. **font-display: swap** — ใช้ fallback ก่อน
4. **Subset Asian fonts** — ไม่โหลด kanji ทั้งหมด
5. **Cache aggressively** — `font-family` + weight เดิม

### File Size Budget
| Font | Weights | Size (approx) |
|------|---------|---------------|
| Inter | 4 | 80KB |
| Sarabun | 4 | 100KB |
| Noto Sans JP | 4 | 200KB (subset) |
| Fraunces | 4 | 120KB |
| JetBrains Mono | 2 | 60KB |
| **Total** | - | **~560KB** |

### Subset (ถ้า bandwidth จำกัด)
- JA: subset 常用漢字 + hiragana + katakana
- TH: ใช้ full (มี vowel forms)
- EN: ใช้ full

---

## Quick Reference Card

```
╔════════════════════════════════════╗
║  TYPOGRAPHY DNA                    ║
╠════════════════════════════════════╣
║ TH: Sarabun (300-700)              ║
║ EN: Inter (300-700)                ║
║ JA: Noto Sans JP (300-700)         ║
║ Display: Fraunces (300-700)        ║
║ Mono: JetBrains Mono (400-500)     ║
║                                     ║
║ Body: 16-18px / 400 / 1.6 line     ║
║ Title: 24-32px / 600 / 1.3 line    ║
║ Display: 48-96px / 300 / 1.0 line  ║
║                                     ║
║ NEVER: Mixed fonts / All caps body ║
║        Hard to read / Random weight║
╚════════════════════════════════════╝
```

---

**Version:** 1.0
**Last updated:** 2026-07-12
