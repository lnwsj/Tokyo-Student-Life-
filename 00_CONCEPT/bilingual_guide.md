# 🌐 Bilingual Guide — TH / EN / JA

> กฎการใช้ 3 ภาษาในเกม: ไทย (TH), English (EN), Japanese (JA)

---

## หลักการหลัก

ภาษาทั้ง 3 ไม่ได้ "แข่งกัน" แต่ละภาษามี **บทบาท** ต่างกัน:

| ภาษา | บทบาท | ใช้ที่ไหน |
|------|-------|-----------|
| 🇹🇭 **TH** | อธิบาย, narrative, dialog | คำบรรยาย, hint, บทสนทนา |
| 🇬🇧 **EN** | Label, action, technical | HUD, menu, ปุ่ม, ค่า |
| 🇯🇵 **JA** | Authentic, ambient | ป้ายร้าน, signage, ชื่อเฉพาะ |

---

## UI Rules (กฎ UI)

### HUD (หน้าจอหลัก)
**แสดง TH + EN คู่กันเสมอ** (EN เล็กกว่าใต้ TH)

```
ตัวอย่าง:
┌──────────────────────────┐
│ ❤️ HP    🍱 Bento  💴 1,200 │
│ HP      ข้าวกล่อง  เงน    │  ← EN เป็น label, TH เป็นคำอธิบาย
└──────────────────────────┘
```

### Menu (เมนู)
**EN on top, TH below**

```
┌─────────────────┐
│  SAVE           │  ← EN (label)
│  บันทึก         │  ← TH (อธิบาย)
├─────────────────┤
│  LOAD           │
│  โหลด           │
├─────────────────┤
│  SETTINGS       │
│  ตั้งค่า        │
└─────────────────┘
```

### Dialog (บทสนทนา)
- **TH** เป็น primary (แสดงบนจอ)
- **EN** เป็น subtitle (เล็ก ใต้ TH)
- **JA** ใช้เฉพาะชื่อ / คำทักทายในเกม

ตัวอย่าง:
```
[ยูกิ]
「おはよう」
อรุณสวัสดิ์ครับ
Good morning
```

### Tooltip / Hint
- แสดง **TH** เมื่อ hover/click

```
[ไอคอน ❤️]
"พลังชีวิต — ลดลงเมื่อวิ่งนาน"
```

### Subtitles
- **TH** เป็น default
- มี toggle เปลี่ยนเป็น EN

---

## In-Scene Text (ข้อความในฉาก)

### Shop Signs / Storefronts
- **JA เท่านั้น** (ดู authentic)
- ไม่ต้องแปล

ตัวอย่าง:
```
[ร้านราเมง]
看板: 「 ramen 喜楽 」  (kira kuki = ความสุข)
- ไม่แปล
- ผู้เล่นเข้าใจจาก context
```

### Vending Machine
- **JA + EN** (เพราะเป็น "instruction")

```
[ตู้ขายของ]
ボタン / BUTTON
おしるこ / Oshiruko (Sweet Red Bean Soup)
¥150
```

### School Signage
- **JA + EN** (เป็น official)

```
[ป้ายโรงเรียน]
第二中学 / DAI-NI CHUUGAKU
"No. 2 Middle School"
```

### Books / Magazines
- **JA** (ดูสมจริง)

### Subway / Station
- **JA** เป็นหลัก + **EN** (English signage ญี่ปุ่นมีคู่กันเสมอ)

```
[ป้ายสถานี]
桜台駅 / Sakuradai Station
```

---

## เมื่อไหร่ไม่ต้องแปล

| ประเภท | เหตุผล |
|--------|--------|
| **ชื่อตัวละคร** | เป็น JA: Hiroshi, Yuki, Sakura |
| **ชื่อสถานที่** | เป็น JA: Shibuya, Setagaya |
| **ชื่อย่าน** | เป็น JA + EN (Sakuradai) |
| **ชื่อร้าน** | เป็น JA: 喜楽, 桜花 |
| **Brand names** | เป็น JA: Sapporo, Pocari Sweat |
| **ชื่ออาหาร** | เป็น JA (เหมือนคนไทยเรียก ราเมง) |
| **ชื่อสถานที่ในเกม** | JA: "ตลาดเช้า Setagaya" |

---

## เมื่อไหร่ต้องใช้ English

| ประเภท | เหตุผล |
|--------|--------|
| **Game menus** | Save, Load, Settings, Options, Exit |
| **HUD labels** | HP, Stamina, Money, Time |
| **Tutorial text** | เพราะเป็น instruction |
| **Error messages** | "Press any key to continue" |
| **Credits** | Developer, Designer, Artist |
| **Config text** | "Volume", "Language", "Display" |

---

## เมื่อไหร่ต้องใช้ Thai

| ประเภท | เหตุผล |
|--------|--------|
| **Narrative** | คำบรรยาย, story text |
| **Dialog (default)** | บทสนทนา |
| **Hint / Tutorial** | อธิบาย mechanics |
| **NPC names in dialog** | ผู้เล่นไทยคุ้นกับชื่อไทย |
| **Achievement descriptions** | "ถ่ายรูปซากุระ 10 ครั้ง" |
| **Items** | ข้าวกล่อง, คันจิ, ชุดนักเรียน |

---

## Typography (ฟอนต์)

| ภาษา | ฟอนต์ | Fallback |
|------|-------|----------|
| TH | **Sarabun** | Noto Sans Thai |
| EN | **Noto Sans** | Inter, system-ui |
| JA | **Noto Sans JP** | system-ui |
| Mono | **JetBrains Mono** | monospace |

### Font Sizes
- HUD: 16px (TH), 12px (EN)
- Menu: 20px (EN), 16px (TH)
- Dialog: 18px (TH), 14px (EN subtitle)
- Signs: ขนาดจริงใน scene (texture)

### Font Weights
- Default: 400
- Bold: 600 (เน้น)
- Title: 700

---

## โครงสร้าง i18n

```
11_UI/i18n/
├── th.json
├── en.json
└── ja.json
```

### Format
```json
{
  "hud": {
    "hp": {
      "label": "HP",
      "description": "พลังชีวิต"
    },
    "money": {
      "label": "Money",
      "description": "เงิน"
    }
  },
  "menu": {
    "save": {
      "label": "Save",
      "description": "บันทึก"
    }
  },
  "dialog": {
    "morning_greeting": {
      "th": "อรุณสวัสดิ์ครับ",
      "en": "Good morning",
      "ja": "おはよう"
    }
  }
}
```

---

## ตัวอย่างจริง

### 1. Player กดปุ่ม Save
```
┌─────────────────┐
│  SAVE GAME      │  ← EN
│  บันทึกเกม       │  ← TH
│                 │
│  [Yes]    [No]  │  ← EN buttons
│  ใช่      ไม่    │  ← TH below
└─────────────────┘
```

### 2. NPC ทักทาย
```
[ยูกิ]
「おはよう、Hiroshi！」
อรุณสวัสดิ์ครับ ฮิโรชิ!
Good morning, Hiroshi!
```

### 3. Shop Sign
```
[ร้านราเมง — ไม่แปล]
喜楽
```

### 4. Vending Machine
```
[ตู้ขายของ]
おしるこ ¥150
Oshiruko (Sweet Red Bean Soup)
```

### 5. School Sign
```
[ป้ายโรงเรียน]
第二中学
No. 2 Middle School
```

### 6. Achievement
```
🏆 "ช่างภาพมือใหม่"
"Take your first photo"
"ถ่ายรูปแรกในเกม"
```

---

## Tone & Style

### TH tone
- สุภาพ + เป็นกันเอง
- "ครับ/ค่ะ" ตาม NPC
- ไม่ slang เกินไป

### EN tone
- Simple + polite
- ไม่ jargon
- ไม่ slang

### JA tone
- Real Japanese (ไม่ใช่ anime speak)
- ใช้ です/ます (polite)
- ไม่ใช้ だよ/だぜ (too casual for student)

---

## Switching Language

ผู้เล่น toggle ได้ที่:
- Settings → Language → TH / EN / BOTH
- Default: BOTH (แสดงทั้งคู่)
- TH ONLY: ซ่อน EN
- EN ONLY: ซ่อน TH (rare)

---

## Quality Checklist

ก่อน ship UI:
- [ ] ทุก string มี TH + EN
- [ ] JA ใช้เฉพาะ signage
- [ ] ฟอนต์แสดงถูกต้องทุกภาษา
- [ ] ไม่มี hard-coded string ใน code
- [ ] i18n JSON ผ่าน schema validation
- [ ] ไม่มี text overflow
- [ ] Bilingual ไม่ดูซ้อนกัน

---

**Version:** 1.0
**Last updated:** 2026-07-12
